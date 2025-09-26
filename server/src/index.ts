import express, { Request, Response, NextFunction } from 'express';
import type { AddressInfo } from 'net';
import cors from 'cors';

const app = express();

// Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// Health check
app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

// Student dashboard route
app.get('/student/dashboard', (_req: Request, res: Response) => {
  const dashboard = {
    student: {
      id: 'stu_001',
      name: 'Alex Johnson',
      university: 'StaySync University',
      avatarUrl: null
    },
    stats: {
      applicationsSubmitted: 3,
      applicationsApproved: 1,
      messagesUnread: 2,
      documentsPending: 1
    },
    recentApplications: [
      { id: 'app_101', listingTitle: 'Downtown Studio', status: 'under_review', submittedAt: '2025-09-20' },
      { id: 'app_099', listingTitle: 'Campus Shared Room', status: 'approved', submittedAt: '2025-09-15' },
      { id: 'app_095', listingTitle: 'Suburban 1BR', status: 'draft', submittedAt: '2025-09-10' }
    ],
    tasks: [
      { id: 'task_docs', title: 'Upload student ID', completed: false },
      { id: 'task_profile', title: 'Complete profile', completed: true },
      { id: 'task_verify', title: 'Verify email', completed: true }
    ]
  };

  res.json(dashboard);
});

// Not found handler
app.use((_req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PREFERRED_PORT = process.env.PORT ? Number(process.env.PORT) : 8080;

function startServer(port: number): void {
  const server = app.listen(port, () => {
    const address = server.address() as AddressInfo;
    const actualPort = address.port;
    console.log(`StaySync server listening on http://localhost:${actualPort}`);
  });

  server.on('error', (err: NodeJS.ErrnoException) => {
    if (err.code === 'EADDRINUSE' && port !== 0) {
      console.warn(`Port ${port} is busy. Falling back to a random available port...`);
      startServer(0);
      return;
    }
    console.error(err);
    process.exit(1);
  });
}

startServer(PREFERRED_PORT);


