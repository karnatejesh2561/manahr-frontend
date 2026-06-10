'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Plus, MoreHorizontal, Calendar, Users, Flag, CheckCircle2, Clock } from 'lucide-react';
import DashboardShell from '@/components/showcase/DashboardShell';
import { AreaChart, RadialGauge, AnimatedNumber } from '@/components/showcase/Charts';

const columns = [
  { name: 'Backlog', color: '#9ea0b3', count: 12 },
  { name: 'In Progress', color: '#6affe0', count: 8 },
  { name: 'Review', color: '#ffb547', count: 4 },
  { name: 'Done', color: '#b6ff3c', count: 22 },
];

const cards = [
  [
    { t: 'Migrate auth to OAuth 2.1', a: 'YT', c: '#b6ff3c', p: 'low', d: 'Dec 20', tags: ['backend'] },
    { t: 'Refactor billing module', a: 'MH', c: '#6affe0', p: 'med', d: 'Dec 24', tags: ['billing','refactor'] },
    { t: 'A/B test onboarding flow', a: 'SR', c: '#ff6bcb', p: 'low', d: 'Jan 04', tags: ['growth'] },
  ],
  [
    { t: 'Real-time analytics websocket', a: 'LP', c: '#7a5cff', p: 'high', d: 'Dec 12', tags: ['infra'] },
    { t: 'Mobile app deeplinking', a: 'HS', c: '#ffb547', p: 'med', d: 'Dec 14', tags: ['mobile'] },
    { t: 'AI summarizer endpoint', a: 'RO', c: '#5cf2a3', p: 'high', d: 'Dec 11', tags: ['ai','api'] },
  ],
  [
    { t: 'Dashboard charting v2 audit', a: 'MH', c: '#6affe0', p: 'med', d: 'Dec 10', tags: ['design-review'] },
    { t: 'Stripe webhooks hardening', a: 'YT', c: '#b6ff3c', p: 'high', d: 'Dec 09', tags: ['payments'] },
  ],
  [
    { t: 'Audit log immutable store', a: 'LP', c: '#7a5cff', p: 'high', d: 'Dec 05', tags: ['security'] },
    { t: 'Localization · ja-JP', a: 'HS', c: '#ffb547', p: 'low', d: 'Dec 02', tags: ['i18n'] },
  ],
];

const priorityColor = (p: string) => p === 'high' ? '#ff5e7e' : p === 'med' ? '#ffb547' : '#6affe0';

