import AnalyticsWrapper from "./analytics-wrapper";
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
    title: 'Analytics Studio Demo',
    description: 'Interactive analytics dashboard demo built by ManaTech showing traffic, funnel, and retention insights.',
    path: '/demos/analytics',
    keywords: ['analytics dashboard', 'business intelligence', 'data visualization'],
    image: '/demos/analytics.png',
});

export default function AnalyticsPage() {
    return (
        <AnalyticsWrapper />
    );
}