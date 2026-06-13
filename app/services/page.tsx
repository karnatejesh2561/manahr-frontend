import { createPageMetadata } from '@/lib/seo';
import ServicesPageContent from '@/components/ServicesPageContent';

export const metadata = createPageMetadata({
  title: 'Digital Services',
  description: 'Explore ManaTech services for SaaS development, enterprise software, authentication, web and mobile apps, cloud infrastructure, and security.',
  path: '/services',
  keywords: ['software services', 'SaaS development', 'enterprise software', 'cloud infrastructure', 'mobile apps'],
});

export default function ServicesPage() {
  return <ServicesPageContent />;
}
