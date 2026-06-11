'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard, Users, Briefcase, Boxes, BarChart3, Wallet,
    ClipboardList, Settings, Search, Bell, Command, Sparkles,
    ChevronsUpDown, ArrowUpRight, UserCog, ShieldCheck, ChevronRight,
    Menu, X,
} from 'lucide-react';

const navGroups = [
    {
        title: 'Overview',
        items: [
            { name: 'Showcase Index', href: '/demos', icon: Sparkles, testid: 'nav-showcase-index' },
            { name: 'Executive', href: '/demos/executive', icon: LayoutDashboard, testid: 'nav-executive' },
            { name: 'Analytics', href: '/demos/analytics', icon: BarChart3, testid: 'nav-analytics' },
        ],
    },
    {
        title: 'Operations',
        items: [
            { name: 'CRM', href: '/demos/crm', icon: Briefcase, testid: 'nav-crm' },
            { name: 'HR', href: '/demos/hr', icon: Users, testid: 'nav-hr' },
            { name: 'Inventory', href: '/demos/inventory', icon: Boxes, testid: 'nav-inventory' },
            { name: 'Projects', href: '/demos/projects', icon: ClipboardList, testid: 'nav-projects' },
            { name: 'Finance', href: '/demos/finance', icon: Wallet, testid: 'nav-finance' },
        ],
    },
    {
        title: 'Admin',
        items: [
            { name: 'Users & Roles', href: '/demos/users', icon: UserCog, testid: 'nav-users' },
            { name: 'Employees', href: '/demos/employees', icon: Users, testid: 'nav-employees' },
            { name: 'Settings', href: '/demos/settings', icon: Settings, testid: 'nav-settings' },
            { name: 'Audit Log', href: '/demos/audit', icon: ShieldCheck, testid: 'nav-audit' },
        ],
    },
];

