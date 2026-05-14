// frontend/src/components/home/AnchorCase.tsx
import Link from 'next/link'
import {
  ArrowRight,
  Building2,
  QrCode,
  Workflow,
  Database,
  Gauge,
  Check,
  type LucideIcon,
} from 'lucide-react'
import { ANCHOR_CASE_HREF, StatusPill, CapabilityPill } from './FeaturedWork'

type FlowNode = { Icon: LucideIcon; label: string }

const FLOW: FlowNode[] = [
  { Icon: Building2, label: 'Sites' },
  { Icon: QrCode,    label: 'QR Scan' },
  { Icon: Workflow,  label: 'Workflow' },
  { Icon: Database,  label: 'Lifecycle DB' },
  { Icon: Gauge,     label: 'Ops Dashboard' },
]

const BULLETS = [
  'Multi-site coordination across 4 hospitals',
  'QR / barcode workflows for intake, dispatch, and return',
  'Operational analytics on utilization, dwell time, and rotation',
  'Lifecycle visibility from acquisition to retirement',
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
            Anchor system · Production deployment
          </span>

          <div className="mt-4 flex flex-wrap items-center gap-1.5">
            <StatusPill status="production" />
            <CapabilityPill kind="case-study" />
          </div>

          <h3 className="mt-4 font-display text-2xl font-extrabold leading-[1.15] text-ink sm:text-[1.9rem]">
            Multi-Site Hospital Equipment Tracking & Analytics System
          </h3>

          <p className="mt-3 max-w-[58ch] text-[15px] leading-relaxed text-ink-soft">
            Production healthcare-operations platform deployed across 4 hospital sites — 800+ tracked
            assets coordinated through QR / barcode workflows, lifecycle visibility, operational
            analytics, and real-time chain-of-custody.
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
            Power Platform · Microsoft Lists · React · TypeScript · QR / barcode workflows · operational analytics
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

        {/* right column — deployment flow + micro-stats */}
        <div
          className="flex flex-col gap-5 p-7 lg:p-9"
          style={{ background: 'linear-gradient(135deg,#f3effe,#fbf5fe)' }}
        >
          {/* deployment flow */}
          <div className="rounded-2xl bg-white p-5 ghair soft-shadow-sm">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
              Deployment flow
            </p>
            <div className="mt-4 flex items-center justify-between gap-1">
              {FLOW.map((n, i) => (
                <div key={n.label} className="flex items-center">
                  <div className="flex flex-col items-center gap-1.5">
                    <div
                      className="grid h-9 w-9 place-items-center rounded-lg"
                      style={{ background: 'var(--plum-soft)' }}
                    >
                      <n.Icon size={16} style={{ color: 'var(--plum)' }} strokeWidth={1.9} />
                    </div>
                    <span className="text-[9px] font-semibold uppercase tracking-[0.12em] text-ink-muted">
                      {n.label}
                    </span>
                  </div>
                  {i < FLOW.length - 1 && (
                    <svg width="18" height="6" viewBox="0 0 18 6" className="mx-1" aria-hidden>
                      <path
                        d="M0 3 H14 M11 1 L15 3 L11 5"
                        stroke="var(--plum)"
                        strokeOpacity="0.45"
                        strokeWidth="1.2"
                        fill="none"
                      />
                    </svg>
                  )}
                </div>
              ))}
            </div>
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
