'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Plus, AlertTriangle, Package, Truck, Warehouse, Boxes, Filter } from 'lucide-react';
import DashboardShell from '@/components/showcase/DashboardShell';
import { BarChart, DonutChart, AnimatedNumber, Sparkline } from '@/components/showcase/Charts';
import { Drawer, ConfirmDialog, Field, FilterPanel, FilterChip, RowMenu, useToast } from '@/components/showcase/Interactions';

type Product = { sku: string; n: string; stock: number; sold: number; reorder: number; cat: string; s: number[] };

const initialProducts: Product[] = [
  { sku: 'TX-441', n: 'Titanium drill bit · 6mm',    stock: 1284, sold: 482, reorder: 300, cat: 'Hardware',    s: [20,28,34,42,48,54,58] },
  { sku: 'KP-209', n: 'Steel mounting bracket',      stock:  842, sold: 384, reorder: 200, cat: 'Hardware',    s: [30,32,28,34,38,42,48] },
  { sku: 'AR-118', n: 'Carbon fiber housing',        stock:  412, sold: 218, reorder: 150, cat: 'Polymers',    s: [10,16,22,28,32,38,44] },
  { sku: 'MX-732', n: 'Servo motor 12V',             stock:  162, sold: 142, reorder: 100, cat: 'Electronics', s: [40,38,42,46,50,54,58] },
  { sku: 'RB-051', n: 'Rubber gasket pack · 20',     stock:   38, sold:  98, reorder: 200, cat: 'Polymers',    s: [50,48,42,38,32,24,18] },
  { sku: 'CH-882', n: 'Charging coil 5W',            stock:   24, sold:  62, reorder: 150, cat: 'Electronics', s: [30,28,24,20,16,12,8]  },
  { sku: 'LD-318', n: 'LED strip · 5m',              stock:   48, sold:  44, reorder: 200, cat: 'Electronics', s: [20,22,24,28,32,36,40] },
  { sku: 'BO-114', n: 'Bolt pack · M4',              stock:   12, sold: 184, reorder: 100, cat: 'Hardware',    s: [60,52,44,32,24,18,12] },
];

const categories = ['Hardware', 'Electronics', 'Polymers', 'Tools', 'Other'];
const blank = () => ({ sku: '', n: '', stock: 0, sold: 0, reorder: 100, cat: 'Hardware' as string });

