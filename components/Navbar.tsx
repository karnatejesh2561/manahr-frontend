'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'Demos', href: '/demos' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
];

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass shadow-xl border-none bg-white/95' : 'glass bg-white/90 border-none'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 sm:h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <Logo width={180} />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="relative group"
                            >
                                <span className={`text-sm transition-colors ${pathname === link.href ? 'text-slate-900 font-semibold' : 'text-slate-700 hover:text-[#0e67ff]'}
                                    `}>
                                    {link.name}
                                </span>
                                <motion.div
                                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#0e67ff] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                                    initial={false}
                                />
                                {pathname === link.href && (
                                    <motion.div
                                        layoutId="navbar-indicator"
                                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#0e67ff]"
                                    />
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <div className="hidden md:block">
                        <a href="mailto:manatechservices.support@gmail.com?subject=Book a Call Request&body=Hi, I would like to schedule a call to discuss my project.">
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="px-6 py-2.5 bg-[#0e67ff] text-white font-semibold rounded-full shadow-[0_18px_40px_rgba(14,103,255,0.18)] transition-all duration-300 hover:bg-[#0858d6]"
                            >
                                Book a Call
                            </motion.button>
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden glass border-t border-white/20"
                    >
                        <div className="px-4 sm:px-6 py-6 sm:py-8 space-y-2 sm:space-y-4">
                            {navLinks.map((link, index) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className={`block py-3 sm:py-2 text-base sm:text-lg font-medium transition-colors rounded-lg px-4 -mx-4 sm:-mx-6 hover:bg-black/5 ${pathname === link.href ? 'text-black font-bold' : 'text-black/70 hover:text-black'
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: navLinks.length * 0.1 }}
                                className="pt-2"
                            >
                                <a href="mailto:manatechservices.support@gmail.com?subject=Book a Call Request&body=Hi, I would like to schedule a call to discuss my project." onClick={() => setIsOpen(false)}>
                                    <button className="w-full px-6 py-3.5 sm:py-3 bg-[#0e67ff] text-white font-semibold rounded-full glow text-base sm:text-sm transition-all duration-300 hover:bg-[#0858d6] hover:scale-[1.01]">
                                        Book a Call
                                    </button>
                                </a>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
