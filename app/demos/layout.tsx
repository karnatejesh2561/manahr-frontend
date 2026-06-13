import './demos.css';
import { Instrument_Serif, JetBrains_Mono, Geist } from 'next/font/google';
import { ToastProvider } from '@/components/demos/Interactions';
import BackgroundEffects from '@/components/BackgroundEffects';
import { createPageMetadata } from '@/lib/seo';

const display = Instrument_Serif({ subsets: ['latin'], weight: '400', variable: '--font-display' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });
const sans = Geist({ subsets: ['latin'], variable: '--font-sans' });

export const metadata = createPageMetadata({
  title: 'ManaTech Showcase — Dashboards & UI System',
  description: 'A curated showcase of modern enterprise dashboards and interactive UI built by ManaTech.',
  path: '/demos',
  keywords: ['dashboard showcase', 'product design', 'enterprise UI'],
});

export default function ShowcaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${display.variable} ${mono.variable} ${sans.variable}`}>
      <BackgroundEffects />
      <ToastProvider>{children}</ToastProvider>
    </div>
  );
}
