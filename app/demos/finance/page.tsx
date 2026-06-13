import FinanceWrapper from "./finance-wrapper";
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
    title: 'Finance Command Demo',
    description: 'Finance dashboard demo for P&L, cash flow, invoices, and reconciled financial workflows.',
    path: '/demos/finance',
    keywords: ['finance dashboard', 'financial reporting', 'invoice management'],
    image: '/demos/finance.png',
});

export default function FinancePage() {
    return (
        <FinanceWrapper />
    );
}