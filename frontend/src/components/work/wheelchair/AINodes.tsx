import { RegisterHandoff } from './primitives'
import { MonoLabel } from '@/components/home/primitives'

type Card = {
  slug: string
  title: string
  description: string
  diagram: 'lifecycle' | 'sites' | 'chat'
}

const CARDS: Card[] = [
  {
    slug: 'predictive_maintenance_node',
    title: 'Predictive maintenance',
    description:
      'Reads the lifecycle state machine. Flags chairs likely to fail within 14 days based on cumulative state-transit history. Surfaces in maintenance lead\'s dashboard.',
    diagram: 'lifecycle',
  },
  {
    slug: 'demand_forecast_node',
    title: 'Site demand forecast',
    description:
      'Reads patient-flow signals and scan cadence across sites. Predicts equipment shortfall by site by hour. Triggers proactive cross-site transfers before a shortage materialises.',
    diagram: 'sites',
  },
  {
    slug: 'operational_copilot_node',
    title: 'Operational copilot',
    description:
      'Reads the registry. Answers operational queries in natural language ("where are the bariatric chairs at UBC right now?") and drafts cross-site transfer requests for human approval.',
    diagram: 'chat',
  },
]

function MiniDiagram({ kind }: { kind: Card['diagram'] }) {
  if (kind === 'lifecycle') {
    return (
      <svg viewBox="0 0 100 30" className="w-full h-auto" aria-hidden="true">
        {[10, 30, 50, 70, 90].map((x) => (
          <circle key={x} cx={x} cy={15} r={1.6} fill="hsl(var(--surface-canvas))" stroke="rgba(255,255,255,0.32)" strokeWidth={0.22} />
        ))}
        {[[10,30],[30,50],[50,70],[70,90]].map(([a,b]) => (
          <line key={a} x1={a+2} y1={15} x2={b-2} y2={15} stroke="rgba(255,255,255,0.18)" strokeWidth={0.22} />
        ))}
        {/* Risk overlay arrow */}
        <path d="M 50 10 Q 60 4 70 10" fill="none" stroke="hsl(var(--accent-gold) / 0.85)" strokeWidth={0.4} />
        <text x="60" y="6" fontSize="2.5" textAnchor="middle" fontFamily="var(--font-geist-mono), monospace" fill="hsl(var(--accent-gold))">maintenance_risk</text>
      </svg>
    )
  }
  if (kind === 'sites') {
    return (
      <svg viewBox="0 0 100 40" className="w-full h-auto" aria-hidden="true">
        {[[20,12],[80,12],[20,28],[80,28]].map(([x,y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r={2} fill="hsl(var(--surface-canvas))" stroke="rgba(255,255,255,0.32)" strokeWidth={0.22} />
            <text x={x} y={y + 0.8} fontSize="2.2" textAnchor="middle" fontFamily="var(--font-geist-mono), monospace" fill="rgba(170,176,191,0.7)">{i === 1 ? 'ubc!' : ['vgh','ubc','lg','rch'][i]}</text>
          </g>
        ))}
        {/* Shortfall pulse on ubc */}
        <circle cx={80} cy={12} r={3.5} fill="none" stroke="hsl(var(--accent-gold) / 0.6)" strokeWidth={0.3} />
        {/* Proactive transfer arrow */}
        <line x1={22} y1={12} x2={78} y2={12} stroke="hsl(var(--accent-gold) / 0.7)" strokeWidth={0.3} markerEnd="" />
        <polygon points="76,11 80,12 76,13" fill="hsl(var(--accent-gold))" />
      </svg>
    )
  }
  // chat
  return (
    <div className="font-mono text-[10px] space-y-1.5">
      <div className="text-surface-fg-secondary">
        <span className="text-surface-fg-muted">user · </span>
        where are the bariatric chairs at UBC right now?
      </div>
      <div className="text-surface-fg">
        <span className="text-gold">copilot · </span>
        3 available at UBC · 4N. Most recently scanned 14:11.
        <span className="ml-1 inline-flex items-center rounded-full border border-gold/40 bg-gold/10 px-1.5 py-0.5 text-[9px] text-gold">
          EQ-UBC-0192
        </span>
      </div>
    </div>
  )
}

export function AINodes() {
  return (
    <>
      <RegisterHandoff direction="paper-to-surface" />
      <section className="bg-surface-canvas text-surface-fg">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <MonoLabel className="block mb-4 text-gold">next nodes · ai integration · concept</MonoLabel>
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight-h text-surface-fg max-w-[28ch] mb-6">
            AI as a node in the system. Not the centre of the universe.
          </h2>
          <p className="text-base text-surface-fg-secondary max-w-[58ch] mb-12">
            Three nodes that would plug into the existing registry. Each reads from the state machine, writes back through audited events, and ships behind the same workflow gestures the system already uses.
          </p>

          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {CARDS.map((c) => (
              <li key={c.slug} className="flex flex-col rounded-xl border border-surface-subtle bg-surface-card p-6">
                <MonoLabel className="text-gold">{c.slug}</MonoLabel>
                <h3 className="mt-3 text-lg font-medium text-surface-fg">{c.title}</h3>
                <p className="mt-3 text-sm text-surface-fg-secondary leading-relaxed">
                  {c.description}
                </p>
                <div className="mt-6 rounded-md border border-surface-subtle bg-surface-canvas p-4 min-h-[80px] flex items-center">
                  <MiniDiagram kind={c.diagram} />
                </div>
                <p className="mt-3 font-mono text-[10px] uppercase tracking-wide-label text-surface-fg-muted">
                  concept · not deployed
                </p>
              </li>
            ))}
          </ul>

          <p className="mt-10 font-mono text-[10px] uppercase tracking-wide-label text-surface-fg-muted">
            AI nodes read from workflow_core · the registry remains the source of truth
          </p>
        </div>
      </section>
    </>
  )
}
