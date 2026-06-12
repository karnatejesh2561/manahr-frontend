'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Check } from 'lucide-react';

/* ---------- Drawer (slide from right) ---------- */
export function Drawer({
    open, onClose, title, subtitle, children, footer, width = 460,
}: {
    open: boolean;
    onClose: () => void;
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
    width?: number;
}) {
    React.useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open, onClose]);

    return (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div
                        className="fixed inset-0 z-40"
                        style={{ background: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(4px)' }}
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={onClose}
                        data-testid="drawer-backdrop"
                    />
                    <motion.aside
                        className="fixed top-0 right-0 bottom-0 z-50 flex flex-col"
                        style={{
                            width, maxWidth: '100vw',
                            background: 'rgba(255,255,255,0.85)',
                            backdropFilter: 'blur(24px) saturate(150%)',
                            borderLeft: '1px solid var(--sc-border)',
                            color: 'var(--sc-text)',
                            fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                        }}
                        initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                        transition={{ type: 'spring', stiffness: 320, damping: 32 }}
                        data-testid="drawer"
                    >
                        <div className="flex items-start justify-between p-4 sm:p-6 border-b" style={{ borderColor: 'var(--sc-border)' }}>
                            <div>
                                <div className="sc-display" style={{ fontSize: 22, lineHeight: 1.1 }}>{title}</div>
                                {subtitle && <div style={{ fontSize: 11, color: 'var(--sc-text-faint)', marginTop: 4 }}>{subtitle}</div>}
                            </div>
                            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/5" data-testid="drawer-close">
                                <X size={16} />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto sc-scroll p-4 sm:p-6">{children}</div>
                        {footer && (
                            <div className="border-t p-4 flex justify-end gap-2" style={{ borderColor: 'var(--sc-border)' }}>
                                {footer}
                            </div>
                        )}
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
}

/* ---------- Confirm modal ---------- */
export function ConfirmDialog({
    open, onClose, onConfirm, title, message, confirmLabel = 'Delete', tone = 'danger',
}: {
    open: boolean; onClose: () => void; onConfirm: () => void;
    title: string; message: string; confirmLabel?: string;
    tone?: 'danger' | 'primary';
}) {
    return (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div
                        className="fixed inset-0"
                        style={{ background: 'rgba(255,255,255,0.4)', backdropFilter: 'blur(4px)' }}
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={onClose}
                    />
                    <motion.div
                        className=" absolute border border-gray-300 rounded-xl left-1/2 top-1/2 z-50  p-6 width-full max-w-sm -translate-x-1/2 -translate-y-1/2"

                        data-testid="confirm-dialog"
                    >
                        <div className="sc-display" style={{ fontSize: 22 }}>{title}</div>
                        <div style={{ fontSize: 13, color: 'var(--sc-text-dim)', marginTop: 8, lineHeight: 1.6 }}>{message}</div>
                        <div className="flex justify-end gap-2 mt-5">
                            <button onClick={onClose} className="sc-btn sc-btn-ghost" data-testid="confirm-cancel">Cancel</button>
                            <button
                                onClick={() => { onConfirm(); onClose(); }}
                                className="sc-btn"
                                style={tone === 'danger'
                                    ? { background: 'var(--sc-danger)', color: '#fff', borderColor: 'var(--sc-danger)' }
                                    : { background: 'var(--sc-text)', color: '#fff', borderColor: 'var(--sc-text)' }}
                                data-testid="confirm-ok"
                            >
                                {confirmLabel}
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

/* ---------- Form field ---------- */
export function Field({ label, children, hint, span = 1 }: {
    label: string; children: React.ReactNode; hint?: string; span?: 1 | 2;
}) {
    return (
        <div style={{ gridColumn: `span ${span} / span ${span}` }}>
            <label style={{ fontSize: 11, color: 'var(--sc-text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</label>
            <div className="mt-1.5">{children}</div>
            {hint && <div style={{ fontSize: 10, color: 'var(--sc-text-faint)', marginTop: 6 }}>{hint}</div>}
        </div>
    );
}

/* ---------- Filter panel (collapsible above table) ---------- */
export function FilterPanel({
    open, children,
}: { open: boolean; children: React.ReactNode }) {
    return (
        <AnimatePresence initial={false}>
            {open && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                >
                    <div className="sc-card p-4 mb-4 flex flex-wrap gap-3 items-center" data-testid="filter-panel">
                        {children}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

/* ---------- Chip toggle ---------- */
export function FilterChip({ active, onClick, children, testid }: {
    active: boolean; onClick: () => void; children: React.ReactNode; testid?: string;
}) {
    return (
        <button
            onClick={onClick}
            className={`sc-chip ${active ? 'sc-chip-accent' : ''}`}
            style={{ cursor: 'pointer' }}
            data-testid={testid}
        >
            {active && <Check size={11} />}
            {children}
        </button>
    );
}

/* ---------- Row actions dropdown ---------- */
export function RowMenu({
    items,
}: { items: { label: string; onClick: () => void; danger?: boolean; testid?: string }[] }) {
    const [open, setOpen] = React.useState(false);
    const [openUp, setOpenUp] = React.useState(false);
    const ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (!open) return;
        const onDown = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
        document.addEventListener('mousedown', onDown);
        return () => document.removeEventListener('mousedown', onDown);
    }, [open]);

    const handleToggle = () => {
        if (!open && ref.current) {
            const rect = ref.current.getBoundingClientRect();
            const spaceBelow = window.innerHeight - rect.bottom;
            setOpenUp(spaceBelow < 160);
        }
        setOpen(!open);
    };

    return (
        <div ref={ref} className="relative inline-block">
            <button
                onClick={handleToggle}
                className="p-1.5 rounded-lg hover:bg-white/5"
                data-testid="row-menu-trigger"
                aria-label="Open actions"
            >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="5" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="12" cy="19" r="1" /></svg>
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: openUp ? 4 : -4, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: openUp ? -4 : 4, scale: 0.97 }}
                        transition={{ duration: 0.15 }}
                        className={`absolute right-0 z-30 rounded-xl overflow-hidden ${openUp ? 'bottom-full mb-1.5' : 'top-full mt-1.5'}`}
                        style={{
                            minWidth: 160,
                            background: 'rgba(255,255,255,0.85)',
                            border: '1px solid rgba(255,255,255,0.9)',
                            backdropFilter: 'blur(24px) saturate(150%)',
                            boxShadow: 'none',
                        }}
                        data-testid="row-menu-panel"
                    >
                        {items.map((it, i) => (
                            <button
                                key={i}
                                onClick={() => { setOpen(false); it.onClick(); }}
                                className="w-full text-left px-3 py-2 hover:bg-black/5 transition"
                                style={{ fontSize: 12, color: it.danger ? 'var(--sc-danger)' : 'var(--sc-text)' }}
                                data-testid={it.testid}
                            >
                                {it.label}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

/* ---------- Toast / Snackbar ---------- */
type Toast = { id: number; msg: string; tone?: 'success' | 'info' | 'danger' };
const ToastCtx = React.createContext<{ push: (m: string, tone?: Toast['tone']) => void }>({ push: () => { } });

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = React.useState<Toast[]>([]);
    const push = React.useCallback((msg: string, tone: Toast['tone'] = 'success') => {
        const id = Date.now() + Math.random();
        setItems((prev) => [...prev, { id, msg, tone }]);
        setTimeout(() => setItems((prev) => prev.filter(t => t.id !== id)), 3200);
    }, []);
    return (
        <ToastCtx.Provider value={{ push }}>
            {children}
            <div className="fixed bottom-6 right-6 z-[60] space-y-2" data-testid="toast-stack">
                <AnimatePresence>
                    {items.map(t => (
                        <motion.div key={t.id}
                            initial={{ opacity: 0, y: 16, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 40 }}
                            className="sc-card bg-white px-4 py-3 flex items-center gap-3"
                            style={{
                                minWidth: 260,
                                borderColor: t.tone === 'danger' ? 'rgba(255,94,126,0.4)' : t.tone === 'info' ? 'rgba(106,255,224,0.4)' : 'rgba(182,255,60,0.4)',
                            }}>
                            <span className="w-1.5 h-1.5 rounded-full" style={{
                                background: t.tone === 'danger' ? 'var(--sc-danger)' : t.tone === 'info' ? 'var(--sc-accent-2)' : 'var(--sc-accent)',
                                boxShadow: `0 0 8px ${t.tone === 'danger' ? 'var(--sc-danger)' : t.tone === 'info' ? 'var(--sc-accent-2)' : 'var(--sc-accent)'}`,
                            }} />
                            <span style={{ fontSize: 12 }}>{t.msg}</span>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastCtx.Provider>
    );
}

export function useToast() {
    return React.useContext(ToastCtx);
}

/* ---------- Search input ---------- */
export function SearchInput({ value, onChange, placeholder = 'Search...', testid, width = 240 }: {
    value: string; onChange: (v: string) => void; placeholder?: string; testid?: string; width?: number;
}) {
    return (
        <div className="relative" style={{ width }}>
            <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--sc-text-faint)' }} />
            <input
                className="sc-input pl-8"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                data-testid={testid}
            />
        </div>
    );
}
