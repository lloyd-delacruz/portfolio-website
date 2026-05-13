// frontend/src/components/casestudy/equitrackr/EtImpact.tsx
import { Boxes, Building2, ShieldCheck, ArrowRight, TrendingDown, TrendingUp, Activity } from 'lucide-react'
import { CsSection, Module } from '../bits'

const STATS = [
  { Icon: Boxes, value: '6 asset classes', label: 'one shared registry & state model', tint: 'var(--plum)', bg: 'var(--plum-soft)' },
  { Icon: Building2, value: 'Multi-department', label: 'by design — roles, boards, queues', tint: 'var(--blue)', bg: '#dbeafe' },
  { Icon: ShieldCheck, value: 'Every change', label: 'logged — owner, location, history', tint: 'var(--green)', bg: '#d1fae5' },
]

const ROWS = [
  { k: 'Find an asset', before: 'call around, walk the units', after: 'filter by class, state, location' },
  { k: 'Equipment requests', before: 'phone call + sticky note', after: 'a queue with assignment + ETA' },
  { k: 'Cleaning', before: 'ad hoc, untracked', after: 'queued on return, confirmed by EVS' },
  { k: 'Maintenance', before: 'discovered when it fails', after: 'flagged by usage + state thresholds' },
  { k: 'Accountability', before: 'who has it? unclear', after: 'owner + full history per asset' },
]

const CHARTS = [
  { Icon: TrendingDown, label: 'Time to locate an asset', vals: [88, 76, 70, 58, 49, 41], color: 'var(--green)', good: 'down' },
  { Icon: TrendingUp, label: 'Requests fulfilled / day', vals: [34, 41, 46, 52, 58, 63], color: 'var(--plum)', good: 'up' },
  { Icon: Activity, label: 'Fleet utilization', vals: [44, 48, 51, 55, 58, 61], color: 'var(--blue)', good: 'up' },
]

export function EtImpact() {
  return (
    <CsSection
      eyebrow="05 · Impact & operational benefits"
      title="Find it faster. Coordinate it cleaner."
      intro="EquiTrackr is built around the outcomes that matter on the floor: less time hunting, requests that don’t fall through, and a clean record of every move."
      footnote="EquiTrackr is a product build; the figures here are design targets and illustrative trends, not production measurements."
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {STATS.map(({ Icon, value, label, tint, bg }) => (
          <div key={label} className="rounded-2xl bg-white p-5 ghair soft-shadow-sm">
            <div className="grid h-10 w-10 place-items-center rounded-xl" style={{ background: bg }}>
              <Icon size={18} style={{ color: tint }} strokeWidth={1.9} />
            </div>
            <p className="mt-3 font-display text-xl font-extrabold text-ink">{value}</p>
            <p className="text-sm text-ink-muted">{label}</p>
          </div>
        ))}
      </div>

      <Module className="mt-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">Before → after</p>
        <div className="mt-4">
          {ROWS.map((r, i) => (
            <div
              key={r.k}
              className="grid grid-cols-1 items-center gap-2 py-3 sm:grid-cols-[170px_1fr_auto_1fr]"
              style={i > 0 ? { borderTop: '1px solid var(--line)' } : undefined}
            >
              <p className="text-[13px] font-semibold text-ink">{r.k}</p>
              <p className="text-[13px] text-ink-muted line-through decoration-[rgba(28,22,46,0.25)]">{r.before}</p>
              <ArrowRight size={15} className="hidden text-ink-muted sm:block" />
              <p className="text-[13px] font-medium" style={{ color: 'var(--plum)' }}>{r.after}</p>
            </div>
          ))}
        </div>
      </Module>

      <Module className="mt-6">
        <div className="flex items-baseline justify-between">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">Operational observability · the surfaces that come for free</p>
          <span className="text-[11px] text-ink-muted">illustrative</span>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {CHARTS.map(({ Icon, label, vals, color }) => (
            <div key={label} className="rounded-xl bg-[var(--cream-2)] p-4 ghair">
              <p className="flex items-center gap-1.5 text-[12px] font-medium text-ink">
                <Icon size={13} style={{ color }} /> {label}
              </p>
              <div className="mt-3 flex h-16 items-end gap-1.5">
                {vals.map((v, i) => (
                  <div key={i} className="flex-1 rounded-t-sm" style={{ height: `${v}%`, background: color, opacity: 0.3 + (i / 5) * 0.6 }} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Module>
    </CsSection>
  )
}
