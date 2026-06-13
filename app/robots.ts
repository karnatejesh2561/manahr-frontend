import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/.next/', '/private/'],
    },
    sitemap: 'https://manatech-murex.vercel.app/sitemap.xml',
  };
}
