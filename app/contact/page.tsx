import { createPageMetadata } from '@/lib/seo';
import ContactPageContent from '@/components/ContactPageContent';

export const metadata = createPageMetadata({
  title: 'Contact ManaTech',
  description: 'Contact ManaTech to discuss SaaS development, enterprise software, mobile apps, or digital transformation projects.',
  path: '/contact',
  keywords: ['contact ManaTech', 'software development consultation', 'digital project inquiry'],
});

export default function ContactPage() {
  return <ContactPageContent />;
}


