'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function DashboardShell({
    title,
    subtitle,
    children,
    breadcrumb,
    actions,
}: {
    title?: string;
    subtitle?: string;
    children: React.ReactNode;
    breadcrumb?: string[];
    actions?: React.ReactNode;
}) {

    return (
        <div className="sc-root sc-shell" data-testid="dashboard-shell">
            <div className="sc-grid-texture" />

            <div className="relative z-10 flex" style={{ minHeight: '100vh' }}>

                <main className="flex-1 min-w-0 sc-main-scroll sc-scroll">
                    <div className="sc-page-header px-8 pt-8 pb-2">
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                            <div className="flex flex-wrap items-end justify-between gap-4">
                                <div>
                                    <Link href="/demos" className=" sc-btn inline-block mb-4 cursor-pointer">
                                        <ArrowLeft size={16} />  Go back to home
                                    </Link>
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
                    <div className="sc-page-content px-8 pb-12 pt-6">{children}</div>
                </main>
            </div>
        </div>
    );
}
