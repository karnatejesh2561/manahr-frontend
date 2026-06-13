import type { Metadata } from 'next';
import { Urbanist } from 'next/font/google';
import './globals.css';
import MarketingChrome from '@/components/MarketingChrome';
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
      <body className={urbanist.className} style={{ fontFamily: 'Urbanist, system-ui, sans-serif' }}>
        <MarketingChrome>{children}</MarketingChrome>
      </body>
    </html>
  );
}
