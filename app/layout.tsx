import type { Metadata } from 'next';
import { Urbanist } from 'next/font/google';
import './globals.css';
import MarketingChrome from '@/components/MarketingChrome';
import SchemaMarkup from '@/components/SchemaMarkup';
import { siteMetadata } from '@/lib/seo';

const urbanist = Urbanist({ subsets: ['latin'], weight: ['400', '600', '700'] });

export const metadata: Metadata = siteMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <SchemaMarkup />
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="google-site-verification" content="H8eNnIyZ4gUw8iTjpn9536-NpDeoD62XbQ3f3Sj8FZw" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={urbanist.className} style={{ fontFamily: 'Urbanist, system-ui, sans-serif' }}>
        <MarketingChrome>{children}</MarketingChrome>
      </body>
    </html>
  );
}

