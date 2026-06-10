'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Filter, Download, AlertTriangle } from 'lucide-react';
import DashboardShell from '@/components/showcase/DashboardShell';
import { BarChart, AnimatedNumber } from '@/components/showcase/Charts';
import { FilterPanel, FilterChip, SearchInput, useToast } from '@/components/showcase/Interactions';

type Severity = 'info' | 'success' | 'warning' | 'critical';

const events: { t: string; u: string; a: string; d: string; s: Severity }[] = [
  { t: '09:42:18', u: 'akira@manatech.io', a: 'Login', d: 'Successful login from Tokyo, JP', s: 'info' },
  { t: '09:38:02', u: 'yui@manatech.io',   a: 'Updated permission matrix', d: 'Granted Manager → Edit Reports', s: 'warning' },
  { t: '09:24:51', u: 'system',            a: 'Stripe webhook', d: 'Payment received · $12,400 from Globex', s: 'info' },
  { t: '09:18:30', u: 'marcus@manatech.io',a: 'Deal closed', d: 'Northwind Traders · $84,000', s: 'success' },
  { t: '08:54:12', u: 'unknown',           a: 'Failed login', d: 'IP 192.0.2.41 · 5 attempts blocked', s: 'critical' },
  { t: '08:42:01', u: 'leon@manatech.io',  a: 'API key created', d: 'sk_live_••••••a82f · scope: read:metrics', s: 'warning' },
  { t: '08:30:18', u: 'sofia@manatech.io', a: 'Exported report', d: 'Q4 sales pipeline · 4.2 MB · pdf', s: 'info' },
  { t: '07:58:42', u: 'system',            a: 'Anomaly detected', d: 'Spike in API errors on /v1/users · 47x baseline', s: 'critical' },
  { t: '07:42:18', u: 'hiroko@manatech.io',a: 'Employee added', d: 'Ren Okada · Engineering · jr. engineer', s: 'success' },
  { t: '06:30:00', u: 'system',            a: 'Backup completed', d: 'Daily snapshot · 482 GB · 14.2 minutes', s: 'info' },
  { t: '06:14:22', u: 'akira@manatech.io', a: 'Workspace setting updated', d: 'IP allowlist toggle: OFF', s: 'warning' },
  { t: '05:52:08', u: 'system',            a: 'Stripe webhook', d: 'Subscription renewed · Initech · $4,200', s: 'info' },
];

const colorFor = (s: Severity) =>
  s === 'success' ? '#5cf2a3' : s === 'info' ? '#6affe0' : s === 'warning' ? '#ffb547' : '#ff5e7e';

const allSeverities: Severity[] = ['info', 'success', 'warning', 'critical'];

