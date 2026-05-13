// frontend/src/components/home/TrustedRow.tsx
import { Terminal, Braces, Cloud, Box, Database, Workflow } from 'lucide-react'

const TECH = [
  { label: 'Python', Icon: Terminal },
  { label: 'TypeScript', Icon: Braces },
  { label: 'AWS', Icon: Cloud },
  { label: 'Docker', Icon: Box },
  { label: 'PostgreSQL', Icon: Database },
  { label: 'LangChain', Icon: Workflow },
]

export function TrustedRow() {
  return (
    <section className="mx-auto max-w-[1180px] px-6 pb-14 pt-2">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
        Trusted to build with
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-3 opacity-70">
        {TECH.map(({ label, Icon }) => (
          <span key={label} className="inline-flex items-center gap-2 text-[15px] font-medium text-ink-soft">
            <Icon size={17} strokeWidth={1.8} className="text-ink-muted" />
            {label}
          </span>
        ))}
      </div>
    </section>
  )
}
