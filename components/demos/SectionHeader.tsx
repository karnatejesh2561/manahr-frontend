import React from 'react';

export default function SectionHeader() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-16 sm:pt-20 relative z-10">
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <span className="text-[9px] sm:text-[11px] font-bold tracking-widest uppercase text-neutral-800 bg-neutral-100 px-2 sm:px-3 py-1 rounded-md border border-neutral-200 shadow-sm">
          # Portfolio · v2026.1
        </span>
        <span className="text-[9px] sm:text-[11px] font-medium text-neutral-500 bg-white border border-neutral-200 px-2 sm:px-3 py-1 rounded-md">
          12 modules
        </span>
        <span className="text-[9px] sm:text-[11px] font-medium text-neutral-500 bg-white border border-neutral-200 px-2 sm:px-3 py-1 rounded-md">
          70+ screens
        </span>
      </div>
      <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif text-neutral-900 tracking-tight leading-[1.05] mb-4 sm:mb-6">
        Enterprise UI,<br />
        <span className="italic text-neutral-400">impossibly</span> beautiful.
      </h1>
      <p className="text-sm md:text-base text-neutral-500 max-w-xl leading-relaxed mb-8 sm:mb-10">
        A curated tour through the dashboards, command centers and admin panels we
        build for ambitious teams. Every pixel hand-crafted. Every interaction
        considered. Every chart animated.
      </p>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
        <button className="w-full sm:w-auto bg-neutral-900 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-neutral-800 transition-colors shadow-md">
          Start the tour →
        </button>
        <button className="w-full sm:w-auto bg-white border border-neutral-200 text-neutral-700 px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-neutral-50 transition-colors">
          View auth flow
        </button>
      </div>
    </div>
  );
}
