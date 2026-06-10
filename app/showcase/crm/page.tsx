'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Filter, Search, Star, Phone, Mail, MoreHorizontal, TrendingUp } from 'lucide-react';
import DashboardShell from '@/components/showcase/DashboardShell';
import { Funnel, AreaChart, DonutChart, Sparkline, AnimatedNumber } from '@/components/showcase/Charts';

const stages = [
  { name: 'Prospect', color: '#9ea0b3', count: 24, value: '$1.2M' },
  { name: 'Qualified', color: '#6affe0', count: 16, value: '$840k' },
  { name: 'Proposal', color: '#ffb547', count: 9,  value: '$520k' },
  { name: 'Negotiation', color: '#ff6bcb', count: 5, value: '$310k' },
  { name: 'Closed Won', color: '#b6ff3c', count: 12, value: '$680k' },
];

const deals = [
  { c: 'Northwind Traders', l: 'Yui Tanaka', v: '$84,000', s: 'Negotiation', p: 78, due: '3d', color: '#ff6bcb' },
  { c: 'Globex Corp',       l: 'Marcus Hale', v: '$112,500', s: 'Proposal', p: 62, due: '7d', color: '#ffb547' },
  { c: 'Initech',           l: 'Sofia Reyes', v: '$48,200', s: 'Qualified', p: 35, due: '14d', color: '#6affe0' },
  { c: 'Acme Robotics',     l: 'Leon Park', v: '$198,000', s: 'Negotiation', p: 85, due: '2d', color: '#ff6bcb' },
  { c: 'Vandelay Industries', l: 'Yui Tanaka', v: '$36,500', s: 'Prospect', p: 18, due: '21d', color: '#9ea0b3' },
];

