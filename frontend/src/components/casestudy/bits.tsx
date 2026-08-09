// frontend/src/components/casestudy/wheelchair/bits.tsx
import type { ReactNode } from 'react'

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-plum">{children}</p>
}

export function CsSection({
  eyebrow,
  title,
  intro,
  footnote,
  children,
  id,
}: {
  eyebrow: ReactNode
  title: ReactNode
  intro?: ReactNode
  footnote?: ReactNode
  children: ReactNode
  id?: string
}) {
  return (
    <section id={id} className="mx-auto max-w-[1180px] scroll-mt-24 px-6 py-16">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-3 max-w-2xl font-display text-3xl font-extrabold leading-[1.12] text-ink sm:text-[2.4rem]">
        {title}
      </h2>
      {intro && <p className="mt-4 max-w-2xl text-[1.05rem] leading-relaxed text-ink-soft">{intro}</p>}
      <div className="mt-10">{children}</div>
      {footnote && <p className="mt-6 text-xs italic text-ink-muted">{footnote}</p>}
    </section>
  )
}

export function Module({
  children,
  className = '',
  style,
}: {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <div className={`rounded-2xl bg-white p-6 ghair soft-shadow-sm ${className}`} style={style}>
      {children}
    </div>
  )
}

/**
 * Tinted background + dark same-hue ink text, not white-on-fill. White text on
 * --green/--amber/--coral measured 2.15–2.81:1 (fails WCAG AA 4.5:1); these
 * pairings measure 4.6–6.1:1.
 */
export function Chip({ children, tone = 'neutral' }: { children: ReactNode; tone?: 'neutral' | 'plum' | 'green' | 'amber' | 'blue' | 'coral' }) {
  const style: Record<string, React.CSSProperties> = {
    neutral: { background: 'var(--cream-2)', color: 'var(--ink-soft)' },
    plum:    { background: 'var(--plum-soft)', color: 'var(--plum-deep)' },
    green:   { background: 'var(--green-tint)', color: 'var(--green-ink)' },
    amber:   { background: 'var(--amber-tint)', color: 'var(--amber-ink)' },
    blue:    { background: 'var(--blue-tint)', color: 'var(--blue-ink)' },
    coral:   { background: 'var(--coral-tint)', color: 'var(--coral-ink)' },
  }
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium"
      style={style[tone]}
    >
      {children}
    </span>
  )
}
