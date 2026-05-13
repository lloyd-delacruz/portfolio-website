// frontend/src/components/casestudy/spendwise/SwScreens.tsx
import { Home, ShoppingCart, UtensilsCrossed, Zap, Plus } from 'lucide-react'
import { SwMark } from './SwMark'

const TEAL = 'var(--teal)'
const SOFT = 'rgba(28,22,46,0.08)'

export function ProgressDots({ n = 5, active = 2 }: { n?: number; active?: number }) {
  return (
    <div className="mt-3 flex items-center justify-center gap-1.5">
      {Array.from({ length: n }).map((_, i) => (
        <span
          key={i}
          className="h-1.5 rounded-full transition-all"
          style={{ width: i === active ? 14 : 6, background: i === active ? TEAL : SOFT }}
        />
      ))}
    </div>
  )
}

export function PrimaryBtn({ label }: { label: string }) {
  return (
    <div className="mt-3 rounded-xl py-2 text-center text-[11px] font-semibold text-white" style={{ background: TEAL }}>
      {label}
    </div>
  )
}

export function PhoneHeader() {
  return <div className="flex items-center justify-center pb-2 pt-1"><SwMark size={20} /></div>
}

export function ScreenTitle({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="px-1 pb-2 text-center">
      <p className="font-display text-[13px] font-extrabold text-ink">{title}</p>
      {sub && <p className="mt-1 text-[9.5px] leading-snug text-ink-muted">{sub}</p>}
    </div>
  )
}

export const CATEGORIES = [
  { Icon: Home, name: 'Housing', amt: '$1,200', pct: 100, color: 'var(--teal)' },
  { Icon: ShoppingCart, name: 'Groceries', amt: '$300', pct: 84, color: 'var(--green)' },
  { Icon: UtensilsCrossed, name: 'Dining Out', amt: '$100', pct: 142, color: 'var(--coral)' },
  { Icon: Zap, name: 'Monthly Bills', amt: '$150', pct: 60, color: 'var(--amber)' },
] as const

export function CategoryRow({ Icon, name, amt, pct, color }: (typeof CATEGORIES)[number]) {
  return (
    <div className="py-1.5">
      <div className="flex items-center gap-2">
        <span className="grid h-5 w-5 place-items-center rounded-md" style={{ background: `${color}1f` }}>
          <Icon size={11} style={{ color }} />
        </span>
        <span className="flex-1 text-[10px] font-medium text-ink">{name}</span>
        <span className="text-[9.5px] font-semibold text-ink-soft">{amt}<span className="text-ink-muted">/mo</span></span>
      </div>
      <div className="mt-1 h-1 w-full rounded-full" style={{ background: SOFT }}>
        <div className="h-1 rounded-full" style={{ width: `${Math.min(pct, 100)}%`, background: color }} />
      </div>
    </div>
  )
}

// "Give every dollar a job" / Ready-to-Assign screen body
export function ReadyToAssignScreen() {
  return (
    <>
      <PhoneHeader />
      <ScreenTitle title="Give every dollar a job" sub="Assign your money to your budget categories." />
      <div className="rounded-xl p-2.5 ghair">
        <p className="text-[9px] font-semibold uppercase tracking-wide text-ink-muted">Ready to Assign</p>
        <div className="mt-1 rounded-lg py-1.5 text-center text-[15px] font-extrabold text-white" style={{ background: TEAL }}>$5,000</div>
        <div className="mt-2 space-y-1">
          {CATEGORIES.map((c) => (
            <div key={c.name} className="flex items-center gap-2 text-[9.5px]">
              <span className="grid h-4 w-4 place-items-center rounded" style={{ background: `${c.color}1f` }}>
                <c.Icon size={9} style={{ color: c.color }} />
              </span>
              <span className="flex-1 text-ink">{c.name}</span>
              <span className="font-semibold text-ink-soft">{c.amt}</span>
            </div>
          ))}
        </div>
      </div>
      <PrimaryBtn label="Next" />
    </>
  )
}

