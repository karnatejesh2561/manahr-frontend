'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Briefcase, Users, Boxes, BarChart3, ClipboardList, Wallet,
  UserCog, Settings, ShieldCheck, Lock, ArrowUpRight, Sparkles, ArrowRight, Star,
} from 'lucide-react';
import { AreaChart, BarChart, DonutChart, Sparkline } from '@/components/showcase/Charts';

const screens = [
  {
    href: '/showcase/executive',
    title: 'Executive',
    desc: 'C-suite control tower with revenue, growth & cohort insights.',
    icon: LayoutDashboard,
    accent: '#b6ff3c',
    preview: () => <AreaChart height={120} data={[40, 52, 49, 68, 75, 82, 78, 95, 102, 118]} color="#b6ff3c" color2="#6affe0" />,
    tags: ['12 KPIs', '8 charts', 'AI summary'],
  },
  {
    href: '/showcase/analytics',
    title: 'Analytics',
    desc: 'Multi-dimensional analytics, funnels, cohorts & heatmaps.',
    icon: BarChart3,
    accent: '#6affe0',
    preview: () => <BarChart height={120} data={[24, 38, 32, 45, 52, 48, 62, 70, 58, 75, 82, 91]} color="#6affe0" />,
    tags: ['Funnels', 'Heatmaps', 'Cohorts'],
  },
  {
    href: '/showcase/crm',
    title: 'CRM',
    desc: 'Leads, deals, pipeline & customer relationships.',
    icon: Briefcase,
    accent: '#ff6bcb',
    preview: () => <DonutChart size={120} thickness={14} segments={[
      { label: 'Won', value: 42, color: '#b6ff3c' },
      { label: 'Active', value: 36, color: '#6affe0' },
      { label: 'Lost', value: 22, color: '#ff5e7e' },
    ]} />,
    tags: ['Pipeline', 'Forecast'],
  },
  {
    href: '/showcase/hr',
    title: 'HR',
    desc: 'Headcount, attendance, leave & hiring pipeline.',
    icon: Users,
    accent: '#7a5cff',
    preview: () => <Sparkline data={[20, 22, 21, 24, 28, 31, 30, 34, 38, 42]} color="#7a5cff" height={120} />,
    tags: ['Org', 'Attendance'],
  },
  {
    href: '/showcase/inventory',
    title: 'Inventory',
    desc: 'Real-time stock, vendors, warehouses & purchase orders.',
    icon: Boxes,
    accent: '#ffb547',
    preview: () => <BarChart height={120} data={[60, 45, 80, 72, 50, 95, 88, 70, 55, 85]} color="#ffb547" />,
    tags: ['Stock', 'POs', 'Vendors'],
  },
  {
    href: '/showcase/projects',
    title: 'Projects',
    desc: 'Kanban, sprints, Gantt & team allocation.',
    icon: ClipboardList,
    accent: '#5cf2a3',
    preview: () => <AreaChart height={120} data={[20, 30, 28, 42, 38, 55, 60, 72, 80, 88]} color="#5cf2a3" color2="#b6ff3c" />,
    tags: ['Kanban', 'Gantt'],
  },
  {
    href: '/showcase/finance',
    title: 'Finance',
    desc: 'P&L, expenses, invoices & cash flow analytics.',
    icon: Wallet,
    accent: '#b6ff3c',
    preview: () => <BarChart height={120} data={[50, 65, 55, 72, 68, 80, 75, 88, 82, 95]} color="#b6ff3c" />,
    tags: ['P&L', 'Invoices'],
  },
  {
    href: '/showcase/employees',
    title: 'Employees',
    desc: 'Directory, profiles, attendance & documents.',
    icon: Users,
    accent: '#ff6bcb',
    preview: () => <DonutChart size={120} thickness={14} segments={[
      { label: 'Eng', value: 38, color: '#b6ff3c' },
      { label: 'Ops', value: 24, color: '#6affe0' },
      { label: 'Sales', value: 18, color: '#ff6bcb' },
      { label: 'HR', value: 12, color: '#7a5cff' },
    ]} />,
    tags: ['Directory'],
  },
  {
    href: '/showcase/users',
    title: 'Users & Roles',
    desc: 'Granular RBAC, permission matrix & SSO.',
    icon: UserCog,
    accent: '#6affe0',
    preview: () => <Sparkline data={[12, 18, 15, 22, 26, 30, 34, 40, 46, 52]} color="#6affe0" height={120} />,
    tags: ['RBAC', 'SSO'],
  },
  {
    href: '/showcase/settings',
    title: 'Settings',
    desc: 'Workspace, branding, security & integrations.',
    icon: Settings,
    accent: '#9ea0b3',
    preview: () => <AreaChart height={120} data={[10, 14, 12, 18, 22, 20, 26, 30, 28, 34]} color="#9ea0b3" color2="#6affe0" />,
    tags: ['Workspace'],
  },
  {
    href: '/showcase/audit',
    title: 'Audit Log',
    desc: 'Immutable activity stream with anomaly detection.',
    icon: ShieldCheck,
    accent: '#ff5e7e',
    preview: () => <BarChart height={120} data={[10, 22, 18, 30, 26, 38, 42, 35, 48, 52]} color="#ff5e7e" />,
    tags: ['Compliance'],
  },
  {
    href: '/showcase/auth/login',
    title: 'Auth Suite',
    desc: 'Login, Register, OTP, Reset & MFA — 5 flows.',
    icon: Lock,
    accent: '#7a5cff',
    preview: () => <Sparkline data={[5, 12, 18, 15, 22, 30, 36, 42, 48, 60]} color="#7a5cff" height={120} />,
    tags: ['5 screens'],
  },
];

