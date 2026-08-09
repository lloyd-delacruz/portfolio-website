// frontend/src/components/casestudy/clinicalAi/CaProblem.tsx
import { CsSection, Module } from '../bits'

/** Abstract sentence bars — deliberately not real text, since the corpus is copyrighted. */
export function TextBars({ widths, cites }: { widths: number[]; cites?: (number | null)[] }) {
  return (
    <div className="space-y-[10px]">
      {widths.map((w, i) => (
        <div key={i} className="flex items-center gap-1.5">
          <span
            className="h-[9px] rounded-full"
            style={{ width: `${w}%`, background: 'rgba(28,22,46,0.11)' }}
            aria-hidden
          />
          {cites?.[i] != null && (
            <sup
              className="rounded px-1 text-[10px] font-bold leading-none"
              style={{ background: 'var(--plum-soft)', color: 'var(--plum)' }}
            >
              {cites[i]}
            </sup>
          )}
        </div>
      ))}
    </div>
  )
}

function AnswerCard({
  tag,
  tone,
  widths,
  cites,
  footer,
}: {
  tag: string
  tone: 'risk' | 'good'
  widths: number[]
  cites?: (number | null)[]
  footer: string
}) {
  return (
    <div
      className="rounded-2xl bg-white p-5 ghair soft-shadow-sm"
      style={tone === 'good' ? { borderColor: 'rgba(109,40,217,0.3)' } : undefined}
    >
      <p
        className="text-[11px] font-semibold uppercase tracking-[0.14em]"
        style={{ color: tone === 'good' ? 'var(--plum)' : 'var(--ink-muted)' }}
      >
        {tag}
      </p>
      <div className="mt-4">
        <TextBars widths={widths} cites={cites} />
      </div>
      <p className="mt-5 border-t border-[var(--line)] pt-3 font-mono text-[11px] text-ink-muted">{footer}</p>
    </div>
  )
}

const POINTS = [
  {
    num: '01',
    title: 'Fluency is not evidence',
    body: 'A model with no useful retrieval still writes a confident paragraph from parametric memory.',
  },
  {
    num: '02',
    title: 'The clinician gets no signal',
    body: 'Both answers read the same. Nothing on the page distinguishes grounded from improvised.',
  },
  {
    num: '03',
    title: 'So silence has to be designed',
    body: 'Not answering is a product decision that has to be built, tested and enforced — not a side effect.',
  },
]

export function CaProblem() {
  return (
    <CsSection
      id="problem"
      eyebrow="01 · The failure mode"
      title="The dangerous answer is the one that sounds exactly like the good one."
      intro="Both responses below came from the same system. Only one is supported by the corpus — and without citations, a reader cannot tell which."
    >
      <Module>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <AnswerCard
            tag="Improvised from model memory"
            tone="risk"
            widths={[96, 88, 92, 64]}
            footer="0 sources · no provenance"
          />
          <AnswerCard
            tag="Grounded in retrieved passages"
            tone="good"
            widths={[96, 88, 92, 64]}
            cites={[1, 2, null, 3]}
            footer="3 sources · page-level citations"
          />
        </div>
        <p className="mt-5 text-xs italic text-ink-muted">
          Text is shown as abstract bars: the corpus is copyrighted clinical reference material, so no retrieved
          passage is reproduced here.
        </p>
      </Module>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {POINTS.map(({ num, title, body }) => (
          <div key={num} className="rounded-2xl bg-white p-5 ghair soft-shadow-sm">
            <span
              className="inline-flex items-center rounded-md px-2 py-[2px] text-[11px] font-bold tracking-[0.1em]"
              style={{ background: 'var(--plum-soft)', color: 'var(--plum)' }}
            >
              {num}
            </span>
            <h3 className="mt-3 font-display text-[15px] font-bold leading-snug text-ink">{title}</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">{body}</p>
          </div>
        ))}
      </div>
    </CsSection>
  )
}
