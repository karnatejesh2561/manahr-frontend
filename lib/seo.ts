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
  'Next.js',
  'React',
  'web development',
  'mobile apps',
  'cloud infrastructure',
  'digital transformation',
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
    images: [defaultImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ManaTech | Premium SaaS & Digital Solutions',
    description: siteDescription,
    creator: twitterHandle,
    images: [defaultImage],
  },
  icons: {
    icon: '/logo.svg',
    apple: '/logo.svg',
  },
};

interface CreatePageMetadataOptions {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  image?: string;
}

export function createPageMetadata({
  title,
  description,
  path = '/',
  keywords = [],
  image,
}: CreatePageMetadataOptions): Metadata {
  const normalizedTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
  const url = new URL(path, siteUrl);
  const images = image ? [new URL(image, siteUrl).toString()] : [defaultImage];

  return {
    title: normalizedTitle,
    description,
    metadataBase: siteUrl,
    keywords: [...defaultKeywords, ...keywords],
    robots: {
      index: true,
      follow: true,
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
      type: 'website',
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: twitterHandle,
      images,
    },
    icons: {
      icon: '/logo.svg',
      apple: '/logo.svg',
    },
  };
}
