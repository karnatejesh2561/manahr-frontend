import type { Metadata } from 'next';

const siteName = 'ManaTech';
const siteDescription = 'ManaTech builds scalable SaaS platforms, enterprise software, and modern digital products for growing businesses.';
const siteUrl = new URL('https://manatech-murex.vercel.app/');
const defaultImage = new URL('/logo.svg', siteUrl).toString();
const twitterHandle = '@manatechio';
const defaultKeywords = [
  'ManaTech',
  'SaaS development',
  'enterprise software',
  'Next.js development',
  'React development',
  'web development agency',
  'mobile app development',
  'cloud infrastructure',
  'digital transformation',
  'custom software development',
  'startup technology',
];

export const siteMetadata: Metadata = {
  title: {
    default: 'ManaTech | Premium SaaS & Digital Solutions',
    template: '%s | ManaTech',
  },
  description: siteDescription,
  metadataBase: siteUrl,
  keywords: defaultKeywords,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl.toString(),
    languages: {
      'en-US': '/',
    },
  },
  openGraph: {
    title: 'ManaTech | Premium SaaS & Digital Solutions',
    description: siteDescription,
    url: siteUrl,
    siteName,
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: defaultImage,
        width: 1200,
        height: 630,
        alt: 'ManaTech - SaaS & Digital Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ManaTech | Premium SaaS & Digital Solutions',
    description: siteDescription,
    creator: twitterHandle,
    images: [defaultImage],
    site: twitterHandle,
  },
  icons: {
    icon: '/logo.svg',
    apple: '/logo.svg',
  },
  verification: {
    google: 'YOUR_GOOGLE_SITE_VERIFICATION_CODE',
  },
};

interface CreatePageMetadataOptions {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  image?: string;
  author?: string;
  ogType?: 'website' | 'article' | 'business.business';
}

export function createPageMetadata({
  title,
  description,
  path = '/',
  keywords = [],
  image,
  author = 'ManaTech',
  ogType = 'website',
}: CreatePageMetadataOptions): Metadata {
  const normalizedTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
  const url = new URL(path, siteUrl);
  const images = image ? [new URL(image, siteUrl).toString()] : [defaultImage];

  return {
    title: normalizedTitle,
    description,
    metadataBase: siteUrl,
    keywords: [...defaultKeywords, ...keywords],
    authors: [{ name: author }],
    creator: author,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: url.toString(),
      languages: {
        'en-US': path,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName,
      locale: 'en_US',
      type: ogType as any,
      images: [
        {
          url: images[0],
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: twitterHandle,
      images,
      site: twitterHandle,
    },
  };
}

// JSON-LD Schema helpers
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ManaTech',
  url: siteUrl.toString(),
  logo: defaultImage,
  description: siteDescription,
  sameAs: [
    'https://twitter.com/manatechio',
    'https://github.com/manatech',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Service',
    email: 'manatechservices.support@gmail.com',
    availableLanguage: 'en-US',
  },
  foundingDate: '2026-03-01',
  areaServed: 'Worldwide',
  serviceType: [
    'SaaS Development',
    'Enterprise Software',
    'Web Development',
    'Mobile App Development',
    'Cloud Infrastructure',
  ],
};

export const serviceSchema = (serviceName: string, serviceDescription: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: serviceName,
  description: serviceDescription,
  provider: {
    '@type': 'Organization',
    name: 'ManaTech',
    url: siteUrl.toString(),
  },
  areaServed: 'Worldwide',
});

export const faqSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

export const breadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

