import './showcase.css';
import { Instrument_Serif, JetBrains_Mono, Geist } from 'next/font/google';
import { ToastProvider } from '@/components/showcase/Interactions';

const display = Instrument_Serif({ subsets: ['latin'], weight: '400', variable: '--font-display' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });
const sans = Geist({ subsets: ['latin'], variable: '--font-sans' });

export const metadata = {
  title: 'ManaTech Showcase — Dashboards & UI System',
  description: 'A curated showcase of modern enterprise dashboards & UI built by ManaTech.',
};

export default function ShowcaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${display.variable} ${mono.variable} ${sans.variable}`}>
      <ToastProvider>{children}</ToastProvider>
    </div>
  );
}
