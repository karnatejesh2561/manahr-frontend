'use client';

import React from 'react';
import { motion } from 'framer-motion';

/* ---------- Sparkline Area Chart ---------- */
export function AreaChart({
  data,
  color = '#b6ff3c',
  color2 = '#6affe0',
  height = 220,
  showGrid = true,
  labels,
}: {
  data: number[];
  color?: string;
  color2?: string;
  height?: number;
  showGrid?: boolean;
  labels?: string[];
}) {
  const w = 800;
  const h = height;
  const pad = 28;
  const max = Math.max(...data) * 1.1;
  const min = Math.min(...data) * 0.85;
  const step = (w - pad * 2) / (data.length - 1);
  const pts = data.map((v, i) => [pad + i * step, h - pad - ((v - min) / (max - min)) * (h - pad * 2)] as const);
  const linePath = pts.map(([x, y], i) => (i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`)).join(' ');
  const fillPath = `${linePath} L ${pts[pts.length - 1][0]} ${h - pad} L ${pts[0][0]} ${h - pad} Z`;
  const id = React.useId();

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto">
      <defs>
        <linearGradient id={`grad-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.45" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`stroke-${id}`} x1="0" x2="1">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor={color2} />
        </linearGradient>
      </defs>
      {showGrid && Array.from({ length: 4 }).map((_, i) => (
        <line
          key={i}
          x1={pad} x2={w - pad}
          y1={pad + (i * (h - pad * 2)) / 3}
          y2={pad + (i * (h - pad * 2)) / 3}
          stroke="rgba(0,0,0,0.05)" strokeDasharray="2 4"
        />
      ))}
      <motion.path
        d={fillPath}
        fill={`url(#grad-${id})`}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }}
      />
      <motion.path
        d={linePath}
        fill="none"
        stroke={`url(#stroke-${id})`}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.6, ease: 'easeOut' }}
      />
      {pts.map(([x, y], i) => (
        <motion.circle
          key={i} cx={x} cy={y} r={3} fill={color}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.2 + i * 0.05 }}
        />
      ))}
      {labels && labels.map((lab, i) => (
        <text key={i} x={pad + i * step} y={h - 8} textAnchor="middle"
          fill="rgba(0,0,0,0.4)" fontSize="10" fontFamily="monospace">
          {lab}
        </text>
      ))}
    </svg>
  );
}

