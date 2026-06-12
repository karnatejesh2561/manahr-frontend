'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, ShieldCheck, Github } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/components/demos/schemas';
import { ScInput, ScPasswordInput, ScCheckbox } from '@/components/demos/FormFields';
import DashboardShell from '@/components/demos/DashboardShell';

export default function LoginWrapper() {
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
        router.push('/demos');
    };

    return (
        <DashboardShell>
            <div className="flex items-center justify-center">
                <motion.div
                    className="p-4  w-full max-w-lg inherent border border-gray-200 rounded-4xl"
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                >

                    <h2 className="sc-display" style={{ fontSize: 32 }}>Sign in</h2>
                    <p style={{ color: 'var(--sc-text-dim)', fontSize: 13, marginTop: 6 }}>
                        New here? <Link href="/demos/auth/register" className="underline" style={{ color: 'var(--sc-accent)' }} data-testid="register-link">Create an account</Link>
                    </p>

                    {/* SSO row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">
                        <button className="sc-btn justify-center" data-testid="sso-google">
                            <svg width="14" height="14" viewBox="0 0 24 24"><path fill="#fff" d="M12 11v3.2h7.2c-.3 2-2.3 5.8-7.2 5.8-4.3 0-7.9-3.6-7.9-8s3.6-8 7.9-8c2.5 0 4.1 1 5.1 2l3.4-3.3C18.4 1.6 15.5 0 12 0 5.4 0 0 5.4 0 12s5.4 12 12 12c6.9 0 11.5-4.9 11.5-11.7 0-.8-.1-1.4-.2-2H12z" /></svg>
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
                                <Link href="/demos/auth/forgot" style={{ fontSize: 11, color: 'var(--sc-accent)' }} data-testid="forgot-link">
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
        </DashboardShell>
    );
}
