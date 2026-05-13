// frontend/src/components/work/deep-dive/DecisionImpact.tsx
import React from 'react'
import { SectionShell } from './SectionShell'

export interface DecisionScenario {
  operator: string
  scenario: string
}

export interface DecisionImpactProps {
  eyebrow: string
  title: string
  deck?: string
  scenarios: DecisionScenario[]
}

export function DecisionImpact({ eyebrow, title, deck, scenarios }: DecisionImpactProps) {
  return (
    <SectionShell eyebrow={eyebrow} title={title} deck={deck}>
      <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-[var(--dd-border)] bg-[var(--dd-border)] md:grid-cols-3">
        {scenarios.map((s) => (
          <li key={s.operator} className="bg-[var(--dd-surface)] p-6">
            <div className="dd-mono text-[11px] tracking-[0.14em] text-[var(--dd-accent)]">{s.operator}</div>
            <p className="mt-3 text-[15px] leading-[1.6] text-[var(--dd-text)]">{s.scenario}</p>
          </li>
        ))}
      </ul>
    </SectionShell>
  )
}
