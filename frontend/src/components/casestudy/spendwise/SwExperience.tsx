// frontend/src/components/casestudy/spendwise/SwExperience.tsx
'use client'

import { useState } from 'react'
import {
  Rocket, Landmark, Wallet, ArrowLeftRight, Repeat, LineChart, LayoutDashboard, Sparkles,
} from 'lucide-react'
import { CsSection } from '../bits'
import {
  AddAccountsScreen, BudgetSetupScreen, InsightsScreen,
  CATEGORIES, CategoryRow, Donut,
} from './SwScreens'

type TabKey = 'onboarding' | 'accounts' | 'budget' | 'transactions' | 'recurring' | 'insights' | 'planning'

const TABS: { key: TabKey; Icon: typeof Rocket; label: string; note: string }[] = [
  { key: 'onboarding', Icon: Rocket, label: 'Onboarding', note: 'A guided start — name, accounts, categories, assign.' },
  { key: 'accounts', Icon: Landmark, label: 'Add accounts', note: 'Checking, savings, cash — all balances in one view.' },
  { key: 'budget', Icon: Wallet, label: 'Budget setup', note: 'Create categories with monthly targets and utilization bars.' },
  { key: 'transactions', Icon: ArrowLeftRight, label: 'Transactions', note: 'Auto-categorized activity that flows straight into the plan.' },
  { key: 'recurring', Icon: Repeat, label: 'Recurring', note: 'Subscriptions and bills with cadence and next-date awareness.' },
  { key: 'insights', Icon: LineChart, label: 'Insights', note: 'Spend by category, trends, and one grounded AI nudge.' },
  { key: 'planning', Icon: LayoutDashboard, label: 'Planning dashboard', note: 'Ready-to-assign, assignments, age of money, forecast.' },
]

function Mock({ tab }: { tab: TabKey }) {
  if (tab === 'onboarding')
    return <div className="flex justify-center"><Phone><Onboarding /></Phone></div>
  if (tab === 'accounts')
    return <div className="flex justify-center"><Phone><AddAccountsScreen /></Phone></div>
  if (tab === 'budget')
    return <div className="flex justify-center"><Phone><BudgetSetupScreen /></Phone></div>
  if (tab === 'transactions') return <Transactions />
  if (tab === 'recurring') return <Recurring />
  if (tab === 'insights')
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_220px]">
        <InsightsPanel />
        <div className="flex justify-center"><Phone><InsightsScreen /></Phone></div>
      </div>
    )
  return <PlanningDashboard />
}

// local lightweight phone (no notch) so the explorer reads as an in-app preview
function Phone({ children }: { children: React.ReactNode }) {
  return <div className="w-[220px] rounded-2xl bg-white p-3 ghair soft-shadow">{children}</div>
}

function Onboarding() {
  return (
    <div className="text-center">
      <p className="font-display text-[13px] font-extrabold text-ink">Let&apos;s get started</p>
      <p className="mt-1 text-[9.5px] leading-snug text-ink-muted">Tell us a bit about yourself to set up your budget.</p>
      <div className="my-3 h-16 rounded-xl" style={{ background: 'var(--cream-2)' }} />
      <div className="space-y-1.5">
        {['Your name', 'Currency', 'Pay schedule'].map((l) => (
          <div key={l} className="rounded-lg px-2 py-1.5 text-left text-[10px] text-ink-soft ghair">{l}</div>
        ))}
      </div>
      <div className="mt-3 rounded-xl py-2 text-[11px] font-semibold text-white" style={{ background: 'var(--teal)' }}>Continue</div>
    </div>
  )
}

