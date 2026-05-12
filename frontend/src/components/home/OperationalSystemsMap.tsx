// frontend/src/components/home/OperationalSystemsMap.tsx
import { SystemsMap } from './SystemsMap'
import { LiveDot, MonoLabel } from './primitives'

export function OperationalSystemsMap() {
  return (
    <div className="rounded-2xl border border-surface-subtle bg-surface-card p-5 md:p-6">
      <div className="mb-1">
        <MonoLabel className="text-gold">operational systems map</MonoLabel>
      </div>
      <p className="text-sm text-surface-fg-secondary">
        Real-time coordination across the network
      </p>

      <div className="mt-4 aspect-[5/4] w-full">
        <SystemsMap className="h-full" />
      </div>

      <div className="mt-4 flex items-center gap-2 border-t border-surface-subtle pt-3">
        <LiveDot />
        <MonoLabel>live state synchronization · last updated 14:32:08</MonoLabel>
      </div>
    </div>
  )
}
