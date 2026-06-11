import type { Metadata } from 'next';
import { Urbanist } from 'next/font/google';
import './globals.css';
import MarketingChrome from '@/components/MarketingChrome';

const urbanist = Urbanist({ subsets: ['latin'], weight: ['400','600','700'] });

export const metadata: Metadata = {
  title: 'ManaTech | Premium SaaS & Digital Solutions',
  description: 'Building scalable SaaS platforms and intelligent digital solutions for modern businesses',
};

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
