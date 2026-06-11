'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Filter, Phone, Mail } from 'lucide-react';
import DashboardShell from '@/components/demos/DashboardShell';
import { Funnel, DonutChart, AnimatedNumber } from '@/components/demos/Charts';
import { Drawer, ConfirmDialog, FilterPanel, FilterChip, RowMenu, SearchInput, useToast } from '@/components/demos/Interactions';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { dealSchema } from '@/components/demos/schemas';
import { ScInput, ScSelect } from '@/components/demos/FormFields';

const stages = [
  { name: 'Prospect', color: '#9ea0b3' },
  { name: 'Qualified', color: '#6affe0' },
  { name: 'Proposal', color: '#ffb547' },
  { name: 'Negotiation', color: '#ff6bcb' },
  { name: 'Closed Won', color: '#b6ff3c' },
];

type Deal = { id: string; c: string; l: string; v: number; s: string; p: number; due: string };

const initialDeals: Deal[] = [
  { id: 'd1', c: 'Northwind Traders',   l: 'Yui Tanaka',  v:  84000, s: 'Negotiation', p: 78, due: '3d'  },
  { id: 'd2', c: 'Globex Corp',         l: 'Marcus Hale', v: 112500, s: 'Proposal',    p: 62, due: '7d'  },
  { id: 'd3', c: 'Initech',             l: 'Sofia Reyes', v:  48200, s: 'Qualified',   p: 35, due: '14d' },
  { id: 'd4', c: 'Acme Robotics',       l: 'Leon Park',   v: 198000, s: 'Negotiation', p: 85, due: '2d'  },
  { id: 'd5', c: 'Vandelay Industries', l: 'Yui Tanaka',  v:  36500, s: 'Prospect',    p: 18, due: '21d' },
  { id: 'd6', c: 'Stark Industries',    l: 'Marcus Hale', v: 248000, s: 'Closed Won',  p:100, due: '—'   },
];

const stageColors: Record<string, string> = Object.fromEntries(stages.map(s => [s.name, s.color]));
const owners = ['Yui Tanaka', 'Marcus Hale', 'Sofia Reyes', 'Leon Park'];

const blank = (): Omit<Deal, 'id'> => ({ c: '', l: 'Yui Tanaka', v: 0, s: 'Prospect', p: 20, due: '14d' });

