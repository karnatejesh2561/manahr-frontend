'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MoreHorizontal, Mail, MapPin, Briefcase, Calendar, Phone } from 'lucide-react';
import DashboardShell from '@/components/showcase/DashboardShell';

const employees = [
  { n: 'Akira Saito', r: 'Founder · CEO', d: 'Executive', l: 'Tokyo, JP', e: 'akira@manatech.io', t: '5y 4m', a: 'AS', c: '#b6ff3c', s: 'active' },
  { n: 'Yui Tanaka', r: 'VP Sales', d: 'Sales', l: 'Tokyo, JP', e: 'yui@manatech.io', t: '3y 2m', a: 'YT', c: '#6affe0', s: 'active' },
  { n: 'Marcus Hale', r: 'Sr. Engineer', d: 'Engineering', l: 'NYC, US', e: 'marcus@manatech.io', t: '2y 8m', a: 'MH', c: '#ff6bcb', s: 'active' },
  { n: 'Sofia Reyes', r: 'Product Designer', d: 'Design', l: 'Madrid, ES', e: 'sofia@manatech.io', t: '1y 4m', a: 'SR', c: '#7a5cff', s: 'active' },
  { n: 'Leon Park', r: 'Data Engineer', d: 'Engineering', l: 'Seoul, KR', e: 'leon@manatech.io', t: '2y 0m', a: 'LP', c: '#ffb547', s: 'leave' },
  { n: 'Hiroko Sato', r: 'HR Lead', d: 'People', l: 'Tokyo, JP', e: 'hiroko@manatech.io', t: '4y 1m', a: 'HS', c: '#5cf2a3', s: 'active' },
  { n: 'Ren Okada', r: 'Jr. Engineer', d: 'Engineering', l: 'Tokyo, JP', e: 'ren@manatech.io', t: '4m', a: 'RO', c: '#ff5e7e', s: 'active' },
  { n: 'Chloe Bauer', r: 'Marketing Lead', d: 'Marketing', l: 'Berlin, DE', e: 'chloe@manatech.io', t: '1y 11m', a: 'CB', c: '#b6ff3c', s: 'active' },
  { n: 'Diego Costa', r: 'Customer Success', d: 'Operations', l: 'São Paulo, BR', e: 'diego@manatech.io', t: '2y 4m', a: 'DC', c: '#6affe0', s: 'active' },
];

export default function EmployeesPage() {
  const [view, setView] = React.useState<'grid' | 'list'>('grid');
  return (
    <DashboardShell
      title="Employee directory"
      subtitle="248 people across 9 departments, 4 timezones."
      breadcrumb={['Workspace', 'People', 'Directory']}
      actions={
        <>
          <div className="sc-tabs">
            <div className={`sc-tab ${view === 'grid' ? 'active' : ''}`} onClick={() => setView('grid')}>Grid</div>
            <div className={`sc-tab ${view === 'list' ? 'active' : ''}`} onClick={() => setView('list')}>List</div>
          </div>
          <button className="sc-btn"><Filter size={13} />Filter</button>
          <button className="sc-btn sc-btn-primary">+ Add employee</button>
        </>
      }
    >
      {/* Filters */}
      <motion.div className="sc-card p-4 mb-6 flex flex-wrap gap-3 items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="relative flex-1 min-w-[200px]">
          <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--sc-text-faint)' }} />
          <input className="sc-input pl-8" placeholder="Search by name, role, email..." data-testid="emp-search" />
        </div>
        {['All Departments', 'Engineering', 'Sales', 'Design', 'People', 'Operations'].map((d, i) => (
          <button key={d} className={`sc-chip ${i === 0 ? 'sc-chip-accent' : ''}`} style={{ cursor: 'pointer' }}>{d}</button>
        ))}
      </motion.div>

      {view === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {employees.map((e, i) => (
            <motion.div key={e.n} className="sc-card p-5 sc-tilt"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
              <div className="flex items-start justify-between mb-4">
                <div className="sc-avatar relative" style={{ width: 56, height: 56, fontSize: 18, background: `linear-gradient(135deg, ${e.c}, ${e.c}66)` }}>
                  {e.a}
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2"
                        style={{ background: e.s === 'active' ? 'var(--sc-success)' : 'var(--sc-accent-5)', borderColor: 'var(--sc-bg)' }} />
                </div>
                <button className="p-1.5 rounded-lg hover:bg-white/5"><MoreHorizontal size={12} /></button>
              </div>
              <div className="sc-sans" style={{ fontSize: 15, fontWeight: 600 }}>{e.n}</div>
              <div style={{ fontSize: 12, color: 'var(--sc-text-dim)', marginTop: 2 }}>{e.r}</div>
              <div className="mt-4 pt-4 border-t space-y-2" style={{ borderColor: 'var(--sc-border)', fontSize: 11, color: 'var(--sc-text-dim)' }}>
                <div className="flex items-center gap-2"><Briefcase size={11} />{e.d}</div>
                <div className="flex items-center gap-2"><MapPin size={11} />{e.l}</div>
                <div className="flex items-center gap-2"><Calendar size={11} />{e.t} tenure</div>
              </div>
              <div className="mt-4 flex gap-2">
                <button className="sc-btn flex-1 justify-center" style={{ padding: '6px 0', fontSize: 11 }}><Mail size={11} />Message</button>
                <button className="sc-btn" style={{ padding: '6px 10px', fontSize: 11 }}><Phone size={11} /></button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div className="sc-card p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <table className="sc-table">
            <thead><tr><th>EMPLOYEE</th><th>DEPARTMENT</th><th>LOCATION</th><th>TENURE</th><th>STATUS</th><th></th></tr></thead>
            <tbody>
              {employees.map((e, i) => (
                <tr key={i}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="sc-avatar" style={{ background: `linear-gradient(135deg, ${e.c}, ${e.c}66)` }}>{e.a}</div>
                      <div><div>{e.n}</div><div style={{ fontSize: 11, color: 'var(--sc-text-faint)' }}>{e.r}</div></div>
                    </div>
                  </td>
                  <td><span className="sc-chip">{e.d}</span></td>
                  <td style={{ color: 'var(--sc-text-dim)' }}>{e.l}</td>
                  <td>{e.t}</td>
                  <td><span className={`sc-chip ${e.s === 'active' ? 'sc-chip-success' : 'sc-chip-warning'}`}>{e.s}</span></td>
                  <td><button className="p-1.5 rounded-lg hover:bg-white/5"><MoreHorizontal size={12} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </DashboardShell>
  );
}
