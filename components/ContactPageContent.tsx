'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send } from 'lucide-react';

export default function ContactPageContent() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        message: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const subject = encodeURIComponent(`New Contact from ${formData.name}${formData.company ? ` - ${formData.company}` : ''}`);
        const body = encodeURIComponent(
            `Name: ${formData.name}\n` +
            `Email: ${formData.email}\n` +
            `Company: ${formData.company || 'N/A'}\n\n` +
            `Message:\n${formData.message}`
        );

        window.location.href = `mailto:manatech.services.official@gmail.com?subject=${subject}&body=${body}`;
    };

    return (
        <div className="py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6">
                        Get in{' '}
                        <span className="font-extrabold">Touch</span>
                    </h1>
                    <p className="text-lg sm:text-xl text-black/70 max-w-2xl mx-auto px-4">
                        Ready to start your project? Let's discuss how we can help transform your vision into reality.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="glass rounded-[2.5rem] p-6 sm:p-8 lg:p-12 border border-white/20">
                            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-black">Send us a Message</h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-black mb-2">
                                        Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-xl glass border border-white/20 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/20 transition-all text-black placeholder-black/40"
                                        placeholder="Your name"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-black mb-2">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-xl glass border border-white/20 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/20 transition-all text-black placeholder-black/40"
                                        placeholder="your@email.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="company" className="block text-sm font-medium text-black mb-2">
                                        Company
                                    </label>
                                    <input
                                        type="text"
                                        id="company"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl glass border border-white/20 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/20 transition-all text-black placeholder-black/40"
                                        placeholder="Your company (optional)"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-black mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={6}
                                        className="w-full px-4 py-3 rounded-xl glass border border-white/20 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/20 transition-all text-black placeholder-black/40 resize-none"
                                        placeholder="Tell us about your project..."
                                    />
                                </div>

                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full px-8 py-4 font-semibold rounded-full flex items-center justify-center gap-2 transition-all duration-300 bg-black text-white glow hover:shadow-xl"
                                >
                                    Send Message
                                    <Send size={20} />
                                </motion.button>
                            </form>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="space-y-8"
                    >
                        <div className="glass rounded-[2.5rem] p-6 sm:p-8 lg:p-12 border border-white/20">
                            <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-black">Contact Information</h2>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center flex-shrink-0">
                                        <Mail size={24} className="text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-black mb-1">Email</h3>
                                        <a href="mailto:hello@manatech.com" className="text-black/70 hover:text-black transition-colors">
                                            hello@manatech.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center flex-shrink-0">
                                        <Phone size={24} className="text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-black mb-1">Phone</h3>
                                        <a href="tel:+1234567890" className="text-black/70 hover:text-black transition-colors">
                                            +1 (234) 567-890
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center flex-shrink-0">
                                        <MapPin size={24} className="text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-black mb-1">Location</h3>
                                        <p className="text-black/70">
                                            Remote-First<br />
                                            Serving Clients Worldwide
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="glass rounded-[2.5rem] p-8 border border-white/20">
                            <h3 className="font-semibold text-black mb-4">Business Hours</h3>
                            <div className="space-y-2 text-black/70">
                                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                                <p>Saturday: 10:00 AM - 2:00 PM</p>
                                <p>Sunday: Closed</p>
                            </div>
                            <p className="text-sm text-black/50 mt-4">* All times are in your local timezone</p>
                        </div>

                        <div className="glass rounded-[2.5rem] p-8 border border-white/20">
                            <h3 className="font-semibold text-black mb-2">Quick Response</h3>
                            <p className="text-black/70">We typically respond to all inquiries within 24 hours during business days.</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
