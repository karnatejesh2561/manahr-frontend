import { createPageMetadata } from '@/lib/seo';
import BlogPageContent from '@/components/BlogPageContent';

export const metadata = createPageMetadata({
    title: 'Blog | SaaS & Development Insights',
    description: 'Read our latest articles about SaaS development, software engineering, cloud infrastructure, and digital transformation.',
    path: '/blog',
    keywords: ['SaaS blog', 'development articles', 'tech insights', 'software engineering'],
});

export default function BlogPage() {
    return <BlogPageContent />;
}
