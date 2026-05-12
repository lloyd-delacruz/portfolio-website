import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

type AccentPillProps = { children: ReactNode; className?: string }

export function AccentPill({ children, className }: AccentPillProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border border-surface-subtle bg-surface-card/50 px-2.5 py-1',
        'font-mono text-[10px] uppercase tracking-wide-label text-surface-fg-secondary',
        className
      )}
    >
      {children}
    </span>
  )
}
