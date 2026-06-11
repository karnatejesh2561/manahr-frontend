'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Briefcase, Users, Boxes, BarChart3, ClipboardList, Wallet,
  UserCog, Settings, ShieldCheck, Lock, ArrowUpRight, Sparkles, ArrowRight, Star,
} from 'lucide-react';
import { AreaChart, BarChart, DonutChart, Sparkline } from '@/components/demos/Charts';
import SectionHeader from '@/components/demos/SectionHeader';
import DemoGrid from '@/components/demos/DemoGrid';

const screens = [
  {
    href: '/demos/executive',
    title: 'Executive',
    desc: 'C-suite control tower with revenue, growth & cohort insights.',
    icon: LayoutDashboard,
    accent: '#b6ff3c',
    preview: () => <AreaChart height={120} data={[40, 52, 49, 68, 75, 82, 78, 95, 102, 118]} color="#b6ff3c" color2="#6affe0" />,
    tags: ['12 KPIs', '8 charts', 'AI summary'],
  },
  {
    href: '/demos/analytics',
    title: 'Analytics',
    desc: 'Multi-dimensional analytics, funnels, cohorts & heatmaps.',
    icon: BarChart3,
    accent: '#6affe0',
    preview: () => <BarChart height={120} data={[24, 38, 32, 45, 52, 48, 62, 70, 58, 75, 82, 91]} color="#6affe0" />,
    tags: ['Funnels', 'Heatmaps', 'Cohorts'],
  },
  {
    href: '/demos/crm',
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
    href: '/demos/hr',
    title: 'HR',
    desc: 'Headcount, attendance, leave & hiring pipeline.',
    icon: Users,
    accent: '#7a5cff',
    preview: () => <Sparkline data={[20, 22, 21, 24, 28, 31, 30, 34, 38, 42]} color="#7a5cff" height={120} />,
    tags: ['Org', 'Attendance'],
  },
  {
    href: '/demos/inventory',
    title: 'Inventory',
    desc: 'Real-time stock, vendors, warehouses & purchase orders.',
    icon: Boxes,
    accent: '#ffb547',
    preview: () => <BarChart height={120} data={[60, 45, 80, 72, 50, 95, 88, 70, 55, 85]} color="#ffb547" />,
    tags: ['Stock', 'POs', 'Vendors'],
  },
  {
    href: '/demos/projects',
    title: 'Projects',
    desc: 'Kanban, sprints, Gantt & team allocation.',
    icon: ClipboardList,
    accent: '#5cf2a3',
    preview: () => <AreaChart height={120} data={[20, 30, 28, 42, 38, 55, 60, 72, 80, 88]} color="#5cf2a3" color2="#b6ff3c" />,
    tags: ['Kanban', 'Gantt'],
  },
  {
    href: '/demos/finance',
    title: 'Finance',
    desc: 'P&L, expenses, invoices & cash flow analytics.',
    icon: Wallet,
    accent: '#b6ff3c',
    preview: () => <BarChart height={120} data={[50, 65, 55, 72, 68, 80, 75, 88, 82, 95]} color="#b6ff3c" />,
    tags: ['P&L', 'Invoices'],
  },
  {
    href: '/demos/employees',
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
    href: '/demos/users',
    title: 'Users & Roles',
    desc: 'Granular RBAC, permission matrix & SSO.',
    icon: UserCog,
    accent: '#6affe0',
    preview: () => <Sparkline data={[12, 18, 15, 22, 26, 30, 34, 40, 46, 52]} color="#6affe0" height={120} />,
    tags: ['RBAC', 'SSO'],
  },
  {
    href: '/demos/settings',
    title: 'Settings',
    desc: 'Workspace, branding, security & integrations.',
    icon: Settings,
    accent: '#9ea0b3',
    preview: () => <AreaChart height={120} data={[10, 14, 12, 18, 22, 20, 26, 30, 28, 34]} color="#9ea0b3" color2="#6affe0" />,
    tags: ['Workspace'],
  },
  {
    href: '/demos/audit',
    title: 'Audit Log',
    desc: 'Immutable activity stream with anomaly detection.',
    icon: ShieldCheck,
    accent: '#ff5e7e',
    preview: () => <BarChart height={120} data={[10, 22, 18, 30, 26, 38, 42, 35, 48, 52]} color="#ff5e7e" />,
    tags: ['Compliance'],
  },
  {
    href: '/demos/auth/login',
    title: 'Auth Suite',
    desc: 'Login, Register, OTP, Reset & MFA — 5 flows.',
    icon: Lock,
    accent: '#7a5cff',
    preview: () => <Sparkline data={[5, 12, 18, 15, 22, 30, 36, 42, 48, 60]} color="#7a5cff" height={120} />,
    tags: ['5 screens'],
  },
];

export default function DemosIndex() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans" data-testid="demos-index">
      {/* Light Grid texture */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)',
        backgroundSize: '64px 64px',
        maskImage: 'radial-gradient(ellipse 80% 60% at 50% 30%, #000 30%, transparent 90%)'
      }} />

      {/* Top bar */}
      <header className="relative z-10 flex items-center justify-between px-4 sm:px-6 lg:px-12 py-4 sm:py-5 border-b border-neutral-200 bg-white/80 backdrop-blur-md">
        <Link href="/" className="flex items-center gap-3" data-testid="back-to-site">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-neutral-900 shadow-sm">
            <span className="text-white font-bold text-sm">M</span>
          </div>
          <div className="font-semibold text-[13px] tracking-tight text-neutral-900">ManaTech</div>
          <span className="text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 bg-neutral-100 text-neutral-500 rounded-md border border-neutral-200 ml-2">Demos</span>
        </Link>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-[11px] font-semibold tracking-wide uppercase text-green-600 bg-green-50 px-2.5 py-1 rounded-md border border-green-200 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Live
          </span>
          <Link href="/" className="text-[13px] font-semibold text-neutral-500 hover:text-neutral-900 transition-colors" data-testid="exit-showcase">
            ← Main site
          </Link>
        </div>
      </header>

      <SectionHeader />
      <DemoGrid screens={screens} />

      {/* Footer */}
      <footer className="relative z-10 border-t border-neutral-200 mt-10 px-4 sm:px-6 lg:px-12 py-8 sm:py-10 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-neutral-400 text-center sm:text-left">
          © 2026 ManaTech · Crafted with obsession in 4 timezones.
        </div>
        <div className="flex items-center gap-4 text-xs font-medium text-neutral-500">
          <Link href="/" className="hover:text-neutral-900 transition-colors">Main site</Link>
          <Link href="/demos/executive" className="hover:text-neutral-900 transition-colors">Tour</Link>
          <Link href="/contact" className="hover:text-neutral-900 transition-colors">Hire us</Link>
        </div>
      </footer>
    </div>
  );
}
