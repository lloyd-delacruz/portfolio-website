// frontend/src/components/casestudy/wheelchair/WcArchitecture.tsx
import {
  QrCode, Workflow, Database, Network, ArrowRight,
  LayoutDashboard, History, Wrench, ArrowLeftRight,
  WifiOff, ShieldCheck, RefreshCw, FileLock2, CopyX, ClipboardEdit,
} from 'lucide-react'
import { CsSection, Module, Chip } from '../bits'

const SPINE = [
  { Icon: QrCode, label: 'QR Scan', sub: 'one input' },
  { Icon: Workflow, label: 'Workflow Orchestration', sub: 'resolve transition' },
  { Icon: Network, label: 'State Machine', sub: 'what’s allowed' },
  { Icon: Database, label: 'Operational Registry', sub: 'source of truth', primary: true },
]

const OUTPUTS = [
  { Icon: LayoutDashboard, label: 'Live dashboards' },
  { Icon: History, label: 'Audit trail' },
  { Icon: Wrench, label: 'Maintenance flags' },
  { Icon: ArrowLeftRight, label: 'Site transfers' },
]

const STATES: { label: string; tone: 'plum' | 'blue' | 'amber' | 'coral' | 'green' | 'neutral' }[] = [
  { label: 'In Use', tone: 'plum' },
  { label: 'Returned', tone: 'blue' },
  { label: 'Cleaning', tone: 'amber' },
  { label: 'Inspection', tone: 'amber' },
  { label: 'Maintenance', tone: 'coral' },
  { label: 'Available', tone: 'green' },
]

const LAYERS = [
  { Icon: QrCode, title: 'QR scan layer', body: 'Every asset carries a code. One scan is the only input the system needs.' },
  { Icon: Workflow, title: 'Workflow orchestration', body: 'The scan resolves to a state transition; rules decide what’s valid from here.' },
  { Icon: Database, title: 'Operational registry', body: 'One record per asset — current state, location, and full custody history.' },
  { Icon: Network, title: 'Multi-site coordination', body: 'One shared registry, role-shaped surfaces per site and for operations.' },
]

const CONSTRAINTS = [
  {
    Icon: WifiOff,
    title: 'Intermittent connectivity',
    body: 'Scans queue locally on the device when Wi-Fi or cellular drops; the registry reconciles the queued events in arrival order once the link is restored.',
  },
  {
    Icon: ShieldCheck,
    title: 'Scan validation',
    body: 'Every scan is checked against the current state machine. Invalid transitions (e.g. Cleaning → In Use without an Available step) are rejected at the edge and logged.',
  },
  {
    Icon: RefreshCw,
    title: 'State reconciliation',
    body: 'When two scans collide — a delayed offline event arriving after a newer one — the registry applies a deterministic last-writer-wins-by-timestamp rule and surfaces the conflict for review.',
  },
  {
    Icon: FileLock2,
    title: 'Audit logging',
    body: 'Every state transition writes an append-only audit row with actor, site, timestamp, and prior state. The audit log is never edited — corrections are written as new compensating events.',
  },
  {
    Icon: CopyX,
    title: 'Duplicate-scan prevention',
    body: 'Repeated scans of the same asset within a short debounce window resolve to a single transition; duplicates are recorded but do not double-count or re-fire downstream flags.',
  },
  {
    Icon: ClipboardEdit,
    title: 'Operational fallback workflow',
    body: 'When the registry is unreachable, ward staff fall back to a paper handoff sheet keyed by asset ID; coordinators reconcile entries on the next available shift without losing chain-of-custody.',
  },
]

