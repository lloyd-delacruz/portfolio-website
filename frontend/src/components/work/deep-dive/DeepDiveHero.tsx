// frontend/src/components/work/deep-dive/DeepDiveHero.tsx
import React from 'react'
import { StatusChip, type StatusChipItem } from './StatusChip'
import { NodeDiagram, type NodeDef, type EdgeDef } from './NodeDiagram'

export interface DeepDiveHeroProps {
  /** Small all-caps eyebrow, e.g. "APPLIED AI / OPERATIONAL INTELLIGENCE" */
  eyebrow: string
  title: string
  subtitle: string
  frame: string
  status: string
  statusItems: StatusChipItem[]
  glyphNodes: NodeDef[]
  glyphEdges: EdgeDef[]
}

export function DeepDiveHero({
  eyebrow,
  title,
  subtitle,
  frame,
  status,
  statusItems,
  glyphNodes,
  glyphEdges,
}: DeepDiveHeroProps) {
  return (
    <section className="dd-section" style={{ paddingTop: 120 }}>
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 md:grid-cols-[1.2fr_1fr] md:items-center">
        <div>
          <div className="dd-mono text-[11px] tracking-[0.14em] text-[var(--dd-text-muted)]">{eyebrow}</div>
          <h1 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight text-[var(--dd-text)] md:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-[60ch] text-lg text-[var(--dd-text-muted)]">{subtitle}</p>
          <p className="mt-6 max-w-[68ch] text-[var(--dd-text)] dd-prose">{frame}</p>
          <div className="mt-8">
            <StatusChip status={status} items={statusItems} />
          </div>
        </div>
        <div className="dd-card p-6">
          <div className="dd-mono mb-4 text-[11px] tracking-[0.14em] text-[var(--dd-text-muted)]">
            ARCHITECTURE GLYPH
          </div>
          <NodeDiagram
            cols={3}
            rows={3}
            nodes={glyphNodes}
            edges={glyphEdges}
            signalFlow
            label={`${title} — system architecture glyph`}
          />
        </div>
      </div>
    </section>
  )
}
