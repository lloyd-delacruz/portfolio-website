// frontend/src/components/casestudy/wheelchair/WcImpact.tsx
import { Boxes, Building2, ShieldCheck, ArrowRight } from 'lucide-react'
import { CsSection, Module } from '../bits'

const STATS = [
  { Icon: Boxes, value: '800+', label: 'assets under one registry', tint: 'var(--plum)', bg: 'var(--plum-soft)' },
  { Icon: Building2, value: '4 sites', label: 'one shared state model', tint: 'var(--blue)', bg: '#dbeafe' },
  { Icon: ShieldCheck, value: 'Every move', label: 'logged — full chain of custody', tint: 'var(--green)', bg: '#d1fae5' },
]

const ROWS = [
  { k: 'Locate a chair', before: 'radio call, walk the floor', after: 'scan-to-locate, any site' },
  { k: 'Asset state', before: 'paper logs, often stale', after: 'live, per-asset, with history' },
  { k: 'Maintenance', before: 'sticky notes, easy to miss', after: 'auto-flagged on state thresholds' },
  { k: 'Accountability', before: 'who had it? unclear', after: 'chain-of-custody on every scan' },
]

export function WcImpact() {
  return (
    <CsSection
      eyebrow="04 · Operational impact"
      title="Less hunting. More moving."
      intro="The point was never a dashboard. It was equipment in the right place, a clean record of every move, and a coordinator who can stop guessing."
      footnote="Operational figures are representative; the system runs in production across sites."
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {STATS.map(({ Icon, value, label, tint, bg }) => (
          <div key={label} className="rounded-2xl bg-white p-5 ghair soft-shadow-sm">
            <div className="grid h-10 w-10 place-items-center rounded-xl" style={{ background: bg }}>
              <Icon size={18} style={{ color: tint }} strokeWidth={1.9} />
            </div>
            <p className="mt-3 font-display text-2xl font-extrabold text-ink">{value}</p>
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
              className="grid grid-cols-1 items-center gap-2 py-3 sm:grid-cols-[160px_1fr_auto_1fr]"
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
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">Utilization visibility · per site · last 6 weeks</p>
          <span className="text-[11px] text-ink-muted">representative</span>
        </div>
        <div className="mt-4 flex items-end gap-3">
          {[
            { s: 'Site A', vals: [52, 58, 61, 64, 60, 66] },
            { s: 'Site B', vals: [44, 49, 47, 53, 58, 61] },
            { s: 'Site C', vals: [38, 41, 45, 44, 48, 50] },
            { s: 'Site D', vals: [55, 53, 59, 62, 60, 64] },
          ].map((g) => (
            <div key={g.s} className="flex flex-1 flex-col items-center gap-2">
              <div className="flex h-24 w-full items-end justify-center gap-1">
                {g.vals.map((v, i) => (
                  <div key={i} className="w-2 rounded-t-sm" style={{ height: `${v}%`, background: 'var(--plum)', opacity: 0.3 + (i / 5) * 0.6 }} />
                ))}
              </div>
              <span className="text-[11px] text-ink-muted">{g.s}</span>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-ink-muted">Utilization was invisible before — now it&apos;s a line on a chart, per site and per shift.</p>
      </Module>
    </CsSection>
  )
}
