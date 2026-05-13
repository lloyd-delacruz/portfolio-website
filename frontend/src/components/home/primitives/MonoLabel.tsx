// frontend/src/components/home/primitives/MonoLabel.tsx
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

type MonoLabelProps = { children: ReactNode; className?: string }

export function MonoLabel({ children, className }: MonoLabelProps) {
  return (
    <span className={cn('font-mono text-[10px] uppercase tracking-wide-label text-paper-ink-soft', className)}>
      {children}
    </span>
  )
}
