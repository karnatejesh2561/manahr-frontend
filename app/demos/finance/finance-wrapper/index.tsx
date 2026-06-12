'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Download, Plus, DollarSign, Receipt, Wallet, ArrowDownRight, ArrowUpRight, Filter } from 'lucide-react';
import DashboardShell from '@/components/demos/DashboardShell';
import { AreaChart, DonutChart, MultiLineChart, AnimatedNumber } from '@/components/demos/Charts';
import { Drawer, ConfirmDialog, FilterPanel, FilterChip, RowMenu, useToast } from '@/components/demos/Interactions';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { invoiceSchema } from '@/components/demos/schemas';
import { ScInput, ScSelect } from '@/components/demos/FormFields';

type Invoice = { id: string; c: string; a: number; s: 'paid' | 'pending' | 'overdue' | 'sent'; due: string };

const colorFor = (s: Invoice['s']) =>
    s === 'paid' ? '#5cf2a3' : s === 'pending' ? '#ffb547' : s === 'overdue' ? '#ff5e7e' : '#6affe0';

const initial: Invoice[] = [
    { id: 'INV-2841', c: 'Globex Corp', a: 12400, s: 'paid', due: 'Dec 02' },
    { id: 'INV-2840', c: 'Northwind Traders', a: 84000, s: 'pending', due: 'Dec 18' },
    { id: 'INV-2839', c: 'Acme Robotics', a: 28500, s: 'overdue', due: 'Nov 28' },
    { id: 'INV-2838', c: 'Initech', a: 4200, s: 'paid', due: 'Dec 05' },
    { id: 'INV-2837', c: 'Vandelay Inc.', a: 36500, s: 'sent', due: 'Dec 22' },
    { id: 'INV-2836', c: 'Stark Industries', a: 148000, s: 'paid', due: 'Dec 01' },
];

const statuses: Invoice['s'][] = ['paid', 'pending', 'sent', 'overdue'];

let serial = 2842;
const newId = () => 'INV-' + (serial++);
const blank = () => ({ c: '', a: 0, s: 'sent' as Invoice['s'], due: '' });