function StageCard({ Icon, label, sub, primary }: { Icon: typeof QrCode; label: string; sub: string; primary?: boolean }) {
  return (
    <div
      className={`flex min-w-[140px] flex-1 items-center gap-3 rounded-xl p-3 ${primary ? '' : 'bg-white ghair'}`}
      style={primary ? { background: 'var(--plum-soft)', border: '1px solid rgba(109,40,217,0.25)' } : undefined}
    >
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg" style={{ background: primary ? 'rgba(109,40,217,0.14)' : 'rgba(28,22,46,0.05)' }}>
        <Icon size={17} style={{ color: 'var(--plum)' }} strokeWidth={1.9} />
      </div>
      <div className="leading-tight">
        <p className="text-[13px] font-semibold text-ink">{label}</p>
        <p className="text-[11px] text-ink-muted">{sub}</p>
      </div>
    </div>
  )
}

export function WcArchitecture() {
  return (
    <CsSection
      eyebrow="02 · Solution architecture"
      title="One scan. One source of truth."
      intro="Pick the gesture first. A scan resolves to a transition, the registry records it, and every other surface reads downstream from that one event."
    >
      <Module>
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">The spine</p>
        <div className="mt-4 flex flex-col items-stretch gap-2 lg:flex-row lg:items-center">
          {SPINE.map((s, i) => (
            <div key={s.label} className="flex flex-1 items-center gap-2">
              <StageCard {...s} />
              {i < SPINE.length - 1 && (
                <ArrowRight size={16} className="hidden shrink-0 text-ink-muted lg:block" />
              )}
            </div>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">Reads downstream</span>
          {OUTPUTS.map(({ Icon, label }) => (
            <span key={label} className="inline-flex items-center gap-1.5 rounded-full bg-[var(--cream-2)] px-3 py-1 text-xs font-medium text-ink-soft ghair">
              <Icon size={12} style={{ color: 'var(--plum)' }} />
              {label}
            </span>
          ))}
        </div>
      </Module>

      <Module className="mt-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">Equipment isn’t inventory — it’s a lifecycle</p>
        <div className="mt-4 flex flex-wrap items-center gap-x-1.5 gap-y-2">
          {STATES.map((s, i) => (
            <span key={s.label} className="flex items-center gap-1.5">
              <Chip tone={s.tone}>{s.label}</Chip>
              {i < STATES.length - 1 && <ArrowRight size={13} className="text-ink-muted" />}
            </span>
          ))}
          <span className="ml-2 flex items-center gap-1.5 text-ink-muted">
            <span className="text-xs">└→</span>
            <Chip tone="neutral">Retired</Chip>
          </span>
        </div>
        <p className="mt-3 text-xs text-ink-muted">States are how a system gets memory — and how it knows what’s overdue.</p>
      </Module>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {LAYERS.map(({ Icon, title, body }) => (
          <div key={title} className="rounded-2xl bg-white p-5 ghair soft-shadow-sm">
            <div className="grid h-10 w-10 place-items-center rounded-xl" style={{ background: 'var(--plum-soft)' }}>
              <Icon size={18} style={{ color: 'var(--plum)' }} strokeWidth={1.9} />
            </div>
            <h3 className="mt-3 font-display text-[15px] font-bold text-ink">{title}</h3>
            <p className="mt-1.5 text-[13px] leading-relaxed text-ink-soft">{body}</p>
          </div>
        ))}
      </div>

      <Module className="mt-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
            Reliability &amp; constraints · how the system behaves when things go wrong
          </p>
          <span className="text-[11px] text-ink-muted">production guarantees</span>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CONSTRAINTS.map(({ Icon, title, body }) => (
            <div
              key={title}
              className="rounded-xl p-4"
              style={{ background: 'var(--cream-2)', border: '1px solid var(--line)' }}
            >
              <div className="flex items-center gap-2">
                <div className="grid h-7 w-7 place-items-center rounded-md bg-white ghair">
                  <Icon size={14} style={{ color: 'var(--ink-soft)' }} strokeWidth={1.9} />
                </div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-ink">{title}</p>
              </div>
              <p className="mt-2.5 text-[12.5px] leading-relaxed text-ink-soft">{body}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-ink-muted">
          These behaviours are not edge cases — they are the daily reality of running an asset registry across four
          sites with mixed network conditions and shift-based staff turnover.
        </p>
      </Module>
    </CsSection>
  )
}
