// frontend/src/components/home/EngineeringLoop.tsx
import {
  Target,
  FileText,
  ListChecks,
  Bot,
  ShieldCheck,
  Rocket,
  Activity,
  RotateCcw,
  type LucideIcon,
} from 'lucide-react'

type Stage = {
  key: string
  label: string
  sub: string
  longLabel: string
  artifact: string
  Icon: LucideIcon
  color: string
  cx: number
  cy: number
}

type Decision = {
  key: string
  question: string
  cx: number
  cy: number
  yesAt: { x: number; y: number }      // green YES label position
  noArc: string                         // SVG cubic path for the amber NO arc
  noLabelAt: { x: number; y: number }   // amber NO label position
  noTarget: string                      // e.g. "SPEC" for mobile chip
}

// Design space — shifted right by 20 vs. the previous version so the leftmost
// column (FRAME / HEALTHY?) has breathing room, and so the HEALTHY→FRAME NO arc
// can bow out without crowding the viewBox edge.
const W = 720
const H = 460
const ROW1_Y = 110
const ROW2_Y = 360
const CARD = 84
const HALF = CARD / 2
const DIAMOND = 48
const DHALF = DIAMOND / 2

const STAGES: Stage[] = [
  { key: 'frame',   label: 'FRAME',   sub: 'WITH THE OPERATOR',   longLabel: 'Frame the problem with the operator, not the dataset.',                                              artifact: 'brief',         Icon: Target,      color: 'var(--plum)', cx: 100, cy: ROW1_Y },
  { key: 'spec',    label: 'SPEC',    sub: 'DESIGN BEFORE CODE',  longLabel: 'Write the spec before any code.',                                                                    artifact: 'spec.md',       Icon: FileText,    color: 'var(--ink)',  cx: 240, cy: ROW1_Y },
  { key: 'plan',    label: 'PLAN',    sub: 'REVIEWABLE UNITS',    longLabel: 'Decompose the spec into a reviewable plan.',                                                         artifact: 'plan.md',       Icon: ListChecks,  color: 'var(--plum)', cx: 520, cy: ROW1_Y },
  { key: 'build',   label: 'BUILD',   sub: 'TESTS WITH THE CODE', longLabel: 'Build with agents — code and tests produced together, every step reviewable.',                       artifact: 'diff+tests',    Icon: Bot,         color: 'var(--ink)',  cx: 660, cy: ROW1_Y },
  { key: 'verify',  label: 'VERIFY',  sub: 'MULTI-GATE',          longLabel: 'Verify against a stack of gates — types, lint, tests, eval/regression, secrets check, human review.', artifact: 'gate report',   Icon: ShieldCheck, color: 'var(--plum)', cx: 660, cy: ROW2_Y },
  { key: 'ship',    label: 'SHIP',    sub: 'RELEASE-TAGGED',      longLabel: 'Ship with a release tag and a written rollback path.',                                                artifact: 'release notes', Icon: Rocket,      color: 'var(--ink)',  cx: 380, cy: ROW2_Y },
  { key: 'observe', label: 'OBSERVE', sub: 'LOGS & FEEDBACK',     longLabel: 'Observe in production — logs, traces, and incident feedback drive the next loop.',                   artifact: 'logs/traces',   Icon: Activity,    color: 'var(--plum)', cx: 240, cy: ROW2_Y },
]

