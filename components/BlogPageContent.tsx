'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const blogPosts = [
    {
        slug: 'saas-development-guide',
        title: 'SaaS Development: A Complete Guide for Startups',
        description: 'Learn everything you need to know about building successful SaaS applications. From architecture to best practices.',
        category: 'Development',
        date: 'June 13, 2026',
        readTime: 12,
        author: 'ManaTech Team',
    },
    {
        slug: 'enterprise-software-best-practices',
        title: 'Enterprise Software Development: Best Practices',
        description: 'Discover the strategies and practices used by enterprise software development teams to deliver reliable, scalable solutions.',
        category: 'Enterprise',
        date: 'June 6, 2026',
        readTime: 10,
        author: 'ManaTech Team',
    },
    {
        slug: 'nextjs-vs-react',
        title: 'Next.js vs React: Which Framework Should You Choose?',
        description: 'Compare Next.js and React to understand which framework best fits your project needs and team expertise.',
        category: 'Frontend',
        date: 'May 30, 2026',
        readTime: 8,
        author: 'ManaTech Team',
    },
];

export default function BlogPageContent() {
    return (
        <div className="py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                        ManaTech <span className="font-extrabold">Blog</span>
                    </h1>
                    <p className="text-lg sm:text-xl text-black/70 max-w-3xl mx-auto">
                        Insights on SaaS development, software engineering, and digital transformation.
                    </p>
                </motion.div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post, index) => (
                        <motion.div
                            key={post.slug}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <Link href={`/blog/${post.slug}`}>
                                <div className="h-full glass rounded-3xl p-8 border border-white/20 hover:border-black/30 transition-all duration-300 hover:shadow-lg cursor-pointer">
                                    <div className="mb-4">
                                        <span className="inline-block px-3 py-1 bg-black/10 text-black text-sm font-semibold rounded-full">
                                            {post.category}
                                        </span>
                                    </div>

                                    <h2 className="text-xl font-bold mb-3 text-black line-clamp-2 h-14">
                                        {post.title}
                                    </h2>

                                    <p className="text-black/70 text-sm mb-6 line-clamp-3">
                                        {post.description}
                                    </p>

                                    <div className="flex items-center justify-between text-xs text-black/60 border-t border-black/10 pt-4">
                                        <span>{post.date}</span>
                                        <span>{post.readTime} min read</span>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-20 text-center"
                >
                    <p className="text-lg text-black/70 mb-6">
                        More articles coming soon. Subscribe to get updates.
                    </p>
                    <Link href="/contact">
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className="relative px-8 py-4 bg-[#0e67ff] text-white font-semibold rounded-full shadow-[0_18px_40px_rgba(14,103,255,0.18)] transition-all duration-300 hover:bg-[#0858d6]"
                        >
                            <span className="absolute block inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/25 to-transparent rounded-full z-2" />
                            Contact us for inquiries
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
