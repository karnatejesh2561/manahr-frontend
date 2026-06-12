'use client';

import React from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { Plus, Search, Filter, Shield, Check, X, Lock } from 'lucide-react';
import DashboardShell from '@/components/demos/DashboardShell';
import { Drawer, ConfirmDialog, FilterPanel, FilterChip, RowMenu, SearchInput, useToast } from '@/components/demos/Interactions';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema } from '@/components/demos/schemas';
import { ScInput, ScSelect, ScCheckbox } from '@/components/demos/FormFields';

type User = {
    id: string; n: string; r: string; d: string; s: 'active' | 'invited' | 'suspended';
    ls: string; a: string; c: string; mfa: boolean;
};

const initials = (n: string) => n.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase();
const COLORS = ['#b6ff3c', '#6affe0', '#ff6bcb', '#7a5cff', '#ffb547', '#5cf2a3', '#ff5e7e'];

const initial: User[] = [
    { id: 'u1', n: 'Akira Saito', r: 'Owner', d: 'akira@manatech.io', s: 'active', ls: '2m ago', a: 'AS', c: '#b6ff3c', mfa: true },
    { id: 'u2', n: 'Yui Tanaka', r: 'Admin', d: 'yui@manatech.io', s: 'active', ls: '18m ago', a: 'YT', c: '#6affe0', mfa: true },
    { id: 'u3', n: 'Marcus Hale', r: 'Manager', d: 'marcus@manatech.io', s: 'active', ls: '1h ago', a: 'MH', c: '#ff6bcb', mfa: false },
    { id: 'u4', n: 'Sofia Reyes', r: 'Member', d: 'sofia@manatech.io', s: 'active', ls: '3h ago', a: 'SR', c: '#7a5cff', mfa: true },
    { id: 'u5', n: 'Leon Park', r: 'Member', d: 'leon@manatech.io', s: 'invited', ls: '—', a: 'LP', c: '#ffb547', mfa: false },
    { id: 'u6', n: 'Hiroko Sato', r: 'Member', d: 'hiroko@manatech.io', s: 'active', ls: '2d ago', a: 'HS', c: '#5cf2a3', mfa: true },
    { id: 'u7', n: 'Ren Okada', r: 'Viewer', d: 'ren@manatech.io', s: 'suspended', ls: '7d ago', a: 'RO', c: '#ff5e7e', mfa: false },
];

const permissions = ['View Dashboards', 'Edit Reports', 'Manage Users', 'Manage Billing', 'API Access', 'Delete Records'];
const roleList = ['Owner', 'Admin', 'Manager', 'Member', 'Viewer'];
const matrix: Record<string, boolean[]> = {
    Owner: [true, true, true, true, true, true],
    Admin: [true, true, true, true, true, false],
    Manager: [true, true, false, false, true, false],
    Member: [true, false, false, false, false, false],
    Viewer: [true, false, false, false, false, false],
};
const allStatuses: User['s'][] = ['active', 'invited', 'suspended'];

const blank = () => ({ n: '', r: 'Member', d: '', s: 'invited' as User['s'], mfa: false });

function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
    const count = useMotionValue(0);
    const rounded = useTransform(count, latest => Math.round(latest));
    React.useEffect(() => { const controls = animate(0, value, { duration: 1 }); return controls.stop; }, [value]);
    return <><motion.span>{rounded}</motion.span>{suffix}</>;
}

