import React from 'react';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import CaseStudies from '@/components/CaseStudies';
import DemosPreview from '@/components/DemosPreview';
import TechStack from '@/components/TechStack';
import AboutSection from '@/components/AboutSection';
import CTASection from '@/components/CTASection';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
    title: 'Premium SaaS & Digital Solutions',
    description: 'ManaTech builds scalable SaaS platforms, enterprise software, and modern digital products for growing businesses.',
    path: '/',
    keywords: ['SaaS development', 'enterprise software', 'digital product agency'],
});

export default function Home() {
    return (
        <>
            <Hero />
            <Services />
            <CaseStudies />
            <DemosPreview />
            <TechStack />
            <AboutSection />
            <CTASection />
        </>
    );
}
