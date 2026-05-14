// frontend/src/components/casestudy/automationEngine/AeProblem.tsx
import { MessageSquare, RefreshCw, AlertTriangle } from 'lucide-react'
import { CsSection, Module } from '../bits'

const CALLOUTS = [
  { Icon: MessageSquare,  label: 'Manual coordination' },
  { Icon: RefreshCw,      label: 'Repetitive handoffs' },
  { Icon: AlertTriangle,  label: 'Missed escalations' },
]

export function AeProblem() {
  return (
    <CsSection
      id="problem"
      eyebrow="01 · Problem"
      title="Hospitals run on glue work."
      footnote="Lloyd has spent 9+ years inside hospital operations — the handoff patterns and ecosystem constraints are first-hand."
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-4 text-[1.02rem] leading-relaxed text-ink-soft">
          <p>
            Most hospital operations live in Microsoft 365 — Lists, SharePoint, Forms, Teams, Outlook — plus a fragmented set of custom apps. The handoffs <em>between</em> them are largely manual: copy-paste, email chains, &ldquo;did you see my Teams message?&rdquo;
          </p>
          <p>
            Operations leaders lose hours each week to coordination work that should be automatic. The work is small, repetitive, and exactly the work event-driven systems were built to handle.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {CALLOUTS.map(({ Icon, label }) => (
            <Module key={label} className="flex items-center gap-3 p-4">
              <span
                className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[var(--cream-2)]"
                style={{ color: 'var(--blue)' }}
              >
                <Icon size={17} strokeWidth={1.9} />
              </span>
              <span className="text-sm font-medium text-ink">{label}</span>
            </Module>
          ))}
        </div>
      </div>
    </CsSection>
  )
}
