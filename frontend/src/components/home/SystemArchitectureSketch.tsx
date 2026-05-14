// frontend/src/components/home/SystemArchitectureSketch.tsx
import {
  ScanLine,
  GitFork,
  Gauge,
  type LucideIcon,
} from 'lucide-react'

type Node = {
  key: string
  Icon: LucideIcon
  title: string
  caption: string
  x: number
  y: number
}

const W = 480
const H = 380
const CARD_W = 132
const CARD_H = 84
const HALF_W = CARD_W / 2
const HALF_H = CARD_H / 2

const NODES: Node[] = [
  { key: 'scan',   Icon: ScanLine, title: 'QR scan',                 caption: 'Clinical end',        x: 110, y: 90  },
  { key: 'engine', Icon: GitFork,  title: 'State + decision engine', caption: 'Lifecycle + routing', x: 340, y: 195 },
  { key: 'ops',    Icon: Gauge,    title: 'Operations surface',      caption: 'Dashboard · alerts',  x: 140, y: 300 },
]

function edgeEndpoints(
  a: { x: number; y: number },
  b: { x: number; y: number },
) {
  const dx = b.x - a.x
  const dy = b.y - a.y
  const len = Math.hypot(dx, dy)
  const ux = dx / len
  const uy = dy / len
  const off = Math.min(
    HALF_W / Math.max(Math.abs(ux), 0.0001),
    HALF_H / Math.max(Math.abs(uy), 0.0001),
  )
  return {
    x1: a.x + ux * off,
    y1: a.y + uy * off,
    x2: b.x - ux * off,
    y2: b.y - uy * off,
  }
}

const SCAN = NODES[0]
const ENGINE = NODES[1]
const OPS = NODES[2]

const FORWARD_A = edgeEndpoints(SCAN, ENGINE)
const FORWARD_B = edgeEndpoints(ENGINE, OPS)
const FEEDBACK = edgeEndpoints(OPS, SCAN)

const TRAVEL_PATH =
  `M ${FORWARD_A.x1} ${FORWARD_A.y1} ` +
  `L ${FORWARD_A.x2} ${FORWARD_A.y2} ` +
  `M ${FORWARD_B.x1} ${FORWARD_B.y1} ` +
  `L ${FORWARD_B.x2} ${FORWARD_B.y2} ` +
  `M ${FEEDBACK.x1} ${FEEDBACK.y1} ` +
  `L ${FEEDBACK.x2} ${FEEDBACK.y2}`

export function SystemArchitectureSketch() {
  return (
    <div
      className="relative mx-auto w-full max-w-[560px] overflow-hidden rounded-2xl bg-white ghair soft-shadow-sm"
      role="img"
      aria-label="System architecture: QR scan feeds a state and decision engine, which feeds an operations surface; a quieter feedback connector returns to scan. Live across 4 hospital sites."
    >
      <div className="relative w-full" style={{ paddingBottom: `${(H / W) * 100}%` }}>
        <div className="absolute inset-0">
          <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
            <line
              x1={FORWARD_A.x1} y1={FORWARD_A.y1} x2={FORWARD_A.x2} y2={FORWARD_A.y2}
              stroke="var(--plum)" strokeWidth={1.5} strokeOpacity={0.45} strokeLinecap="round"
            />
            <line
              x1={FORWARD_B.x1} y1={FORWARD_B.y1} x2={FORWARD_B.x2} y2={FORWARD_B.y2}
              stroke="var(--plum)" strokeWidth={1.5} strokeOpacity={0.45} strokeLinecap="round"
            />
            <line
              x1={FEEDBACK.x1} y1={FEEDBACK.y1} x2={FEEDBACK.x2} y2={FEEDBACK.y2}
              stroke="var(--plum)" strokeWidth={1} strokeOpacity={0.3}
              strokeDasharray="4 5" strokeLinecap="round"
            />
            <circle
              r={3.5}
              fill="var(--plum)"
              className="anim-heartbeat"
              style={{ offsetPath: `path('${TRAVEL_PATH}')` }}
            />
          </svg>

          {NODES.map((n) => (
            <div
              key={n.key}
              className="absolute"
              style={{
                width: CARD_W,
                height: CARD_H,
                left: `${(n.x / W) * 100}%`,
                top: `${(n.y / H) * 100}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div className="flex h-full w-full flex-col items-center justify-center gap-1 rounded-xl bg-white ghair soft-shadow-sm">
                <n.Icon size={20} style={{ color: 'var(--plum)' }} strokeWidth={1.9} aria-hidden />
                <span className="px-2 text-center font-display text-[12.5px] font-semibold leading-tight text-ink">
                  {n.title}
                </span>
                <span className="px-2 text-center text-[9.5px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                  {n.caption}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 border-t border-[var(--line)] px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
        <span className="inline-flex items-center gap-1.5 text-ink-soft">
          <span className="h-2 w-2 rounded-full" style={{ background: 'var(--green)' }} aria-hidden />
          Live
        </span>
        <span aria-hidden>·</span>
        <span>4 sites</span>
        <span aria-hidden>·</span>
        <span>800+ assets</span>
        <span aria-hidden>·</span>
        <span>Microsoft Lists + QR</span>
        <span aria-hidden>·</span>
        <span>React</span>
        <span aria-hidden>·</span>
        <span>TypeScript</span>
      </div>
    </div>
  )
}
