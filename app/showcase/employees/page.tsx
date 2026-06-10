'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Filter, Mail, MapPin, Briefcase, Calendar, Phone, Plus } from 'lucide-react';
import DashboardShell from '@/components/showcase/DashboardShell';
import { Drawer, ConfirmDialog, Field, FilterPanel, FilterChip, RowMenu, SearchInput, useToast } from '@/components/showcase/Interactions';

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
  const [form, setForm] = React.useState(blank());

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

  const openCreate = () => { setEditing(null); setForm(blank()); setDrawerOpen(true); };
  const openEdit = (e: Employee) => {
    setEditing(e);
    setForm({ n: e.n, r: e.r, d: e.d, l: e.l, e: e.e, t: e.t, s: e.s });
    setDrawerOpen(true);
  };
  const submit = () => {
    if (!form.n.trim()) { push('Name is required', 'danger'); return; }
    if (!form.e.trim()) { push('Email is required', 'danger'); return; }
    if (editing) {
      setList(prev => prev.map(x => x.id === editing.id ? { ...editing, ...form } : x));
      push(`Updated · ${form.n}`);
    } else {
      const id = 'e' + Date.now();
      const c = COLORS[Math.floor(Math.random() * COLORS.length)];
      setList(prev => [{ id, ...form, a: initials(form.n), c }, ...prev]);
      push(`Added · ${form.n}`);
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
      subtitle={`${list.length} people across ${new Set(list.map(l => l.d)).size} departments, 4 timezones.`}
      breadcrumb={['Workspace', 'People', 'Directory']}
      actions={
        <>
          <div className="sc-tabs">
            <button className={`sc-tab ${view === 'grid' ? 'active' : ''}`} onClick={() => setView('grid')} data-testid="view-toggle-grid">Grid</button>
            <button className={`sc-tab ${view === 'list' ? 'active' : ''}`} onClick={() => setView('list')} data-testid="view-toggle-list">List</button>
          </div>
          <button className="sc-btn" onClick={() => setFilterOpen(!filterOpen)} data-testid="open-filters">
            <Filter size={13} />Filter{activeFilterCount > 0 && <span className="sc-chip sc-chip-accent" style={{ padding: '1px 6px', fontSize: 10 }}>{activeFilterCount}</span>}
          </button>
          <button className="sc-btn sc-btn-primary" onClick={openCreate} data-testid="add-employee"><Plus size={13} />Add employee</button>
        </>
      }
    >
      <motion.div className="sc-card p-4 mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <SearchInput value={search} onChange={setSearch} placeholder="Search by name, role, email or location..." testid="emp-search" width={1000} />
      </motion.div>

      <FilterPanel open={filterOpen}>
        <span style={{ fontSize: 11, color: 'var(--sc-text-faint)' }}>DEPARTMENT</span>
        {allDepartments.map(d => (
          <FilterChip key={d} active={depFilters.includes(d)}
            onClick={() => setDepFilters(p => p.includes(d) ? p.filter(x => x !== d) : [...p, d])}
            testid={`filter-dept-${d.toLowerCase()}`}>{d}</FilterChip>
        ))}
        <div className="h-5 w-px" style={{ background: 'var(--sc-border)' }} />
        <span style={{ fontSize: 11, color: 'var(--sc-text-faint)' }}>STATUS</span>
        {allStatuses.map(s => (
          <FilterChip key={s} active={statusFilters.includes(s)}
            onClick={() => setStatusFilters(p => p.includes(s) ? p.filter(x => x !== s) : [...p, s])}
            testid={`filter-status-${s}`}>{s}</FilterChip>
        ))}
        {activeFilterCount > 0 && (
          <button onClick={() => { setDepFilters([]); setStatusFilters([]); }}
                  className="sc-btn sc-btn-ghost ml-auto" style={{ padding: '6px 12px', fontSize: 11 }}>
            Clear filters
          </button>
        )}
      </FilterPanel>

      <div style={{ fontSize: 11, color: 'var(--sc-text-faint)', marginBottom: 12 }}>
        Showing {filtered.length} of {list.length}
      </div>

      {view === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((emp, i) => (
            <motion.div key={emp.id} className="sc-card p-5 sc-tilt"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
              data-testid={`emp-card-${emp.id}`}>
              <div className="flex items-start justify-between mb-4">
                <div className="sc-avatar relative" style={{ width: 56, height: 56, fontSize: 18, background: `linear-gradient(135deg, ${emp.c}, ${emp.c}66)` }}>
                  {emp.a}
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2"
                        style={{
                          background: emp.s === 'active' ? 'var(--sc-success)' : emp.s === 'leave' ? 'var(--sc-accent-5)' : 'var(--sc-danger)',
                          borderColor: 'var(--sc-bg)',
                        }} />
                </div>
                <RowMenu items={[
                  { label: 'Edit', onClick: () => openEdit(emp), testid: `edit-emp-${emp.id}` },
                  { label: 'Send message', onClick: () => push(`Message → ${emp.n}`, 'info') },
                  { label: 'Remove', onClick: () => setConfirmDel(emp), danger: true, testid: `delete-emp-${emp.id}` },
                ]} />
              </div>
              <div className="sc-sans" style={{ fontSize: 15, fontWeight: 600 }}>{emp.n}</div>
              <div style={{ fontSize: 12, color: 'var(--sc-text-dim)', marginTop: 2 }}>{emp.r}</div>
              <div className="mt-4 pt-4 border-t space-y-2" style={{ borderColor: 'var(--sc-border)', fontSize: 11, color: 'var(--sc-text-dim)' }}>
                <div className="flex items-center gap-2"><Briefcase size={11} />{emp.d}</div>
                <div className="flex items-center gap-2"><MapPin size={11} />{emp.l}</div>
                <div className="flex items-center gap-2"><Calendar size={11} />{emp.t} tenure</div>
              </div>
              <div className="mt-4 flex gap-2">
                <button onClick={() => push(`Drafting email to ${emp.n}...`, 'info')} className="sc-btn flex-1 justify-center" style={{ padding: '6px 0', fontSize: 11 }}><Mail size={11} />Message</button>
                <button onClick={() => openEdit(emp)} className="sc-btn" style={{ padding: '6px 10px', fontSize: 11 }}><Phone size={11} /></button>
              </div>
            </motion.div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full sc-card p-12 text-center" style={{ color: 'var(--sc-text-faint)' }}>
              No employees match your filters.{' '}
              <button onClick={() => { setSearch(''); setDepFilters([]); setStatusFilters([]); }} className="underline" style={{ color: 'var(--sc-accent)' }}>Clear all</button>
            </div>
          )}
        </div>
      ) : (
        <motion.div className="sc-card p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
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
            <button className="sc-btn sc-btn-primary" onClick={submit} data-testid="drawer-submit">
              {editing ? 'Save changes' : 'Add employee'}
            </button>
          </>
        }
      >
        <div className="grid grid-cols-2 gap-4">
          <Field label="Full name" span={2}>
            <input className="sc-input" value={form.n} onChange={(e) => setForm({ ...form, n: e.target.value })}
                   placeholder="e.g. Ren Okada" data-testid="emp-name" autoFocus />
          </Field>
          <Field label="Role" span={2}>
            <input className="sc-input" value={form.r} onChange={(e) => setForm({ ...form, r: e.target.value })}
                   placeholder="e.g. Sr. Engineer" data-testid="emp-role" />
          </Field>
          <Field label="Department">
            <select className="sc-input" value={form.d} onChange={(e) => setForm({ ...form, d: e.target.value })} data-testid="emp-dept">
              {allDepartments.map(d => <option key={d}>{d}</option>)}
            </select>
          </Field>
          <Field label="Status">
            <select className="sc-input" value={form.s} onChange={(e) => setForm({ ...form, s: e.target.value as Employee['s'] })}>
              {allStatuses.map(s => <option key={s}>{s}</option>)}
            </select>
          </Field>
          <Field label="Email" span={2}>
            <input type="email" className="sc-input" value={form.e} onChange={(e) => setForm({ ...form, e: e.target.value })}
                   placeholder="name@manatech.io" data-testid="emp-email" />
          </Field>
          <Field label="Location">
            <input className="sc-input" value={form.l} onChange={(e) => setForm({ ...form, l: e.target.value })} placeholder="City, Country" />
          </Field>
          <Field label="Tenure">
            <input className="sc-input" value={form.t} onChange={(e) => setForm({ ...form, t: e.target.value })} placeholder="e.g. 1y 4m" />
          </Field>
        </div>
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
