'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Lock, Bell, Plug, CreditCard, Palette, Globe, Webhook } from 'lucide-react';
import DashboardShell from '@/components/demos/DashboardShell';
import { useToast } from '@/components/demos/Interactions';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { settingsSchema } from '@/components/demos/schemas';
import { ScInput } from '@/components/demos/FormFields';

const sections = [
    { id: 'company', name: 'Company', icon: Building2 },
    { id: 'branding', name: 'Branding', icon: Palette },
    { id: 'security', name: 'Security', icon: Lock },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'integrations', name: 'Integrations', icon: Plug },
    { id: 'billing', name: 'Billing', icon: CreditCard },
    { id: 'localization', name: 'Localization', icon: Globe },
    { id: 'webhooks', name: 'Webhooks', icon: Webhook },
];

export default function SettingsPage() {
    const [active, setActive] = React.useState('company');
    const { push } = useToast();

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(settingsSchema),
        defaultValues: {
            companyName: 'Acme Holdings K.K.',
            taxId: 'JP-128-4902-0034',
            website: 'https://acme.co',
            industry: 'Industrial automation',
            headOffice: '2-4-1 Marunouchi, Chiyoda, Tokyo 100-6390, JP',
        }
    });

    const onSubmit = (data: any) => {
        push('Company info saved · changes propagated to billing & invoices', 'success');
    };

    return (
        <DashboardShell
            title="Settings"
            subtitle="Customize your workspace, security and integrations."
            breadcrumb={['Workspace', 'Settings']}
        >
            <div className="flex flex-col md:flex-row gap-6">
                {/* Sidebar nav */}
                <motion.aside className="sc-card p-3 h-fit" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    {sections.map(s => {
                        const I = s.icon;
                        return (
                            <button key={s.id} onClick={() => setActive(s.id)}
                                className={`sc-sidebar-link mb-1 w-full ${active === s.id ? 'active' : ''}`}
                                data-testid={`settings-tab-${s.id}`}>
                                <I size={14} />{s.name}
                            </button>
                        );
                    })}
                </motion.aside>

                {/* Content */}
                <div className=" space-y-5 w-full">
                    {active === 'company' && (
                        <motion.div className="sc-card p-7" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="sc-sans" style={{ fontSize: 18, fontWeight: 600 }}>Company information</div>
                            <div style={{ fontSize: 12, color: 'var(--sc-text-faint)', marginTop: 4 }}>This appears on invoices, emails and reports.</div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-7">
                                    <ScInput
                                        label="Legal Name"
                                        data-testid="company-name"
                                        error={errors.companyName?.message}
                                        {...register('companyName')}
                                    />
                                    <ScInput
                                        label="Tax ID"
                                        error={errors.taxId?.message}
                                        {...register('taxId')}
                                    />
                                    <ScInput
                                        label="Website"
                                        error={errors.website?.message}
                                        {...register('website')}
                                    />
                                    <ScInput
                                        label="Industry"
                                        error={errors.industry?.message}
                                        {...register('industry')}
                                    />
                                    <ScInput
                                        label="Head Office"
                                        wrapperClassName="md:col-span-2"
                                        error={errors.headOffice?.message}
                                        {...register('headOffice')}
                                    />
                                </div>
                                <div className="flex justify-end gap-2 mt-7">
                                    <button type="button" className="sc-btn sc-btn-ghost" onClick={() => reset()}>Cancel</button>
                                    <button type="submit" className="sc-btn sc-btn-primary" data-testid="save-settings">Save changes</button>
                                </div>
                            </form>
                        </motion.div>
                    )}

                    {active === 'branding' && (
                        <motion.div className="sc-card p-7" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="sc-sans" style={{ fontSize: 18, fontWeight: 600 }}>Brand & appearance</div>
                            <div style={{ fontSize: 12, color: 'var(--sc-text-faint)', marginTop: 4 }}>How your workspace looks for the team.</div>
                            <div className="mt-6">
                                <label style={{ fontSize: 11, color: 'var(--sc-text-dim)' }}>ACCENT COLOR</label>
                                <div className="flex gap-2 mt-3">
                                    {['#b6ff3c', '#6affe0', '#ff6bcb', '#7a5cff', '#ffb547', '#ff5e7e'].map((c, i) => (
                                        <button key={c} className="w-10 h-10 rounded-xl relative"
                                            style={{ background: c, boxShadow: i === 0 ? `0 0 0 2px var(--sc-bg), 0 0 0 4px ${c}` : 'none' }} />
                                    ))}
                                </div>
                            </div>
                            <div className="mt-7">
                                <label style={{ fontSize: 11, color: 'var(--sc-text-dim)' }}>THEME</label>
                                <div className="grid grid-cols-3 gap-3 mt-3">
                                    {['Midnight', 'Carbon', 'Aurora'].map((t, i) => (
                                        <div key={t} className="rounded-xl p-4 cursor-pointer"
                                            style={{ background: i === 0 ? 'rgba(182,255,60,0.06)' : 'rgba(255,255,255,0.03)', border: i === 0 ? '1px solid rgba(182,255,60,0.3)' : '1px solid var(--sc-border)' }}>
                                            <div className="h-12 rounded-md mb-3" style={{ background: ['linear-gradient(135deg,#07070b,#1a1a24)', 'linear-gradient(135deg,#0e1116,#1c1f26)', 'linear-gradient(135deg,#7a5cff,#6affe0)'][i] }} />
                                            <div style={{ fontSize: 12, fontWeight: 500 }}>{t}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {active === 'security' && (
                        <motion.div className="sc-card p-7" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="sc-sans" style={{ fontSize: 18, fontWeight: 600 }}>Security</div>
                            <div style={{ fontSize: 12, color: 'var(--sc-text-faint)', marginTop: 4 }}>Protect your workspace and your team.</div>
                            <div className="mt-6 space-y-3">
                                {[
                                    { l: 'Require MFA for all members', s: 'Recommended for SOC2 compliance', on: true },
                                    { l: 'SSO (SAML 2.0)', s: 'Currently connected to Okta', on: true },
                                    { l: 'Session timeout', s: 'Auto-logout after 24 hours of inactivity', on: true },
                                    { l: 'IP allowlist', s: '4 IPs allowed · 0.0.0.0/0 disabled', on: false },
                                    { l: 'Device approval', s: 'Require admin approval for new devices', on: false },
                                ].map(t => (
                                    <div key={t.l} className="flex items-center justify-between p-4 rounded-xl"
                                        style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid var(--sc-border)' }}>
                                        <div>
                                            <div style={{ fontSize: 13, fontWeight: 500 }}>{t.l}</div>
                                            <div style={{ fontSize: 11, color: 'var(--sc-text-faint)', marginTop: 2 }}>{t.s}</div>
                                        </div>
                                        <div className="relative w-11 h-6 rounded-full transition" style={{ background: t.on ? 'var(--sc-accent)' : 'rgba(255,255,255,0.1)' }}>
                                            <div className="absolute top-0.5 w-5 h-5 rounded-full transition" style={{ background: '#0a0a0f', left: t.on ? '22px' : '2px' }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {active === 'notifications' && (
                        <motion.div className="sc-card p-7" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <div className="sc-sans" style={{ fontSize: 18, fontWeight: 600 }}>Notifications</div>
                            <table className="sc-table mt-6">
                                <thead><tr><th>EVENT</th><th>EMAIL</th><th>IN-APP</th><th>SLACK</th><th>SMS</th></tr></thead>
                                <tbody>
                                    {[
                                        'New deal closed', 'Invoice overdue', 'Customer churn alert', 'Stock low', 'Security incident', 'Weekly digest',
                                    ].map((e, i) => (
                                        <tr key={e}>
                                            <td>{e}</td>
                                            {[true, true, i % 2 === 0, i === 4].map((on, j) => (
                                                <td key={j}>
                                                    <div className="relative w-8 h-4 rounded-full" style={{ background: on ? 'var(--sc-accent)' : 'rgba(255,255,255,0.1)' }}>
                                                        <div className="absolute top-0.5 w-3 h-3 rounded-full" style={{ background: '#0a0a0f', left: on ? '17px' : '2px' }} />
                                                    </div>
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </motion.div>
                    )}

                    {active === 'integrations' && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { n: 'Slack', d: 'Sync alerts to your team channels', c: '#7a5cff', on: true },
                                { n: 'Stripe', d: 'Payment & invoice automation', c: '#6affe0', on: true },
                                { n: 'GitHub', d: 'Link issues to deployments', c: '#b6ff3c', on: true },
                                { n: 'Linear', d: 'Two-way task sync', c: '#ff6bcb', on: false },
                                { n: 'Salesforce', d: 'Bring your CRM into orbit', c: '#ffb547', on: false },
                                { n: 'HubSpot', d: 'Marketing & CRM sync', c: '#ff5e7e', on: false },
                            ].map(i => (
                                <div key={i.n} className="sc-card p-5">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="w-10 h-10 rounded-xl" style={{ background: `${i.c}22`, border: `1px solid ${i.c}40` }} />
                                        {i.on ? <span className="sc-chip sc-chip-success">Connected</span> : <button className="sc-btn" style={{ padding: '4px 12px', fontSize: 11 }}>Connect</button>}
                                    </div>
                                    <div className="sc-sans" style={{ fontSize: 14, fontWeight: 600 }}>{i.n}</div>
                                    <div style={{ fontSize: 12, color: 'var(--sc-text-dim)', marginTop: 4 }}>{i.d}</div>
                                </div>
                            ))}
                        </motion.div>
                    )}

                    {active === 'billing' && (
                        <motion.div className="sc-card p-7" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="sc-sans" style={{ fontSize: 18, fontWeight: 600 }}>Current plan</div>
                                    <div style={{ fontSize: 12, color: 'var(--sc-text-faint)', marginTop: 4 }}>Renews on Jan 12, 2027 · 248 seats</div>
                                </div>
                                <button className="sc-btn sc-btn-primary">Manage plan</button>
                            </div>
                            <div className="rounded-2xl p-6 mt-6 relative overflow-hidden"
                                style={{ background: 'linear-gradient(135deg, rgba(182,255,60,0.12), rgba(106,255,224,0.04))', border: '1px solid var(--sc-border)' }}>
                                <span className="sc-chip sc-chip-accent">ENTERPRISE</span>
                                <div className="sc-display mt-3" style={{ fontSize: 48 }}>$4,800<span style={{ fontSize: 16, color: 'var(--sc-text-dim)' }}>/mo</span></div>
                                <div className="grid grid-cols-3 gap-4 mt-6" style={{ fontSize: 12 }}>
                                    <div><div style={{ color: 'var(--sc-text-faint)' }}>Seats used</div><div className="mt-1">248 / 500</div></div>
                                    <div><div style={{ color: 'var(--sc-text-faint)' }}>API calls</div><div className="mt-1">8.4M / 50M</div></div>
                                    <div><div style={{ color: 'var(--sc-text-faint)' }}>Storage</div><div className="mt-1">128 GB / 1 TB</div></div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {(active === 'localization' || active === 'webhooks') && (
                        <motion.div className="sc-card p-12 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <div className="sc-display" style={{ fontSize: 28 }}>{active === 'localization' ? 'Localization' : 'Webhooks'}</div>
                            <p style={{ color: 'var(--sc-text-dim)', fontSize: 13, marginTop: 8 }}>Configure {active} preferences for your workspace.</p>
                            <button className="sc-btn sc-btn-primary mt-6 mx-auto">Configure</button>
                        </motion.div>
                    )}
                </div>
            </div>
        </DashboardShell>
    );
}
