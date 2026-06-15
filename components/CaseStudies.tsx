'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

const caseStudies = [
  {
    title: 'Your Project',
    subtitle: 'Be Our First Success Story',
    problem: 'Ready to build something amazing?',
    solution: 'We\'re a fresh team eager to bring your vision to life with cutting-edge technology and passionate dedication.',
    results: ['Custom solutions tailored to your needs', 'Modern tech stack', 'Dedicated support'],
  },
];

const CaseStudies: React.FC = () => {
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
            Ready to{' '}
            <span className="font-extrabold">
              Start
            </span>
          </h2>
          <p className="text-lg text-black/70 max-w-2xl mx-auto">
            Let's create your success story together
          </p>
        </motion.div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="glass rounded-3xl p-8 h-full border border-white/20 hover:border-[#0e67ff]/40 transition-all duration-300 hover:shadow-xl">
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-black mb-1">{study.title}</h3>
                    <p className="text-sm text-black/60">{study.subtitle}</p>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 45 }}
                    className={`w-10 h-10 rounded-full bg-[#0e67ff] flex items-center justify-center`}
                  >
                    <ArrowUpRight size={20} className="text-white" />
                  </motion.div>
                </div>

                {/* Problem */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-black/60 mb-2">Problem</h4>
                  <p className="text-black/80">{study.problem}</p>
                </div>

                {/* Solution */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-black/60 mb-2">Solution</h4>
                  <p className="text-black/80">{study.solution}</p>
                </div>

                {/* Results */}
                <div>
                  <h4 className="text-sm font-semibold text-black/60 mb-3">Results</h4>
                  <div className="space-y-2">
                    {study.results.map((result, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle2 size={18} className="text-black mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-black/80">{result}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link href="/case-studies">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 glass border-2 border-black text-black font-semibold rounded-full hover:bg-black/10 transition-all duration-300"
            >
              Start Your Project
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudies;
