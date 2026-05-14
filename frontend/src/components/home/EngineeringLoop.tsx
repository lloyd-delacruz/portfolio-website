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
  col: number   // 1..5 — the column on the grid
  row: 1 | 2    // which row
}

type Decision = {
  key: string
  question: string
  col: number
  row: 1 | 2
  noTarget: string
}

// ───── Strict 5×2 grid ──────────────────────────────────────────────────────
const W = 740
const H = 380
const COLS_X = [100, 260, 420, 580, 700]   // five columns, evenly spaced
const ROW_Y = { 1: 100, 2: 300 } as const

const CARD_W = 100
const CARD_H = 60
const HALF_W = CARD_W / 2
const HALF_H = CARD_H / 2

const DIAMOND = 52
const DHALF = DIAMOND / 2

// Helper: x position for a 1-based column index.
const X = (col: number) => COLS_X[col - 1]

// Stage cards. Row 1 reads L→R; Row 2 is placed so each Row-2 card sits
// directly below its Row-1 counterpart in the same column, but the flow
// arrows point R→L (VERIFY → SHIP → OBSERVE → HEALTHY?).
const STAGES: Stage[] = [
  // Row 1 (L→R)
  { key: 'frame',   col: 1, row: 1, label: 'FRAME',   sub: 'WITH THE OPERATOR',   longLabel: 'Frame the problem with the operator, not the dataset.',                                              artifact: 'brief',         Icon: Target,      color: 'var(--plum)' },
  { key: 'spec',    col: 2, row: 1, label: 'SPEC',    sub: 'DESIGN BEFORE CODE',  longLabel: 'Write the spec before any code.',                                                                    artifact: 'spec.md',       Icon: FileText,    color: 'var(--ink)'  },
  { key: 'plan',    col: 4, row: 1, label: 'PLAN',    sub: 'REVIEWABLE UNITS',    longLabel: 'Decompose the spec into a reviewable plan.',                                                         artifact: 'plan.md',       Icon: ListChecks,  color: 'var(--plum)' },
  { key: 'build',   col: 5, row: 1, label: 'BUILD',   sub: 'TESTS WITH THE CODE', longLabel: 'Build with agents — code and tests produced together, every step reviewable.',                       artifact: 'diff+tests',    Icon: Bot,         color: 'var(--ink)'  },
  // Row 2 (R→L flow), columns mirror Row 1
  { key: 'verify',  col: 5, row: 2, label: 'VERIFY',  sub: 'MULTI-GATE',          longLabel: 'Verify against a stack of gates — types, lint, tests, eval/regression, secrets check, human review.', artifact: 'gate report',   Icon: ShieldCheck, color: 'var(--plum)' },
  { key: 'ship',    col: 3, row: 2, label: 'SHIP',    sub: 'RELEASE-TAGGED',      longLabel: 'Ship with a release tag and a written rollback path.',                                                artifact: 'release notes', Icon: Rocket,      color: 'var(--ink)'  },
  { key: 'observe', col: 2, row: 2, label: 'OBSERVE', sub: 'LOGS & FEEDBACK',     longLabel: 'Observe in production — logs, traces, and incident feedback drive the next loop.',                   artifact: 'logs/traces',   Icon: Activity,    color: 'var(--plum)' },
]