export default function AuditPage() {
  const [search, setSearch] = React.useState('');
  const [filterOpen, setFilterOpen] = React.useState(false);
  const [sevFilters, setSevFilters] = React.useState<Severity[]>([]);
  const { push } = useToast();

  const filtered = events.filter(e => {
    if (sevFilters.length && !sevFilters.includes(e.s)) return false;
    if (search) {
      const q = search.toLowerCase();
      if (![e.u, e.a, e.d].some(x => x.toLowerCase().includes(q))) return false;
    }
    return true;
  });

  const exportCsv = () => push('Audit log export queued · 12,842 rows · CSV', 'info');

  return (
    <DashboardShell
      title="Audit log"
      subtitle="Immutable record of everything that happened. Investigate, export, prove."
      breadcrumb={['Workspace', 'Admin', 'Audit log']}
      actions={
        <>
          <button className="sc-btn" onClick={() => setFilterOpen(!filterOpen)} data-testid="open-filters">
            <Filter size={13} />Filter{sevFilters.length > 0 && <span className="sc-chip sc-chip-accent" style={{ padding: '1px 6px', fontSize: 10 }}>{sevFilters.length}</span>}
          </button>
          <button className="sc-btn" onClick={exportCsv} data-testid="export-audit"><Download size={13} />Export CSV</button>
        </>
      }
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { l: 'Events (24h)', v: 12842, c: '#b6ff3c' },
          { l: 'Critical', v: events.filter(e => e.s === 'critical').length, c: '#ff5e7e' },
          { l: 'Warnings', v: events.filter(e => e.s === 'warning').length, c: '#ffb547' },
          { l: 'Retention', v: '7 yr', c: '#6affe0' },
        ].map(k => (
          <div key={k.l} className="sc-card p-5">
            <div style={{ fontSize: 11, color: 'var(--sc-text-faint)' }}>{k.l.toUpperCase()}</div>
            <div className="sc-stat-value mt-2" style={{ color: k.c }}>
              {typeof k.v === 'number' ? <AnimatedNumber value={k.v} /> : k.v}
            </div>
          </div>
        ))}
      </div>

      <FilterPanel open={filterOpen}>
        <span style={{ fontSize: 11, color: 'var(--sc-text-faint)' }}>SEVERITY</span>
        {allSeverities.map(s => (
          <FilterChip key={s} active={sevFilters.includes(s)}
            onClick={() => setSevFilters(p => p.includes(s) ? p.filter(x => x !== s) : [...p, s])}
            testid={`filter-severity-${s}`}>{s}</FilterChip>
        ))}
        {sevFilters.length > 0 && (
          <button onClick={() => setSevFilters([])} className="sc-btn sc-btn-ghost ml-auto"
                  style={{ padding: '6px 12px', fontSize: 11 }}>Clear filters</button>
        )}
      </FilterPanel>

      <motion.div className="sc-card p-4 mb-6 flex items-start gap-4"
        style={{ background: 'rgba(255,94,126,0.05)', border: '1px solid rgba(255,94,126,0.25)' }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(255,94,126,0.15)' }}>
          <AlertTriangle size={16} style={{ color: 'var(--sc-danger)' }} />
        </div>
        <div className="flex-1">
          <div className="sc-sans" style={{ fontSize: 13, fontWeight: 600, color: 'var(--sc-danger)' }}>2 anomalies detected today</div>
          <div style={{ fontSize: 12, color: 'var(--sc-text-dim)', marginTop: 2 }}>
            Spike in API errors on /v1/users (47× baseline) · 5 failed logins from IP 192.0.2.41
          </div>
        </div>
        <button className="sc-btn" onClick={() => { setSevFilters(['critical']); setFilterOpen(true); push('Filtered to 2 critical events', 'info'); }}>Investigate</button>
      </motion.div>

      <motion.div className="sc-card p-6 mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="sc-sans" style={{ fontSize: 14, fontWeight: 600 }}>Activity · last 24h</div>
            <div style={{ fontSize: 11, color: 'var(--sc-text-faint)', marginTop: 4 }}>Events per hour</div>
          </div>
        </div>
        <BarChart height={180} color="#7a5cff"
          labels={['0','2','4','6','8','10','12','14','16','18','20','22']}
          data={[180, 120, 80, 180, 420, 680, 920, 1140, 1280, 1080, 720, 380]} />
      </motion.div>

      <motion.div className="sc-card p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
        <div className="flex items-center justify-between mb-4">
          <div className="sc-sans" style={{ fontSize: 14, fontWeight: 600 }}>Event stream · live ({filtered.length})</div>
          <SearchInput value={search} onChange={setSearch} placeholder="Search events..." testid="audit-search" width={280} />
        </div>
        <div className="space-y-2">
          {filtered.map((e, i) => (
            <motion.div key={i} className="grid grid-cols-[80px,180px,1fr,auto] gap-4 p-3 rounded-xl items-center"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--sc-border)' }}
              initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.025 }}>
              <div style={{ fontFamily: 'monospace', fontSize: 11, color: 'var(--sc-text-faint)' }}>{e.t}</div>
              <div style={{ fontSize: 12, color: 'var(--sc-text-dim)' }}>{e.u}</div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 500 }}>{e.a}</div>
                <div style={{ fontSize: 11, color: 'var(--sc-text-faint)', marginTop: 2 }}>{e.d}</div>
              </div>
              <span className="sc-chip" style={{ color: colorFor(e.s), borderColor: `${colorFor(e.s)}40`, background: `${colorFor(e.s)}15` }}>{e.s}</span>
            </motion.div>
          ))}
          {filtered.length === 0 && (
            <div className="py-12 text-center" style={{ color: 'var(--sc-text-faint)', fontSize: 12 }}>
              No events match.{' '}
              <button onClick={() => { setSearch(''); setSevFilters([]); }} className="underline" style={{ color: 'var(--sc-accent)' }}>Clear all</button>
            </div>
          )}
        </div>
        <div className="flex justify-between items-center mt-4" style={{ fontSize: 11, color: 'var(--sc-text-faint)' }}>
          <span>Showing {filtered.length} of 12,842 events</span>
          <div className="flex gap-1">
            <button className="sc-btn sc-btn-ghost" style={{ padding: '4px 10px' }}>← Prev</button>
            <button className="sc-btn sc-btn-ghost" style={{ padding: '4px 10px' }}>Next →</button>
          </div>
        </div>
      </motion.div>
    </DashboardShell>
  );
}
