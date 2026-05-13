// frontend/src/components/home/AIWorkflowAlgorithm.tsx

type Stage = {
  key: string
  label: string      // mono uppercase caption shown below each card
  sub: string        // mono uppercase sub-caption shown above each card
  longLabel: string  // sentence used in the sr-only list
}

const STAGES: Stage[] = [
  { key: 'frame',    label: 'FRAME',           sub: 'WITH THE OPERATOR',  longLabel: 'Frame the problem with the operator, not the dataset.' },
  { key: 'spec',     label: 'SPEC',            sub: 'DESIGN BEFORE CODE', longLabel: 'Write the spec before any code.' },
  { key: 'plan',     label: 'PLAN',            sub: 'REVIEWABLE UNITS',   longLabel: 'Decompose the spec into a reviewable plan.' },
  { key: 'dispatch', label: 'DISPATCH AGENTS', sub: 'TESTS FIRST',        longLabel: 'Dispatch agentic coding tools to do the work, tests first.' },
  { key: 'gate',     label: 'PASS?',           sub: 'DECISION GATE',      longLabel: 'Decision: do the tests pass and the behaviour match the spec? If no, loop back to Plan.' },
  { key: 'review',   label: 'REVIEW',          sub: 'HUMAN IN THE LOOP',  longLabel: 'Review every diff yourself before merging.' },
  { key: 'ship',     label: 'SHIP',            sub: 'OBSERVABLE IN PROD', longLabel: 'Ship to production and monitor the running system.' },
]

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

      {/* Visible stage list — placeholder layout, replaced by the diagram in Task 2 */}
      <ul aria-hidden="true" className="mt-12 flex flex-wrap gap-4">
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
          <li key={s.key}>{s.longLabel}</li>
        ))}
      </ol>
    </section>
  )
}
