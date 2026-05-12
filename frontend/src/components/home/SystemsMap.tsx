// frontend/src/components/home/SystemsMap.tsx
'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion'
import { useInViewPause } from '@/lib/hooks/useInViewPause'

type Hospital = { id: string; label: string; x: number; y: number }

// viewBox is 0..120 wide, 0..96 tall (5:4-ish). Core at center.
const CORE = { x: 60, y: 48 }
const HOSPITALS: Hospital[] = [
  { id: 'vgh',        label: 'VGH',         x: 20, y: 18 },
  { id: 'ubc',        label: 'UBC',         x: 100, y: 18 },
  { id: 'lions_gate', label: 'LIONS GATE',  x: 20, y: 78 },
  { id: 'richmond',   label: 'RICHMOND',    x: 100, y: 78 },
]

// SVG "building" glyph: a few rects, drawn relative to a node center.
function HospitalGlyph({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g stroke="hsl(var(--accent-gold))" strokeWidth={0.5} fill="none">
      <rect x={cx - 2.4} y={cy - 2.6} width={4.8} height={5.6} rx={0.4} />
      <line x1={cx - 1.1} y1={cy - 1.4} x2={cx - 1.1} y2={cy - 0.6} />
      <line x1={cx + 1.1} y1={cy - 1.4} x2={cx + 1.1} y2={cy - 0.6} />
      <line x1={cx - 1.1} y1={cy + 0.4} x2={cx - 1.1} y2={cy + 1.2} />
      <line x1={cx + 1.1} y1={cy + 0.4} x2={cx + 1.1} y2={cy + 1.2} />
    </g>
  )
}

export function SystemsMap({ className }: { className?: string }) {
  const reduced = usePrefersReducedMotion()
  const { ref, inView } = useInViewPause<HTMLDivElement>()
  const animate = !reduced && inView
  const [fireIndex, setFireIndex] = useState<number | null>(null)

  useEffect(() => {
    if (!animate) return
    let timeout: ReturnType<typeof setTimeout>
    const schedule = () => {
      const delay = 5000 + Math.random() * 4000
      timeout = setTimeout(() => {
        setFireIndex(Math.floor(Math.random() * HOSPITALS.length))
        setTimeout(() => setFireIndex(null), 1100)
        schedule()
      }, delay)
    }
    schedule()
    return () => clearTimeout(timeout)
  }, [animate])

  const firingTo = fireIndex !== null ? HOSPITALS[fireIndex] : null

  return (
    <div ref={ref} className={cn('w-full', className)}>
      <svg viewBox="0 0 120 96" className="h-full w-full" aria-hidden="true">
        <defs>
          <pattern id="sm-grid" width="4" height="4" patternUnits="userSpaceOnUse">
            <circle cx="0.4" cy="0.4" r="0.25" fill="rgba(255,255,255,0.05)" />
          </pattern>
          <radialGradient id="sm-core-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(var(--accent-gold))" stopOpacity="0.12" />
            <stop offset="100%" stopColor="hsl(var(--accent-gold))" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect x="0" y="0" width="120" height="96" fill="url(#sm-grid)" />
        <circle cx={CORE.x} cy={CORE.y} r="34" fill="url(#sm-core-glow)" />

        {/* connectors */}
        {HOSPITALS.map((h) => (
          <line
            key={`edge-${h.id}`}
            x1={CORE.x} y1={CORE.y} x2={h.x} y2={h.y}
            stroke="hsl(var(--accent-gold) / 0.4)" strokeWidth={0.35}
          />
        ))}

        {/* traveling pulse */}
        <AnimatePresence>
          {firingTo && (
            <motion.circle
              key={`pulse-${fireIndex}`}
              r="0.9" fill="hsl(var(--accent-gold))"
              initial={{ cx: CORE.x, cy: CORE.y, opacity: 1 }}
              animate={{ cx: firingTo.x, cy: firingTo.y, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.0, ease: 'easeInOut' }}
            />
          )}
        </AnimatePresence>

        {/* core node */}
        {animate && (
          <motion.circle
            cx={CORE.x} cy={CORE.y} r="9"
            fill="none" stroke="hsl(var(--accent-gold))" strokeWidth={0.3}
            animate={{ r: [9, 16, 9], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
        <circle cx={CORE.x} cy={CORE.y} r="11" fill="hsl(var(--surface-canvas))"
          stroke="hsl(var(--accent-gold) / 0.7)" strokeWidth={0.4} />
        <text x={CORE.x} y={CORE.y - 0.5} textAnchor="middle"
          fontSize="2.6" fontFamily="var(--font-geist-mono), monospace"
          fill="hsl(var(--accent-gold))">workflow_core</text>
        <text x={CORE.x} y={CORE.y + 3} textAnchor="middle"
          fontSize="2.4" fontFamily="var(--font-geist-mono), monospace"
          fill="hsl(var(--surface-fg-secondary))">v3.x</text>

        {/* hospital nodes */}
        {HOSPITALS.map((h) => {
          const labelLeft = h.x > CORE.x // node on the right side → label to its right; otherwise left
          return (
            <g key={h.id}>
              <circle cx={h.x} cy={h.y} r="5.4" fill="hsl(var(--surface-canvas))"
                stroke="hsl(var(--accent-gold) / 0.55)" strokeWidth={0.35} />
              <HospitalGlyph cx={h.x} cy={h.y} />
              <text
                x={labelLeft ? h.x + 7 : h.x - 7}
                y={h.y - 4.5}
                textAnchor={labelLeft ? 'start' : 'end'}
                fontSize="2.2" fontFamily="var(--font-geist-mono), monospace"
                fill="hsl(var(--signal-live))"
              >LIVE</text>
              <circle cx={labelLeft ? h.x + 5.6 : h.x - 5.6} cy={h.y - 5.2} r="0.7"
                fill="hsl(var(--signal-live))" />
            </g>
          )
        })}
      </svg>
    </div>
  )
}
