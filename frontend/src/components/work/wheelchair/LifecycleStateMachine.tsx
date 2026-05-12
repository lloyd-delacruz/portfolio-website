'use client'

import { motion } from 'framer-motion'
import { ArrowRight, RotateCcw, CornerDownRight } from 'lucide-react'
import { useInViewPause } from '@/lib/hooks/useInViewPause'
import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion'
import { MonoLabel } from '@/components/home/primitives'

type State = { id: string; label: string; count: number; tone: 'idle' | 'active' | 'warn' }

const MAIN: State[] = [
  { id: 'available',      label: 'available',      count: 187, tone: 'idle' },
  { id: 'in_use',         label: 'in_use',         count: 134, tone: 'active' },
  { id: 'returned',       label: 'returned',       count: 0,   tone: 'active' },
  { id: 'needs_cleaning', label: 'needs_cleaning', count: 0,   tone: 'idle' },
  { id: 'cleaning',       label: 'cleaning',       count: 24,  tone: 'idle' },
]

const BRANCH: State[] = [
  { id: 'maintenance',    label: 'maintenance',    count: 11,  tone: 'warn' },
  { id: 'out_of_service', label: 'out_of_service', count: 6,   tone: 'warn' },
]

const DWELL = [
  { state: 'in_use',         min: 92 },
  { state: 'cleaning',       min: 38 },
  { state: 'needs_cleaning', min: 28 },
  { state: 'available',      min: 14 },
  { state: 'returned',       min: 7 },
  { state: 'maintenance',    min: 360 },
]
const MAX_DWELL = 360

function toneClasses(tone: State['tone'], dominant = false) {
  if (dominant) return 'border-gold/40 bg-gold/10 text-gold'
  if (tone === 'warn') return 'border-amber-400/30 bg-amber-400/[0.06] text-amber-200/90'
  if (tone === 'active') return 'border-surface-strong/70 bg-surface-canvas text-surface-fg'
  return 'border-surface-subtle bg-surface-canvas text-surface-fg-secondary'
}

function StateChip({ s, dominant }: { s: State; dominant?: boolean }) {
  return (
    <div className={`rounded-lg border px-3 py-2 ${toneClasses(s.tone, dominant)}`}>
      <div className="font-mono text-[11px]">{s.label}</div>
      <div className="font-mono text-[10px] opacity-70">{s.count} chairs</div>
    </div>
  )
}

function Connector({ dominant }: { dominant?: boolean }) {
  return (
    <div aria-hidden className="flex shrink-0 items-center justify-center text-surface-fg-muted">
      <ArrowRight className={`h-4 w-4 ${dominant ? 'text-gold' : ''}`} />
    </div>
  )
}

export function LifecycleStateMachine() {
  const reduced = usePrefersReducedMotion()
  const { ref, inView } = useInViewPause<HTMLDivElement>()
  const animate = !reduced && inView

  return (
    <div
      ref={ref}
      className="rounded-2xl border border-surface-subtle bg-surface-card p-6 md:p-10"
      role="img"
      aria-label="Equipment lifecycle state machine: chairs cycle through available, in_use, returned, needs_cleaning and cleaning, then back to available; chairs flagged at scan branch into maintenance and out_of_service. Below: median dwell time per state over 30 days."
    >
      <div className="mb-7 flex items-center justify-between">
        <MonoLabel className="text-surface-fg-secondary">equipment lifecycle</MonoLabel>
        <MonoLabel className="text-surface-fg-muted">30-day distribution · representative</MonoLabel>
      </div>

      {/* Main cycle */}
      <div className="flex flex-wrap items-center gap-2.5">
        {MAIN.map((s, i) => {
          const dominantEdge = MAIN[i - 1]?.id === 'in_use' // in_use → returned is the dominant edge
          return (
            <div key={s.id} className="flex items-center gap-2.5">
              {i > 0 && <Connector dominant={dominantEdge} />}
              <div className="relative">
                <StateChip s={s} />
                {animate && i === 0 && (
                  <motion.span
                    aria-hidden
                    className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-gold"
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  />
                )}
              </div>
            </div>
          )
        })}
        <div aria-hidden className="flex items-center gap-1.5 text-surface-fg-muted">
          <RotateCcw className="h-3.5 w-3.5" />
          <span className="font-mono text-[10px] uppercase tracking-wide-label">back to available</span>
        </div>
      </div>

      {/* Branch */}
      <div className="mt-4 flex flex-wrap items-center gap-2.5 pl-1">
        <div aria-hidden className="flex items-center gap-1.5 text-surface-fg-muted">
          <CornerDownRight className="h-3.5 w-3.5" />
          <span className="font-mono text-[10px] uppercase tracking-wide-label">flagged at scan</span>
        </div>
        <StateChip s={BRANCH[0]} />
        <Connector />
        <StateChip s={BRANCH[1]} />
      </div>

      <p className="mt-5 font-mono text-[10px] uppercase tracking-wide-label text-surface-fg-muted">
        without states the view collapses to <span className="text-surface-fg-secondary">here / missing</span> — with them, the system has memory
      </p>

      {/* Dwell-time bars */}
      <div className="mt-8 border-t border-surface-subtle pt-6">
        <MonoLabel className="block mb-4 text-surface-fg-muted">median dwell time per state · minutes</MonoLabel>
        <ul className="space-y-2.5">
          {DWELL.map((d, i) => {
            const pct = (d.min / MAX_DWELL) * 100
            const isOutlier = d.state === 'maintenance'
            return (
              <li key={d.state} className="grid grid-cols-[7.5rem_1fr_3rem] items-center gap-3">
                <span className="font-mono text-[11px] text-surface-fg-secondary">{d.state}</span>
                <div className="relative h-3 overflow-hidden rounded-sm bg-surface-canvas">
                  <motion.div
                    className={`absolute inset-y-0 left-0 rounded-sm ${isOutlier ? 'bg-amber-400/40' : 'bg-gold/50'}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={animate ? { duration: 0.9, delay: 0.06 * i, ease: 'easeOut' } : { duration: 0 }}
                  />
                </div>
                <span className="text-right font-mono text-[11px] text-surface-fg">{d.min}m</span>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
