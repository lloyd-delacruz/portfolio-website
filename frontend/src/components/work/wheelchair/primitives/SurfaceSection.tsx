import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { MonoLabel } from '@/components/home/primitives'

type Props = {
  label: string
  heading: ReactNode
  intro?: ReactNode
  children: ReactNode
  footnote?: string
  className?: string
}

/**
 * Dark "surface" register section: mono eyebrow, short heading, optional
 * one-line intro, a diagram/visual, and a single small footnote.
 * Replaces the old PaperPillar essay blocks.
 */
export function SurfaceSection({
  label,
  heading,
  intro,
  children,
  footnote,
  className,
}: Props) {
  return (
    <section className={cn('border-t border-surface-subtle bg-surface-canvas text-surface-fg', className)}>
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <MonoLabel className="block mb-4 text-gold">{label}</MonoLabel>
        <h2 className="text-3xl md:text-4xl font-medium tracking-tight-h text-surface-fg max-w-[26ch]">
          {heading}
        </h2>
        {intro && (
          <p className="mt-4 text-base md:text-lg text-surface-fg-secondary max-w-[56ch]">
            {intro}
          </p>
        )}
        <div className="mt-10 md:mt-12">{children}</div>
        {footnote && (
          <p className="mt-8 font-mono text-[10px] uppercase tracking-wide-label text-surface-fg-muted">
            {footnote}
          </p>
        )}
      </div>
    </section>
  )
}
