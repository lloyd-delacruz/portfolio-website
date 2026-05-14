// frontend/src/components/home/SystemArchitectureSketch.tsx
import {
  ScanLine,
  Radio,
  Database,
  GitFork,
  Gauge,
  type LucideIcon,
} from 'lucide-react'

type Node = {
  key: string
  Icon: LucideIcon
  color: string
  title: string
  caption: string
}

const NODES: Node[] = [
  { key: 'scan',     Icon: ScanLine, color: 'var(--plum)',  title: 'QR scan / Mobile',   caption: 'Clinical end'        },
  { key: 'events',   Icon: Radio,    color: 'var(--amber)', title: 'Event stream',       caption: 'Audit log'           },
  { key: 'state',    Icon: Database, color: 'var(--blue)',  title: 'State engine',       caption: 'Asset lifecycle'     },
  { key: 'decision', Icon: GitFork,  color: 'var(--green)', title: 'Decision layer',     caption: 'Routing rules'       },
  { key: 'ops',      Icon: Gauge,    color: 'var(--pink)',  title: 'Operations surface', caption: 'Dashboard · alerts' },
]

const CONNECTOR_LABELS = [
  'event',
  'state transition',
  'rule decision',
  'signal',
  'feedback',
] as const

// Pentagon geometry. ViewBox is near-square so vertices fit with margin.
const W = 480
const H = 440
const CX = W / 2
const CY = H / 2 + 10
const R = 150
const CARD_W = 80
const CARD_H = 80
const HALF = CARD_W / 2

const VERTEX_ANGLES_DEG = [90, 18, -54, -126, 162] as const

const VERTICES = VERTEX_ANGLES_DEG.map((deg) => {
  const rad = (deg * Math.PI) / 180
  return {
    x: CX + R * Math.cos(rad),
    y: CY - R * Math.sin(rad),
  }
})

function segmentEndpoints(
  a: { x: number; y: number },
  b: { x: number; y: number },
) {
  const dx = b.x - a.x
  const dy = b.y - a.y
  const len = Math.hypot(dx, dy)
  const ux = dx / len
  const uy = dy / len
  return {
    x1: a.x + ux * HALF,
    y1: a.y + uy * HALF,
    x2: b.x - ux * HALF,
    y2: b.y - uy * HALF,
  }
}

function labelPosition(
  a: { x: number; y: number },
  b: { x: number; y: number },
  offset = 22,
) {
  const mx = (a.x + b.x) / 2
  const my = (a.y + b.y) / 2
  const dx = b.x - a.x
  const dy = b.y - a.y
  const len = Math.hypot(dx, dy)
  const nx = -dy / len
  const ny = dx / len
  const outward = (mx - CX) * nx + (my - CY) * ny >= 0 ? 1 : -1
  return { x: mx + nx * offset * outward, y: my + ny * offset * outward }
}

const PENTAGON_PATH = (() => {
  let d = ''
  for (let i = 0; i < 5; i++) {
    const a = VERTICES[i]
    const b = VERTICES[(i + 1) % 5]
    const { x1, y1, x2, y2 } = segmentEndpoints(a, b)
    d += (i === 0 ? `M ${x1} ${y1} ` : `L ${x1} ${y1} `) + `L ${x2} ${y2} `
  }
  d += 'Z'
  return d
})()

export function SystemArchitectureSketch() {
  return (
    <div
      className="relative mx-auto w-full max-w-[560px]"
      role="img"
      aria-label="System architecture loop — QR scan, event stream, state engine, decision layer, and operations surface arranged as a closed cycle that feeds back into new scans. Live across 4 hospital sites."
    >
      <div className="relative w-full" style={{ paddingBottom: `${(H / W) * 100}%` }}>
        <div className="absolute inset-0">
          {/* Connectors + labels */}
          <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
            {VERTICES.map((a, i) => {
              const b = VERTICES[(i + 1) % 5]
              const { x1, y1, x2, y2 } = segmentEndpoints(a, b)
              const lp = labelPosition(a, b)
              return (
                <g key={`seg-${i}`}>
                  <line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="var(--plum)"
                    strokeWidth={1.5}
                    strokeOpacity={0.45}
                    strokeLinecap="round"
                  />
                  <line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="var(--plum)"
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    pathLength={1}
                    strokeDasharray="1 1"
                    strokeDashoffset={1}
                    opacity={0}
                    className="anim-seg-wash"
                    style={{ animationDelay: `${i * 1.0}s` }}
                  />
                  <circle cx={x1} cy={y1} r={2.4} fill="var(--plum)" opacity={0.7} />
                  <circle cx={x2} cy={y2} r={2.4} fill="var(--plum)" opacity={0.7} />
                  <text
                    x={lp.x}
                    y={lp.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="9"
                    fontWeight="600"
                    fill="var(--ink-muted)"
                    style={{ letterSpacing: '0.14em', textTransform: 'uppercase' }}
                  >
                    {CONNECTOR_LABELS[i]}
                  </text>
                </g>
              )
            })}

            {/* Heartbeat pulse — main rhythm */}
            <circle
              r={3.5}
              fill="var(--plum)"
              className="anim-heartbeat"
              style={{ offsetPath: `path('${PENTAGON_PATH}')` }}
            />

            {/* Counter-flow ack pulse — quieter feedback signal, runs every ~3 main loops */}
            <circle
              r={2}
              fill="var(--ink-soft)"
              opacity={0}
              className="anim-ack"
              style={{ offsetPath: `path('${PENTAGON_PATH}')` }}
            />

            {/* Sonar rings — one per node, fires during that node's dwell */}
            {VERTICES.map((v, i) => (
              <circle
                key={`sonar-${i}`}
                cx={v.x}
                cy={v.y}
                r={0}
                fill="none"
                stroke="var(--plum)"
                strokeWidth={1.5}
                opacity={0}
                className="anim-sonar"
                style={{ animationDelay: `${i * 1.0}s` }}
              />
            ))}
          </svg>

          {/* Node cards */}
          {NODES.map((n, i) => {
            const v = VERTICES[i]
            return (
              <div
                key={n.key}
                className="absolute"
                style={{
                  width: CARD_W,
                  height: CARD_H,
                  left: `${(v.x / W) * 100}%`,
                  top: `${(v.y / H) * 100}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div className="flex h-full w-full flex-col items-center justify-center gap-1 rounded-2xl bg-white ghair soft-shadow-sm">
                  <n.Icon size={22} style={{ color: n.color }} strokeWidth={1.9} />
                  <span className="px-1 text-center font-display text-[12px] font-semibold leading-tight text-ink">
                    {n.title}
                  </span>
                </div>
                <span
                  className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.14em] text-ink-muted"
                  style={{ top: `${CARD_H + 6}px` }}
                >
                  {n.caption}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      <p className="mt-4 text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
        Wheelchair Tracking — live across 4 sites · 800+ assets
      </p>
      <p className="mt-1.5 text-center text-[10px] uppercase tracking-[0.14em] text-ink-muted">
        Microsoft Lists + QR workflows · React · TypeScript
      </p>
    </div>
  )
}
