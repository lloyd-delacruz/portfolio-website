'use client'

import { motion } from 'framer-motion'
import { useInViewPause } from '@/lib/hooks/useInViewPause'
import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion'
import { MonoLabel } from '@/components/home/primitives'

type Node = { id: string; label: string; count: number; x: number; isBranch?: boolean }

const NODES: Node[] = [
  { id: 'available',      label: 'available',      count: 187, x: 8 },
  { id: 'in_use',         label: 'in_use',         count: 134, x: 26 },
  { id: 'returned',       label: 'returned',       count: 0,   x: 44 },
  { id: 'needs_cleaning', label: 'needs_cleaning', count: 0,   x: 62 },
  { id: 'cleaning',       label: 'cleaning',       count: 24,  x: 80 },
  { id: 'maintenance',    label: 'maintenance',    count: 11,  x: 50, isBranch: true },
  { id: 'out_of_service', label: 'out_of_service', count: 6,   x: 80, isBranch: true },
]

const DWELL = [
  { state: 'available',      min: 14 },
  { state: 'in_use',         min: 92 },
  { state: 'returned',       min: 7 },
  { state: 'needs_cleaning', min: 28 },
  { state: 'cleaning',       min: 38 },
  { state: 'maintenance',    min: 360 },
]

const MAX_DWELL = 360

export function LifecycleStateMachine() {
  const reduced = usePrefersReducedMotion()
  const { ref, inView } = useInViewPause<HTMLDivElement>()
  const animate = !reduced && inView

  return (
    <div ref={ref} className="p-6 md:p-10" role="img" aria-label="Equipment lifecycle state machine across 30 days">
      <div className="mb-6 flex items-center justify-between">
        <MonoLabel className="text-surface-fg-secondary">equipment lifecycle</MonoLabel>
        <MonoLabel className="text-surface-fg-muted">30-day distribution · representative</MonoLabel>
      </div>

      {/* State graph */}
      <svg viewBox="0 0 100 50" className="w-full h-auto" aria-hidden="true">
        {/* Main flow edges */}
        {[
          [8, 26], [26, 44], [44, 62], [62, 80], // available→in_use→returned→needs_cleaning→cleaning
        ].map(([x1, x2], i) => {
          const isDominant = x1 === 26 && x2 === 44 // in_use → returned
          return (
            <line
              key={i}
              x1={x1 + 2} y1={20} x2={x2 - 2} y2={20}
              stroke={isDominant ? 'hsl(var(--accent-gold) / 0.7)' : 'rgba(255,255,255,0.18)'}
              strokeWidth={isDominant ? 0.35 : 0.25}
            />
          )
        })}
        {/* cleaning → available loop-back arc */}
        <path
          d="M 80 17 Q 50 5 8 17"
          fill="none"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth={0.22}
          strokeDasharray="0.8 0.8"
        />
        {/* Branches to maintenance and out_of_service */}
        <line x1={44} y1={22} x2={50} y2={38} stroke="rgba(255,255,255,0.14)" strokeWidth={0.22} strokeDasharray="0.6 0.6" />
        <line x1={50} y1={40} x2={80} y2={40} stroke="rgba(255,255,255,0.14)" strokeWidth={0.22} strokeDasharray="0.6 0.6" />

        {/* Dominant edge traversing dot */}
        {animate && (
          <motion.circle
            r="0.7"
            fill="hsl(var(--accent-gold))"
            initial={{ cx: 28, cy: 20 }}
            animate={{ cx: 42, cy: 20 }}
            transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          />
        )}

        {/* Nodes */}
        {NODES.map((n) => (
          <g key={n.id}>
            <circle
              cx={n.x} cy={n.isBranch ? 40 : 20} r={1.4}
              fill="hsl(var(--surface-canvas))"
              stroke="rgba(255,255,255,0.32)"
              strokeWidth={0.22}
            />
            <text
              x={n.x} y={n.isBranch ? 45 : 25}
              fontSize="1.5"
              textAnchor="middle"
              fontFamily="var(--font-geist-mono), monospace"
              fill="rgba(170,176,191,0.8)"
            >
              {n.label} · {n.count}
            </text>
          </g>
        ))}
      </svg>

      {/* Dwell-time histogram */}
      <div className="mt-6">
        <MonoLabel className="block mb-3 text-surface-fg-muted">median dwell time per state · minutes</MonoLabel>
        <ul className="grid grid-cols-6 gap-2">
          {DWELL.map((d) => (
            <li key={d.state} className="flex flex-col items-start">
              <div className="relative w-full h-16 rounded-sm bg-surface-card overflow-hidden">
                <div
                  className="absolute bottom-0 left-0 right-0 bg-gold/60"
                  style={{ height: `${(d.min / MAX_DWELL) * 100}%` }}
                />
              </div>
              <span className="mt-1 font-mono text-[9px] text-surface-fg-muted truncate w-full">{d.state}</span>
              <span className="font-mono text-[10px] text-surface-fg">{d.min}m</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
