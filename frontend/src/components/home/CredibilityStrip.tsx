// frontend/src/components/home/CredibilityStrip.tsx
import { Users, CalendarDays, Globe, Quote } from 'lucide-react'

const STATS = [
  { value: '10+', label: 'Years in Tech',     Icon: Users,        tint: 'var(--plum)' },
  { value: '50+', label: 'Projects Shipped',  Icon: CalendarDays, tint: 'var(--green)' },
  { value: '8+',  label: 'Industries Served', Icon: Globe,        tint: 'var(--pink)' },
]

export function CredibilityStrip() {
  return (
    <section className="mx-auto max-w-[1180px] px-6 py-12">
      <div className="flex flex-col gap-8 rounded-3xl bg-white px-8 py-8 ghair soft-shadow lg:flex-row lg:items-center">
        <div className="grid flex-1 grid-cols-1 gap-7 sm:grid-cols-3">
          {STATS.map(({ value, label, Icon, tint }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full" style={{ background: 'rgba(28,22,46,0.04)' }}>
                <Icon size={18} style={{ color: tint }} strokeWidth={1.9} />
              </div>
              <div>
                <p className="font-display text-2xl font-extrabold leading-none" style={{ color: tint }}>{value}</p>
                <p className="mt-1 text-sm text-ink-muted">{label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden w-px self-stretch bg-[var(--line)] lg:block" />

        <div className="relative max-w-md lg:pl-2">
          <Quote size={22} className="absolute -left-1 -top-1 text-[rgba(109,40,217,0.25)]" fill="currentColor" />
          <p className="pl-7 text-[1.05rem] leading-relaxed text-ink-soft">
            I design AI-native systems that run in the real world — across multi-site enterprise
            environments where operational intelligence is non-negotiable.
          </p>
        </div>
      </div>
    </section>
  )
}
