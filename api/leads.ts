import type { VercelRequest, VercelResponse } from '@vercel/node';
import { redis, LEADS_KEY, type Lead, requireAuth } from './_lib.js';

const NOTES_KEY = 'leads:24fit:notes';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!requireAuth(req, res)) return;

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'method not allowed' });
    return;
  }

  const [raw, notesMap] = await Promise.all([
    redis.lrange(LEADS_KEY, 0, -1) as Promise<unknown[]>,
    redis.hgetall(NOTES_KEY) as Promise<Record<string, string> | null>,
  ]);

  const notes = notesMap || {};
  const leads: (Lead & { note: string })[] = raw.map((entry) => {
    let lead: Lead | null = null;
    if (typeof entry === 'string') {
      try {
        lead = JSON.parse(entry) as Lead;
      } catch {
        lead = null;
      }
    } else {
      lead = entry as Lead;
    }
    if (!lead) return null as unknown as Lead & { note: string };
    return { ...lead, note: notes[lead.id] || '' };
  }).filter(Boolean);

  res.status(200).json({ leads });
}
