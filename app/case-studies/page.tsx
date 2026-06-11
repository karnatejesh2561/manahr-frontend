'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowUpRight, Calendar, TrendingUp } from 'lucide-react';

const caseStudies = [
  {
    title: 'Your Project Here',
    subtitle: 'Let\'s Build Something Amazing',
    category: 'Opportunity',
    year: '2026',
    image: '🚀',
    challenge: 'We\'re a fresh startup with cutting-edge skills and boundless enthusiasm. We\'re ready to take on challenging projects and deliver exceptional results.',
    solution: 'With expertise in modern technologies like Next.js, React, Node.js, AWS, and more, we can build scalable, secure, and beautiful applications tailored to your needs.',
    results: [
      'Modern tech stack with latest frameworks',
      'Dedicated team focused on your success',
      'Competitive pricing for startups',
      'Agile development process',
      'Direct communication with developers',
    ],
    technologies: ['HTML', 'CSS', 'JavaScript', 'React', 'React Native', 'Next.js', 'Angular', 'TypeScript', 'Node.js', 'Java', 'AWS', 'MongoDB', 'PostgreSQL', 'Keycloak', 'Docker', 'Kubernetes'],
  },
];

export default function CaseStudiesPage() {
  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6">
            Your{' '}
            <span className="font-extrabold">
              Opportunity
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-black/70 max-w-3xl mx-auto px-4">
            Be our first client and get premium development services at startup-friendly rates.
          </p>
        </motion.div>

        {/* Case Studies */}
        <div className="space-y-12">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.title}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="glass rounded-[2.5rem] p-6 sm:p-8 lg:p-12 border border-white/20 hover:border-black/30 transition-all duration-300 hover:shadow-xl">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start mb-8 gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-5xl">{study.image}</span>
                      <div>
                        <h2 className="text-3xl font-bold text-black">{study.title}</h2>
                        <p className="text-black/60">{study.subtitle}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-black/60">
                      <span className="flex items-center gap-1">
                        <Calendar size={16} />
                        {study.year}
                      </span>
                      <span>•</span>
                      <span>{study.category}</span>
                    </div>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 45 }}
                    className={`w-12 h-12 rounded-full bg-black flex items-center justify-center flex-shrink-0`}
                  >
                    <ArrowUpRight size={24} className="text-white" />
                  </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-black mb-3 flex items-center gap-2">
                        <div className="w-1 h-6 bg-black rounded-full" />
                        Challenge
                      </h3>
                      <p className="text-black/70 leading-relaxed">{study.challenge}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-black mb-3 flex items-center gap-2">
                        <div className="w-1 h-6 bg-black rounded-full" />
                        Solution
                      </h3>
                      <p className="text-black/70 leading-relaxed">{study.solution}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-black mb-3">Technologies</h3>
                      <div className="flex flex-wrap gap-2">
                        {study.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-black/10 text-black text-sm rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Results */}
                  <div>
                    <h3 className="text-lg font-semibold text-black mb-4 flex items-center gap-2">
                      <TrendingUp size={20} className="text-black" />
                      Results & Impact
                    </h3>
                    <div className="space-y-3">
                      {study.results.map((result, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * idx }}
                          className="flex items-start gap-3 p-3 rounded-xl bg-white/40 hover:bg-white/60 transition-colors"
                        >
                          <CheckCircle2 size={20} className="text-black mt-0.5 flex-shrink-0" />
                          <span className="text-black/80">{result}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-slate/70 mb-6">
            Want similar results for your business?
          </p>
          <a href="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-yellow text-slate font-semibold rounded-full glow-yellow hover:shadow-xl transition-all duration-300"
            >
              Start Your Project
            </motion.button>
          </a>
        </motion.div>
      </div>
    </div>
  );
}
