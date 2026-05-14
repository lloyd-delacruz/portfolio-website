// frontend/src/components/casestudy/automationEngine/AeArchitecture.tsx
import { Webhook, Workflow, Send } from 'lucide-react'
import { CsSection, Module, Chip } from '../bits'

type Layer = {
  title: string
  Icon: typeof Webhook
  color: string
  examples: string[]
}

const LAYERS: Layer[] = [
  {
    title: 'Trigger surface',
    Icon: Webhook,
    color: 'var(--blue)',
    examples: ['Forms submitted', 'List item changed', 'Schedule (CRON)', 'External webhook'],
  },
  {
    title: 'Orchestration',
    Icon: Workflow,
    color: 'var(--plum)',
    examples: ['Power Automate flow', 'Azure Function', 'Branching + retry', 'Secrets via Key Vault'],
  },
  {
    title: 'Action surface',
    Icon: Send,
    color: 'var(--green)',
    examples: ['Teams channel post', 'Lists write', 'Planner task', 'Email + Calendar'],
  },
]

export function AeArchitecture() {
  return (
    <CsSection
      eyebrow="02 · System architecture"
      title="Three layers, composable across the Microsoft ecosystem."
      intro="Trigger surfaces fan into an orchestration layer that calls action surfaces — the same shape for every automation."
      footnote="Built prototypes inside a Microsoft 365 enterprise tenant. Not yet deployed at platform scale."
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {LAYERS.map((layer) => (
          <Module key={layer.title} className="p-5">
            <div className="flex items-center gap-3">
              <span
                className="grid h-9 w-9 place-items-center rounded-lg bg-[var(--cream-2)]"
                style={{ color: layer.color }}
              >
                <layer.Icon size={18} strokeWidth={1.9} />
              </span>
              <h3 className="font-display text-base font-bold text-ink">{layer.title}</h3>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {layer.examples.map((ex) => (
                <Chip key={ex} tone="neutral">{ex}</Chip>
              ))}
            </div>
          </Module>
        ))}
      </div>

      <div
        className="mt-8 rounded-2xl bg-white p-6 ghair soft-shadow-sm"
        role="img"
        aria-label="Flow diagram: trigger feeds orchestration which fans out to actions, with an audit branch from orchestration"
      >
        <svg viewBox="0 0 720 200" className="h-44 w-full" fill="none" aria-hidden="true">
          {/* spine */}
          <path d="M90 90 H310" stroke="var(--blue)" strokeWidth="1.8" strokeDasharray="3 4" />
          <path d="M410 90 H630" stroke="var(--blue)" strokeWidth="1.8" strokeDasharray="3 4" />
          {/* audit branch */}
          <path d="M360 110 V170 H540" stroke="rgba(28,22,46,0.35)" strokeWidth="1.5" strokeDasharray="2 4" />
          {/* arrows */}
          <path d="M300 86 L312 90 L300 94 Z" fill="var(--blue)" />
          <path d="M620 86 L632 90 L620 94 Z" fill="var(--blue)" />
          <path d="M528 166 L542 170 L528 174 Z" fill="rgba(28,22,46,0.6)" />

          {/* node 1 — trigger */}
          <g transform="translate(20, 60)">
            <rect width="140" height="60" rx="12" fill="white" stroke="rgba(28,22,46,0.12)" />
            <text x="70" y="28" textAnchor="middle" fill="var(--ink)" fontSize="13" fontWeight="600">Trigger</text>
            <text x="70" y="46" textAnchor="middle" fill="rgba(28,22,46,0.55)" fontSize="10">List · webhook · CRON</text>
          </g>
          {/* node 2 — orchestration */}
          <g transform="translate(290, 60)">
            <rect width="140" height="60" rx="12" fill="white" stroke="rgba(28,22,46,0.12)" />
            <text x="70" y="28" textAnchor="middle" fill="var(--ink)" fontSize="13" fontWeight="600">Orchestration</text>
            <text x="70" y="46" textAnchor="middle" fill="rgba(28,22,46,0.55)" fontSize="10">Flow + Azure Function</text>
          </g>
          {/* node 3 — actions */}
          <g transform="translate(560, 60)">
            <rect width="140" height="60" rx="12" fill="white" stroke="rgba(28,22,46,0.12)" />
            <text x="70" y="28" textAnchor="middle" fill="var(--ink)" fontSize="13" fontWeight="600">Actions</text>
            <text x="70" y="46" textAnchor="middle" fill="rgba(28,22,46,0.55)" fontSize="10">Microsoft Graph</text>
          </g>
          {/* node 4 — audit */}
          <g transform="translate(420, 150)">
            <rect width="140" height="40" rx="10" fill="var(--cream-2)" stroke="rgba(28,22,46,0.12)" />
            <text x="70" y="25" textAnchor="middle" fill="rgba(28,22,46,0.7)" fontSize="12" fontWeight="500">Audit log</text>
          </g>
        </svg>
      </div>
    </CsSection>
  )
}
