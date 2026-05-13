// frontend/src/components/home/AIWorkflowAlgorithm.tsx
import {
  Target,
  FileText,
  ListChecks,
  Bot,
  GitFork,
  ShieldCheck,
  Rocket,
  type LucideIcon,
} from 'lucide-react'

type Stage = {
  key: string
  label: string
  sub: string
  longLabel: string
  Icon: LucideIcon
  color: string
  /** centre x in the 1080×360 design space */
  cx: number
  /** true for the decision diamond at position 5 */
  diamond?: boolean
}

// Design space for the desktop diagram. 7 nodes evenly spaced across 1080,
// vertically centred at y = 220 to leave headroom for the loop-back arc.
const W = 1080
const H = 360
const ROW_Y = 220
const CARD = 96   // card side length; diamond bounding box is identical (rotated 45°)

// Seven evenly spaced centres: 1080 / 7 ≈ 154.3 step, first at step/2.
const X = (i: number) => Math.round((W / 7) * (i + 0.5))

const STAGES: Stage[] = [
  { key: 'frame',    label: 'FRAME',           sub: 'WITH THE OPERATOR',  longLabel: 'Frame the problem with the operator, not the dataset.',                                            Icon: Target,      color: 'var(--plum)',  cx: X(0) },
  { key: 'spec',     label: 'SPEC',            sub: 'DESIGN BEFORE CODE', longLabel: 'Write the spec before any code.',                                                                  Icon: FileText,    color: 'var(--blue)',  cx: X(1) },
  { key: 'plan',     label: 'PLAN',            sub: 'REVIEWABLE UNITS',   longLabel: 'Decompose the spec into a reviewable plan.',                                                       Icon: ListChecks,  color: 'var(--plum)',  cx: X(2) },
  { key: 'dispatch', label: 'DISPATCH AGENTS', sub: 'TESTS FIRST',        longLabel: 'Dispatch agentic coding tools to do the work, tests first.',                                       Icon: Bot,         color: 'var(--pink)',  cx: X(3) },
  { key: 'gate',     label: 'PASS?',           sub: 'DECISION GATE',      longLabel: 'Decision: do the tests pass and the behaviour match the spec? If no, loop back to Plan.',          Icon: GitFork,     color: 'var(--amber)', cx: X(4), diamond: true },
  { key: 'review',   label: 'REVIEW',          sub: 'HUMAN IN THE LOOP',  longLabel: 'Review every diff yourself before merging.',                                                       Icon: ShieldCheck, color: 'var(--green)', cx: X(5) },
  { key: 'ship',     label: 'SHIP',            sub: 'OBSERVABLE IN PROD', longLabel: 'Ship to production and monitor the running system.',                                               Icon: Rocket,      color: 'var(--plum)',  cx: X(6) },
]

// Half-width of each node's visual footprint, used to compute connector
// endpoints. The diamond's bounding box is the same size as a card, so the
// same half-width applies.
const HALF = CARD / 2

export function AIWorkflowAlgorithm() {
  return (
    <section className="relative mx-auto max-w-[1180px] px-6 py-20" aria-labelledby="ai-workflow-heading">
      <header className="max-w-2xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-plum">HOW I WORK WITH AI</p>
        <h2 id="ai-workflow-heading" className="mt-3 font-display text-4xl font-extrabold leading-tight text-ink sm:text-5xl">
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
                const gate = STAGES[4]  // PASS?
                const plan = STAGES[2]  // PLAN
                const review = STAGES[5]
                const arcStartX = gate.cx
                const arcStartY = ROW_Y - HALF       // top of diamond bounding box
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
                    <defs>
                      <marker
                        id="aiwf-arrow"
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

                    {/* Amber loop-back arc from the top of the diamond back to the top of Plan */}
                    <path
                      d={`M ${arcStartX} ${arcStartY} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${arcEndX} ${arcEndY}`}
                      stroke="var(--amber)"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeOpacity={0.7}
                      className="flow-line"
                      markerEnd="url(#aiwf-arrow)"
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
            {STAGES.map((s) => (
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

                {/* Card or diamond */}
                {s.diamond ? (
                  <div className="grid h-full w-full place-items-center">
                    <div
                      className="absolute inset-0 rounded-md bg-white ghair-2 soft-shadow-sm"
                      style={{ transform: 'rotate(45deg)' }}
                    />
                    <div className="relative flex flex-col items-center justify-center">
                      <s.Icon size={20} style={{ color: s.color }} strokeWidth={1.9} />
                      <span className="mt-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink">
                        {s.label}
                      </span>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="grid h-full w-full place-items-center rounded-2xl bg-white ghair soft-shadow-sm">
                      <s.Icon size={26} style={{ color: s.color }} strokeWidth={1.9} />
                    </div>
                    <span
                      className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.16em] text-ink"
                      style={{ top: `${CARD + 8}px` }}
                    >
                      {s.label}
                    </span>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile fallback (below md) — replaced with a real stack layout in Task 5 */}
      <ul aria-hidden="true" className="mt-12 flex flex-col gap-3 md:hidden">
        {STAGES.map((s) => (
          <li key={s.key} className="rounded-2xl bg-white px-4 py-3 ghair soft-shadow-sm">
            <span className="block text-[9px] font-semibold uppercase tracking-[0.16em] text-ink-muted">{s.sub}</span>
            <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-ink">{s.label}</span>
          </li>
        ))}
      </ul>

      {/* Screen-reader linearization */}
      <ol className="sr-only" aria-label="How I work with AI">
        {STAGES.map((s) => (
          <li key={s.key}>
            <strong>{s.label}</strong> — {s.sub}. {s.longLabel}
          </li>
        ))}
      </ol>
    </section>
  )
}
