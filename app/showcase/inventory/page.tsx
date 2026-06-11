'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Plus, AlertTriangle, Package, Truck, Warehouse, Boxes, Filter } from 'lucide-react';
import DashboardShell from '@/components/showcase/DashboardShell';
import { BarChart, DonutChart, AnimatedNumber, Sparkline } from '@/components/showcase/Charts';
import { Drawer, ConfirmDialog, FilterPanel, FilterChip, RowMenu, useToast } from '@/components/showcase/Interactions';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { inventorySchema } from '@/components/showcase/schemas';
import { ScInput, ScSelect } from '@/components/showcase/FormFields';

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

  const { register, handleSubmit, control, reset, formState: { errors } } = useForm({
    resolver: zodResolver(inventorySchema),
    defaultValues: blank()
  });

  const [reorderTarget, setReorderTarget] = React.useState<Product | null>(null);
  const { push } = useToast();

  const filtered = list.filter(p => {
    if (catFilters.length && !catFilters.includes(p.cat)) return false;
    if (lowOnly && p.stock >= p.reorder) return false;
    return true;
  });

  const lowStock = filtered.filter(p => p.stock < p.reorder);
  const allLow = list.filter(p => p.stock < p.reorder);

  const openCreate = () => {
    setEditing(null);
    reset(blank());
    setDrawerOpen(true);
  };
  const openEdit = (p: Product) => {
    setEditing(p);
    reset({ sku: p.sku, n: p.n, stock: p.stock, sold: p.sold, reorder: p.reorder, cat: p.cat });
    setDrawerOpen(true);
  };
  const onSubmit = (data: any) => {
    if (editing) {
      setList(prev => prev.map(x => x.sku === editing.sku ? { ...editing, ...data } : x));
      push(`Updated · ${data.sku}`);
    } else {
      setList(prev => [{ ...data, sold: 0, s: [0,0,0,0,0,0, data.stock / 5] }, ...prev]);
      push(`Product added · ${data.sku}`);
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
          <button className="sc-btn sc-btn-primary" onClick={openCreate} data-testid="add-product"><Plus size={13} />Add SKU</button>
        </>
      }
    >
      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { l: 'Total items', v: list.reduce((a, b) => a + b.stock, 0), c: '#b6ff3c', i: Package },
          { l: 'Active SKUs', v: list.length, c: '#6affe0', i: Boxes },
          { l: 'Critical alerts', v: allLow.length, c: '#ff5e7e', i: AlertTriangle },
          { l: 'Warehouses', v: 6, c: '#ffb547', i: Warehouse },
        ].map((k, i) => {
          const Icon = k.i;
          return (
            <motion.div key={k.l} className="sc-card p-5"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <div className="flex justify-between items-center text-var(--sc-text-faint)">
                <span style={{ fontSize: 11 }}>{k.l.toUpperCase()}</span>
                <Icon size={14} style={{ color: k.c }} />
              </div>
              <div className="sc-stat-value mt-3" style={{ color: k.c }}>
                <AnimatedNumber value={k.v} />
              </div>
            </motion.div>
          );
        })}
      </div>

      <FilterPanel open={filterOpen}>
        <span style={{ fontSize: 11, color: 'var(--sc-text-faint)' }}>CATEGORY</span>
        {categories.map(c => (
          <FilterChip key={c} active={catFilters.includes(c)}
            onClick={() => setCatFilters(p => p.includes(c) ? p.filter(x => x !== c) : [...p, c])}>
            {c}
          </FilterChip>
        ))}
        <div className="h-5 w-px" style={{ background: 'var(--sc-border)' }} />
        <FilterChip active={lowOnly} onClick={() => setLowOnly(!lowOnly)}>
          Low stock only
        </FilterChip>
        {activeFilterCount > 0 && (
          <button onClick={() => { setCatFilters([]); setLowOnly(false); }} className="sc-btn sc-btn-ghost ml-auto" style={{ padding: '6px 12px', fontSize: 11 }}>
            Clear filters
          </button>
        )}
      </FilterPanel>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">
        {/* Table */}
        <motion.div className="sc-card p-6 xl:col-span-2 overflow-x-auto sc-scroll"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <div className="sc-sans mb-4" style={{ fontSize: 14, fontWeight: 600 }}>Product catalog</div>
          <table className="sc-table">
            <thead><tr><th>SKU</th><th>PRODUCT NAME</th><th>STOCK</th><th>CATEGORY</th><th>7D TREND</th><th></th></tr></thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.sku} data-testid={`product-row-${p.sku}`}>
                  <td style={{ fontFamily: 'monospace', color: 'var(--sc-accent-2)' }}>{p.sku}</td>
                  <td>{p.n}</td>
                  <td>
                    <span style={{
                      fontFamily: 'monospace',
                      color: p.stock < p.reorder ? 'var(--sc-danger)' : 'var(--sc-text)',
                    }}>
                      {p.stock.toLocaleString()}
                    </span>
                  </td>
                  <td><span className="sc-chip">{p.cat}</span></td>
                  <td style={{ width: 100 }}><Sparkline data={p.s} color={p.stock < p.reorder ? '#ff5e7e' : '#b6ff3c'} /></td>
                  <td>
                    <RowMenu items={[
                      { label: 'Edit SKU', onClick: () => openEdit(p) },
                      { label: 'Trigger PO', onClick: () => setReorderTarget(p) },
                    ]} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Alerts panel */}
        <motion.div className="sc-card p-6 flex flex-col justify-between"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
          <div className="flex justify-between items-center mb-4">
            <div className="sc-sans" style={{ fontSize: 14, fontWeight: 600 }}>Supply alerts</div>
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
                  initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}>
                  <AlertTriangle size={14} style={{ color: c }} />
                  <div className="flex-1">
                    <div style={{ fontSize: 12, fontWeight: 500 }}>{p.n}</div>
                    <div style={{ fontSize: 10, color: 'var(--sc-text-faint)' }}>{p.sku} · re-order at {p.reorder}</div>
                  </div>
                  <div style={{ fontSize: 13, color: c, fontFamily: 'monospace' }}>{p.stock} left</div>
                  <button onClick={() => setReorderTarget(p)} className="sc-btn"
                          style={{ padding: '4px 10px', fontSize: 11 }}>Re-order</button>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={editing ? 'Edit product' : 'Add product'}
        subtitle={editing ? `Update ${editing.sku}` : 'Add a new SKU to the catalog'}
        footer={
          <>
            <button className="sc-btn sc-btn-ghost" onClick={() => setDrawerOpen(false)}>Cancel</button>
            <button className="sc-btn sc-btn-primary" onClick={handleSubmit(onSubmit)} data-testid="drawer-submit">
              {editing ? 'Save changes' : 'Add product'}
            </button>
          </>
        }
      >
        <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit(onSubmit)}>
          <ScInput
            label="SKU"
            placeholder="e.g. TX-441"
            data-testid="product-sku"
            error={errors.sku?.message as string}
            {...register('sku')}
            autoFocus
            disabled={!!editing}
          />

          <Controller
            name="cat"
            control={control}
            render={({ field }) => (
              <ScSelect
                label="Category"
                value={field.value}
                onChange={field.onChange}
                options={categories.map(c => ({ label: c, value: c }))}
                error={errors.cat?.message as string}
              />
            )}
          />

          <ScInput
            label="Product name"
            placeholder="Titanium drill bit · 6mm"
            data-testid="product-name"
            wrapperClassName="col-span-2"
            error={errors.n?.message as string}
            {...register('n')}
          />

          <ScInput
            label="Current stock"
            type="number"
            data-testid="product-stock"
            error={errors.stock?.message as string}
            {...register('stock', { valueAsNumber: true })}
          />

          <ScInput
            label="Re-order threshold"
            type="number"
            error={errors.reorder?.message as string}
            {...register('reorder', { valueAsNumber: true })}
          />
        </form>
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
