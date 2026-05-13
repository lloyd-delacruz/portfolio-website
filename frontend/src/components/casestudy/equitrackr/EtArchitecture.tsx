// frontend/src/components/casestudy/equitrackr/EtArchitecture.tsx
import {
  QrCode, ArrowLeftRight, Network, Database, ArrowRight,
  LayoutDashboard, Inbox, SprayCan, Wrench, History,
  UserRound, Truck, ClipboardList,
} from 'lucide-react'
import { CsSection, Module, Chip } from '../bits'

const SPINE = [
  { Icon: QrCode, label: 'Scan layer', sub: 'QR + barcode' },
  { Icon: ArrowLeftRight, label: 'Check-in / check-out', sub: 'who, where, when' },
  { Icon: Network, label: 'Lifecycle engine', sub: 'valid transitions' },
  { Icon: Database, label: 'Operational registry', sub: 'source of truth', primary: true },
]

const OUTPUTS = [
  { Icon: LayoutDashboard, label: 'Department boards' },
  { Icon: Inbox, label: 'Request queue' },
  { Icon: SprayCan, label: 'Cleaning workflow' },
  { Icon: Wrench, label: 'Maintenance' },
  { Icon: History, label: 'Audit trail' },
]

const ROLES = [
  { Icon: UserRound, label: 'Frontline staff', sub: 'request & scan' },
  { Icon: Truck, label: 'Transport', sub: 'move & hand off' },
  { Icon: SprayCan, label: 'EVS / cleaning', sub: 'clean & confirm' },
  { Icon: Wrench, label: 'Biomed', sub: 'service & sign off' },
  { Icon: ClipboardList, label: 'Coordinators', sub: 'oversee the pool' },
]

const EQUIPMENT: { label: string; tone: 'plum' | 'blue' | 'amber' | 'green' | 'coral' | 'neutral' }[] = [
  { label: 'Wheelchairs', tone: 'plum' },
  { label: 'Stretchers', tone: 'blue' },
  { label: 'Patient lifts', tone: 'amber' },
  { label: 'Infusion pumps', tone: 'green' },
  { label: 'Beds', tone: 'coral' },
  { label: 'Rehab equipment', tone: 'neutral' },
]

const LAYERS = [
  { Icon: QrCode, title: 'Scan layer', body: 'Every asset carries a code; a scan is the only input the workflow needs.' },
  { Icon: Network, title: 'Lifecycle engine', body: 'Each scan resolves to a valid transition — the rules live here, not in people’s heads.' },
  { Icon: Database, title: 'Operational registry', body: 'One record per asset: class, state, location, owner, and full history.' },
  { Icon: LayoutDashboard, title: 'Multi-role surfaces', body: 'Boards and queues shaped to each role — frontline, transport, EVS, biomed, coordinators.' },
]

function StageCard({ Icon, label, sub, primary }: { Icon: typeof QrCode; label: string; sub: string; primary?: boolean }) {
  return (
    <div
      className={`flex min-w-[150px] flex-1 items-center gap-3 rounded-xl p-3 ${primary ? '' : 'bg-white ghair'}`}
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

export function EtArchitecture() {
  return (
    <CsSection
      eyebrow="02 · Workflow architecture"
      title="Every asset, every state, one registry."
      intro="A scan resolves to a transition; the lifecycle engine decides what’s valid; the registry records it. Boards, queues, and workflows all read downstream from there."
    >
      <Module>
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">The spine</p>
        <div className="mt-4 flex flex-col items-stretch gap-2 lg:flex-row lg:items-center">
          {SPINE.map((s, i) => (
            <div key={s.label} className="flex flex-1 items-center gap-2">
              <StageCard {...s} />
              {i < SPINE.length - 1 && <ArrowRight size={16} className="hidden shrink-0 text-ink-muted lg:block" />}
            </div>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">Reads downstream</span>
          {OUTPUTS.map(({ Icon, label }) => (
            <span key={label} className="inline-flex items-center gap-1.5 rounded-full bg-[var(--cream-2)] px-3 py-1 text-xs font-medium text-ink-soft ghair">
              <Icon size={12} style={{ color: 'var(--plum)' }} />
              {label}
            </span>
          ))}
        </div>
      </Module>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Module>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">One pool, many roles</p>
          <div className="mt-4 space-y-2">
            {ROLES.map(({ Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-3 rounded-lg bg-[var(--cream-2)] p-2.5 ghair">
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white ghair">
                  <Icon size={15} style={{ color: 'var(--plum)' }} strokeWidth={1.9} />
                </div>
                <span className="text-[13px] font-semibold text-ink">{label}</span>
                <span className="ml-auto text-[11px] text-ink-muted">{sub}</span>
              </div>
            ))}
          </div>
        </Module>

        <Module>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">Built for mobile clinical assets</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {EQUIPMENT.map((e) => (
              <Chip key={e.label} tone={e.tone}>{e.label}</Chip>
            ))}
          </div>
          <p className="mt-4 text-[13px] leading-relaxed text-ink-soft">
            Same scan, same states, same registry — whether it’s a wheelchair or an infusion pump.
            New asset classes are configuration, not a rebuild.
          </p>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {['QR ↔ barcode', 'role-based views', 'configurable states'].map((t) => (
              <span key={t} className="rounded-lg bg-[var(--cream-2)] px-2 py-2 text-center text-[11px] font-medium text-ink-soft ghair">{t}</span>
            ))}
          </div>
        </Module>
      </div>

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
    </CsSection>
  )
}
