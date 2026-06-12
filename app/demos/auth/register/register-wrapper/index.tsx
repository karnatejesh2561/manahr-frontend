'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@/components/demos/schemas';
import { ScInput, ScPasswordInput, ScCheckbox } from '@/components/demos/FormFields';

export default function RegisterWrapper() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            password: '',
            terms: true,
        },
    });

    const onSubmit = (data: any) => {
        console.log('Register Form Submitted:', data);
        router.push('/demos/auth/otp');
    };

    return (
        <div className="sc-root sc-shell" data-testid="register-page">
            <div className="sc-aurora"><div className="blob3" /></div>
            <div className="sc-grid-texture" />

            <div className="relative z-10 min-h-screen grid lg:grid-cols-2">
                <div className="flex items-center justify-center p-4 sm:p-8 order-2 lg:order-1">
                    <motion.div className="w-full max-w-md"
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <Link href="/demos" className="flex items-center gap-2 mb-6 sm:mb-8">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                                style={{ background: 'linear-gradient(135deg, var(--sc-accent), var(--sc-accent-2))' }}>
                                <span style={{ color: '#0a0a0f', fontWeight: 800 }}>M</span>
                            </div>
                            <span className="sc-sans" style={{ fontWeight: 600 }}>ManaTech</span>
                        </Link>

                        <h2 className="sc-display" style={{ fontSize: 32 }}>Create account</h2>
                        <p style={{ color: 'var(--sc-text-dim)', fontSize: 13, marginTop: 6 }}>
                            Already have one? <Link href="/demos/auth/login" style={{ color: 'var(--sc-accent)' }} className="underline" data-testid="login-link">Sign in</Link>
                        </p>

                        <form className="space-y-4 mt-8" onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <ScInput
                                    label="FIRST NAME"
                                    placeholder="Akira"
                                    data-testid="firstname-input"
                                    error={errors.firstName?.message}
                                    {...register('firstName')}
                                />
                                <ScInput
                                    label="LAST NAME"
                                    placeholder="Saito"
                                    data-testid="lastname-input"
                                    error={errors.lastName?.message}
                                    {...register('lastName')}
                                />
                            </div>
                            <ScInput
                                label="WORK EMAIL"
                                type="email"
                                placeholder="you@company.com"
                                data-testid="reg-email"
                                error={errors.email?.message}
                                {...register('email')}
                            />
                            <ScInput
                                label="MOBILE"
                                placeholder="+81 90-1234-5678"
                                data-testid="reg-mobile"
                                error={errors.phone?.message}
                                {...register('phone')}
                            />
                            <div>
                                <ScPasswordInput
                                    label="PASSWORD"
                                    placeholder="At least 6 characters"
                                    data-testid="reg-password"
                                    error={errors.password?.message}
                                    {...register('password')}
                                />
                                <div className="grid grid-cols-4 gap-1 mt-2">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="h-1 rounded-full" style={{ background: i <= 3 ? 'var(--sc-accent)' : 'rgba(255,255,255,0.1)' }} />
                                    ))}
                                </div>
                                <div style={{ fontSize: 10, color: 'var(--sc-text-faint)', marginTop: 6 }}>Strong — well done.</div>
                            </div>

                            <ScCheckbox
                                label={
                                    <span>
                                        I agree to the <Link href="#" style={{ color: 'var(--sc-accent)' }}>Terms</Link> and <Link href="#" style={{ color: 'var(--sc-accent)' }}>Privacy Policy</Link>.
                                    </span>
                                }
                                data-testid="reg-terms"
                                error={errors.terms?.message}
                                {...register('terms')}
                            />

                            <button type="submit" className="sc-btn sc-btn-primary w-full justify-center" data-testid="register-submit">
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
