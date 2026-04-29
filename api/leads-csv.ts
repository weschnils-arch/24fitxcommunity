import type { VercelRequest, VercelResponse } from '@vercel/node';
import { redis, LEADS_KEY, type Lead, requireAuth } from './_lib';

function csvCell(v: string): string {
  return `"${v.replace(/"/g, '""').replace(/\r?\n/g, ' ')}"`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.query.token && typeof req.query.token === 'string') {
    req.headers.authorization = `Bearer ${req.query.token}`;
  }
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

  const header = ['Datum', 'Name', 'Email', 'Telefon', 'Nachricht', 'IP', 'UserAgent'];
  const rows = leads.map((l) => [
    l.ts,
    l.name,
    l.email,
    l.phone,
    l.message,
    l.ip,
    l.ua,
  ].map(csvCell).join(','));

  const csv = '﻿' + [header.map(csvCell).join(','), ...rows].join('\r\n');

  const filename = `24fit-leads-${new Date().toISOString().slice(0, 10)}.csv`;
  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  res.status(200).send(csv);
}