function Transactions() {
  const rows = [
    { m: 'Whole Foods', a: '-$84.20', c: 'Groceries', color: 'var(--green)' },
    { m: 'Shell', a: '-$48.00', c: 'Transport', color: 'var(--blue)' },
    { m: 'Olive & Vine', a: '-$32.50', c: 'Dining Out', color: 'var(--coral)' },
    { m: 'Acme Payroll', a: '+$2,500.00', c: 'Income', color: 'var(--teal)' },
    { m: 'City Power', a: '-$96.40', c: 'Monthly Bills', color: 'var(--amber)' },
  ]
  return (
    <div className="rounded-2xl bg-white p-5 ghair soft-shadow">
      <div className="flex items-center justify-between">
        <p className="font-display text-sm font-bold text-ink">Recent activity</p>
        <span className="text-[11px] text-ink-muted">Auto-categorized</span>
      </div>
      <div className="mt-3 divide-y" style={{ borderColor: 'var(--line)' }}>
        {rows.map((r) => (
          <div key={r.m} className="flex items-center gap-3 py-2.5">
            <span className="h-2 w-2 rounded-full" style={{ background: r.color }} />
            <span className="flex-1 text-[13px] font-medium text-ink">{r.m}</span>
            <span className="rounded-full px-2 py-0.5 text-[10px] font-medium text-ink-soft" style={{ background: 'var(--cream-2)' }}>{r.c}</span>
            <span className={`w-20 text-right text-[13px] font-semibold ${r.a.startsWith('+') ? '' : 'text-ink'}`} style={r.a.startsWith('+') ? { color: 'var(--teal-deep)' } : undefined}>{r.a}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Recurring() {
  const rows = [
    { m: 'Rent', cadence: 'Monthly · 1st', next: 'in 6 days', amt: '$1,200', color: 'var(--teal)' },
    { m: 'Streaming bundle', cadence: 'Monthly · 14th', next: 'in 12 days', amt: '$24', color: 'var(--coral)' },
    { m: 'Car insurance', cadence: 'Every 6 months', next: 'in 41 days', amt: '$360', color: 'var(--blue)' },
    { m: 'Gym', cadence: 'Monthly · 3rd', next: 'in 8 days', amt: '$39', color: 'var(--amber)' },
  ]
  return (
    <div className="rounded-2xl bg-white p-5 ghair soft-shadow">
      <p className="font-display text-sm font-bold text-ink">Recurring & true expenses</p>
      <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {rows.map((r) => (
          <div key={r.m} className="rounded-xl p-3 ghair">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full" style={{ background: r.color }} />
              <span className="flex-1 text-[13px] font-semibold text-ink">{r.m}</span>
              <span className="text-[13px] font-semibold text-ink">{r.amt}</span>
            </div>
            <p className="mt-1 text-[11px] text-ink-muted">{r.cadence} · next {r.next}</p>
            <div className="mt-2 flex gap-1">
              {Array.from({ length: 12 }).map((_, i) => (
                <span key={i} className="h-1.5 flex-1 rounded-full" style={{ background: i === 2 ? r.color : 'var(--line)' }} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function InsightsPanel() {
  return (
    <div className="rounded-2xl bg-white p-5 ghair soft-shadow">
      <p className="font-display text-sm font-bold text-ink">Spending analytics</p>
      <div className="mt-3 flex items-end gap-2" style={{ height: 90 }}>
        {[58, 72, 49, 80, 66, 90, 74, 61].map((v, i) => (
          <div key={i} className="flex-1 rounded-md" style={{ height: `${v}%`, background: 'var(--teal)', opacity: 0.3 + 0.5 * (i / 8) }} />
        ))}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[['Spent', '$1,860'], ['Ready to assign', '$240'], ['Age of money', '23 days'], ['Forecast', '$2,090']].map(([k, v]) => (
          <div key={k} className="rounded-xl p-2.5" style={{ background: 'var(--cream-2)' }}>
            <p className="text-[10px] uppercase tracking-wide text-ink-muted">{k}</p>
            <p className="mt-0.5 text-sm font-bold text-ink">{v}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function PlanningDashboard() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.4fr_1fr]">
      <div className="rounded-2xl bg-white p-5 ghair soft-shadow">
        <div className="flex items-center justify-between rounded-xl p-3" style={{ background: 'var(--teal-soft)' }}>
          <span className="text-[12px] font-semibold" style={{ color: 'var(--teal-deep)' }}>Ready to Assign</span>
          <span className="font-display text-xl font-extrabold" style={{ color: 'var(--teal-deep)' }}>$5,000</span>
        </div>
        <div className="mt-3 space-y-1">{CATEGORIES.map((c) => <CategoryRow key={c.name} {...c} />)}</div>
      </div>
      <div className="space-y-4">
        <div className="rounded-2xl bg-white p-5 ghair soft-shadow">
          <p className="font-display text-sm font-bold text-ink">Category mix</p>
          <div className="mt-3 flex items-center gap-4">
            <Donut segments={[['var(--teal)', 38], ['var(--green)', 24], ['var(--coral)', 22], ['var(--amber)', 16]]} size={72} />
            <div className="flex-1 space-y-1.5">
              {CATEGORIES.map((c) => (
                <div key={c.name} className="flex items-center gap-2 text-[11px]">
                  <span className="h-2 w-2 rounded-full" style={{ background: c.color }} />
                  <span className="flex-1 text-ink-soft">{c.name}</span>
                  <span className="font-semibold text-ink">{c.amt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="rounded-2xl p-5 ghair" style={{ background: 'linear-gradient(135deg,var(--teal-soft),#f4fbf7)' }}>
          <div className="flex items-center gap-2"><Sparkles size={14} style={{ color: 'var(--teal-deep)' }} /><span className="text-[12px] font-semibold" style={{ color: 'var(--teal-deep)' }}>AI assist</span></div>
          <p className="mt-1.5 text-[13px] leading-relaxed text-ink-soft">Dining Out is trending 42% over. Move $40 from Groceries to stay on plan?</p>
          <div className="mt-3 flex gap-2">
            <span className="rounded-lg px-3 py-1.5 text-[11px] font-semibold text-white" style={{ background: 'var(--teal)' }}>Accept</span>
            <span className="rounded-lg bg-white px-3 py-1.5 text-[11px] font-semibold text-ink ghair-2">Adjust</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function SwExperience() {
  const [active, setActive] = useState<TabKey>('budget')
  const note = TABS.find((t) => t.key === active)!.note
  return (
    <CsSection
      id="product"
      eyebrow="The product"
      title="One operating system for your money."
      intro="Onboarding to optimization, on a single model — here's what each surface looks like."
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]">
        <div className="flex flex-col gap-1.5">
          {TABS.map((t) => {
            const on = t.key === active
            return (
              <button
                key={t.key}
                onClick={() => setActive(t.key)}
                className={`flex items-center gap-3 rounded-xl px-3.5 py-3 text-left text-sm transition-colors ${on ? 'bg-white ghair-2 soft-shadow-sm' : 'hover:bg-white/60'}`}
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg" style={{ background: on ? 'var(--teal-soft)' : 'var(--cream-2)' }}>
                  <t.Icon size={15} style={{ color: on ? 'var(--teal-deep)' : 'var(--ink-soft)' }} />
                </span>
                <span className={`font-medium ${on ? 'text-ink' : 'text-ink-soft'}`}>{t.label}</span>
              </button>
            )
          })}
        </div>
        <div className="rounded-2xl p-6 ghair" style={{ background: 'var(--cream-2)' }}>
          <p className="mb-4 text-[13px] leading-relaxed text-ink-soft">{note}</p>
          <Mock tab={active} />
        </div>
      </div>
    </CsSection>
  )
}
