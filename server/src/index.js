import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectToDatabase } from './db.js';
import authRouter, { authMiddleware } from './auth.js';
import { Student, Listing, RoommateProfile, Message, Group, CalendarEvent, Alert } from './db.js';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';

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

// Listings search/browse
app.get('/student/search', async (req, res) => {
  try {
    const {
      q,
      type,
      min,
      max,
      beds,
      baths,
      dist,
      amen
    } = req.query;

    const filter = {};
    if (q) {
      filter.$text = { $search: String(q) };
    }
    if (type && (type === 'apartment' || type === 'roommate')) {
      filter.type = type;
    }
    if (min || max) {
      filter.rent = {};
      if (min) filter.rent.$gte = Number(min);
      if (max) filter.rent.$lte = Number(max);
    }
    if (beds) filter.bedrooms = Number(beds);
    if (baths) filter.bathrooms = Number(baths);
    if (dist) filter.distance = { $lte: Number(dist) };
    if (amen) filter.amenities = { $all: String(amen).split(',').filter(Boolean) };

    const sortMap = {
      'price-low': { rent: 1 },
      'price-high': { rent: -1 },
      rating: { rating: -1 },
      newest: { updatedAt: -1 },
      distance: { distance: 1 }
    };
    const sort = sortMap[String(req.query.sort || 'relevance')] || { featured: -1, rating: -1 };

    const page = Math.max(1, Number(req.query.page || 1));
    const pageSize = Math.min(25, Math.max(1, Number(req.query.pageSize || 10)));

    const [items, total] = await Promise.all([
      Listing.find(filter).sort(sort).skip((page - 1) * pageSize).limit(pageSize).lean(),
      Listing.countDocuments(filter)
    ]);

    res.json({ items, total, page, pageSize });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to search listings' });
  }
});

// Flatmates: roommate profiles search
app.get('/roommates', async (req, res) => {
  try {
    const { q, city, min, max, gender, cleanliness, traits, interests, sort, page = 1, pageSize = 10 } = req.query;
    const filter = {};
    if (q) filter.$text = { $search: String(q) };
    if (city && city !== 'any') filter.city = new RegExp(`^${String(city)}$`, 'i');
    if (gender && gender !== 'any') filter.gender = gender;
    if (cleanliness && cleanliness !== 'any') filter.cleanliness = cleanliness;
    if (min || max) {
      filter.budget = {};
      if (min) filter.budget.$gte = Number(min);
      if (max) filter.budget.$lte = Number(max);
    }
    if (traits) filter.traits = { $all: String(traits).split(',').filter(Boolean) };
    if (interests) filter.interests = { $in: String(interests).split(',').filter(Boolean) };

    const sortMap = {
      relevance: { createdAt: -1 },
      budgetAsc: { budget: 1 },
      budgetDesc: { budget: -1 },
    };
    const sortBy = sortMap[String(sort || 'relevance')] || sortMap.relevance;

    const pg = Math.max(1, Number(page));
    const ps = Math.min(25, Math.max(1, Number(pageSize)));

    const [items, total] = await Promise.all([
      RoommateProfile.find(filter).sort(sortBy).skip((pg - 1) * ps).limit(ps).lean(),
      RoommateProfile.countDocuments(filter)
    ]);
    res.json({ items, total, page: pg, pageSize: ps });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to search roommates' });
  }
});

// Flatmates: profile by id
app.get('/roommates/:id', async (req, res) => {
  try {
    const profile = await RoommateProfile.findById(req.params.id).lean();
    if (!profile) {
      res.status(404).json({ error: 'Not found' });
      return;
    }
    res.json(profile);
  } catch (err) {
    res.status(400).json({ error: 'Invalid id' });
  }
});

