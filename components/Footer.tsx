import React from 'react';
import Link from 'next/link';
import { Mail, Linkedin, Github, Twitter } from 'lucide-react';
import Logo from './Logo';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white relative overflow-hidden">
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-4">
              <Logo width={160} height={42} />
            </div>
            <p className="text-white/70 mb-6 max-w-md">
              Building scalable SaaS platforms and intelligent digital solutions for modern businesses.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-white/70">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link href="/case-studies" className="hover:text-white transition-colors">Case Studies</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Get in Touch</h3>
            <ul className="space-y-2 text-white/70">
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><a href="mailto:manatech.services.official@gmail.com" className="hover:text-white transition-colors">manatech.services.official@gmail.com</a></li>
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
