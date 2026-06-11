'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Filter, Mail, MapPin, Briefcase, Calendar, Phone, Plus } from 'lucide-react';
<<<<<<< HEAD:app/showcase/employees/page.tsx
import DashboardShell from '@/components/showcase/DashboardShell';
import { Drawer, ConfirmDialog, FilterPanel, FilterChip, RowMenu, SearchInput, useToast } from '@/components/showcase/Interactions';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { employeeSchema } from '@/components/showcase/schemas';
import { ScInput, ScSelect } from '@/components/showcase/FormFields';
=======
import DashboardShell from '@/components/demos/DashboardShell';
import { Drawer, ConfirmDialog, FilterPanel, FilterChip, RowMenu, SearchInput, useToast } from '@/components/demos/Interactions';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { employeeSchema } from '@/components/demos/schemas';
import { ScInput, ScSelect } from '@/components/demos/FormFields';
>>>>>>> 42fd257aafd27a120ccb1129f1b62a7137460387:app/demos/employees/page.tsx

type Employee = {
  id: string; n: string; r: string; d: string; l: string; e: string;
  t: string; a: string; c: string; s: 'active' | 'leave' | 'suspended';
};

const COLORS = ['#b6ff3c', '#6affe0', '#ff6bcb', '#7a5cff', '#ffb547', '#5cf2a3', '#ff5e7e'];
const initials = (n: string) => n.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase();

const initial: Employee[] = [
  { id: 'e1', n: 'Akira Saito',   r: 'Founder · CEO',    d: 'Executive', l: 'Tokyo, JP',     e: 'akira@manatech.io',  t: '5y 4m', a: 'AS', c: '#b6ff3c', s: 'active' },
  { id: 'e2', n: 'Yui Tanaka',    r: 'VP Sales',         d: 'Sales',     l: 'Tokyo, JP',     e: 'yui@manatech.io',    t: '3y 2m', a: 'YT', c: '#6affe0', s: 'active' },
  { id: 'e3', n: 'Marcus Hale',   r: 'Sr. Engineer',     d: 'Engineering', l: 'NYC, US',     e: 'marcus@manatech.io', t: '2y 8m', a: 'MH', c: '#ff6bcb', s: 'active' },
  { id: 'e4', n: 'Sofia Reyes',   r: 'Product Designer', d: 'Design',    l: 'Madrid, ES',    e: 'sofia@manatech.io',  t: '1y 4m', a: 'SR', c: '#7a5cff', s: 'active' },
  { id: 'e5', n: 'Leon Park',     r: 'Data Engineer',    d: 'Engineering', l: 'Seoul, KR',   e: 'leon@manatech.io',   t: '2y 0m', a: 'LP', c: '#ffb547', s: 'leave' },
  { id: 'e6', n: 'Hiroko Sato',   r: 'HR Lead',          d: 'People',    l: 'Tokyo, JP',     e: 'hiroko@manatech.io', t: '4y 1m', a: 'HS', c: '#5cf2a3', s: 'active' },
  { id: 'e7', n: 'Ren Okada',     r: 'Jr. Engineer',     d: 'Engineering', l: 'Tokyo, JP',   e: 'ren@manatech.io',    t: '4m',    a: 'RO', c: '#ff5e7e', s: 'active' },
  { id: 'e8', n: 'Chloe Bauer',   r: 'Marketing Lead',   d: 'Marketing', l: 'Berlin, DE',    e: 'chloe@manatech.io',  t: '1y 11m', a: 'CB', c: '#b6ff3c', s: 'active' },
  { id: 'e9', n: 'Diego Costa',   r: 'Customer Success', d: 'Operations', l: 'São Paulo, BR', e: 'diego@manatech.io', t: '2y 4m', a: 'DC', c: '#6affe0', s: 'active' },
];

const allDepartments = ['Engineering', 'Sales', 'Design', 'People', 'Operations', 'Marketing', 'Executive'];
const allStatuses: Employee['s'][] = ['active', 'leave', 'suspended'];