export default function ShowcaseIndex() {
  return (
    <div className="sc-root sc-shell" data-testid="showcase-index">
      <div className="sc-aurora"><div className="blob3" /></div>
      <div className="sc-grid-texture" />

      {/* Top bar */}
      <header className="relative z-10 flex items-center justify-between px-6 lg:px-12 py-6 border-b" style={{ borderColor: 'var(--sc-border)' }}>
        <Link href="/" className="flex items-center gap-3" data-testid="back-to-site">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
               style={{ background: 'linear-gradient(135deg, var(--sc-accent), var(--sc-accent-2))' }}>
            <span style={{ color: '#0a0a0f', fontWeight: 800 }}>M</span>
          </div>
          <div className="sc-sans" style={{ fontSize: 13, fontWeight: 600 }}>ManaTech</div>
          <span className="sc-chip" style={{ marginLeft: 8 }}>Showcase</span>
        </Link>
        <div className="flex items-center gap-2">
          <span className="sc-chip"><span className="sc-pulse-dot" />Live preview</span>
          <Link href="/" className="sc-btn sc-btn-ghost" data-testid="exit-showcase">← Main site</Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 px-6 lg:px-12 pt-20 pb-12 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="flex items-center gap-3 mb-6">
            <span className="sc-chip sc-chip-accent"><Sparkles size={11} /> Portfolio · v2026.1</span>
            <span className="sc-chip">12 modules</span>
            <span className="sc-chip">70+ screens</span>
          </div>
          <h1 className="sc-display" style={{ fontSize: 96, lineHeight: 0.95, letterSpacing: '-0.03em' }}>
            Enterprise UI,
            <br />
            <span className="sc-grad-text" style={{ fontStyle: 'italic' }}>impossibly</span> beautiful.
          </h1>
          <p className="mt-8 max-w-2xl" style={{ color: 'var(--sc-text-dim)', fontSize: 15, lineHeight: 1.7 }}>
            A curated tour through the dashboards, command centers and admin panels we build for ambitious teams.
            Every pixel hand-crafted. Every interaction considered. Every chart animated.
          </p>
          <div className="mt-10 flex items-center gap-3 flex-wrap">
            <Link href="/showcase/executive" className="sc-btn sc-btn-primary" data-testid="enter-executive">
              Start the tour <ArrowRight size={14} />
            </Link>
            <Link href="/showcase/auth/login" className="sc-btn" data-testid="enter-auth">
              View auth flow
            </Link>
            <div className="flex items-center gap-1 ml-2" style={{ color: 'var(--sc-text-dim)', fontSize: 12 }}>
              {[1,2,3,4,5].map(i => <Star key={i} size={11} fill="#ffb547" stroke="#ffb547" />)}
              <span className="ml-2">4.9 · trusted by 120+ teams</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Stats strip */}
      <section className="relative z-10 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { k: 'Pixel-perfect screens', v: '70+' },
            { k: 'Animated components', v: '140' },
            { k: 'Average build time', v: '6w' },
            { k: 'NPS from clients', v: '74' },
          ].map((s, i) => (
            <motion.div key={s.k} className="sc-card p-5"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.08 }}>
              <div className="sc-display" style={{ fontSize: 36 }}>{s.v}</div>
              <div style={{ fontSize: 11, color: 'var(--sc-text-faint)', marginTop: 6 }}>{s.k}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Screens grid */}
      <section className="relative z-10 px-6 lg:px-12 max-w-7xl mx-auto py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="sc-chip" style={{ marginBottom: 12 }}>The collection</div>
            <h2 className="sc-display" style={{ fontSize: 52 }}>All 12 modules.</h2>
          </div>
          <div style={{ fontSize: 12, color: 'var(--sc-text-faint)' }}>Click any card to enter.</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {screens.map((s, i) => {
            const Icon = s.icon;
            const Preview = s.preview;
            return (
              <motion.div
                key={s.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link href={s.href} className="block sc-card sc-tilt p-6 group" data-testid={`screen-${s.title.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')}`}>
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                         style={{ background: `${s.accent}22`, border: `1px solid ${s.accent}40` }}>
                      <Icon size={18} style={{ color: s.accent }} />
                    </div>
                    <ArrowUpRight size={16} style={{ color: 'var(--sc-text-faint)' }}
                                  className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>

                  <div className="sc-sans" style={{ fontSize: 18, fontWeight: 600 }}>{s.title}</div>
                  <div style={{ fontSize: 12, color: 'var(--sc-text-dim)', marginTop: 6, minHeight: 32, lineHeight: 1.5 }}>{s.desc}</div>

                  <div className="mt-5 -mx-1 px-1 py-3 rounded-xl" style={{ background: 'rgba(0,0,0,0.2)' }}>
                    <Preview />
                  </div>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {s.tags.map(t => <span key={t} className="sc-chip" style={{ fontSize: 10 }}>{t}</span>)}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t mt-10 px-6 lg:px-12 py-10 max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4"
              style={{ borderColor: 'var(--sc-border)' }}>
        <div style={{ fontSize: 12, color: 'var(--sc-text-faint)' }}>
          © 2026 ManaTech · Crafted with obsession in 4 timezones.
        </div>
        <div className="flex items-center gap-4" style={{ fontSize: 12, color: 'var(--sc-text-dim)' }}>
          <Link href="/">Main site</Link>
          <Link href="/showcase/executive">Tour</Link>
          <Link href="/contact">Hire us</Link>
        </div>
      </footer>
    </div>
  );
}
