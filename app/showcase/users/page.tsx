'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, Shield, Check, X, Lock } from 'lucide-react';
import DashboardShell from '@/components/showcase/DashboardShell';
import { Drawer, ConfirmDialog, Field, FilterPanel, FilterChip, RowMenu, SearchInput, useToast } from '@/components/showcase/Interactions';

type User = {
  id: string; n: string; r: string; d: string; s: 'active' | 'invited' | 'suspended';
  ls: string; a: string; c: string; mfa: boolean;
};

const initials = (n: string) => n.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase();
const COLORS = ['#b6ff3c', '#6affe0', '#ff6bcb', '#7a5cff', '#ffb547', '#5cf2a3', '#ff5e7e'];

const initial: User[] = [
  { id: 'u1', n: 'Akira Saito',   r: 'Owner',     d: 'akira@manatech.io',    s: 'active',  ls: '2m ago', a: 'AS', c: '#b6ff3c', mfa: true },
  { id: 'u2', n: 'Yui Tanaka',    r: 'Admin',     d: 'yui@manatech.io',      s: 'active',  ls: '18m ago', a: 'YT', c: '#6affe0', mfa: true },
  { id: 'u3', n: 'Marcus Hale',   r: 'Manager',   d: 'marcus@manatech.io',   s: 'active',  ls: '1h ago', a: 'MH', c: '#ff6bcb', mfa: false },
  { id: 'u4', n: 'Sofia Reyes',   r: 'Member',    d: 'sofia@manatech.io',    s: 'active',  ls: '3h ago', a: 'SR', c: '#7a5cff', mfa: true },
  { id: 'u5', n: 'Leon Park',     r: 'Member',    d: 'leon@manatech.io',     s: 'invited', ls: '—', a: 'LP', c: '#ffb547', mfa: false },
  { id: 'u6', n: 'Hiroko Sato',   r: 'Member',    d: 'hiroko@manatech.io',   s: 'active',  ls: '2d ago', a: 'HS', c: '#5cf2a3', mfa: true },
  { id: 'u7', n: 'Ren Okada',     r: 'Viewer',    d: 'ren@manatech.io',      s: 'suspended', ls: '7d ago', a: 'RO', c: '#ff5e7e', mfa: false },
];

const permissions = ['View Dashboards', 'Edit Reports', 'Manage Users', 'Manage Billing', 'API Access', 'Delete Records'];
const roleList = ['Owner', 'Admin', 'Manager', 'Member', 'Viewer'];
const matrix: Record<string, boolean[]> = {
  Owner:   [true,  true,  true,  true,  true,  true ],
  Admin:   [true,  true,  true,  true,  true,  false],
  Manager: [true,  true,  false, false, true,  false],
  Member:  [true,  false, false, false, false, false],
  Viewer:  [true,  false, false, false, false, false],
};
const allStatuses: User['s'][] = ['active', 'invited', 'suspended'];

const blank = () => ({ n: '', r: 'Member', d: '', s: 'invited' as User['s'], mfa: false });

