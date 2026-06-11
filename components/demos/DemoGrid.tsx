'use client';

import React from 'react';
import DemoCard from './DemoCard';

interface DemoGridProps {
  screens: any[];
}

export default function DemoGrid({ screens }: DemoGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pb-12 sm:pb-24 mt-8 sm:mt-12 relative z-10">
      {screens.map((s, i) => (
        <DemoCard key={s.href} {...s} index={i} />
      ))}
    </div>
  );
}
