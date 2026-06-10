'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Eye, EyeOff, Check } from 'lucide-react';

export default function RegisterPage() {
  const [show, setShow] = React.useState(false);
  return (
    <div className="sc-root sc-shell" data-testid="register-page">
      <div className="sc-aurora"><div className="blob3" /></div>
      <div className="sc-grid-texture" />

      <div className="relative z-10 min-h-screen grid lg:grid-cols-2">
        <div className="flex items-center justify-center p-8 order-2 lg:order-1">
          <motion.div className="w-full max-w-md"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link href="/showcase" className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                   style={{ background: 'linear-gradient(135deg, var(--sc-accent), var(--sc-accent-2))' }}>
                <span style={{ color: '#0a0a0f', fontWeight: 800 }}>M</span>
              </div>
              <span className="sc-sans" style={{ fontWeight: 600 }}>ManaTech</span>
            </Link>

            <h2 className="sc-display" style={{ fontSize: 40 }}>Create account</h2>
            <p style={{ color: 'var(--sc-text-dim)', fontSize: 13, marginTop: 6 }}>
              Already have one? <Link href="/showcase/auth/login" style={{ color: 'var(--sc-accent)' }} className="underline" data-testid="login-link">Sign in</Link>
            </p>

            <form className="space-y-4 mt-8" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label style={{ fontSize: 11, color: 'var(--sc-text-dim)' }}>FIRST NAME</label>
                  <input className="sc-input mt-1.5" placeholder="Akira" data-testid="firstname-input" />
                </div>
                <div>
                  <label style={{ fontSize: 11, color: 'var(--sc-text-dim)' }}>LAST NAME</label>
                  <input className="sc-input mt-1.5" placeholder="Saito" data-testid="lastname-input" />
                </div>
              </div>
              <div>
                <label style={{ fontSize: 11, color: 'var(--sc-text-dim)' }}>WORK EMAIL</label>
                <input type="email" className="sc-input mt-1.5" placeholder="you@company.com" data-testid="reg-email" />
              </div>
              <div>
                <label style={{ fontSize: 11, color: 'var(--sc-text-dim)' }}>MOBILE</label>
                <input className="sc-input mt-1.5" placeholder="+81 90-1234-5678" data-testid="reg-mobile" />
              </div>
              <div>
                <label style={{ fontSize: 11, color: 'var(--sc-text-dim)' }}>PASSWORD</label>
                <div className="relative mt-1.5">
                  <input type={show ? 'text' : 'password'} className="sc-input pr-10"
                         placeholder="At least 12 characters" data-testid="reg-password" />
                  <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1" style={{ color: 'var(--sc-text-faint)' }}>
                    {show ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-1 mt-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="h-1 rounded-full" style={{ background: i <= 3 ? 'var(--sc-accent)' : 'rgba(255,255,255,0.1)' }} />
                  ))}
                </div>
                <div style={{ fontSize: 10, color: 'var(--sc-text-faint)', marginTop: 6 }}>Strong — well done.</div>
              </div>

              <label className="flex items-start gap-2" style={{ fontSize: 11, color: 'var(--sc-text-dim)' }}>
                <input type="checkbox" defaultChecked data-testid="reg-terms" className="mt-0.5" />
                I agree to the <Link href="#" style={{ color: 'var(--sc-accent)' }}>Terms</Link> and <Link href="#" style={{ color: 'var(--sc-accent)' }}>Privacy Policy</Link>.
              </label>

              <button className="sc-btn sc-btn-primary w-full justify-center" data-testid="register-submit">
                Create account <ArrowRight size={14} />
              </button>
            </form>
          </motion.div>
        </div>

        {/* Right side: benefits */}
        <div className="hidden lg:flex flex-col justify-center p-12 border-l order-1 lg:order-2" style={{ borderColor: 'var(--sc-border)' }}>
          <h1 className="sc-display" style={{ fontSize: 56, lineHeight: 1.05 }}>
            One workspace<br />for <span className="sc-grad-text" style={{ fontStyle: 'italic' }}>everything</span>.
          </h1>
          <p className="mt-5 max-w-md" style={{ color: 'var(--sc-text-dim)', fontSize: 14, lineHeight: 1.6 }}>
            Replace 6 tools with one beautifully designed operating system.
          </p>
          <ul className="mt-10 space-y-4">
            {[
              { t: '14-day free trial', s: 'No credit card. Cancel anytime.' },
              { t: 'Unlimited workspaces', s: 'Spin up sub-orgs for teams or clients.' },
              { t: 'Bank-grade security', s: 'SOC2, GDPR, end-to-end encryption.' },
              { t: 'AI co-pilot included', s: 'Insights, forecasts, anomaly alerts.' },
            ].map((f) => (
              <li key={f.t} className="flex gap-3">
                <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                     style={{ background: 'rgba(182,255,60,0.15)', border: '1px solid rgba(182,255,60,0.3)' }}>
                  <Check size={13} style={{ color: 'var(--sc-accent)' }} />
                </div>
                <div>
                  <div className="sc-sans" style={{ fontSize: 14, fontWeight: 500 }}>{f.t}</div>
                  <div style={{ fontSize: 12, color: 'var(--sc-text-dim)', marginTop: 2 }}>{f.s}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
