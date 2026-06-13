import AuditWrapper from "./audit-wrapper";
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Audit Log Demo',
  description: 'Immutable audit log dashboard demo with event history, export options, and compliance-ready tracking.',
  path: '/demos/audit',
  keywords: ['audit log', 'event history', 'compliance dashboard'],
  image: '/demos/audit.png',
});

export default function AuditPage() {
  return (
    <AuditWrapper />
  );
}