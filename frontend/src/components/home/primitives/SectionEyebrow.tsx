// frontend/src/components/home/primitives/SectionEyebrow.tsx
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

type SectionEyebrowProps = { children: ReactNode; className?: string }

export function SectionEyebrow({ children, className }: SectionEyebrowProps) {
  return (
    <p className={cn('text-[11px] font-bold uppercase tracking-wide-label text-gold-ink', className)}>
      {children}
    </p>
  )
}
