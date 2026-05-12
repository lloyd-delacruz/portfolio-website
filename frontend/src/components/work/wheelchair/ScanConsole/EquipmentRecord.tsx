'use client'

import { motion, AnimatePresence } from 'framer-motion'
import type { EquipmentState, LogEntry } from './useScanState'
import { MonoLabel } from '@/components/home/primitives'
import { cn } from '@/lib/utils'

const STATE_COLOR: Record<EquipmentState, string> = {
  in_use:         'border-gold/40 bg-gold/10 text-gold',
  returned:       'border-surface-strong bg-surface-elevated text-surface-fg',
  needs_cleaning: 'border-yellow-500/30 bg-yellow-500/10 text-yellow-400',
  cleaning:       'border-blue-500/30 bg-blue-500/10 text-blue-300',
  available:      'border-signal-live/40 bg-signal-live/10 text-signal-live',
}

const STATE_LABEL: Record<EquipmentState, string> = {
  in_use:         'in use',
  returned:       'returned',
  needs_cleaning: 'needs cleaning',
  cleaning:       'cleaning',
  available:      'available',
}

type Props = {
  current: EquipmentState
  log: LogEntry[]
  reducedMotion: boolean
}

export function EquipmentRecord({ current, log, reducedMotion }: Props) {
  return (
    <div className="flex flex-col p-5 md:p-6 border-r border-surface-subtle">
      <MonoLabel className="block mb-4 text-surface-fg-secondary">equipment record</MonoLabel>

      <div className="rounded-lg border border-surface-subtle bg-surface-card p-4">
        <div className="font-mono text-sm text-surface-fg">EQ-VGH-0287</div>
        <div className="mt-1 text-xs text-surface-fg-secondary">Sunrise Quickie 2</div>
        <div className="mt-1 font-mono text-[10px] text-surface-fg-muted">Site: VGH · Floor 3W</div>

        <div className="mt-4">
          <MonoLabel className="block mb-1.5 text-surface-fg-muted">current state</MonoLabel>
          <AnimatePresence mode="wait">
            <motion.span
              key={current}
              initial={reducedMotion ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className={cn(
                'inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[11px]',
                STATE_COLOR[current]
              )}
            >
              {STATE_LABEL[current]}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      <MonoLabel className="mt-5 mb-2 block text-surface-fg-muted">event log · last 5</MonoLabel>
      <ul className="space-y-1.5 min-h-[120px]">
        <AnimatePresence initial={false}>
          {log.map((entry) => (
            <motion.li
              key={entry.id}
              initial={reducedMotion ? false : { opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.06 }}
              className="font-mono text-[10px] text-surface-fg-secondary"
            >
              {entry.timestamp} · scan @ {entry.site} · {entry.from} → {entry.to} · staff {entry.staffId}
            </motion.li>
          ))}
        </AnimatePresence>
        {log.length === 0 && (
          <li className="font-mono text-[10px] text-surface-fg-muted">
            no events · scan to begin
          </li>
        )}
      </ul>
    </div>
  )
}
