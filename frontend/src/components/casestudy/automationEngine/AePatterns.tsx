// frontend/src/components/casestudy/automationEngine/AePatterns.tsx
import { AlertTriangle, ClipboardList, RefreshCw, Share2 } from 'lucide-react'
import { CsSection, Module, Chip } from '../bits'

type Pattern = {
  Icon: typeof AlertTriangle
  name: string
  definition: string
  example: string
  chips: string[]
}

const PATTERNS: Pattern[] = [
  {
    Icon: AlertTriangle,
    name: 'Alert routing',
    definition: 'Event from a system-of-record is classified and routed to the right human channel with full audit.',
    example: 'Equipment marked needs_service → severity classified → biomed on-call Teams channel + Planner task',
    chips: ['List changed', 'Azure Function', 'Teams + Planner'],
  },
  {
    Icon: ClipboardList,
    name: 'Form → system-of-record',
    definition: 'A submitted form drives an approval / write-back loop into a List or SharePoint document, with the submitter notified at each state.',
    example: 'Service request form → approval routing → Lists write + submitter notification',
    chips: ['Form submitted', 'Power Automate', 'Lists + Email'],
  },
  {
    Icon: RefreshCw,
    name: 'Scheduled sync',
    definition: 'Azure Function runs on a CRON, pulls from one Microsoft system, transforms, and writes to another — with idempotency keys and dead-letter routing.',
    example: 'Nightly: pull asset roster from List A → reconcile → write changes to List B',
    chips: ['CRON', 'Azure Function', 'Lists (read + write)'],
  },
  {
    Icon: Share2,
    name: 'Webhook fan-out',
    definition: 'External system event arrives by webhook and is fanned out to multiple downstream Microsoft Graph actions with per-action retry.',
    example: 'External incident.created webhook → Teams post + calendar event + Lists row',
    chips: ['Webhook', 'Azure Function', 'Graph (3 calls)'],
  },
]

export function AePatterns() {
  return (
    <CsSection
      eyebrow="04 · Patterns"
      title="Four shapes that cover most of the work."
      intro="Most operational automations collapse into a small set of reusable patterns. Each has been built and demonstrated."
      footnote="Patterns shown have been built as prototypes inside a Microsoft 365 enterprise tenant."
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {PATTERNS.map((p) => (
          <Module key={p.name} className="p-5">
            <div className="flex items-center gap-3">
              <span
                className="grid h-10 w-10 place-items-center rounded-lg bg-[var(--cream-2)]"
                style={{ color: 'var(--blue)' }}
              >
                <p.Icon size={22} strokeWidth={1.8} />
              </span>
              <h3 className="font-display text-base font-bold text-ink">{p.name}</h3>
            </div>
            <p className="mt-3 text-[13px] leading-relaxed text-ink-soft">{p.definition}</p>
            <p className="mt-2 text-[12.5px] italic leading-relaxed text-ink-muted">{p.example}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {p.chips.map((c) => (
                <Chip key={c} tone="neutral">{c}</Chip>
              ))}
            </div>
          </Module>
        ))}
      </div>
    </CsSection>
  )
}
