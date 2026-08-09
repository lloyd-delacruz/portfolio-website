// frontend/src/components/casestudy/mepp/svg.tsx
// Small inline-SVG primitives shared by the MEPP case study diagrams.
// No dependencies: every diagram is hand-laid-out inside a viewBox.
import type { ReactNode } from 'react'

const INK = 'var(--ink)'
const MUTED = 'var(--ink-muted)'
const LINE = 'var(--line-strong)'

export type BoxTone = 'plain' | 'plum' | 'muted'

export function DBox({
  x,
  y,
  w,
  h,
  label,
  sub,
  tone = 'plain',
  fs = 12.5,
}: {
  x: number
  y: number
  w: number
  h: number
  label: string
  sub?: string
  tone?: BoxTone
  fs?: number
}) {
  const fill = tone === 'plum' ? 'var(--plum-soft)' : tone === 'muted' ? 'var(--cream-2)' : '#ffffff'
  const stroke = tone === 'plum' ? 'rgba(109,40,217,0.38)' : LINE
  const cx = x + w / 2
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={10} style={{ fill, stroke }} strokeWidth={1} />
      <text
        x={cx}
        y={sub ? y + h / 2 - 2 : y + h / 2 + 4}
        textAnchor="middle"
        fontSize={fs}
        fontWeight={700}
        style={{ fill: INK }}
      >
        {label}
      </text>
      {sub && (
        <text x={cx} y={y + h / 2 + 13} textAnchor="middle" fontSize={fs - 2.5} style={{ fill: MUTED }}>
          {sub}
        </text>
      )}
    </g>
  )
}

export function HArrow({
  x1,
  x2,
  y,
  dashed,
  tone = 'muted',
}: {
  x1: number
  x2: number
  y: number
  dashed?: boolean
  tone?: 'muted' | 'plum'
}) {
  const color = tone === 'plum' ? 'var(--plum)' : MUTED
  const dir = x2 > x1 ? 1 : -1
  const base = x2 - dir * 7
  return (
    <g>
      <line
        x1={x1}
        y1={y}
        x2={base}
        y2={y}
        style={{ stroke: color }}
        strokeWidth={1.4}
        strokeDasharray={dashed ? '4 4' : undefined}
      />
      <polygon points={`${x2},${y} ${base},${y - 4.2} ${base},${y + 4.2}`} style={{ fill: color }} />
    </g>
  )
}

export function VArrow({
  x,
  y1,
  y2,
  dashed,
  tone = 'muted',
}: {
  x: number
  y1: number
  y2: number
  dashed?: boolean
  tone?: 'muted' | 'plum'
}) {
  const color = tone === 'plum' ? 'var(--plum)' : MUTED
  const dir = y2 > y1 ? 1 : -1
  const base = y2 - dir * 7
  return (
    <g>
      <line
        x1={x}
        y1={y1}
        x2={x}
        y2={base}
        style={{ stroke: color }}
        strokeWidth={1.4}
        strokeDasharray={dashed ? '4 4' : undefined}
      />
      <polygon points={`${x},${y2} ${x - 4.2},${base} ${x + 4.2},${base}`} style={{ fill: color }} />
    </g>
  )
}

/** Dashed enclosing rectangle used for the tenant trust boundary. */
export function Boundary({
  x,
  y,
  w,
  h,
  label,
}: {
  x: number
  y: number
  w: number
  h: number
  label: string
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={16}
        style={{ fill: 'rgba(109,40,217,0.04)', stroke: 'var(--plum)' }}
        strokeWidth={1.3}
        strokeDasharray="6 5"
      />
      <text
        x={x + 14}
        y={y + 19}
        fontSize={10.5}
        fontWeight={700}
        letterSpacing={0.6}
        style={{ fill: 'var(--plum)' }}
      >
        {label}
      </text>
    </g>
  )
}

/**
 * Wraps a pair of diagrams: a wide layout for md+ and a stacked layout below md.
 * Only one is ever displayed, so both may carry role="img" without duplicate
 * announcements.
 */
export function DiagramPair({
  wide,
  stacked,
  caption,
}: {
  wide: ReactNode
  stacked: ReactNode
  caption?: ReactNode
}) {
  return (
    <div>
      <div className="md:hidden">{stacked}</div>
      <div className="hidden md:block">{wide}</div>
      {caption && <p className="mt-4 text-xs leading-relaxed text-ink-muted">{caption}</p>}
    </div>
  )
}
