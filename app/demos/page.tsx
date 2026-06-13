import DemosGridWrapper from "@/components/demos/DemoGrid";
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
    title: 'Demo Library',
    description: 'Browse ManaTech interactive dashboard demos for analytics, CRM, finance, HR, and more enterprise workflows.',
    path: '/demos',
    keywords: ['dashboard demos', 'enterprise workflows', 'UI showcase'],
});

export default function DemosPage() {
    return (
        <DemosGridWrapper />
    );
}