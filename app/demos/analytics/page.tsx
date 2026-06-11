'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Eye, Clock, MousePointerClick, Globe2, Sparkles } from 'lucide-react';
import DashboardShell from '@/components/demos/DashboardShell';
import { AreaChart, BarChart, DonutChart, RadialGauge, Heatmap, Funnel, MultiLineChart, AnimatedNumber, Sparkline } from '@/components/demos/Charts';

export default function AnalyticsPage() {
  const heatmapData = React.useMemo(() =>
    Array.from({ length: 28 * 7 }, (_, i) => {
      // Deterministic pseudo-random — stable between SSR & CSR
      const v = Math.abs(Math.sin(i * 12.9898) * 43758.5453);
      return Math.floor((v - Math.floor(v)) * 100) + (i % 7 === 0 ? 30 : 0);
    }), []);
  return (
    <DashboardShell
      title="Analytics studio"
      subtitle="A live, multi-dimensional view of your traffic, funnel and retention."
      breadcrumb={['Workspace', 'Acme Holdings', 'Analytics']}
      actions={
        <>
          <div className="sc-tabs"><div className="sc-tab active">7d</div><div className="sc-tab">30d</div><div className="sc-tab">90d</div><div className="sc-tab">YTD</div></div>
          <button className="sc-btn sc-btn-primary"><Sparkles size={13} />Ask AI</button>
        </>
      }
    >
      {/* KPI row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6 sc-kpi-grid">
        {[
          { l: 'Visitors', v: 482910, delta: '+18.2%', icon: Eye, c: '#b6ff3c', s: [40,52,48,60,72,80,86,94] },
          { l: 'Sessions', v: 1284902, delta: '+12.4%', icon: MousePointerClick, c: '#6affe0', s: [30,42,45,52,58,62,70,78] },
          { l: 'Avg. session', v: 4.2, suffix: 'm', decimals: 1, delta: '+0.4m', icon: Clock, c: '#ff6bcb', s: [3.2,3.4,3.6,3.8,3.9,4.0,4.1,4.2] },
          { l: 'Bounce rate', v: 28.4, suffix: '%', decimals: 1, delta: '−3.1%', icon: Activity, c: '#7a5cff', s: [38,36,34,33,31,30,29,28] },
        ].map((k, i) => {
          const Icon = k.icon;
          return (
            <motion.div key={k.l} className="sc-card p-5"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
              <div className="flex justify-between items-start">
                <Icon size={16} style={{ color: k.c }} />
                <span className="sc-chip sc-chip-success" style={{ fontSize: 10 }}>{k.delta}</span>
              </div>
              <div style={{ fontSize: 11, color: 'var(--sc-text-faint)', marginTop: 14 }}>{k.l.toUpperCase()}</div>
              <div className="sc-stat-value mt-1"><AnimatedNumber value={k.v} suffix={k.suffix} decimals={k.decimals ?? 0} /></div>
              <div className="mt-3"><Sparkline data={k.s} color={k.c} height={28} /></div>
            </motion.div>
          );
        })}
      </div>

      {/* Main split */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">
        <motion.div className="sc-card p-6 xl:col-span-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="sc-sans" style={{ fontSize: 14, fontWeight: 600 }}>Traffic over time</div>
              <div style={{ fontSize: 11, color: 'var(--sc-text-faint)', marginTop: 4 }}>Sessions across channels — 30 days</div>
            </div>
            <div className="sc-tabs"><div className="sc-tab active">Sessions</div><div className="sc-tab">Users</div><div className="sc-tab">Events</div></div>
          </div>
          <MultiLineChart height={280} labels={['1','5','10','15','20','25','30']} series={[
            { name: 'Organic',  color: '#b6ff3c', data: [320, 380, 420, 450, 520, 580, 650] },
            { name: 'Direct',   color: '#6affe0', data: [240, 260, 290, 310, 330, 360, 410] },
            { name: 'Social',   color: '#ff6bcb', data: [180, 220, 200, 260, 280, 320, 340] },
            { name: 'Paid',     color: '#ffb547', data: [120, 140, 160, 150, 180, 210, 240] },
          ]} />
          <div className="flex flex-wrap gap-3 mt-3">
            {[{n:'Organic',c:'#b6ff3c'},{n:'Direct',c:'#6affe0'},{n:'Social',c:'#ff6bcb'},{n:'Paid',c:'#ffb547'}].map(s => (
              <div key={s.n} className="flex items-center gap-2" style={{ fontSize: 11, color: 'var(--sc-text-dim)' }}>
                <span className="w-2 h-2 rounded-full" style={{ background: s.c, boxShadow: `0 0 8px ${s.c}` }} />{s.n}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div className="sc-card p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
          <div className="sc-sans mb-4" style={{ fontSize: 14, fontWeight: 600 }}>Conversion funnel</div>
          <Funnel stages={[
            { label: 'Visitors',     value: 482910, color: '#b6ff3c' },
            { label: 'Sign-ups',     value: 124820, color: '#6affe0' },
            { label: 'Activated',    value:  62410, color: '#ff6bcb' },
            { label: 'Paid users',   value:  18420, color: '#7a5cff' },
            { label: 'Power users',  value:   4824, color: '#ffb547' },
          ]} />
          <div className="grid grid-cols-2 gap-2 mt-5">
            <div className="rounded-xl p-3" style={{ background: 'rgba(0,0,0,0.03)' }}>
              <div style={{ fontSize: 10, color: 'var(--sc-text-faint)' }}>OVERALL</div>
              <div className="sc-display mt-1" style={{ fontSize: 22, color: 'var(--sc-accent)' }}>3.81%</div>
            </div>
            <div className="rounded-xl p-3" style={{ background: 'rgba(0,0,0,0.03)' }}>
              <div style={{ fontSize: 10, color: 'var(--sc-text-faint)' }}>BENCHMARK</div>
              <div className="sc-display mt-1" style={{ fontSize: 22 }}>2.4%</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Heatmap + rest */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">
        <motion.div className="sc-card p-6 xl:col-span-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}>
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="sc-sans" style={{ fontSize: 14, fontWeight: 600 }}>User activity heatmap</div>
              <div style={{ fontSize: 11, color: 'var(--sc-text-faint)', marginTop: 4 }}>Hour × day · last 28 days</div>
            </div>
            <div className="flex items-center gap-1.5">
              <span style={{ fontSize: 10, color: 'var(--sc-text-faint)' }}>Less</span>
              {['#1a1a24', '#3a4a1f', '#6f9a2a', '#9fd935', '#b6ff3c'].map(c => (
                <span key={c} className="w-3 h-3 rounded-sm" style={{ background: c }} />
              ))}
              <span style={{ fontSize: 10, color: 'var(--sc-text-faint)' }}>More</span>
            </div>
          </div>
          <Heatmap data={heatmapData} cols={28} rows={7} />
        </motion.div>

        <motion.div className="sc-card p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <div className="sc-sans mb-4" style={{ fontSize: 14, fontWeight: 600 }}>Goal completion</div>
          <RadialGauge value={68} color="#6affe0" label="68% of monthly goal" />
          <div className="mt-4 space-y-3">
            {[
              { l: 'MQLs', v: 4280, t: 6000, c: '#b6ff3c' },
              { l: 'SQLs', v: 1240, t: 1800, c: '#6affe0' },
              { l: 'Demos', v: 320, t: 500, c: '#ff6bcb' },
            ].map(g => (
              <div key={g.l}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span style={{ color: 'var(--sc-text-dim)' }}>{g.l}</span>
                  <span style={{ fontFamily: 'monospace' }}>{g.v.toLocaleString()} / {g.t.toLocaleString()}</span>
                </div>
                <div className="sc-progress">
                  <motion.div className="sc-progress-bar" style={{ background: `linear-gradient(90deg, ${g.c}, ${g.c}77)`, boxShadow: `0 0 12px ${g.c}` }}
                    initial={{ width: 0 }} animate={{ width: `${(g.v/g.t)*100}%` }} transition={{ duration: 1 }} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Pages + Devices */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <motion.div className="sc-card p-6 xl:col-span-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}>
          <div className="sc-sans mb-4" style={{ fontSize: 14, fontWeight: 600 }}>Top pages</div>
          <table className="sc-table">
            <thead><tr><th>PAGE</th><th>VIEWS</th><th>BOUNCE</th><th>AVG TIME</th><th>TREND</th></tr></thead>
            <tbody>
              {[
                { p: '/home', v: '128.4k', b: '24%', t: '4m 28s', s: [40,48,44,52,58,62,70,76] },
                { p: '/pricing', v: '84.2k', b: '32%', t: '2m 14s', s: [30,28,34,32,38,42,40,46] },
                { p: '/blog/ai-future', v: '62.8k', b: '18%', t: '6m 52s', s: [20,28,34,42,48,54,58,68] },
                { p: '/features', v: '48.1k', b: '28%', t: '3m 02s', s: [22,26,28,30,34,38,42,46] },
                { p: '/case-studies/acme', v: '32.6k', b: '14%', t: '8m 41s', s: [10,14,18,22,28,32,38,44] },
                { p: '/docs/api', v: '28.4k', b: '8%', t: '12m 12s', s: [8,12,16,18,22,26,30,36] },
              ].map((r, i) => (
                <tr key={i}>
                  <td><span style={{ fontFamily: 'monospace', color: 'var(--sc-accent)' }}>{r.p}</span></td>
                  <td>{r.v}</td>
                  <td>{r.b}</td>
                  <td style={{ color: 'var(--sc-text-dim)' }}>{r.t}</td>
                  <td style={{ width: 120 }}><Sparkline data={r.s} color="#6affe0" height={22} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <motion.div className="sc-card p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          <div className="sc-sans mb-4" style={{ fontSize: 14, fontWeight: 600 }}>Devices & regions</div>
          <DonutChart size={180} thickness={18}
            centerLabel="62%" centerSubLabel="MOBILE"
            segments={[
              { label: 'Mobile', value: 62, color: '#b6ff3c' },
              { label: 'Desktop', value: 28, color: '#6affe0' },
              { label: 'Tablet', value: 10, color: '#ff6bcb' },
            ]} />
          <div className="mt-5 space-y-3">
            {[
              { r: 'Japan', f: '🇯🇵', p: 32, c: '#b6ff3c' },
              { r: 'United States', f: '🇺🇸', p: 24, c: '#6affe0' },
              { r: 'Germany', f: '🇩🇪', p: 16, c: '#ff6bcb' },
              { r: 'Brazil', f: '🇧🇷', p: 12, c: '#7a5cff' },
              { r: 'Other', f: '🌐', p: 16, c: '#ffb547' },
            ].map(r => (
              <div key={r.r}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="flex items-center gap-2"><span>{r.f}</span><span style={{ color: 'var(--sc-text-dim)' }}>{r.r}</span></span>
                  <span style={{ fontFamily: 'monospace' }}>{r.p}%</span>
                </div>
                <div className="sc-progress">
                  <motion.div className="sc-progress-bar" style={{ background: r.c, boxShadow: `0 0 8px ${r.c}` }}
                    initial={{ width: 0 }} animate={{ width: `${r.p*3}%` }} transition={{ duration: 1 }} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardShell>
  );
}
