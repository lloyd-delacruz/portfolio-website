// frontend/src/components/home/ProductionIndicators.tsx
import Link from 'next/link'
import { Building2, Boxes, HeartPulse, Rocket, ArrowRight } from 'lucide-react'

/**
 * Wheelchair Tracking's deployment (4 sites, 800+ assets) is a verified live
 * system on hospital-internal infrastructure. Every other figure here is
 * countable directly from source control, not asserted.
 */
const METRICS = [
  { value: '4',    label: 'Hospital sites · live deployment', Icon: Building2,  tint: 'var(--plum)',  bg: 'var(--plum-soft)' },
  { value: '800+', label: 'Assets tracked in production',     Icon: Boxes,      tint: 'var(--amber)', bg: '#fef3c7' },
  { value: '498',  label: 'Automated tests across 5 systems', Icon: Rocket,     tint: 'var(--blue)',  bg: '#dbeafe' },
  { value: '9+',   label: 'Years in healthcare operations',   Icon: HeartPulse, tint: 'var(--green)', bg: '#d1fae5' },
]

export function ProductionIndicators() {
  return (
    <section className="mx-auto max-w-[1180px] px-6 py-6">
      <div className="flex flex-col gap-8 rounded-3xl bg-white px-7 py-7 ghair soft-shadow lg:flex-row lg:items-center lg:gap-6">
        <div className="grid flex-1 grid-cols-2 gap-7 sm:grid-cols-4">
          {METRICS.map(({ value, label, Icon, tint, bg }) => (
            <div key={label}>
              <div className="grid h-9 w-9 place-items-center rounded-lg" style={{ background: bg }}>
                <Icon size={18} style={{ color: tint }} strokeWidth={1.9} />
              </div>
              <p className="mt-3 font-display text-2xl font-extrabold text-ink">{value}</p>
              <p className="text-sm text-ink-muted">{label}</p>
            </div>
          ))}
        </div>

        <div className="hidden w-px self-stretch bg-[var(--line)] lg:block" />

        <div className="lg:w-60">
          <p className="flex items-center gap-2 text-sm font-medium text-ink">
            <span className="h-2 w-2 rounded-full" style={{ background: 'var(--green)' }} />
            Currently available
          </p>
          <p className="mt-1 text-xs leading-relaxed text-ink-muted">
            Vancouver, BC · Open to healthcare systems, backend, and applied AI engineering roles — remote, hybrid, or on-site
          </p>
          <Link
            href="/contact"
            className="group mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-plum"
          >
            Start a conversation
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