export default function InventoryPage() {
  const [list, setList] = React.useState<Product[]>(initialProducts);
  const [filterOpen, setFilterOpen] = React.useState(false);
  const [catFilters, setCatFilters] = React.useState<string[]>([]);
  const [lowOnly, setLowOnly] = React.useState(false);

  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<Product | null>(null);
  const [form, setForm] = React.useState(blank());

  const [reorderTarget, setReorderTarget] = React.useState<Product | null>(null);
  const { push } = useToast();

  const filtered = list.filter(p => {
    if (catFilters.length && !catFilters.includes(p.cat)) return false;
    if (lowOnly && p.stock >= p.reorder) return false;
    return true;
  });

  const lowStock = filtered.filter(p => p.stock < p.reorder);
  const allLow = list.filter(p => p.stock < p.reorder);

  const openCreate = () => { setEditing(null); setForm(blank()); setDrawerOpen(true); };
  const openEdit = (p: Product) => {
    setEditing(p);
    setForm({ sku: p.sku, n: p.n, stock: p.stock, sold: p.sold, reorder: p.reorder, cat: p.cat });
    setDrawerOpen(true);
  };
  const submit = () => {
    if (!form.sku.trim()) { push('SKU required', 'danger'); return; }
    if (!form.n.trim()) { push('Product name required', 'danger'); return; }
    if (editing) {
      setList(prev => prev.map(x => x.sku === editing.sku ? { ...editing, ...form } : x));
      push(`Updated · ${form.sku}`);
    } else {
      setList(prev => [{ ...form, s: [0,0,0,0,0,0, form.stock / 5] }, ...prev]);
      push(`Product added · ${form.sku}`);
    }
    setDrawerOpen(false);
  };

  const reorder = (p: Product) => {
    const qty = Math.max(p.reorder * 2 - p.stock, 100);
    setList(prev => prev.map(x => x.sku === p.sku ? { ...x, stock: x.stock + qty } : x));
    push(`PO created · +${qty} units of ${p.sku}`);
  };

  const activeFilterCount = catFilters.length + (lowOnly ? 1 : 0);

  return (
    <DashboardShell
      title="Inventory & supply"
      subtitle="Live stock, vendors, warehouses and purchase orders — across 6 sites."
      breadcrumb={['Workspace', 'Operations', 'Inventory']}
      actions={
        <>
          <button className="sc-btn" onClick={() => setFilterOpen(!filterOpen)} data-testid="open-filters">
            <Filter size={13} />Filter{activeFilterCount > 0 && <span className="sc-chip sc-chip-accent" style={{ padding: '1px 6px', fontSize: 10 }}>{activeFilterCount}</span>}
          </button>
          <button className="sc-btn" onClick={() => push('New PO drawer · use Re-order on a product to auto-create', 'info')}><Truck size={13} />New PO</button>
          <button className="sc-btn sc-btn-primary" onClick={openCreate} data-testid="add-product"><Plus size={13} />Add product</button>
        </>
      }
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { l: 'SKUs', v: list.length, c: '#b6ff3c', i: Boxes },
          { l: 'In stock units', v: list.reduce((s, p) => s + p.stock, 0), c: '#6affe0', i: Package },
          { l: 'Low stock alerts', v: allLow.length, c: '#ff5e7e', i: AlertTriangle, d: 'critical' },
          { l: 'Open POs', v: 24, c: '#ffb547', i: Truck, d: '$284k' },
        ].map((k, i) => {
          const I = k.i;
          return (
            <motion.div key={k.l} className="sc-card p-5"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <div className="flex justify-between"><I size={16} style={{ color: k.c }} />{k.d && <span className="sc-chip" style={{ fontSize: 10, color: k.c, borderColor: `${k.c}40`, background: `${k.c}15` }}>{k.d}</span>}</div>
              <div style={{ fontSize: 11, color: 'var(--sc-text-faint)', marginTop: 14 }}>{k.l.toUpperCase()}</div>
              <div className="sc-stat-value mt-1"><AnimatedNumber value={k.v} /></div>
            </motion.div>
          );
        })}
      </div>

      <FilterPanel open={filterOpen}>
        <span style={{ fontSize: 11, color: 'var(--sc-text-faint)' }}>CATEGORY</span>
        {categories.map(c => (
          <FilterChip key={c} active={catFilters.includes(c)}
            onClick={() => setCatFilters(p => p.includes(c) ? p.filter(x => x !== c) : [...p, c])}
            testid={`filter-cat-${c.toLowerCase()}`}>{c}</FilterChip>
        ))}
        <div className="h-5 w-px" style={{ background: 'var(--sc-border)' }} />
        <FilterChip active={lowOnly} onClick={() => setLowOnly(!lowOnly)} testid="filter-low-only">Low stock only</FilterChip>
        {activeFilterCount > 0 && (
          <button onClick={() => { setCatFilters([]); setLowOnly(false); }}
                  className="sc-btn sc-btn-ghost ml-auto" style={{ padding: '6px 12px', fontSize: 11 }}>Clear filters</button>
        )}
      </FilterPanel>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">
        <motion.div className="sc-card p-6 xl:col-span-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="sc-sans" style={{ fontSize: 14, fontWeight: 600 }}>Stock movement</div>
              <div style={{ fontSize: 11, color: 'var(--sc-text-faint)', marginTop: 4 }}>Inflow vs outflow · 30 days</div>
            </div>
          </div>
          <BarChart height={240} color="#ffb547"
            labels={['W1','W2','W3','W4','W5','W6','W7','W8','W9','W10','W11','W12']}
            data={[820, 940, 1120, 980, 1240, 1480, 1340, 1620, 1480, 1740, 1880, 2120]} />
        </motion.div>

        <motion.div className="sc-card p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
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

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-6">
        <motion.div className="sc-card p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="flex justify-between items-start mb-4">
            <div className="sc-sans" style={{ fontSize: 14, fontWeight: 600 }}>Products ({filtered.length})</div>
          </div>
          <table className="sc-table">
            <thead><tr><th>SKU</th><th>NAME</th><th>STOCK</th><th>SOLD</th><th>TREND</th><th></th></tr></thead>
            <tbody>
              {filtered.map(r => (
                <tr key={r.sku}>
                  <td style={{ fontFamily: 'monospace', color: 'var(--sc-accent)' }}>{r.sku}</td>
                  <td>{r.n}</td>
                  <td><span className={`sc-chip ${r.stock < r.reorder ? 'sc-chip-danger' : 'sc-chip-success'}`}>{r.stock}</span></td>
                  <td style={{ color: 'var(--sc-text-dim)' }}>{r.sold}</td>
                  <td style={{ width: 100 }}><Sparkline data={r.s} color="#ffb547" height={22} /></td>
                  <td>
                    <RowMenu items={[
                      { label: 'Edit product', onClick: () => openEdit(r) },
                      { label: 'Re-order +' + Math.max(r.reorder*2 - r.stock, 100), onClick: () => setReorderTarget(r) },
                    ]} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <motion.div className="sc-card p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          <div className="flex items-center justify-between mb-4">
            <div className="sc-sans" style={{ fontSize: 14, fontWeight: 600 }}>Critical low-stock</div>
            <span className="sc-chip sc-chip-danger">{lowStock.length} items</span>
          </div>
          <div className="space-y-3">
            {lowStock.length === 0 && (
              <div style={{ padding: 24, textAlign: 'center', color: 'var(--sc-text-faint)', fontSize: 12 }}>
                All stock levels are healthy.
              </div>
            )}
            {lowStock.map((p) => {
              const severe = p.stock < p.reorder * 0.5;
              const c = severe ? '#ff5e7e' : '#ffb547';
              return (
                <motion.div key={p.sku} className="flex items-center gap-3 p-3 rounded-xl"
                  style={{ background: `${c}10`, border: `1px solid ${c}30` }}
                  initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                  data-testid={`lowstock-${p.sku}`}>
                  <AlertTriangle size={14} style={{ color: c }} />
                  <div className="flex-1">
                    <div style={{ fontSize: 12, fontWeight: 500 }}>{p.n}</div>
                    <div style={{ fontSize: 10, color: 'var(--sc-text-faint)' }}>{p.sku} · re-order at {p.reorder}</div>
                  </div>
                  <div style={{ fontSize: 13, color: c, fontFamily: 'monospace' }}>{p.stock} left</div>
                  <button onClick={() => setReorderTarget(p)} className="sc-btn"
                          style={{ padding: '4px 10px', fontSize: 11 }}
                          data-testid={`reorder-${p.sku}`}>Re-order</button>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      <motion.div className="sc-card p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="sc-sans mb-4" style={{ fontSize: 14, fontWeight: 600 }}>By category</div>
        <DonutChart size={180} thickness={18} centerLabel={`${list.length}`} centerSubLabel="SKUs" segments={
          categories.map((c, i) => ({
            label: c,
            value: list.filter(p => p.cat === c).length || 0.001,
            color: ['#b6ff3c','#6affe0','#ff6bcb','#7a5cff','#ffb547'][i],
          })).filter(s => s.value > 0.01)
        } />
      </motion.div>

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={editing ? 'Edit product' : 'Add product'}
        subtitle={editing ? `Update ${editing.sku}` : 'Add a new SKU to the catalog'}
        footer={
          <>
            <button className="sc-btn sc-btn-ghost" onClick={() => setDrawerOpen(false)}>Cancel</button>
            <button className="sc-btn sc-btn-primary" onClick={submit} data-testid="drawer-submit">
              {editing ? 'Save changes' : 'Add product'}
            </button>
          </>
        }
      >
        <div className="grid grid-cols-2 gap-4">
          <Field label="SKU">
            <input className="sc-input" value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value.toUpperCase() })}
                   placeholder="e.g. TX-441" data-testid="product-sku" autoFocus disabled={!!editing} />
          </Field>
          <Field label="Category">
            <select className="sc-input" value={form.cat} onChange={(e) => setForm({ ...form, cat: e.target.value })}>
              {categories.map(c => <option key={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Product name" span={2}>
            <input className="sc-input" value={form.n} onChange={(e) => setForm({ ...form, n: e.target.value })}
                   placeholder="Titanium drill bit · 6mm" data-testid="product-name" />
          </Field>
          <Field label="Current stock">
            <input type="number" className="sc-input" value={form.stock}
                   onChange={(e) => setForm({ ...form, stock: Number(e.target.value) || 0 })} data-testid="product-stock" />
          </Field>
          <Field label="Re-order threshold">
            <input type="number" className="sc-input" value={form.reorder}
                   onChange={(e) => setForm({ ...form, reorder: Number(e.target.value) || 0 })} />
          </Field>
        </div>
      </Drawer>

      <ConfirmDialog
        open={!!reorderTarget}
        onClose={() => setReorderTarget(null)}
        onConfirm={() => reorderTarget && reorder(reorderTarget)}
        title="Create purchase order?"
        message={`Generate a PO for ${reorderTarget?.sku} (${reorderTarget?.n}) · qty ${reorderTarget ? Math.max(reorderTarget.reorder*2 - reorderTarget.stock, 100) : 0}. Vendor will be notified instantly.`}
        confirmLabel="Create PO"
        tone="primary"
      />
    </DashboardShell>
  );
}
