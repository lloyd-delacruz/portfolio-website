'use client'

import { motion } from 'framer-motion'
import { Building2, Radio } from 'lucide-react'
import { useInViewPause } from '@/lib/hooks/useInViewPause'
import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion'
import { MonoLabel } from '@/components/home/primitives'

const SITES = [
  { id: 'vgh', name: 'VGH' },
  { id: 'ubc', name: 'UBC' },
  { id: 'lions_gate', name: 'Lions Gate' },
  { id: 'richmond', name: 'Richmond' },
]

// Loose "?" equipment tokens drifting in the gaps between sites.
const TOKENS = [
  { top: '14%', left: '20%', d: 0 },
  { top: '30%', left: '52%', d: 0.6 },
  { top: '58%', left: '34%', d: 1.2 },
  { top: '70%', left: '68%', d: 0.3 },
  { top: '22%', left: '78%', d: 0.9 },
  { top: '48%', left: '12%', d: 1.5 },
]

const STATS = [
  { k: 'state-accurate at any hour', v: '0%' },
  { k: 'time to locate a chair', v: '~30 min' },
  { k: 'maintenance flagged', v: 'sticky notes' },
]

export function ProblemDiagram() {
  const reduced = usePrefersReducedMotion()
  const { ref, inView } = useInViewPause<HTMLDivElement>()
  const animate = !reduced && inView

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 gap-4 lg:grid-cols-[1.4fr_1fr]"
    >
      <div
        className="relative min-h-[280px] overflow-hidden rounded-2xl border border-surface-subtle bg-surface-card p-6 md:min-h-[340px]"
        role="img"
        aria-label="Before the system: equipment drifts unseen between four hospitals; retrieval is a radio call, location is unknown."
      >
        <MonoLabel className="text-surface-fg-secondary">before · no shared registry</MonoLabel>

        {/* four hospital nodes */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          {SITES.map((s) => (
            <div key={s.id} className="rounded-lg border border-surface-subtle bg-surface-canvas px-3 py-3">
              <div className="flex items-center gap-2">
                <Building2 className="h-3.5 w-3.5 text-surface-fg-muted" aria-hidden />
                <span className="text-[13px] text-surface-fg-secondary">{s.name}</span>
              </div>
              <div className="mt-2 font-mono text-[10px] uppercase tracking-wide-label text-surface-fg-muted">
                chairs on site · ?
              </div>
            </div>
          ))}
        </div>

        {/* drifting "?" tokens */}
        {TOKENS.map((t, i) => (
          <motion.span
            key={i}
            aria-hidden
            className="absolute inline-flex h-7 w-9 items-center justify-center rounded-md border border-surface-strong/50 bg-surface-canvas/80 font-mono text-xs text-surface-fg-muted backdrop-blur-sm"
            style={{ top: t.top, left: t.left }}
            animate={
              animate
                ? { y: [0, -8, 0, 6, 0], x: [0, 5, 0, -4, 0], opacity: [0.5, 0.85, 0.5] }
                : { opacity: 0.6 }
            }
            transition={
              animate
                ? { duration: 7 + t.d * 2, delay: t.d, repeat: Infinity, ease: 'easeInOut' }
                : undefined
            }
          >
            ?
          </motion.span>
        ))}
      </div>

      {/* annotation card */}
      <div className="flex flex-col justify-between rounded-2xl border border-surface-subtle bg-surface-card p-6">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-surface-strong/60 bg-surface-canvas px-3 py-1 font-mono text-[10px] uppercase tracking-wide-label text-surface-fg-secondary">
            <Radio className="h-3 w-3" aria-hidden />
            retrieval = radio call
          </span>
          <p className="mt-4 text-[15px] leading-relaxed text-surface-fg-secondary">
            The most expensive thing in the building — the patient&apos;s time — spent looking for the second-most-expensive thing.
          </p>
        </div>
        <ul className="mt-6 space-y-3 border-t border-surface-subtle pt-5">
          {STATS.map((s) => (
            <li key={s.k} className="flex items-baseline justify-between gap-3">
              <span className="font-mono text-[10px] uppercase tracking-wide-label text-surface-fg-muted">{s.k}</span>
              <span className="font-mono text-sm text-surface-fg">{s.v}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