export default function UsersPage() {
  const [list, setList] = React.useState<User[]>(initial);
  const [search, setSearch] = React.useState('');
  const [filterOpen, setFilterOpen] = React.useState(false);
  const [roleFilters, setRoleFilters] = React.useState<string[]>([]);
  const [statusFilters, setStatusFilters] = React.useState<User['s'][]>([]);
  const [mfaOnly, setMfaOnly] = React.useState(false);

  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<User | null>(null);
  const [form, setForm] = React.useState(blank());

  const [confirmDel, setConfirmDel] = React.useState<User | null>(null);
  const { push } = useToast();

  const filtered = list.filter(u => {
    if (search) {
      const q = search.toLowerCase();
      if (![u.n, u.d, u.r].some(x => x.toLowerCase().includes(q))) return false;
    }
    if (roleFilters.length && !roleFilters.includes(u.r)) return false;
    if (statusFilters.length && !statusFilters.includes(u.s)) return false;
    if (mfaOnly && !u.mfa) return false;
    return true;
  });

  const totals = {
    total: list.length,
    activeToday: list.filter(u => u.s === 'active').length,
    pending: list.filter(u => u.s === 'invited').length,
    mfaPct: Math.round((list.filter(u => u.mfa).length / list.length) * 100),
  };

  const openCreate = () => { setEditing(null); setForm(blank()); setDrawerOpen(true); };
  const openEdit = (u: User) => {
    setEditing(u);
    setForm({ n: u.n, r: u.r, d: u.d, s: u.s, mfa: u.mfa });
    setDrawerOpen(true);
  };
  const submit = () => {
    if (!form.n.trim()) { push('Name is required', 'danger'); return; }
    if (!form.d.trim()) { push('Email is required', 'danger'); return; }
    if (editing) {
      setList(prev => prev.map(x => x.id === editing.id ? { ...editing, ...form } : x));
      push(`Updated · ${form.n}`);
    } else {
      const id = 'u' + Date.now();
      const c = COLORS[Math.floor(Math.random() * COLORS.length)];
      setList(prev => [{ id, ...form, a: initials(form.n), c, ls: '—' }, ...prev]);
      push(`Invite sent · ${form.n}`);
    }
    setDrawerOpen(false);
  };
  const remove = (u: User) => { setList(prev => prev.filter(x => x.id !== u.id)); push(`Removed · ${u.n}`, 'info'); };
  const toggleMfa = (u: User) => {
    setList(prev => prev.map(x => x.id === u.id ? { ...x, mfa: !x.mfa } : x));
    push(`MFA ${u.mfa ? 'disabled' : 'enabled'} · ${u.n}`, u.mfa ? 'info' : 'success');
  };
  const toggleSuspend = (u: User) => {
    const next: User['s'] = u.s === 'suspended' ? 'active' : 'suspended';
    setList(prev => prev.map(x => x.id === u.id ? { ...x, s: next } : x));
    push(`${u.n} → ${next}`, next === 'suspended' ? 'danger' : 'success');
  };

  const activeFilterCount = roleFilters.length + statusFilters.length + (mfaOnly ? 1 : 0);

  return (
    <DashboardShell
      title="Users & roles"
      subtitle="Granular RBAC, SSO, MFA — manage who sees what."
      breadcrumb={['Workspace', 'Admin', 'Users & roles']}
      actions={
        <>
          <button className="sc-btn" onClick={() => setFilterOpen(!filterOpen)} data-testid="open-filters">
            <Filter size={13} />Filter{activeFilterCount > 0 && <span className="sc-chip sc-chip-accent" style={{ padding: '1px 6px', fontSize: 10 }}>{activeFilterCount}</span>}
          </button>
          <button className="sc-btn sc-btn-primary" onClick={openCreate} data-testid="invite-user"><Plus size={13} />Invite user</button>
        </>
      }
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { l: 'Total users', v: totals.total, c: '#b6ff3c' },
          { l: 'Active', v: totals.activeToday, c: '#6affe0' },
          { l: 'Pending invites', v: totals.pending, c: '#ffb547' },
          { l: 'MFA enabled', v: `${totals.mfaPct}%`, c: '#7a5cff' },
        ].map(k => (
          <div key={k.l} className="sc-card p-5">
            <div style={{ fontSize: 11, color: 'var(--sc-text-faint)' }}>{k.l.toUpperCase()}</div>
            <div className="sc-stat-value mt-2" style={{ color: k.c }}>{k.v}</div>
          </div>
        ))}
      </div>

      <FilterPanel open={filterOpen}>
        <span style={{ fontSize: 11, color: 'var(--sc-text-faint)' }}>ROLE</span>
        {roleList.map(r => (
          <FilterChip key={r} active={roleFilters.includes(r)}
            onClick={() => setRoleFilters(p => p.includes(r) ? p.filter(x => x !== r) : [...p, r])}
            testid={`filter-role-${r.toLowerCase()}`}>{r}</FilterChip>
        ))}
        <div className="h-5 w-px" style={{ background: 'var(--sc-border)' }} />
        <span style={{ fontSize: 11, color: 'var(--sc-text-faint)' }}>STATUS</span>
        {allStatuses.map(s => (
          <FilterChip key={s} active={statusFilters.includes(s)}
            onClick={() => setStatusFilters(p => p.includes(s) ? p.filter(x => x !== s) : [...p, s])}
            testid={`filter-status-${s}`}>{s}</FilterChip>
        ))}
        <div className="h-5 w-px" style={{ background: 'var(--sc-border)' }} />
        <FilterChip active={mfaOnly} onClick={() => setMfaOnly(!mfaOnly)} testid="filter-mfa">MFA enabled only</FilterChip>
        {activeFilterCount > 0 && (
          <button onClick={() => { setRoleFilters([]); setStatusFilters([]); setMfaOnly(false); }}
                  className="sc-btn sc-btn-ghost ml-auto" style={{ padding: '6px 12px', fontSize: 11 }}>Clear filters</button>
        )}
      </FilterPanel>

      <motion.div className="sc-card p-6 mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="flex justify-between items-center mb-4">
          <div className="sc-sans" style={{ fontSize: 14, fontWeight: 600 }}>Team members ({filtered.length})</div>
          <SearchInput value={search} onChange={setSearch} placeholder="Search users..." testid="user-search" />
        </div>
        <div className="overflow-x-auto sc-scroll">
          <table className="sc-table">
            <thead><tr><th></th><th>USER</th><th>ROLE</th><th>STATUS</th><th>MFA</th><th>LAST SEEN</th><th></th></tr></thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.id} data-testid={`user-row-${u.id}`}>
                  <td style={{ width: 40 }}><input type="checkbox" /></td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="sc-avatar" style={{ background: `linear-gradient(135deg, ${u.c}, ${u.c}66)` }}>{u.a}</div>
                      <div><div>{u.n}</div><div style={{ fontSize: 11, color: 'var(--sc-text-faint)' }}>{u.d}</div></div>
                    </div>
                  </td>
                  <td><span className="sc-chip sc-chip-violet">{u.r}</span></td>
                  <td><span className={`sc-chip ${u.s === 'active' ? 'sc-chip-success' : u.s === 'invited' ? 'sc-chip-info' : 'sc-chip-danger'}`}>{u.s}</span></td>
                  <td>
                    {u.mfa
                      ? <span className="inline-flex items-center gap-1.5" style={{ fontSize: 11, color: 'var(--sc-success)' }}><Shield size={11} />on</span>
                      : <span className="inline-flex items-center gap-1.5" style={{ fontSize: 11, color: 'var(--sc-text-faint)' }}><Lock size={11} />off</span>}
                  </td>
                  <td style={{ color: 'var(--sc-text-dim)' }}>{u.ls}</td>
                  <td>
                    <RowMenu items={[
                      { label: 'Edit', onClick: () => openEdit(u), testid: `edit-user-${u.id}` },
                      { label: u.mfa ? 'Disable MFA' : 'Enable MFA', onClick: () => toggleMfa(u) },
                      { label: u.s === 'suspended' ? 'Reactivate' : 'Suspend', onClick: () => toggleSuspend(u) },
                      { label: 'Remove', onClick: () => setConfirmDel(u), danger: true, testid: `delete-user-${u.id}` },
                    ]} />
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={7} style={{ textAlign: 'center', padding: 32, color: 'var(--sc-text-faint)' }}>No users match your filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      <motion.div className="sc-card p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <div className="flex justify-between items-start mb-5">
          <div>
            <div className="sc-sans" style={{ fontSize: 14, fontWeight: 600 }}>Permission matrix</div>
            <div style={{ fontSize: 11, color: 'var(--sc-text-faint)', marginTop: 4 }}>Define what each role can do</div>
          </div>
          <button className="sc-btn sc-btn-ghost" style={{ fontSize: 11 }} onClick={() => push('Custom role creation opens here', 'info')}>Create custom role</button>
        </div>
        <div className="overflow-x-auto sc-scroll">
          <table className="sc-table">
            <thead><tr><th>ROLE</th>{permissions.map(p => <th key={p}>{p.toUpperCase()}</th>)}</tr></thead>
            <tbody>
              {roleList.map(r => (
                <tr key={r}>
                  <td><span className="sc-chip sc-chip-violet">{r}</span></td>
                  {matrix[r].map((on, i) => (
                    <td key={i}>
                      {on
                        ? <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: 'rgba(182,255,60,0.15)', border: '1px solid rgba(182,255,60,0.3)' }}><Check size={12} style={{ color: 'var(--sc-accent)' }} /></div>
                        : <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--sc-border)' }}><X size={12} style={{ color: 'var(--sc-text-faint)' }} /></div>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={editing ? 'Edit user' : 'Invite user'}
        subtitle={editing ? `Update ${editing.n}'s access` : 'Send an invite to a new team member'}
        footer={
          <>
            <button className="sc-btn sc-btn-ghost" onClick={() => setDrawerOpen(false)}>Cancel</button>
            <button className="sc-btn sc-btn-primary" onClick={submit} data-testid="drawer-submit">
              {editing ? 'Save changes' : 'Send invite'}
            </button>
          </>
        }
      >
        <div className="grid grid-cols-2 gap-4">
          <Field label="Full name" span={2}>
            <input className="sc-input" value={form.n} onChange={(e) => setForm({ ...form, n: e.target.value })}
                   placeholder="Jane Doe" data-testid="user-name" autoFocus />
          </Field>
          <Field label="Email" span={2}>
            <input type="email" className="sc-input" value={form.d} onChange={(e) => setForm({ ...form, d: e.target.value })}
                   placeholder="jane@company.com" data-testid="user-email" />
          </Field>
          <Field label="Role">
            <select className="sc-input" value={form.r} onChange={(e) => setForm({ ...form, r: e.target.value })} data-testid="user-role">
              {roleList.map(r => <option key={r}>{r}</option>)}
            </select>
          </Field>
          <Field label="Status">
            <select className="sc-input" value={form.s} onChange={(e) => setForm({ ...form, s: e.target.value as User['s'] })}>
              {allStatuses.map(s => <option key={s}>{s}</option>)}
            </select>
          </Field>
          <div className="col-span-2">
            <label className="flex items-center gap-2 cursor-pointer p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid var(--sc-border)' }}>
              <input type="checkbox" checked={form.mfa} onChange={(e) => setForm({ ...form, mfa: e.target.checked })} />
              <div>
                <div style={{ fontSize: 13 }}>Require MFA from first login</div>
                <div style={{ fontSize: 11, color: 'var(--sc-text-faint)', marginTop: 2 }}>Recommended for compliance</div>
              </div>
            </label>
          </div>
        </div>
      </Drawer>

      <ConfirmDialog
        open={!!confirmDel}
        onClose={() => setConfirmDel(null)}
        onConfirm={() => confirmDel && remove(confirmDel)}
        title="Remove user?"
        message={`This will revoke access for "${confirmDel?.n}" immediately.`}
        confirmLabel="Remove access"
      />
    </DashboardShell>
  );
}
