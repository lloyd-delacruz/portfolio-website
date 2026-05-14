// frontend/src/components/casestudy/clinicalGenai/CgChallenges.tsx
import { CsSection } from '../bits'

const CHALLENGES = [
  {
    num: '01',
    title: 'Messy clinical language',
    body: 'Dictated notes contain abbreviations, incomplete sentences, and inconsistent phrasing. The extractor has to be tolerant without inventing data.',
  },
  {
    num: '02',
    title: 'Data integrity',
    body: 'Invalid or missing metrics are flagged before being stored. Validation gates run on every extraction.',
  },
  {
    num: '03',
    title: 'Analytics readiness',
    body: 'Free-text recovery descriptions become normalized metrics suitable for time-series analysis.',
  },
  {
    num: '04',
    title: 'LLM cost control',
    body: 'Caching, compressed prompts, and structured outputs are layered to reduce unnecessary API calls.',
  },
  {
    num: '05',
    title: 'Human review',
    body: 'Low-confidence extractions route to a review queue. The pipeline never treats unsure as fact.',
  },
]

function ChallengeCard({ num, title, body }: { num: string; title: string; body: string }) {
  return (
    <div className="rounded-2xl bg-white p-5 ghair soft-shadow-sm">
      <span
        className="inline-flex items-center rounded-md px-2 py-[2px] text-[11px] font-bold tracking-[0.1em]"
        style={{ background: 'var(--plum-soft)', color: 'var(--plum)' }}
      >
        {num}
      </span>
      <h3 className="mt-3 font-display text-[15px] font-bold leading-snug text-ink">{title}</h3>
      <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">{body}</p>
    </div>
  )
}

export function CgChallenges() {
  return (
    <CsSection
      eyebrow="06 · Engineering challenges"
      title="Where the work actually was."
      intro="Five concrete problems this pipeline is built to handle."
    >
      {/* Mobile/tablet: clean 1–2 col grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
        {CHALLENGES.map((c) => (
          <ChallengeCard key={c.num} {...c} />
        ))}
      </div>

      {/* Desktop: 3 across top, 2 centered below */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-3 gap-4">
          {CHALLENGES.slice(0, 3).map((c) => (
            <ChallengeCard key={c.num} {...c} />
          ))}
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4">
          <div />
          {CHALLENGES.slice(3).map((c) => (
            <ChallengeCard key={c.num} {...c} />
          ))}
        </div>
      </div>
    </CsSection>
  )
}
