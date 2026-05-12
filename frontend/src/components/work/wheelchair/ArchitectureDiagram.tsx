import { MonoLabel } from '@/components/home/primitives'

const ACTORS = ['frontline_staff', 'transport', 'maintenance', 'site_coordinator']
const SURFACES = ['operational_dashboard', 'mobile_scanner', 'lifecycle_view']

export function ArchitectureDiagram() {
  return (
    <div className="p-6 md:p-10" role="img" aria-label="System architecture: actors and surfaces connected through the workflow_core registry">
      <div className="mb-6 flex items-center justify-between">
        <MonoLabel className="text-surface-fg-secondary">system architecture</MonoLabel>
        <MonoLabel className="text-surface-fg-muted">workflow_core · v3.x</MonoLabel>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-10 items-center">
        {/* Left actors */}
        <ul className="space-y-3">
          {ACTORS.map((a) => (
            <li
              key={a}
              className="rounded-md border border-surface-subtle bg-surface-card px-3 py-2 font-mono text-xs text-surface-fg-secondary"
            >
              {a}
            </li>
          ))}
        </ul>

        {/* Centre core */}
        <div className="flex flex-col items-center gap-3">
          <svg
            viewBox="0 0 120 120"
            className="h-32 w-32"
            aria-hidden="true"
          >
            <defs>
              <radialGradient id="ad-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="hsl(var(--accent-gold))" stopOpacity="0.4" />
                <stop offset="100%" stopColor="hsl(var(--accent-gold))" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="60" cy="60" r="48" fill="url(#ad-glow)" />
            <circle
              cx="60"
              cy="60"
              r="22"
              fill="hsl(var(--surface-canvas))"
              stroke="hsl(var(--accent-gold) / 0.85)"
              strokeWidth="1.2"
            />
            <text
              x="60"
              y="63"
              textAnchor="middle"
              fontSize="9"
              fontFamily="var(--font-geist-mono), monospace"
              fill="hsl(var(--accent-gold))"
              letterSpacing="0.04"
            >
              workflow_core
            </text>
          </svg>
          <ul className="flex flex-col items-center gap-1 font-mono text-[10px] uppercase tracking-wide-label text-surface-fg-muted">
            <li>scan_event</li>
            <li>state_change</li>
            <li>assignment</li>
            <li>audit_trail</li>
          </ul>
        </div>

        {/* Right surfaces */}
        <ul className="space-y-3">
          {SURFACES.map((s) => (
            <li
              key={s}
              className="rounded-md border border-surface-subtle bg-surface-card px-3 py-2 font-mono text-xs text-surface-fg-secondary"
            >
              {s}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
