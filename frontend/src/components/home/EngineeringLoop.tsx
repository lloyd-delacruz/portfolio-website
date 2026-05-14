// frontend/src/components/home/EngineeringLoop.tsx
import {
  Target,
  FileText,
  ListChecks,
  Bot,
  ShieldCheck,
  Rocket,
  Activity,
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
  /** centre x in the 1080×360 design space */
  cx: number
}

// Design space for the desktop diagram. 7 nodes evenly spaced across 1080,
// vertically centred at y = 220 to leave headroom for the loop-back arc.
const W = 1080
const H = 360
const ROW_Y = 220
const CARD = 96   // card side length

// Seven evenly spaced centres: 1080 / 7 ≈ 154.3 step, first at step/2.
const X = (i: number) => Math.round((W / 7) * (i + 0.5))

const STAGES: Stage[] = [
  { key: 'frame',   label: 'FRAME',   sub: 'WITH THE OPERATOR',     longLabel: 'Frame the problem with the operator, not the dataset.',                                                artifact: 'brief',         Icon: Target,      color: 'var(--plum)',  cx: X(0) },
  { key: 'spec',    label: 'SPEC',    sub: 'DESIGN BEFORE CODE',    longLabel: 'Write the spec before any code.',                                                                      artifact: 'spec.md',       Icon: FileText,    color: 'var(--ink)',   cx: X(1) },
  { key: 'plan',    label: 'PLAN',    sub: 'REVIEWABLE UNITS',      longLabel: 'Decompose the spec into a reviewable plan.',                                                           artifact: 'plan.md',       Icon: ListChecks,  color: 'var(--plum)',  cx: X(2) },
  { key: 'build',   label: 'BUILD',   sub: 'TESTS WITH THE CODE',   longLabel: 'Build with agents — code and tests produced together, every step reviewable.',                          artifact: 'diff+tests',    Icon: Bot,         color: 'var(--ink)',   cx: X(3) },
  { key: 'verify',  label: 'VERIFY',  sub: 'MULTI-GATE',            longLabel: 'Verify against a stack of gates — types, lint, tests, eval/regression, secrets check, human review.',  artifact: 'gate report',   Icon: ShieldCheck, color: 'var(--plum)',  cx: X(4) },
  { key: 'ship',    label: 'SHIP',    sub: 'RELEASE-TAGGED',        longLabel: 'Ship with a release tag and a written rollback path.',                                                  artifact: 'release notes', Icon: Rocket,      color: 'var(--ink)',   cx: X(5) },
  { key: 'observe', label: 'OBSERVE', sub: 'LOGS & FEEDBACK',       longLabel: 'Observe in production — logs, traces, and incident feedback drive the next loop.',                     artifact: 'logs/traces',   Icon: Activity,    color: 'var(--plum)',  cx: X(6) },
]

// Half-width of each node's visual footprint, used to compute connector endpoints.
const HALF = CARD / 2

