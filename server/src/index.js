import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectToDatabase } from './db.js';
import authRouter from './auth.js';
import { Student } from './db.js';

const app = express();

const corsOrigin = process.env.CORS_ORIGIN === '*' ? true : (process.env.CORS_ORIGIN || true);
app.use(cors({ origin: corsOrigin, credentials: true }));
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Auth routes
app.use('/auth', authRouter);
app.use('/', authRouter);

// Student dashboard route
app.get('/student/dashboard', async (req, res) => {
  try {
    const auth = req.headers.authorization || '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
    let userId = null;
    if (token) {
      try {
        const secret = process.env.JWT_SECRET || 'dev-secret';
        const payload = JSON.parse(Buffer.from(token.split('.')[1] || '', 'base64').toString('utf8'));
        userId = payload?.userId || null;
      } catch {}
    }

    const student = userId ? await Student.findById(userId).lean() : null;
    if (!student) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }
    res.json({
      student: {
        id: String(student._id),
        name: student.name,
        university: student.university,
        avatarUrl: student.avatarUrl
      },
      stats: student.stats || { applicationsSubmitted: 0, applicationsApproved: 0, messagesUnread: 0, documentsPending: 0 },
      recentApplications: student.recentApplications || [],
      tasks: student.tasks || []
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load dashboard' });
  }
});

app.use((_req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PREFERRED_PORT = process.env.PORT ? Number(process.env.PORT) : 8080;

async function startServer(port) {
  const mongoUri = process.env.MONGODB_URI || process.env.MONGODB_URI_PROD;
  if (mongoUri) {
    try {
      await connectToDatabase(mongoUri);
      console.log('Connected to MongoDB');
    } catch (err) {
      console.error('Failed to connect to MongoDB', err);
    }
  } else {
    console.warn('No MONGODB_URI provided. Auth persistence will be disabled.');
  }

  const server = app.listen(port, () => {
    const address = server.address();
    const actualPort = typeof address === 'object' && address ? address.port : port;
    console.log(`StaySync server listening on http://localhost:${actualPort}`);
  });

  server.on('error', (err) => {
    if (err && err.code === 'EADDRINUSE' && port !== 0) {
      console.warn(`Port ${port} is busy. Falling back to a random available port...`);
      startServer(0);
      return;
    }
    console.error(err);
    process.exit(1);
  });
}

startServer(PREFERRED_PORT);


