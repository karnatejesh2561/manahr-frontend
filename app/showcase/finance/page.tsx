'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Download, Plus, TrendingUp, DollarSign, Receipt, Wallet, ArrowDownRight, ArrowUpRight, Filter } from 'lucide-react';
import DashboardShell from '@/components/showcase/DashboardShell';
import { AreaChart, DonutChart, MultiLineChart, AnimatedNumber } from '@/components/showcase/Charts';
import { Drawer, ConfirmDialog, Field, FilterPanel, FilterChip, RowMenu, useToast } from '@/components/showcase/Interactions';

type Invoice = { id: string; c: string; a: number; s: 'paid' | 'pending' | 'overdue' | 'sent'; due: string };

const colorFor = (s: Invoice['s']) =>
  s === 'paid' ? '#5cf2a3' : s === 'pending' ? '#ffb547' : s === 'overdue' ? '#ff5e7e' : '#6affe0';

const initial: Invoice[] = [
  { id: 'INV-2841', c: 'Globex Corp',         a:  12400, s: 'paid',    due: 'Dec 02' },
  { id: 'INV-2840', c: 'Northwind Traders',   a:  84000, s: 'pending', due: 'Dec 18' },
  { id: 'INV-2839', c: 'Acme Robotics',       a:  28500, s: 'overdue', due: 'Nov 28' },
  { id: 'INV-2838', c: 'Initech',             a:   4200, s: 'paid',    due: 'Dec 05' },
  { id: 'INV-2837', c: 'Vandelay Inc.',       a:  36500, s: 'sent',    due: 'Dec 22' },
  { id: 'INV-2836', c: 'Stark Industries',    a: 148000, s: 'paid',    due: 'Dec 01' },
];

const statuses: Invoice['s'][] = ['paid', 'pending', 'sent', 'overdue'];

let serial = 2842;
const newId = () => 'INV-' + (serial++);
const blank = () => ({ c: '', a: 0, s: 'sent' as Invoice['s'], due: '' });

