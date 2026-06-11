'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Calendar, Flag, Clock, Filter } from 'lucide-react';
import DashboardShell from '@/components/showcase/DashboardShell';
import { RadialGauge, AnimatedNumber } from '@/components/showcase/Charts';
import { Drawer, ConfirmDialog, FilterPanel, FilterChip, RowMenu, useToast } from '@/components/showcase/Interactions';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { taskSchema } from '@/components/showcase/schemas';
import { ScInput, ScSelect } from '@/components/showcase/FormFields';
import { z } from 'zod';

type Status = 'Backlog' | 'In Progress' | 'Review' | 'Done';
type Priority = 'low' | 'med' | 'high';

type Task = {
  id: string; t: string; a: string; c: string; p: Priority; d: string;
  tags: string[]; status: Status;
};

const statusColors: Record<Status, string> = {
  'Backlog': '#9ea0b3',
  'In Progress': '#6affe0',
  'Review': '#ffb547',
  'Done': '#b6ff3c',
};
const priorityColor = (p: Priority) => p === 'high' ? '#ff5e7e' : p === 'med' ? '#ffb547' : '#6affe0';
const assignees = [
  { i: 'YT', c: '#b6ff3c', n: 'Yui Tanaka' },
  { i: 'MH', c: '#6affe0', n: 'Marcus Hale' },
  { i: 'SR', c: '#ff6bcb', n: 'Sofia Reyes' },
  { i: 'LP', c: '#7a5cff', n: 'Leon Park' },
  { i: 'HS', c: '#ffb547', n: 'Hiroko Sato' },
  { i: 'RO', c: '#5cf2a3', n: 'Ren Okada' },
];

const initial: Task[] = [
  { id: 't1', t: 'Migrate auth to OAuth 2.1', a: 'YT', c: '#b6ff3c', p: 'low', d: 'Dec 20', tags: ['backend'], status: 'Backlog' },
  { id: 't2', t: 'Refactor billing module', a: 'MH', c: '#6affe0', p: 'med', d: 'Dec 24', tags: ['billing','refactor'], status: 'Backlog' },
  { id: 't3', t: 'A/B test onboarding flow', a: 'SR', c: '#ff6bcb', p: 'low', d: 'Jan 04', tags: ['growth'], status: 'Backlog' },
  { id: 't4', t: 'Real-time analytics websocket', a: 'LP', c: '#7a5cff', p: 'high', d: 'Dec 12', tags: ['infra'], status: 'In Progress' },
  { id: 't5', t: 'Mobile app deeplinking', a: 'HS', c: '#ffb547', p: 'med', d: 'Dec 14', tags: ['mobile'], status: 'In Progress' },
  { id: 't6', t: 'AI summarizer endpoint', a: 'RO', c: '#5cf2a3', p: 'high', d: 'Dec 11', tags: ['ai','api'], status: 'In Progress' },
  { id: 't7', t: 'Dashboard charting v2 audit', a: 'MH', c: '#6affe0', p: 'med', d: 'Dec 10', tags: ['design-review'], status: 'Review' },
  { id: 't8', t: 'Stripe webhooks hardening', a: 'YT', c: '#b6ff3c', p: 'high', d: 'Dec 09', tags: ['payments'], status: 'Review' },
  { id: 't9', t: 'Audit log immutable store', a: 'LP', c: '#7a5cff', p: 'high', d: 'Dec 05', tags: ['security'], status: 'Done' },
  { id: 't10', t: 'Localization · ja-JP', a: 'HS', c: '#ffb547', p: 'low', d: 'Dec 02', tags: ['i18n'], status: 'Done' },
];

const columns: Status[] = ['Backlog', 'In Progress', 'Review', 'Done'];

const projectTaskSchema = taskSchema.extend({
  tagsString: z.string().optional(),
});

