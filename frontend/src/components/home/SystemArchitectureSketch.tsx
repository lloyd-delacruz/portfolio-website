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
  { key: 'scan',     Icon: ScanLine, color: 'var(--plum)',  title: 'QR scan / Mobile',  caption: 'Clinical end'        },
  { key: 'events',   Icon: Radio,    color: 'var(--amber)', title: 'Event stream',      caption: 'Audit log'           },
  { key: 'state',    Icon: Database, color: 'var(--blue)',  title: 'State engine',      caption: 'Asset lifecycle'     },
  { key: 'decision', Icon: GitFork,  color: 'var(--green)', title: 'Decision layer',    caption: 'Routing rules'       },
  { key: 'ops',      Icon: Gauge,    color: 'var(--pink)',  title: 'Operations surface', caption: 'Dashboard · alerts' },
]

const CONNECTOR_LABELS = ['event', 'state transition', 'rule decision', 'signal']

// Design space — 5 evenly spaced columns over 560 wide; row centered at y=170.
const W = 560
const H = 360
const ROW_Y = 170
const CARD_W = 96
const CARD_H = 88
const X = (i: number) => Math.round((W / 5) * (i + 0.5))
const HALF = CARD_W / 2

export function SystemArchitectureSketch() {
  return (
    <div
      className="relative mx-auto w-full max-w-[560px]"
      role="img"
      aria-label="System architecture — QR scan to event stream to state engine to decision layer to operations surface, live across 4 hospital sites"
    >
      <div className="relative w-full" style={{ paddingBottom: `${(H / W) * 100}%` }}>
        <div className="absolute inset-0">
          {/* Connectors */}
          <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
            {NODES.slice(0, -1).map((n, i) => {
              const x1 = X(i) + HALF
              const x2 = X(i + 1) - HALF
              return (
                <g key={`seg-${n.key}`}>
                  <line
                    x1={x1}
                    y1={ROW_Y}
                    x2={x2}
                    y2={ROW_Y}
                    stroke="var(--plum)"
                    strokeWidth={1.5}
                    strokeOpacity={0.45}
                    strokeLinecap="round"
                  />
                  <circle cx={x1} cy={ROW_Y} r={2.4} fill="var(--plum)" opacity={0.7} />
                  <circle cx={x2} cy={ROW_Y} r={2.4} fill="var(--plum)" opacity={0.7} />
                  <text
                    x={(x1 + x2) / 2}
                    y={ROW_Y - 10}
                    textAnchor="middle"
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

            {/* Quiet pulse dot travelling the full forward path */}
            <circle
              r={3}
              fill="var(--plum)"
              opacity={0.85}
              className="anim-travel"
              style={{ offsetPath: `path('M ${X(0) + HALF} ${ROW_Y} L ${X(4) - HALF} ${ROW_Y}')` }}
            />
          </svg>

          {/* Node cards */}
          {NODES.map((n, i) => (
            <div
              key={n.key}
              className="absolute"
              style={{
                width: CARD_W,
                height: CARD_H,
                left: `${(X(i) / W) * 100}%`,
                top: `${(ROW_Y / H) * 100}%`,
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
          ))}
        </div>
      </div>

      <p className="mt-4 text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
        Wheelchair Tracking — live across 4 sites · 800+ assets
      </p>
    </div>
  )
}
