import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Student } from './db.js';

const router = Router();

function signToken(payload) {
  const secret = process.env.JWT_SECRET || 'dev-secret';
  const expiresIn = process.env.JWT_EXPIRES_IN || '7d';
  return jwt.sign(payload, secret, { expiresIn });
}

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  const token = authHeader.slice('Bearer '.length);
  try {
    const secret = process.env.JWT_SECRET || 'dev-secret';
    const decoded = jwt.verify(token, secret);
    req.userId = decoded.userId;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

router.post('/register', async (req, res) => {
  const { email, password, name } = req.body || {};
  if (!email || !password || !name) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }
  const existing = await Student.findOne({ email: String(email).toLowerCase() }).lean();
  if (existing) {
    res.status(409).json({ error: 'Email already registered' });
    return;
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const created = await Student.create({ email: String(email).toLowerCase(), name, passwordHash });
  const token = signToken({ userId: String(created._id) });
  res.status(201).json({ token, user: { id: String(created._id), email: created.email, name: created.name } });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    res.status(400).json({ error: 'Missing email or password' });
    return;
  }
  const user = await Student.findOne({ email: String(email).toLowerCase() }).lean();
  if (!user) {
    res.status(401).json({ error: 'Invalid credentials' });
    return;
  }
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    res.status(401).json({ error: 'Invalid credentials' });
    return;
  }
  const token = signToken({ userId: String(user._id) });
  res.json({ token, user: { id: String(user._id), email: user.email, name: user.name } });
});

router.get('/me', authMiddleware, async (req, res) => {
  const user = await Student.findById(req.userId).lean();
  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }
  res.json({ id: String(user._id), email: user.email, name: user.name });
});

export default router;