export function EngineeringLoop() {
  return (
    <section id="ai-workflow" className="relative mx-auto max-w-[1180px] px-6 py-20" aria-labelledby="engineering-loop-heading">
      <header className="max-w-2xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-plum">HOW I WORK WITH AI</p>
        <h2 id="engineering-loop-heading" className="mt-3 font-display text-4xl font-extrabold leading-tight text-ink sm:text-5xl">
          An algorithm, not a vibe.
          <br />
          <span className="grad-plum-text">This is the loop I run.</span>
        </h2>
        <p className="mt-4 max-w-[45ch] text-base leading-relaxed text-ink-soft">
          Most data-science workflows stop at a notebook. Mine ships into production because every step has a gate
          — a spec, a test, a review, an observable system — and AI agents do the heavy work inside those gates.
        </p>
      </header>

      {/* Desktop pipeline (md and up) */}
      <div className="relative mt-14 hidden md:block">
        <div className="relative w-full" style={{ paddingBottom: `${(H / W) * 100}%` }}>
          <div className="absolute inset-0">
            {/* SVG connectors */}
            <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
              <defs>
                <marker
                  id="eloop-arrow"
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--amber)" />
                </marker>
              </defs>
              {/* Forward path: six straight segments between adjacent node edges */}
              {STAGES.slice(0, -1).map((s, i) => {
                const next = STAGES[i + 1]
                const x1 = s.cx + HALF
                const x2 = next.cx - HALF
                return (
                  <g key={`fwd-${s.key}`}>
                    <line
                      x1={x1}
                      y1={ROW_Y}
                      x2={x2}
                      y2={ROW_Y}
                      stroke="var(--plum)"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeOpacity={0.45}
                      className="flow-line"
                    />
                    <circle cx={x1} cy={ROW_Y} r={3.2} fill="var(--plum)" opacity={0.8} />
                    <circle cx={x2} cy={ROW_Y} r={3.2} fill="var(--plum)" opacity={0.8} />
                  </g>
                )
              })}

              {/* Decision-branch labels */}
              {(() => {
                const gate = STAGES[4]  // VERIFY
                const plan = STAGES[2]  // PLAN
                const review = STAGES[5]
                const arcStartX = gate.cx
                const arcStartY = ROW_Y - HALF       // top of VERIFY card
                const arcEndX = plan.cx
                const arcEndY = ROW_Y - HALF         // top of Plan card
                const c1x = gate.cx - 40
                const c1y = 60
                const c2x = plan.cx + 40
                const c2y = 60
                const apexX = (gate.cx + plan.cx) / 2
                const apexY = 70

                // Yes-branch midpoint between the diamond and Review (along the forward path).
                const yesX = (gate.cx + review.cx) / 2
                const yesY = ROW_Y - 12

                return (
                  <g>
                    {/* Amber loop-back arc from the top of the diamond back to the top of Plan */}
                    <path
                      d={`M ${arcStartX} ${arcStartY} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${arcEndX} ${arcEndY}`}
                      stroke="var(--amber)"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeOpacity={0.7}
                      className="flow-line"
                      markerEnd="url(#eloop-arrow)"
                    />
                    <circle cx={arcStartX} cy={arcStartY} r={3.2} fill="var(--amber)" opacity={0.85} />

                    {/* "no" at the apex of the loop-back arc */}
                    <text
                      x={apexX}
                      y={apexY - 6}
                      textAnchor="middle"
                      fontSize="11"
                      fontWeight="700"
                      fill="var(--amber)"
                      style={{ letterSpacing: '0.14em' }}
                    >
                      NO
                    </text>

                    {/* "yes" along the short forward segment between the diamond and Review */}
                    <text
                      x={yesX}
                      y={yesY}
                      textAnchor="middle"
                      fontSize="11"
                      fontWeight="700"
                      fill="var(--green)"
                      style={{ letterSpacing: '0.14em' }}
                    >
                      YES
                    </text>
                  </g>
                )
              })()}
            </svg>

            {/* Node cards / diamond, positioned in percentage-of-design-space coordinates */}
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
                    top: `${(ROW_Y / H) * 100}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  {/* Sub-caption above */}
                  <span
                    className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.16em] text-ink-muted"
                    style={{ bottom: `${CARD + 6}px` }}
                  >
                    {s.sub}
                  </span>

                  {/* Animated inner wrapper — float keyed off the existing home2-float keyframes */}
                  <div
                    className="anim-float relative h-full w-full"
                    style={{
                      animationDelay: `${delay}s`,
                      animationDuration: `${6 + (delay % 2)}s`,
                    }}
                  >
                    <div className="grid h-full w-full place-items-center rounded-2xl bg-white ghair soft-shadow-sm">
                      <s.Icon size={26} style={{ color: s.color }} strokeWidth={1.9} />
                    </div>
                    <span
                      className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.16em] text-ink"
                      style={{ top: `${CARD + 8}px` }}
                    >
                      {s.label}
                    </span>
                    <span
                      className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] text-ink-muted"
                      style={{ top: `${CARD + 28}px` }}
                    >
                      {s.artifact}
                    </span>
                  </div>
                </div>
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
            return (
              <li key={s.key} className="flex w-full flex-col items-center">
                {/* Card */}
                <div className="flex flex-col items-center">
                  <span className="mb-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
                    {s.sub}
                  </span>
                  <div className="grid h-20 w-20 place-items-center rounded-2xl bg-white ghair soft-shadow-sm">
                    <s.Icon size={22} style={{ color: s.color }} strokeWidth={1.9} />
                  </div>
                  <span className="mt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink">
                    {s.label}
                  </span>
                  <span className="mt-0.5 font-mono text-[10px] text-ink-muted">{s.artifact}</span>
                </div>

                {/* Vertical flow-line between this stage and the next, except after the last */}
                {!isLast && (
                  <svg viewBox="0 0 8 32" className="my-1 h-8 w-2" fill="none" aria-hidden>
                    <line
                      x1="4"
                      y1="0"
                      x2="4"
                      y2="32"
                      stroke={i === 4 ? 'var(--green)' : 'var(--plum)'}
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeOpacity={0.55}
                      className="flow-line"
                    />
                  </svg>
                )}
              </li>
            )
          })}
        </ol>

        {/* Mobile loop-back: curved amber arrow on the left side from the diamond back up to Plan */}
        <svg
          viewBox="0 0 80 240"
          className="pointer-events-none absolute left-0 top-0 h-full w-12"
          preserveAspectRatio="none"
          fill="none"
          aria-hidden
        >
          <defs>
            <marker
              id="eloop-arrow-mobile"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--amber)" />
            </marker>
          </defs>
          {/* The arc spans roughly from the diamond (position 5 of 7) up to Plan (position 3 of 7).
              Coordinates are normalized into the 0–240 viewBox; preserveAspectRatio=none lets the
              parent's height stretch this to the real stack height. */}
          <path
            d="M 70 137 C 10 130, 10 70, 70 63"
            stroke="var(--amber)"
            strokeWidth={2}
            strokeLinecap="round"
            strokeOpacity={0.75}
            className="flow-line"
            markerEnd="url(#eloop-arrow-mobile)"
          />
          <text
            x="20"
            y="100"
            fontSize="10"
            fontWeight="700"
            fill="var(--amber)"
            style={{ letterSpacing: '0.14em' }}
          >
            NO
          </text>
        </svg>
      </div>

      {/* Screen-reader linearization */}
      <ol className="sr-only" aria-label="How I work with AI">
        {STAGES.map((s) => (
          <li key={s.key}>
            <strong>{s.label}</strong> — {s.sub}. {s.longLabel}
          </li>
        ))}
      </ol>
      <p className="sr-only">If the pass check fails, return to Plan and repeat.</p>
    </section>
  )
}