/* ---------- Bar Chart (animated) ---------- */
export function BarChart({
  data,
  labels,
  color = '#b6ff3c',
  height = 220,
}: {
  data: number[];
  labels?: string[];
  color?: string;
  height?: number;
}) {
  const w = 800;
  const h = height;
  const pad = 28;
  const max = Math.max(...data) * 1.1;
  const barWidth = (w - pad * 2) / data.length - 6;
  const id = React.useId();
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto">
      <defs>
        <linearGradient id={`bar-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="0.3" />
        </linearGradient>
      </defs>
      {Array.from({ length: 4 }).map((_, i) => (
        <line key={i} x1={pad} x2={w - pad}
          y1={pad + (i * (h - pad * 2)) / 3}
          y2={pad + (i * (h - pad * 2)) / 3}
          stroke="rgba(0,0,0,0.05)" strokeDasharray="2 4" />
      ))}
      {data.map((v, i) => {
        const x = pad + i * ((w - pad * 2) / data.length) + 3;
        const barH = (v / max) * (h - pad * 2);
        const y = h - pad - barH;
        return (
          <g key={i}>
            <motion.rect
              x={x} width={barWidth} rx="6"
              fill={`url(#bar-${id})`}
              initial={{ y: h - pad, height: 0 }}
              animate={{ y, height: barH }}
              transition={{ delay: i * 0.06, duration: 0.7, ease: 'easeOut' }}
            />
            {labels && (
              <text x={x + barWidth / 2} y={h - 8} textAnchor="middle"
                fill="rgba(0,0,0,0.5)" fontSize="10" fontFamily="monospace">
                {labels[i]}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

/* ---------- Donut Chart ---------- */
export function DonutChart({
  segments,
  size = 200,
  thickness = 22,
  centerLabel,
  centerSubLabel,
}: {
  segments: { label: string; value: number; color: string }[];
  size?: number;
  thickness?: number;
  centerLabel?: string;
  centerSubLabel?: string;
}) {
  const total = segments.reduce((a, b) => a + b.value, 0);
  const r = size / 2 - thickness;
  const c = 2 * Math.PI * r;
  let offset = 0;
  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-auto">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke="rgba(0,0,0,0.05)" strokeWidth={thickness} />
      {segments.map((s, i) => {
        const len = (s.value / total) * c;
        const dash = `${len} ${c}`;
        const dashOffset = -offset;
        offset += len;
        return (
          <motion.circle
            key={i}
            cx={size / 2} cy={size / 2} r={r}
            fill="none" stroke={s.color} strokeWidth={thickness}
            strokeDasharray={dash} strokeDashoffset={dashOffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: i * 0.15 }}
          />
        );
      })}
      {centerLabel && (
        <text x={size / 2} y={size / 2 - 4} textAnchor="middle"
          fill="var(--sc-text)" fontSize="22" fontFamily="Instrument Serif, Georgia, serif">
          {centerLabel}
        </text>
      )}
      {centerSubLabel && (
        <text x={size / 2} y={size / 2 + 16} textAnchor="middle"
          fill="rgba(0,0,0,0.5)" fontSize="10" fontFamily="monospace">
          {centerSubLabel}
        </text>
      )}
    </svg>
  );
}

/* ---------- Radial / Gauge ---------- */
export function RadialGauge({ value, max = 100, color = '#b6ff3c', size = 160, label }: {
  value: number; max?: number; color?: string; size?: number; label?: string;
}) {
  const r = size / 2 - 14;
  const c = 2 * Math.PI * r;
  const pct = value / max;
  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-[250px]">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke="rgba(0,0,0,0.06)" strokeWidth="10" />
      <motion.circle
        cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth="10"
        strokeDasharray={c} strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        initial={{ strokeDashoffset: c }}
        animate={{ strokeDashoffset: c * (1 - pct) }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
        style={{ filter: `drop-shadow(0 0 8px ${color})` }}
      />
      <text x={size / 2} y={size / 2 - 2} textAnchor="middle"
        fill="var(--sc-text)" fontSize="28" fontFamily="Instrument Serif, Georgia, serif">
        {Math.round(value)}%
      </text>
      {label && (
        <text x={size / 2} y={size / 2 + 18} textAnchor="middle"
          fill="rgba(0,0,0,0.5)" fontSize="10" fontFamily="monospace">
          {label}
        </text>
      )}
    </svg>
  );
}

/* ---------- Heatmap (calendar style) ---------- */
export function Heatmap({ data, cols = 24, rows = 7, colors = ['#1a1a24', '#3a4a1f', '#6f9a2a', '#9fd935', '#b6ff3c'] }: {
  data: number[]; cols?: number; rows?: number; colors?: string[];
}) {
  const max = Math.max(...data, 1);
  const cell = 16; const gap = 4;
  return (
    <svg viewBox={`0 0 ${cols * (cell + gap)} ${rows * (cell + gap)}`} className="w-full h-auto">
      {Array.from({ length: cols }).map((_, x) =>
        Array.from({ length: rows }).map((_, y) => {
          const i = x * rows + y;
          const v = data[i] ?? 0;
          const idx = Math.min(colors.length - 1, Math.floor((v / max) * colors.length));
          return (
            <motion.rect
              key={`${x}-${y}`}
              x={x * (cell + gap)} y={y * (cell + gap)}
              width={cell} height={cell} rx="3"
              fill={colors[idx]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: (x * rows + y) * 0.005 }}
            />
          );
        })
      )}
    </svg>
  );
}

/* ---------- Multi-line chart (stacked) ---------- */
export function MultiLineChart({ series, height = 240, labels }: {
  series: { name: string; data: number[]; color: string }[];
  height?: number;
  labels?: string[];
}) {
  const w = 800; const h = height; const pad = 32;
  const all = series.flatMap((s) => s.data);
  const max = Math.max(...all) * 1.1;
  const min = Math.min(...all) * 0.9;
  const n = series[0].data.length;
  const step = (w - pad * 2) / (n - 1);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto">
      {Array.from({ length: 4 }).map((_, i) => (
        <line key={i} x1={pad} x2={w - pad}
          y1={pad + (i * (h - pad * 2)) / 3}
          y2={pad + (i * (h - pad * 2)) / 3}
          stroke="rgba(0,0,0,0.05)" strokeDasharray="2 4" />
      ))}
      {series.map((s, si) => {
        const path = s.data.map((v, i) => {
          const x = pad + i * step;
          const y = h - pad - ((v - min) / (max - min)) * (h - pad * 2);
          return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
        }).join(' ');
        return (
          <motion.path
            key={si} d={path} fill="none" stroke={s.color}
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: si * 0.2 }}
            style={{ filter: `drop-shadow(0 0 6px ${s.color}88)` }}
          />
        );
      })}
      {labels && labels.map((lab, i) => (
        <text key={i} x={pad + i * step} y={h - 10} textAnchor="middle"
          fill="rgba(0,0,0,0.4)" fontSize="10" fontFamily="monospace">
          {lab}
        </text>
      ))}
    </svg>
  );
}

