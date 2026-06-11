'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import BackgroundEffects from './BackgroundEffects';

export default function MarketingChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isShowcase = pathname?.startsWith('/demos');

  if (isShowcase) {
    return <>{children}</>;
  }

  return (
    <>
      <BackgroundEffects />
      <Navbar />
      <main className="min-h-screen pt-20">{children}</main>
      <Footer />
    </>
  );
}
