import { createPageMetadata } from '@/lib/seo';
import CaseStudiesPageContent from '@/components/CaseStudiesPageContent';

export const metadata = createPageMetadata({
  title: 'Case Studies',
  description: 'See ManaTech case study concepts and discover how our team builds successful software projects for growing businesses.',
  path: '/case-studies',
  keywords: ['case studies', 'software success stories', 'startup project portfolio'],
});

export default function CaseStudiesPage() {
  return <CaseStudiesPageContent />;
}
