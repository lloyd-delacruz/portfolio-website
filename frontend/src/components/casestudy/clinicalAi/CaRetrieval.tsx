// frontend/src/components/casestudy/clinicalAi/CaRetrieval.tsx
import { CsSection, Module } from '../bits'

const DOTS: Array<[number, number]> = [
  [72, 60], [96, 78], [84, 104], [110, 58], [118, 96], [66, 92],
  [172, 48], [196, 92], [164, 128], [206, 140], [128, 152], [86, 148],
]

/** Indices of the passages a strategy would select. */
const TOPK = [0, 1, 2, 5]
const MMR = [1, 6, 8, 11]

function ScatterPanel({
  heading,
  note,
  selected,
  tone,
}: {
  heading: string
  note: string
  selected: number[]
  tone: 'muted' | 'plum'
}) {
  const accent = tone === 'plum' ? 'var(--plum)' : 'var(--ink-muted)'
  return (
    <div className="rounded-2xl bg-white p-5 ghair soft-shadow-sm">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: accent }}>
        {heading}
      </p>
      <svg
        viewBox="0 0 260 200"
        className="mt-3 h-auto w-full"
        role="img"
        aria-label={`${heading}: ${note}`}
      >
        <title>{heading}</title>
        <rect x={1} y={1} width={258} height={198} rx={14} style={{ fill: 'var(--cream-2)', stroke: 'var(--line)' }} strokeWidth={1} />
        <circle cx={96} cy={90} r={62} style={{ fill: 'rgba(109,40,217,0.06)', stroke: 'none' }} />
        <text x={96} y={22} textAnchor="middle" fontSize={10} style={{ fill: 'var(--ink-muted)' }}>
          nearest neighbourhood
        </text>
        {DOTS.map(([cx, cy], i) => {
          const on = selected.includes(i)
          return (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={on ? 7 : 4.5}
              style={{
                fill: on ? accent : 'rgba(28,22,46,0.18)',
                stroke: on ? '#ffffff' : 'none',
              }}
              strokeWidth={2}
            />
          )
        })}
      </svg>
      <p className="mt-3 text-[13px] leading-relaxed text-ink-soft">{note}</p>
    </div>
  )
}

export function CaRetrieval() {
  return (
    <CsSection
      eyebrow="04 · Retrieval"
      title="Four near-identical passages are one source wearing four hats."
      intro="Retrieval is rewritten before it runs, then selected for diversity — so an answer is supported by several parts of the corpus rather than four slices of the same page."
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <ScatterPanel
          heading="Plain top-k"
          tone="muted"
          selected={TOPK}
          note="The four closest chunks cluster together. They mostly repeat each other, and the answer inherits a single point of view."
        />
        <ScatterPanel
          heading="Maximal marginal relevance"
          tone="plum"
          selected={MMR}
          note="Selection trades a little similarity for coverage. The context window carries genuinely different passages."
        />
      </div>

      <Module className="mt-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
          Before any of that: query rewriting
        </p>
        <div className="mt-4 grid grid-cols-1 items-center gap-4 sm:grid-cols-[1fr_auto_1fr]">
          <div className="rounded-xl p-4 ghair" style={{ background: 'var(--cream-2)' }}>
            <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-muted">as typed</p>
            <span className="mt-3 block h-[9px] w-[72%] rounded-full" style={{ background: 'rgba(28,22,46,0.13)' }} aria-hidden />
          </div>
          <span className="hidden text-center text-ink-muted sm:block" aria-hidden>
            →
          </span>
          <div className="rounded-xl bg-white p-4 ghair">
            <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-plum">rewritten for retrieval</p>
            <div className="mt-3 space-y-2" aria-hidden>
              <span className="block h-[9px] w-[92%] rounded-full" style={{ background: 'rgba(109,40,217,0.28)' }} />
              <span className="block h-[9px] w-[78%] rounded-full" style={{ background: 'rgba(109,40,217,0.22)' }} />
            </div>
          </div>
        </div>
        <p className="mt-4 text-[13px] leading-relaxed text-ink-soft">
          Clinicians ask questions in shorthand. The query is expanded into terms the index can actually match
          before it touches the vector store.
        </p>
      </Module>
    </CsSection>
  )
}