// Three decision diamonds, each in its own column so NO arcs are straight.
const DECISIONS: Decision[] = [
  { key: 'clear',   col: 3, row: 1, question: 'CLEAR?',   noTarget: 'SPEC'  },  // sits between SPEC and PLAN in Row 1
  { key: 'gate',    col: 4, row: 2, question: 'GATE?',    noTarget: 'PLAN'  },  // sits between SHIP and VERIFY in Row 2, directly under PLAN
  { key: 'healthy', col: 1, row: 2, question: 'HEALTHY?', noTarget: 'FRAME' },  // at the end of Row 2 R→L flow, directly under FRAME
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

      {/* Desktop decision tree — strict 5×2 grid (md and up) */}
      <div className="relative mx-auto mt-14 hidden w-full max-w-[820px] md:block">
        <div className="relative w-full" style={{ paddingBottom: `${(H / W) * 100}%` }}>
          <div className="absolute inset-0">
            <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
              <defs>
                <marker
                  id="eloop-arrow"
                  viewBox="0 0 10 10"
                  refX="10"
                  refY="5"
                  markerWidth="7"
                  markerHeight="7"
                  orient="auto"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--amber)" />
                </marker>
                <marker
                  id="eloop-arrow-plum"
                  viewBox="0 0 10 10"
                  refX="10"
                  refY="5"
                  markerWidth="5"
                  markerHeight="5"
                  orient="auto"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--plum)" fillOpacity={0.6} />
                </marker>
              </defs>

              {/* ── Row 1 forward connectors (L→R) ───────────────────────────────── */}
              {/* FRAME(c1) → SPEC(c2) */}
              <line x1={X(1) + HALF_W} y1={ROW_Y[1]} x2={X(2) - HALF_W}  y2={ROW_Y[1]} stroke="var(--plum)" strokeWidth={2} strokeOpacity={0.45} strokeLinecap="round" className="flow-line" markerEnd="url(#eloop-arrow-plum)" />
              {/* SPEC(c2) → ◇CLEAR?(c3) */}
              <line x1={X(2) + HALF_W} y1={ROW_Y[1]} x2={X(3) - DHALF}   y2={ROW_Y[1]} stroke="var(--plum)" strokeWidth={2} strokeOpacity={0.45} strokeLinecap="round" className="flow-line" markerEnd="url(#eloop-arrow-plum)" />
              {/* ◇CLEAR?(c3) → PLAN(c4) — YES branch */}
              <line x1={X(3) + DHALF}  y1={ROW_Y[1]} x2={X(4) - HALF_W}  y2={ROW_Y[1]} stroke="var(--plum)" strokeWidth={2} strokeOpacity={0.45} strokeLinecap="round" className="flow-line" markerEnd="url(#eloop-arrow-plum)" />
              {/* PLAN(c4) → BUILD(c5) */}
              <line x1={X(4) + HALF_W} y1={ROW_Y[1]} x2={X(5) - HALF_W}  y2={ROW_Y[1]} stroke="var(--plum)" strokeWidth={2} strokeOpacity={0.45} strokeLinecap="round" className="flow-line" markerEnd="url(#eloop-arrow-plum)" />

              {/* ── Vertical drop on the right: BUILD(c5,r1) → VERIFY(c5,r2) ───── */}
              <line x1={X(5)} y1={ROW_Y[1] + HALF_H} x2={X(5)} y2={ROW_Y[2] - HALF_H} stroke="var(--plum)" strokeWidth={2} strokeOpacity={0.45} strokeLinecap="round" className="flow-line" markerEnd="url(#eloop-arrow-plum)" />

              {/* ── Row 2 forward connectors (R→L flow) ──────────────────────────── */}
              {/* VERIFY(c5) → ◇GATE?(c4) */}
              <line x1={X(5) - HALF_W} y1={ROW_Y[2]} x2={X(4) + DHALF}   y2={ROW_Y[2]} stroke="var(--plum)" strokeWidth={2} strokeOpacity={0.45} strokeLinecap="round" className="flow-line" markerEnd="url(#eloop-arrow-plum)" />
              {/* ◇GATE?(c4) → SHIP(c3) — YES branch */}
              <line x1={X(4) - DHALF}  y1={ROW_Y[2]} x2={X(3) + HALF_W}  y2={ROW_Y[2]} stroke="var(--plum)" strokeWidth={2} strokeOpacity={0.45} strokeLinecap="round" className="flow-line" markerEnd="url(#eloop-arrow-plum)" />
              {/* SHIP(c3) → OBSERVE(c2) */}
              <line x1={X(3) - HALF_W} y1={ROW_Y[2]} x2={X(2) + HALF_W}  y2={ROW_Y[2]} stroke="var(--plum)" strokeWidth={2} strokeOpacity={0.45} strokeLinecap="round" className="flow-line" markerEnd="url(#eloop-arrow-plum)" />
              {/* OBSERVE(c2) → ◇HEALTHY?(c1) */}
              <line x1={X(2) - HALF_W} y1={ROW_Y[2]} x2={X(1) + DHALF}   y2={ROW_Y[2]} stroke="var(--plum)" strokeWidth={2} strokeOpacity={0.45} strokeLinecap="round" className="flow-line" markerEnd="url(#eloop-arrow-plum)" />

              {/* ── Diamonds (drawn before NO arcs so arcs emerge on top) ────────── */}
              {DECISIONS.map((d) => (
                <polygon
                  key={`diamond-${d.key}`}
                  points={diamondPoints(X(d.col), ROW_Y[d.row], DHALF)}
                  fill="white"
                  stroke="var(--line)"
                  strokeWidth={1}
                />
              ))}

              {/* ── NO arc 1: ◇CLEAR? → SPEC (orthogonal up-left-down) ──────────── */}
              {/* From CLEAR? top vertex up to y=40, across to col 2, down to SPEC top edge. */}
              <path
                d={`M ${X(3)} ${ROW_Y[1] - DHALF} V 40 H ${X(2)} V ${ROW_Y[1] - HALF_H}`}
                stroke="var(--amber)"
                strokeWidth={2}
                strokeOpacity={0.75}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="flow-line"
                markerEnd="url(#eloop-arrow)"
                data-testid="no-arc"
              />

              {/* ── NO arc 2: ◇GATE? → PLAN (perfectly straight vertical) ───────── */}
              {/* Both at col 4, so this is a clean vertical line. */}
              <line
                x1={X(4)} y1={ROW_Y[2] - DHALF}
                x2={X(4)} y2={ROW_Y[1] + HALF_H}
                stroke="var(--amber)"
                strokeWidth={2}
                strokeOpacity={0.75}
                strokeLinecap="round"
                className="flow-line"
                markerEnd="url(#eloop-arrow)"
                data-testid="no-arc"
              />

              {/* ── NO arc 3: ◇HEALTHY? → FRAME (perfectly straight vertical) ───── */}
              {/* Both at col 1, so this is a clean vertical line. */}
              <line
                x1={X(1)} y1={ROW_Y[2] - DHALF}
                x2={X(1)} y2={ROW_Y[1] + HALF_H}
                stroke="var(--amber)"
                strokeWidth={2}
                strokeOpacity={0.75}
                strokeLinecap="round"
                className="flow-line"
                markerEnd="url(#eloop-arrow)"
                data-testid="no-arc"
              />

              {/* ── Diamond port dots (amber) at each NO-arc start vertex ────────── */}
              <circle cx={X(3)} cy={ROW_Y[1] - DHALF} r={3} fill="var(--amber)" />
              <circle cx={X(4)} cy={ROW_Y[2] - DHALF} r={3} fill="var(--amber)" />
              <circle cx={X(1)} cy={ROW_Y[2] - DHALF} r={3} fill="var(--amber)" />

              {/* ── Diamond question labels (inside the diamond, in plum) ────────── */}
              {DECISIONS.map((d) => (
                <text
                  key={`q-${d.key}`}
                  x={X(d.col)}
                  y={ROW_Y[d.row] + 4}
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight="800"
                  fill="var(--plum)"
                  fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                  style={{ letterSpacing: '0.04em' }}
                >
                  {d.question}
                </text>
              ))}

              {/* ── YES labels (green, above each forward branch after a diamond) ─ */}
              <text x={(X(3) + X(4)) / 2} y={ROW_Y[1] - 14} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--green)" style={{ letterSpacing: '0.14em' }} data-testid="yes-branch">YES</text>
              <text x={(X(3) + X(4)) / 2} y={ROW_Y[2] - 14} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--green)" style={{ letterSpacing: '0.14em' }} data-testid="yes-branch">YES</text>
              <text x={X(1)} y={ROW_Y[2] + DHALF + 18} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--green)" style={{ letterSpacing: '0.14em' }} data-testid="yes-branch">YES</text>

              {/* ── NO labels (amber, beside each NO arc) ────────────────────────── */}
              {/* CLEAR? NO sits on the horizontal segment of its L-path */}
              <text x={(X(2) + X(3)) / 2} y={32} textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--amber)" style={{ letterSpacing: '0.14em' }}>NO</text>
              {/* GATE? NO sits to the right of the vertical at col 4 */}
              <text x={X(4) + 16} y={(ROW_Y[1] + ROW_Y[2]) / 2 + 4} textAnchor="start" fontSize="11" fontWeight="700" fill="var(--amber)" style={{ letterSpacing: '0.14em' }}>NO</text>
              {/* HEALTHY? NO sits to the left of the vertical at col 1 */}
              <text x={X(1) - 16} y={(ROW_Y[1] + ROW_Y[2]) / 2 + 4} textAnchor="end" fontSize="11" fontWeight="700" fill="var(--amber)" style={{ letterSpacing: '0.14em' }}>NO</text>
            </svg>

            {/* Stage cards as HTML overlay (positioned by percent of viewBox) */}
            {STAGES.map((s, i) => {
              const cx = X(s.col)
              const cy = ROW_Y[s.row]
              const delay = i * 0.2
              return (
                <div
                  key={s.key}
                  className="absolute"
                  style={{
                    width: CARD_W,
                    height: CARD_H,
                    left: `${(cx / W) * 100}%`,
                    top: `${(cy / H) * 100}%`,
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
                      <s.Icon size={22} style={{ color: s.color }} strokeWidth={1.9} />
                    </div>
                    <span
                      className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.16em] text-ink"
                      style={{ top: `${CARD_H + 6}px` }}
                    >
                      {s.label}
                    </span>
                    <span
                      className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] text-ink-muted"
                      style={{ top: `${CARD_H + 24}px` }}
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

      {/* Mobile stack (below md) — unchanged shape, decisions inline */}
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
                      className="grid h-8 w-8 place-items-center bg-white ghair soft-shadow-sm font-mono text-[10px] font-bold text-plum"
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

                {!isLast && !decisionAfter && <span aria-hidden className="block h-2 w-px" />}
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
