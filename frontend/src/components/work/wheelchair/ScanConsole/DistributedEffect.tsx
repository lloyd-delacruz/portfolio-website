'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { MonoLabel } from '@/components/home/primitives'

type SiteNode = { id: string; label: string; x: number; y: number; available: number }

const SITES: SiteNode[] = [
  { id: 'vgh',        label: 'vgh',        x: 22, y: 26, available: 187 },
  { id: 'ubc',        label: 'ubc',        x: 78, y: 26, available: 162 },
  { id: 'lions_gate', label: 'lions_gate', x: 22, y: 74, available: 144 },
  { id: 'richmond',   label: 'richmond',   x: 78, y: 74, available: 138 },
]

type Props = {
  scanInFlight: boolean
  reducedMotion: boolean
  activeSite: string
  vghAvailable: number
}

export function DistributedEffect({ scanInFlight, reducedMotion, activeSite, vghAvailable }: Props) {
  const source = SITES.find((s) => s.id === activeSite) ?? SITES[0]

  return (
    <div className="flex flex-col p-5 md:p-6">
      <MonoLabel className="block mb-4 text-surface-fg-secondary">distributed effect</MonoLabel>

      <div className="relative aspect-square w-full max-w-[260px] mx-auto">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
          {/* Edges from each site to centre */}
          {SITES.map((s) => (
            <line
              key={s.id}
              x1={s.x} y1={s.y} x2={50} y2={50}
              stroke="rgba(255,255,255,0.10)"
              strokeWidth={0.25}
              strokeDasharray="0.8 0.8"
            />
          ))}

          {/* Centre core */}
          <circle cx="50" cy="50" r="2.4" fill="hsl(var(--surface-canvas))" stroke="hsl(var(--accent-gold) / 0.75)" strokeWidth="0.35" />
          <text x="53" y="50.6" fontSize="1.5" fontFamily="var(--font-geist-mono), monospace" fill="hsl(var(--accent-gold))">
            workflow_core
          </text>

          {/* Site nodes */}
          {SITES.map((s) => (
            <g key={s.id}>
              <circle
                cx={s.x} cy={s.y} r="1.5"
                fill="hsl(var(--surface-canvas))"
                stroke="rgba(170,176,191,0.5)"
                strokeWidth="0.22"
              />
              <text
                x={s.x + 2.2} y={s.y + 0.6}
                fontSize="1.4"
                fontFamily="var(--font-geist-mono), monospace"
                fill="rgba(170,176,191,0.7)"
              >
                {s.label}
              </text>
            </g>
          ))}

          {/* Fire dot from source → core */}
          <AnimatePresence>
            {scanInFlight && !reducedMotion && (
              <motion.circle
                key="fire"
                r="0.9"
                fill="hsl(var(--accent-gold))"
                initial={{ cx: source.x, cy: source.y, opacity: 1 }}
                animate={{ cx: 50, cy: 50 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              />
            )}
          </AnimatePresence>

          {/* Ripple on peer nodes after dot lands */}
          <AnimatePresence>
            {scanInFlight && !reducedMotion && SITES.filter((s) => s.id !== source.id).map((s) => (
              <motion.circle
                key={`ripple-${s.id}`}
                cx={s.x} cy={s.y}
                fill="none"
                stroke="hsl(var(--accent-gold) / 0.6)"
                strokeWidth={0.2}
                initial={{ r: 1.5, opacity: 0 }}
                animate={{ r: 3.2, opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.35, ease: 'easeOut' }}
                exit={{ opacity: 0 }}
              />
            ))}
          </AnimatePresence>
        </svg>
      </div>

      <MonoLabel className="mt-4 mb-1 block text-surface-fg-muted">site available · live</MonoLabel>
      <ul className="grid grid-cols-2 gap-x-3 gap-y-1">
        {SITES.map((s) => (
          <li key={s.id} className="flex items-center justify-between font-mono text-[11px]">
            <span className="text-surface-fg-secondary">{s.label}</span>
            <span className="text-surface-fg">
              {s.id === 'vgh' ? vghAvailable : s.available}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
