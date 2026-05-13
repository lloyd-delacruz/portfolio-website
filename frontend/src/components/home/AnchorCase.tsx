// frontend/src/components/home/AnchorCase.tsx
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Check } from 'lucide-react'
import { ANCHOR_CASE_HREF, StatusPill, CapabilityPill } from './FeaturedWork'
import { Window } from './Window'

const BULLETS = [
  'Multi-site deployment with role-based coordination',
  'QR-driven workflows for intake, dispatch, and return',
  'Lifecycle visibility from acquisition to retirement',
  'Real-time chain-of-custody across hospital units',
]

const STATS = [
  { value: '4 sites',    label: 'deployed' },
  { value: '800+',       label: 'assets tracked' },
  { value: 'Multi-site', label: 'coordination' },
  { value: 'Chain',      label: 'of custody' },
]

export function AnchorCase() {
  return (
    <article className="lift mt-8 overflow-hidden rounded-2xl bg-white ghair soft-shadow">
      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr]">
        {/* left column — copy */}
        <div className="flex flex-col p-7 lg:p-9">
          <span className="inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-plum" style={{ background: 'var(--plum-soft)' }}>
            Anchor case · Enterprise deployment
          </span>

          <div className="mt-4 flex flex-wrap items-center gap-1.5">
            <StatusPill status="production" />
            <CapabilityPill kind="case-study" />
          </div>

          <h3 className="mt-4 font-display text-2xl font-extrabold leading-[1.15] text-ink sm:text-[1.9rem]">
            Multi-Site Wheelchair Tracking System
          </h3>

          <p className="mt-3 max-w-[58ch] text-[15px] leading-relaxed text-ink-soft">
            Production asset-tracking platform deployed across multiple hospital sites —
            coordinating 800+ wheelchairs and clinical assets with QR-driven workflows,
            lifecycle visibility, and chain-of-custody tracking.
          </p>

          <ul className="mt-5 space-y-2.5">
            {BULLETS.map((b) => (
              <li key={b} className="flex items-start gap-2.5 text-[14px] leading-snug text-ink-soft">
                <Check size={14} aria-hidden className="mt-1 shrink-0 text-plum" strokeWidth={2.4} />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
            Power Platform · Microsoft Lists · React · TypeScript · QR systems
          </p>

          <Link
            href={ANCHOR_CASE_HREF}
            className="group mt-6 inline-flex w-fit items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white soft-shadow-sm transition-transform hover:-translate-y-0.5"
            style={{ background: 'var(--plum)' }}
          >
            Read the case study
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* right column — mini architecture + micro-stats */}
        <div
          className="flex flex-col gap-5 p-7 lg:p-9"
          style={{ background: 'linear-gradient(135deg,#f3effe,#fbf5fe)' }}
        >
          {/* live operations screenshot */}
          <div className="rounded-2xl bg-white p-3 ghair soft-shadow-sm">
            <p className="px-1 pb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
              Operations dashboard — live across 4 sites
            </p>
            <Window>
              <div className="relative overflow-hidden rounded-md" style={{ aspectRatio: '16 / 9' }}>
                <Image
                  src="/images/Wheelchair_tracking.png"
                  alt="Wheelchair tracking operations dashboard — site overview"
                  fill
                  sizes="(min-width: 1024px) 480px, 90vw"
                  className="object-cover object-top"
                  unoptimized
                />
              </div>
            </Window>
          </div>

          {/* micro-stats */}
          <div className="grid grid-cols-2 gap-3">
            {STATS.map((s) => (
              <div key={s.value + s.label} className="rounded-xl bg-white p-3 ghair">
                <p className="font-display text-base font-extrabold leading-tight text-ink">{s.value}</p>
                <p className="mt-0.5 text-[11px] text-ink-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}
