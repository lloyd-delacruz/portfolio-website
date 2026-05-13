// frontend/src/components/casestudy/wheelchair/WcDashboards.tsx
import {
  Building2, Search, SlidersHorizontal, Bell, ChevronRight, Accessibility,
  Wrench, ArrowLeftRight, AlertTriangle, Check, Clock, FileText, MapPin,
  type LucideIcon,
} from 'lucide-react'
import { CsSection } from '../bits'

/* -------------------------------------------------------------------------- */
/*  Shared chrome                                                              */
/* -------------------------------------------------------------------------- */

function PanelChrome({
  crumbs,
  filters,
  rightMeta,
  children,
}: {
  crumbs: string[]
  filters?: string[]
  rightMeta?: string
  children: React.ReactNode
}) {
  return (
    <div
      className="overflow-hidden rounded-xl"
      style={{ background: 'white', border: '1px solid var(--line)' }}
    >
      {/* title bar */}
      <div
        className="flex items-center gap-3 px-4 py-2.5"
        style={{ background: 'var(--cream-2)', borderBottom: '1px solid var(--line)' }}
      >
        <Building2 size={13} className="text-ink-muted" />
        <nav className="flex items-center gap-1.5 text-[11px] text-ink-muted">
          {crumbs.map((c, i) => (
            <span key={c} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight size={11} className="opacity-60" />}
              <span className={i === crumbs.length - 1 ? 'font-semibold text-ink' : ''}>{c}</span>
            </span>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          {rightMeta && <span className="hidden text-[11px] text-ink-muted sm:inline">{rightMeta}</span>}
          <span className="inline-flex h-1.5 w-1.5 rounded-full" style={{ background: 'var(--green)' }} />
          <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-muted">Live</span>
        </div>
      </div>

      {/* filter bar */}
      {filters && (
        <div
          className="flex flex-wrap items-center gap-2 px-4 py-2"
          style={{ borderBottom: '1px solid var(--line)' }}
        >
          <div
            className="flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] text-ink-muted"
            style={{ background: 'var(--cream-2)', border: '1px solid var(--line)' }}
          >
            <Search size={11} />
            <span>Search asset ID, site, state…</span>
          </div>
          <div
            className="flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] text-ink-soft"
            style={{ background: 'var(--cream-2)', border: '1px solid var(--line)' }}
          >
            <SlidersHorizontal size={11} />
            <span>Filters</span>
          </div>
          {filters.map((f) => (
            <span
              key={f}
              className="rounded-md px-2 py-1 text-[11px] font-medium text-ink-soft"
              style={{ background: 'var(--cream-2)', border: '1px solid var(--line)' }}
            >
              {f}
            </span>
          ))}
        </div>
      )}

      {children}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Status pill — muted, dot-led                                              */
/* -------------------------------------------------------------------------- */

type Tone = 'available' | 'inuse' | 'returned' | 'cleaning' | 'inspection' | 'maintenance' | 'overdue' | 'critical'

const TONE: Record<Tone, { label: string; dot: string; bg: string; fg: string }> = {
  available:   { label: 'Available',   dot: 'var(--green)',  bg: 'rgba(16,185,129,0.10)', fg: '#0f7a55' },
  inuse:       { label: 'In Use',      dot: 'var(--blue)',   bg: 'rgba(59,130,246,0.10)', fg: '#1d4ed8' },
  returned:    { label: 'Returned',    dot: '#94a3b8',       bg: 'rgba(148,163,184,0.14)', fg: '#475569' },
  cleaning:    { label: 'Cleaning',    dot: 'var(--amber)',  bg: 'rgba(245,158,11,0.10)', fg: '#a16207' },
  inspection:  { label: 'Inspection',  dot: 'var(--amber)',  bg: 'rgba(245,158,11,0.10)', fg: '#a16207' },
  maintenance: { label: 'Maintenance', dot: 'var(--coral)',  bg: 'rgba(248,112,96,0.12)', fg: '#b1372c' },
  overdue:     { label: 'Overdue',     dot: 'var(--amber)',  bg: 'rgba(245,158,11,0.16)', fg: '#92400e' },
  critical:    { label: 'Critical',    dot: 'var(--coral)',  bg: 'rgba(248,112,96,0.16)', fg: '#9b2c1e' },
}

function StatusTag({ tone, override }: { tone: Tone; override?: string }) {
  const t = TONE[tone]
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded px-1.5 py-0.5 text-[10.5px] font-semibold"
      style={{ background: t.bg, color: t.fg }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: t.dot }} />
      {override ?? t.label}
    </span>
  )
}

/* -------------------------------------------------------------------------- */
/*  1. Site availability board                                                 */
/* -------------------------------------------------------------------------- */

type SiteRow = {
  site: string
  unit: string
  par: number
  available: number
  inuse: number
  cleaning: number
  maintenance: number
  alert?: { tone: Tone; text: string }
}

const SITE_ROWS: SiteRow[] = [
  { site: 'Site A', unit: 'ER',        par: 32, available: 11, inuse: 14, cleaning: 4, maintenance: 3 },
  { site: 'Site A', unit: 'Imaging',   par: 18, available: 7,  inuse: 9,  cleaning: 2, maintenance: 0 },
  { site: 'Site B', unit: 'ER',        par: 28, available: 4,  inuse: 18, cleaning: 5, maintenance: 1, alert: { tone: 'overdue',  text: '−7 below par · 14 min' } },
  { site: 'Site B', unit: 'Med-Surg',  par: 36, available: 12, inuse: 19, cleaning: 4, maintenance: 1 },
  { site: 'Site C', unit: 'ER',        par: 24, available: 8,  inuse: 12, cleaning: 3, maintenance: 1 },
  { site: 'Site C', unit: 'Discharge', par: 14, available: 2,  inuse: 9,  cleaning: 2, maintenance: 1, alert: { tone: 'critical', text: '−4 below par · 22 min' } },
  { site: 'Site D', unit: 'ER',        par: 30, available: 14, inuse: 12, cleaning: 3, maintenance: 1 },
  { site: 'Site D', unit: 'Med-Surg',  par: 34, available: 18, inuse: 13, cleaning: 2, maintenance: 1 },
]

function SiteBoard() {
  return (
    <PanelChrome
      crumbs={['Operations', 'Network availability', 'All sites']}
      filters={['Last 24h', 'Sites: All', 'Units: ER, Imaging, Med-Surg, Discharge']}
      rightMeta="Refreshed 13:42 · auto-poll 30s"
    >
      {/* table */}
      <div className="overflow-x-auto">
        <table className="w-full text-[12px]">
          <thead>
            <tr
              className="text-left text-[10.5px] font-semibold uppercase tracking-[0.08em] text-ink-muted"
              style={{ background: '#fbfaf7', borderBottom: '1px solid var(--line)' }}
            >
              <th className="px-4 py-2 font-semibold">Site</th>
              <th className="px-2 py-2 font-semibold">Unit</th>
              <th className="px-2 py-2 text-right font-semibold">Par</th>
              <th className="px-2 py-2 text-right font-semibold">Avail.</th>
              <th className="px-2 py-2 text-right font-semibold">In use</th>
              <th className="px-2 py-2 text-right font-semibold">Cleaning</th>
              <th className="px-2 py-2 text-right font-semibold">Maint.</th>
              <th className="px-3 py-2 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {SITE_ROWS.map((r, i) => {
              const variance = r.available - Math.round(r.par * 0.35)
              return (
                <tr
                  key={`${r.site}-${r.unit}`}
                  className="hover:bg-[var(--cream-2)]"
                  style={i < SITE_ROWS.length - 1 ? { borderBottom: '1px solid var(--line)' } : undefined}
                >
                  <td className="px-4 py-2 font-medium text-ink">{r.site}</td>
                  <td className="px-2 py-2 text-ink-soft">{r.unit}</td>
                  <td className="px-2 py-2 text-right font-mono text-ink">{r.par}</td>
                  <td className="px-2 py-2 text-right">
                    <span className="font-mono font-semibold" style={{ color: variance < 0 ? 'var(--coral)' : 'var(--ink)' }}>
                      {r.available}
                    </span>
                  </td>
                  <td className="px-2 py-2 text-right font-mono text-ink-soft">{r.inuse}</td>
                  <td className="px-2 py-2 text-right font-mono text-ink-soft">{r.cleaning}</td>
                  <td className="px-2 py-2 text-right font-mono text-ink-soft">{r.maintenance}</td>
                  <td className="px-3 py-2">
                    {r.alert ? (
                      <StatusTag tone={r.alert.tone} override={r.alert.text} />
                    ) : (
                      <StatusTag tone="available" override="Within par" />
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* footer summary */}
      <div
        className="flex flex-wrap items-center justify-between gap-2 px-4 py-2 text-[11px] text-ink-muted"
        style={{ background: '#fbfaf7', borderTop: '1px solid var(--line)' }}
      >
        <span>8 units across 4 sites · 2 below par</span>
        <span className="inline-flex items-center gap-2">
          <Bell size={11} />
          <span>2 active alerts</span>
          <span aria-hidden>·</span>
          <span>Next escalation in 6 min</span>
        </span>
      </div>
    </PanelChrome>
  )
}

/* -------------------------------------------------------------------------- */
/*  2. Asset detail with custody history                                       */
/* -------------------------------------------------------------------------- */

type Event = {
  time: string
  date?: string
  actor: string
  action: string
  from: Tone
  to: Tone
  note?: string
}

const HISTORY: Event[] = [
  { time: '14:02', actor: 'EQC · Site B',  action: 'Scan · Returned',     from: 'inuse',       to: 'returned',  note: 'Returned from ER · floor 3' },
  { time: '13:40', actor: 'TPT · 04127',   action: 'Scan · In Use',       from: 'available',   to: 'inuse',     note: 'Dispatch · ER → Imaging' },
  { time: '13:18', actor: 'EQC · Site B',  action: 'Cycle complete',      from: 'cleaning',    to: 'available', note: 'Cycle 8 / 10 to inspection' },
  { time: '12:55', actor: 'EQC · Site B',  action: 'Scan · Cleaning',     from: 'returned',    to: 'cleaning' },
  { time: '12:34', actor: 'TPT · 04088',   action: 'Scan · Returned',     from: 'inuse',       to: 'returned',  note: 'Returned from Med-Surg' },
  { time: '11:02', date: 'Tue 12 May',     actor: 'BME · Site B',         action: 'Inspection passed', from: 'inspection', to: 'available', note: 'Annual safety check' },
  { time: '09:45', date: 'Tue 12 May',     actor: 'BME · Site B',         action: 'Maintenance out', from: 'maintenance', to: 'inspection', note: 'Brake pad replaced · ticket #BME-3128' },
]

function AssetDetail() {
  return (
    <PanelChrome
      crumbs={['Operations', 'Assets', 'WC-2207']}
      rightMeta="Asset ID: WC-2207 · Tag: 04F2-8B91"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1.4fr]">
        {/* left — summary */}
        <div className="p-5" style={{ borderRight: '1px solid var(--line)' }}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-ink-muted">
                Wheelchair · Adult standard
              </p>
              <p className="mt-1 font-display text-xl font-extrabold text-ink">WC-2207</p>
              <p className="mt-0.5 inline-flex items-center gap-1 text-[11.5px] text-ink-soft">
                <MapPin size={11} /> Site B · ER · floor 3 · bay 04
              </p>
            </div>
            <StatusTag tone="returned" />
          </div>

          <dl className="mt-4 divide-y" style={{ borderColor: 'var(--line)' }}>
            {[
              { k: 'Acquired',              v: '14 Mar 2023' },
              { k: 'Cycles since clean',    v: '0' },
              { k: 'Cycles this week',      v: '23' },
              { k: 'Last inspection',       v: 'Tue 12 May · passed' },
              { k: 'Next inspection due',   v: 'Wed 12 Aug · 91d' },
              { k: 'Open service tickets',  v: 'None' },
              { k: 'Custody (current)',     v: 'EQC · Site B' },
            ].map((row) => (
              <div key={row.k} className="flex items-center justify-between py-1.5">
                <dt className="text-[11.5px] text-ink-muted">{row.k}</dt>
                <dd className="font-mono text-[11.5px] text-ink">{row.v}</dd>
              </div>
            ))}
          </dl>

          <div
            className="mt-4 flex items-start gap-2 rounded-md p-3"
            style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.25)' }}
          >
            <AlertTriangle size={13} style={{ color: 'var(--amber)' }} className="mt-0.5 shrink-0" />
            <div>
              <p className="text-[11.5px] font-semibold" style={{ color: '#92400e' }}>
                Cleaning threshold approaching
              </p>
              <p className="mt-0.5 text-[11px] text-ink-muted">
                Will auto-flag at cycle 10 (current: 8). Coordinator can pull early or wait for the next return.
              </p>
            </div>
          </div>
        </div>

        {/* right — custody timeline */}
        <div className="p-5">
          <div className="flex items-center justify-between">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-ink-muted">
              Custody history · scan-sourced · append-only
            </p>
            <span className="inline-flex items-center gap-1.5 text-[10.5px] text-ink-muted">
              <FileText size={11} /> 7 events shown · full log in audit
            </span>
          </div>

          <ol className="mt-4 space-y-2.5">
            {HISTORY.map((e, i) => (
              <li
                key={i}
                className="grid grid-cols-[64px_1fr] gap-3 rounded-md p-2.5"
                style={{ background: i % 2 === 0 ? 'transparent' : '#fbfaf7' }}
              >
                <div className="font-mono text-[10.5px] leading-tight text-ink-muted">
                  <div className="font-semibold text-ink-soft">{e.time}</div>
                  {e.date && <div className="text-[10px]">{e.date}</div>}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[11.5px] font-semibold text-ink">{e.action}</span>
                    <span className="text-[10.5px] text-ink-muted">·</span>
                    <span className="text-[10.5px] text-ink-muted">{e.actor}</span>
                  </div>
                  <div className="mt-1 flex items-center gap-1.5">
                    <StatusTag tone={e.from} />
                    <ChevronRight size={11} className="text-ink-muted" />
                    <StatusTag tone={e.to} />
                  </div>
                  {e.note && <p className="mt-1 text-[11px] text-ink-muted">{e.note}</p>}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </PanelChrome>
  )
}

/* -------------------------------------------------------------------------- */
/*  3. Maintenance queue + transfer suggestions                                */
/* -------------------------------------------------------------------------- */

type QueueItem = {
  id: string
  asset: string
  reason: string
  site: string
  age: string
  tone: Tone
  Icon: LucideIcon
  action: string
}

const QUEUE: QueueItem[] = [
  { id: 'Q-04891', asset: 'WC-1812', reason: 'Cycle 10 · cleaning flag',          site: 'Site A · EQC',  age: '6 min',  tone: 'overdue',     Icon: Wrench,         action: 'Pull for cleaning' },
  { id: 'Q-04890', asset: 'WC-3044', reason: 'Cycle 11 · cleaning flag',          site: 'Site A · EQC',  age: '14 min', tone: 'overdue',     Icon: Wrench,         action: 'Pull for cleaning' },
  { id: 'Q-04889', asset: 'WC-2199', reason: 'Inspection due in 3d',              site: 'Site B · BME',  age: '1 h',    tone: 'inspection',  Icon: Wrench,         action: 'Schedule inspection' },
  { id: 'Q-04887', asset: 'WC-0907', reason: 'Brake anomaly · 2 sensor events',   site: 'Site C · BME',  age: '38 min', tone: 'maintenance', Icon: AlertTriangle,  action: 'Open service ticket' },
  { id: 'Q-04886', asset: 'WC-2671', reason: 'Returned · awaiting cycle',         site: 'Site D · EQC',  age: '9 min',  tone: 'returned',    Icon: Check,          action: 'Confirm cleaning start' },
]

type Transfer = {
  from: string
  to: string
  qty: number
  reason: string
  eta: string
  tone: Tone
}

const TRANSFERS: Transfer[] = [
  { from: 'Site D · Med-Surg', to: 'Site C · Discharge', qty: 4, reason: '−4 below par · 22 min',  eta: '~18 min via shuttle 2', tone: 'critical' },
  { from: 'Site A · Imaging',  to: 'Site B · ER',         qty: 3, reason: '−7 below par · 14 min',  eta: '~12 min via shuttle 1', tone: 'overdue' },
  { from: 'Site D · ER',       to: 'Site C · ER',         qty: 2, reason: 'Pre-shift balancing',     eta: 'Next shuttle 14:30',     tone: 'inuse' },
]

function ServiceQueue() {
  return (
    <PanelChrome
      crumbs={['Operations', 'Service queue', 'Open items']}
      filters={['Priority: high', 'Owner: any', 'Site: all']}
      rightMeta="5 open · 2 SLA breaching"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr]">
        {/* left — queue */}
        <div style={{ borderRight: '1px solid var(--line)' }}>
          <div
            className="grid grid-cols-[80px_1fr_auto] gap-3 px-4 py-2 text-[10.5px] font-semibold uppercase tracking-[0.08em] text-ink-muted"
            style={{ background: '#fbfaf7', borderBottom: '1px solid var(--line)' }}
          >
            <span>Ticket</span>
            <span>Issue · owner</span>
            <span>Action</span>
          </div>
          {QUEUE.map((q, i) => (
            <div
              key={q.id}
              className="grid grid-cols-[80px_1fr_auto] gap-3 px-4 py-3 text-[12px]"
              style={i < QUEUE.length - 1 ? { borderBottom: '1px solid var(--line)' } : undefined}
            >
              <div className="font-mono text-[11px] text-ink-muted">
                <div className="font-semibold text-ink-soft">{q.id}</div>
                <div className="inline-flex items-center gap-1 text-[10.5px]"><Clock size={10} /> {q.age}</div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <q.Icon size={12} style={{ color: TONE[q.tone].dot }} />
                  <span className="font-semibold text-ink">{q.asset}</span>
                  <span className="text-ink-muted">·</span>
                  <StatusTag tone={q.tone} />
                </div>
                <p className="mt-1 text-[11.5px] text-ink-soft">{q.reason}</p>
                <p className="mt-0.5 text-[10.5px] text-ink-muted">{q.site}</p>
              </div>
              <div className="flex items-center">
                <button
                  className="rounded-md px-2.5 py-1 text-[10.5px] font-semibold text-ink-soft"
                  style={{ background: 'var(--cream-2)', border: '1px solid var(--line)' }}
                >
                  {q.action}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* right — transfer suggestions */}
        <div>
          <div
            className="flex items-center justify-between px-4 py-2 text-[10.5px] font-semibold uppercase tracking-[0.08em] text-ink-muted"
            style={{ background: '#fbfaf7', borderBottom: '1px solid var(--line)' }}
          >
            <span>Transfer suggestions</span>
            <span className="inline-flex items-center gap-1.5 text-[10px] normal-case tracking-normal">
              <ArrowLeftRight size={11} />
              par-level driven
            </span>
          </div>

          {TRANSFERS.map((t, i) => (
            <div
              key={`${t.from}-${t.to}`}
              className="px-4 py-3 text-[12px]"
              style={i < TRANSFERS.length - 1 ? { borderBottom: '1px solid var(--line)' } : undefined}
            >
              <div className="flex items-center justify-between gap-2">
                <StatusTag tone={t.tone} override={t.reason} />
                <span className="font-mono text-[10.5px] text-ink-muted">×{t.qty}</span>
              </div>
              <div className="mt-2 flex items-center gap-1.5 text-[11.5px] text-ink">
                <span className="font-semibold">{t.from}</span>
                <ChevronRight size={12} className="text-ink-muted" />
                <span className="font-semibold" style={{ color: 'var(--plum)' }}>{t.to}</span>
              </div>
              <div className="mt-1 flex items-center justify-between text-[10.5px] text-ink-muted">
                <span className="inline-flex items-center gap-1"><Clock size={10} /> {t.eta}</span>
                <span className="inline-flex items-center gap-1.5">
                  <button
                    className="rounded-md px-2 py-0.5 text-[10px] font-semibold text-ink-soft"
                    style={{ background: 'var(--cream-2)', border: '1px solid var(--line)' }}
                  >
                    Dismiss
                  </button>
                  <button
                    className="rounded-md px-2 py-0.5 text-[10px] font-semibold text-white"
                    style={{ background: 'var(--plum)' }}
                  >
                    Approve
                  </button>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PanelChrome>
  )
}

/* -------------------------------------------------------------------------- */
/*  Section                                                                    */
/* -------------------------------------------------------------------------- */

export function WcDashboards() {
  return (
    <CsSection
      eyebrow="05 · Operational surfaces"
      title="What operations actually sees."
      intro="Three of the working surfaces that read from the registry. Designed for shift speed and alert response — not for screenshots — so they are dense, status-led, and quiet about anything that is fine."
      footnote="Surfaces shown are representative renderings of the production console. Asset IDs, ticket numbers, and timestamps are illustrative."
    >
      <div className="space-y-5">
        <div>
          <div className="mb-2 flex items-baseline gap-2">
            <Accessibility size={12} className="text-ink-muted" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-muted">
              Site availability board · operations cockpit
            </p>
          </div>
          <SiteBoard />
        </div>

        <div>
          <div className="mb-2 flex items-baseline gap-2">
            <FileText size={12} className="text-ink-muted" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-muted">
              Asset detail · WC-2207 · full custody history
            </p>
          </div>
          <AssetDetail />
        </div>

        <div>
          <div className="mb-2 flex items-baseline gap-2">
            <Wrench size={12} className="text-ink-muted" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-muted">
              Service queue · open tickets &amp; transfer suggestions
            </p>
          </div>
          <ServiceQueue />
        </div>
      </div>
    </CsSection>
  )
}
