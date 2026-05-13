// frontend/src/components/home/AboutCerts.tsx
import { BadgeCheck, Award, GraduationCap, Cloud, Database, Code2, BarChart3, Sigma } from 'lucide-react'

const CERTS = [
  { label: 'BrainStation — Data Analytics', Icon: BadgeCheck },
  { label: 'Google — Data Analytics', Icon: Award },
  { label: 'DeepLearning.AI — Data Engineering', Icon: GraduationCap },
  { label: 'AWS — AI Practitioner', Icon: Cloud },
]

const TOOLS = [
  { label: 'SQL', Icon: Database },
  { label: 'Python', Icon: Code2 },
  { label: 'R', Icon: Sigma },
  { label: 'Tableau', Icon: BarChart3 },
]

const PILL_BASE =
  'group inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[13px] font-medium text-ink-soft ghair transition-colors hover:text-ink hover:border-[rgba(109,40,217,0.22)]'

export function AboutCerts() {
  return (
    <section className="mx-auto max-w-[1180px] px-6 pb-12 pt-2">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
        Certifications
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-3">
        {CERTS.map(({ label, Icon }) => (
          <span key={label} className={PILL_BASE}>
            <Icon size={15} strokeWidth={1.9} className="text-plum transition-transform group-hover:scale-110" />
            {label}
          </span>
        ))}
      </div>

      <p className="mt-7 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
        Core stack
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-3">
        {TOOLS.map(({ label, Icon }) => (
          <span key={label} className={PILL_BASE}>
            <Icon size={15} strokeWidth={1.9} className="text-plum transition-transform group-hover:scale-110" />
            {label}
          </span>
        ))}
      </div>
    </section>
  )
}