export default function DashboardShell({
    title,
    subtitle,
    children,
    breadcrumb,
    actions,
}: {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    breadcrumb?: string[];
    actions?: React.ReactNode;
}) {
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

    // Close sidebar when route changes on mobile
    React.useEffect(() => {
        setIsSidebarOpen(false);
    }, [pathname]);

    const SidebarContent = () => (
        <div className="flex flex-col h-full">
            {/* Brand */}
            <div className="p-5 border-b flex items-center justify-between" style={{ borderColor: 'var(--sc-border)' }}>
                <Link href="/demos" className="flex items-center gap-3 group" onClick={() => setIsSidebarOpen(false)}>
                    <div className="relative w-9 h-9 rounded-xl flex items-center justify-center sc-ring"
                        style={{ background: 'linear-gradient(135deg, var(--sc-accent), var(--sc-accent-2))' }}>
                        <span style={{ color: '#0a0a0f', fontWeight: 800, fontSize: 14 }}>M</span>
                    </div>
                    <div>
                        <div className="sc-sans" style={{ fontSize: 14, fontWeight: 600 }}>ManaTech</div>
                        <div style={{ fontSize: 10, color: 'var(--sc-text-faint)' }}>SHOWCASE / v2.4</div>
                    </div>
                </Link>
                {/* Close button inside sidebar on mobile */}
                <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="md-hidden-toggle p-1.5 rounded-lg hover:bg-black/10 transition"
                    aria-label="Close sidebar"
                >
                    <X size={18} />
                </button>
            </div>

            {/* Workspace switcher */}
            <div className="p-4 border-b" style={{ borderColor: 'var(--sc-border)' }}>
                <button className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.6)', border: '1px solid var(--sc-border)', backdropFilter: 'blur(12px)' }}
                    data-testid="workspace-switcher">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md" style={{ background: 'linear-gradient(135deg, #ff6bcb, #7a5cff)' }} />
                        <div className="text-left">
                            <div style={{ fontSize: 12, fontWeight: 500 }}>Acme Holdings</div>
                            <div style={{ fontSize: 10, color: 'var(--sc-text-faint)' }}>Enterprise</div>
                        </div>
                    </div>
                    <ChevronsUpDown size={14} style={{ color: 'var(--sc-text-faint)' }} />
                </button>
            </div>

            {/* Nav */}
            <nav className="flex-1 overflow-y-auto sc-scroll p-3 space-y-5">
                {navGroups.map((group) => (
                    <div key={group.title}>
                        <div className="px-3 mb-2 text-[10px] uppercase tracking-widest"
                            style={{ color: 'var(--sc-text-faint)' }}>{group.title}</div>
                        <div className="space-y-1">
                            {group.items.map((item) => {
                                const active = pathname === item.href;
                                const Icon = item.icon;
                                return (
                                    <Link key={item.href} href={item.href}
                                        className={`sc-sidebar-link ${active ? 'active' : ''}`}
                                        data-testid={item.testid}
                                        onClick={() => setIsSidebarOpen(false)}>
                                        <Icon size={15} />
                                        <span>{item.name}</span>
                                        {active && <ArrowUpRight size={12} className="ml-auto" />}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </nav>

            {/* Upgrade card */}
            <div className="m-3 p-4 rounded-2xl relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, rgba(182,255,60,0.16), rgba(106,255,224,0.08))', border: '1px solid var(--sc-border)' }}>
                <div className="relative z-10">
                    <div className="sc-sans" style={{ fontSize: 12, fontWeight: 600 }}>Unlock AI Insights</div>
                    <div style={{ fontSize: 10, color: 'var(--sc-text-dim)', marginTop: 4, lineHeight: 1.4 }}>
                        Forecast revenue, churn, and inventory with one prompt.
                    </div>
                    <button className="sc-btn sc-btn-primary mt-3" style={{ padding: '6px 12px', fontSize: 11 }}
                        data-testid="upgrade-cta">
                        Try Pro <ArrowUpRight size={12} />
                    </button>
                </div>
                <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full"
                    style={{ background: 'radial-gradient(circle, rgba(182,255,60,0.4), transparent 70%)' }} />
            </div>
        </div>
    );

    return (
        <div className="sc-root sc-shell" data-testid="dashboard-shell">
            <div className="sc-aurora"><div className="blob3" /></div>
            <div className="sc-grid-texture" />

            {/* ── Mobile sidebar overlay (animated) ── */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            key="backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => setIsSidebarOpen(false)}
                            style={{
                                position: 'fixed', inset: 0, zIndex: 40,
                                background: 'rgba(0,0,0,0.35)',
                                backdropFilter: 'blur(2px)',
                            }}
                        />
                        {/* Slide-in drawer */}
                        <motion.aside
                            key="mobile-sidebar"
                            initial={{ x: -280 }}
                            animate={{ x: 0 }}
                            exit={{ x: -280 }}
                            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
                            className="sc-sidebar"
                            style={{
                                position: 'fixed', top: 0, left: 0, bottom: 0,
                                width: 260, zIndex: 50,
                                display: 'flex', flexDirection: 'column',
                            }}
                            data-testid="sidebar-mobile"
                        >
                            <SidebarContent />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            <div className="relative z-10 flex" style={{ minHeight: '100vh' }}>
                {/* ── Desktop sidebar (always visible ≥ md) ── */}
                <aside
                    className="sc-sidebar sc-sidebar-desktop"
                    style={{ width: 260, flexShrink: 0, display: 'flex', flexDirection: 'column' }}
                    data-testid="sidebar"
                >
                    <SidebarContent />
                </aside>

                {/* Main */}
                <main className="flex-1 min-w-0 sc-main-scroll sc-scroll">
                    {/* Topbar */}
                    <header className="sc-topbar sticky top-0 z-20 border-b backdrop-blur-xl"
                        style={{ background: 'rgba(255,255,255,0.7)', borderColor: 'var(--sc-border)' }}>

                        {/* Mobile topbar */}
                        <div className="sc-topbar-mobile flex items-center justify-between px-4 py-3">
    {/* Center brand */}
    <Link href="/demos" className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, var(--sc-accent), var(--sc-accent-2))' }}>
            <span style={{ color: '#0a0a0f', fontWeight: 800, fontSize: 12 }}>M</span>
        </div>
        <span className="sc-sans" style={{ fontSize: 14, fontWeight: 600 }}>ManaTech</span>
    </Link>

    {/* Right side: toggle button, notifications, avatar */}
    <div className="flex items-center gap-2">
        <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded-xl hover:bg-black/10 transition"
            aria-label="Open menu"
            data-testid="mobile-menu-btn"
        >
            <Menu size={20} />
        </button>
        <button className="relative p-2 rounded-xl hover:bg-black/5 transition" data-testid="notifications-btn-mobile">
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full" style={{ background: 'var(--sc-accent-3)' }} />
        </button>
        <div className="sc-avatar" style={{ background: 'linear-gradient(135deg, #ffb547, #ff6bcb)', width: 30, height: 30, fontSize: 11 }}>AS</div>
    </div>
</div>

                        {/* Desktop topbar */}
                        <div className="sc-topbar-desktop flex items-center gap-4 px-8 py-4">
                            {breadcrumb && (
                                <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--sc-text-faint)' }}>
                                    {breadcrumb.map((b, i) => (
                                        <React.Fragment key={i}>
                                            <span style={{ color: i === breadcrumb.length - 1 ? 'var(--sc-text)' : undefined }}>{b}</span>
                                            {i < breadcrumb.length - 1 && <ChevronRight size={12} />}
                                        </React.Fragment>
                                    ))}
                                </div>
                            )}

                            <div className="relative flex-1 max-w-xl ml-auto">
                                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--sc-text-faint)' }} />
                                <input
                                    placeholder="Search anything..."
                                    className="sc-input pl-9 pr-16"
                                    data-testid="global-search"
                                />
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                                    <kbd className="sc-chip" style={{ padding: '2px 6px', fontSize: 10 }}><Command size={10} />K</kbd>
                                </div>
                            </div>

                            <button className="relative p-2 rounded-xl hover:bg-black/5 transition" data-testid="notifications-btn">
                                <Bell size={16} />
                                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: 'var(--sc-accent-3)' }} />
                            </button>
                            <div className="flex items-center gap-3 pl-3 border-l" style={{ borderColor: 'var(--sc-border)' }}>
                                <div className="text-right">
                                    <div style={{ fontSize: 12 }}>Akira S.</div>
                                    <div style={{ fontSize: 10, color: 'var(--sc-text-faint)' }}>Founder · Owner</div>
                                </div>
                                <div className="sc-avatar" style={{ background: 'linear-gradient(135deg, #ffb547, #ff6bcb)' }}>AS</div>
                            </div>
                        </div>
                    </header>

                    {/* Page header */}
                    <div className="sc-page-header px-8 pt-8 pb-2">
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                            <div className="flex flex-wrap items-end justify-between gap-4">
                                <div>
                                    <h1 className="sc-display sc-page-title">{title}</h1>
                                    {subtitle && (
                                        <p className="mt-2 sc-page-subtitle" style={{ color: 'var(--sc-text-dim)', maxWidth: 640 }}>
                                            {subtitle}
                                        </p>
                                    )}
                                </div>
                                {actions && <div className="flex items-center gap-2">{actions}</div>}
                            </div>
                        </motion.div>
                    </div>

                    {/* Content */}
                    <div className="sc-page-content px-8 pb-12 pt-6">{children}</div>
                </main>
            </div>
        </div>
    );
}
