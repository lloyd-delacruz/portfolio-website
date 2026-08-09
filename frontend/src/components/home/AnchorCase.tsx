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
  { Icon: QrCode,    label: 'QR Scan' },
  { Icon: Workflow,  label: 'RPC' },
  { Icon: Database,  label: 'State + Audit' },
  { Icon: Building2, label: 'Tenant RLS' },
  { Icon: Gauge,     label: 'Dashboards' },
]

/**
 * The canonical 11 states, read from src/constants/workflow.js in the source
 * repository, where they are documented as mirroring the database CHECK
 * constraint exactly.
 */
const WORKFLOW_STATES = [
  'Requested', 'Acknowledged', 'Searching', 'Waiting', 'On Hold', 'Assigned',
  'In Use', 'Discharged', 'Completed', 'Cleaning', 'Available',
]

const BULLETS = [
  'Live across 4 Vancouver Coastal Health sites, tracking 800+ assets',
  'An 11-state request lifecycle whose transitions are gated by role in the database',
  'Postgres row-level security isolating every tenant, enforced below the API',
  'QR scanning driving intake, assignment, and return from the floor',
]

const STATS = [
  { value: '4 sites',  label: 'live deployment' },
  { value: '800+',     label: 'assets tracked' },
  { value: '11',       label: 'workflow states' },
  { value: '243',      label: 'test files' },
]

export function AnchorCase() {
  return (
    <article className="lift mt-8 overflow-hidden rounded-2xl bg-white ghair soft-shadow">
      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr]">
        {/* left column — copy */}
        <div className="flex flex-col p-7 lg:p-9">
          <span className="inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-plum" style={{ background: 'var(--plum-soft)' }}>
            Flagship system · Live deployment
          </span>

          <div className="mt-4 flex flex-wrap items-center gap-1.5">
            <StatusPill status="production" />
            <CapabilityPill kind="case-study" />
          </div>

          <h3 className="mt-4 font-display text-2xl font-extrabold leading-[1.15] text-ink sm:text-[1.9rem]">
            Multi-Tenant Clinical Equipment Tracking
          </h3>

          <p className="mt-3 max-w-[58ch] text-[15px] leading-relaxed text-ink-soft">
            Running across 4 Vancouver Coastal Health sites, tracking 800+ wheelchairs and clinical
            assets through an 11-state lifecycle the database enforces directly — so a transition
            that skips a step, or a role that is not permitted to make it, simply cannot be written.
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
            React · Vite · Supabase · PostgreSQL · Row-Level Security · Edge Functions · QR workflows
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
          {/* request lifecycle — the canonical 11 states from the source repo */}
          <div className="rounded-2xl bg-white p-5 ghair soft-shadow-sm">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
              Request lifecycle · 11 states
            </p>
            <ol className="mt-3 flex flex-wrap gap-1">
              {WORKFLOW_STATES.map((state, i) => (
                <li
                  key={state}
                  className="rounded px-1.5 py-[3px] text-[9.5px] font-medium leading-none text-ink-soft"
                  style={{
                    background: i === WORKFLOW_STATES.length - 1 ? 'var(--plum-soft)' : 'rgba(28,22,46,0.05)',
                  }}
                >
                  {state}
                </li>
              ))}
            </ol>
          </div>

          {/* enforcement path */}
          <div className="rounded-2xl bg-white p-5 ghair soft-shadow-sm">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
              Enforcement path
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
