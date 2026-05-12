import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Props = {
  eyebrow: string
  display: ReactNode
  children: ReactNode
  className?: string
}

export function PaperPillar({ eyebrow, display, children, className }: Props) {
  return (
    <section className={cn('bg-paper-bg text-paper-ink', className)}>
      <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <p className="font-mono text-[10px] uppercase tracking-wide-label text-paper-ink-soft mb-6">
          {eyebrow}
        </p>
        <h2 className="font-serif text-3xl md:text-5xl leading-[1.1] text-paper-ink max-w-[24ch] mb-8">
          {display}
        </h2>
        <div className="font-serif text-lg md:text-xl leading-[1.7] text-paper-ink space-y-5 max-w-[64ch]">
          {children}
        </div>
      </div>
    </section>
  )
}
