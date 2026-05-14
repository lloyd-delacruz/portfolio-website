// frontend/src/components/casestudy/automationEngine/AeReliability.tsx
import { KeyRound, RotateCcw, KeySquare, ScrollText } from 'lucide-react'
import { CsSection, Module } from '../bits'

const CARDS = [
  {
    Icon: KeyRound,
    title: 'Idempotency',
    body: 'Every flow accepts a correlation ID. Duplicate triggers resolve to the same outcome without double-posting.',
  },
  {
    Icon: RotateCcw,
    title: 'Retry & dead-letter',
    body: 'Transient failures retry with exponential backoff. Permanent failures route to a dead-letter list with full payload + error.',
  },
  {
    Icon: KeySquare,
    title: 'Secrets in Key Vault',
    body: 'No credentials in flow definitions. All keys, tokens, connection strings resolve through Azure Key Vault references.',
  },
  {
    Icon: ScrollText,
    title: 'Audit by design',
    body: 'Every run writes a row to a flow_audit list with correlation ID, outcome, duration, and triggering identity.',
  },
]

export function AeReliability() {
  return (
    <CsSection
      eyebrow="05 · Reliability & governance"
      title="Past the happy path."
      intro="The difference between a clever flow and a production-worthy capability is everything that happens when something fails."
      footnote="Prototype-grade implementations of each pattern, not yet hardened to production SLAs."
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {CARDS.map(({ Icon, title, body }) => (
          <Module key={title} className="p-5">
            <div className="flex items-center gap-3">
              <span
                className="grid h-9 w-9 place-items-center rounded-lg bg-[var(--cream-2)]"
                style={{ color: 'var(--plum)' }}
              >
                <Icon size={18} strokeWidth={1.9} />
              </span>
              <h3 className="font-display text-base font-bold text-ink">{title}</h3>
            </div>
            <p className="mt-3 text-[13px] leading-relaxed text-ink-soft">{body}</p>
          </Module>
        ))}
      </div>
    </CsSection>
  )
}
