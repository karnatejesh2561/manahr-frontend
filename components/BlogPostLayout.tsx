'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';
import Link from 'next/link';

interface BlogPostProps {
    title: string;
    author: string;
    date: string;
    readTime: number;
    category: string;
    children: React.ReactNode;
}

export default function BlogPostLayout({
    title,
    author,
    date,
    readTime,
    category,
    children,
}: BlogPostProps) {
    return (
        <div className="min-h-screen bg-white py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Back button */}
                <Link href="/blog">
                    <motion.button
                        whileHover={{ x: -4 }}
                        className="flex items-center gap-2 text-black/70 hover:text-black mb-8 transition-colors"
                    >
                        <ArrowLeft size={20} />
                        Back to blog
                    </motion.button>
                </Link>

                {/* Category badge */}
                <div className="mb-6">
                    <span className="inline-block px-4 py-2 bg-black/10 text-black text-sm font-semibold rounded-full">
                        {category}
                    </span>
                </div>

                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 text-black"
                >
                    {title}
                </motion.h1>

                {/* Meta info */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="flex flex-wrap items-center gap-6 pb-8 border-b border-black/10 mb-12"
                >
                    <div className="flex items-center gap-2 text-black/60">
                        <User size={18} />
                        <span>{author}</span>
                    </div>
                    <div className="flex items-center gap-2 text-black/60">
                        <Calendar size={18} />
                        <span>{date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-black/60">
                        <Clock size={18} />
                        <span>{readTime} min read</span>
                    </div>
                </motion.div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="prose prose-lg max-w-none"
                >
                    {children}
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-16 p-8 bg-black/5 rounded-3xl text-center"
                >
                    <h3 className="text-2xl font-bold mb-4 text-black">Ready to build with us?</h3>
                    <p className="text-black/70 mb-6">
                        Let's discuss how ManaTech can help your next project succeed.
                    </p>
                    <Link href="/contact">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-black text-white font-semibold rounded-full hover:shadow-lg transition-all"
                        >
                            Get in touch
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
