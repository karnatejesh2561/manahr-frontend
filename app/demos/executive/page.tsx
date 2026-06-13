import ExecutiveWrapper from "./executive-wrapper";
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
    title: 'Executive Overview Demo',
    description: 'Executive dashboard demo with live KPIs and business performance metrics for decision makers.',
    path: '/demos/executive',
    keywords: ['executive dashboard', 'business intelligence', 'performance metrics'],
    image: '/demos/executive.png',
});

export default function ExecutivePage() {
    return (
        <ExecutiveWrapper />
    );
}