// Admin: metrics & usage
app.get('/admin/metrics', async (_req, res) => {
  try {
    const [students, listings, issuesOpen, messages] = await Promise.all([
      Student.countDocuments({}),
      Listing.countDocuments({}),
      // Placeholder for issues: count of listings missing mandatory fields
      Listing.countDocuments({ $or: [{ rent: { $exists: false } }, { location: { $exists: false } }] }),
      Message.countDocuments({})
    ]);

    const activeStudents = Math.max(students - Math.floor(students * 0.1), 0);
    const satisfaction = 4.2;
    const demandIndex = Math.min(100, Math.round((listings ? (students / Math.max(listings, 1)) * 10 : 0)) + 50);

    const usage = [
      { name: 'Mon', usage: 120 },
      { name: 'Tue', usage: 200 },
      { name: 'Wed', usage: 150 },
      { name: 'Thu', usage: 220 },
      { name: 'Fri', usage: 180 },
      { name: 'Sat', usage: 90 },
      { name: 'Sun', usage: 70 },
    ];

    res.json({
      stats: {
        demandIndex,
        activeStudents,
        satisfaction,
        issuesOpen,
      },
      usage,
      messages,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load admin metrics' });
  }
});

// Messaging: list messages in a thread
app.get('/messages/:otherUserId', authMiddleware, async (req, res) => {
  const a = String(req.userId);
  const b = String(req.params.otherUserId);
  const threadId = [a, b].sort().join(':');
  const items = await Message.find({ threadId }).sort({ sentAt: 1 }).lean();
  res.json({ items });
});

// Messaging: send message
app.post('/messages/:otherUserId', authMiddleware, async (req, res) => {
  const a = String(req.userId);
  const b = String(req.params.otherUserId);
  const threadId = [a, b].sort().join(':');
  const text = String(req.body?.text || '').trim();
  if (!text) {
    res.status(400).json({ error: 'Message text required' });
    return;
  }
  const created = await Message.create({ threadId, from: a, to: b, text });
  res.status(201).json({ item: created.toJSON() });
});

// --------------------- Admin Students ----------------------
// List students with filters, search and pagination
app.get('/admin/students', async (req, res) => {
  try {
    const { q, status = 'all' } = req.query;
    const page = Math.max(1, Number(req.query.page || 1));
    const pageSize = Math.min(50, Math.max(1, Number(req.query.pageSize || 10)));
    const filter = {};
    if (q) {
      filter.$or = [
        { name: new RegExp(String(q), 'i') },
        { email: new RegExp(String(q), 'i') },
        { studentId: new RegExp(String(q), 'i') },
      ];
    }
    if (status !== 'all') filter.status = status; // expected: 'pending' | 'verified' | 'rejected'
    const [items, total] = await Promise.all([
      Student.find(filter).sort({ createdAt: -1 }).skip((page - 1) * pageSize).limit(pageSize).lean(),
      Student.countDocuments(filter)
    ]);
    res.json({ items, total, page, pageSize });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load students' });
  }
});

// Update student status (verify/reject)
app.post('/admin/students/:id/status', async (req, res) => {
  try {
    const { status } = req.body || {};
    if (!['pending', 'verified', 'rejected'].includes(String(status))) {
      res.status(400).json({ error: 'Invalid status' });
      return;
    }
    const updated = await Student.findByIdAndUpdate(req.params.id, { status }, { new: true }).lean();
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json({ item: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update status' });
  }
});

// Bulk import students (expects JSON array of students or CSV text)
app.post('/admin/students/import', express.text({ type: '*/*', limit: '2mb' }), async (req, res) => {
  try {
    let payload = [];
    const text = String(req.body || '').trim();
    if (!text) return res.status(400).json({ error: 'No data' });
    try {
      const json = JSON.parse(text);
      payload = Array.isArray(json) ? json : [];
    } catch {
      // simple CSV parser: name,email,studentId
      const lines = text.split(/\r?\n/).filter(Boolean);
      for (const line of lines) {
        const [name, email, studentId] = line.split(',').map(s => s?.trim());
        if (name && email) payload.push({ name, email, studentId, status: 'pending' });
      }
    }
    if (!payload.length) return res.status(400).json({ error: 'No valid records' });
    const inserted = await Student.insertMany(payload.map(r => ({
      name: r.name,
      email: r.email,
      studentId: r.studentId,
      status: r.status || 'pending',
      university: r.university || 'Unknown'
    })), { ordered: false });
    res.status(201).json({ inserted: inserted.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Import failed' });
  }
});

// --------------------- Admin Community Groups ----------------------
app.get('/admin/groups', async (_req, res) => {
  const items = await Group.find({}).sort({ createdAt: -1 }).lean();
  res.json({ items });
});

app.post('/admin/groups', express.json(), async (req, res) => {
  try {
    const name = String(req.body?.name || '').trim();
    if (!name) return res.status(400).json({ error: 'Name required' });
    const created = await Group.create({ name, members: Math.floor(Math.random()*250)+50 });
    res.status(201).json({ item: created.toJSON() });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create group' });
  }
});

// --------------------- Admin Academic Calendar ----------------------
app.get('/admin/calendar', async (req, res) => {
  const year = Number(req.query.year || new Date().getFullYear());
  const term = String(req.query.term || 'Spring');
  const items = await CalendarEvent.find({ year, term }).sort({ start: 1 }).lean();
  res.json({ items });
});

app.post('/admin/calendar', express.json(), async (req, res) => {
  const { title, start, end, term, year } = req.body || {};
  if (!title || !start || !end) return res.status(400).json({ error: 'Missing fields' });
  const created = await CalendarEvent.create({ title, start, end, term, year });
  res.status(201).json({ item: created.toJSON() });
});

// --------------------- Admin Emergency Broadcasts ----------------------
app.post('/admin/broadcasts', express.json(), async (req, res) => {
  const { message, via = ['email'] } = req.body || {};
  if (!message) return res.status(400).json({ error: 'Message required' });
  const created = await Alert.create({ message, via, status: 'queued' });
  // Pretend to send immediately
  created.status = 'sent';
  await created.save();
  res.status(201).json({ item: created.toJSON() });
});

// Cloudinary configuration and upload endpoint
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const upload = multer({ storage: multer.memoryStorage() });

app.post('/uploads/image', authMiddleware, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No file provided' });
      return;
    }
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({ folder: 'staysync' }, (error, uploadResult) => {
        if (error) return reject(error);
        resolve(uploadResult);
      });
      stream.end(req.file.buffer);
    });
    res.status(201).json({ url: result.secure_url, public_id: result.public_id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Upload failed' });
  }
});

// Seed sample roommate profiles (dev only)
app.post('/dev/seed-roommates', async (_req, res) => {
  try {
    const count = await RoommateProfile.countDocuments();
    if (count > 0) {
      res.json({ status: 'already-seeded', count });
      return;
    }
    const docs = [
      { name: 'Ananya Sharma', university: 'IIT Bombay', budget: 20000, city: 'Mumbai', traits: ['Early Bird','Non-smoker','Vegetarian'], interests: ['Music','Reading'], cleanliness: 'High', gender: 'Female' },
      { name: 'Rohit Mehta', university: 'IIT Delhi', budget: 25000, city: 'Delhi', traits: ['Night Owl','Non-smoker'], interests: ['Gym','Cricket'], cleanliness: 'Medium', gender: 'Male' },
      { name: 'Sara Khan', university: 'BITS Pilani', budget: 18000, city: 'Bangalore', traits: ['Pet Friendly','Vegetarian'], interests: ['Coffee','Design'], cleanliness: 'High', gender: 'Female' },
      { name: 'Dev Patel', university: 'IIM Bangalore', budget: 30000, city: 'Bangalore', traits: ['Quiet','Non-smoker'], interests: ['Startups','Coding'], cleanliness: 'High', gender: 'Male' },
    ];
    const inserted = await RoommateProfile.insertMany(docs);
    res.json({ status: 'seeded', count: inserted.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Seed failed' });
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