export default function ProjectsPage() {
  const [tasks, setTasks] = React.useState<Task[]>(initial);
  const [filterOpen, setFilterOpen] = React.useState(false);
  const [priorityFilters, setPriorityFilters] = React.useState<Priority[]>([]);
  const [assigneeFilters, setAssigneeFilters] = React.useState<string[]>([]);

  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<Task | null>(null);

  const { register, handleSubmit, control, reset, formState: { errors } } = useForm({
    resolver: zodResolver(projectTaskSchema),
    defaultValues: {
      t: '',
      a: 'YT',
      p: 'med' as Priority,
      d: '',
      tagsString: '',
      status: 'Backlog' as Status
    }
  });

  const [confirmDel, setConfirmDel] = React.useState<Task | null>(null);
  const { push } = useToast();

  const filtered = tasks.filter(t => {
    if (priorityFilters.length && !priorityFilters.includes(t.p)) return false;
    if (assigneeFilters.length && !assigneeFilters.includes(t.a)) return false;
    return true;
  });

  const openCreate = (status: Status = 'Backlog') => {
    setEditing(null);
    reset({
      t: '',
      a: 'YT',
      p: 'med',
      d: '',
      tagsString: '',
      status
    });
    setDrawerOpen(true);
  };
  const openEdit = (t: Task) => {
    setEditing(t);
    reset({
      t: t.t,
      a: t.a,
      p: t.p,
      d: t.d,
      tagsString: t.tags.join(', '),
      status: t.status
    });
    setDrawerOpen(true);
  };
  const onSubmit = (data: any) => {
    const assignee = assignees.find(x => x.i === data.a);
    const c = assignee?.c || '#b6ff3c';
    const tags = data.tagsString ? data.tagsString.split(',').map((t: string) => t.trim()).filter(Boolean) : [];
    const taskData = {
      t: data.t,
      a: data.a,
      p: data.p,
      d: data.d,
      status: data.status,
      tags,
      c
    };
    if (editing) {
      setTasks(p => p.map(x => x.id === editing.id ? { ...editing, ...taskData } : x));
      push(`Updated · ${data.t.slice(0, 40)}`);
    } else {
      setTasks(p => [...p, { id: 't' + Date.now(), ...taskData }]);
      push(`Task added · ${data.status}`);
    }
    setDrawerOpen(false);
  };
  const moveTo = (t: Task, status: Status) => {
    setTasks(p => p.map(x => x.id === t.id ? { ...x, status } : x));
    push(`Moved to ${status}`, 'info');
  };
  const remove = (t: Task) => { setTasks(p => p.filter(x => x.id !== t.id)); push('Task deleted', 'info'); };

  const activeFilterCount = priorityFilters.length + assigneeFilters.length;

  const totals = {
    active: tasks.filter(t => t.status !== 'Done').length,
    done: tasks.filter(t => t.status === 'Done').length,
    velocity: 38,
    cycle: 3.2,
  };

  return (
    <DashboardShell
      title="Projects & sprints"
      subtitle="Kanban, sprint goals, Gantt — manage delivery across 14 active projects."
      breadcrumb={['Workspace', 'Delivery', 'Projects']}
      actions={
        <>
          <button className="sc-btn" onClick={() => setFilterOpen(!filterOpen)} data-testid="open-filters">
            <Filter size={13} />Filter{activeFilterCount > 0 && <span className="sc-chip sc-chip-accent" style={{ padding: '1px 6px', fontSize: 10 }}>{activeFilterCount}</span>}
          </button>
          <button className="sc-btn" onClick={() => push('Team allocation view opens here', 'info')}><Plus size={13} />Team</button>
          <button className="sc-btn" onClick={() => push('Sprint planner opens here', 'info')}><Calendar size={13} />Sprint planner</button>
          <button className="sc-btn sc-btn-primary" onClick={() => openCreate('Backlog')} data-testid="add-task"><Plus size={13} />New task</button>
        </>
      }
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { l: 'Active tasks', v: totals.active, c: '#b6ff3c' },
          { l: 'Done this sprint', v: totals.done, c: '#6affe0' },
          { l: 'Velocity', v: totals.velocity, suffix: ' pts', c: '#ff6bcb' },
          { l: 'Cycle time', v: totals.cycle, suffix: 'd', decimals: 1, c: '#ffb547' },
        ].map((k, i) => (
          <motion.div key={k.l} className="sc-card p-5"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <div style={{ fontSize: 11, color: 'var(--sc-text-faint)' }}>{k.l.toUpperCase()}</div>
            <div className="sc-stat-value mt-2" style={{ color: k.c }}>
              <AnimatedNumber value={k.v} suffix={k.suffix} decimals={k.decimals ?? 0} />
            </div>
          </motion.div>
        ))}
      </div>

      <FilterPanel open={filterOpen}>
        <span style={{ fontSize: 11, color: 'var(--sc-text-faint)' }}>PRIORITY</span>
        {(['high','med','low'] as Priority[]).map(p => (
          <FilterChip key={p} active={priorityFilters.includes(p)}
            onClick={() => setPriorityFilters(x => x.includes(p) ? x.filter(y => y !== p) : [...x, p])}
            testid={`filter-priority-${p}`}>{p}</FilterChip>
        ))}
        <div className="h-5 w-px" style={{ background: 'var(--sc-border)' }} />
        <span style={{ fontSize: 11, color: 'var(--sc-text-faint)' }}>ASSIGNEE</span>
        {assignees.map(a => (
          <FilterChip key={a.i} active={assigneeFilters.includes(a.i)}
            onClick={() => setAssigneeFilters(x => x.includes(a.i) ? x.filter(y => y !== a.i) : [...prev => prev, a.i])}
            testid={`filter-assignee-${a.i}`}>{a.n}</FilterChip>
        ))}
        {activeFilterCount > 0 && (
          <button onClick={() => { setPriorityFilters([]); setAssigneeFilters([]); }}
                  className="sc-btn sc-btn-ghost ml-auto" style={{ padding: '6px 12px', fontSize: 11 }}>Clear filters</button>
        )}
      </FilterPanel>

      {/* Kanban */}
      <motion.div className="mb-6 overflow-x-auto sc-scroll pb-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <div className="flex gap-4 min-w-[900px] items-start">
          {columns.map((col) => {
            const colTasks = filtered.filter(t => t.status === col);
            return (
              <div key={col} className="flex-1 sc-kanban-col min-h-[400px]">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ background: statusColors[col], boxShadow: `0 0 8px ${statusColors[col]}` }} />
                    <span className="sc-sans" style={{ fontSize: 12, fontWeight: 600 }}>{col}</span>
                  </div>
                  <span className="sc-chip" style={{ fontSize: 10 }}>{colTasks.length}</span>
                </div>
                <div className="space-y-2.5">
                  {colTasks.map((c) => (
                    <motion.div key={c.id} className="sc-kanban-card relative group"
                      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                      data-testid={`task-${c.id}`} onClick={() => openEdit(c)}>
                      <div className="flex justify-between items-start mb-2">
                        <div style={{ fontSize: 13, fontWeight: 500, lineHeight: 1.4, flex: 1 }}>{c.t}</div>
                        <RowMenu items={[
                          { label: 'Edit', onClick: () => openEdit(c) },
                          ...columns.filter(s => s !== c.status).map(s => ({ label: `Move to ${s}`, onClick: () => moveTo(c, s) })),
                          { label: 'Delete', onClick: () => setConfirmDel(c), danger: true },
                        ]} />
                      </div>
                      <div className="flex gap-1 flex-wrap mb-3">
                        {c.tags.map(tag => <span key={tag} className="sc-chip" style={{ fontSize: 9, padding: '2px 6px' }}>{tag}</span>)}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <Flag size={10} style={{ color: priorityColor(c.p) }} />
                          <span style={{ fontSize: 10, color: priorityColor(c.p) }}>{c.p.toUpperCase()}</span>
                          {c.d && <span style={{ fontSize: 10, color: 'var(--sc-text-faint)', marginLeft: 6 }}>· {c.d}</span>}
                        </div>
                        <div className="sc-avatar" style={{ background: `linear-gradient(135deg, ${c.c}, ${c.c}77)`, width: 22, height: 22, fontSize: 9 }}>{c.a}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <button onClick={() => openCreate(col)}
                        className="w-full text-xs py-2 rounded-lg mt-2 flex items-center justify-center gap-1.5 hover:bg-white/5"
                        style={{ color: 'var(--sc-text-faint)', border: '1px dashed var(--sc-border)' }}
                        data-testid={`add-task-${col.toLowerCase().replace(/\s+/g, '-')}`}>
                  <Plus size={11} />Add task
                </button>
              </div>
            );
          })}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <motion.div className="sc-card p-6 xl:col-span-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <div className="flex items-start justify-between mb-4">
            <div className="sc-sans" style={{ fontSize: 14, fontWeight: 600 }}>Project timeline</div>
            <div style={{ fontSize: 11, color: 'var(--sc-text-faint)' }}>Q4 2026 · 14 projects</div>
          </div>
          <div className="space-y-3">
            {[
              { n: 'Atlas · core platform', start: 5, len: 60, c: '#b6ff3c', p: 70 },
              { n: 'Orion · mobile rewrite', start: 20, len: 40, c: '#6affe0', p: 35 },
              { n: 'Helix · AI infra', start: 0, len: 80, c: '#ff6bcb', p: 90 },
              { n: 'Vega · billing v3', start: 35, len: 40, c: '#ffb547', p: 22 },
              { n: 'Nova · public APIs', start: 50, len: 40, c: '#7a5cff', p: 8 },
              { n: 'Pulse · analytics', start: 15, len: 65, c: '#5cf2a3', p: 55 },
            ].map((p, i) => (
              <div key={p.n} className="grid grid-cols-[150px,1fr] items-center gap-3">
                <div style={{ fontSize: 12 }}>{p.n}</div>
                <div className="relative h-7 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <motion.div
                    className="absolute top-0 bottom-0 rounded-lg flex items-center justify-end px-2"
                    style={{ background: `linear-gradient(90deg, ${p.c}, ${p.c}66)`, left: `${p.start}%`, boxShadow: `0 0 12px ${p.c}55` }}
                    initial={{ width: 0 }} animate={{ width: `${p.len}%` }} transition={{ delay: i * 0.06, duration: 1 }}
                  >
                    <span style={{ fontSize: 10, color: '#0a0a0f', fontWeight: 700 }}>{p.p}%</span>
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-4 mt-4" style={{ fontSize: 10, color: 'var(--sc-text-faint)' }}>
            <span>Oct</span><span>Nov</span><span>Dec</span><span>Jan</span>
          </div>
        </motion.div>

        <motion.div className="sc-card p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}>
          <div className="sc-sans mb-3" style={{ fontSize: 14, fontWeight: 600 }}>Sprint health</div>
          <RadialGauge value={82} color="#b6ff3c" label="ON TRACK" />
        </motion.div>
      </div>

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={editing ? 'Edit task' : 'New task'}
        subtitle={editing ? 'Update task details' : `Add to ${control._defaultValues.status}`}
        footer={
          <>
            <button className="sc-btn sc-btn-ghost" onClick={() => setDrawerOpen(false)}>Cancel</button>
            <button className="sc-btn sc-btn-primary" onClick={handleSubmit(onSubmit)} data-testid="drawer-submit">
              {editing ? 'Save changes' : 'Create task'}
            </button>
          </>
        }
      >
        <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit(onSubmit)}>
          <ScInput
            label="Title"
            placeholder="What needs to be done?"
            data-testid="task-title"
            wrapperClassName="col-span-2"
            error={errors.t?.message as string}
            {...register('t')}
            autoFocus
          />

          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <ScSelect
                label="Status"
                value={field.value}
                onChange={field.onChange}
                options={columns.map(s => ({ label: s, value: s }))}
                error={errors.status?.message as string}
              />
            )}
          />

          <Controller
            name="p"
            control={control}
            render={({ field }) => (
              <ScSelect
                label="Priority"
                value={field.value}
                onChange={field.onChange}
                options={[
                  { label: 'high', value: 'high' },
                  { label: 'med', value: 'med' },
                  { label: 'low', value: 'low' },
                ]}
                error={errors.p?.message as string}
              />
            )}
          />

          <Controller
            name="a"
            control={control}
            render={({ field }) => (
              <ScSelect
                label="Assignee"
                value={field.value}
                onChange={field.onChange}
                options={assignees.map(a => ({ label: a.n, value: a.i }))}
                error={errors.a?.message as string}
              />
            )}
          />

          <ScInput
            label="Due"
            placeholder="e.g. Dec 24"
            error={errors.d?.message as string}
            {...register('d')}
          />

          <ScInput
            label="Tags (comma separated)"
            placeholder="backend, infra, growth"
            wrapperClassName="col-span-2"
            error={errors.tagsString?.message as string}
            {...register('tagsString')}
          />
        </form>
      </Drawer>

      <ConfirmDialog
        open={!!confirmDel}
        onClose={() => setConfirmDel(null)}
        onConfirm={() => confirmDel && remove(confirmDel)}
        title="Delete this task?"
        message={`"${confirmDel?.t}" will be permanently removed.`}
        confirmLabel="Delete"
      />
    </DashboardShell>
  );
}
