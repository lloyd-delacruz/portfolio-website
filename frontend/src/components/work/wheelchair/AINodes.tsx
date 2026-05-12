import { Wrench, TrendingUp, MessagesSquare } from 'lucide-react'
import { MonoLabel } from '@/components/home/primitives'

type Kind = 'maintenance' | 'forecast' | 'copilot'

type Card = {
  slug: string
  title: string
  icon: typeof Wrench
  reads: string
  does: string
  kind: Kind
}

const CARDS: Card[] = [
  {
    slug: 'predictive_maintenance_node',
    title: 'Predictive maintenance',
    icon: Wrench,
    reads: 'reads the lifecycle state machine',
    does: 'flags chairs likely to fail within 14 days, in the maintenance lead’s view.',
    kind: 'maintenance',
  },
  {
    slug: 'demand_forecast_node',
    title: 'Site demand forecast',
    icon: TrendingUp,
    reads: 'reads scan cadence + patient flow',
    does: 'predicts shortfall by site by hour, triggers transfers before a shortage hits.',
    kind: 'forecast',
  },
  {
    slug: 'operational_copilot_node',
    title: 'Operational copilot',
    icon: MessagesSquare,
    reads: 'reads the registry',
    does: 'answers “where are the bariatric chairs at UBC?” and drafts transfers for approval.',
    kind: 'copilot',
  },
]

/** Shared visual grammar: a small workflow_core hub with the AI node hanging off it. */
function NodeDiagram({ kind }: { kind: Kind }) {
  return (
    <svg viewBox="0 0 200 64" className="h-auto w-full" aria-hidden="true">
      {/* connector */}
      <line x1="46" y1="32" x2="118" y2="32" stroke="hsl(var(--accent-gold) / 0.5)" strokeWidth="1" strokeDasharray="3 3" />
      {/* core hub */}
      <circle cx="32" cy="32" r="15" fill="hsl(var(--surface-canvas))" stroke="hsl(var(--accent-gold) / 0.6)" strokeWidth="1" />
      <text x="32" y="34.5" textAnchor="middle" fontSize="6.5" fontFamily="var(--font-geist-mono), monospace" fill="hsl(var(--accent-gold))">
        core
      </text>
      {/* AI node body */}
      <rect x="120" y="14" width="74" height="36" rx="6" fill="hsl(var(--surface-canvas))" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />

      {kind === 'maintenance' && (
        <>
          {/* small risk curve inside the node */}
          <polyline points="128,40 138,36 148,38 158,30 168,24 186,18" fill="none" stroke="hsl(var(--accent-gold) / 0.85)" strokeWidth="1.4" strokeLinecap="round" />
          <circle cx="186" cy="18" r="2" fill="hsl(var(--accent-gold))" />
          <text x="128" y="26" fontSize="6" fontFamily="var(--font-geist-mono), monospace" fill="rgba(170,176,191,0.8)">risk ↑</text>
        </>
      )}
      {kind === 'forecast' && (
        <>
          {/* mini bars + a shortfall marker */}
          {[0, 1, 2, 3, 4].map((i) => (
            <rect key={i} x={128 + i * 12} y={42 - (i === 3 ? 22 : 8 + i * 3)} width="7" height={i === 3 ? 22 : 8 + i * 3}
              fill={i === 3 ? 'hsl(var(--accent-gold) / 0.8)' : 'rgba(255,255,255,0.22)'} rx="1" />
          ))}
          <text x="160" y="14" textAnchor="middle" fontSize="6" fontFamily="var(--font-geist-mono), monospace" fill="hsl(var(--accent-gold))">short</text>
        </>
      )}
      {kind === 'copilot' && (
        <>
          {/* chat bubbles */}
          <rect x="127" y="19" width="40" height="9" rx="4.5" fill="rgba(255,255,255,0.14)" />
          <rect x="143" y="33" width="46" height="9" rx="4.5" fill="hsl(var(--accent-gold) / 0.22)" />
          <text x="170" y="48" textAnchor="middle" fontSize="5.5" fontFamily="var(--font-geist-mono), monospace" fill="rgba(170,176,191,0.8)">EQ-UBC-0192</text>
        </>
      )}
    </svg>
  )
}

export function AINodes() {
  return (
    <section className="border-t border-surface-subtle bg-surface-canvas text-surface-fg">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <MonoLabel className="block mb-4 text-gold">07 · what&apos;s next · ai integration · concept</MonoLabel>
        <h2 className="text-3xl md:text-4xl font-medium tracking-tight-h text-surface-fg max-w-[26ch]">
          AI as a node in the system — not the centre of it.
        </h2>
        <p className="mt-4 text-base md:text-lg text-surface-fg-secondary max-w-[56ch]">
          Three nodes that plug into the same registry. Each reads the state machine, writes back through audited events, and ships behind the gestures the system already uses.
        </p>

        <ul className="mt-10 grid grid-cols-1 gap-4 md:mt-12 md:grid-cols-3">
          {CARDS.map((c) => (
            <li key={c.slug} className="flex flex-col rounded-xl border border-surface-subtle bg-surface-card p-6">
              <div className="flex items-center gap-2">
                <c.icon className="h-4 w-4 text-gold" aria-hidden />
                <MonoLabel className="text-gold">{c.slug}</MonoLabel>
              </div>
              <h3 className="mt-3 text-lg font-medium text-surface-fg">{c.title}</h3>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-wide-label text-surface-fg-muted">{c.reads}</p>
              <p className="mt-3 text-[13px] leading-relaxed text-surface-fg-secondary">{c.does}</p>
              <div className="mt-6 rounded-md border border-surface-subtle bg-surface-canvas p-4">
                <NodeDiagram kind={c.kind} />
              </div>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-wide-label text-surface-fg-muted">concept · not deployed</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
