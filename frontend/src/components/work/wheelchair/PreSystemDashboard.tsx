import { MonoLabel } from '@/components/home/primitives'

const SITES = ['vgh', 'ubc', 'lions_gate', 'richmond'] as const

export function PreSystemDashboard() {
  return (
    <div className="p-6 md:p-8" role="img" aria-label="Pre-system state: equipment locations unknown across four hospitals">
      <div className="flex items-center justify-between mb-6">
        <MonoLabel className="text-surface-fg-secondary">operational console · pre-system</MonoLabel>
        <MonoLabel className="text-surface-fg-muted">unknown · 100%</MonoLabel>
      </div>

      <ul className="grid grid-cols-2 gap-3">
        {SITES.map((site) => (
          <li
            key={site}
            className="rounded-lg border border-surface-subtle bg-surface-card p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <MonoLabel className="text-surface-fg-secondary">{site}</MonoLabel>
              <span className="font-mono text-[10px] text-surface-fg-muted">timestamp · —</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {Array.from({ length: 6 }).map((_, i) => (
                <span
                  key={i}
                  className="inline-flex h-6 w-10 items-center justify-center rounded-md border border-surface-subtle text-surface-fg-muted font-mono text-xs"
                >
                  ?
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
