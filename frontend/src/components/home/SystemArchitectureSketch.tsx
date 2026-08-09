// frontend/src/components/home/SystemArchitectureSketch.tsx
import {
  ScanLine,
  ShieldCheck,
  Database,
  Sparkles,
  Gauge,
  type LucideIcon,
} from 'lucide-react'

type Stage = {
  key: string
  Icon: LucideIcon
  title: string
  caption: string
  /** Emphasised node — the point the whole diagram is making. */
  emphasis?: boolean
}

/**
 * The enforcement path shared by the systems in this portfolio: input is
 * captured at the point of care, every write goes through a policy boundary,
 * state and audit live together in Postgres, and operations read from that
 * same state. AI is one stage labelled with what it does — not an orbiting
 * centrepiece.
 */
const STAGES: Stage[] = [
  { key: 'input',  Icon: ScanLine,   title: 'Clinical input', caption: 'QR scan · form' },
  { key: 'policy', Icon: ShieldCheck, title: 'Policy boundary', caption: 'Role gate · RLS', emphasis: true },
  { key: 'state',  Icon: Database,   title: 'State + audit',  caption: 'Postgres' },
  { key: 'assist', Icon: Sparkles,   title: 'Retrieval',      caption: 'Cited answers' },
  { key: 'ops',    Icon: Gauge,      title: 'Operations',     caption: 'Role dashboards' },
]

function Connector() {
  return (
    <div className="flex items-center justify-center" aria-hidden>
      {/* Horizontal on md+, vertical below — the diagram reflows rather than
          shrinking labels to an unreadable size. */}
      <svg
        className="hidden h-3 w-5 md:block"
        viewBox="0 0 20 12"
        fill="none"
      >
        <path
          d="M0 6 H14 M11 2.5 L15.5 6 L11 9.5"
          stroke="var(--plum)"
          strokeOpacity="0.5"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <svg className="h-5 w-3 md:hidden" viewBox="0 0 12 20" fill="none">
        <path
          d="M6 0 V14 M2.5 11 L6 15.5 L9.5 11"
          stroke="var(--plum)"
          strokeOpacity="0.5"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

export function SystemArchitectureSketch() {
  return (
    <figure
      className="mx-auto w-full max-w-[600px]"
      role="img"
      aria-label="System enforcement path: clinical input is captured by QR scan or form, passes through a policy boundary of role gates and row-level security, is written to state and audit in Postgres, supports cited retrieval, and surfaces on role-specific operations dashboards. Operations feeds back into clinical input."
    >
      <div className="rounded-2xl bg-white p-5 ghair soft-shadow sm:p-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
          Enforcement path
        </p>

        <div className="mt-4 flex flex-col items-stretch gap-1 md:flex-row md:items-center">
          {STAGES.map((stage, i) => (
            <div key={stage.key} className="contents">
              <div
                className="flex flex-1 items-center gap-3 rounded-xl px-3 py-2.5 md:flex-col md:items-center md:gap-1.5 md:px-2 md:py-3 md:text-center"
                style={{
                  background: stage.emphasis ? 'var(--plum-soft)' : 'rgba(28,22,46,0.035)',
                }}
              >
                <div
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white"
                  style={{ border: '1px solid var(--line)' }}
                >
                  <stage.Icon
                    size={15}
                    strokeWidth={1.9}
                    style={{ color: stage.emphasis ? 'var(--plum)' : 'var(--ink-soft)' }}
                    aria-hidden
                  />
                </div>
                <div className="min-w-0">
                  <p className="font-display text-[11.5px] font-semibold leading-tight text-ink">
                    {stage.title}
                  </p>
                  <p className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-ink-muted">
                    {stage.caption}
                  </p>
                </div>
              </div>
              {i < STAGES.length - 1 && <Connector />}
            </div>
          ))}
        </div>

        {/* feedback edge */}
        <div className="mt-3 flex items-center gap-2 border-t border-[var(--line)] pt-3">
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
            <path
              d="M13 5 H3 M6 1.5 L2 5 L6 8.5"
              stroke="var(--plum)"
              strokeOpacity="0.55"
              strokeWidth="1.3"
              strokeDasharray="2.5 2"
              strokeLinecap="round"
            />
          </svg>
          <p className="text-[10px] leading-tight text-ink-muted">
            Operational signal feeds back into the next request
          </p>
        </div>
      </div>

      <figcaption className="mt-3 text-center text-[11px] leading-relaxed text-ink-muted">
        The state machine and tenant isolation live in the database, so the client cannot write a
        transition it is not permitted to make — live today across 4 Vancouver Coastal Health sites.
      </figcaption>
    </figure>
  )
}
