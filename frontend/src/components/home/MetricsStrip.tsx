// frontend/src/components/home/MetricsStrip.tsx
import Link from 'next/link'
import { Building2, Boxes, HeartPulse, Rocket, ArrowRight } from 'lucide-react'

const METRICS = [
  { value: '4',     label: 'Hospital sites deployed',     Icon: Building2,  tint: 'var(--plum)',  bg: 'var(--plum-soft)' },
  { value: '800+',  label: 'Assets under management',     Icon: Boxes,      tint: 'var(--amber)', bg: '#fef3c7' },
  { value: '10+',   label: 'Years healthcare operations', Icon: HeartPulse, tint: 'var(--green)', bg: '#d1fae5' },
  { value: '50+',   label: 'Projects shipped',            Icon: Rocket,     tint: 'var(--blue)',  bg: '#dbeafe' },
]

export function MetricsStrip() {
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

        <div className="lg:w-52">
          <p className="flex items-center gap-2 text-sm font-medium text-ink">
            <span className="h-2 w-2 rounded-full" style={{ background: 'var(--green)' }} />
            Currently available
          </p>
          <p className="mt-1 text-xs text-ink-muted">Open to senior architecture and AI systems roles</p>
          <Link href="/contact" className="group mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-plum">
            Start a conversation
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
