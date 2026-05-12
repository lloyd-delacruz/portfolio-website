'use client'

import { motion, AnimatePresence } from 'framer-motion'
import type { EquipmentState } from './useScanState'
import { MonoLabel } from '@/components/home/primitives'
import { cn } from '@/lib/utils'

const CHIPS: EquipmentState[] = ['in_use', 'returned', 'needs_cleaning', 'cleaning', 'available']

type Props = {
  current: EquipmentState
  scanInFlight: boolean
  reducedMotion: boolean
  allowed: EquipmentState[]
  onScan: (next: EquipmentState) => void
}

export function ScannerPanel({ current, scanInFlight, reducedMotion, allowed, onScan }: Props) {
  return (
    <div className="flex flex-col p-5 md:p-6 border-r border-surface-subtle">
      <MonoLabel className="block mb-4 text-surface-fg-secondary">scanner · vgh-3w</MonoLabel>

      <div className="relative mx-auto w-full max-w-[220px] aspect-[9/16] rounded-2xl bg-surface-elevated border border-surface-subtle overflow-hidden">
        <div className="absolute inset-3 rounded-xl border border-surface-strong/40 bg-surface-canvas flex flex-col items-center justify-center">
          {/* QR mock */}
          <div
            aria-hidden="true"
            className="grid grid-cols-5 grid-rows-5 gap-[2px] w-24 h-24 p-2 bg-white"
          >
            {Array.from({ length: 25 }).map((_, i) => (
              <span
                key={i}
                className={cn(
                  'block',
                  // Pseudo-random pattern — deterministic, no Math.random in render
                  [0,2,3,5,8,11,12,14,17,20,22,24].includes(i) ? 'bg-black' : 'bg-white'
                )}
              />
            ))}
          </div>
          <p className="mt-3 font-mono text-[10px] text-surface-fg-secondary">EQ-VGH-0287</p>

          {/* Scan-sweep line */}
          <AnimatePresence>
            {scanInFlight && !reducedMotion && (
              <motion.span
                key="sweep"
                aria-hidden="true"
                initial={{ top: '12%', opacity: 0 }}
                animate={{ top: '88%', opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: 'linear' }}
                className="absolute left-3 right-3 h-px bg-gold shadow-[0_0_12px_rgba(199,157,106,0.8)]"
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      <p className="mt-5 mb-2 font-mono text-[10px] uppercase tracking-wide-label text-surface-fg-muted">
        scan to next state
      </p>
      <div className="grid grid-cols-2 gap-2">
        {CHIPS.map((chip) => {
          const isAllowed = allowed.includes(chip)
          const isCurrent = chip === current
          return (
            <button
              key={chip}
              type="button"
              disabled={!isAllowed || isCurrent}
              aria-disabled={!isAllowed || isCurrent}
              aria-label={`Scan to state ${chip.replace('_', ' ')}`}
              onClick={() => onScan(chip)}
              className={cn(
                'rounded-md border px-2.5 py-1.5 font-mono text-[11px] text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2',
                isCurrent
                  ? 'border-gold/40 bg-gold/10 text-gold'
                  : isAllowed
                    ? 'border-surface-subtle bg-surface-card text-surface-fg hover:border-gold/30 hover:text-gold'
                    : 'border-surface-subtle bg-surface-canvas text-surface-fg-muted cursor-not-allowed'
              )}
            >
              {chip}
            </button>
          )
        })}
      </div>
    </div>
  )
}
