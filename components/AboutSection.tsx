'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { HiCpuChip, HiSparkles, HiRocketLaunch, HiServer, HiBeaker, HiCircleStack } from 'react-icons/hi2';

const team = [
    {
        role: 'Full Stack Architect',
        name: 'Lead Architect',
        expertise: 'System Design & Architecture',
        icon: HiCpuChip,
    },
    {
        role: 'Frontend Engineer',
        name: 'UI/UX Specialist',
        expertise: 'Modern Web Development',
        icon: HiSparkles,
    },
    {
        role: 'Mobile Developer',
        name: 'Mobile Expert',
        expertise: 'iOS & Android',
        icon: HiRocketLaunch,
    },
    {
        role: 'DevOps Engineer',
        name: 'DevOps Specialist',
        expertise: 'CI/CD & Cloud Infrastructure',
        icon: HiServer,
    },
    {
        role: 'QA/Testing Specialist',
        name: 'Quality Expert',
        expertise: 'Testing & Automation',
        icon: HiBeaker,
    },
    {
        role: 'Database Specialist',
        name: 'Data Expert',
        expertise: 'Database Design & Optimization',
        icon: HiCircleStack,
    },
];

const AboutSection: React.FC = () => {
    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white/30">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                        Expert{' '}
                        <span className="font-extrabold">
                            Team
                        </span>
                    </h2>
                    <p className="text-lg text-black/70 max-w-2xl mx-auto">
                        A fresh team of passionate developers ready to build your next big thing
                    </p>
                </motion.div>

                {/* Team Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {team.map((member, index) => {
                        const Icon = member.icon;
                        return (
                            <motion.div
                                key={member.role}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="group"
                            >
                                <div className="glass rounded-3xl p-8 text-center border border-white/20 hover:border-[#0e67ff]/40 transition-all duration-300 hover:glow">
                                    <div className="w-20 h-20 relative overflow-hidden mx-auto mb-6 rounded-full bg-[#FD4F0F] flex items-center justify-center">
                                        <span className="absolute block inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/25 to-transparent rounded-full z-2" />
                                        <Icon size={36} className="text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-black mb-2">{member.role}</h3>
                                    <p className="text-black/70 mb-1">{member.name}</p>
                                    <p className="text-sm text-black/50">{member.expertise}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto"
                >
                    {[
                        { label: 'Launch Date', value: 'Mar 2026' },
                        { label: 'Team Members', value: '6' },
                        { label: 'Technologies', value: '25+' },
                    ].map((stat, index) => (
                        <div key={stat.label} className="text-center">
                            <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                                className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-2"
                            >
                                {stat.value}
                            </motion.div>
                            <p className="text-sm sm:text-base text-slate/70">{stat.label}</p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default AboutSection;