const blank = (): Omit<Employee, 'id' | 'a' | 'c'> => ({
  n: '', r: '', d: 'Engineering', l: '', e: '', t: '0m', s: 'active',
});

export default function EmployeesPage() {
  const [view, setView] = React.useState<'grid' | 'list'>('grid');
  const [list, setList] = React.useState<Employee[]>(initial);
  const [search, setSearch] = React.useState('');
  const [filterOpen, setFilterOpen] = React.useState(false);
  const [depFilters, setDepFilters] = React.useState<string[]>([]);
  const [statusFilters, setStatusFilters] = React.useState<Employee['s'][]>([]);

  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<Employee | null>(null);

  const { register, handleSubmit, control, reset, formState: { errors } } = useForm({
    resolver: zodResolver(employeeSchema),
    defaultValues: blank()
  });

  const [confirmDel, setConfirmDel] = React.useState<Employee | null>(null);
  const { push } = useToast();

  const filtered = list.filter(emp => {
    if (search) {
      const q = search.toLowerCase();
      if (![emp.n, emp.r, emp.e, emp.l].some(s => s.toLowerCase().includes(q))) return false;
    }
    if (depFilters.length && !depFilters.includes(emp.d)) return false;
    if (statusFilters.length && !statusFilters.includes(emp.s)) return false;
    return true;
  });

  const openCreate = () => {
    setEditing(null);
    reset(blank());
    setDrawerOpen(true);
  };
  const openEdit = (e: Employee) => {
    setEditing(e);
    reset({ n: e.n, r: e.r, d: e.d, l: e.l, e: e.e, t: e.t, s: e.s });
    setDrawerOpen(true);
  };
  const onSubmit = (data: any) => {
    if (editing) {
      setList(prev => prev.map(x => x.id === editing.id ? { ...editing, ...data } : x));
      push(`Updated · ${data.n}`);
    } else {
      const id = 'e' + Date.now();
      const c = COLORS[Math.floor(Math.random() * COLORS.length)];
      setList(prev => [{ id, ...data, a: initials(data.n), c }, ...prev]);
      push(`Added · ${data.n}`);
    }
    setDrawerOpen(false);
  };
  const remove = (e: Employee) => {
    setList(prev => prev.filter(x => x.id !== e.id));
    push(`Removed · ${e.n}`, 'info');
  };

  const activeFilterCount = depFilters.length + statusFilters.length;

  return (
    <DashboardShell
      title="Employee directory"
      subtitle="Manage your distributed team, departments, roles, and profiles."
      breadcrumb={['Workspace', 'People', 'Directory']}
      actions={
        <>
          <div className="sc-tabs mr-1">
            <button className={`sc-tab ${view === 'grid' ? 'active' : ''}`} onClick={() => setView('grid')}>Grid</button>
            <button className={`sc-tab ${view === 'list' ? 'active' : ''}`} onClick={() => setView('list')}>List</button>
          </div>
          <button className="sc-btn" onClick={() => setFilterOpen(!filterOpen)}>
            <Filter size={13} />Filters{activeFilterCount > 0 && <span className="sc-chip sc-chip-accent" style={{ padding: '1px 6px', fontSize: 10 }}>{activeFilterCount}</span>}
          </button>
          <button className="sc-btn sc-btn-primary" onClick={openCreate} data-testid="add-emp"><Plus size={13} />Add employee</button>
        </>
      }
    >
      <FilterPanel open={filterOpen}>
        <span style={{ fontSize: 11, color: 'var(--sc-text-faint)' }}>DEPARTMENT</span>
        {allDepartments.map(d => (
          <FilterChip key={d} active={depFilters.includes(d)}
            onClick={() => setDepFilters(p => p.includes(d) ? p.filter(x => x !== d) : [...p, d])}>
            {d}
          </FilterChip>
        ))}
        <div className="h-5 w-px" style={{ background: 'var(--sc-border)' }} />
        <span style={{ fontSize: 11, color: 'var(--sc-text-faint)' }}>STATUS</span>
        {allStatuses.map(s => (
          <FilterChip key={s} active={statusFilters.includes(s)}
            onClick={() => setStatusFilters(p => p.includes(s) ? p.filter(x => x !== s) : [...p, s])}>
            {s}
          </FilterChip>
        ))}
        {activeFilterCount > 0 && (
          <button onClick={() => { setDepFilters([]); setStatusFilters([]); }} className="sc-btn sc-btn-ghost" style={{ padding: '6px 12px', fontSize: 11 }}>
            Clear all
          </button>
        )}
      </FilterPanel>

      <div className="flex items-center justify-between mb-4 mt-2">
        <div className="sc-sans animate-fade-in" style={{ fontSize: 14, fontWeight: 600 }}>Active members · {filtered.length}</div>
        <SearchInput value={search} onChange={setSearch} placeholder="Search members..." testid="emp-search" />
      </div>

      {view === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((emp, i) => (
            <motion.div
              key={emp.id} className="sc-card p-6 flex flex-col justify-between"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
              data-testid={`emp-card-${emp.id}`}
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="sc-avatar" style={{ background: `linear-gradient(135deg, ${emp.c}, ${emp.c}66)`, width: 44, height: 44, fontSize: 14 }}>{emp.a}</div>
                  <RowMenu items={[
                    { label: 'Edit record', onClick: () => openEdit(emp) },
                    { label: 'Send message', onClick: () => push(`Message → ${emp.n}`, 'info') },
                    { label: 'Remove employee', onClick: () => setConfirmDel(emp), danger: true },
                  ]} />
                </div>
                <div className="sc-sans" style={{ fontSize: 16, fontWeight: 600 }}>{emp.n}</div>
                <div style={{ fontSize: 12, color: 'var(--sc-text-dim)', marginTop: 2 }}>{emp.r}</div>
                <div className="flex items-center gap-1.5 mt-3 text-[11px] uppercase tracking-wider" style={{ color: 'var(--sc-text-faint)' }}>
                  <span className="sc-chip" style={{ fontSize: 10, padding: '1px 6px' }}>{emp.d}</span>
                </div>
              </div>

              <div className="border-t mt-6 pt-4 flex flex-col gap-2.5" style={{ borderColor: 'var(--sc-border)' }}>
                <div className="flex items-center justify-between text-xs">
                  <span style={{ color: 'var(--sc-text-faint)' }} className="flex items-center gap-1.5"><Mail size={12} />Email</span>
                  <span style={{ color: 'var(--sc-text-dim)' }}>{emp.e}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span style={{ color: 'var(--sc-text-faint)' }} className="flex items-center gap-1.5"><MapPin size={12} />Location</span>
                  <span style={{ color: 'var(--sc-text-dim)' }}>{emp.l}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span style={{ color: 'var(--sc-text-faint)' }} className="flex items-center gap-1.5"><Calendar size={12} />Tenure</span>
                  <span style={{ color: 'var(--sc-text-dim)' }}>{emp.t}</span>
                </div>
                <div className="flex items-center justify-between text-xs mt-1">
                  <span style={{ color: 'var(--sc-text-faint)' }}>Status</span>
                  <span className={`sc-chip ${emp.s === 'active' ? 'sc-chip-success' : emp.s === 'leave' ? 'sc-chip-warning' : 'sc-chip-danger'}`} style={{ fontSize: 9, padding: '1px 6px' }}>{emp.s}</span>
                </div>
              </div>
            </motion.div>
          ))}
          {filtered.length === 0 && (
            <div className="sc-card p-12 md:col-span-3 text-center" style={{ color: 'var(--sc-text-faint)' }}>No employees match your search or filters.</div>
          )}
        </div>
      )}

      {view === 'list' && (
        <motion.div className="sc-card p-4 overflow-x-auto sc-scroll" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <table className="sc-table">
            <thead><tr><th>EMPLOYEE</th><th>DEPARTMENT</th><th>LOCATION</th><th>TENURE</th><th>STATUS</th><th></th></tr></thead>
            <tbody>
              {filtered.map(emp => (
                <tr key={emp.id} data-testid={`emp-row-${emp.id}`}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="sc-avatar" style={{ background: `linear-gradient(135deg, ${emp.c}, ${emp.c}66)` }}>{emp.a}</div>
                      <div><div>{emp.n}</div><div style={{ fontSize: 11, color: 'var(--sc-text-faint)' }}>{emp.r}</div></div>
                    </div>
                  </td>
                  <td><span className="sc-chip">{emp.d}</span></td>
                  <td style={{ color: 'var(--sc-text-dim)' }}>{emp.l}</td>
                  <td>{emp.t}</td>
                  <td><span className={`sc-chip ${emp.s === 'active' ? 'sc-chip-success' : emp.s === 'leave' ? 'sc-chip-warning' : 'sc-chip-danger'}`}>{emp.s}</span></td>
                  <td>
                    <RowMenu items={[
                      { label: 'Edit', onClick: () => openEdit(emp) },
                      { label: 'Send message', onClick: () => push(`Message → ${emp.n}`, 'info') },
                      { label: 'Remove', onClick: () => setConfirmDel(emp), danger: true },
                    ]} />
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && <tr><td colSpan={6} style={{ textAlign: 'center', padding: 32, color: 'var(--sc-text-faint)' }}>No employees match your filters.</td></tr>}
            </tbody>
          </table>
        </motion.div>
      )}

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={editing ? 'Edit employee' : 'Add employee'}
        subtitle={editing ? `Update ${editing.n}'s record` : 'Add a new team member to the directory'}
        footer={
          <>
            <button className="sc-btn sc-btn-ghost" onClick={() => setDrawerOpen(false)}>Cancel</button>
            <button className="sc-btn sc-btn-primary" onClick={handleSubmit(onSubmit)} data-testid="drawer-submit">
              {editing ? 'Save changes' : 'Add employee'}
            </button>
          </>
        }
      >
        <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit(onSubmit)}>
          <ScInput
            label="Full name"
            placeholder="e.g. Ren Okada"
            data-testid="emp-name"
            wrapperClassName="col-span-2"
            error={errors.n?.message as string}
            {...register('n')}
            autoFocus
          />

          <ScInput
            label="Role"
            placeholder="e.g. Sr. Engineer"
            data-testid="emp-role"
            wrapperClassName="col-span-2"
            error={errors.r?.message as string}
            {...register('r')}
          />

          <Controller
            name="d"
            control={control}
            render={({ field }) => (
              <ScSelect
                label="Department"
                value={field.value}
                onChange={field.onChange}
                options={allDepartments.map(d => ({ label: d, value: d }))}
                data-testid="emp-dept"
                error={errors.d?.message as string}
              />
            )}
          />

          <Controller
            name="s"
            control={control}
            render={({ field }) => (
              <ScSelect
                label="Status"
                value={field.value}
                onChange={field.onChange}
                options={allStatuses.map(s => ({ label: s, value: s }))}
                error={errors.s?.message as string}
              />
            )}
          />

          <ScInput
            label="Email"
            type="email"
            placeholder="name@manatech.io"
            data-testid="emp-email"
            wrapperClassName="col-span-2"
            error={errors.e?.message as string}
            {...register('e')}
          />

          <ScInput
            label="Location"
            placeholder="City, Country"
            error={errors.l?.message as string}
            {...register('l')}
          />

          <ScInput
            label="Tenure"
            placeholder="e.g. 1y 4m"
            error={errors.t?.message as string}
            {...register('t')}
          />
        </form>
      </Drawer>

      <ConfirmDialog
        open={!!confirmDel}
        onClose={() => setConfirmDel(null)}
        onConfirm={() => confirmDel && remove(confirmDel)}
        title="Remove employee?"
        message={`This will remove "${confirmDel?.n}" from the directory. This action can't be undone.`}
        confirmLabel="Remove"
      />
    </DashboardShell>
  );
}