export default function UsersWrapper() {
    const [list, setList] = React.useState<User[]>(initial);
    const [search, setSearch] = React.useState('');
    const [filterOpen, setFilterOpen] = React.useState(false);
    const [roleFilters, setRoleFilters] = React.useState<string[]>([]);
    const [statusFilters, setStatusFilters] = React.useState<User['s'][]>([]);
    const [mfaOnly, setMfaOnly] = React.useState(false);

    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [editing, setEditing] = React.useState<User | null>(null);

    const { register, handleSubmit, control, reset, formState: { errors } } = useForm({
        resolver: zodResolver(userSchema),
        defaultValues: blank()
    });

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

    const openCreate = () => {
        setEditing(null);
        reset(blank());
        setDrawerOpen(true);
    };
    const openEdit = (u: User) => {
        setEditing(u);
        reset({ n: u.n, r: u.r, d: u.d, s: u.s, mfa: u.mfa });
        setDrawerOpen(true);
    };
    const onSubmit = (data: any) => {
        if (editing) {
            setList(prev => prev.map(x => x.id === editing.id ? { ...editing, ...data } : x));
            push(`Updated · ${data.n}`);
        } else {
            const id = 'u' + Date.now();
            const c = COLORS[Math.floor(Math.random() * COLORS.length)];
            setList(prev => [{ id, ...data, a: initials(data.n), c, ls: '—' }, ...prev]);
            push(`Invite sent · ${data.n}`);
        }
        setDrawerOpen(false);
    };
    const remove = (u: User) => { setList(prev => prev.filter(x => x.id !== u.id)); push(`Removed · ${u.n}`, 'info'); };
    const toggleMfa = (u: User) => {
        setList(prev => prev.map(x => x.id === u.id ? { ...x, mfa: !x.mfa } : x));
        push(`MFA toggled for ${u.n}`);
    };

    const activeFilterCount = roleFilters.length + statusFilters.length + (mfaOnly ? 1 : 0);

    return (
        <DashboardShell
            title="Users & permissions"
            subtitle="Invite members, control roles and monitor security configurations."
            breadcrumb={['Workspace', 'Admin', 'Users']}
            actions={
                <>
                    <button className="sc-btn" onClick={() => setFilterOpen(!filterOpen)} data-testid="open-filters">
                        <Filter size={13} />Filter{activeFilterCount > 0 && <span className="sc-chip sc-chip-accent" style={{ padding: '1px 6px', fontSize: 10 }}>{activeFilterCount}</span>}
                    </button>
                    <button className="sc-btn sc-btn-primary" onClick={openCreate} data-testid="invite-user"><Plus size={13} />Invite member</button>
                </>
            }
        >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[
                    { l: 'Total members', v: totals.total, suffix: '', c: '#b6ff3c' },
                    { l: 'Active today', v: totals.activeToday, suffix: '', c: '#6affe0' },
                    { l: 'Pending invites', v: totals.pending, suffix: '', c: '#ff6bcb' },
                    { l: 'MFA enabled', v: totals.mfaPct, suffix: '%', c: '#ffb547' },
                ].map((k, i) => (
                    <motion.div key={k.l} className="sc-card p-5"
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                        <div style={{ fontSize: 11, color: 'var(--sc-text-faint)' }}>{k.l.toUpperCase()}</div>
                        <div className="sc-stat-value mt-3" style={{ color: k.c }}>
                            <AnimatedNumber value={k.v} suffix={k.suffix} />
                        </div>
                    </motion.div>
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
                <FilterChip active={mfaOnly} onClick={() => setMfaOnly(!mfaOnly)} testid="filter-mfa">MFA required</FilterChip>
                {activeFilterCount > 0 && (
                    <button onClick={() => { setRoleFilters([]); setStatusFilters([]); setMfaOnly(false); }}
                        className="sc-btn sc-btn-ghost ml-auto" style={{ padding: '6px 12px', fontSize: 11 }}>Clear filters</button>
                )}
            </FilterPanel>

            <motion.div className="sc-card p-6 mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
                <div className="flex items-center justify-between mb-4">
                    <div className="sc-sans" style={{ fontSize: 14, fontWeight: 600 }}>Team directory</div>
                    <SearchInput value={search} onChange={setSearch} placeholder="Search members..." testid="user-search" />
                </div>
                <div className="overflow-x-auto sc-scroll">
                    <table className="sc-table">
                        <thead>
                            <tr>
                                <th style={{ width: 40 }}><input type="checkbox" /></th>
                                <th>MEMBER</th><th>EMAIL</th><th>ROLE</th><th>MFA STATUS</th><th>LAST ACTIVE</th><th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((u) => (
                                <tr key={u.id} data-testid={`user-row-${u.id}`}>
                                    <td><input type="checkbox" /></td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="sc-avatar" style={{ background: `linear-gradient(135deg, ${u.c}, ${u.c}66)` }}>{u.a}</div>
                                            <div>
                                                <div style={{ fontWeight: 500 }}>{u.n}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ color: 'var(--sc-text-dim)' }}>{u.d}</td>
                                    <td><span className="sc-chip sc-chip-violet">{u.r}</span></td>
                                    <td>
                                        <button onClick={() => toggleMfa(u)} className={`sc-chip ${u.mfa ? 'sc-chip-success' : 'sc-chip-danger'}`} style={{ cursor: 'pointer' }}>
                                            {u.mfa ? 'Enabled' : 'Disabled'}
                                        </button>
                                    </td>
                                    <td style={{ color: 'var(--sc-text-faint)' }}>{u.ls}</td>
                                    <td>
                                        <RowMenu items={[
                                            { label: 'Edit user', onClick: () => openEdit(u), testid: `edit-user-${u.id}` },
                                            { label: 'Toggle MFA requirement', onClick: () => toggleMfa(u) },
                                            { label: 'Revoke access', onClick: () => setConfirmDel(u), danger: true, testid: `delete-user-${u.id}` },
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
                        <button className="sc-btn sc-btn-primary" onClick={handleSubmit(onSubmit)} data-testid="drawer-submit">
                            {editing ? 'Save changes' : 'Send invite'}
                        </button>
                    </>
                }
            >
                <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit(onSubmit)}>
                    <ScInput
                        label="Full name"
                        placeholder="Jane Doe"
                        data-testid="user-name"
                        wrapperClassName="col-span-2"
                        error={errors.n?.message as string}
                        {...register('n')}
                        autoFocus
                    />

                    <ScInput
                        label="Email"
                        type="email"
                        placeholder="jane@company.com"
                        data-testid="user-email"
                        wrapperClassName="col-span-2"
                        error={errors.d?.message as string}
                        {...register('d')}
                    />

                    <Controller
                        name="r"
                        control={control}
                        render={({ field }) => (
                            <ScSelect
                                label="Role"
                                value={field.value}
                                onChange={field.onChange}
                                options={roleList.map(r => ({ label: r, value: r }))}
                                data-testid="user-role"
                                error={errors.r?.message as string}
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

                    <div className="col-span-2 mt-2">
                        <ScCheckbox
                            label={
                                <div>
                                    <div style={{ fontSize: 13, color: 'var(--sc-text)' }}>Require MFA from first login</div>
                                    <div style={{ fontSize: 11, color: 'var(--sc-text-faint)', marginTop: 2 }}>Recommended for compliance</div>
                                </div>
                            }
                            error={errors.mfa?.message as string}
                            {...register('mfa')}
                        />
                    </div>
                </form>
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
