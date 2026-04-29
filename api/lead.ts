import type { VercelRequest, VercelResponse } from '@vercel/node';
import { redis, LEADS_KEY, type Lead, clientIp } from './_lib.js';

const FORMSPREE_URL = 'https://formspree.io/f/mojkanak';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method not allowed' });
    return;
  }

  const body = (req.body || {}) as Record<string, unknown>;
  const name = String(body.name || '').trim().slice(0, 200);
  const email = String(body.email || '').trim().slice(0, 200);
  const phone = String(body.phone || '').trim().slice(0, 100);
  const message = String(body.message || '').trim().slice(0, 4000);

  if (!name || !email || !phone) {
    res.status(400).json({ error: 'name, email, phone required' });
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.status(400).json({ error: 'invalid email' });
    return;
  }

  const lead: Lead = {
    id: crypto.randomUUID(),
    ts: new Date().toISOString(),
    name,
    email,
    phone,
    message,
    ip: clientIp(req),
    ua: String(req.headers['user-agent'] || '').slice(0, 300),
  };

  try {
    await redis.lpush(LEADS_KEY, JSON.stringify(lead));
  } catch (err) {
    console.error('redis lpush failed', err);
  }

  fetch(FORMSPREE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ name, email, phone, message }),
  }).catch((err) => console.error('formspree forward failed', err));

  res.status(200).json({ ok: true });
}
