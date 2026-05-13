// frontend/src/components/work/deep-dive/SystemArchDiagram.tsx
import React from 'react'
import { SectionShell } from './SectionShell'
import { NodeDiagram, type NodeDef, type EdgeDef } from './NodeDiagram'

export interface SystemArchDiagramProps {
  eyebrow: string
  title: string
  deck?: string
  nodes: NodeDef[]
  edges: EdgeDef[]
  cols: number
  rows: number
  caption?: string
}

export function SystemArchDiagram({
  eyebrow,
  title,
  deck,
  nodes,
  edges,
  cols,
  rows,
  caption,
}: SystemArchDiagramProps) {
  return (
    <SectionShell eyebrow={eyebrow} title={title} deck={deck}>
      <div className="dd-card p-8">
        <NodeDiagram cols={cols} rows={rows} nodes={nodes} edges={edges} signalFlow label={title} />
      </div>
      {caption ? (
        <p className="mt-4 dd-mono text-[12px] text-[var(--dd-text-muted)]">{caption}</p>
      ) : null}
    </SectionShell>
  )
}
