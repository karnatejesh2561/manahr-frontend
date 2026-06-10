'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Filter, Download, Search, AlertTriangle } from 'lucide-react';
import DashboardShell from '@/components/showcase/DashboardShell';
import { BarChart, AnimatedNumber } from '@/components/showcase/Charts';

const events = [
  { t: '09:42:18', u: 'akira@manatech.io', a: 'Login', d: 'Successful login from Tokyo, JP', s: 'info', c: '#6affe0' },
  { t: '09:38:02', u: 'yui@manatech.io',   a: 'Updated permission matrix', d: 'Granted Manager → Edit Reports', s: 'warning', c: '#ffb547' },
  { t: '09:24:51', u: 'system',            a: 'Stripe webhook', d: 'Payment received · $12,400 from Globex', s: 'info', c: '#6affe0' },
  { t: '09:18:30', u: 'marcus@manatech.io',a: 'Deal closed', d: 'Northwind Traders · $84,000', s: 'success', c: '#b6ff3c' },
  { t: '08:54:12', u: 'unknown',           a: 'Failed login', d: 'IP 192.0.2.41 · 5 attempts blocked', s: 'critical', c: '#ff5e7e' },
  { t: '08:42:01', u: 'leon@manatech.io',  a: 'API key created', d: 'sk_live_••••••a82f · scope: read:metrics', s: 'warning', c: '#ffb547' },
  { t: '08:30:18', u: 'sofia@manatech.io', a: 'Exported report', d: 'Q4 sales pipeline · 4.2 MB · pdf', s: 'info', c: '#6affe0' },
  { t: '07:58:42', u: 'system',            a: 'Anomaly detected', d: 'Spike in API errors on /v1/users · 47x baseline', s: 'critical', c: '#ff5e7e' },
  { t: '07:42:18', u: 'hiroko@manatech.io',a: 'Employee added', d: 'Ren Okada · Engineering · jr. engineer', s: 'success', c: '#b6ff3c' },
  { t: '06:30:00', u: 'system',            a: 'Backup completed', d: 'Daily snapshot · 482 GB · 14.2 minutes', s: 'info', c: '#6affe0' },
];

export default function AuditPage() {
  return (
    <DashboardShell
      title="Audit log"
      subtitle="Immutable record of everything that happened. Investigate, export, prove."
      breadcrumb={['Workspace', 'Admin', 'Audit log']}
      actions={
        <>
          <button className="sc-btn"><Filter size={13} />Filter</button>
          <button className="sc-btn"><Download size={13} />Export CSV</button>
        </>
      }
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { l: 'Events (24h)', v: 12842, c: '#b6ff3c' },
          { l: 'Critical', v: 2, c: '#ff5e7e' },
          { l: 'Warnings', v: 14, c: '#ffb547' },
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

      {/* Anomaly banner */}
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
        <button className="sc-btn">Investigate</button>
      </motion.div>

      {/* Activity chart */}
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

      {/* Event stream */}
      <motion.div className="sc-card p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
        <div className="flex items-center justify-between mb-4">
          <div className="sc-sans" style={{ fontSize: 14, fontWeight: 600 }}>Event stream · live</div>
          <div className="relative">
            <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--sc-text-faint)' }} />
            <input className="sc-input pl-8" placeholder="Search events..." style={{ width: 280 }} data-testid="audit-search" />
          </div>
        </div>
        <div className="space-y-2">
          {events.map((e, i) => (
            <motion.div key={i} className="grid grid-cols-[80px,180px,1fr,auto] gap-4 p-3 rounded-xl items-center"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--sc-border)' }}
              initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}>
              <div style={{ fontFamily: 'monospace', fontSize: 11, color: 'var(--sc-text-faint)' }}>{e.t}</div>
              <div style={{ fontSize: 12, color: 'var(--sc-text-dim)' }}>{e.u}</div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 500 }}>{e.a}</div>
                <div style={{ fontSize: 11, color: 'var(--sc-text-faint)', marginTop: 2 }}>{e.d}</div>
              </div>
              <span className="sc-chip" style={{ color: e.c, borderColor: `${e.c}40`, background: `${e.c}15` }}>{e.s}</span>
            </motion.div>
          ))}
        </div>
        <div className="flex justify-between items-center mt-4" style={{ fontSize: 11, color: 'var(--sc-text-faint)' }}>
          <span>Showing 10 of 12,842 events</span>
          <div className="flex gap-1">
            <button className="sc-btn sc-btn-ghost" style={{ padding: '4px 10px' }}>← Prev</button>
            <button className="sc-btn sc-btn-ghost" style={{ padding: '4px 10px' }}>Next →</button>
          </div>
        </div>
      </motion.div>
    </DashboardShell>
  );
}