// Decision diamonds. NO arcs land on CLEAN edges of target cards (top edge for SPEC,
// right edge for PLAN, left edge for FRAME) so they never cross a label.
const DECISIONS: Decision[] = [
  {
    key: 'clear',
    question: 'CLEAR?',
    cx: 380,
    cy: ROW1_Y,
    yesAt: { x: 450, y: ROW1_Y - 10 },
    // CLEAR? top vertex (380, 86) → SPEC top edge (240, 68).
    // Tangent: straight UP from start, straight DOWN onto SPEC. Symmetric rainbow.
    noArc: `M 380 ${ROW1_Y - DHALF} C 380 18, 240 18, 240 ${ROW1_Y - HALF}`,
    noLabelAt: { x: 310, y: 12 },
    noTarget: 'SPEC',
  },
  {
    key: 'gate',
    question: 'GATE?',
    cx: 520,
    cy: ROW2_Y,
    yesAt: { x: 450, y: ROW2_Y - 10 },
    // GATE? top vertex (520, 336) → PLAN right edge (562, 110).
    // Tangent: straight UP from diamond top, then horizontal LEFT into PLAN's right side.
    noArc: `M 520 ${ROW2_Y - DHALF} C 520 220, 615 ${ROW1_Y}, ${520 + HALF} ${ROW1_Y}`,
    noLabelAt: { x: 600, y: 232 },
    noTarget: 'PLAN',
  },
  {
    key: 'healthy',
    question: 'HEALTHY?',
    cx: 100,
    cy: ROW2_Y,
    yesAt: { x: 100, y: ROW2_Y + DHALF + 16 },
    // HEALTHY? left vertex (76, 360) → FRAME left edge (58, 110).
    // Tangent: straight LEFT from diamond left, then horizontal RIGHT into FRAME's left side.
    noArc: `M ${100 - DHALF} ${ROW2_Y} C 30 ${ROW2_Y}, 30 ${ROW1_Y}, ${100 - HALF} ${ROW1_Y}`,
    noLabelAt: { x: 18, y: 232 },
    noTarget: 'FRAME',
  },
]

// NO-arc start ports (small amber dots at each diamond vertex where the arc begins)
const NO_PORTS = [
  { cx: 380, cy: ROW1_Y - DHALF },  // top of CLEAR?
  { cx: 520, cy: ROW2_Y - DHALF },  // top of GATE?
  { cx: 100 - DHALF, cy: ROW2_Y },  // left of HEALTHY?
]

function diamondPoints(cx: number, cy: number, d: number) {
  return `${cx},${cy - d} ${cx + d},${cy} ${cx},${cy + d} ${cx - d},${cy}`
}

