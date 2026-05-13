// frontend/src/components/casestudy/spendwise/SwInsights.tsx
import { Sparkles } from 'lucide-react'
import { CsSection, Module } from '../bits'
import { Donut, Sparkbars } from './SwScreens'

const UTIL = [
  { name: 'Housing', spent: '$1,200', of: '$1,200', pct: 100, color: 'var(--teal)' },
  { name: 'Groceries', spent: '$252', of: '$300', pct: 84, color: 'var(--green)' },
  { name: 'Dining Out', spent: '$142', of: '$100', pct: 142, color: 'var(--coral)' },
  { name: 'Monthly Bills', spent: '$90', of: '$150', pct: 60, color: 'var(--amber)' },
]

export function SwInsights() {
  return (
    <CsSection
      eyebrow="Insights & planning"
      title="See where it goes. Know what's next."
      intro="Analytics that feed planning, not just charts that sit there — every view points at a decision."
    >
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Module>
          <p className="font-display text-sm font-bold text-ink">Spending analytics</p>
          <p className="mt-1 text-[12px] text-ink-muted">Last 8 weeks · all categories</p>
          <div className="mt-4"><Sparkbars values={[58, 72, 49, 80, 66, 90, 74, 61]} h={80} /></div>
        </Module>

        <Module>
          <p className="font-display text-sm font-bold text-ink">Category tracking</p>
          <div className="mt-3 space-y-2.5">
            {UTIL.map((u) => (
              <div key={u.name}>
                <div className="flex items-center justify-between text-[12px]">
                  <span className="text-ink-soft">{u.name}</span>
                  <span className="font-semibold text-ink">{u.spent} <span className="text-ink-muted">/ {u.of}</span></span>
                </div>
                <div className="mt-1 h-1.5 w-full rounded-full" style={{ background: 'var(--cream-2)' }}>
                  <div className="h-1.5 rounded-full" style={{ width: `${Math.min(u.pct, 100)}%`, background: u.color }} />
                </div>
              </div>
            ))}
          </div>
        </Module>

        <Module>
          <p className="font-display text-sm font-bold text-ink">Budget utilization</p>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {UTIL.map((u) => (
              <div key={u.name} className="flex flex-col items-center gap-1.5">
                <Donut segments={[[u.color, Math.min(u.pct, 100)], ['var(--cream-2)', Math.max(100 - u.pct, 0)]]} size={56} />
                <p className="text-[11px] font-semibold text-ink">{u.pct}%</p>
                <p className="text-[10px] text-ink-muted">{u.name}</p>
              </div>
            ))}
          </div>
        </Module>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[['Age of money', '23 days'], ['Ready to assign', '$240'], ['Spent this month', '$1,684'], ['Forecast end-of-month', '$2,090']].map(([k, v]) => (
          <Module key={k} className="!p-4">
            <p className="text-[11px] uppercase tracking-wide text-ink-muted">{k}</p>
            <p className="mt-1 font-display text-lg font-extrabold text-ink">{v}</p>
          </Module>
        ))}
      </div>

      <div className="mt-5 flex flex-col items-start gap-4 rounded-2xl p-6 ghair sm:flex-row sm:items-center sm:justify-between" style={{ background: 'linear-gradient(120deg,var(--teal-soft),#f4fbf7)' }}>
        <div className="flex items-start gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white"><Sparkles size={16} style={{ color: 'var(--teal-deep)' }} /></span>
          <div>
            <p className="font-display text-[15px] font-bold text-ink">AI-assisted planning</p>
            <p className="mt-1 max-w-xl text-[13px] leading-relaxed text-ink-soft">You&apos;re on pace to overspend Dining Out by ~$60. Move $40 from Groceries and $20 from Monthly Bills to stay on plan?</p>
          </div>
        </div>
        <div className="flex gap-2">
          <span className="rounded-lg px-4 py-2 text-[12px] font-semibold text-white" style={{ background: 'var(--teal)' }}>Accept</span>
          <span className="rounded-lg bg-white px-4 py-2 text-[12px] font-semibold text-ink ghair-2">Adjust</span>
        </div>
      </div>
    </CsSection>
  )
}
