'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion'
import { useInViewPause } from '@/lib/hooks/useInViewPause'

type Node = { id: string; label: string; x: number; y: number; r: number; kind: 'core' | 'hospital' | 'system' }

const NODES: Node[] = [
  { id: 'core',         label: 'workflow_core', x: 50, y: 50, r: 2.2, kind: 'core' },
  { id: 'vgh',          label: 'vgh',           x: 20, y: 22, r: 1.4, kind: 'hospital' },
  { id: 'ubc',          label: 'ubc',           x: 80, y: 22, r: 1.4, kind: 'hospital' },
  { id: 'lions_gate',   label: 'lions_gate',    x: 22, y: 78, r: 1.4, kind: 'hospital' },
  { id: 'richmond',     label: 'richmond',      x: 78, y: 78, r: 1.4, kind: 'hospital' },
  { id: 'equitrackr',   label: 'equitrackr',    x: 92, y: 92, r: 0.9, kind: 'system' },
  { id: 'ai_systems',   label: 'ai_systems',    x: 8,  y: 92, r: 0.9, kind: 'system' },
]

const EDGES: [string, string, 'flag' | 'subtle'][] = [
  ['core', 'vgh', 'flag'],
  ['core', 'ubc', 'flag'],
  ['core', 'lions_gate', 'flag'],
  ['core', 'richmond', 'flag'],
  ['vgh', 'ubc', 'subtle'],
  ['lions_gate', 'richmond', 'subtle'],
  ['vgh', 'lions_gate', 'subtle'],
  ['ubc', 'richmond', 'subtle'],
  ['richmond', 'equitrackr', 'subtle'],
  ['lions_gate', 'ai_systems', 'subtle'],
]

function nodeById(id: string) {
  const n = NODES.find((node) => node.id === id)
  if (!n) throw new Error(`SystemsMap: unknown node ${id}`)
  return n
}

const flagEdges = EDGES.filter(([, , k]) => k === 'flag')

export function SystemsMap({ className }: { className?: string }) {
  const reduced = usePrefersReducedMotion()
  const { ref, inView } = useInViewPause<HTMLDivElement>()
  const [fireIndex, setFireIndex] = useState<number | null>(null)
  const animate = !reduced && inView

  useEffect(() => {
    if (!animate) return
    let timeout: ReturnType<typeof setTimeout>
    const schedule = () => {
      const delay = 6000 + Math.random() * 4000
      timeout = setTimeout(() => {
        const next = Math.floor(Math.random() * flagEdges.length)
        setFireIndex(next)
        setTimeout(() => setFireIndex(null), 1100)
        schedule()
      }, delay)
    }
    schedule()
    return () => clearTimeout(timeout)
  }, [animate])

  const firingEdge = fireIndex !== null ? flagEdges[fireIndex] : null
  const firingFrom = firingEdge ? nodeById(firingEdge[0]) : null
  const firingTo   = firingEdge ? nodeById(firingEdge[1]) : null

  return (
    <div ref={ref} className={cn('absolute inset-0', className)}>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="sm-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(var(--accent-gold))" stopOpacity="0.10" />
            <stop offset="100%" stopColor="hsl(var(--accent-gold))" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="50" cy="50" r="42" fill="url(#sm-glow)" />

        {EDGES.map(([from, to, kind], i) => {
          const a = nodeById(from)
          const b = nodeById(to)
          return (
            <line
              key={`${from}-${to}-${i}`}
              x1={a.x} y1={a.y} x2={b.x} y2={b.y}
              stroke={kind === 'flag' ? 'hsl(var(--accent-gold) / 0.42)' : 'rgba(255,255,255,0.10)'}
              strokeWidth={kind === 'flag' ? 0.25 : 0.18}
              strokeDasharray={kind === 'subtle' ? '0.8 0.8' : undefined}
            />
          )
        })}

        <AnimatePresence>
          {firingFrom && firingTo && (
            <motion.circle
              key={`fire-${fireIndex}`}
              r="0.7"
              fill="hsl(var(--accent-gold))"
              initial={{ cx: firingFrom.x, cy: firingFrom.y, opacity: 1 }}
              animate={{ cx: firingTo.x, cy: firingTo.y, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.0, ease: 'easeInOut' }}
            />
          )}
        </AnimatePresence>

        {NODES.map((n) => (
          <g key={n.id}>
            {n.kind === 'core' && animate && (
              <motion.circle
                cx={n.x} cy={n.y} r={n.r}
                fill="hsl(var(--accent-gold))"
                opacity={0.18}
                animate={{ r: [n.r, n.r * 2.4, n.r], opacity: [0.18, 0, 0.18] }}
                transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}
            <circle
              cx={n.x} cy={n.y} r={n.r}
              fill="hsl(var(--surface-canvas))"
              stroke={n.kind === 'core' ? 'hsl(var(--accent-gold) / 0.7)' : 'rgba(255,255,255,0.22)'}
              strokeWidth={n.kind === 'core' ? 0.35 : 0.22}
            />
            <text
              x={n.x + n.r + 1.6}
              y={n.y + 0.6}
              fontSize="1.3"
              fontFamily="var(--font-geist-mono), monospace"
              fill={n.kind === 'core' ? 'hsl(var(--accent-gold))' : 'rgba(170,176,191,0.7)'}
              letterSpacing="0.02"
            >
              {n.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}
