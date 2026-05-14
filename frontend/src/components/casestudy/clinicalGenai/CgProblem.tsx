// frontend/src/components/casestudy/clinicalGenai/CgProblem.tsx
import { FileText, BarChart3, Clock } from 'lucide-react'
import { CsSection } from '../bits'

const CALLOUTS = [
  { Icon: FileText,  title: 'Free-text dictation' },
  { Icon: BarChart3, title: 'No structured analytics' },
  { Icon: Clock,     title: 'Slow manual review' },
]

export function CgProblem() {
  return (
    <CsSection
      id="problem"
      eyebrow="01 · Problem"
      title="Recovery data is trapped inside free text."
      intro="Rehab documentation is largely dictated. Abbreviations, incomplete sentences, and inconsistent terminology mean recovery progress sits in prose, not in fields a team can analyze."
    >
      <p className="max-w-2xl text-[1.05rem] leading-relaxed text-ink-soft">
        Manual review of those notes is slow and inconsistent. Operational and clinical teams can&apos;t easily
        compare patient progress, visit outcomes, or therapy indicators across sites or time.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {CALLOUTS.map(({ Icon, title }) => (
          <div key={title} className="flex items-center gap-3 rounded-2xl bg-white p-4 ghair soft-shadow-sm">
            <div
              className="grid h-10 w-10 shrink-0 place-items-center rounded-xl"
              style={{ background: 'rgba(248,112,96,0.12)' }}
            >
              <Icon size={18} style={{ color: 'var(--coral)' }} strokeWidth={1.9} />
            </div>
            <p className="text-[13px] font-semibold text-ink">{title}</p>
          </div>
        ))}
      </div>

      <p className="mt-8 max-w-2xl text-sm italic text-ink-muted">
        Lloyd worked 9+ years inside hospital rehab and clinical operations — the documentation patterns and
        workflow constraints are first-hand domain knowledge.
      </p>
    </CsSection>
  )
}
