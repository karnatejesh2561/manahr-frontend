'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import DemoCard from '@/components/demos/DemoCard';
import { LayoutDashboard, BarChart3, Briefcase } from 'lucide-react';

const demos = [
    {
        href: '/demos/executive',
        title: 'Executive',
        desc: 'C-suite control tower with revenue, growth & cohort insights.',
        icon: LayoutDashboard,
        accent: '#b6ff3c',
        preview: () => null,
        tags: ['12 KPIs', '8 charts'],
        image: '/demos/executive.png',
    },
    {
        href: '/demos/analytics',
        title: 'Analytics',
        desc: 'Multi-dimensional analytics, funnels, cohorts & heatmaps.',
        icon: BarChart3,
        accent: '#6affe0',
        preview: () => null,
        tags: ['Funnels', 'Heatmaps'],
        image: '/demos/analytics.png',
    },
    {
        href: '/demos/crm',
        title: 'CRM',
        desc: 'Leads, deals, pipeline & customer relationships.',
        icon: Briefcase,
        accent: '#ff6bcb',
        preview: () => null,
        tags: ['Pipeline'],
        image: '/demos/crm.png',
    },
];

export default function DemosPreview() {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-3xl sm:text-4xl font-bold">Explore interactive demos</h2>
                        <p className="text-black/70 mt-2">Try three representative product demos. Click any card to open the live demo.</p>
                    </div>
                    <Link href="/demos">
                        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="px-4 py-2 bg-[#0e67ff] text-white font-semibold rounded-full shadow-[0_12px_30px_rgba(14,103,255,0.12)]">
                            See all
                        </motion.button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {demos.map((d, i) => (
                        <DemoCard key={d.href} {...d} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
