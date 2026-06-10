'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Users, UserPlus, Calendar, TrendingUp, Briefcase } from 'lucide-react';
import DashboardShell from '@/components/showcase/DashboardShell';
import { AreaChart, BarChart, DonutChart, RadialGauge, Heatmap, AnimatedNumber, Sparkline } from '@/components/showcase/Charts';

export default function HRPage() {
  const heatData = React.useMemo(() =>
    Array.from({ length: 30 * 7 }, (_, i) => {
      // Deterministic pseudo-random — stable between SSR & CSR
      const v = Math.abs(Math.sin(i * 78.233) * 43758.5453);
      return Math.floor((v - Math.floor(v)) * 100);
    }), []);

  return (
    <DashboardShell
      title="People & culture"
      subtitle="A pulse on your team. Headcount, sentiment, hiring & attendance."
      breadcrumb={['Workspace', 'People', 'HR Dashboard']}
      actions={
        <>
          <button className="sc-btn"><Calendar size={13} />Schedule</button>
          <button className="sc-btn sc-btn-primary"><UserPlus size={13} />Hire</button>
        </>
      }
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { l: 'Total headcount', v: 248, d: '+12 this Q', c: '#b6ff3c', i: Users },
          { l: 'Open positions', v: 14, d: 'Engineering · 6', c: '#6affe0', i: Briefcase },
          { l: 'Avg. tenure', v: 3.4, suffix: 'y', decimals: 1, d: '+0.2', c: '#ff6bcb', i: TrendingUp },
          { l: 'eNPS', v: 62, d: '+8 QoQ', c: '#ffb547', i: TrendingUp },
        ].map((k, i) => {
          const I = k.i;
          return (
            <motion.div key={k.l} className="sc-card p-5"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <div className="flex justify-between items-start">
                <I size={16} style={{ color: k.c }} />
                <span className="sc-chip" style={{ fontSize: 10, color: k.c, borderColor: `${k.c}40` }}>{k.d}</span>
              </div>
              <div style={{ fontSize: 11, color: 'var(--sc-text-faint)', marginTop: 14 }}>{k.l.toUpperCase()}</div>
              <div className="sc-stat-value mt-1"><AnimatedNumber value={k.v} suffix={k.suffix} decimals={k.decimals ?? 0} /></div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">
        <motion.div className="sc-card p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <div className="sc-sans mb-4" style={{ fontSize: 14, fontWeight: 600 }}>Department mix</div>
          <DonutChart size={200} thickness={20} centerLabel="248" centerSubLabel="EMPLOYEES" segments={[
            { label: 'Engineering', value: 94, color: '#b6ff3c' },
            { label: 'Operations', value: 56, color: '#6affe0' },
            { label: 'Sales', value: 42, color: '#ff6bcb' },
            { label: 'HR & Finance', value: 28, color: '#7a5cff' },
            { label: 'Design', value: 28, color: '#ffb547' },
          ]} />
          <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
            {[
              {l:'Engineering',v:94,c:'#b6ff3c'},{l:'Operations',v:56,c:'#6affe0'},
              {l:'Sales',v:42,c:'#ff6bcb'},{l:'HR/Finance',v:28,c:'#7a5cff'},
            ].map(d => (
              <div key={d.l} className="flex items-center justify-between p-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)' }}>
                <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full" style={{ background: d.c }} />{d.l}</span>
                <span style={{ fontFamily: 'monospace' }}>{d.v}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div className="sc-card p-6 xl:col-span-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="sc-sans" style={{ fontSize: 14, fontWeight: 600 }}>Attendance heatmap</div>
              <div style={{ fontSize: 11, color: 'var(--sc-text-faint)', marginTop: 4 }}>30 days · darker = more on-site</div>
            </div>
            <span className="sc-chip sc-chip-success">94.2% avg</span>
          </div>
          <Heatmap data={heatData} cols={30} rows={7} colors={['#1a1a24', '#1f3a4a', '#2a6f9a', '#35a8d9', '#6affe0']} />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">
        <motion.div className="sc-card p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}>
          <div className="sc-sans mb-4" style={{ fontSize: 14, fontWeight: 600 }}>Hiring pipeline</div>
          <div className="space-y-3">
            {[
              { r: 'Sr. Frontend Engineer', a: 84, s: 'Interviewing', c: '#b6ff3c' },
              { r: 'Product Designer', a: 56, s: 'Sourcing', c: '#6affe0' },
              { r: 'Data Scientist', a: 42, s: 'Final round', c: '#ff6bcb' },
              { r: 'DevOps Lead', a: 28, s: 'Offer out', c: '#ffb547' },
              { r: 'AE · APAC', a: 96, s: 'Screening', c: '#7a5cff' },
            ].map((r, i) => (
              <motion.div key={r.r} className="flex items-center justify-between p-3 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--sc-border)' }}
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{r.r}</div>
                  <div style={{ fontSize: 10, color: 'var(--sc-text-faint)', marginTop: 2 }}>{r.a} candidates</div>
                </div>
                <span className="sc-chip" style={{ color: r.c, borderColor: `${r.c}40`, background: `${r.c}15` }}>{r.s}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div className="sc-card p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <div className="sc-sans mb-4" style={{ fontSize: 14, fontWeight: 600 }}>Employee NPS</div>
          <RadialGauge value={62} color="#ffb547" label="62 / 100" />
          <div className="mt-5 space-y-3">
            {[
              { l: 'Engineering', v: 74, c: '#b6ff3c' },
              { l: 'Operations', v: 58, c: '#6affe0' },
              { l: 'Sales', v: 48, c: '#ffb547' },
              { l: 'Design', v: 80, c: '#ff6bcb' },
            ].map(g => (
              <div key={g.l}>
                <div className="flex justify-between text-xs mb-1"><span style={{ color: 'var(--sc-text-dim)' }}>{g.l}</span><span style={{ fontFamily: 'monospace' }}>{g.v}</span></div>
                <div className="sc-progress"><motion.div className="sc-progress-bar" style={{ background: g.c, boxShadow: `0 0 8px ${g.c}` }} initial={{ width: 0 }} animate={{ width: `${g.v}%` }} transition={{ duration: 1 }} /></div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div className="sc-card p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}>
          <div className="sc-sans mb-4" style={{ fontSize: 14, fontWeight: 600 }}>Leave requests</div>
          <div className="space-y-3">
            {[
              { n: 'Ren Okada', a: 'RO', t: 'Vacation', d: 'Dec 18 – Dec 24', s: 'pending', c: '#ffb547' },
              { n: 'Hiroko Sato', a: 'HS', t: 'Sick leave', d: 'Tomorrow', s: 'approved', c: '#5cf2a3' },
              { n: 'Marcus Hale', a: 'MH', t: 'Personal', d: 'Dec 12', s: 'approved', c: '#5cf2a3' },
              { n: 'Sofia Reyes', a: 'SR', t: 'Vacation', d: 'Jan 2 – Jan 8', s: 'pending', c: '#ffb547' },
            ].map((r, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="sc-avatar" style={{ background: `linear-gradient(135deg, ${r.c}, ${r.c}77)`, width: 32, height: 32 }}>{r.a}</div>
                <div className="flex-1 min-w-0">
                  <div style={{ fontSize: 12 }}>{r.n}</div>
                  <div style={{ fontSize: 10, color: 'var(--sc-text-faint)' }}>{r.t} · {r.d}</div>
                </div>
                <span className={`sc-chip ${r.s === 'approved' ? 'sc-chip-success' : 'sc-chip-warning'}`} style={{ fontSize: 9 }}>{r.s}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Headcount over time */}
      <motion.div className="sc-card p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="sc-sans" style={{ fontSize: 14, fontWeight: 600 }}>Headcount growth</div>
            <div style={{ fontSize: 11, color: 'var(--sc-text-faint)', marginTop: 4 }}>Monthly · 12 month trailing</div>
          </div>
          <span className="sc-chip sc-chip-success">+24% YoY</span>
        </div>
        <AreaChart height={220} color="#7a5cff" color2="#ff6bcb"
          labels={['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']}
          data={[182, 188, 196, 204, 212, 218, 224, 230, 236, 242, 246, 248]} />
      </motion.div>
    </DashboardShell>
  );
}