/* ---------- Funnel ---------- */
export function Funnel({ stages }: { stages: { label: string; value: number; color: string }[] }) {
  const max = Math.max(...stages.map((s) => s.value));
  return (
    <div className="space-y-3">
      {stages.map((s, i) => {
        const pct = (s.value / max) * 100;
        return (
          <div key={i} className="relative">
            <div className="flex justify-between text-xs mb-1" style={{ color: 'rgba(0,0,0,0.65)' }}>
              <span>{s.label}</span>
              <span style={{ color: s.color, fontFamily: 'monospace' }}>{s.value.toLocaleString()}</span>
            </div>
            <div className="h-9 rounded-lg overflow-hidden" style={{ background: 'rgba(0,0,0,0.04)' }}>
              <motion.div
                className="h-full rounded-lg flex items-center px-3 text-xs font-medium"
                style={{
                  background: `linear-gradient(90deg, ${s.color}, ${s.color}55)`,
                  color: '#0a0a0f',
                  boxShadow: `0 0 20px -6px ${s.color}`,
                }}
                initial={{ width: 0 }} animate={{ width: `${pct}%` }}
                transition={{ delay: i * 0.1, duration: 0.9, ease: 'easeOut' }}
              >
                {Math.round(pct)}%
              </motion.div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---------- Mini sparkline ---------- */
export function Sparkline({ data, color = '#b6ff3c', height = 36 }: { data: number[]; color?: string; height?: number }) {
  const w = 120;
  const max = Math.max(...data); const min = Math.min(...data);
  const step = w / (data.length - 1);
  const path = data.map((v, i) => {
    const x = i * step;
    const y = height - ((v - min) / (max - min || 1)) * height;
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');
  return (
    <svg viewBox={`0 0 ${w} ${height}`} className="w-full h-auto">
      <motion.path d={path} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} />
    </svg>
  );
}

/* ---------- Animated number ---------- */
export function AnimatedNumber({ value, prefix = '', suffix = '', decimals = 0 }: {
  value: number; prefix?: string; suffix?: string; decimals?: number;
}) {
  const [n, setN] = React.useState(0);
  React.useEffect(() => {
    const dur = 1400; const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(value * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return <span>{prefix}{n.toLocaleString(undefined, { maximumFractionDigits: decimals, minimumFractionDigits: decimals })}{suffix}</span>;
}
