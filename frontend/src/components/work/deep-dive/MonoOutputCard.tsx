// frontend/src/components/work/deep-dive/MonoOutputCard.tsx
import React from 'react'

export type Tone = 'default' | 'accent' | 'ok' | 'warn' | 'danger'

export interface MonoOutputCardProps {
  /** Top headline pair, e.g. "PROJECTED LIFE EXPECTANCY" / "72.4 years" */
  headline: { label: string; value: string; suffix?: string }
  /** Optional sub-line e.g. "±1.8 (90% CI)" */
  sub?: string
  /** Sectioned key/value blocks rendered below the headline */
  sections?: Array<{
    title: string
    rows: Array<{ label: string; value: string; tone?: Tone }>
  }>
  /** Bottom-strip text e.g. "vs. national baseline (2015): +4.1 years" */
  footer?: string
  /** Optional flag indicator, e.g. ambiguity flag */
  flag?: { label: string; active: boolean; note?: string }
}

const TONE_CLASS: Record<Tone, string> = {
  default: 'text-[var(--dd-text)]',
  accent: 'text-[var(--dd-accent)]',
  ok: 'text-[var(--dd-ok)]',
  warn: 'text-[var(--dd-warn)]',
  danger: 'text-[var(--dd-danger)]',
}

export function MonoOutputCard({ headline, sub, sections, footer, flag }: MonoOutputCardProps) {
  return (
    <div className="dd-card dd-mono p-6 text-[13px] leading-[1.7]">
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <span className="text-[11px] tracking-[0.08em] text-[var(--dd-text-muted)]">{headline.label}</span>
        <span className="text-[28px] font-semibold tracking-tight text-[var(--dd-text)]">{headline.value}</span>
        {headline.suffix ? (
          <span className="text-[13px] text-[var(--dd-text-muted)]">{headline.suffix}</span>
        ) : null}
      </div>
      {sub ? <div className="mt-1 text-[var(--dd-text-muted)]">{sub}</div> : null}

      {flag ? (
        <div className="mt-4 flex items-center gap-2 border-t border-[var(--dd-border)] pt-4 text-[12px]">
          <span
            aria-hidden
            className={`inline-block h-3 w-3 border ${flag.active ? 'border-[var(--dd-warn)] bg-[var(--dd-warn)]' : 'border-[var(--dd-border-strong)]'}`}
          />
          <span className="text-[var(--dd-text-muted)]">{flag.label}</span>
          {flag.note ? <span className="text-[var(--dd-text-dim)]">{flag.note}</span> : null}
        </div>
      ) : null}

      {sections?.map((section) => (
        <div key={section.title} className="mt-5 border-t border-[var(--dd-border)] pt-4">
          <div className="text-[11px] tracking-[0.08em] text-[var(--dd-text-muted)]">{section.title}</div>
          <ul className="mt-2 space-y-1">
            {section.rows.map((row) => (
              <li key={row.label} className="grid grid-cols-[1fr_auto] items-baseline gap-4">
                <span className="text-[var(--dd-text)]">
                  <span aria-hidden className="mr-2 text-[var(--dd-text-dim)]">▸</span>
                  {row.label}
                </span>
                <span className={TONE_CLASS[row.tone ?? 'default']}>{row.value}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {footer ? (
        <div className="mt-5 border-t border-[var(--dd-border)] pt-4 text-[12px] text-[var(--dd-text-muted)]">{footer}</div>
      ) : null}
    </div>
  )
}
