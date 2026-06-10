import React from 'react';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import CaseStudies from '@/components/CaseStudies';
import TechStack from '@/components/TechStack';
import AboutSection from '@/components/AboutSection';
import CTASection from '@/components/CTASection';

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <CaseStudies />
      <TechStack />
      <AboutSection />
      <CTASection />
    </>
  );
}
