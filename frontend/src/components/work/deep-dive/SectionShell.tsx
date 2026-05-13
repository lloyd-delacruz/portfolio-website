// frontend/src/components/work/deep-dive/SectionShell.tsx
import React from 'react'

export interface SectionShellProps {
  /** Small tracking-spaced eyebrow, e.g. "02 / OPERATIONAL PROBLEM" */
  eyebrow: string
  /** Section title shown below eyebrow */
  title: string
  /** Optional one-line deck under the title */
  deck?: string
  children: React.ReactNode
}

export function SectionShell({ eyebrow, title, deck, children }: SectionShellProps) {
  return (
    <section className="dd-section">
      <div className="mx-auto max-w-6xl px-6">
        <div className="dd-mono mb-3 text-[11px] tracking-[0.14em] text-[var(--dd-text-muted)]">{eyebrow}</div>
        <h2 className="text-2xl font-semibold tracking-tight text-[var(--dd-text)] md:text-3xl">{title}</h2>
        {deck ? <p className="mt-2 max-w-[70ch] text-[var(--dd-text-muted)]">{deck}</p> : null}
        <div className="mt-10">{children}</div>
      </div>
    </section>
  )
}
