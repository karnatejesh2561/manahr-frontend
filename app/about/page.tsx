import { createPageMetadata } from '@/lib/seo';
import AboutPageContent from '@/components/AboutPageContent';

export const metadata = createPageMetadata({
    title: 'About ManaTech',
    description: 'Learn about ManaTech, our values, team, and approach to building scalable digital products for modern businesses.',
    path: '/about',
    keywords: ['about ManaTech', 'software development team', 'startup agency', 'company values'],
});

export default function AboutPage() {
    return <AboutPageContent />;
}

