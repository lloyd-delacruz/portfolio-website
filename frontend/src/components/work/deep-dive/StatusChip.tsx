// frontend/src/components/work/deep-dive/StatusChip.tsx
import React from 'react'

export type StatusChipItem = { label: string; value: string }

export interface StatusChipProps {
  /** e.g. "Inference live" */
  status: string
  /** Pairs rendered as `<label> <value>` separated by middle dots */
  items: StatusChipItem[]
}

export function StatusChip({ status, items }: StatusChipProps) {
  return (
    <div
      role="status"
      className="dd-mono inline-flex flex-wrap items-center gap-2 rounded-full border border-[var(--dd-border-strong)] bg-[var(--dd-surface-2)] px-3 py-1.5 text-[12px] tracking-[0.02em] text-[var(--dd-text-muted)]"
    >
      <span className="flex items-center gap-1.5">
        <span aria-hidden className="dd-pulse h-1.5 w-1.5 rounded-full bg-[var(--dd-accent)]" />
        <span className="text-[var(--dd-text)]">STATUS</span>
        <span aria-hidden>◉</span>
        <span className="text-[var(--dd-text)]">{status}</span>
      </span>
      {items.map((it) => (
        <React.Fragment key={it.label}>
          <span aria-hidden className="text-[var(--dd-text-dim)]">·</span>
          <span>
            <span className="text-[var(--dd-text-muted)]">{it.label}</span>{' '}
            <span className="text-[var(--dd-text)]">{it.value}</span>
          </span>
        </React.Fragment>
      ))}
    </div>
  )
}
