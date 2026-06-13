import CRMWrapper from "./crm-wrapper";
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
    title: 'CRM Command Center Demo',
    description: 'Customer relationship management demo highlighting pipeline, deals, and customer insights.',
    path: '/demos/crm',
    keywords: ['crm dashboard', 'sales pipeline', 'customer management'],
    image: '/demos/crm.png',
});

export default function CRMPage() {
    return (
        <CRMWrapper />
    );
}