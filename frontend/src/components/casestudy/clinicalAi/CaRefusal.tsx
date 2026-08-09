// frontend/src/components/casestudy/clinicalAi/CaRefusal.tsx
import { CsSection, Module } from '../bits'
import { DBox, HArrow, VArrow, DiagramPair } from './svg'

const DIAGRAM_LABEL =
  'Retrieved context is checked against the question. If the corpus covers it, the model answers with page-level citations. If it does not, the model returns a refusal that states specifically what is missing, rather than improvising from its own memory.'

function WideDiagram() {
  return (
    <svg viewBox="0 0 900 240" className="h-auto w-full" role="img" aria-label={DIAGRAM_LABEL}>
      <title>The coverage gate between an answer and a refusal</title>
      <DBox x={8} y={88} w={170} h={64} label="Retrieved context" sub="top passages, MMR" fs={12} />
      <HArrow x1={178} x2={216} y={120} />
      <DBox x={220} y={80} w={210} h={80} label="Does it cover" sub="the question asked?" tone="plum" />

      <line x1={430} y1={120} x2={452} y2={120} style={{ stroke: 'var(--ink-muted)' }} strokeWidth={1.4} />
      <line x1={452} y1={48} x2={452} y2={192} style={{ stroke: 'var(--ink-muted)' }} strokeWidth={1.4} />
      <HArrow x1={452} x2={488} y={48} />
      <HArrow x1={452} x2={488} y={192} />
      <text x={458} y={38} fontSize={10.5} fontWeight={700} style={{ fill: 'var(--ink-muted)' }}>
        YES
      </text>
      <text x={458} y={182} fontSize={10.5} fontWeight={700} style={{ fill: 'var(--ink-muted)' }}>
        NO
      </text>

      <DBox x={492} y={20} w={400} h={56} label="Answer, grounded" sub="AMA-style page-level citations" fs={12} />
      <DBox x={492} y={164} w={400} h={56} label="Refusal, specific" sub="states what the corpus does not contain" fs={12} tone="muted" />
    </svg>
  )
}

function StackedDiagram() {
  return (
    <svg viewBox="0 0 320 420" className="mx-auto h-auto w-full max-w-[360px]" role="img" aria-label={DIAGRAM_LABEL}>
      <title>The coverage gate between an answer and a refusal</title>
      <DBox x={20} y={8} w={280} h={50} label="Retrieved context" sub="top passages, MMR" fs={12} />
      <VArrow x={160} y1={58} y2={82} />
      <DBox x={20} y={84} w={280} h={64} label="Does it cover" sub="the question asked?" tone="plum" fs={12} />
      <VArrow x={86} y1={148} y2={188} />
      <VArrow x={234} y1={148} y2={188} />
      <text x={70} y={172} textAnchor="middle" fontSize={10} fontWeight={700} style={{ fill: 'var(--ink-muted)' }}>
        YES
      </text>
      <text x={250} y={172} textAnchor="middle" fontSize={10} fontWeight={700} style={{ fill: 'var(--ink-muted)' }}>
        NO
      </text>
      <DBox x={20} y={190} w={280} h={62} label="Answer, grounded" sub="page-level citations" fs={11.5} />
      <DBox x={20} y={268} w={280} h={62} label="Refusal, specific" sub="names the missing coverage" fs={11.5} tone="muted" />
      <text x={160} y={366} textAnchor="middle" fontSize={10.5} style={{ fill: 'var(--ink-muted)' }}>
        no answer is synthesised
      </text>
      <text x={160} y={382} textAnchor="middle" fontSize={10.5} style={{ fill: 'var(--ink-muted)' }}>
        from model memory
      </text>
    </svg>
  )
}

const CONTRACT = [
  { slot: 'restate', body: 'What was asked, in the system’s own words.' },
  { slot: 'gap', body: 'What the corpus specifically does not contain on that question.' },
  { slot: 'never', body: 'No substitute answer drawn from the model’s own training.' },
]

const MECHANISM = [
  {
    title: 'temperature = 0',
    body: 'Deterministic decoding. The model is not sampling its way into a plausible-sounding paragraph.',
  },
  {
    title: 'A prompt that demands specificity',
    body: '“I don’t know” is not enough. The refusal has to say what is missing, so the clinician knows where to look next.',
  },
  {
    title: 'Refusal is an output, not an error',
    body: 'It is a designed response shape with its own contract — treated as a success path, not a failure.',
  },
]

export function CaRefusal() {
  return (
    <CsSection
      id="refusal"
      eyebrow="03 · The hard part"
      title="A RAG system that retrieves badly will still answer beautifully."
      intro="That is the whole risk. If retrieval misses, the model falls back on its own memory and the clinician receives no signal at all. So refusal had to be built."
    >
      <Module>
        <DiagramPair wide={<WideDiagram />} stacked={<StackedDiagram />} />
      </Module>

      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.1fr]">
        <div className="rounded-2xl bg-white p-6 ghair soft-shadow-sm">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-plum">The refusal contract</p>
          <ol className="mt-4 space-y-3">
            {CONTRACT.map(({ slot, body }, i) => (
              <li key={slot} className="flex gap-3">
                <span
                  className="mt-[2px] grid h-6 w-6 shrink-0 place-items-center rounded-lg font-mono text-[11px] font-bold"
                  style={{ background: 'var(--plum-soft)', color: 'var(--plum)' }}
                >
                  {i + 1}
                </span>
                <span className="text-[13px] leading-relaxed text-ink-soft">{body}</span>
              </li>
            ))}
          </ol>
          <p className="mt-5 border-t border-[var(--line)] pt-3 font-mono text-[11px] text-ink-muted">
            response shape, not a screenshot
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {MECHANISM.map(({ title, body }) => (
            <div key={title} className="rounded-2xl bg-white p-5 ghair soft-shadow-sm">
              <h3 className="font-display text-[15px] font-bold leading-snug text-ink">{title}</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-ink-soft">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </CsSection>
  )
}