export default function FinancePage() {
  const [list, setList] = React.useState<Invoice[]>(initial);
  const [filterOpen, setFilterOpen] = React.useState(false);
  const [statusFilters, setStatusFilters] = React.useState<Invoice['s'][]>([]);

  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<Invoice | null>(null);
  const [form, setForm] = React.useState(blank());
  const [confirmDel, setConfirmDel] = React.useState<Invoice | null>(null);
  const { push } = useToast();

  const filtered = list.filter(inv => statusFilters.length === 0 || statusFilters.includes(inv.s));

  const totalsByStatus = (s: Invoice['s']) => list.filter(x => x.s === s).reduce((acc, x) => acc + x.a, 0);

  const openCreate = () => { setEditing(null); setForm(blank()); setDrawerOpen(true); };
  const openEdit = (inv: Invoice) => {
    setEditing(inv);
    setForm({ c: inv.c, a: inv.a, s: inv.s, due: inv.due });
    setDrawerOpen(true);
  };
  const submit = () => {
    if (!form.c.trim()) { push('Client name required', 'danger'); return; }
    if (form.a <= 0) { push('Amount must be > 0', 'danger'); return; }
    if (editing) {
      setList(p => p.map(x => x.id === editing.id ? { ...editing, ...form } : x));
      push(`Updated · ${editing.id}`);
    } else {
      const id = newId();
      setList(p => [{ id, ...form }, ...p]);
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
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { l: 'Revenue (MTD)', v: 1284902, p: '$', d: '+24%', up: true, c: '#b6ff3c', i: DollarSign },
          { l: 'Expenses', v: 482410, p: '$', d: '+8%', up: false, c: '#ff6bcb', i: Receipt },
          { l: 'Net profit', v: 802492, p: '$', d: '+38%', up: true, c: '#6affe0', i: TrendingUp },
          { l: 'Cash on hand', v: 8420180, p: '$', d: 'runway 18mo', up: true, c: '#ffb547', i: Wallet },
        ].map((k, i) => {
          const I = k.i;
          return (
            <motion.div key={k.l} className="sc-card p-5"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <div className="flex justify-between"><I size={16} style={{ color: k.c }} /><span className={`sc-chip ${k.up ? 'sc-chip-success' : 'sc-chip-danger'}`} style={{ fontSize: 10 }}>{k.d}</span></div>
              <div style={{ fontSize: 11, color: 'var(--sc-text-faint)', marginTop: 14 }}>{k.l.toUpperCase()}</div>
              <div className="sc-stat-value mt-1" style={{ color: k.c }}><AnimatedNumber value={k.v} prefix={k.p} /></div>
            </motion.div>
          );
        })}
      </div>

      <FilterPanel open={filterOpen}>
        <span style={{ fontSize: 11, color: 'var(--sc-text-faint)' }}>INVOICE STATUS</span>
        {statuses.map(s => (
          <FilterChip key={s} active={statusFilters.includes(s)}
            onClick={() => setStatusFilters(p => p.includes(s) ? p.filter(x => x !== s) : [...p, s])}
            testid={`filter-status-${s}`}>{s}</FilterChip>
        ))}
        {statusFilters.length > 0 && (
          <button onClick={() => setStatusFilters([])} className="sc-btn sc-btn-ghost ml-auto"
                  style={{ padding: '6px 12px', fontSize: 11 }}>Clear filters</button>
        )}
      </FilterPanel>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">
        <motion.div className="sc-card p-6 xl:col-span-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="sc-sans" style={{ fontSize: 14, fontWeight: 600 }}>P&L · monthly</div>
              <div style={{ fontSize: 11, color: 'var(--sc-text-faint)', marginTop: 4 }}>Revenue vs expenses · 12 months</div>
            </div>
            <span className="sc-chip sc-chip-success">Margin 62.4%</span>
          </div>
          <MultiLineChart height={280} labels={['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']} series={[
            { name: 'Revenue', color: '#b6ff3c', data: [620, 700, 680, 820, 880, 920, 1080, 1150, 1240, 1320, 1380, 1450] },
            { name: 'Expenses', color: '#ff6bcb', data: [320, 340, 360, 380, 400, 420, 440, 460, 470, 480, 490, 500] },
            { name: 'Profit', color: '#6affe0', data: [300, 360, 320, 440, 480, 500, 640, 690, 770, 840, 890, 950] },
          ]} />
        </motion.div>

        <motion.div className="sc-card p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          <div className="sc-sans mb-4" style={{ fontSize: 14, fontWeight: 600 }}>Expenses by category</div>
          <DonutChart size={200} thickness={20} centerLabel="$482k" centerSubLabel="THIS MONTH" segments={[
            { label: 'Salaries', value: 52, color: '#b6ff3c' },
            { label: 'Cloud', value: 18, color: '#6affe0' },
            { label: 'Marketing', value: 12, color: '#ff6bcb' },
            { label: 'Office', value: 8, color: '#7a5cff' },
            { label: 'Other', value: 10, color: '#ffb547' },
          ]} />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-6">
        <motion.div className="sc-card p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="flex justify-between items-start mb-4">
            <div className="sc-sans" style={{ fontSize: 14, fontWeight: 600 }}>Invoices ({filtered.length})</div>
            <div className="flex gap-2 flex-wrap">
              {statuses.map(s => (
                <span key={s} className="sc-chip" style={{ fontSize: 10, color: colorFor(s), borderColor: `${colorFor(s)}40`, background: `${colorFor(s)}10` }}>
                  {s} · ${(totalsByStatus(s)/1000).toFixed(1)}k
                </span>
              ))}
            </div>
          </div>
          <table className="sc-table">
            <thead><tr><th>INVOICE</th><th>CLIENT</th><th>AMOUNT</th><th>DUE</th><th>STATUS</th><th></th></tr></thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} data-testid={`invoice-row-${r.id}`}>
                  <td style={{ fontFamily: 'monospace', color: 'var(--sc-accent)' }}>{r.id}</td>
                  <td>{r.c}</td>
                  <td style={{ fontFamily: 'monospace' }}>${r.a.toLocaleString()}</td>
                  <td style={{ color: 'var(--sc-text-dim)' }}>{r.due}</td>
                  <td><span className="sc-chip" style={{ color: colorFor(r.s), borderColor: `${colorFor(r.s)}40`, background: `${colorFor(r.s)}15` }}>{r.s}</span></td>
                  <td>
                    <RowMenu items={[
                      { label: 'Edit', onClick: () => openEdit(r) },
                      ...(r.s !== 'paid' ? [{ label: 'Mark as paid', onClick: () => markPaid(r) }] : []),
                      { label: 'Send reminder', onClick: () => push(`Reminder sent · ${r.c}`, 'info') },
                      { label: 'Void invoice', onClick: () => setConfirmDel(r), danger: true },
                    ]} />
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} style={{ textAlign: 'center', padding: 32, color: 'var(--sc-text-faint)' }}>
                  No invoices match.
                </td></tr>
              )}
            </tbody>
          </table>
        </motion.div>

        <motion.div className="sc-card p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          <div className="sc-sans mb-4" style={{ fontSize: 14, fontWeight: 600 }}>Cash flow forecast</div>
          <AreaChart height={200} color="#b6ff3c" color2="#6affe0"
            labels={['W1','W2','W3','W4','W5','W6','W7','W8']}
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

      <motion.div className="sc-card p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="flex justify-between items-start mb-5">
          <div>
            <div className="sc-sans" style={{ fontSize: 14, fontWeight: 600 }}>Tax & compliance</div>
            <div style={{ fontSize: 11, color: 'var(--sc-text-faint)', marginTop: 4 }}>Q4 2026 estimated liability</div>
          </div>
          <span className="sc-chip sc-chip-warning">Filing in 14 days</span>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { l: 'Corporate tax', v: '$124,800', c: '#b6ff3c' },
            { l: 'VAT/GST', v: '$48,200', c: '#6affe0' },
            { l: 'Payroll tax', v: '$62,400', c: '#ff6bcb' },
            { l: 'Total liability', v: '$235,400', c: '#ffb547' },
          ].map(t => (
            <div key={t.l} className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--sc-border)' }}>
              <div style={{ fontSize: 10, color: 'var(--sc-text-faint)' }}>{t.l.toUpperCase()}</div>
              <div className="sc-display mt-2" style={{ fontSize: 28, color: t.c }}>{t.v}</div>
            </div>
          ))}
        </div>
      </motion.div>

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={editing ? 'Edit invoice' : 'New invoice'}
        subtitle={editing ? `${editing.id}` : 'Create and send an invoice to a client'}
        footer={
          <>
            <button className="sc-btn sc-btn-ghost" onClick={() => setDrawerOpen(false)}>Cancel</button>
            <button className="sc-btn sc-btn-primary" onClick={submit} data-testid="drawer-submit">
              {editing ? 'Save changes' : 'Create & send'}
            </button>
          </>
        }
      >
        <div className="grid grid-cols-2 gap-4">
          <Field label="Client" span={2}>
            <input className="sc-input" value={form.c} onChange={(e) => setForm({ ...form, c: e.target.value })}
                   placeholder="e.g. Globex Corp" data-testid="invoice-client" autoFocus />
          </Field>
          <Field label="Amount (USD)">
            <input type="number" className="sc-input" value={form.a}
                   onChange={(e) => setForm({ ...form, a: Number(e.target.value) || 0 })}
                   data-testid="invoice-amount" />
          </Field>
          <Field label="Status">
            <select className="sc-input" value={form.s} onChange={(e) => setForm({ ...form, s: e.target.value as Invoice['s'] })}>
              {statuses.map(s => <option key={s}>{s}</option>)}
            </select>
          </Field>
          <Field label="Due date" span={2}>
            <input className="sc-input" value={form.due} onChange={(e) => setForm({ ...form, due: e.target.value })}
                   placeholder="e.g. Dec 24" data-testid="invoice-due" />
          </Field>
        </div>
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
