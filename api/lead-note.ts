import type { VercelRequest, VercelResponse } from '@vercel/node';
import { redis, requireAuth } from './_lib.js';

const NOTES_KEY = 'leads:24fit:notes';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!requireAuth(req, res)) return;

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method not allowed' });
    return;
  }

  const body = (req.body || {}) as { id?: string; note?: string };
  const id = String(body.id || '').trim();
  const note = String(body.note ?? '').slice(0, 4000);

  if (!id) {
    res.status(400).json({ error: 'id required' });
    return;
  }

  try {
    if (note) {
      await redis.hset(NOTES_KEY, { [id]: note });
    } else {
      await redis.hdel(NOTES_KEY, id);
    }
    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('note save failed', err);
    res.status(500).json({ error: 'save failed' });
  }
}
