// frontend/src/components/casestudy/spendwise/SwProblem.tsx
import { Layers, Grid3x3, Unlink, SlidersHorizontal, Boxes } from 'lucide-react'
import { CsSection, Module } from '../bits'
import { SwMark } from './SwMark'

const PAINS = [
  { Icon: Layers, title: 'Fragmented visibility', note: 'Balances scattered across banks and apps.' },
  { Icon: Grid3x3, title: 'Budgeting friction', note: 'Spreadsheets that rot after week one.' },
  { Icon: Unlink, title: 'Disconnected tracking', note: 'Transactions that never reach a plan.' },
  { Icon: SlidersHorizontal, title: 'Overwhelming planning', note: 'Too many knobs, no clear next step.' },
  { Icon: Boxes, title: 'Poor organization', note: 'Spending piles up uncategorized.' },
]

export function SwProblem() {
  return (
    <CsSection
      id="problem"
      eyebrow="The friction"
      title="Money is everywhere. Clarity isn't."
      intro="Most people don't lack discipline — they lack one place where the plan, the accounts, and the spending actually meet. SpendWise starts there."
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {PAINS.map((p) => (
          <Module key={p.title} className="flex items-start gap-3">
            <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl" style={{ background: 'var(--cream-2)' }}>
              <p.Icon size={16} className="text-ink-soft" />
            </span>
            <div>
              <p className="font-display text-[15px] font-bold text-ink">{p.title}</p>
              <p className="mt-1 text-[13px] leading-relaxed text-ink-soft">{p.note}</p>
            </div>
          </Module>
        ))}
        <Module className="flex flex-col items-center justify-center gap-2 text-center" style={{ background: 'linear-gradient(135deg,var(--teal-soft),#f4fbf7)' }}>
          <SwMark size={26} withWordmark={false} />
          <p className="font-display text-[15px] font-bold text-ink">One plan underneath</p>
          <p className="text-[13px] leading-relaxed text-ink-soft">Accounts, budget, and transactions on a single operational model.</p>
        </Module>
      </div>
    </CsSection>
  )
}
