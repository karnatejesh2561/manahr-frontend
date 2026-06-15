'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, Award, Target, Heart, Lightbulb, Rocket, Server, FlaskConical, Database } from 'lucide-react';

const team = [
    {
        role: 'Full Stack Architect',
        name: 'Lead Architect',
        expertise: 'System Design & Architecture',
        icon: Target,
        description: 'Expert in designing scalable systems and complex architectures.',
    },
    {
        role: 'Frontend Engineer',
        name: 'UI/UX Specialist',
        expertise: 'Modern Web Development',
        icon: Award,
        description: 'Crafting beautiful, performant user experiences.',
    },
    {
        role: 'Mobile Developer',
        name: 'Mobile Expert',
        expertise: 'iOS & Android',
        icon: Users,
        description: 'Building native experiences for mobile platforms.',
    },
    {
        role: 'DevOps Engineer',
        name: 'DevOps Specialist',
        expertise: 'CI/CD & Cloud Infrastructure',
        icon: Server,
        description: 'Automating deployments and managing cloud infrastructure.',
    },
    {
        role: 'QA/Testing Specialist',
        name: 'Quality Expert',
        expertise: 'Testing & Automation',
        icon: FlaskConical,
        description: 'Ensuring quality through comprehensive testing and automation.',
    },
    {
        role: 'Database Specialist',
        name: 'Data Expert',
        expertise: 'Database Design & Optimization',
        icon: Database,
        description: 'Designing efficient databases and optimizing performance.',
    },
];

const values = [
    {
        icon: Heart,
        title: 'Client-Focused',
        description: 'Your success is our success. We prioritize understanding your needs and exceeding expectations.',
    },
    {
        icon: Lightbulb,
        title: 'Innovation',
        description: 'We stay ahead of the curve, leveraging cutting-edge technologies to deliver modern solutions.',
    },
    {
        icon: Rocket,
        title: 'Excellence',
        description: 'We maintain the highest standards in code quality, security, and performance.',
    },
];

export default function AboutPageContent() {
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
                        About{' '}
                        <span className="font-extrabold">ManaTech</span>
                    </h1>
                    <p className="text-lg sm:text-xl text-black/70 max-w-3xl mx-auto px-4">
                        A fresh team of passionate developers eager to build exceptional digital solutions.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="glass rounded-[2.5rem] p-6 sm:p-8 lg:p-12 mb-16 border border-white/20"
                >
                    <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-black">Our Story</h2>
                    <div className="space-y-4 text-black/70 leading-relaxed text-base sm:text-lg">
                        <p>
                            ManaTech launched in March 2026 with a clear mission: to help businesses leverage cutting-edge technology to achieve their goals. We believe that great software should be accessible, scalable, and built with care.
                        </p>
                        <p>
                            We're a team of passionate developers who have worked on enterprise projects and now want to build our own success story—starting with yours. We bring fresh perspectives, modern tech stacks, and an eagerness to prove ourselves.
                        </p>
                        <p>
                            Our team is small by design. This allows us to maintain high quality, stay agile, and give each project the attention it deserves. We're not just developers—we're partners in your success.
                        </p>
                    </div>
                </motion.div>

                <div className="mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12"
                    >
                        Our{' '}
                        <span className="font-extrabold">Values</span>
                    </motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {values.map((value, index) => {
                            const Icon = value.icon;
                            return (
                                <motion.div
                                    key={value.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                                    whileHover={{ y: -5 }}
                                    className="glass rounded-3xl p-8 text-center border border-white/20 hover:border-black/30 transition-all duration-300"
                                >
                                    <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-[#0e67ff] flex items-center justify-center">
                                        <Icon size={32} className="text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-black mb-3">{value.title}</h3>
                                    <p className="text-black/70">{value.description}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                <div className="mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12"
                    >
                        Meet the{' '}
                        <span className="font-extrabold">Team</span>
                    </motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                                    <div className="glass rounded-3xl p-8 text-center border border-white/20 hover:border-black/30 transition-all duration-300 h-full">
                                        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#0e67ff] flex items-center justify-center">
                                            <Icon size={40} className="text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-black mb-2">{member.role}</h3>
                                        <p className="text-black/70 mb-2">{member.name}</p>
                                        <p className="text-sm text-black/50 mb-4">{member.expertise}</p>
                                        <p className="text-sm text-black/70">{member.description}</p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="glass rounded-[2.5rem] p-6 sm:p-8 lg:p-12 border border-white/20"
                >
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
                        {[
                            { label: 'Founded', value: 'Mar 2026' },
                            { label: 'Team Members', value: '6' },
                            { label: 'Ready to Deliver', value: '100%' },
                            { label: 'Technologies', value: '25+' },
                        ].map((stat, index) => (
                            <div key={stat.label} className="text-center">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="text-4xl sm:text-5xl font-bold text-black mb-2"
                                >
                                    {stat.value}
                                </motion.div>
                                <p className="text-slate/70">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="py-24 px-4 sm:px-6 lg:px-8 text-center mt-16 relative rounded-[2.5rem] overflow-hidden"
                >
                    <div className="absolute inset-0 bg-[#FD4F0F] opacity-95" />
                    <p className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight relative z-10 text-white">Ready to work with us?</p>
                    <a href="/contact">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-white cursor-pointer text-black font-semibold rounded-full relative z-10 hover:bg-white transition-all duration-300"
                        >
                            Start Your Project
                        </motion.button>
                    </a>
                </motion.div>
            </div>
        </div>
    );
}
