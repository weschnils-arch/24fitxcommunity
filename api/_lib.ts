import { Redis } from '@upstash/redis';
import jwt from 'jsonwebtoken';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export const redis = Redis.fromEnv();

export const LEADS_KEY = 'leads:24fit';

export type Lead = {
  id: string;
  ts: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  ip: string;
  ua: string;
};

export function jwtSecret(): string {
  const s = process.env.JWT_SECRET;
  if (!s) throw new Error('JWT_SECRET missing');
  return s;
}

export function verifyAuth(req: VercelRequest): boolean {
  const h = req.headers.authorization || '';
  const m = h.match(/^Bearer\s+(.+)$/i);
  if (!m) return false;
  try {
    jwt.verify(m[1], jwtSecret());
    return true;
  } catch {
    return false;
  }
}

export function requireAuth(req: VercelRequest, res: VercelResponse): boolean {
  if (!verifyAuth(req)) {
    res.status(401).json({ error: 'unauthorized' });
    return false;
  }
  return true;
}

export function clientIp(req: VercelRequest): string {
  const xf = (req.headers['x-forwarded-for'] || '') as string;
  return xf.split(',')[0].trim() || 'unknown';
}
