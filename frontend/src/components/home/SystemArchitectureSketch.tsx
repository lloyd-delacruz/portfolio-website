// frontend/src/components/home/SystemArchitectureSketch.tsx
import {
  ScanLine,
  Radio,
  Database,
  GitFork,
  Smartphone,
  Network,
  Bell,
  Gauge,
  Cpu,
  type LucideIcon,
} from 'lucide-react'

type Satellite = {
  key: string
  Icon: LucideIcon
  title: string
  caption: string
  color: string
}

const W = 600
const H = 520
const CX = W / 2
const CY = H / 2
const ORBIT_RX = 240
const ORBIT_RY = 175

const ENGINE_W = 168
const ENGINE_H = 168

const SAT_W = 132
const SAT_H = 64

const SATELLITES: Satellite[] = [
  { key: 'scan',     Icon: ScanLine,   title: 'QR Scan',             caption: 'Clinical input',     color: 'var(--plum)'  },
  { key: 'events',   Icon: Radio,      title: 'Event Stream',        caption: 'Audit log',          color: 'var(--amber)' },
  { key: 'state',    Icon: Database,   title: 'State Engine',        caption: 'Asset lifecycle',    color: 'var(--blue)'  },
  { key: 'decision', Icon: GitFork,    title: 'Decision Layer',      caption: 'Routing rules',      color: 'var(--green)' },
  { key: 'mobile',   Icon: Smartphone, title: 'Mobile Sync',         caption: 'Offline-tolerant',   color: 'var(--pink)'  },
  { key: 'sites',    Icon: Network,    title: 'Multi-Site',          caption: '4 hospitals',        color: '#6366f1'      },
  { key: 'alerts',   Icon: Bell,       title: 'Alerts Bus',          caption: 'Escalation paths',   color: 'var(--amber)' },
  { key: 'ops',      Icon: Gauge,      title: 'Operations Surface',  caption: 'Dashboard · alerts', color: 'var(--plum)'  },
]

function orbitPosition(i: number, total: number) {
  // Start at the top (-π/2), proceed clockwise.
  const angle = (i / total) * Math.PI * 2 - Math.PI / 2
  return {
    x: CX + ORBIT_RX * Math.cos(angle),
    y: CY + ORBIT_RY * Math.sin(angle),
  }
}

// Ellipse path the orbit pulse traces. Two arcs to form a closed ellipse.
const ORBIT_PATH =
  `M ${CX + ORBIT_RX} ${CY} ` +
  `A ${ORBIT_RX} ${ORBIT_RY} 0 1 1 ${CX - ORBIT_RX} ${CY} ` +
  `A ${ORBIT_RX} ${ORBIT_RY} 0 1 1 ${CX + ORBIT_RX} ${CY} Z`

export function SystemArchitectureSketch() {
  return (
    <div
      className="relative mx-auto w-full max-w-[600px]"
      role="img"
      aria-label="Wheelchair Tracking Engine orchestrating eight components — QR scan, event stream, state engine, decision layer, mobile sync, multi-site replication, alerts bus, and operations surface — across 4 hospital sites."
    >
      <div className="relative w-full" style={{ paddingBottom: `${(H / W) * 100}%` }}>
        <div className="absolute inset-0">
          {/* Connectors from each satellite to the engine */}
          <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
            <defs>
              <radialGradient id="orbit-halo" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="var(--plum)" stopOpacity="0.10" />
                <stop offset="60%" stopColor="var(--plum)" stopOpacity="0.04" />
                <stop offset="100%" stopColor="var(--plum)" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Soft halo behind the engine */}
            <ellipse cx={CX} cy={CY} rx={ORBIT_RX + 30} ry={ORBIT_RY + 30} fill="url(#orbit-halo)" />

            {/* Faint orbit ring */}
            <ellipse
              cx={CX}
              cy={CY}
              rx={ORBIT_RX}
              ry={ORBIT_RY}
              stroke="var(--plum)"
              strokeOpacity={0.12}
              strokeWidth={1}
              strokeDasharray="2 4"
            />

            {/* Spokes from engine to each satellite */}
            {SATELLITES.map((s, i) => {
              const p = orbitPosition(i, SATELLITES.length)
              return (
                <line
                  key={`spoke-${s.key}`}
                  x1={CX}
                  y1={CY}
                  x2={p.x}
                  y2={p.y}
                  stroke="var(--plum)"
                  strokeOpacity={0.22}
                  strokeWidth={1}
                  strokeLinecap="round"
                />
              )
            })}

            {/* Single orbit pulse traveling the ellipse */}
            <circle
              r={3.5}
              fill="var(--plum)"
              className="anim-heartbeat"
              style={{ offsetPath: `path('${ORBIT_PATH}')`, animationDuration: '10s' }}
            />
          </svg>

          {/* Engine tile (centered) */}
          <div
            className="absolute"
            style={{
              width: ENGINE_W,
              height: ENGINE_H,
              left: `${(CX / W) * 100}%`,
              top: `${(CY / H) * 100}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div
              className="anim-float relative flex h-full w-full flex-col items-center justify-center gap-2 rounded-2xl text-white"
              style={{
                background: 'linear-gradient(135deg, var(--plum-deep) 0%, var(--plum) 100%)',
                boxShadow:
                  '0 1px 2px rgba(28,22,46,0.08), 0 14px 40px rgba(109,40,217,0.32), 0 0 0 1px rgba(255,255,255,0.06) inset',
                animationDuration: '8s',
              }}
            >
              <Cpu size={32} strokeWidth={1.8} aria-hidden />
              <span className="px-3 text-center font-display text-[14px] font-semibold leading-tight">
                Wheelchair Tracking Engine
              </span>
              <span className="text-[9.5px] font-semibold uppercase tracking-[0.16em] text-white/70">
                Orchestration core
              </span>
            </div>
          </div>

          {/* Satellite tiles */}
          {SATELLITES.map((s, i) => {
            const p = orbitPosition(i, SATELLITES.length)
            const delay = i * 0.3
            return (
              <div
                key={s.key}
                className="absolute"
                style={{
                  width: SAT_W,
                  height: SAT_H,
                  left: `${(p.x / W) * 100}%`,
                  top: `${(p.y / H) * 100}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div
                  className="anim-float flex h-full w-full items-center gap-2.5 rounded-xl bg-white px-2.5 py-2 ghair soft-shadow-sm"
                  style={{
                    animationDelay: `${delay}s`,
                    animationDuration: `${6 + (i % 2)}s`,
                  }}
                >
                  <span
                    className="grid h-7 w-7 shrink-0 place-items-center rounded-md"
                    style={{ background: `color-mix(in srgb, ${s.color} 14%, transparent)` }}
                  >
                    <s.Icon size={15} style={{ color: s.color }} strokeWidth={2} aria-hidden />
                  </span>
                  <div className="min-w-0 flex flex-col">
                    <span className="truncate font-display text-[11.5px] font-semibold leading-tight text-ink">
                      {s.title}
                    </span>
                    <span className="truncate text-[8.5px] font-semibold uppercase tracking-[0.12em] text-ink-muted">
                      {s.caption}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Free-floating proof row on cream */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
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
