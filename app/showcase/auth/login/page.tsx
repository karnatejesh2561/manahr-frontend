'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, ShieldCheck, Github } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/components/showcase/schemas';
import { ScInput, ScPasswordInput, ScCheckbox } from '@/components/showcase/FormFields';

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'akira@manatech.io',
      password: 'supersecret',
      rememberMe: true,
    },
  });

  const onSubmit = (data: any) => {
    console.log('Login Form Submitted:', data);
    router.push('/showcase');
  };

  return (
    <div className="sc-root sc-shell" data-testid="login-page">
      <div className="sc-aurora"><div className="blob3" /></div>
      <div className="sc-grid-texture" />

      <div className="relative z-10 min-h-screen grid lg:grid-cols-2">
        {/* Left visual side */}
        <div className="hidden lg:flex flex-col justify-between p-12 border-r" style={{ borderColor: 'var(--sc-border)' }}>
          <Link href="/showcase" className="flex items-center gap-3" data-testid="brand-link">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                 style={{ background: 'linear-gradient(135deg, var(--sc-accent), var(--sc-accent-2))' }}>
              <span style={{ color: '#0a0a0f', fontWeight: 800 }}>M</span>
            </div>
            <div className="sc-sans" style={{ fontSize: 14, fontWeight: 600 }}>ManaTech Cloud</div>
          </Link>

          <div>
            <span className="sc-chip sc-chip-accent"><Sparkles size={11} /> AI-native workspace</span>
            <h1 className="sc-display mt-6" style={{ fontSize: 64, lineHeight: 1 }}>
              Welcome back, <br /><span className="sc-grad-text" style={{ fontStyle: 'italic' }}>operator</span>.
            </h1>
            <p className="mt-5 max-w-md" style={{ color: 'var(--sc-text-dim)', fontSize: 14, lineHeight: 1.6 }}>
              Sign in to access your command center. 12 modules, one workspace.
              Designed for the operators of tomorrow.
            </p>

            {/* Floating preview card */}
            <motion.div
              className="sc-card sc-float p-5 mt-10 max-w-sm sc-tilt"
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            >
              <div className="flex items-center justify-between">
                <div style={{ fontSize: 11, color: 'var(--sc-text-faint)' }}>MONTHLY REVENUE</div>
                <span className="sc-chip sc-chip-success">+24.3%</span>
              </div>
              <div className="sc-display mt-2" style={{ fontSize: 36 }}>$1,284,902</div>
              <div className="mt-4 flex items-end gap-1 h-10">
                {[28, 40, 32, 50, 44, 60, 55, 72, 68, 80, 76, 92].map((v, i) => (
                  <motion.div key={i}
                    initial={{ height: 0 }} animate={{ height: `${v}%` }}
                    transition={{ delay: 0.6 + i * 0.04 }}
                    className="flex-1 rounded-sm"
                    style={{ background: 'linear-gradient(180deg, var(--sc-accent), transparent)' }}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          <div className="flex items-center gap-3" style={{ fontSize: 11, color: 'var(--sc-text-faint)' }}>
            <ShieldCheck size={12} /> SOC2 · ISO27001 · GDPR ready
          </div>
        </div>

        {/* Right form side */}
        <div className="flex items-center justify-center p-8">
          <motion.div
            className="w-full max-w-md"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          >
            <div className="lg:hidden mb-8">
              <Link href="/showcase" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                     style={{ background: 'var(--sc-accent)' }}>
                  <span style={{ color: '#0a0a0f', fontWeight: 800 }}>M</span>
                </div>
                <span className="sc-sans" style={{ fontWeight: 600 }}>ManaTech</span>
              </Link>
            </div>

            <h2 className="sc-display" style={{ fontSize: 40 }}>Sign in</h2>
            <p style={{ color: 'var(--sc-text-dim)', fontSize: 13, marginTop: 6 }}>
              New here? <Link href="/showcase/auth/register" className="underline" style={{ color: 'var(--sc-accent)' }} data-testid="register-link">Create an account</Link>
            </p>

            {/* SSO row */}
            <div className="grid grid-cols-2 gap-3 mt-8">
              <button className="sc-btn justify-center" data-testid="sso-google">
                <svg width="14" height="14" viewBox="0 0 24 24"><path fill="#fff" d="M12 11v3.2h7.2c-.3 2-2.3 5.8-7.2 5.8-4.3 0-7.9-3.6-7.9-8s3.6-8 7.9-8c2.5 0 4.1 1 5.1 2l3.4-3.3C18.4 1.6 15.5 0 12 0 5.4 0 0 5.4 0 12s5.4 12 12 12c6.9 0 11.5-4.9 11.5-11.7 0-.8-.1-1.4-.2-2H12z"/></svg>
                Google
              </button>
              <button className="sc-btn justify-center" data-testid="sso-github">
                <Github size={14} /> GitHub
              </button>
            </div>

            <div className="flex items-center gap-3 my-7" style={{ color: 'var(--sc-text-faint)', fontSize: 11 }}>
              <div className="flex-1 h-px" style={{ background: 'var(--sc-border)' }} />
              OR CONTINUE WITH EMAIL
              <div className="flex-1 h-px" style={{ background: 'var(--sc-border)' }} />
            </div>

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <ScInput
                label="EMAIL"
                type="email"
                placeholder="founder@acme.co"
                data-testid="email-input"
                error={errors.email?.message}
                {...register('email')}
              />

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-[11px] font-medium tracking-wider uppercase" style={{ color: 'var(--sc-text-dim)' }}>PASSWORD</span>
                  <Link href="/showcase/auth/forgot" style={{ fontSize: 11, color: 'var(--sc-accent)' }} data-testid="forgot-link">
                    Forgot?
                  </Link>
                </div>
                <ScPasswordInput
                  placeholder="••••••••••••"
                  data-testid="password-input"
                  error={errors.password?.message}
                  {...register('password')}
                />
              </div>

              <ScCheckbox
                label="Remember me on this device"
                data-testid="remember-me"
                error={errors.rememberMe?.message}
                {...register('rememberMe')}
              />

              <button type="submit" className="sc-btn sc-btn-primary w-full justify-center mt-2" data-testid="login-submit">
                Sign in <ArrowRight size={14} />
              </button>
            </form>

            <div className="mt-6 p-3 rounded-xl" style={{ background: 'rgba(106,255,224,0.06)', border: '1px solid rgba(106,255,224,0.2)' }}>
              <div style={{ fontSize: 11, color: 'var(--sc-accent-2)' }}>
                <strong>Demo mode:</strong> use any credentials. This is a UI showcase.
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