export default function ProjectsPage() {
  return (
    <DashboardShell
      title="Projects & sprints"
      subtitle="Kanban, sprint goals, Gantt — manage delivery across 14 active projects."
      breadcrumb={['Workspace', 'Delivery', 'Projects']}
      actions={
        <>
          <button className="sc-btn"><Users size={13} />Team</button>
          <button className="sc-btn"><Calendar size={13} />Sprint planner</button>
          <button className="sc-btn sc-btn-primary"><Plus size={13} />New task</button>
        </>
      }
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { l: 'Active projects', v: 14, c: '#b6ff3c' },
          { l: 'Tasks this sprint', v: 46, c: '#6affe0' },
          { l: 'Velocity', v: 38, suffix: ' pts', c: '#ff6bcb' },
          { l: 'Cycle time', v: 3.2, suffix: 'd', decimals: 1, c: '#ffb547' },
        ].map((k, i) => (
          <motion.div key={k.l} className="sc-card p-5"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <div style={{ fontSize: 11, color: 'var(--sc-text-faint)' }}>{k.l.toUpperCase()}</div>
            <div className="sc-stat-value mt-2" style={{ color: k.c }}><AnimatedNumber value={k.v} suffix={k.suffix} decimals={k.decimals ?? 0} /></div>
          </motion.div>
        ))}
      </div>

      {/* Kanban */}
      <motion.div className="mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        <div className="flex items-center justify-between mb-3">
          <div className="sc-sans" style={{ fontSize: 14, fontWeight: 600 }}>Sprint 42 · current</div>
          <div className="flex items-center gap-3" style={{ fontSize: 12, color: 'var(--sc-text-dim)' }}>
            <Clock size={12} />Ends in 4d 12h
            <div className="sc-tabs"><div className="sc-tab active">Kanban</div><div className="sc-tab">List</div><div className="sc-tab">Timeline</div></div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {columns.map((col, ci) => (
            <div key={col.name} className="sc-kanban-col">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: col.color, boxShadow: `0 0 8px ${col.color}` }} />
                  <span className="sc-sans" style={{ fontSize: 12, fontWeight: 600 }}>{col.name}</span>
                </div>
                <span className="sc-chip" style={{ fontSize: 10 }}>{col.count}</span>
              </div>
              <div>
                {cards[ci].map((c, i) => (
                  <motion.div key={i} className="sc-kanban-card"
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: ci * 0.06 + i * 0.04 }}>
                    <div className="flex justify-between items-start mb-2">
                      <div style={{ fontSize: 13, fontWeight: 500, lineHeight: 1.4 }}>{c.t}</div>
                      <button className="p-0.5 -mr-1 -mt-1"><MoreHorizontal size={12} style={{ color: 'var(--sc-text-faint)' }} /></button>
                    </div>
                    <div className="flex gap-1 flex-wrap mb-3">
                      {c.tags.map(t => <span key={t} className="sc-chip" style={{ fontSize: 9, padding: '2px 6px' }}>{t}</span>)}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Flag size={10} style={{ color: priorityColor(c.p) }} />
                        <span style={{ fontSize: 10, color: priorityColor(c.p) }}>{c.p.toUpperCase()}</span>
                        <span style={{ fontSize: 10, color: 'var(--sc-text-faint)', marginLeft: 6 }}>· {c.d}</span>
                      </div>
                      <div className="sc-avatar" style={{ background: `linear-gradient(135deg, ${c.c}, ${c.c}77)`, width: 22, height: 22, fontSize: 9 }}>{c.a}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <button className="w-full text-xs py-2 rounded-lg mt-2 flex items-center justify-center gap-1.5"
                      style={{ color: 'var(--sc-text-faint)', border: '1px dashed var(--sc-border)' }}>
                <Plus size={11} />Add task
              </button>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Gantt-style timeline + sprint burndown */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <motion.div className="sc-card p-6 xl:col-span-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <div className="flex items-start justify-between mb-4">
            <div className="sc-sans" style={{ fontSize: 14, fontWeight: 600 }}>Project timeline</div>
            <div style={{ fontSize: 11, color: 'var(--sc-text-faint)' }}>Q4 2026 · 14 projects</div>
          </div>
          <div className="space-y-3">
            {[
              { n: 'Atlas · core platform', start: 5, len: 60, c: '#b6ff3c', p: 70 },
              { n: 'Orion · mobile rewrite', start: 20, len: 40, c: '#6affe0', p: 35 },
              { n: 'Helix · AI infra', start: 0, len: 80, c: '#ff6bcb', p: 90 },
              { n: 'Vega · billing v3', start: 35, len: 40, c: '#ffb547', p: 22 },
              { n: 'Nova · public APIs', start: 50, len: 40, c: '#7a5cff', p: 8 },
              { n: 'Pulse · analytics', start: 15, len: 65, c: '#5cf2a3', p: 55 },
            ].map((p, i) => (
              <div key={p.n} className="grid grid-cols-[150px,1fr] items-center gap-3">
                <div style={{ fontSize: 12 }}>{p.n}</div>
                <div className="relative h-7 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <motion.div
                    className="absolute top-0 bottom-0 rounded-lg flex items-center justify-end px-2"
                    style={{ background: `linear-gradient(90deg, ${p.c}, ${p.c}66)`, left: `${p.start}%`, boxShadow: `0 0 12px ${p.c}55` }}
                    initial={{ width: 0 }} animate={{ width: `${p.len}%` }} transition={{ delay: i * 0.06, duration: 1 }}
                  >
                    <span style={{ fontSize: 10, color: '#0a0a0f', fontWeight: 700 }}>{p.p}%</span>
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-4 mt-4" style={{ fontSize: 10, color: 'var(--sc-text-faint)' }}>
            <span>Oct</span><span>Nov</span><span>Dec</span><span>Jan</span>
          </div>
        </motion.div>

        <motion.div className="sc-card p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}>
          <div className="sc-sans mb-3" style={{ fontSize: 14, fontWeight: 600 }}>Sprint health</div>
          <RadialGauge value={82} color="#b6ff3c" label="ON TRACK" />
          <div className="mt-4 space-y-2">
            {[
              { l: 'Committed', v: 46, c: '#9ea0b3' },
              { l: 'Done', v: 22, c: '#b6ff3c' },
              { l: 'At risk', v: 6, c: '#ffb547' },
              { l: 'Blocked', v: 2, c: '#ff5e7e' },
            ].map(s => (
              <div key={s.l} className="flex justify-between items-center p-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.025)' }}>
                <span className="flex items-center gap-2" style={{ fontSize: 12 }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.c }} />{s.l}
                </span>
                <span style={{ fontFamily: 'monospace', fontSize: 12 }}>{s.v}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardShell>
  );
}
