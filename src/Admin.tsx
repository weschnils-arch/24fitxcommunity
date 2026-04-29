import { useEffect, useState, useCallback } from 'react';

type Lead = {
  id: string;
  ts: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  ip: string;
  ua: string;
};

const TOKEN_KEY = '24fit_admin_token';

export default function Admin() {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY));
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [leads, setLeads] = useState<Lead[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const loadLeads = useCallback(async (authToken: string) => {
    setLoadError(null);
    try {
      const res = await fetch('/api/leads', {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (res.status === 401) {
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
        return;
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as { leads: Lead[] };
      setLeads(data.leads);
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : 'Fehler beim Laden');
    }
  }, []);

  useEffect(() => {
    if (token) loadLeads(token);
  }, [token, loadLeads]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setLoginError(null);
    try {
      const res = await fetch('/api/auth-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        setLoginError('Falsches Passwort.');
        return;
      }
      const data = (await res.json()) as { token: string };
      localStorage.setItem(TOKEN_KEY, data.token);
      setToken(data.token);
      setPassword('');
    } catch {
      setLoginError('Verbindungsfehler.');
    } finally {
      setSubmitting(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setLeads(null);
  }

  if (!token) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <form onSubmit={handleLogin} className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          <img src="/logo.webp" alt="24FIT" className="h-8 w-auto mb-6" />
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Admin Login</h1>
          <p className="text-sm text-gray-500 mb-6">Zugriff auf Lead-Daten (DSGVO geschützt).</p>
          <label htmlFor="pw" className="block text-sm font-medium text-gray-700 mb-1.5">Passwort</label>
          <input
            id="pw"
            type="password"
            required
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-green/50 focus:border-brand-green"
          />
          {loginError && <p className="text-red-500 text-sm mt-3">{loginError}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="mt-5 w-full bg-brand-green hover:bg-brand-green-dark text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-70"
          >
            {submitting ? 'Anmelden …' : 'Anmelden'}
          </button>
        </form>
      </div>
    );
  }

  const filtered = (leads || []).filter((l) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      l.name.toLowerCase().includes(q) ||
      l.email.toLowerCase().includes(q) ||
      l.phone.toLowerCase().includes(q) ||
      l.message.toLowerCase().includes(q)
    );
  });

  const csvHref = `/api/leads-csv?token=${encodeURIComponent(token)}`;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="/logo.webp" alt="24FIT" className="h-7 w-auto" />
            <h1 className="text-lg font-bold text-gray-900">Lead Admin</h1>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={csvHref}
              className="inline-flex items-center gap-2 bg-brand-green hover:bg-brand-green-dark text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              CSV
            </a>
            <button
              onClick={handleLogout}
              className="text-sm font-medium text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <div className="mb-4 flex items-center justify-between gap-4">
          <input
            type="search"
            placeholder="Suche nach Name, E-Mail, Telefon, Nachricht …"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-green/50"
          />
          <span className="text-sm text-gray-500 whitespace-nowrap">
            {filtered.length} {filtered.length === 1 ? 'Lead' : 'Leads'}
          </span>
        </div>

        {loadError && <div className="text-red-500 text-sm mb-4">{loadError}</div>}

        {!leads ? (
          <div className="text-sm text-gray-500">Lädt …</div>
        ) : filtered.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-8 text-center text-gray-500 text-sm">
            Keine Leads {search ? 'gefunden.' : 'vorhanden.'}
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200 text-left text-xs uppercase tracking-wide text-gray-500">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Datum</th>
                    <th className="px-4 py-3 font-semibold">Name</th>
                    <th className="px-4 py-3 font-semibold">E-Mail</th>
                    <th className="px-4 py-3 font-semibold">Telefon</th>
                    <th className="px-4 py-3 font-semibold">Nachricht</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filtered.map((l) => (
                    <tr key={l.id} className="hover:bg-gray-50 align-top">
                      <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                        {new Date(l.ts).toLocaleString('de-AT', { dateStyle: 'short', timeStyle: 'short' })}
                      </td>
                      <td className="px-4 py-3 text-gray-900 font-medium">{l.name}</td>
                      <td className="px-4 py-3">
                        <a href={`mailto:${l.email}`} className="text-brand-green hover:underline">{l.email}</a>
                      </td>
                      <td className="px-4 py-3">
                        <a href={`tel:${l.phone}`} className="text-gray-700 hover:text-gray-900">{l.phone}</a>
                      </td>
                      <td className="px-4 py-3 text-gray-700 max-w-md whitespace-pre-wrap">{l.message || <span className="text-gray-400">—</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <p className="text-xs text-gray-400 mt-6">
          Diese Seite ist DSGVO-relevant. Lead-Daten nicht weitergeben, nicht außerhalb dieser Oberfläche speichern.
        </p>
      </main>
    </div>
  );
}
