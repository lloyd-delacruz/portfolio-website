// frontend/src/components/work/deep-dive/FutureScalability.tsx
import React from 'react'
import { SectionShell } from './SectionShell'

export interface FutureScalabilityProps {
  eyebrow: string
  title: string
  deck?: string
  items: Array<{ heading: string; body: string }>
}

export function FutureScalability({ eyebrow, title, deck, items }: FutureScalabilityProps) {
  return (
    <SectionShell eyebrow={eyebrow} title={title} deck={deck}>
      <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {items.map((it) => (
          <li key={it.heading} className="dd-card p-6">
            <div className="dd-mono text-[11px] tracking-[0.14em] text-[var(--dd-text-muted)]">FUTURE</div>
            <h3 className="mt-2 text-base font-medium text-[var(--dd-text)]">{it.heading}</h3>
            <p className="mt-2 text-[14px] leading-[1.6] text-[var(--dd-text-muted)]">{it.body}</p>
          </li>
        ))}
      </ul>
    </SectionShell>
  )
}
