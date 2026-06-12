'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    LayoutDashboard, Briefcase, Users, Boxes, BarChart3, ClipboardList, Wallet,
    UserCog, Settings, ShieldCheck, Lock, ArrowUpRight, Sparkles, ArrowRight, Star,
} from 'lucide-react';
import { AreaChart, BarChart, DonutChart, Sparkline } from '@/components/demos/Charts';
import {
    EmployeesPreview, UsersPreview, SettingsPreview, AuditLogPreview, AuthSuitePreview
} from '@/components/demos/MockPreviews';
import SectionHeader from '@/components/demos/SectionHeader';
import DemoGrid from '@/components/demos/DemoGrid';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DemoCard from './DemoCard';

const screens = [
    {
        href: '/demos/executive',
        title: 'Executive',
        desc: 'C-suite control tower with revenue, growth & cohort insights.',
        icon: LayoutDashboard,
        accent: '#b6ff3c',
        preview: () => <AreaChart height={120} data={[40, 52, 49, 68, 75, 82, 78, 95, 102, 118]} color="#b6ff3c" color2="#6affe0" />,
        tags: ['12 KPIs', '8 charts', 'AI summary'],
        image: '/demos/executive.png',
    },
    {
        href: '/demos/analytics',
        title: 'Analytics',
        desc: 'Multi-dimensional analytics, funnels, cohorts & heatmaps.',
        icon: BarChart3,
        accent: '#6affe0',
        preview: () => <BarChart height={120} data={[24, 38, 32, 45, 52, 48, 62, 70, 58, 75, 82, 91]} color="#6affe0" />,
        tags: ['Funnels', 'Heatmaps', 'Cohorts'],
        image: '/demos/analytics.png',
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
        image: '/demos/crm.png',
    },
    {
        href: '/demos/hr',
        title: 'HR',
        desc: 'Headcount, attendance, leave & hiring pipeline.',
        icon: Users,
        accent: '#7a5cff',
        preview: () => <Sparkline data={[20, 22, 21, 24, 28, 31, 30, 34, 38, 42]} color="#7a5cff" height={120} />,
        tags: ['Org', 'Attendance'],
        image: '/demos/hr.png',
    },
    {
        href: '/demos/inventory',
        title: 'Inventory',
        desc: 'Real-time stock, vendors, warehouses & purchase orders.',
        icon: Boxes,
        accent: '#ffb547',
        preview: () => <BarChart height={120} data={[60, 45, 80, 72, 50, 95, 88, 70, 55, 85]} color="#ffb547" />,
        tags: ['Stock', 'POs', 'Vendors'],
        image: '/demos/inventory.png',
    },
    {
        href: '/demos/projects',
        title: 'Projects',
        desc: 'Kanban, sprints, Gantt & team allocation.',
        icon: ClipboardList,
        accent: '#5cf2a3',
        preview: () => <AreaChart height={120} data={[20, 30, 28, 42, 38, 55, 60, 72, 80, 88]} color="#5cf2a3" color2="#b6ff3c" />,
        tags: ['Kanban', 'Gantt'],
        image: '/demos/projects.png',
    },
    {
        href: '/demos/finance',
        title: 'Finance',
        desc: 'P&L, expenses, invoices & cash flow analytics.',
        icon: Wallet,
        accent: '#b6ff3c',
        preview: () => <BarChart height={120} data={[50, 65, 55, 72, 68, 80, 75, 88, 82, 95]} color="#b6ff3c" />,
        tags: ['P&L', 'Invoices'],
        image: '/demos/finance.png',
    },
    {
        href: '/demos/employees',
        title: 'Employees',
        desc: 'Directory, profiles, attendance & documents.',
        icon: Users,
        accent: '#ff6bcb',
        preview: () => <EmployeesPreview />,
        tags: ['Directory'],
        image: '/demos/employees.png',
    },
    {
        href: '/demos/users',
        title: 'Users & Roles',
        desc: 'Granular RBAC, permission matrix & SSO.',
        icon: UserCog,
        accent: '#6affe0',
        preview: () => <UsersPreview />,
        tags: ['RBAC', 'SSO'],
        image: '/demos/users.png',
    },
    {
        href: '/demos/settings',
        title: 'Settings',
        desc: 'Workspace, branding, security & integrations.',
        icon: Settings,
        accent: '#9ea0b3',
        preview: () => <SettingsPreview />,
        tags: ['Workspace'],
        image: '/demos/settings.png',
    },
    {
        href: '/demos/audit',
        title: 'Audit Log',
        desc: 'Immutable activity stream with anomaly detection.',
        icon: ShieldCheck,
        accent: '#ff5e7e',
        preview: () => <AuditLogPreview />,
        tags: ['Compliance'],
        image: '/demos/audit.png',
    },
    {
        href: '/demos/auth/login',
        title: 'Auth Suite',
        desc: 'Login, Register, OTP, Reset & MFA — 5 flows.',
        icon: Lock,
        accent: '#7a5cff',
        preview: () => <AuthSuitePreview />,
        tags: ['5 screens'],
        image: '/demos/login.png',
    },
];

export default function DemosGridWrapper() {
    return (
        <>
            <Navbar />
            <div className=" px-4 sm:px-6 lg:px-8 pt-20" data-testid="demos-index">
                {screens.map((s, i) => (
                    <DemoCard key={s.href} {...s} index={i} />
                ))}
            </div>
            <Footer />
        </>
    );
}

