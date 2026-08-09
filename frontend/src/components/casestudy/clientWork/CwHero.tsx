// frontend/src/components/casestudy/clientWork/CwHero.tsx
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

const SUMMARY = [
  { k: '5', v: 'sites delivered' },
  { k: '2', v: 'frameworks' },
  { k: '2025–26', v: 'period' },
]

export function CwHero() {
  return (
    <section className="border-b border-[var(--line)]">
      <div className="mx-auto max-w-[1180px] px-6 pb-12 pt-12 lg:pt-14">
        <Link
          href="/work"
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
        >
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
          All work
        </Link>

        <div className="mt-6 grid grid-cols-1 items-end gap-8 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
              Service work · design &amp; build
            </p>
            <h1 className="mt-4 font-display text-[2.4rem] font-extrabold leading-[1.07] text-ink sm:text-[2.9rem]">
              Client &amp; deployed web work
            </h1>
            <p className="mt-5 max-w-[52ch] text-[1.05rem] leading-relaxed text-ink-soft">
              Marketing and booking sites built for clinics, a community sports organisation and local business.
              Smaller in scope than the engineering products — and judged on different things: clarity, speed,
              and a handover the client can live with.
            </p>
          </div>

          <dl className="grid grid-cols-3 gap-4 border-t border-[var(--line)] pt-5 lg:border-0 lg:pt-0">
            {SUMMARY.map(({ k, v }) => (
              <div key={v}>
                <dt className="font-display text-[1.6rem] font-extrabold leading-none text-ink">{k}</dt>
                <dd className="mt-2 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-muted">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
