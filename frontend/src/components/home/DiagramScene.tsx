// frontend/src/components/home/DiagramScene.tsx
import { Database, Users, Code2, GitBranch, LineChart, Shield } from 'lucide-react'

type Node = {
  key: string
  Icon: typeof Database
  color: string
  /** top-left in the 560×437 design space */
  x: number
  y: number
  delay: number
}

const SIZE = 56
const W = 560
const H = 437

const NODES: Node[] = [
  { key: 'db',     Icon: Database,  color: 'var(--plum)',  x: 70,  y: 24,  delay: 0 },
  { key: 'users',  Icon: Users,     color: 'var(--amber)', x: 24,  y: 190, delay: 0.6 },
  { key: 'code',   Icon: Code2,     color: 'var(--green)', x: 70,  y: 356, delay: 1.2 },
  { key: 'flow',   Icon: GitBranch, color: 'var(--pink)',  x: 434, y: 24,  delay: 0.3 },
  { key: 'chart',  Icon: LineChart, color: 'var(--blue)',  x: 480, y: 190, delay: 0.9 },
  { key: 'shield', Icon: Shield,    color: 'var(--plum)',  x: 434, y: 356, delay: 1.5 },
]

// connector paths in the 560×437 space, drawn from the centre card toward each node
const LINES: { d: string; color: string; from: [number, number]; to: [number, number] }[] = [
  { color: 'var(--plum)',  d: 'M 215 162 C 158 164, 124 122, 110 80',  from: [215, 162], to: [110, 80] },
  { color: 'var(--amber)', d: 'M 200 218 L 84 218',                     from: [200, 218], to: [84, 218] },
  { color: 'var(--green)', d: 'M 215 274 C 158 272, 124 314, 110 356',  from: [215, 274], to: [110, 356] },
  { color: 'var(--pink)',  d: 'M 345 162 C 402 164, 436 122, 452 80',   from: [345, 162], to: [452, 80] },
  { color: 'var(--blue)',  d: 'M 360 218 L 476 218',                    from: [360, 218], to: [476, 218] },
  { color: 'var(--plum)',  d: 'M 345 274 C 402 272, 436 314, 452 356',  from: [345, 274], to: [452, 356] },
]

export function DiagramScene() {
  return (
    <div className="relative mx-auto w-full max-w-[560px]">
      <div className="relative w-full" style={{ paddingBottom: `${(H / W) * 100}%` }}>
        <div className="absolute inset-0">
          {/* connectors */}
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="absolute inset-0 h-full w-full"
            fill="none"
            aria-hidden
          >
            {LINES.map((l, i) => (
              <g key={i}>
                <path
                  d={l.d}
                  stroke={l.color}
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeOpacity={0.45}
                  className="flow-line"
                />
                <circle cx={l.from[0]} cy={l.from[1]} r={3.2} fill={l.color} opacity={0.8} />
                <circle cx={l.to[0]} cy={l.to[1]} r={3.2} fill={l.color} opacity={0.8} />
              </g>
            ))}
          </svg>

          {/* soft glow behind the centre card */}
          <div
            className="absolute left-1/2 top-1/2 h-48 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
            style={{ background: 'radial-gradient(closest-side, rgba(124,58,237,0.18), transparent)' }}
          />

          {/* centre card */}
          <div
            className="anim-drift absolute left-1/2 top-1/2 flex h-[124px] w-[160px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-[20px] bg-white ghair-2 soft-shadow-lg"
          >
            <span className="font-display text-3xl font-extrabold grad-plum-text">AI</span>
            <span className="mt-1 text-[13px] font-medium leading-tight text-ink-soft">Orchestration</span>
            <span className="text-[13px] font-medium leading-tight text-ink-soft">Engine</span>
          </div>

          {/* capability nodes */}
          {NODES.map((n) => (
            <div
              key={n.key}
              className="anim-float absolute grid place-items-center rounded-2xl bg-white ghair soft-shadow-sm"
              style={{
                width: SIZE,
                height: SIZE,
                left: `${(n.x / W) * 100}%`,
                top: `${(n.y / H) * 100}%`,
                animationDelay: `${n.delay}s`,
                animationDuration: `${6 + (n.delay % 2)}s`,
              }}
            >
              <n.Icon size={22} style={{ color: n.color }} strokeWidth={1.9} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