export default function CRMPage() {
  const [deals, setDeals] = React.useState<Deal[]>(initialDeals);
  const [search, setSearch] = React.useState('');
  const [filterOpen, setFilterOpen] = React.useState(false);
  const [stageFilters, setStageFilters] = React.useState<string[]>([]);
  const [ownerFilters, setOwnerFilters] = React.useState<string[]>([]);
  const [minValue, setMinValue] = React.useState(0);

  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<Deal | null>(null);

  const { register, handleSubmit, control, reset, formState: { errors } } = useForm({
    resolver: zodResolver(dealSchema),
    defaultValues: blank()
  });

  const [confirmDel, setConfirmDel] = React.useState<Deal | null>(null);
  const { push } = useToast();

  const filtered = deals.filter(d => {
    if (search && !d.c.toLowerCase().includes(search.toLowerCase()) && !d.l.toLowerCase().includes(search.toLowerCase())) return false;
    if (stageFilters.length && !stageFilters.includes(d.s)) return false;
    if (ownerFilters.length && !ownerFilters.includes(d.l)) return false;
    if (d.v < minValue) return false;
    return true;
  });

  const totals = {
    pipeline: deals.reduce((s, d) => s + d.v, 0),
    open: deals.filter(d => d.s !== 'Closed Won').length,
    winRate: Math.round((deals.filter(d => d.s === 'Closed Won').length / deals.length) * 1000) / 10,
    avgCycle: 24,
  };

  const openCreate = () => {
    setEditing(null);
    reset(blank());
    setDrawerOpen(true);
  };
  const openEdit = (d: Deal) => {
    setEditing(d);
    reset({ c: d.c, l: d.l, v: d.v, s: d.s, p: d.p, due: d.due });
    setDrawerOpen(true);
  };
  const onSubmit = (data: any) => {
    if (editing) {
      setDeals(prev => prev.map(d => d.id === editing.id ? { ...editing, ...data } : d));
      push(`Updated · ${data.c}`);
    } else {
      const id = 'd' + Date.now();
      setDeals(prev => [{ id, ...data }, ...prev]);
      push(`Deal added · ${data.c}`);
    }
    setDrawerOpen(false);
  };
  const remove = (d: Deal) => {
    setDeals(prev => prev.filter(x => x.id !== d.id));
    push(`Removed · ${d.c}`, 'info');
  };

  const activeFilterCount = stageFilters.length + ownerFilters.length + (minValue > 0 ? 1 : 0);

  return (
    <DashboardShell
      title="CRM command center"
      subtitle="Pipeline, deals, customers — everything you need to close the quarter."
      breadcrumb={['Workspace', 'Sales', 'CRM']}
      actions={
        <>
          <button className="sc-btn" onClick={() => setFilterOpen(!filterOpen)} data-testid="open-filters">
            <Filter size={13} />Filters{activeFilterCount > 0 && <span className="sc-chip sc-chip-accent" style={{ padding: '1px 6px', fontSize: 10 }}>{activeFilterCount}</span>}
          </button>
          <button className="sc-btn sc-btn-primary" onClick={openCreate} data-testid="add-deal"><Plus size={13} />New deal</button>
        </>
      }
    >
      {/* KPI */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { l: 'Pipeline', v: totals.pipeline, prefix: '$', c: '#b6ff3c' },
          { l: 'Deals open', v: totals.open, c: '#6affe0' },
          { l: 'Win rate', v: totals.winRate, suffix: '%', decimals: 1, c: '#ff6bcb' },
          { l: 'Avg cycle', v: totals.avgCycle, suffix: 'd', c: '#ffb547' },
        ].map((k, i) => (
          <motion.div key={k.l} className="sc-card p-5"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <div style={{ fontSize: 11, color: 'var(--sc-text-faint)' }}>{k.l.toUpperCase()}</div>
            <div className="sc-stat-value mt-3" style={{ color: k.c }}>
              <AnimatedNumber value={k.v} prefix={k.prefix} suffix={k.suffix} decimals={k.decimals ?? 0} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filter panel */}
      <FilterPanel open={filterOpen}>
        <span style={{ fontSize: 11, color: 'var(--sc-text-faint)' }}>STAGE</span>
        {stages.map(s => (
          <FilterChip key={s.name} active={stageFilters.includes(s.name)}
            onClick={() => setStageFilters(p => p.includes(s.name) ? p.filter(x => x !== s.name) : [...p, s.name])}
            testid={`filter-stage-${s.name.toLowerCase().replace(/\s+/g, '-')}`}>
            {s.name}
          </FilterChip>
        ))}
        <div className="h-5 w-px" style={{ background: 'var(--sc-border)' }} />
        <span style={{ fontSize: 11, color: 'var(--sc-text-faint)' }}>OWNER</span>
        {owners.map(o => (
          <FilterChip key={o} active={ownerFilters.includes(o)}
            onClick={() => setOwnerFilters(p => p.includes(o) ? p.filter(x => x !== o) : [...p, o])}
            testid={`filter-owner-${o.toLowerCase().replace(/\s+/g, '-')}`}>
            {o}
          </FilterChip>
        ))}
        <div className="h-5 w-px" style={{ background: 'var(--sc-border)' }} />
        <label className="flex items-center gap-2" style={{ fontSize: 11, color: 'var(--sc-text-dim)' }}>
          MIN VALUE
          <input type="number" className="sc-input" style={{ width: 110, padding: '6px 10px', fontSize: 12 }}
                 value={minValue} onChange={(e) => setMinValue(Number(e.target.value) || 0)}
                 data-testid="filter-min-value" />
        </label>
        {activeFilterCount > 0 && (
          <button onClick={() => { setStageFilters([]); setOwnerFilters([]); setMinValue(0); }}
                  className="sc-btn sc-btn-ghost" style={{ padding: '6px 12px', fontSize: 11 }}
                  data-testid="clear-filters">
            Clear all
          </button>
        )}
      </FilterPanel>

      {/* Pipeline kanban */}
      <motion.div className="mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        <div className="flex items-center justify-between mb-3">
          <div className="sc-sans" style={{ fontSize: 14, fontWeight: 600 }}>Sales pipeline · Q4</div>
          <div style={{ fontSize: 12, color: 'var(--sc-text-dim)' }}>
            Showing {filtered.length} of {deals.length} deals
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-3">
          {stages.map((s) => {
            const inStage = filtered.filter(d => d.s === s.name);
            const stageTotal = inStage.reduce((acc, d) => acc + d.v, 0);
            return (
              <div key={s.name} className="sc-kanban-col">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.color, boxShadow: `0 0 6px ${s.color}` }} />
                    <span className="sc-sans" style={{ fontSize: 12, fontWeight: 600 }}>{s.name}</span>
                  </div>
                  <span style={{ fontSize: 10, color: 'var(--sc-text-faint)', fontFamily: 'monospace' }}>{inStage.length}</span>
                </div>
                <div style={{ fontSize: 10, color: 'var(--sc-text-faint)', marginBottom: 12 }}>${(stageTotal/1000).toFixed(0)}k total</div>
                {inStage.slice(0, 3).map((d) => (
                  <motion.div key={d.id} className="sc-kanban-card"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    onClick={() => openEdit(d)}>
                    <div style={{ fontSize: 12, fontWeight: 500 }}>{d.c}</div>
                    <div style={{ fontSize: 10, color: 'var(--sc-text-faint)', marginTop: 4 }}>{d.l}</div>
                    <div className="flex items-center justify-between mt-3">
                      <span style={{ fontSize: 11, color: s.color, fontFamily: 'monospace' }}>${(d.v/1000).toFixed(0)}k</span>
                      <span className="sc-chip" style={{ fontSize: 9, padding: '2px 6px' }}>{d.due}</span>
                    </div>
                  </motion.div>
                ))}
                {inStage.length === 0 && (
                  <div style={{ fontSize: 11, color: 'var(--sc-text-faint)', padding: 12, textAlign: 'center' }}>No deals</div>
                )}
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Funnel + Donut */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-6">
        <motion.div className="sc-card p-6 xl:col-span-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <div className="sc-sans mb-4" style={{ fontSize: 14, fontWeight: 600 }}>Conversion funnel</div>
          <Funnel stages={[
            { label: 'Leads',         value: 4820, color: '#9ea0b3' },
            { label: 'Qualified',     value: 1284, color: '#6affe0' },
            { label: 'Demos booked',  value:  642, color: '#ffb547' },
            { label: 'Proposals sent',value:  248, color: '#ff6bcb' },
            { label: 'Closed won',    value:   84, color: '#b6ff3c' },
          ]} />
        </motion.div>

        <motion.div className="sc-card p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}>
          <div className="sc-sans mb-4" style={{ fontSize: 14, fontWeight: 600 }}>Won by source</div>
          <DonutChart size={200} thickness={18}
            centerLabel="84" centerSubLabel="DEALS" segments={[
            { label: 'Inbound', value: 42, color: '#b6ff3c' },
            { label: 'Outbound', value: 24, color: '#6affe0' },
            { label: 'Partner', value: 12, color: '#ff6bcb' },
            { label: 'Event', value: 6, color: '#7a5cff' },
          ]} />
        </motion.div>
      </div>

      {/* Deals table */}
      <motion.div className="sc-card p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
        <div className="flex items-center justify-between mb-4">
          <div className="sc-sans" style={{ fontSize: 14, fontWeight: 600 }}>All deals ({filtered.length})</div>
          <SearchInput value={search} onChange={setSearch} placeholder="Search deals..." testid="deal-search" />
        </div>
        <div className="overflow-x-auto sc-scroll">
          <table className="sc-table">
            <thead><tr><th>COMPANY</th><th>OWNER</th><th>VALUE</th><th>STAGE</th><th>PROBABILITY</th><th>CLOSE</th><th></th></tr></thead>
            <tbody>
              {filtered.map((d) => (
                <tr key={d.id} data-testid={`deal-row-${d.id}`}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                           style={{ background: `${stageColors[d.s]}22`, color: stageColors[d.s], fontWeight: 700 }}>
                        {d.c[0]}
                      </div>
                      <div>
                        <div>{d.c}</div>
                        <div style={{ fontSize: 10, color: 'var(--sc-text-faint)' }}>{d.l}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ color: 'var(--sc-text-dim)' }}>{d.l}</td>
                  <td style={{ fontFamily: 'monospace', color: 'var(--sc-accent)' }}>${d.v.toLocaleString()}</td>
                  <td><span className="sc-chip" style={{ color: stageColors[d.s], borderColor: `${stageColors[d.s]}40`, background: `${stageColors[d.s]}15` }}>{d.s}</span></td>
                  <td style={{ width: 160 }}>
                    <div className="flex items-center gap-2">
                      <div className="sc-progress flex-1">
                        <motion.div className="sc-progress-bar" initial={{ width: 0 }} animate={{ width: `${d.p}%` }} transition={{ duration: 1 }} />
                      </div>
                      <span style={{ fontSize: 11, fontFamily: 'monospace' }}>{d.p}%</span>
                    </div>
                  </td>
                  <td style={{ color: 'var(--sc-text-dim)' }}>in {d.due}</td>
                  <td>
                    <div className="flex gap-1 items-center">
                      <button className="p-1.5 rounded-lg hover:bg-white/5"><Phone size={12} /></button>
                      <button className="p-1.5 rounded-lg hover:bg-white/5"><Mail size={12} /></button>
                      <RowMenu items={[
                        { label: 'Edit deal', onClick: () => openEdit(d), testid: `edit-deal-${d.id}` },
                        { label: 'Mark as won', onClick: () => { setDeals(p => p.map(x => x.id === d.id ? { ...x, s: 'Closed Won', p: 100 } : x)); push(`${d.c} → Closed Won`); } },
                        { label: 'Delete', onClick: () => setConfirmDel(d), danger: true, testid: `delete-deal-${d.id}` },
                      ]} />
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={7} style={{ textAlign: 'center', padding: 32, color: 'var(--sc-text-faint)' }}>
                  No deals match your filters. <button onClick={() => { setSearch(''); setStageFilters([]); setOwnerFilters([]); setMinValue(0); }} className="underline" style={{ color: 'var(--sc-accent)' }}>Clear all</button>
                </td></tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Add / Edit drawer */}
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={editing ? 'Edit deal' : 'New deal'}
        subtitle={editing ? `Update ${editing.c}` : 'Add a new opportunity to your pipeline'}
        footer={
          <>
            <button className="sc-btn sc-btn-ghost" onClick={() => setDrawerOpen(false)} data-testid="drawer-cancel">Cancel</button>
            <button className="sc-btn sc-btn-primary" onClick={handleSubmit(onSubmit)} data-testid="drawer-submit">
              {editing ? 'Save changes' : 'Create deal'}
            </button>
          </>
        }
      >
        <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit(onSubmit)}>
          <ScInput
            label="Company"
            placeholder="e.g. Northwind Traders"
            data-testid="deal-company"
            wrapperClassName="col-span-2"
            error={errors.c?.message}
            {...register('c')}
            autoFocus
          />

          <Controller
            name="l"
            control={control}
            render={({ field }) => (
              <ScSelect
                label="Owner"
                value={field.value}
                onChange={field.onChange}
                options={owners.map(o => ({ label: o, value: o }))}
                data-testid="deal-owner"
                error={errors.l?.message}
              />
            )}
          />

          <ScInput
            label="Deal value (USD)"
            type="number"
            placeholder="0"
            data-testid="deal-value"
            error={errors.v?.message}
            {...register('v')}
          />

          <Controller
            name="s"
            control={control}
            render={({ field }) => (
              <ScSelect
                label="Stage"
                value={field.value}
                onChange={field.onChange}
                options={stages.map(s => ({ label: s.name, value: s.name }))}
                data-testid="deal-stage"
                error={errors.s?.message}
              />
            )}
          />

          <ScInput
            label="Probability (%)"
            type="number"
            min={0}
            max={100}
            error={errors.p?.message}
            {...register('p')}
          />

          <ScInput
            label="Expected close"
            placeholder="e.g. 14d or Dec 24"
            wrapperClassName="col-span-2"
            error={errors.due?.message}
            {...register('due')}
          />
        </form>

        <div className="mt-6 pt-6 border-t" style={{ borderColor: 'var(--sc-border)' }}>
          <div style={{ fontSize: 11, color: 'var(--sc-text-faint)', marginBottom: 10 }}>QUICK ACTIONS</div>
          <div className="flex gap-2 flex-wrap">
            <button className="sc-chip" style={{ cursor: 'pointer' }}>+ Add note</button>
            <button className="sc-chip" style={{ cursor: 'pointer' }}>+ Log call</button>
            <button className="sc-chip" style={{ cursor: 'pointer' }}>+ Schedule demo</button>
          </div>
        </div>
      </Drawer>

      <ConfirmDialog
        open={!!confirmDel}
        onClose={() => setConfirmDel(null)}
        onConfirm={() => confirmDel && remove(confirmDel)}
        title="Delete this deal?"
        message={`This will permanently remove "${confirmDel?.c}" from your pipeline. This action can't be undone.`}
        confirmLabel="Delete deal"
      />
    </DashboardShell>
  );
}
