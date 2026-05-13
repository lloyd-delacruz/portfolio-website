// frontend/src/components/casestudy/wheelchair/WcRollout.tsx
import { CheckCircle2, AlertTriangle, GitBranch, type LucideIcon } from 'lucide-react'
import { CsSection, Module } from '../bits'

type Phase = {
  num: string
  period: string
  title: string
  scope: string
  shipped: string[]
  broke: string[]
  changed: string[]
}

const PHASES: Phase[] = [
  {
    num: '00',
    period: 'Pilot · single site',
    title: 'Site A · prove the gesture',
    scope: 'One site, one workflow (return → cleaning → available), one primary role (Equipment Coordinator) on a mobile scan view. Goal: prove that one scan can replace the radio call.',
    shipped: [
      'Core scan-to-state model and append-only registry.',
      'Mobile scan surface for the Equipment Coordinator role.',
      'Single-site availability dashboard for the EQC supervisor.',
    ],
    broke: [
      'Paper handoff sheets persisted in parallel for several weeks — staff did not yet trust the new record.',
      'Basement and ambulance-bay Wi-Fi was intermittent; scans completed on-screen but never reached the registry.',
    ],
    changed: [
      'Added an on-device offline queue with deterministic retry once connectivity returned.',
      'Ran a two-week "shadow" period where paper and registry ran in parallel before formally retiring paper.',
    ],
  },
  {
    num: '01',
    period: 'Multi-site · two sites added',
    title: 'Sites B & C · separate the namespaces',
    scope: 'Two more hospitals onto the same registry, two more roles (Transport Aide, Ward Nurse) with their own surfaces. Goal: prove the data model holds when more than one site writes to it.',
    shipped: [
      'Site-scoped surfaces for Transport Aide and Ward Nurse.',
      'Site-prefixed asset identifiers across the registry.',
      'Inter-site transfer logging (manual approval only at this stage).',
    ],
    broke: [
      'Two sites had assets numbered identically before the rollout — scans resolved to the wrong record until prefixes propagated.',
      'During shift handover, the same asset was sometimes scanned twice within seconds, creating phantom state churn in the audit log.',
    ],
    changed: [
      'Migrated all asset IDs to site-prefixed format and reissued QR labels before activating writes at Site C.',
      'Added a short debounce window on scan events; duplicate scans inside the window resolve to a single transition with a marker in the audit row.',
    ],
  },
  {
    num: '02',
    period: 'Network complete · all four sites',
    title: 'Site D · par-level monitoring goes live',
    scope: 'All four sites writing to one registry, with par-level monitoring and transfer suggestions surfaced to operations. Goal: move from passive tracking to active rebalancing.',
    shipped: [
      'Par-level monitoring per unit, with site-level rollups.',
      'Automated transfer suggestions when units sustained below-par availability.',
      'Audit-trail completeness rules — every state change must be scan-sourced or a written compensating event.',
    ],
    broke: [
      'Par-level alerts fired on every short demand swing; operations staff began muting the channel.',
      'Some transfer suggestions made operational sense on paper but ignored shuttle-schedule reality, so they sat unactioned.',
    ],
    changed: [
      'Tuned variance thresholds per unit and time-of-day; alerts only fire after a sustained dip rather than a single sample.',
      'Added shuttle-schedule context to transfer suggestions so the suggested ETA reflects the next physical movement, not a theoretical best case.',
    ],
  },
  {
    num: '03',
    period: 'Operations cockpit',
    title: 'Network-wide visibility & biomedical surface',
    scope: 'Centralized operations cockpit for the Operations Lead and a dedicated service queue for Biomedical Engineering. Goal: every alert has a clear owner and a clear action.',
    shipped: [
      'Operations cockpit with site availability, par variance, and transfer approval workflow.',
      'Biomedical Engineering surface — service queue with custody history and threshold-driven inspection scheduling.',
      'Per-alert ownership and acknowledgement model.',
    ],
    broke: [
      'The first cockpit shipped as a "wall of information" — alerts were visible but the next action was not obvious, so items sat unactioned.',
      'Service tickets opened automatically by threshold sometimes duplicated tickets created manually by BME staff.',
    ],
    changed: [
      'Every alert in the cockpit now carries a one-tap action (approve / dismiss / escalate) and a named owner role.',
      'Service-ticket creation is idempotent against an open ticket for the same asset and reason; existing tickets gain a new note instead of a new row.',
    ],
  },
]