export function EngineeringLoop() {
  return (
    <section
      id="ai-workflow"
      className="relative mx-auto max-w-[1180px] px-6 py-20"
      aria-labelledby="engineering-loop-heading"
    >
      <header className="max-w-2xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-plum">HOW I WORK WITH AI</p>
        <h2
          id="engineering-loop-heading"
          className="mt-3 font-display text-4xl font-extrabold leading-tight text-ink sm:text-5xl"
        >
          An algorithm, not a vibe.
          <br />
          <span className="grad-plum-text">This is the loop I run.</span>
        </h2>
        <p className="mt-4 max-w-[45ch] text-base leading-relaxed text-ink-soft">
          Most data-science workflows stop at a notebook. Mine ships into production because every step has a gate
          — a spec, a test, a review, an observable system — and AI agents do the heavy work inside those gates.
        </p>
      </header>

      {/* Desktop decision tree (md and up) */}
      <div className="relative mx-auto mt-14 hidden w-full max-w-[780px] md:block">
        <div className="relative w-full" style={{ paddingBottom: `${(H / W) * 100}%` }}>
          <div className="absolute inset-0">
            <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
              <defs>
                <marker
                  id="eloop-arrow"
                  viewBox="0 0 10 10"
                  refX="9"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--amber)" />
                </marker>
                <marker
                  id="eloop-arrow-plum"
                  viewBox="0 0 10 10"
                  refX="9"
                  refY="5"
                  markerWidth="5"
                  markerHeight="5"
                  orient="auto"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--plum)" fillOpacity={0.55} />
                </marker>
              </defs>

              {/* ── Row 1 forward connectors (plum dashed, L→R, arrowhead at end) ─── */}
              <line x1={100 + HALF}  y1={ROW1_Y} x2={240 - HALF}  y2={ROW1_Y} stroke="var(--plum)" strokeWidth={2} strokeOpacity={0.45} strokeLinecap="round" className="flow-line" markerEnd="url(#eloop-arrow-plum)" />
              <line x1={240 + HALF}  y1={ROW1_Y} x2={380 - DHALF} y2={ROW1_Y} stroke="var(--plum)" strokeWidth={2} strokeOpacity={0.45} strokeLinecap="round" className="flow-line" markerEnd="url(#eloop-arrow-plum)" />
              <line x1={380 + DHALF} y1={ROW1_Y} x2={520 - HALF}  y2={ROW1_Y} stroke="var(--plum)" strokeWidth={2} strokeOpacity={0.45} strokeLinecap="round" className="flow-line" markerEnd="url(#eloop-arrow-plum)" />
              <line x1={520 + HALF}  y1={ROW1_Y} x2={660 - HALF}  y2={ROW1_Y} stroke="var(--plum)" strokeWidth={2} strokeOpacity={0.45} strokeLinecap="round" className="flow-line" markerEnd="url(#eloop-arrow-plum)" />

              {/* Vertical drop: BUILD → VERIFY (right edge) */}
              <line x1={660} y1={ROW1_Y + HALF} x2={660} y2={ROW2_Y - HALF} stroke="var(--plum)" strokeWidth={2} strokeOpacity={0.45} strokeLinecap="round" className="flow-line" markerEnd="url(#eloop-arrow-plum)" />

              {/* ── Row 2 forward connectors (plum dashed, R→L flow, arrowhead at end) */}
              <line x1={660 - HALF}  y1={ROW2_Y} x2={520 + DHALF} y2={ROW2_Y} stroke="var(--plum)" strokeWidth={2} strokeOpacity={0.45} strokeLinecap="round" className="flow-line" markerEnd="url(#eloop-arrow-plum)" />
              <line x1={520 - DHALF} y1={ROW2_Y} x2={380 + HALF}  y2={ROW2_Y} stroke="var(--plum)" strokeWidth={2} strokeOpacity={0.45} strokeLinecap="round" className="flow-line" markerEnd="url(#eloop-arrow-plum)" />
              <line x1={380 - HALF}  y1={ROW2_Y} x2={240 + HALF}  y2={ROW2_Y} stroke="var(--plum)" strokeWidth={2} strokeOpacity={0.45} strokeLinecap="round" className="flow-line" markerEnd="url(#eloop-arrow-plum)" />
              <line x1={240 - HALF}  y1={ROW2_Y} x2={100 + DHALF} y2={ROW2_Y} stroke="var(--plum)" strokeWidth={2} strokeOpacity={0.45} strokeLinecap="round" className="flow-line" markerEnd="url(#eloop-arrow-plum)" />

              {/* NO-arc start ports (amber dots at each diamond vertex) */}
              {NO_PORTS.map((p, i) => (
                <circle key={`no-port-${i}`} cx={p.cx} cy={p.cy} r={3.2} fill="var(--amber)" opacity={0.85} />
              ))}

              {/* ── Amber NO arcs (3 total) ──────────────────────────────────────── */}
              {DECISIONS.map((d) => (
                <g key={`no-${d.key}`}>
                  <path
                    d={d.noArc}
                    stroke="var(--amber)"
                    strokeWidth={2}
                    strokeOpacity={0.7}
                    strokeLinecap="round"
                    className="flow-line"
                    markerEnd="url(#eloop-arrow)"
                    data-testid="no-arc"
                  />
                  <text
                    x={d.noLabelAt.x}
                    y={d.noLabelAt.y}
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="700"
                    fill="var(--amber)"
                    style={{ letterSpacing: '0.14em' }}
                  >
                    NO
                  </text>
                </g>
              ))}

              {/* ── Green YES branch labels (3 total) ────────────────────────────── */}
              {DECISIONS.map((d) => (
                <text
                  key={`yes-${d.key}`}
                  x={d.yesAt.x}
                  y={d.yesAt.y}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fill="var(--green)"
                  style={{ letterSpacing: '0.14em' }}
                  data-testid="yes-branch"
                >
                  YES
                </text>
              ))}

              {/* ── Diamond shapes (SVG polygons) ────────────────────────────────── */}
              {DECISIONS.map((d) => (
                <polygon
                  key={`diamond-${d.key}`}
                  points={diamondPoints(d.cx, d.cy, DHALF)}
                  fill="white"
                  stroke="var(--line)"
                  strokeWidth={1}
                />
              ))}
            </svg>

            {/* Stage cards (HTML overlay, percentage-positioned). No above-card
                sub-caption — the label + artifact below is enough, and arcs need
                the space above each card to land cleanly. */}
            {STAGES.map((s, i) => {
              const delay = i * 0.2
              return (
                <div
                  key={s.key}
                  className="absolute"
                  style={{
                    width: CARD,
                    height: CARD,
                    left: `${(s.cx / W) * 100}%`,
                    top: `${(s.cy / H) * 100}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <div
                    className="anim-float relative h-full w-full"
                    style={{
                      animationDelay: `${delay}s`,
                      animationDuration: `${6 + (delay % 2)}s`,
                    }}
                  >
                    <div className="grid h-full w-full place-items-center rounded-2xl bg-white ghair soft-shadow-sm">
                      <s.Icon size={24} style={{ color: s.color }} strokeWidth={1.9} />
                    </div>
                    <span
                      className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.16em] text-ink"
                      style={{ top: `${CARD + 6}px` }}
                    >
                      {s.label}
                    </span>
                    <span
                      className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] text-ink-muted"
                      style={{ top: `${CARD + 24}px` }}
                    >
                      {s.artifact}
                    </span>
                  </div>
                </div>
              )
            })}

            {/* Diamond question labels (HTML overlay so they pick up font-mono).
                Row 1 (CLEAR?) goes BELOW its diamond (above is reserved for the NO arc).
                Row 2 diamonds (GATE?, HEALTHY?) go ABOVE their diamonds (below is reserved
                for the row's stage labels). */}
            {DECISIONS.map((d) => {
              const isRow1 = d.cy === ROW1_Y
              const yPx = isRow1 ? d.cy + DHALF + 8 : d.cy - DHALF - 8
              return (
                <span
                  key={`q-${d.key}`}
                  className={`absolute -translate-x-1/2 ${isRow1 ? '' : '-translate-y-full'} whitespace-nowrap font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted`}
                  style={{
                    left: `${(d.cx / W) * 100}%`,
                    top: `${(yPx / H) * 100}%`,
                  }}
                >
                  {d.question}
                </span>
              )
            })}
          </div>
        </div>
      </div>

      {/* Mobile stack (below md) */}
      <div className="relative mt-12 md:hidden">
        <ol className="relative flex flex-col items-center gap-0" aria-hidden>
          {STAGES.map((s, i) => {
            const isLast = i === STAGES.length - 1
            const decisionAfter =
              i === 1 ? DECISIONS[0] : i === 4 ? DECISIONS[1] : i === 6 ? DECISIONS[2] : null
            return (
              <li key={s.key} className="flex w-full flex-col items-center">
                <div className="flex flex-col items-center">
                  <div className="grid h-20 w-20 place-items-center rounded-2xl bg-white ghair soft-shadow-sm">
                    <s.Icon size={22} style={{ color: s.color }} strokeWidth={1.9} />
                  </div>
                  <span className="mt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink">
                    {s.label}
                  </span>
                  <span className="mt-0.5 font-mono text-[10px] text-ink-muted">{s.artifact}</span>
                </div>

                {!isLast && (
                  <svg viewBox="0 0 8 32" className="my-1 h-8 w-2" fill="none" aria-hidden>
                    <line
                      x1="4"
                      y1="0"
                      x2="4"
                      y2="32"
                      stroke="var(--plum)"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeOpacity={0.55}
                      className="flow-line"
                    />
                  </svg>
                )}

                {decisionAfter && (
                  <div className="my-2 flex items-center gap-3">
                    <div
                      className="grid h-8 w-8 place-items-center bg-white ghair soft-shadow-sm font-mono text-[10px] font-bold text-ink-muted"
                      style={{ transform: 'rotate(45deg)' }}
                    >
                      <span style={{ transform: 'rotate(-45deg)' }}>?</span>
                    </div>
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                      {decisionAfter.question}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.14em]" style={{ color: 'var(--green)' }}>
                      <span aria-hidden>↓</span> YES
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.14em]" style={{ color: 'var(--amber)' }}>
                      <RotateCcw size={12} aria-hidden /> NO → {decisionAfter.noTarget}
                    </span>
                  </div>
                )}

                {!isLast && !decisionAfter && (
                  <span aria-hidden className="block h-2 w-px" />
                )}
              </li>
            )
          })}
        </ol>
      </div>

      {/* Screen-reader linearization */}
      <ol className="sr-only" aria-label="How I work with AI">
        {STAGES.map((s) => (
          <li key={s.key}>
            <strong>{s.label}</strong> — {s.sub}. {s.longLabel}
          </li>
        ))}
      </ol>
      <p className="sr-only">
        Three explicit gates: after SPEC the spec must be clear or work returns to SPEC;
        after VERIFY the multi-gate check must pass or work returns to PLAN;
        after OBSERVE production must be healthy or the next loop starts at FRAME.
      </p>
    </section>
  )
}
