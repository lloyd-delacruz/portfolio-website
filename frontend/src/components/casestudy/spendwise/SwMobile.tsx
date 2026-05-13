// frontend/src/components/casestudy/spendwise/SwMobile.tsx
import { Hand, PanelBottom, Zap, WifiOff } from 'lucide-react'
import { CsSection } from '../bits'
import { SwPhone } from './SwPhone'
import {
  AddAccountsScreen, BudgetSetupScreen, ReadyToAssignScreen, InsightsScreen,
} from './SwScreens'

const PRINCIPLES = [
  { Icon: Hand, title: 'Thumb-reachable actions', note: 'Primary controls live in the bottom third.' },
  { Icon: PanelBottom, title: 'Bottom-sheet flows', note: 'Add a transaction or assign money without leaving the screen.' },
  { Icon: Zap, title: 'Optimistic updates', note: 'The plan reflects your tap immediately; sync follows.' },
  { Icon: WifiOff, title: 'Offline-tolerant', note: 'Capture spending now; reconcile when you reconnect.' },
]

export function SwMobile() {
  return (
    <CsSection
      eyebrow="Mobile experience"
      title="Built mobile-first, not mobile-shrunk."
      intro="The phone is where money decisions actually happen — so the planning model, not a cut-down version of it, lives there."
    >
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
        <div className="flex flex-wrap items-end justify-center gap-4 sm:gap-6">
          <SwPhone width={190} className="rotate-[-3deg]"><AddAccountsScreen /></SwPhone>
          <SwPhone width={210}><BudgetSetupScreen /></SwPhone>
          <SwPhone width={210}><ReadyToAssignScreen /></SwPhone>
          <SwPhone width={190} className="rotate-[3deg]"><InsightsScreen /></SwPhone>
        </div>
        <div className="flex flex-col gap-3">
          {PRINCIPLES.map((p) => (
            <div key={p.title} className="flex items-start gap-3 rounded-2xl bg-white p-4 ghair soft-shadow-sm">
              <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl" style={{ background: 'var(--teal-soft)' }}>
                <p.Icon size={15} style={{ color: 'var(--teal-deep)' }} />
              </span>
              <div>
                <p className="font-display text-[14px] font-bold text-ink">{p.title}</p>
                <p className="mt-0.5 text-[12.5px] leading-relaxed text-ink-soft">{p.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </CsSection>
  )
}
