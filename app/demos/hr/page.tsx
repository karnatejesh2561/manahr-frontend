import HRWrapper from "./hr-wrapper";
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
    title: 'HR Dashboard Demo',
    description: 'People and culture dashboard demo with headcount, hiring, attendance, and team analytics.',
    path: '/demos/hr',
    keywords: ['hr dashboard', 'people analytics', 'workforce management'],
    image: '/demos/hr.png',
});

export default function HRPage() {
    return (
        <HRWrapper />
    );
} 