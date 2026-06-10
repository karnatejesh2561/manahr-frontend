'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

const CTASection: React.FC = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-[2.5rem] overflow-hidden"
        >
          {/* Solid Background */}
          <div className="absolute inset-0 bg-black opacity-90" />
          
          {/* Noise Texture */}
          <div className="absolute inset-0 noise opacity-20" />
          
          {/* Content */}
          <div className="relative px-8 sm:px-12 py-16 sm:py-20 text-center text-white">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium mb-6"
            >
              <Sparkles size={16} />
              Ready to Transform Your Business?
            </motion.div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Let's Build Something
              <br />
              Extraordinary Together
            </h2>

            <p className="text-lg sm:text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Partner with us to create innovative solutions that drive growth 
              and exceed expectations.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-8 py-4 bg-white text-black font-semibold rounded-full shadow-2xl flex items-center gap-2 transition-all duration-300"
                >
                  Get Started Now
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
              
              <Link href="/services">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white/20 backdrop-blur-sm border-2 border-white text-white font-semibold rounded-full hover:bg-white/30 transition-all duration-300"
                >
                  Explore Services
                </motion.button>
              </Link>
            </div>
          </div>

          {/* Decorative Elements */}
          <motion.div
            className="absolute top-10 right-10 w-32 h-32 rounded-full bg-white/10 blur-2xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          
          <motion.div
            className="absolute bottom-10 left-10 w-40 h-40 rounded-full bg-white/10 blur-2xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
