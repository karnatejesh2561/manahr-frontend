import React from 'react';
import Link from 'next/link';
import { Mail, Linkedin, Github, Twitter } from 'lucide-react';
import Logo from './Logo';
import { BsEnvelope, BsInstagram, BsLinkedin } from 'react-icons/bs';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-black text-white relative overflow-hidden">
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {/* Brand */}
                    <div className="sm:col-span-2 text-center sm:text-left">
                        <div className="mb-4 flex justify-center sm:justify-start">
                            <Logo type="logo-white" width={180} />
                        </div>
                        <p className="text-white/70 mb-6 max-w-md mx-auto sm:mx-0">
                            Building scalable SaaS platforms and intelligent digital solutions for modern businesses.
                        </p>
                        <div className="flex space-x-5 justify-center sm:justify-start">
                            <a href="https://www.linkedin.com/in/manatech-services" target='_blank' className=" rounded-lg hover:text-white text-white/70 transition-colors">
                                <BsLinkedin size={20} />
                            </a>
                            <a href="https://www.instagram.com/manatechservices" target='_blank' className=" rounded-lg hover:text-white text-white/70 transition-colors">
                                <BsInstagram size={20} />
                            </a>
                            <a href="mailto:manatech.services.official@gmail.com" target='_blank' className=" rounded-lg hover:text-white text-white/70 transition-colors">
                                <BsEnvelope size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="text-center sm:text-left">
                        <h3 className="font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-3 sm:space-y-2 text-white/70">
                            <li><Link href="/" className="hover:text-[#0e67ff] transition-colors">Home</Link></li>
                            <li><Link href="/services" className="hover:text-[#0e67ff] transition-colors">Services</Link></li>
                            <li><Link href="/case-studies" className="hover:text-[#0e67ff] transition-colors">Case Studies</Link></li>
                            <li><Link href="/about" className="hover:text-[#0e67ff] transition-colors">About</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="text-center sm:text-left">
                        <h3 className="font-semibold mb-4">Get in Touch</h3>
                        <ul className="space-y-3 sm:space-y-2 text-white/70">
                            <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                            <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms-and-conditions" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
                            <li><a href="mailto:manatech.services.official@gmail.com" className="hover:text-white transition-colors break-all">manatech.services.official@gmail.com</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-white/10 text-center text-white/60 text-sm">
                    <p>&copy; {currentYear} ManaTech. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
