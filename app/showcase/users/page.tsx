'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, MoreHorizontal, Shield, Check, X, Lock } from 'lucide-react';
import DashboardShell from '@/components/showcase/DashboardShell';

const users = [
  { n: 'Akira Saito',   r: 'Owner',     d: 'akira@manatech.io',    s: 'active',  ls: '2m ago', a: 'AS', c: '#b6ff3c', mfa: true },
  { n: 'Yui Tanaka',    r: 'Admin',     d: 'yui@manatech.io',      s: 'active',  ls: '18m ago', a: 'YT', c: '#6affe0', mfa: true },
  { n: 'Marcus Hale',   r: 'Manager',   d: 'marcus@manatech.io',   s: 'active',  ls: '1h ago', a: 'MH', c: '#ff6bcb', mfa: false },
  { n: 'Sofia Reyes',   r: 'Member',    d: 'sofia@manatech.io',    s: 'active',  ls: '3h ago', a: 'SR', c: '#7a5cff', mfa: true },
  { n: 'Leon Park',     r: 'Member',    d: 'leon@manatech.io',     s: 'invited', ls: '—', a: 'LP', c: '#ffb547', mfa: false },
  { n: 'Hiroko Sato',   r: 'Member',    d: 'hiroko@manatech.io',   s: 'active',  ls: '2d ago', a: 'HS', c: '#5cf2a3', mfa: true },
  { n: 'Ren Okada',     r: 'Viewer',    d: 'ren@manatech.io',      s: 'suspended', ls: '7d ago', a: 'RO', c: '#ff5e7e', mfa: false },
];

const permissions = ['View Dashboards', 'Edit Reports', 'Manage Users', 'Manage Billing', 'API Access', 'Delete Records'];
const roles = ['Owner', 'Admin', 'Manager', 'Member', 'Viewer'];
const matrix: Record<string, boolean[]> = {
  Owner:   [true,  true,  true,  true,  true,  true ],
  Admin:   [true,  true,  true,  true,  true,  false],
  Manager: [true,  true,  false, false, true,  false],
  Member:  [true,  false, false, false, false, false],
  Viewer:  [true,  false, false, false, false, false],
};

export default function UsersPage() {
  return (
    <DashboardShell
      title="Users & roles"
      subtitle="Granular RBAC, SSO, MFA — manage who sees what."
      breadcrumb={['Workspace', 'Admin', 'Users & roles']}
      actions={
        <>
          <button className="sc-btn"><Filter size={13} />Filter</button>
          <button className="sc-btn sc-btn-primary"><Plus size={13} />Invite user</button>
        </>
      }
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { l: 'Total users', v: '248', c: '#b6ff3c' },
          { l: 'Active today', v: '184', c: '#6affe0' },
          { l: 'Pending invites', v: '12', c: '#ffb547' },
          { l: 'MFA enabled', v: '92%', c: '#7a5cff' },
        ].map(k => (
          <div key={k.l} className="sc-card p-5">
            <div style={{ fontSize: 11, color: 'var(--sc-text-faint)' }}>{k.l.toUpperCase()}</div>
            <div className="sc-stat-value mt-2" style={{ color: k.c }}>{k.v}</div>
          </div>
        ))}
      </div>

      {/* Users table */}
      <motion.div className="sc-card p-6 mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="flex justify-between items-center mb-4">
          <div className="sc-sans" style={{ fontSize: 14, fontWeight: 600 }}>Team members</div>
          <div className="relative">
            <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--sc-text-faint)' }} />
            <input className="sc-input pl-8" placeholder="Search users..." style={{ width: 240 }} data-testid="user-search" />
          </div>
        </div>
        <div className="overflow-x-auto sc-scroll">
          <table className="sc-table">
            <thead><tr><th></th><th>USER</th><th>ROLE</th><th>STATUS</th><th>MFA</th><th>LAST SEEN</th><th></th></tr></thead>
            <tbody>
              {users.map((u, i) => (
                <tr key={i}>
                  <td style={{ width: 40 }}><input type="checkbox" /></td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="sc-avatar" style={{ background: `linear-gradient(135deg, ${u.c}, ${u.c}66)` }}>{u.a}</div>
                      <div>
                        <div>{u.n}</div>
                        <div style={{ fontSize: 11, color: 'var(--sc-text-faint)' }}>{u.d}</div>
                      </div>
                    </div>
                  </td>
                  <td><span className="sc-chip sc-chip-violet">{u.r}</span></td>
                  <td>
                    <span className={`sc-chip ${u.s === 'active' ? 'sc-chip-success' : u.s === 'invited' ? 'sc-chip-info' : 'sc-chip-danger'}`}>
                      {u.s}
                    </span>
                  </td>
                  <td>
                    {u.mfa
                      ? <span className="inline-flex items-center gap-1.5" style={{ fontSize: 11, color: 'var(--sc-success)' }}><Shield size={11} />on</span>
                      : <span className="inline-flex items-center gap-1.5" style={{ fontSize: 11, color: 'var(--sc-text-faint)' }}><Lock size={11} />off</span>}
                  </td>
                  <td style={{ color: 'var(--sc-text-dim)' }}>{u.ls}</td>
                  <td><button className="p-1.5 rounded-lg hover:bg-white/5"><MoreHorizontal size={12} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Permission matrix */}
      <motion.div className="sc-card p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <div className="flex justify-between items-start mb-5">
          <div>
            <div className="sc-sans" style={{ fontSize: 14, fontWeight: 600 }}>Permission matrix</div>
            <div style={{ fontSize: 11, color: 'var(--sc-text-faint)', marginTop: 4 }}>Define what each role can do</div>
          </div>
          <button className="sc-btn sc-btn-ghost" style={{ fontSize: 11 }}>Create custom role</button>
        </div>
        <div className="overflow-x-auto sc-scroll">
          <table className="sc-table">
            <thead>
              <tr>
                <th>ROLE</th>
                {permissions.map(p => <th key={p}>{p.toUpperCase()}</th>)}
              </tr>
            </thead>
            <tbody>
              {roles.map(r => (
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
    </DashboardShell>
  );
}