export default function FinanceWrapper() {
    const [list, setList] = React.useState<Invoice[]>(initial);
    const [filterOpen, setFilterOpen] = React.useState(false);
    const [statusFilters, setStatusFilters] = React.useState<Invoice['s'][]>([]);

    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [editing, setEditing] = React.useState<Invoice | null>(null);

    const { register, handleSubmit, control, reset, formState: { errors } } = useForm({
        resolver: zodResolver(invoiceSchema),
        defaultValues: blank()
    });

    const [confirmDel, setConfirmDel] = React.useState<Invoice | null>(null);
    const { push } = useToast();

    const filtered = list.filter(inv => statusFilters.length === 0 || statusFilters.includes(inv.s));

    const totalsByStatus = (s: Invoice['s']) => list.filter(x => x.s === s).reduce((acc, x) => acc + x.a, 0);

    const openCreate = () => {
        setEditing(null);
        reset(blank());
        setDrawerOpen(true);
    };
    const openEdit = (inv: Invoice) => {
        setEditing(inv);
        reset({ c: inv.c, a: inv.a, s: inv.s, due: inv.due });
        setDrawerOpen(true);
    };
    const onSubmit = (data: any) => {
        if (editing) {
            setList(p => p.map(x => x.id === editing.id ? { ...editing, ...data } : x));
            push(`Updated · ${editing.id}`);
        } else {
            const id = newId();
            setList(p => [{ id, ...data }, ...p]);
            push(`Invoice created · ${id}`);
        }
        setDrawerOpen(false);
    };
    const markPaid = (inv: Invoice) => {
        setList(p => p.map(x => x.id === inv.id ? { ...x, s: 'paid' } : x));
        push(`${inv.id} marked paid`);
    };
    const remove = (inv: Invoice) => { setList(p => p.filter(x => x.id !== inv.id)); push(`Voided · ${inv.id}`, 'info'); };

    const exportPL = () => push('P&L export queued · check downloads in a moment', 'info');

    return (
        <DashboardShell
            title="Finance command"
            subtitle="P&L, cash flow, invoices and tax — all live, all reconciled."
            breadcrumb={['Workspace', 'Finance']}
            actions={
                <>
                    <button className="sc-btn" onClick={() => setFilterOpen(!filterOpen)} data-testid="open-filters">
                        <Filter size={13} />Filter{statusFilters.length > 0 && <span className="sc-chip sc-chip-accent" style={{ padding: '1px 6px', fontSize: 10 }}>{statusFilters.length}</span>}
                    </button>
                    <button className="sc-btn" onClick={exportPL} data-testid="export-pl"><Download size={13} />Export P&L</button>
                    <button className="sc-btn sc-btn-primary" onClick={openCreate} data-testid="new-invoice"><Plus size={13} />New invoice</button>
                </>
            }
        >
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
                {[
                    { l: 'Revenue run rate', v: totalsByStatus('paid') + totalsByStatus('pending'), p: '$', s: 'Paid + pending' },
                    { l: 'Outstanding', v: totalsByStatus('pending') + totalsByStatus('overdue'), p: '$', s: 'Awaiting client pay' },
                    { l: 'Total paid', v: totalsByStatus('paid'), p: '$', s: 'Settled this quarter' },
                    { l: 'Overdue liability', v: totalsByStatus('overdue'), p: '$', s: 'Require collections' },
                ].map((k, i) => (
                    <motion.div key={k.l} className="sc-card p-5"
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                        <div style={{ fontSize: 11, color: 'var(--sc-text-faint)' }}>{k.l.toUpperCase()}</div>
                        <div className="sc-stat-value mt-3" style={{ color: 'var(--sc-text)' }}>
                            <AnimatedNumber value={k.v} prefix={k.p} />
                        </div>
                        <div style={{ fontSize: 10, color: 'var(--sc-text-dim)', marginTop: 8 }}>{k.s}</div>
                    </motion.div>
                ))}
            </div>

            <FilterPanel open={filterOpen}>
                <span style={{ fontSize: 11, color: 'var(--sc-text-faint)' }}>STATUS</span>
                {statuses.map(s => (
                    <FilterChip key={s} active={statusFilters.includes(s)}
                        onClick={() => setStatusFilters(p => p.includes(s) ? p.filter(x => x !== s) : [...p, s])}>
                        {s}
                    </FilterChip>
                ))}
                {statusFilters.length > 0 && (
                    <button onClick={() => setStatusFilters([])} className="sc-btn sc-btn-ghost ml-auto" style={{ padding: '6px 12px', fontSize: 11 }}>
                        Clear filters
                    </button>
                )}
            </FilterPanel>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">
                <motion.div className="sc-card p-6 xl:col-span-2 overflow-x-auto sc-scroll"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                    <div className="sc-sans mb-4" style={{ fontSize: 14, fontWeight: 600 }}>Invoices</div>
                    <table className="sc-table">
                        <thead><tr><th>INVOICE</th><th>CLIENT</th><th>AMOUNT</th><th>STATUS</th><th>DUE</th><th></th></tr></thead>
                        <tbody>
                            {filtered.map(inv => (
                                <tr key={inv.id} data-testid={`invoice-row-${inv.id}`}>
                                    <td>{inv.id}</td>
                                    <td>{inv.c}</td>
                                    <td style={{ fontFamily: 'monospace', color: 'var(--sc-text)' }}>${inv.a.toLocaleString()}</td>
                                    <td>
                                        <span className="sc-chip animate-pulse-subtle"
                                            style={{ color: colorFor(inv.s), borderColor: `${colorFor(inv.s)}33`, background: `${colorFor(inv.s)}11` }}>
                                            {inv.s}
                                        </span>
                                    </td>
                                    <td style={{ color: 'var(--sc-text-dim)' }}>{inv.due}</td>
                                    <td>
                                        <RowMenu items={[
                                            { label: 'Edit invoice', onClick: () => openEdit(inv) },
                                            { label: 'Mark as paid', onClick: () => markPaid(inv) },
                                            { label: 'Void / delete', onClick: () => setConfirmDel(inv), danger: true },
                                        ]} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </motion.div>

                <motion.div className="sc-card p-6 flex flex-col justify-between"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
                    <div className="sc-sans mb-2" style={{ fontSize: 14, fontWeight: 600 }}>Weekly cash flow</div>
                    <AreaChart height={600} color="#b6ff3c" color2="#6affe0"
                        labels={['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8']}
                        data={[8200, 8420, 8380, 8520, 8780, 8920, 9180, 9420]} />
                    <div className="grid grid-cols-2 gap-3 mt-4">
                        <div className="rounded-xl p-3" style={{ background: 'rgba(92,242,163,0.08)', border: '1px solid rgba(92,242,163,0.2)' }}>
                            <div className="flex items-center gap-1.5" style={{ fontSize: 10, color: 'var(--sc-success)' }}>
                                <ArrowUpRight size={11} />INFLOW
                            </div>
                            <div className="sc-display mt-1" style={{ fontSize: 22, color: 'var(--sc-success)' }}>$1.42M</div>
                        </div>
                        <div className="rounded-xl p-3" style={{ background: 'rgba(255,94,126,0.08)', border: '1px solid rgba(255,94,126,0.2)' }}>
                            <div className="flex items-center gap-1.5" style={{ fontSize: 10, color: 'var(--sc-danger)' }}>
                                <ArrowDownRight size={11} />OUTFLOW
                            </div>
                            <div className="sc-display mt-1" style={{ fontSize: 22, color: 'var(--sc-danger)' }}>$682k</div>
                        </div>
                    </div>
                </motion.div>
            </div>

            <Drawer
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                title={editing ? 'Edit invoice' : 'New invoice'}
                subtitle={editing ? `${editing.id}` : 'Create and send an invoice to a client'}
                footer={
                    <>
                        <button className="sc-btn sc-btn-ghost" onClick={() => setDrawerOpen(false)}>Cancel</button>
                        <button className="sc-btn sc-btn-primary" onClick={handleSubmit(onSubmit)} data-testid="drawer-submit">
                            {editing ? 'Save changes' : 'Create & send'}
                        </button>
                    </>
                }
            >
                <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit(onSubmit)}>
                    <ScInput
                        label="Client"
                        placeholder="e.g. Globex Corp"
                        data-testid="invoice-client"
                        wrapperClassName="col-span-2"
                        error={errors.c?.message as string}
                        {...register('c')}
                        autoFocus
                    />

                    <ScInput
                        label="Amount (USD)"
                        type="number"
                        data-testid="invoice-amount"
                        error={errors.a?.message as string}
                        {...register('a', { valueAsNumber: true })}
                    />

                    <Controller
                        name="s"
                        control={control}
                        render={({ field }) => (
                            <ScSelect
                                label="Status"
                                value={field.value}
                                onChange={field.onChange}
                                options={statuses.map(s => ({ label: s, value: s }))}
                                error={errors.s?.message as string}
                            />
                        )}
                    />

                    <ScInput
                        label="Due date"
                        placeholder="e.g. Dec 24"
                        data-testid="invoice-due"
                        wrapperClassName="col-span-2"
                        error={errors.due?.message as string}
                        {...register('due')}
                    />
                </form>
                <div className="mt-6 p-4 rounded-xl" style={{ background: 'rgba(182,255,60,0.04)', border: '1px solid rgba(182,255,60,0.15)' }}>
                    <div className="sc-sans" style={{ fontSize: 12, fontWeight: 600, color: 'var(--sc-accent)' }}>Line items</div>
                    <div style={{ fontSize: 11, color: 'var(--sc-text-dim)', marginTop: 4 }}>
                        Add product or service line items in a follow-up dialog. For demo purposes, the amount above is the total.
                    </div>
                </div>
            </Drawer>

            <ConfirmDialog
                open={!!confirmDel}
                onClose={() => setConfirmDel(null)}
                onConfirm={() => confirmDel && remove(confirmDel)}
                title="Void this invoice?"
                message={`This will void ${confirmDel?.id} for ${confirmDel?.c}. Funds will not be collectible.`}
                confirmLabel="Void invoice"
            />
        </DashboardShell>
    );
}