// "What do you spend on?" / budget categories screen body
export function BudgetSetupScreen() {
  return (
    <>
      <PhoneHeader />
      <ScreenTitle title="What do you spend on?" sub="Add your budget categories so you're ready to assign your money." />
      <div className="rounded-xl p-2 ghair">
        {CATEGORIES.map((c) => <CategoryRow key={c.name} {...c} />)}
        <div className="mt-1 flex items-center gap-2 rounded-lg py-1.5" style={{ background: 'var(--teal-soft)' }}>
          <Plus size={11} className="ml-1.5" style={{ color: TEAL }} />
          <span className="text-[10px] font-semibold" style={{ color: 'var(--teal-deep)' }}>Add Category</span>
        </div>
      </div>
      <ProgressDots active={3} />
    </>
  )
}

// "Where is your money?" / add accounts screen body
export function AddAccountsScreen() {
  const rows = [
    { name: 'Fictional Bank', sub: 'Checking', amt: '$2,000' },
    { name: 'Fictional Bank', sub: 'Savings', amt: '$3,500' },
  ]
  return (
    <>
      <PhoneHeader />
      <ScreenTitle title="Where is your money?" sub="Add your bank, investment, and cash accounts." />
      <div className="rounded-xl p-2 ghair">
        <p className="px-1 pb-1 text-[9px] font-semibold uppercase tracking-wide text-ink-muted">Linked accounts</p>
        {rows.map((r, i) => (
          <div key={i} className="flex items-center gap-2 py-1.5">
            <span className="grid h-5 w-5 place-items-center rounded-md" style={{ background: 'var(--teal-soft)' }}>
              <Home size={11} style={{ color: TEAL }} />
            </span>
            <span className="flex-1 text-[10px] font-medium text-ink">{r.name}<span className="block text-[8.5px] text-ink-muted">{r.sub}</span></span>
            <span className="text-[9.5px] font-semibold text-ink-soft">{r.amt}</span>
          </div>
        ))}
        <div className="mt-1 flex items-center gap-2 rounded-lg py-1.5" style={{ background: 'var(--teal-soft)' }}>
          <Plus size={11} className="ml-1.5" style={{ color: TEAL }} />
          <span className="text-[10px] font-semibold" style={{ color: 'var(--teal-deep)' }}>Add Account</span>
        </div>
      </div>
      <ProgressDots active={2} />
    </>
  )
}

// Insights screen body — donut + sparkline + AI nudge
export function InsightsScreen() {
  return (
    <>
      <PhoneHeader />
      <ScreenTitle title="This month" sub="Spending by category" />
      <div className="flex items-center gap-3 rounded-xl p-2.5 ghair">
        <Donut segments={[['var(--teal)', 38], ['var(--green)', 24], ['var(--coral)', 22], ['var(--amber)', 16]]} size={52} />
        <div className="flex-1 space-y-1">
          {CATEGORIES.map((c) => (
            <div key={c.name} className="flex items-center gap-1.5 text-[9px]">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: c.color }} />
              <span className="flex-1 text-ink-soft">{c.name}</span>
              <span className="font-semibold text-ink">{c.amt}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-2 rounded-xl p-2.5 text-[9px] leading-snug" style={{ background: 'var(--teal-soft)', color: 'var(--teal-deep)' }}>
        <span className="font-semibold">SpendWise:</span> You&apos;re on pace to overspend Dining Out by ~$60 — move $40 from Groceries?
      </div>
    </>
  )
}

export function Donut({ segments, size = 56 }: { segments: [string, number][]; size?: number }) {
  let acc = 0
  const stops = segments
    .map(([c, v]) => { const seg = `${c} ${acc}% ${acc + v}%`; acc += v; return seg })
    .join(', ')
  return (
    <div className="shrink-0 rounded-full" style={{ width: size, height: size, background: `conic-gradient(${stops})` }}>
      <div className="rounded-full bg-white" style={{ margin: size * 0.16, width: size * 0.68, height: size * 0.68 }} />
    </div>
  )
}

export function Sparkbars({ values, color = 'var(--teal)', h = 26 }: { values: number[]; color?: string; h?: number }) {
  const max = Math.max(...values)
  return (
    <div className="flex items-end gap-1" style={{ height: h }}>
      {values.map((v, i) => (
        <div key={i} className="flex-1 rounded-sm" style={{ height: `${(v / max) * 100}%`, background: color, opacity: 0.35 + 0.5 * (i / values.length) }} />
      ))}
    </div>
  )
}
