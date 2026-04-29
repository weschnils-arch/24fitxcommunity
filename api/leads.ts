import type { VercelRequest, VercelResponse } from '@vercel/node';
import { redis, LEADS_KEY, type Lead, requireAuth } from './_lib';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!requireAuth(req, res)) return;

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'method not allowed' });
    return;
  }

  const raw = (await redis.lrange(LEADS_KEY, 0, -1)) as unknown[];
  const leads: Lead[] = raw.map((entry) => {
    if (typeof entry === 'string') {
      try {
        return JSON.parse(entry) as Lead;
      } catch {
        return null as unknown as Lead;
      }
    }
    return entry as Lead;
  }).filter(Boolean);

  res.status(200).json({ leads });
}
