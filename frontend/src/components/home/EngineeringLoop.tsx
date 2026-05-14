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
  yesAt: { x: number; y: number }      // green label position
  noArc: string                         // SVG cubic path for the amber arc
  noLabelAt: { x: number; y: number }   // amber NO label position
  noTarget: string                      // e.g. "SPEC" for mobile chip
}

// Design space
const W = 700
const H = 460
const ROW1_Y = 100
const ROW2_Y = 360
const CARD = 84
const HALF = CARD / 2
const DIAMOND = 48
const DHALF = DIAMOND / 2

const STAGES: Stage[] = [
  { key: 'frame',   label: 'FRAME',   sub: 'WITH THE OPERATOR',   longLabel: 'Frame the problem with the operator, not the dataset.',                                              artifact: 'brief',         Icon: Target,      color: 'var(--plum)', cx: 80,  cy: ROW1_Y },
  { key: 'spec',    label: 'SPEC',    sub: 'DESIGN BEFORE CODE',  longLabel: 'Write the spec before any code.',                                                                    artifact: 'spec.md',       Icon: FileText,    color: 'var(--ink)',  cx: 220, cy: ROW1_Y },
  { key: 'plan',    label: 'PLAN',    sub: 'REVIEWABLE UNITS',    longLabel: 'Decompose the spec into a reviewable plan.',                                                         artifact: 'plan.md',       Icon: ListChecks,  color: 'var(--plum)', cx: 500, cy: ROW1_Y },
  { key: 'build',   label: 'BUILD',   sub: 'TESTS WITH THE CODE', longLabel: 'Build with agents — code and tests produced together, every step reviewable.',                       artifact: 'diff+tests',    Icon: Bot,         color: 'var(--ink)',  cx: 640, cy: ROW1_Y },
  { key: 'verify',  label: 'VERIFY',  sub: 'MULTI-GATE',          longLabel: 'Verify against a stack of gates — types, lint, tests, eval/regression, secrets check, human review.', artifact: 'gate report',   Icon: ShieldCheck, color: 'var(--plum)', cx: 640, cy: ROW2_Y },
  { key: 'ship',    label: 'SHIP',    sub: 'RELEASE-TAGGED',      longLabel: 'Ship with a release tag and a written rollback path.',                                                artifact: 'release notes', Icon: Rocket,      color: 'var(--ink)',  cx: 360, cy: ROW2_Y },
  { key: 'observe', label: 'OBSERVE', sub: 'LOGS & FEEDBACK',     longLabel: 'Observe in production — logs, traces, and incident feedback drive the next loop.',                   artifact: 'logs/traces',   Icon: Activity,    color: 'var(--plum)', cx: 220, cy: ROW2_Y },
]

