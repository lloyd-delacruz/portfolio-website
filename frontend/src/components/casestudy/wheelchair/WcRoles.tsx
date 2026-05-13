// frontend/src/components/casestudy/wheelchair/WcRoles.tsx
import {
  Truck, ClipboardList, HeartPulse, PackageSearch, LayoutDashboard, Wrench,
  type LucideIcon,
} from 'lucide-react'
import { CsSection, Module } from '../bits'

type Role = {
  Icon: LucideIcon
  title: string
  scope: string
  scans: string[]
  surface: string
  decision: string
}

const ROLES: Role[] = [
  {
    Icon: Truck,
    title: 'Transport Aide',
    scope: 'Patient transport across units and between sites',
    scans: ['Dispatch', 'Arrival', 'Return'],
    surface: 'Mobile scan view — one tap per leg of the trip',
    decision: 'Knows which chair to take next and where the closest available one is staged.',
  },
  {
    Icon: ClipboardList,
    title: 'Unit Clerk',
    scope: 'Coordinates equipment requests and unit-level availability',
    scans: ['Request', 'Receive', 'Release'],
    surface: 'Unit board — current par, inbound transfers, pending requests',
    decision: 'Stops chasing equipment by phone — sees what is on the way and what is overdue.',
  },
  {
    Icon: HeartPulse,
    title: 'Ward Nurse',
    scope: 'Patient-side equipment use during care',
    scans: ['Assign to patient', 'Release at discharge'],
    surface: 'Bedside scan — single action tied to the patient encounter',
    decision: 'Hands off equipment cleanly at end of shift with no paper handoff sheet.',
  },
  {
    Icon: PackageSearch,
    title: 'Equipment Coordinator',
    scope: 'Per-site cleaning, inspection, and lifecycle flow',
    scans: ['Returned', 'Cleaning', 'Inspection', 'Available'],
    surface: 'Site board — queue by state, age-in-state, threshold flags',
    decision: 'Works the queue in priority order rather than rediscovering it each shift.',
  },
  {
    Icon: LayoutDashboard,
    title: 'Operations Lead',
    scope: 'Network-wide utilization and inter-site coordination',
    scans: ['Audit only — no manual scans'],
    surface: 'Operations cockpit — site availability, par variance, transfer suggestions',
    decision: 'Approves cross-site transfers before a shortage becomes a delayed discharge.',
  },
  {
    Icon: Wrench,
    title: 'Biomedical Engineering',
    scope: 'Preventive maintenance and asset retirement',
    scans: ['Maintenance in', 'Maintenance out', 'Retired'],
    surface: 'Service queue — assets flagged by threshold or anomaly, with full custody history',
    decision: 'Plans the day from a flagged queue, not a clipboard walkthrough.',
  },
]

export function WcRoles() {
  return (
    <CsSection
      eyebrow={<>03 · Roles &amp; responsibilities</>}
      title="Six roles, one shared record."
      intro="Each role uses the system through a surface shaped to the work they do — and writes back to the same registry. Coordination is a side-effect of doing the job, not a separate task."
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ROLES.map(({ Icon, title, scope, scans, surface, decision }) => (
          <div key={title} className="flex flex-col rounded-2xl bg-white p-5 ghair soft-shadow-sm">
            <div className="flex items-center gap-2.5">
              <div className="grid h-9 w-9 place-items-center rounded-lg" style={{ background: 'var(--cream-2)', border: '1px solid var(--line)' }}>
                <Icon size={16} style={{ color: 'var(--ink-soft)' }} strokeWidth={1.9} />
              </div>
              <div className="leading-tight">
                <p className="font-display text-[15px] font-bold text-ink">{title}</p>
                <p className="text-[11px] text-ink-muted">{scope}</p>
              </div>
            </div>

            <dl className="mt-4 space-y-3 border-t pt-3 ghair-t">
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-muted">Scans</dt>
                <dd className="mt-1.5 flex flex-wrap gap-1">
                  {scans.map((s) => (
                    <span
                      key={s}
                      className="inline-flex items-center rounded-md px-1.5 py-0.5 text-[10.5px] font-medium text-ink-soft"
                      style={{ background: 'var(--cream-2)', border: '1px solid var(--line)' }}
                    >
                      {s}
                    </span>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-muted">Surface</dt>
                <dd className="mt-1 text-[12.5px] leading-snug text-ink-soft">{surface}</dd>
              </div>
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-muted">Decision it enables</dt>
                <dd className="mt-1 text-[12.5px] leading-snug text-ink">{decision}</dd>
              </div>
            </dl>
          </div>
        ))}
      </div>

      <Module className="mt-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
          Why surfaces, not screens
        </p>
        <p className="mt-3 text-[13.5px] leading-relaxed text-ink-soft">
          Every role sees a different view of the same registry. A Transport Aide on a mobile scan view and an
          Operations Lead in the cockpit are reading the same row of data, shaped to the decision they need to make.
          That is the difference between a tracking <em>app</em> and a tracking <em>system</em>: the data model is
          shared, the surfaces are not.
        </p>
      </Module>
    </CsSection>
  )
}
