// frontend/src/components/home/DiagramScene.tsx
import { Bot, Radio, GitFork, Workflow, Library, Activity, type LucideIcon } from 'lucide-react'

type Node = {
  key: string
  Icon: LucideIcon
  color: string
  /** centre point in the 560×437 design space */
  cx: number
  cy: number
  delay: number
  /** uppercase mono caption rendered below the icon */
  caption: string
}

const SIZE = 56
const W = 560
const H = 437

// Two perfectly mirrored columns. Centres are computed from the design-space
// midpoint (W/2 = 280, H/2 = 218.5) so left/right stay symmetric at any
// container width, and the three rows are evenly spaced.
const COL_X = 64                 // left-column icon centre x (mirror: W - COL_X = 496)
const ROW_GAP = 165              // vertical spacing between rows
const ROW_TOP = H / 2 - ROW_GAP  // 53.5
const ROW_MID = H / 2            // 218.5
const ROW_BOT = H / 2 + ROW_GAP  // 383.5

const NODES: Node[] = [
  // left column
  { key: 'agents',   Icon: Bot,      color: 'var(--plum)',  cx: COL_X,     cy: ROW_TOP, delay: 0,   caption: 'AI AGENTS'      },
  { key: 'events',   Icon: Radio,    color: 'var(--amber)', cx: COL_X,     cy: ROW_MID, delay: 0.9, caption: 'EVENT STREAM'   },
  { key: 'decision', Icon: GitFork,  color: 'var(--green)', cx: COL_X,     cy: ROW_BOT, delay: 0.5, caption: 'DECISION LAYER' },
  // right column (mirrors of the left, same delays so the pairs float in sync)
  { key: 'workflow', Icon: Workflow, color: 'var(--pink)',  cx: W - COL_X, cy: ROW_TOP, delay: 0,   caption: 'WORKFLOW'       },
  { key: 'knowl',    Icon: Library,  color: 'var(--blue)',  cx: W - COL_X, cy: ROW_MID, delay: 0.9, caption: 'KNOWLEDGE'      },
  { key: 'monitor',  Icon: Activity, color: 'var(--plum)',  cx: W - COL_X, cy: ROW_BOT, delay: 0.5, caption: 'MONITORING'     },
]

// Connector paths. Anchored on the centre card and on the icon edge facing it.
// Right-side paths are exact mirrors of the left (x → W - x) so the diagram is
// left/right symmetric, top/bottom symmetric in pairs.
const CARD_LEFT = 200    // centre card left edge
const CARD_RIGHT = 360   // centre card right edge
const CARD_TOP_Y = 168   // top anchor row (just inside the top of the card)
const CARD_BOT_Y = 269   // bottom anchor row (just inside the bottom of the card)

// Icon edge anchors (point where the line touches the icon, facing the card).
const ICON_LEFT_INNER = COL_X + SIZE / 2        // right edge of left-column icons = 92
const ICON_RIGHT_INNER = W - COL_X - SIZE / 2   // left edge of right-column icons = 468
const ICON_TOP_INNER = ROW_TOP + SIZE / 2 - 4   // 77.5 — bottom edge of top-row icons (pulled in 4px for the dot)
const ICON_BOT_INNER = ROW_BOT - SIZE / 2 + 4   // 359.5 — top edge of bottom-row icons

// Curve control offsets (held identical on both sides for true mirror symmetry).
const CURVE_X1 = 162
const CURVE_X2 = 122

const LINES: { d: string; color: string; from: [number, number]; to: [number, number] }[] = [
  // left side
  {
    color: 'var(--plum)',
    d: `M ${CARD_LEFT + 10} ${CARD_TOP_Y} C ${CURVE_X1} 156, ${CURVE_X2} 110, ${ICON_LEFT_INNER - 8} ${ICON_TOP_INNER}`,
    from: [CARD_LEFT + 10, CARD_TOP_Y],
    to: [ICON_LEFT_INNER - 8, ICON_TOP_INNER],
  },
  {
    color: 'var(--amber)',
    d: `M ${CARD_LEFT} ${ROW_MID} L ${ICON_LEFT_INNER} ${ROW_MID}`,
    from: [CARD_LEFT, ROW_MID],
    to: [ICON_LEFT_INNER, ROW_MID],
  },
  {
    color: 'var(--green)',
    d: `M ${CARD_LEFT + 10} ${CARD_BOT_Y} C ${CURVE_X1} 281, ${CURVE_X2} 327, ${ICON_LEFT_INNER - 8} ${ICON_BOT_INNER}`,
    from: [CARD_LEFT + 10, CARD_BOT_Y],
    to: [ICON_LEFT_INNER - 8, ICON_BOT_INNER],
  },
  // right side — mirror of the left across x = W/2
  {
    color: 'var(--pink)',
    d: `M ${CARD_RIGHT - 10} ${CARD_TOP_Y} C ${W - CURVE_X1} 156, ${W - CURVE_X2} 110, ${ICON_RIGHT_INNER + 8} ${ICON_TOP_INNER}`,
    from: [CARD_RIGHT - 10, CARD_TOP_Y],
    to: [ICON_RIGHT_INNER + 8, ICON_TOP_INNER],
  },
  {
    color: 'var(--blue)',
    d: `M ${CARD_RIGHT} ${ROW_MID} L ${ICON_RIGHT_INNER} ${ROW_MID}`,
    from: [CARD_RIGHT, ROW_MID],
    to: [ICON_RIGHT_INNER, ROW_MID],
  },
  {
    color: 'var(--plum)',
    d: `M ${CARD_RIGHT - 10} ${CARD_BOT_Y} C ${W - CURVE_X1} 281, ${W - CURVE_X2} 327, ${ICON_RIGHT_INNER + 8} ${ICON_BOT_INNER}`,
    from: [CARD_RIGHT - 10, CARD_BOT_Y],
    to: [ICON_RIGHT_INNER + 8, ICON_BOT_INNER],
  },
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

          {/* centre card — outer wrapper holds the -50%/-50% centring, inner runs
              the drift animation so its transform doesn't fight the centring */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="anim-drift flex h-[124px] w-[160px] flex-col items-center justify-center rounded-[20px] bg-white ghair-2 soft-shadow-lg">
              <span className="font-display text-3xl font-extrabold grad-plum-text">AI</span>
              <span className="mt-1 text-[13px] font-medium leading-tight text-ink-soft">Orchestration</span>
              <span className="text-[13px] font-medium leading-tight text-ink-soft">Engine</span>
            </div>
          </div>

          {/* capability nodes — wrapper centres the icon at (cx, cy); inner runs
              the float animation independently so its transform stays clean */}
          {NODES.map((n) => (
            <div
              key={n.key}
              className="absolute"
              style={{
                width: SIZE,
                height: SIZE,
                left: `${(n.cx / W) * 100}%`,
                top: `${(n.cy / H) * 100}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div
                className="anim-float grid h-full w-full place-items-center rounded-2xl bg-white ghair soft-shadow-sm"
                style={{
                  animationDelay: `${n.delay}s`,
                  animationDuration: `${6 + (n.delay % 2)}s`,
                }}
              >
                <n.Icon size={22} style={{ color: n.color }} strokeWidth={1.9} />
              </div>
              <span
                className="absolute left-1/2 -translate-x-1/2 text-[9px] font-semibold uppercase tracking-[0.16em] text-ink-muted"
                style={{
                  top: `${SIZE + 4}px`,
                  whiteSpace: 'nowrap',
                }}
              >
                {n.caption}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
