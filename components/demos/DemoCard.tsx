'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface DemoCardProps {
  href: string;
  title: string;
  desc: string;
  icon: React.ElementType;
  accent: string;
  preview: () => React.ReactNode;
  tags: string[];
  index: number;
}

export default function DemoCard({ href, title, desc, icon: Icon, accent, preview, tags, index }: DemoCardProps) {
  return (
    <Link href={href} className="block group">
      <motion.div
        className="flex flex-col bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        style={{ height: '360px' }}
      >
        {/* Browser Top Bar */}
        <div className="bg-[#f5f5f5] border-b border-neutral-200 px-3 py-2 flex items-center gap-4">
          {/* macOS dots */}
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
          </div>
          {/* URL bar */}
          <div className="flex-1 bg-white border border-neutral-200/60 rounded-md text-[10px] text-center py-1 text-neutral-400 font-mono truncate px-2 shadow-sm">
            manatech.com{href}
          </div>
          {/* Placeholder for right side to balance flex */}
          <div className="w-[42px]" />
        </div>

        {/* Preview Area (Visuals) */}
        <div className="h-[180px] w-full bg-[#fafafa] border-b border-neutral-100 flex items-center justify-center p-4 relative overflow-hidden group-hover:bg-[#f3f3f3] transition-colors">
          {/* Background dot pattern inside preview */}
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #ccc 1px, transparent 0)', backgroundSize: '12px 12px' }} />
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            {preview()}
          </div>
        </div>

        {/* Content Area */}
        <div className="p-5 flex flex-col flex-1 bg-white">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1 rounded-md" style={{ backgroundColor: `${accent}20` }}>
              <Icon size={14} style={{ color: accent === '#ffffff' ? '#000' : accent }} />
            </div>
            <h3 className="font-semibold text-neutral-900 text-sm tracking-tight">{title}</h3>
          </div>
          <p className="text-xs text-neutral-500 mb-4 line-clamp-2 leading-relaxed">
            {desc}
          </p>
          <div className="mt-auto flex flex-wrap gap-1.5">
            {tags.map(t => (
              <span key={t} className="text-[9px] font-medium tracking-wide uppercase px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-600 border border-neutral-200/60">
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
