'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, ArrowRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotSchema } from '@/components/demos/schemas';
import { ScInput } from '@/components/demos/FormFields';

export default function ForgotWrapper() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(forgotSchema),
        defaultValues: {
            email: 'akira@manatech.io',
        },
    });

    const onSubmit = (data: any) => {
        console.log('Forgot Password Submitted:', data);
        router.push('/demos/auth/otp');
    };

    return (
        <div className="sc-root sc-shell" data-testid="forgot-page">
            <div className="sc-aurora"><div className="blob3" /></div>
            <div className="sc-grid-texture" />

            <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
                <motion.div className="sc-card w-full max-w-md p-6 sm:p-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <Link href="/demos/auth/login" className="inline-flex items-center gap-1 text-xs" style={{ color: 'var(--sc-text-dim)' }} data-testid="back-to-login">
                        <ArrowLeft size={12} /> Back to sign in
                    </Link>

                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mt-6 mb-6 sc-ring"
                        style={{ background: 'rgba(122,92,255,0.12)', border: '1px solid rgba(122,92,255,0.3)' }}>
                        <Mail size={22} style={{ color: 'var(--sc-accent-4)' }} />
                    </div>

                    <h2 className="sc-display" style={{ fontSize: 36 }}>Reset your password</h2>
                    <p style={{ color: 'var(--sc-text-dim)', fontSize: 13, marginTop: 8 }}>
                        Enter the email tied to your account. We&apos;ll send a secure link to reset your password — valid for 15 minutes.
                    </p>

                    <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
                        <ScInput
                            label="EMAIL"
                            type="email"
                            placeholder="you@company.com"
                            data-testid="forgot-email"
                            error={errors.email?.message}
                            {...register('email')}
                        />
                        <button type="submit" className="sc-btn sc-btn-primary w-full justify-center" data-testid="send-reset">
                            Send reset link <ArrowRight size={14} />
                        </button>
                    </form>

                    <div className="mt-6 text-center" style={{ fontSize: 12, color: 'var(--sc-text-faint)' }}>
                        Didn&apos;t get it? <button className="underline" style={{ color: 'var(--sc-accent)' }}>Resend in 0:45</button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
