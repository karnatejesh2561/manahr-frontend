'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Download, Plus, TrendingUp, TrendingDown, DollarSign, Receipt, Wallet, ArrowDownRight, ArrowUpRight, FileText } from 'lucide-react';
import DashboardShell from '@/components/showcase/DashboardShell';
import { AreaChart, BarChart, DonutChart, MultiLineChart, AnimatedNumber, Sparkline } from '@/components/showcase/Charts';

export default function FinancePage() {
  return (
    <DashboardShell
      title="Finance command"
      subtitle="P&L, cash flow, invoices and tax — all live, all reconciled."
      breadcrumb={['Workspace', 'Finance']}
      actions={
        <>
          <button className="sc-btn"><Download size={13} />Export P&L</button>
          <button className="sc-btn sc-btn-primary"><Plus size={13} />New invoice</button>
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

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">
        <motion.div className="sc-card p-6 xl:col-span-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
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

        <motion.div className="sc-card p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
          <div className="sc-sans mb-4" style={{ fontSize: 14, fontWeight: 600 }}>Expenses by category</div>
          <DonutChart size={200} thickness={20} centerLabel="$482k" centerSubLabel="THIS MONTH" segments={[
            { label: 'Salaries', value: 52, color: '#b6ff3c' },
            { label: 'Cloud', value: 18, color: '#6affe0' },
            { label: 'Marketing', value: 12, color: '#ff6bcb' },
            { label: 'Office', value: 8, color: '#7a5cff' },
            { label: 'Other', value: 10, color: '#ffb547' },
          ]} />
          <div className="space-y-2 mt-4 text-xs">
            {[
              {l:'Salaries',v:'$250k',c:'#b6ff3c'},
              {l:'Cloud & infra',v:'$87k',c:'#6affe0'},
              {l:'Marketing',v:'$58k',c:'#ff6bcb'},
              {l:'Office',v:'$38k',c:'#7a5cff'},
              {l:'Other',v:'$49k',c:'#ffb547'},
            ].map(r => (
              <div key={r.l} className="flex items-center justify-between">
                <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full" style={{ background: r.c }} />{r.l}</span>
                <span style={{ fontFamily: 'monospace' }}>{r.v}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Invoices + Cashflow */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-6">
        <motion.div className="sc-card p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}>
          <div className="flex justify-between items-start mb-4">
            <div className="sc-sans" style={{ fontSize: 14, fontWeight: 600 }}>Recent invoices</div>
            <button className="sc-btn sc-btn-ghost" style={{ padding: '4px 10px', fontSize: 11 }}>View all</button>
          </div>
          <table className="sc-table">
            <thead><tr><th>INVOICE</th><th>CLIENT</th><th>AMOUNT</th><th>STATUS</th></tr></thead>
            <tbody>
              {[
                { id: 'INV-2841', c: 'Globex Corp', a: '$12,400', s: 'paid', cl: '#5cf2a3' },
                { id: 'INV-2840', c: 'Northwind Traders', a: '$84,000', s: 'pending', cl: '#ffb547' },
                { id: 'INV-2839', c: 'Acme Robotics', a: '$28,500', s: 'overdue', cl: '#ff5e7e' },
                { id: 'INV-2838', c: 'Initech', a: '$4,200', s: 'paid', cl: '#5cf2a3' },
                { id: 'INV-2837', c: 'Vandelay Inc.', a: '$36,500', s: 'sent', cl: '#6affe0' },
                { id: 'INV-2836', c: 'Stark Industries', a: '$148,000', s: 'paid', cl: '#5cf2a3' },
              ].map((r) => (
                <tr key={r.id}>
                  <td style={{ fontFamily: 'monospace', color: 'var(--sc-accent)' }}>{r.id}</td>
                  <td>{r.c}</td>
                  <td style={{ fontFamily: 'monospace' }}>{r.a}</td>
                  <td><span className="sc-chip" style={{ color: r.cl, borderColor: `${r.cl}40`, background: `${r.cl}15` }}>{r.s}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <motion.div className="sc-card p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
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

      {/* Tax summary */}
      <motion.div className="sc-card p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
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
    </DashboardShell>
  );
}
