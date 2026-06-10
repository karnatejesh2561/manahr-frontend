'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, ArrowRight } from 'lucide-react';

export default function OTPPage() {
  const [vals, setVals] = React.useState(['', '', '', '', '', '']);
  const refs = React.useRef<(HTMLInputElement | null)[]>([]);

  const update = (i: number, v: string) => {
    if (!/^\d?$/.test(v)) return;
    const next = [...vals]; next[i] = v; setVals(next);
    if (v && i < 5) refs.current[i + 1]?.focus();
  };

  return (
    <div className="sc-root sc-shell" data-testid="otp-page">
      <div className="sc-aurora"><div className="blob3" /></div>
      <div className="sc-grid-texture" />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <motion.div className="sc-card w-full max-w-md p-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Link href="/showcase/auth/forgot" className="inline-flex items-center gap-1 text-xs" style={{ color: 'var(--sc-text-dim)' }}>
            <ArrowLeft size={12} /> Back
          </Link>

          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mt-6 mb-6 sc-ring"
               style={{ background: 'rgba(182,255,60,0.12)', border: '1px solid rgba(182,255,60,0.3)' }}>
            <Shield size={22} style={{ color: 'var(--sc-accent)' }} />
          </div>

          <h2 className="sc-display" style={{ fontSize: 36 }}>Verify it&apos;s you</h2>
          <p style={{ color: 'var(--sc-text-dim)', fontSize: 13, marginTop: 8 }}>
            We sent a 6-digit code to <strong style={{ color: 'var(--sc-text)' }}>akira@manatech.io</strong>. Enter it below to continue.
          </p>

          <div className="flex gap-2 justify-between mt-7" data-testid="otp-grid">
            {vals.map((v, i) => (
              <input
                key={i}
                ref={(el) => { refs.current[i] = el; }}
                value={v}
                onChange={(e) => update(i, e.target.value)}
                maxLength={1}
                className="sc-input text-center"
                style={{ width: 48, height: 56, fontSize: 22, fontFamily: 'Instrument Serif, serif' }}
                data-testid={`otp-digit-${i}`}
              />
            ))}
          </div>

          <button className="sc-btn sc-btn-primary w-full justify-center mt-7" data-testid="verify-otp">
            Verify code <ArrowRight size={14} />
          </button>

          <div className="mt-6 text-center" style={{ fontSize: 12, color: 'var(--sc-text-faint)' }}>
            Code expires in <span style={{ color: 'var(--sc-accent)', fontFamily: 'monospace' }}>14:32</span> · <button className="underline">Resend</button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
