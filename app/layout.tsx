import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackgroundEffects from '@/components/BackgroundEffects';

const inter = Inter({ subsets: ['latin'] });

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
      <body className={inter.className}>
        <BackgroundEffects />
        <Navbar />
        <main className="min-h-screen pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