export default function CRMPage() {
  return (
    <DashboardShell
      title="CRM command center"
      subtitle="Pipeline, deals, customers — everything you need to close the quarter."
      breadcrumb={['Workspace', 'Sales', 'CRM']}
      actions={
        <>
          <button className="sc-btn"><Filter size={13} />Filters</button>
          <button className="sc-btn sc-btn-primary" data-testid="add-deal"><Plus size={13} />New deal</button>
        </>
      }
    >
      {/* KPI */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { l: 'Pipeline', v: 3550000, prefix: '$', c: '#b6ff3c', d: '+18%' },
          { l: 'Deals open', v: 66, c: '#6affe0', d: '+4' },
          { l: 'Win rate', v: 32.4, suffix: '%', decimals: 1, c: '#ff6bcb', d: '+2.1pp' },
          { l: 'Avg cycle', v: 24, suffix: 'd', c: '#ffb547', d: '−3d' },
        ].map((k, i) => (
          <motion.div key={k.l} className="sc-card p-5"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <div className="flex justify-between">
              <div style={{ fontSize: 11, color: 'var(--sc-text-faint)' }}>{k.l.toUpperCase()}</div>
              <span className="sc-chip sc-chip-success" style={{ fontSize: 10 }}>{k.d}</span>
            </div>
            <div className="sc-stat-value mt-3" style={{ color: k.c }}>
              <AnimatedNumber value={k.v} prefix={k.prefix} suffix={k.suffix} decimals={k.decimals ?? 0} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pipeline kanban */}
      <motion.div className="mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        <div className="flex items-center justify-between mb-3">
          <div className="sc-sans" style={{ fontSize: 14, fontWeight: 600 }}>Sales pipeline · Q4</div>
          <div className="flex items-center gap-3" style={{ fontSize: 12, color: 'var(--sc-text-dim)' }}>
            <span>Showing 66 of 248 deals</span>
            <div className="sc-tabs"><div className="sc-tab active">All</div><div className="sc-tab">Mine</div><div className="sc-tab">Hot</div></div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-3">
          {stages.map((s, si) => (
            <div key={s.name} className="sc-kanban-col">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.color, boxShadow: `0 0 6px ${s.color}` }} />
                  <span className="sc-sans" style={{ fontSize: 12, fontWeight: 600 }}>{s.name}</span>
                </div>
                <span style={{ fontSize: 10, color: 'var(--sc-text-faint)', fontFamily: 'monospace' }}>{s.count}</span>
              </div>
              <div style={{ fontSize: 10, color: 'var(--sc-text-faint)', marginBottom: 12 }}>{s.value} total</div>
              {Array.from({ length: Math.min(3, s.count) }).map((_, i) => (
                <motion.div key={i} className="sc-kanban-card"
                  initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: si * 0.05 + i * 0.05 }}>
                  <div style={{ fontSize: 12, fontWeight: 500 }}>{['Northwind', 'Globex', 'Initech', 'Acme', 'Vandelay'][i]} · Q{i+1}</div>
                  <div style={{ fontSize: 10, color: 'var(--sc-text-faint)', marginTop: 4 }}>{['Yui T.', 'Marcus H.', 'Sofia R.'][i % 3]}</div>
                  <div className="flex items-center justify-between mt-3">
                    <span style={{ fontSize: 11, color: s.color, fontFamily: 'monospace' }}>${(48 + i * 22) * (si + 1)}k</span>
                    <span className="sc-chip" style={{ fontSize: 9, padding: '2px 6px' }}>{['3d','7d','14d'][i % 3]}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Funnel + Donut */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">
        <motion.div className="sc-card p-6 xl:col-span-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <div className="sc-sans mb-4" style={{ fontSize: 14, fontWeight: 600 }}>Conversion funnel</div>
          <Funnel stages={[
            { label: 'Leads',         value: 4820, color: '#9ea0b3' },
            { label: 'Qualified',     value: 1284, color: '#6affe0' },
            { label: 'Demos booked',  value:  642, color: '#ffb547' },
            { label: 'Proposals sent',value:  248, color: '#ff6bcb' },
            { label: 'Closed won',    value:   84, color: '#b6ff3c' },
          ]} />
        </motion.div>

        <motion.div className="sc-card p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}>
          <div className="sc-sans mb-4" style={{ fontSize: 14, fontWeight: 600 }}>Won by source</div>
          <DonutChart size={200} thickness={18}
            centerLabel="84" centerSubLabel="DEALS" segments={[
            { label: 'Inbound', value: 42, color: '#b6ff3c' },
            { label: 'Outbound', value: 24, color: '#6affe0' },
            { label: 'Partner', value: 12, color: '#ff6bcb' },
            { label: 'Event', value: 6, color: '#7a5cff' },
          ]} />
        </motion.div>
      </div>

      {/* Recent deals table */}
      <motion.div className="sc-card p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
        <div className="flex items-center justify-between mb-4">
          <div className="sc-sans" style={{ fontSize: 14, fontWeight: 600 }}>Hot deals</div>
          <div className="relative">
            <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--sc-text-faint)' }} />
            <input placeholder="Search deals..." className="sc-input pl-8" style={{ width: 220 }} data-testid="deal-search" />
          </div>
        </div>
        <div className="overflow-x-auto sc-scroll">
          <table className="sc-table">
            <thead><tr><th>COMPANY</th><th>OWNER</th><th>VALUE</th><th>STAGE</th><th>PROBABILITY</th><th>CLOSE</th><th></th></tr></thead>
            <tbody>
              {deals.map((d, i) => (
                <tr key={i}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${d.color}22`, color: d.color, fontWeight: 700 }}>
                        {d.c[0]}
                      </div>
                      <div>
                        <div>{d.c}</div>
                        <div style={{ fontSize: 10, color: 'var(--sc-text-faint)' }}>{d.l}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ color: 'var(--sc-text-dim)' }}>{d.l}</td>
                  <td style={{ fontFamily: 'monospace', color: 'var(--sc-accent)' }}>{d.v}</td>
                  <td><span className="sc-chip" style={{ color: d.color, borderColor: `${d.color}40`, background: `${d.color}15` }}>{d.s}</span></td>
                  <td style={{ width: 160 }}>
                    <div className="flex items-center gap-2">
                      <div className="sc-progress flex-1">
                        <motion.div className="sc-progress-bar" initial={{ width: 0 }} animate={{ width: `${d.p}%` }} transition={{ duration: 1 }} />
                      </div>
                      <span style={{ fontSize: 11, fontFamily: 'monospace' }}>{d.p}%</span>
                    </div>
                  </td>
                  <td style={{ color: 'var(--sc-text-dim)' }}>in {d.due}</td>
                  <td>
                    <div className="flex gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-white/5"><Phone size={12} /></button>
                      <button className="p-1.5 rounded-lg hover:bg-white/5"><Mail size={12} /></button>
                      <button className="p-1.5 rounded-lg hover:bg-white/5"><MoreHorizontal size={12} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </DashboardShell>
  );
}
