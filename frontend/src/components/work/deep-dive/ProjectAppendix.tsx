// frontend/src/components/work/deep-dive/ProjectAppendix.tsx
import React from 'react'
import { SectionShell } from './SectionShell'

export interface AppendixMetric {
  label: string
  value: string
}

export interface AppendixReference {
  label: string
  href?: string
}

export interface ProjectAppendixProps {
  eyebrow: string
  title: string
  deck?: string
  modelPerformance: AppendixMetric[]
  datasetStats: AppendixMetric[]
  references: AppendixReference[]
  /** Honest note about the surrogate model behind the live panel */
  surrogateNote: string
}

export function ProjectAppendix({
  eyebrow,
  title,
  deck,
  modelPerformance,
  datasetStats,
  references,
  surrogateNote,
}: ProjectAppendixProps) {
  return (
    <SectionShell eyebrow={eyebrow} title={title} deck={deck}>
      <details className="dd-card group p-6">
        <summary className="cursor-pointer list-none">
          <span className="dd-mono text-[12px] tracking-[0.14em] text-[var(--dd-text-muted)]">
            ▸ EXPAND APPENDIX
          </span>
        </summary>
        <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <div className="dd-mono mb-2 text-[11px] tracking-[0.14em] text-[var(--dd-text-muted)]">
              MODEL PERFORMANCE
            </div>
            <ul className="dd-mono text-[13px]">
              {modelPerformance.map((m) => (
                <li key={m.label} className="grid grid-cols-[1fr_auto] gap-4 border-b border-[var(--dd-border)] py-2">
                  <span className="text-[var(--dd-text-muted)]">{m.label}</span>
                  <span className="text-[var(--dd-text)]">{m.value}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="dd-mono mb-2 text-[11px] tracking-[0.14em] text-[var(--dd-text-muted)]">DATASET</div>
            <ul className="dd-mono text-[13px]">
              {datasetStats.map((m) => (
                <li key={m.label} className="grid grid-cols-[1fr_auto] gap-4 border-b border-[var(--dd-border)] py-2">
                  <span className="text-[var(--dd-text-muted)]">{m.label}</span>
                  <span className="text-[var(--dd-text)]">{m.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8">
          <div className="dd-mono mb-2 text-[11px] tracking-[0.14em] text-[var(--dd-text-muted)]">REFERENCES</div>
          <ul className="text-[14px]">
            {references.map((r) => (
              <li key={r.label} className="border-b border-[var(--dd-border)] py-2">
                {r.href ? (
                  <a className="text-[var(--dd-accent)] underline-offset-4 hover:underline" href={r.href}>
                    {r.label}
                  </a>
                ) : (
                  <span className="text-[var(--dd-text)]">{r.label}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-8 border-t border-[var(--dd-border)] pt-6 text-[12px] text-[var(--dd-text-muted)]">
          <span className="dd-mono mr-2 text-[var(--dd-text-dim)]">NOTE</span>
          {surrogateNote}
        </div>
      </details>
    </SectionShell>
  )
}
