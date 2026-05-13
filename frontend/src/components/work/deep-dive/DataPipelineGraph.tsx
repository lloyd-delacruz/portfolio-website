// frontend/src/components/work/deep-dive/DataPipelineGraph.tsx
import React from 'react'
import { SectionShell } from './SectionShell'

export interface PipelineStage {
  title: string
  /** Mono-rendered detail lines */
  lines: string[]
  /** Optional cadence text, e.g. "Daily, 03:00 UTC" */
  cadence?: string
}

export interface DataPipelineGraphProps {
  eyebrow: string
  title: string
  deck?: string
  stages: PipelineStage[]
}

export function DataPipelineGraph({ eyebrow, title, deck, stages }: DataPipelineGraphProps) {
  return (
    <SectionShell eyebrow={eyebrow} title={title} deck={deck}>
      <ol className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-[var(--dd-border)] bg-[var(--dd-border)] md:grid-cols-4">
        {stages.map((stage, idx) => (
          <li key={stage.title} className="bg-[var(--dd-surface)] p-6">
            <div className="dd-mono flex items-baseline justify-between text-[11px] tracking-[0.14em] text-[var(--dd-text-muted)]">
              <span>STAGE {String(idx + 1).padStart(2, '0')}</span>
              {stage.cadence ? <span className="text-[var(--dd-text-dim)]">{stage.cadence}</span> : null}
            </div>
            <h3 className="mt-2 text-base font-medium text-[var(--dd-text)]">{stage.title}</h3>
            <ul className="mt-3 space-y-1 dd-mono text-[12px] text-[var(--dd-text-muted)]">
              {stage.lines.map((line) => (
                <li key={line}>
                  <span aria-hidden className="mr-2 text-[var(--dd-text-dim)]">·</span>
                  {line}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </SectionShell>
  )
}
