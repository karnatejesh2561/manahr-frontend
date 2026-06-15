'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    SiNextdotjs,
    SiReact,
    SiAngular,
    SiTypescript,
    SiNodedotjs,
    SiOpenjdk,
    SiMongodb,
    SiPostgresql,
    SiDocker,
    SiKubernetes,
    SiHtml5,
    SiCss,
    SiJavascript
} from 'react-icons/si';
import { FaShieldAlt, FaAws } from 'react-icons/fa';

const techStack = [
    { name: 'HTML', category: 'Frontend', icon: SiHtml5 },
    { name: 'CSS', category: 'Frontend', icon: SiCss },
    { name: 'JavaScript', category: 'Frontend', icon: SiJavascript },
    { name: 'React', category: 'Frontend', icon: SiReact },
    { name: 'React Native', category: 'Mobile', icon: SiReact },
    { name: 'Next.js', category: 'Frontend', icon: SiNextdotjs },
    { name: 'Angular', category: 'Frontend', icon: SiAngular },
    { name: 'TypeScript', category: 'Language', icon: SiTypescript },
    { name: 'Node.js', category: 'Backend', icon: SiNodedotjs },
    { name: 'Java', category: 'Backend', icon: SiOpenjdk },
    { name: 'AWS', category: 'Cloud', icon: FaAws },
    { name: 'MongoDB', category: 'Database', icon: SiMongodb },
    { name: 'PostgreSQL', category: 'Database', icon: SiPostgresql },
    { name: 'Keycloak', category: 'Security', icon: FaShieldAlt },
    { name: 'Docker', category: 'DevOps', icon: SiDocker },
    { name: 'Kubernetes', category: 'DevOps', icon: SiKubernetes },
];

const TechStack: React.FC = () => {
    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8">
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
                        Our{' '}
                        <span className="font-extrabold">
                            Tech Stack
                        </span>
                    </h2>
                    <p className="text-lg text-black/70 max-w-2xl mx-auto">
                        Leveraging cutting-edge technologies to build exceptional solutions
                    </p>
                </motion.div>

                {/* Tech Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {techStack.map((tech, index) => {
                        const Icon = tech.icon;
                        return (
                            <motion.div
                                key={tech.name}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                whileHover={{ y: -5, scale: 1.05 }}
                                className="group"
                            >
                                <div className="glass rounded-2xl p-6 text-center border border-white/20 hover:border-black/40 transition-all duration-300 hover:glow">
                                    <div className="mb-4 flex items-center justify-center">
                                        <Icon className="w-12 h-12 text-black group-hover:scale-110 transition-transform" />
                                    </div>
                                    <h3 className="font-semibold text-black mb-1">{tech.name}</h3>
                                    <p className="text-xs text-black/60">{tech.category}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default TechStack;
