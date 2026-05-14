// frontend/src/components/casestudy/automationEngine/AeImpact.tsx
import Link from 'next/link'
import { ArrowRightLeft, ShieldCheck, Blocks } from 'lucide-react'
import { CsSection, Module } from '../bits'

const CARDS = [
  {
    Icon: ArrowRightLeft,
    title: 'Removes manual handoffs',
    body: 'Every pattern eliminates a category of “did you see my message?” coordination work between Microsoft 365 surfaces.',
  },
  {
    Icon: ShieldCheck,
    title: 'Closes the audit gap',
    body: 'Operational events that used to live only in chat now have a structured, correlation-ID’d audit trail.',
  },
  {
    Icon: Blocks,
    title: 'Composable, not bespoke',
    body: 'Each pattern is a scaffold — new automations slot into the same three-layer shape rather than being one-off scripts.',
  },
]

export function AeImpact() {
  return (
    <CsSection
      eyebrow="06 · What this enables"
      title="Coordination work that doesn’t get forgotten."
      intro="The honest framing — what these patterns make possible, without claiming production scale."
      footnote={
        <span>
          Designed to layer on top of existing systems like the{' '}
          <Link href="/work/wheelchair-tracking" className="text-plum underline-offset-2 hover:underline">
            wheelchair tracking platform
          </Link>
          , not replace them.
        </span>
      }
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {CARDS.map(({ Icon, title, body }) => (
          <Module key={title} className="p-5">
            <div className="flex items-center gap-3">
              <span
                className="grid h-9 w-9 place-items-center rounded-lg bg-[var(--cream-2)]"
                style={{ color: 'var(--blue)' }}
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
