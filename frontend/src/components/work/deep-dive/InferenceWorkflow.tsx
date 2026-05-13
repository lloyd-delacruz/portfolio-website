// frontend/src/components/work/deep-dive/InferenceWorkflow.tsx
import React from 'react'
import { SectionShell } from './SectionShell'

export interface InferenceWorkflowProps {
  eyebrow: string
  title: string
  deck?: string
  /** The mono-rendered request shape, e.g. one line per field with type annotation */
  request: Array<{ field: string; type: string; note?: string }>
  /** Ordered transform pipeline */
  pipeline: Array<{ step: string; detail: string }>
  /** The mono-rendered response shape */
  response: Array<{ field: string; type: string; note?: string }>
}

function FieldList({ title, items }: { title: string; items: Array<{ field: string; type: string; note?: string }> }) {
  return (
    <div className="dd-card p-6">
      <div className="dd-mono mb-3 text-[11px] tracking-[0.14em] text-[var(--dd-text-muted)]">{title}</div>
      <ul className="dd-mono space-y-1 text-[13px]">
        {items.map((it) => (
          <li key={it.field} className="grid grid-cols-[10rem_1fr_auto] items-baseline gap-4">
            <span className="text-[var(--dd-text)]">{it.field}</span>
            <span className="text-[var(--dd-accent)]">{it.type}</span>
            {it.note ? <span className="text-[12px] text-[var(--dd-text-muted)]">{it.note}</span> : null}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function InferenceWorkflow({ eyebrow, title, deck, request, pipeline, response }: InferenceWorkflowProps) {
  return (
    <SectionShell eyebrow={eyebrow} title={title} deck={deck}>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FieldList title="REQUEST" items={request} />
        <FieldList title="RESPONSE" items={response} />
      </div>
      <ol className="mt-6 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-[var(--dd-border)] bg-[var(--dd-border)] md:grid-cols-5">
        {pipeline.map((stage, idx) => (
          <li key={stage.step} className="bg-[var(--dd-surface)] p-4">
            <div className="dd-mono text-[10px] tracking-[0.14em] text-[var(--dd-text-dim)]">
              {String(idx + 1).padStart(2, '0')}
            </div>
            <div className="mt-1 text-[13px] text-[var(--dd-text)]">{stage.step}</div>
            <div className="mt-1 dd-mono text-[11px] text-[var(--dd-text-muted)]">{stage.detail}</div>
          </li>
        ))}
      </ol>
    </SectionShell>
  )
}
