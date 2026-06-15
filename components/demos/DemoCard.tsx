'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink } from 'lucide-react';

interface DemoCardProps {
    href: string;
    title: string;
    desc: string;
    icon: React.ElementType;
    accent: string;
    preview: () => React.ReactNode;
    tags: string[];
    index: number;
    image?: string;
}

export default function DemoCard({ href, title, desc, icon: Icon, accent, preview, tags, index, image }: DemoCardProps) {
    const router = useRouter();

    const handleCardClick = () => {
        router.push(href);
    };

    const handleCardKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            router.push(href);
        }
    };

    return (
        <motion.div
            role="link"
            tabIndex={0}
            onClick={handleCardClick}
            onKeyDown={handleCardKeyDown}
            className="glass flex flex-col border border-neutral-200 rounded-xl overflow-hidden bg-white cursor-pointer group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
        >
            {/* Browser Top Bar */}
            <div className="bg-neutral-50 border-b border-neutral-200 px-3 py-2 flex items-center gap-4">
                {/* macOS dots */}
                <div className="flex gap-1.5 w-[42px] shrink-0">
                    <div className="w-2 h-2 rounded-full bg-black opacity-10 transform transition-all duration-300 group-hover:bg-[#ff5f56] group-hover:opacity-100 group-hover:scale-110" />
                    <div className="w-2 h-2 rounded-full bg-black opacity-10 transform transition-all duration-300 group-hover:bg-[#ffbd2e] group-hover:opacity-100 group-hover:scale-110" />
                    <div className="w-2 h-2 rounded-full bg-black opacity-10 transform transition-all duration-300 group-hover:bg-[#27c93f] group-hover:opacity-100 group-hover:scale-110" />
                </div>
                {/* URL bar */}
                <div className="flex-1 bg-white border border-neutral-200/80 rounded-md text-[10px] text-center py-0.5 text-neutral-400 font-mono truncate px-2 shadow-sm transition-colors duration-300 group-hover:text-neutral-800 group-hover:bg-neutral-100 group-hover:font-medium">
                    {title}
                </div>
                {/* External Link Icon */}
                <div className="w-[42px] shrink-0 flex justify-end">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            window.open(href, '_blank');
                        }}
                        className="p-1 rounded-md hover:bg-neutral-200/50 text-neutral-400 hover:text-neutral-700 transition-colors cursor-pointer flex items-center justify-center group-hover:bg-neutral-200/50 group-hover:text-neutral-700"
                        aria-label="Open in new tab"
                        title="Open in new tab"
                    >
                        <ExternalLink size={14} />
                    </button>
                </div>
            </div>

            {/* Preview Area (Visuals) */}
            <div className="bg-white h-[250px] w-full border-none flex items-center justify-center p-2 relative overflow-hidden z-2">
                {/* Background dot pattern inside preview */}
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #ccc 1px, transparent 0)', backgroundSize: '12px 12px' }} />
                <div className="relative z-10 w-full h-full flex items-center justify-center">

                    {image ? (
                        <div className="w-full h-full relative overflow-hidden rounded-md border border-neutral-200">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                            <img
                                src={image}
                                alt={title}
                                className="w-full h-full object-cover object-top transition-transform duration-500"
                            />

                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium border border-white/20 bg-white transition-all duration-300 absolute bottom-10 left-1/2 -translate-x-1/2 translate-y-1/2 opacity-0 group-hover:opacity-100 ">
                                Visit Demo
                                <ArrowUpRight size={18} />
                            </div>
                        </div>
                    ) : (
                        preview()
                    )}
                </div>
            </div>
        </motion.div>
    );
}