// Decision diamonds: clear? after SPEC, gate? after VERIFY, healthy? after OBSERVE.
const DECISIONS: Decision[] = [
  {
    key: 'clear',
    question: 'CLEAR?',
    cx: 360,
    cy: ROW1_Y,
    yesAt: { x: 430, y: ROW1_Y - 8 },
    // NO arc: top of clear-diamond up and over to top of SPEC card.
    noArc: `M 360 ${ROW1_Y - DHALF} C 360 28, 220 28, 220 ${ROW1_Y - HALF}`,
    noLabelAt: { x: 290, y: 24 },
    noTarget: 'SPEC',
  },
  {
    key: 'gate',
    question: 'GATE?',
    cx: 500,
    cy: ROW2_Y,
    yesAt: { x: 430, y: ROW2_Y - 8 },
    // NO arc: top of gate-diamond up to bottom of PLAN card. Slight outward curve.
    noArc: `M 500 ${ROW2_Y - DHALF} C 565 280, 565 200, 500 ${ROW1_Y + HALF}`,
    noLabelAt: { x: 590, y: 230 },
    noTarget: 'PLAN',
  },
  {
    key: 'healthy',
    question: 'HEALTHY?',
    cx: 80,
    cy: ROW2_Y,
    yesAt: { x: 80, y: ROW2_Y + DHALF + 18 },
    // NO arc: left of healthy-diamond curving out and up to bottom of FRAME.
    noArc: `M ${80 - DHALF} ${ROW2_Y} C 10 320, 10 180, 80 ${ROW1_Y + HALF}`,
    noLabelAt: { x: 18, y: 232 },
    noTarget: 'FRAME',
  },
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
      <div className="relative mx-auto mt-14 hidden w-full max-w-[760px] md:block">
        <div className="relative w-full" style={{ paddingBottom: `${(H / W) * 100}%` }}>
          <div className="absolute inset-0">
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

              {/* ── Row 1 forward connectors (plum dashed) ───────────────────────── */}
              {/* FRAME → SPEC */}
              <line x1={80 + HALF}  y1={ROW1_Y} x2={220 - HALF} y2={ROW1_Y} stroke="var(--plum)" strokeWidth={2} strokeOpacity={0.45} strokeLinecap="round" className="flow-line" />
              {/* SPEC → ◇clear? */}
              <line x1={220 + HALF} y1={ROW1_Y} x2={360 - DHALF} y2={ROW1_Y} stroke="var(--plum)" strokeWidth={2} strokeOpacity={0.45} strokeLinecap="round" className="flow-line" />
              {/* ◇clear? → PLAN */}
              <line x1={360 + DHALF} y1={ROW1_Y} x2={500 - HALF} y2={ROW1_Y} stroke="var(--plum)" strokeWidth={2} strokeOpacity={0.45} strokeLinecap="round" className="flow-line" />
              {/* PLAN → BUILD */}
              <line x1={500 + HALF} y1={ROW1_Y} x2={640 - HALF} y2={ROW1_Y} stroke="var(--plum)" strokeWidth={2} strokeOpacity={0.45} strokeLinecap="round" className="flow-line" />

              {/* Vertical drop: BUILD → VERIFY (right edge) */}
              <line x1={640} y1={ROW1_Y + HALF} x2={640} y2={ROW2_Y - HALF} stroke="var(--plum)" strokeWidth={2} strokeOpacity={0.45} strokeLinecap="round" className="flow-line" />

              {/* ── Row 2 forward connectors (R→L, plum dashed) ──────────────────── */}
              {/* VERIFY → ◇gate? */}
              <line x1={640 - HALF} y1={ROW2_Y} x2={500 + DHALF} y2={ROW2_Y} stroke="var(--plum)" strokeWidth={2} strokeOpacity={0.45} strokeLinecap="round" className="flow-line" />
              {/* ◇gate? → SHIP */}
              <line x1={500 - DHALF} y1={ROW2_Y} x2={360 + HALF} y2={ROW2_Y} stroke="var(--plum)" strokeWidth={2} strokeOpacity={0.45} strokeLinecap="round" className="flow-line" />
              {/* SHIP → OBSERVE */}
              <line x1={360 - HALF} y1={ROW2_Y} x2={220 + HALF} y2={ROW2_Y} stroke="var(--plum)" strokeWidth={2} strokeOpacity={0.45} strokeLinecap="round" className="flow-line" />
              {/* OBSERVE → ◇healthy? */}
              <line x1={220 - HALF} y1={ROW2_Y} x2={80 + DHALF} y2={ROW2_Y} stroke="var(--plum)" strokeWidth={2} strokeOpacity={0.45} strokeLinecap="round" className="flow-line" />

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
                <g key={`diamond-${d.key}`}>
                  <polygon
                    points={diamondPoints(d.cx, d.cy, DHALF)}
                    fill="white"
                    stroke="var(--line)"
                    strokeWidth={1}
                  />
                  <text
                    x={d.cx}
                    y={d.cy + 5}
                    textAnchor="middle"
                    fontSize="16"
                    fontWeight="800"
                    fill="var(--plum)"
                    fontFamily="var(--font-display, 'Plus Jakarta Sans'), system-ui, sans-serif"
                  >
                    ?
                  </text>
                </g>
              ))}
            </svg>

            {/* Stage cards (HTML overlay, percentage-positioned) */}
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
                  <span
                    className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.16em] text-ink-muted"
                    style={{ bottom: `${CARD + 6}px` }}
                  >
                    {s.sub}
                  </span>
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

            {/* Diamond question labels (HTML overlay so they pick up font-display) */}
            {DECISIONS.map((d) => (
              <span
                key={`q-${d.key}`}
                className="absolute -translate-x-1/2 -translate-y-full whitespace-nowrap font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted"
                style={{
                  left: `${(d.cx / W) * 100}%`,
                  top: `calc(${((d.cy - DHALF - 6) / H) * 100}%)`,
                }}
              >
                {d.question}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile stack (below md) */}
      <div className="relative mt-12 md:hidden">
        <ol className="relative flex flex-col items-center gap-0" aria-hidden>
          {STAGES.map((s, i) => {
            const isLast = i === STAGES.length - 1
            // Decision rows appear AFTER SPEC (i=1), AFTER VERIFY (i=4), AFTER OBSERVE (i=6).
            const decisionAfter =
              i === 1 ? DECISIONS[0] : i === 4 ? DECISIONS[1] : i === 6 ? DECISIONS[2] : null
            return (
              <li key={s.key} className="flex w-full flex-col items-center">
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
                      className="grid h-8 w-8 place-items-center bg-white ghair soft-shadow-sm font-mono text-[12px] font-extrabold text-plum"
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
                  // Spacer to keep rhythm consistent between cards w/o decisions.
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
