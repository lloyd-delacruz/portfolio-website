// frontend/src/components/casestudy/spendwise/SwWorkflow.tsx
'use client'

import { useState } from 'react'
import { UserPlus, Landmark, Wallet, ArrowLeftRight, LineChart, Wand2 } from 'lucide-react'
import { CsSection } from '../bits'
import { SwPhone } from './SwPhone'
import { BudgetSetupScreen, AddAccountsScreen, InsightsScreen } from './SwScreens'

const STOPS = [
  { Icon: UserPlus, label: 'Onboard', note: 'Name, currency, pay schedule.' },
  { Icon: Landmark, label: 'Connect accounts', note: 'Checking, savings, cash.' },
  { Icon: Wallet, label: 'Build the budget', note: 'Categories with monthly targets.' },
  { Icon: ArrowLeftRight, label: 'Track spending', note: 'Auto-categorized transactions.' },
  { Icon: LineChart, label: 'See insights', note: 'Trends and AI nudges.' },
  { Icon: Wand2, label: 'Optimize the plan', note: 'Reassign, roll over, automate.' },
]

const SCRUB = [
  { label: 'Accounts', screen: <AddAccountsScreen /> },
  { label: 'Budget', screen: <BudgetSetupScreen /> },
  { label: 'Insights', screen: <InsightsScreen /> },
]

export function SwWorkflow() {
  const [i, setI] = useState(1)
  return (
    <CsSection
      eyebrow="The flow"
      title="From signup to a plan that runs itself."
      intro="Six steps, one continuous motion — no dead ends, no spreadsheet exports, no context switching."
    >
      {/* flow rail */}
      <div className="relative">
        <svg className="absolute left-0 right-0 top-7 hidden h-2 w-full md:block" viewBox="0 0 1000 8" preserveAspectRatio="none" aria-hidden>
          <path d="M0 4 H1000" stroke="var(--teal)" strokeOpacity="0.35" strokeWidth="2" className="flow-line" />
        </svg>
        <div className="grid grid-cols-2 gap-y-8 md:grid-cols-6 md:gap-y-0">
          {STOPS.map((s, idx) => (
            <div key={s.label} className="relative flex flex-col items-center px-2 text-center">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white ghair-2 soft-shadow-sm">
                <s.Icon size={20} style={{ color: 'var(--teal-deep)' }} />
              </span>
              <p className="mt-2.5 font-display text-[13px] font-bold text-ink">{s.label}</p>
              <p className="mt-1 text-[11px] leading-snug text-ink-muted">{s.note}</p>
              <span className="absolute -top-2 right-1 text-[10px] font-semibold text-ink-muted md:hidden">{idx + 1}</span>
            </div>
          ))}
        </div>
      </div>

      {/* scrubber */}
      <div className="mt-12 flex flex-col items-center gap-5">
        <div className="flex gap-2">
          {SCRUB.map((s, idx) => (
            <button
              key={s.label}
              onClick={() => setI(idx)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${i === idx ? 'text-white' : 'bg-white text-ink-soft ghair-2 hover:text-ink'}`}
              style={i === idx ? { background: 'var(--teal)' } : undefined}
            >
              {s.label}
            </button>
          ))}
        </div>
        <SwPhone width={232}>{SCRUB[i].screen}</SwPhone>
      </div>
    </CsSection>
  )
}
