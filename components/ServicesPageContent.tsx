'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code, Lock, Smartphone, Layers, Database, Cloud, Shield, Zap } from 'lucide-react';

const services = [
    {
        icon: Layers,
        title: 'SaaS Product Development',
        description: 'Full-stack SaaS platforms with multi-tenancy, subscriptions, and scalable architecture.',
        features: [
            'Multi-tenant architecture',
            'Subscription & billing',
            'Role-based access control',
            'Analytics & reporting',
        ],
        color: 'teal',
    },
    {
        icon: Code,
        title: 'Enterprise Software',
        description: 'Custom enterprise solutions with complex workflows, integrations, and robust security.',
        features: [
            'Custom workflows',
            'Third-party integrations',
            'Microservices architecture',
            'Legacy system modernization',
        ],
        color: 'pink',
    },
    {
        icon: Lock,
        title: 'Authentication & Security',
        description: 'Keycloak, SSO, RBAC, OAuth2, and enterprise-grade identity management solutions.',
        features: [
            'Single Sign-On (SSO)',
            'OAuth2 & OpenID Connect',
            'Multi-factor authentication',
            'Identity federation',
        ],
        color: 'yellow',
    },
    {
        icon: Smartphone,
        title: 'Web & Mobile Apps',
        description: 'Beautiful, performant applications for web, iOS, and Android with modern frameworks.',
        features: [
            'Cross-platform development',
            'Native performance',
            'Offline-first architecture',
            'Push notifications',
        ],
        color: 'teal',
    },
    {
        icon: Database,
        title: 'Database Design',
        description: 'Scalable database architecture with optimization for performance and reliability.',
        features: [
            'Schema design',
            'Performance optimization',
            'Data migration',
            'Backup & recovery',
        ],
        color: 'pink',
    },
    {
        icon: Cloud,
        title: 'Cloud Infrastructure',
        description: 'AWS, Azure, and GCP deployments with CI/CD pipelines and auto-scaling.',
        features: [
            'Infrastructure as Code',
            'Auto-scaling',
            'Load balancing',
            'Disaster recovery',
        ],
        color: 'yellow',
    },
    {
        icon: Shield,
        title: 'Security Audits',
        description: 'Comprehensive security assessments and vulnerability testing for your applications.',
        features: [
            'Penetration testing',
            'Code review',
            'Compliance audits',
            'Security hardening',
        ],
        color: 'teal',
    },
    {
        icon: Zap,
        title: 'Performance Optimization',
        description: 'Speed up your applications with advanced optimization techniques.',
        features: [
            'Code optimization',
            'Caching strategies',
            'CDN integration',
            'Database tuning',
        ],
        color: 'pink',
    },
];

export default function ServicesPageContent() {
    return (
        <div className="py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6">
                        Our{' '}
                        <span className="font-extrabold">Services</span>
                    </h1>
                    <p className="text-lg sm:text-xl text-black/70 max-w-3xl mx-auto px-4">
                        Comprehensive digital solutions designed to transform your business. Let's start building together.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {services.map((service, index) => {
                        const Icon = service.icon;
                        return (
                            <motion.div
                                key={service.title}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="group"
                            >
                                <div className="glass rounded-3xl p-8 h-full border border-white/20 hover:border-black/30 transition-all duration-300">
                                    <div className="relative z-10">
                                        <div className="w-16 h-16 rounded-2xl bg-black flex items-center justify-center mb-6">
                                            <Icon size={32} className="text-white" />
                                        </div>
                                        <h3 className="text-2xl font-bold mb-3 text-black">{service.title}</h3>
                                        <p className="text-black/70 mb-6 leading-relaxed">{service.description}</p>
                                        <ul className="space-y-2">
                                            {service.features.map((feature, idx) => (
                                                <li key={idx} className="flex items-center gap-2 text-sm text-black/70">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-black" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="text-center mt-16"
                >
                    <p className="text-lg text-slate/70 mb-6">Ready to get started?</p>
                    <a href="/contact">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-yellow text-slate font-semibold rounded-full glow-yellow transition-all duration-300"
                        >
                            Schedule a Consultation
                        </motion.button>
                    </a>
                </motion.div>
            </div>
        </div>
    );
}
