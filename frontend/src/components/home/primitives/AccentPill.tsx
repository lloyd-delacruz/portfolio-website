import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

type AccentPillProps = { children: ReactNode; className?: string }

export function AccentPill({ children, className }: AccentPillProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border border-paper-subtle bg-paper-card/60 px-2.5 py-1',
        'font-mono text-[10px] uppercase tracking-wide-label text-paper-ink-soft',
        className
      )}
    >
      {children}
    </span>
  )
}
