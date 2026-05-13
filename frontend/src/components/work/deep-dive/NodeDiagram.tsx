// frontend/src/components/work/deep-dive/NodeDiagram.tsx
import React from 'react'

export interface NodeDef {
  id: string
  /** Grid column (0-indexed) */
  col: number
  /** Grid row (0-indexed) */
  row: number
  title: string
  /** Optional body lines rendered below the title in mono */
  lines?: string[]
}

export interface EdgeDef {
  from: string
  to: string
}

export interface NodeDiagramProps {
  nodes: NodeDef[]
  edges: EdgeDef[]
  /** When true, animates a single cyan signal dot along the first edge chain */
  signalFlow?: boolean
  /** Number of columns; rendered width is responsive */
  cols: number
  /** Number of rows */
  rows: number
  /** Optional aria-label for the diagram */
  label?: string
}

const COL_W = 220
const ROW_H = 130
const NODE_W = 200
const NODE_H = 96
const PAD = 24

export function NodeDiagram({ nodes, edges, signalFlow, cols, rows, label }: NodeDiagramProps) {
  const width = cols * COL_W + PAD * 2
  const height = rows * ROW_H + PAD * 2

  const nodeCenter = (n: NodeDef) => ({
    x: PAD + n.col * COL_W + NODE_W / 2,
    y: PAD + n.row * ROW_H + NODE_H / 2,
  })

  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]))

  return (
    <svg
      role="img"
      aria-label={label}
      viewBox={`0 0 ${width} ${height}`}
      className="h-auto w-full"
      style={{ maxHeight: 480 }}
    >
      {/* Orthogonal edge routing — handles L→R, R→L, and vertical (same-column) cases */}
      {edges.map((e, i) => {
        const a = byId[e.from]
        const b = byId[e.to]
        if (!a || !b) return null
        const ac = nodeCenter(a)
        const bc = nodeCenter(b)

        let path: string
        if (ac.x === bc.x) {
          // Same column: straight vertical line between facing edges
          const y1 = ac.y + (bc.y > ac.y ? NODE_H / 2 : -NODE_H / 2)
          const y2 = bc.y + (bc.y > ac.y ? -NODE_H / 2 : NODE_H / 2)
          path = `M ${ac.x} ${y1} V ${y2}`
        } else if (bc.x > ac.x) {
          // Left-to-right: exit right edge of A, enter left edge of B
          const midX = (ac.x + bc.x) / 2
          path = `M ${ac.x + NODE_W / 2} ${ac.y} H ${midX} V ${bc.y} H ${bc.x - NODE_W / 2}`
        } else {
          // Right-to-left: exit left edge of A, enter right edge of B
          const midX = (ac.x + bc.x) / 2
          path = `M ${ac.x - NODE_W / 2} ${ac.y} H ${midX} V ${bc.y} H ${bc.x + NODE_W / 2}`
        }

        return (
          <g key={`${e.from}-${e.to}-${i}`}>
            <path d={path} fill="none" stroke="var(--dd-border-strong)" strokeWidth={1} />
            {signalFlow && i === 0 ? (
              <circle r={3} fill="var(--dd-accent)" className="dd-signal" style={{ offsetPath: `path('${path}')` }} />
            ) : null}
          </g>
        )
      })}

      {/* Nodes */}
      {nodes.map((n) => {
        const x = PAD + n.col * COL_W
        const y = PAD + n.row * ROW_H
        return (
          <g key={n.id} transform={`translate(${x} ${y})`}>
            <rect
              width={NODE_W}
              height={NODE_H}
              rx={8}
              fill="var(--dd-surface)"
              stroke="var(--dd-border)"
              strokeWidth={1}
            />
            <text
              x={14}
              y={22}
              fill="var(--dd-text)"
              fontSize={13}
              fontFamily="var(--dd-font-sans)"
              fontWeight={500}
            >
              {n.title}
            </text>
            {n.lines?.map((line, idx) => (
              <text
                key={idx}
                x={14}
                y={40 + idx * 14}
                fill="var(--dd-text-muted)"
                fontSize={11}
                fontFamily="var(--dd-font-mono)"
              >
                {line}
              </text>
            ))}
          </g>
        )
      })}
    </svg>
  )
}
