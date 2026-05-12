import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Props = {
  children: ReactNode
  caption?: string
  className?: string
  ariaLabel?: string
}

export function SurfaceModule({ children, caption, className, ariaLabel }: Props) {
  return (
    <section
      aria-label={ariaLabel}
      className={cn('bg-paper-bg', className)}
    >
      <div className="mx-auto max-w-5xl px-6 pb-20 md:pb-28">
        <div className="rounded-2xl border border-surface-subtle bg-surface-canvas overflow-hidden">
          {children}
        </div>
        {caption && (
          <p className="mt-3 font-mono text-[10px] uppercase tracking-wide-label text-paper-ink-soft text-right">
            {caption}
          </p>
        )}
      </div>
    </section>
  )
}
