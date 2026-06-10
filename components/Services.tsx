'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { HiCube, HiCodeBracket, HiShieldCheck, HiDevicePhoneMobile } from 'react-icons/hi2';

const services = [
  {
    icon: HiCube,
    title: 'SaaS Product Development',
    description: 'Full-stack SaaS platforms with multi-tenancy, subscriptions, and scalable architecture.',
    color: 'teal',
  },
  {
    icon: HiCodeBracket,
    title: 'Enterprise Software',
    description: 'Custom enterprise solutions with complex workflows, integrations, and robust security.',
    color: 'pink',
  },
  {
    icon: HiShieldCheck,
    title: 'Authentication & Security',
    description: 'Keycloak, SSO, RBAC, OAuth2, and enterprise-grade identity management solutions.',
    color: 'yellow',
  },
  {
    icon: HiDevicePhoneMobile,
    title: 'Web & Mobile Apps',
    description: 'Beautiful, performant applications for web, iOS, and Android with modern frameworks.',
    color: 'teal',
  },
];

const Services: React.FC = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
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
            What We{' '}
            <span className="font-extrabold">
              Build
            </span>
          </h2>
          <p className="text-lg text-black/70 max-w-2xl mx-auto">
            Comprehensive digital solutions tailored to your business needs
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative"
              >
                <div className="glass rounded-3xl p-8 h-full border border-white/20 hover:border-black/30 transition-all duration-300">
                  {/* Glow Effect */}
                  <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 glow`} />
                  
                  <div className="relative z-10">
                    <div className={`w-14 h-14 rounded-2xl bg-black flex items-center justify-center mb-6`}>
                      <Icon size={28} className="text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-3 text-black transition-colors">
                      {service.title}
                    </h3>
                    
                    <p className="text-black/70 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
