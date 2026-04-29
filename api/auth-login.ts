import type { VercelRequest, VercelResponse } from '@vercel/node';
import jwt from 'jsonwebtoken';
import { jwtSecret, redis, clientIp } from './_lib.js';

const MAX_FAILS = 10;
const WINDOW_SECONDS = 600;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method not allowed' });
    return;
  }

  const adminPw = process.env.ADMIN_PASSWORD;
  if (!adminPw) {
    res.status(500).json({ error: 'admin not configured' });
    return;
  }

  const password = String((req.body && (req.body as { password?: string }).password) || '');
  if (!password) {
    res.status(400).json({ error: 'password required' });
    return;
  }

  const ip = clientIp(req);
  const key = `auth:fail:${ip}`;
  try {
    const fails = (await redis.get<number>(key)) ?? 0;
    if (fails >= MAX_FAILS) {
      res.status(429).json({ error: 'too many attempts, try later' });
      return;
    }
  } catch (err) {
    console.error('redis rate-limit read failed', err);
  }

  if (password !== adminPw) {
    try {
      const newCount = await redis.incr(key);
      if (newCount === 1) await redis.expire(key, WINDOW_SECONDS);
    } catch (err) {
      console.error('redis rate-limit incr failed', err);
    }
    await new Promise((r) => setTimeout(r, 800));
    res.status(401).json({ error: 'invalid password' });
    return;
  }

  try {
    await redis.del(key);
  } catch {
    /* ignore */
  }

  const token = jwt.sign({ role: 'admin' }, jwtSecret(), { expiresIn: '7d' });
  res.status(200).json({ token });
}