function Lane({
  Icon, label, items, tint,
}: { Icon: LucideIcon; label: string; items: string[]; tint: string }) {
  return (
    <div className="rounded-lg p-3.5" style={{ background: 'var(--cream-2)', border: '1px solid var(--line)' }}>
      <div className="flex items-center gap-1.5">
        <Icon size={12} style={{ color: tint }} strokeWidth={2} />
        <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em]" style={{ color: tint }}>
          {label}
        </p>
      </div>
      <ul className="mt-2.5 space-y-1.5">
        {items.map((t) => (
          <li key={t} className="flex gap-1.5 text-[12.5px] leading-snug text-ink-soft">
            <span className="mt-[7px] inline-block h-1 w-1 shrink-0 rounded-full" style={{ background: tint, opacity: 0.6 }} />
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function WcRollout() {
  return (
    <CsSection
      eyebrow="07 · Phased rollout"
      title="What we shipped, what broke, and what changed."
      intro="Real deployments are not big bangs — they are small bets, observed honestly, and corrected. The phases below are the actual shape of how this system grew across the network, including the parts that did not work the first time."
      footnote="Phasing is presented at a level appropriate for public discussion. Internal incident reports and operational metrics are not included."
    >
      <div className="space-y-5">
        {PHASES.map((p, i) => (
          <Module key={p.num} className="!p-0">
            {/* phase header */}
            <div
              className="flex flex-wrap items-center gap-3 px-5 py-3.5"
              style={{ background: '#fbfaf7', borderBottom: '1px solid var(--line)' }}
            >
              <div
                className="grid h-8 w-8 shrink-0 place-items-center rounded-md font-mono text-[12px] font-bold text-white"
                style={{ background: 'var(--plum)' }}
              >
                {p.num}
              </div>
              <div className="leading-tight">
                <p className="font-display text-[15px] font-bold text-ink">
                  Phase {p.num} — {p.title}
                </p>
                <p className="mt-0.5 text-[11px] text-ink-muted">{p.period}</p>
              </div>
              <span className="ml-auto inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-[0.1em] text-ink-muted ghair">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: i === PHASES.length - 1 ? 'var(--green)' : 'var(--plum)' }}
                />
                {i === PHASES.length - 1 ? 'Current' : 'Complete'}
              </span>
            </div>

            {/* scope */}
            <div className="px-5 pt-4">
              <p className="text-[13px] leading-relaxed text-ink-soft">{p.scope}</p>
            </div>

            {/* three lanes */}
            <div className="grid grid-cols-1 gap-3 p-5 lg:grid-cols-3">
              <Lane Icon={CheckCircle2}   label="Shipped"      items={p.shipped} tint="var(--green)" />
              <Lane Icon={AlertTriangle}  label="What broke"   items={p.broke}   tint="var(--amber)" />
              <Lane Icon={GitBranch}      label="What changed" items={p.changed} tint="var(--plum)" />
            </div>
          </Module>
        ))}
      </div>

      <Module className="mt-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
          Operating principle
        </p>
        <p className="mt-3 text-[13.5px] leading-relaxed text-ink-soft">
          The system shipped in pieces because trust is built in pieces. Each phase added one site or one role, the
          team watched what actually happened, and the next phase changed something concrete in response. There is no
          version of this rollout that succeeds without the &ldquo;what broke&rdquo; column being honest.
        </p>
      </Module>
    </CsSection>
  )
}
