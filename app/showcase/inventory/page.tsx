'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Plus, AlertTriangle, Package, Truck, Warehouse, Boxes } from 'lucide-react';
import DashboardShell from '@/components/showcase/DashboardShell';
import { BarChart, AreaChart, DonutChart, AnimatedNumber, Sparkline } from '@/components/showcase/Charts';

export default function InventoryPage() {
  return (
    <DashboardShell
      title="Inventory & supply"
      subtitle="Live stock, vendors, warehouses and purchase orders — across 6 sites."
      breadcrumb={['Workspace', 'Operations', 'Inventory']}
      actions={
        <>
          <button className="sc-btn"><Truck size={13} />New PO</button>
          <button className="sc-btn sc-btn-primary"><Plus size={13} />Add product</button>
        </>
      }
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { l: 'SKUs', v: 4824, c: '#b6ff3c', i: Boxes, d: '+184' },
          { l: 'In stock', v: 1284902, prefix: '$', c: '#6affe0', i: Package, d: '+12%' },
          { l: 'Low stock alerts', v: 38, c: '#ff5e7e', i: AlertTriangle, d: 'critical' },
          { l: 'Open POs', v: 24, c: '#ffb547', i: Truck, d: '$284k' },
        ].map((k, i) => {
          const I = k.i;
          return (
            <motion.div key={k.l} className="sc-card p-5"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <div className="flex justify-between"><I size={16} style={{ color: k.c }} /><span className="sc-chip" style={{ fontSize: 10, color: k.c, borderColor: `${k.c}40`, background: `${k.c}15` }}>{k.d}</span></div>
              <div style={{ fontSize: 11, color: 'var(--sc-text-faint)', marginTop: 14 }}>{k.l.toUpperCase()}</div>
              <div className="sc-stat-value mt-1"><AnimatedNumber value={k.v} prefix={k.prefix} /></div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">
        <motion.div className="sc-card p-6 xl:col-span-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="sc-sans" style={{ fontSize: 14, fontWeight: 600 }}>Stock movement</div>
              <div style={{ fontSize: 11, color: 'var(--sc-text-faint)', marginTop: 4 }}>Inflow vs outflow · 30 days</div>
            </div>
            <div className="sc-tabs"><div className="sc-tab active">Units</div><div className="sc-tab">Value</div></div>
          </div>
          <BarChart height={240} color="#ffb547"
            labels={['W1','W2','W3','W4','W5','W6','W7','W8','W9','W10','W11','W12']}
            data={[820, 940, 1120, 980, 1240, 1480, 1340, 1620, 1480, 1740, 1880, 2120]} />
        </motion.div>

        <motion.div className="sc-card p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
          <div className="sc-sans mb-4" style={{ fontSize: 14, fontWeight: 600 }}>Warehouse fill rate</div>
          <div className="space-y-4">
            {[
              { w: 'Tokyo · A', f: 84, c: '#b6ff3c' },
              { w: 'Osaka · B', f: 62, c: '#6affe0' },
              { w: 'Seoul · C', f: 94, c: '#ff5e7e' },
              { w: 'Singapore · D', f: 48, c: '#7a5cff' },
              { w: 'Mumbai · E', f: 72, c: '#ffb547' },
              { w: 'Berlin · F', f: 38, c: '#ff6bcb' },
            ].map((w, i) => (
              <div key={w.w}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="flex items-center gap-2"><Warehouse size={11} style={{ color: 'var(--sc-text-faint)' }} />{w.w}</span>
                  <span style={{ fontFamily: 'monospace', color: w.c }}>{w.f}%</span>
                </div>
                <div className="sc-progress"><motion.div className="sc-progress-bar" style={{ background: w.c, boxShadow: `0 0 8px ${w.c}` }} initial={{ width: 0 }} animate={{ width: `${w.f}%` }} transition={{ delay: i * 0.05, duration: 1 }} /></div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Top products + Low stock */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-6">
        <motion.div className="sc-card p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}>
          <div className="sc-sans mb-4" style={{ fontSize: 14, fontWeight: 600 }}>Top moving products</div>
          <table className="sc-table">
            <thead><tr><th>SKU</th><th>NAME</th><th>STOCK</th><th>SOLD</th><th>TREND</th></tr></thead>
            <tbody>
              {[
                { sku: 'TX-441', n: 'Titanium drill bit · 6mm', stock: 1284, sold: 482, s: [20,28,34,42,48,54,58] },
                { sku: 'KP-209', n: 'Steel mounting bracket', stock: 842, sold: 384, s: [30,32,28,34,38,42,48] },
                { sku: 'AR-118', n: 'Carbon fiber housing', stock: 412, sold: 218, s: [10,16,22,28,32,38,44] },
                { sku: 'MX-732', n: 'Servo motor 12V', stock: 162, sold: 142, s: [40,38,42,46,50,54,58] },
                { sku: 'RB-051', n: 'Rubber gasket pack ·20', stock: 38, sold: 98, s: [50,48,42,38,32,24,18] },
              ].map(r => (
                <tr key={r.sku}>
                  <td style={{ fontFamily: 'monospace', color: 'var(--sc-accent)' }}>{r.sku}</td>
                  <td>{r.n}</td>
                  <td><span className={`sc-chip ${r.stock < 100 ? 'sc-chip-danger' : 'sc-chip-success'}`}>{r.stock}</span></td>
                  <td style={{ color: 'var(--sc-text-dim)' }}>{r.sold}</td>
                  <td style={{ width: 100 }}><Sparkline data={r.s} color="#ffb547" height={22} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <motion.div className="sc-card p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <div className="flex items-center justify-between mb-4">
            <div className="sc-sans" style={{ fontSize: 14, fontWeight: 600 }}>Critical low-stock</div>
            <span className="sc-chip sc-chip-danger">38 items</span>
          </div>
          <div className="space-y-3">
            {[
              { sku: 'RB-051', n: 'Rubber gasket pack', s: 38, r: 200, c: '#ff5e7e' },
              { sku: 'CH-882', n: 'Charging coil 5W', s: 24, r: 150, c: '#ff5e7e' },
              { sku: 'LD-318', n: 'LED strip · 5m', s: 48, r: 200, c: '#ffb547' },
              { sku: 'BO-114', n: 'Bolt pack · M4', s: 12, r: 100, c: '#ff5e7e' },
              { sku: 'PL-927', n: 'Polymer sheet', s: 88, r: 200, c: '#ffb547' },
            ].map((p, i) => (
              <motion.div key={p.sku} className="flex items-center gap-3 p-3 rounded-xl"
                style={{ background: `${p.c}10`, border: `1px solid ${p.c}30` }}
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                <AlertTriangle size={14} style={{ color: p.c }} />
                <div className="flex-1">
                  <div style={{ fontSize: 12, fontWeight: 500 }}>{p.n}</div>
                  <div style={{ fontSize: 10, color: 'var(--sc-text-faint)' }}>{p.sku} · re-order at {p.r}</div>
                </div>
                <div style={{ fontSize: 13, color: p.c, fontFamily: 'monospace' }}>{p.s} left</div>
                <button className="sc-btn" style={{ padding: '4px 10px', fontSize: 11 }}>Re-order</button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Vendors + Categories */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <motion.div className="sc-card p-6 xl:col-span-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          <div className="sc-sans mb-4" style={{ fontSize: 14, fontWeight: 600 }}>Vendor performance</div>
          <table className="sc-table">
            <thead><tr><th>VENDOR</th><th>ON-TIME</th><th>QUALITY</th><th>SPEND (Q4)</th><th>STATUS</th></tr></thead>
            <tbody>
              {[
                { v: 'Mitsubishi Heavy', ot: 98, q: 96, s: '$248k', st: 'preferred', c: '#b6ff3c' },
                { v: 'Sumitomo Steel', ot: 92, q: 94, s: '$184k', st: 'preferred', c: '#b6ff3c' },
                { v: 'Tata Industries', ot: 86, q: 88, s: '$142k', st: 'active', c: '#6affe0' },
                { v: 'BASF Polymers', ot: 78, q: 92, s: '$96k', st: 'active', c: '#6affe0' },
                { v: 'GenCo Electronics', ot: 62, q: 78, s: '$48k', st: 'review', c: '#ffb547' },
              ].map((v) => (
                <tr key={v.v}>
                  <td>{v.v}</td>
                  <td><span style={{ fontFamily: 'monospace', color: v.ot > 90 ? 'var(--sc-success)' : v.ot > 75 ? 'var(--sc-accent-5)' : 'var(--sc-danger)' }}>{v.ot}%</span></td>
                  <td><span style={{ fontFamily: 'monospace' }}>{v.q}%</span></td>
                  <td>{v.s}</td>
                  <td><span className="sc-chip" style={{ color: v.c, borderColor: `${v.c}40`, background: `${v.c}15` }}>{v.st}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <motion.div className="sc-card p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}>
          <div className="sc-sans mb-4" style={{ fontSize: 14, fontWeight: 600 }}>By category</div>
          <DonutChart size={180} thickness={18} centerLabel="4.8k" centerSubLabel="SKUs" segments={[
            { label: 'Hardware', value: 38, color: '#b6ff3c' },
            { label: 'Electronics', value: 26, color: '#6affe0' },
            { label: 'Polymers', value: 18, color: '#ff6bcb' },
            { label: 'Tools', value: 12, color: '#7a5cff' },
            { label: 'Other', value: 6, color: '#ffb547' },
          ]} />
        </motion.div>
      </div>
    </DashboardShell>
  );
}
