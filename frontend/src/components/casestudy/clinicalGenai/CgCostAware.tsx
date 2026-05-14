// frontend/src/components/casestudy/clinicalGenai/CgCostAware.tsx
import { Scissors, Database, Layers, FileJson } from 'lucide-react'
import { CsSection } from '../bits'

const TECHNIQUES = [
  {
    Icon: Scissors,
    title: 'Prompt compression',
    body: 'Strip filler, normalize abbreviations, drop redundant context before the call.',
  },
  {
    Icon: Database,
    title: 'Caching repeated patterns',
    body: 'Hash-keyed cache for recurring note shapes — same input, no second call.',
  },
  {
    Icon: Layers,
    title: 'Split extraction from validation',
    body: 'Validation runs on structured output, not by re-prompting the model.',
  },
  {
    Icon: FileJson,
    title: 'Schema-constrained output',
    body: 'Structured outputs cut retries; malformed responses are caught at parse, not by another call.',
  },
]

export function CgCostAware() {
  return (
    <CsSection
      eyebrow="05 · Cost-aware design"
      title="Engineered for fewer, cheaper calls."
      intro="Token cost is a design constraint, not an afterthought."
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {TECHNIQUES.map(({ Icon, title, body }) => (
          <div key={title} className="rounded-2xl bg-white p-5 ghair soft-shadow-sm">
            <div className="grid h-10 w-10 place-items-center rounded-xl" style={{ background: 'var(--plum-soft)' }}>
              <Icon size={18} style={{ color: 'var(--plum)' }} strokeWidth={1.9} />
            </div>
            <h3 className="mt-3 font-display text-[15px] font-bold text-ink">{title}</h3>
            <p className="mt-1.5 text-[13px] leading-relaxed text-ink-soft">{body}</p>
          </div>
        ))}
      </div>

      <p className="mt-6 text-xs italic text-ink-muted">
        Design choices, not measured savings. The pipeline is designed to reduce unnecessary token usage and
        repeated model calls.
      </p>
    </CsSection>
  )
}
