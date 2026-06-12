'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    TrendingUp, TrendingDown, Users, DollarSign, Briefcase, Activity,
    ArrowUpRight, MoreHorizontal, Sparkles, Download, Globe2, Zap,
} from 'lucide-react';
import DashboardShell from '@/components/demos/DashboardShell';
import { AreaChart, BarChart, DonutChart, RadialGauge, AnimatedNumber, Sparkline, MultiLineChart } from '@/components/demos/Charts';
import { useToast } from '@/components/demos/Interactions';

export default function ExecutiveWrapper() {
    const { push } = useToast();
    return (
        <DashboardShell
            title="Executive overview"
            subtitle="Your business at a glance — live since 09:24 JST. Last sync 12 seconds ago."
            breadcrumb={['Workspace', 'Acme Holdings', 'Executive']}
            actions={
                <>
                    <button className="sc-btn sc-btn-ghost" data-testid="date-range"><span style={{ fontSize: 12 }}>Last 30 days</span></button>
                    <button className="sc-btn" onClick={() => push('Executive report queued · PDF · 12 pages', 'info')} data-testid="export-btn"><Download size={13} />Export</button>
                    <button className="sc-btn sc-btn-primary" onClick={() => push('AI summary refreshed · 5 new insights', 'success')} data-testid="ai-summary"><Sparkles size={13} />AI Summary</button>
                </>
            }
        >
            {/* AI banner */}
            <motion.div className="sc-card p-5 mb-6 flex items-start gap-4 sc-ai-banner" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 sc-ring"
                    style={{ background: 'rgba(122,92,255,0.15)', border: '1px solid rgba(122,92,255,0.3)' }}>
                    <Sparkles size={18} style={{ color: 'var(--sc-accent-4)' }} />
                </div>
                <div className="flex-1">
                    <div className="sc-sans" style={{ fontSize: 13, fontWeight: 600 }}>This week, in one line</div>
                    <div style={{ fontSize: 13, color: 'var(--sc-text-dim)', marginTop: 4, lineHeight: 1.6 }}>
                        Revenue up <strong style={{ color: 'var(--sc-success)' }}>+24.3%</strong> WoW driven by APAC pipeline,
                        offset by a <strong style={{ color: 'var(--sc-danger)' }}>−5.8%</strong> dip in enterprise renewals.
                        Recommended action: prioritise the 4 deals over $80k stuck in &quot;Negotiation&quot;.
                    </div>
                </div>
                <button className="sc-btn sc-btn-ghost shrink-0">View 5 more insights</button>
            </motion.div>

            {/* KPI row */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
                {[
                    { label: 'TOTAL REVENUE', value: 1284902, prefix: '$', delta: '+24.3%', up: true, icon: DollarSign, color: '#b6ff3c', spark: [40, 45, 42, 55, 60, 58, 72, 80, 76, 92] },
                    { label: 'ACTIVE CUSTOMERS', value: 8472, delta: '+12.1%', up: true, icon: Users, color: '#6affe0', spark: [20, 22, 25, 28, 30, 33, 36, 40, 42, 46] },
                    { label: 'OPEN PROJECTS', value: 142, delta: '+3', up: true, icon: Briefcase, color: '#ff6bcb', spark: [120, 128, 132, 130, 138, 140, 142, 144, 142, 142] },
                    { label: 'CHURN RATE', value: 2.4, suffix: '%', decimals: 1, delta: '−0.6pp', up: true, icon: Activity, color: '#ffb547', spark: [4, 3.8, 3.5, 3.2, 3.0, 2.8, 2.7, 2.6, 2.5, 2.4] },
                ].map((k, i) => {
                    const Icon = k.icon;
                    return (
                        <motion.div key={k.label} className="sc-card p-5 sc-tilt"
                            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                            <div className="flex items-center justify-between">
                                <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                                    style={{ background: `${k.color}22`, border: `1px solid ${k.color}40` }}>
                                    <Icon size={16} style={{ color: k.color }} />
                                </div>
                                <span className={`sc-chip ${k.up ? 'sc-chip-success' : 'sc-chip-danger'}`}>
                                    {k.up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}{k.delta}
                                </span>
                            </div>
                            <div style={{ fontSize: 11, color: 'var(--sc-text-faint)', marginTop: 16 }}>{k.label}</div>
                            <div className="sc-stat-value mt-1">
                                <AnimatedNumber value={k.value} prefix={k.prefix} suffix={k.suffix} decimals={k.decimals ?? 0} />
                            </div>
                            <div className="mt-4 -mb-1"><Sparkline data={k.spark} color={k.color} height={32} /></div>
                        </motion.div>
                    );
                })}
            </div>

            <style jsx global>{`
        /* Mobile AI banner flex-col */
        @media (max-width: 767px) {
          .sc-ai-banner {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 8px !important;
          }
        }
      `}</style>

            {/* Main charts */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">
                <motion.div className="sc-card p-6 xl:col-span-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <div className="sc-sans" style={{ fontSize: 14, fontWeight: 600 }}>Revenue & forecast</div>
                            <div style={{ fontSize: 11, color: 'var(--sc-text-faint)', marginTop: 4 }}>Actual vs predicted · 12 months</div>
                        </div>
                        <div className="sc-tabs" data-testid="rev-tabs">
                            <div className="sc-tab active">Monthly</div>
                            <div className="sc-tab">Quarterly</div>
                            <div className="sc-tab">Yearly</div>
                        </div>
                    </div>
                    <MultiLineChart height={430} labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']} series={[
                        { name: 'Actual', color: '#b6ff3c', data: [620, 700, 680, 820, 880, 920, 1080, 1150, 1240, 1320, 1380, 1450] },
                        { name: 'Forecast', color: '#6affe0', data: [640, 720, 700, 800, 870, 950, 1100, 1180, 1260, 1350, 1430, 1520] },
                        { name: 'Last yr', color: '#7a5cff', data: [500, 540, 580, 620, 660, 720, 780, 820, 880, 950, 1020, 1100] },
                    ]} />
                    <div className="flex flex-wrap gap-3 mt-4">
                        {[{ n: 'Actual', c: '#b6ff3c' }, { n: 'Forecast', c: '#6affe0' }, { n: 'Last year', c: '#7a5cff' }].map(s => (
                            <div key={s.n} className="flex items-center gap-2" style={{ fontSize: 11, color: 'var(--sc-text-dim)' }}>
                                <span className="w-2 h-2 rounded-full" style={{ background: s.c, boxShadow: `0 0 8px ${s.c}` }} />
                                {s.n}
                            </div>
                        ))}
                    </div>
                </motion.div>

                <motion.div className="sc-card p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <div className="sc-sans" style={{ fontSize: 14, fontWeight: 600 }}>Revenue split</div>
                            <div style={{ fontSize: 11, color: 'var(--sc-text-faint)', marginTop: 4 }}>By product line</div>
                        </div>
                        <button className="p-1.5 rounded-lg hover:bg-white/5"><MoreHorizontal size={14} /></button>
                    </div>
                    <div className="relative">
                        <DonutChart
                            size={150} thickness={15}
                            segments={[
                                { label: 'SaaS', value: 58, color: '#b6ff3c' },
                                { label: 'Services', value: 22, color: '#6affe0' },
                                { label: 'Hardware', value: 12, color: '#ff6bcb' },
                                { label: 'Other', value: 8, color: '#7a5cff' },
                            ]}
                            centerLabel="$1.28M"
                            centerSubLabel="THIS MONTH"
                        />
                    </div>
                    <div className="space-y-2.5 mt-2">
                        {[
                            { l: 'SaaS', v: '$744k', p: 58, c: '#b6ff3c' },
                            { l: 'Services', v: '$282k', p: 22, c: '#6affe0' },
                            { l: 'Hardware', v: '$154k', p: 12, c: '#ff6bcb' },
                            { l: 'Other', v: '$104k', p: 8, c: '#7a5cff' },
                        ].map(r => (
                            <div key={r.l} className="flex items-center justify-between" style={{ fontSize: 12 }}>
                                <div className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: r.c }} />
                                    <span style={{ color: 'var(--sc-text-dim)' }}>{r.l}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span style={{ color: 'var(--sc-text)' }}>{r.v}</span>
                                    <span style={{ color: 'var(--sc-text-faint)', fontFamily: 'monospace', fontSize: 11 }}>{r.p}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Second row */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">
                <motion.div className="sc-card p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                    <div className="flex items-start justify-between mb-3">
                        <div>
                            <div className="sc-sans" style={{ fontSize: 14, fontWeight: 600 }}>NPS this quarter</div>
                            <div style={{ fontSize: 11, color: 'var(--sc-text-faint)', marginTop: 4 }}>Customer satisfaction</div>
                        </div>
                        <span className="sc-chip sc-chip-success">+8 pts</span>
                    </div>
                    <RadialGauge value={74} color="#b6ff3c" label="74 / 100" />
                    <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                        {[{ l: 'Promoters', v: '62%', c: '#5cf2a3' }, { l: 'Passives', v: '24%', c: '#ffb547' }, { l: 'Detractors', v: '14%', c: '#ff5e7e' }].map(s => (
                            <div key={s.l} className="rounded-lg p-2" style={{ background: 'rgba(0,0,0,0.03)' }}>
                                <div style={{ fontSize: 14, color: s.c, fontFamily: 'Instrument Serif, serif' }}>{s.v}</div>
                                <div style={{ fontSize: 10, color: 'var(--sc-text-faint)' }}>{s.l}</div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <motion.div className="sc-card p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}>
                    <div className="flex items-start justify-between mb-3">
                        <div>
                            <div className="sc-sans" style={{ fontSize: 14, fontWeight: 600 }}>Bookings by region</div>
                            <div style={{ fontSize: 11, color: 'var(--sc-text-faint)', marginTop: 4 }}>Past 30 days</div>
                        </div>
                        <Globe2 size={14} style={{ color: 'var(--sc-text-faint)' }} />
                    </div>
                    <BarChart height={650} labels={['APAC', 'NA', 'EU', 'LATAM', 'MEA']} data={[342, 528, 412, 188, 96]} color="#6affe0" />
                    <div className="space-y-1.5 mt-2">
                        {[
                            { r: 'North America', v: '$528k', p: 38, c: '#6affe0' },
                            { r: 'APAC', v: '$342k', p: 25, c: '#b6ff3c' },
                            { r: 'Europe', v: '$412k', p: 30, c: '#ff6bcb' },
                        ].map(x => (
                            <div key={x.r} className="flex items-center justify-between" style={{ fontSize: 12 }}>
                                <span style={{ color: 'var(--sc-text-dim)' }}>{x.r}</span>
                                <span>{x.v}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <motion.div className="sc-card p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <div className="sc-sans" style={{ fontSize: 14, fontWeight: 600 }}>Top performers</div>
                            <div style={{ fontSize: 11, color: 'var(--sc-text-faint)', marginTop: 4 }}>Sales · this week</div>
                        </div>
                        <Zap size={14} style={{ color: 'var(--sc-accent)' }} />
                    </div>
                    <div className="space-y-3">
                        {[
                            { n: 'Yui Tanaka', r: 'AE · APAC', v: '$124,800', d: '+34%', c: '#b6ff3c', i: 'YT' },
                            { n: 'Marcus Hale', r: 'AE · NA', v: '$98,500', d: '+22%', c: '#6affe0', i: 'MH' },
                            { n: 'Sofia Reyes', r: 'AE · LATAM', v: '$74,200', d: '+18%', c: '#ff6bcb', i: 'SR' },
                            { n: 'Leon Park', r: 'SDR · APAC', v: '$48,600', d: '+12%', c: '#7a5cff', i: 'LP' },
                            { n: 'Yui Tanaka', r: 'AE · APAC', v: '$124,800', d: '+34%', c: '#b6ff3c', i: 'YT' },
                            { n: 'Marcus Hale', r: 'AE · NA', v: '$98,500', d: '+22%', c: '#6affe0', i: 'MH' },
                            { n: 'Sofia Reyes', r: 'AE · LATAM', v: '$74,200', d: '+18%', c: '#ff6bcb', i: 'ST' },
                            { n: 'Leon Park', r: 'SDR · APAC', v: '$48,600', d: '+12%', c: '#7a5cff', i: 'LU' },
                        ].map((p, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div className="sc-avatar" style={{ background: `linear-gradient(135deg, ${p.c}, ${p.c}77)`, width: 32, height: 32 }}>{p.i}</div>
                                <div className="flex-1 min-w-0">
                                    <div style={{ fontSize: 12, fontWeight: 500 }}>{p.n}</div>
                                    <div style={{ fontSize: 10, color: 'var(--sc-text-faint)' }}>{p.r}</div>
                                </div>
                                <div className="text-right">
                                    <div style={{ fontSize: 12, fontFamily: 'monospace' }}>{p.v}</div>
                                    <div style={{ fontSize: 10, color: 'var(--sc-success)' }}>{p.d}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Activity row */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                <motion.div className="sc-card p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
                    <div className="flex items-start justify-between mb-4">
                        <div className="sc-sans" style={{ fontSize: 14, fontWeight: 600 }}>Recent activity</div>
                        <button className="sc-btn sc-btn-ghost" style={{ padding: '4px 10px', fontSize: 11 }}>View all</button>
                    </div>
                    <div className="space-y-3">
                        {[
                            { t: 'New deal closed', d: 'Northwind — $84,000 · APAC', tm: '2m ago', c: '#b6ff3c' },
                            { t: 'Payment received', d: 'Stripe · $12,400 from Globex', tm: '14m ago', c: '#6affe0' },
                            { t: 'Customer churn alert', d: 'Vandelay Industries (90-day inactive)', tm: '38m ago', c: '#ff5e7e' },
                            { t: 'New employee onboarded', d: 'Ren Okada · Engineering', tm: '1h ago', c: '#7a5cff' },
                        ].map((a, i) => (
                            <div key={i} className="flex items-start gap-3 pb-3 border-b last:border-0" style={{ borderColor: 'var(--sc-border)' }}>
                                <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: a.c, boxShadow: `0 0 6px ${a.c}` }} />
                                <div className="flex-1">
                                    <div style={{ fontSize: 12 }}>{a.t}</div>
                                    <div style={{ fontSize: 11, color: 'var(--sc-text-faint)', marginTop: 2 }}>{a.d}</div>
                                </div>
                                <div style={{ fontSize: 10, color: 'var(--sc-text-faint)', fontFamily: 'monospace' }}>{a.tm}</div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <motion.div className="sc-card p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75 }}>
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <div className="sc-sans" style={{ fontSize: 14, fontWeight: 600 }}>Cash position</div>
                            <div style={{ fontSize: 11, color: 'var(--sc-text-faint)', marginTop: 4 }}>Net flow · 90 days</div>
                        </div>
                        <span className="sc-chip sc-chip-accent">Runway 18mo</span>
                    </div>
                    <AreaChart height={210} labels={['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10', 'W11', 'W12']}
                        color="#b6ff3c" color2="#6affe0"
                        data={[420, 460, 442, 488, 510, 540, 580, 622, 660, 705, 742, 798]} />
                    <div className="grid grid-cols-3 gap-3 mt-4">
                        {[
                            { l: 'Inflow', v: '$1.42M', c: '#5cf2a3' },
                            { l: 'Outflow', v: '$682k', c: '#ff5e7e' },
                            { l: 'Net', v: '+$738k', c: '#b6ff3c' },
                        ].map(x => (
                            <div key={x.l} className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                                <div style={{ fontSize: 10, color: 'var(--sc-text-faint)' }}>{x.l.toUpperCase()}</div>
                                <div className="sc-display mt-1" style={{ fontSize: 20, color: x.c }}>{x.v}</div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </DashboardShell>
    );
}
