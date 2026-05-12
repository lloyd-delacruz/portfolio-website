import { ArrowRight, ChevronRight, Scan, Check } from 'lucide-react'
import { LiveDot, MonoLabel } from '@/components/home/primitives'

type SiteTile = { id: string; name: string; available: number; inUse: number }

const SITES: SiteTile[] = [
  { id: 'vgh',        name: 'VGH',         available: 187, inUse: 134 },
  { id: 'ubc',        name: 'UBC',         available: 162, inUse: 119 },
  { id: 'lions_gate', name: 'Lions Gate',  available: 144, inUse: 102 },
  { id: 'richmond',   name: 'Richmond',    available: 138, inUse: 96  },
]

export function CoordinationPanel() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr]">
      {/* Left: operational dashboard */}
      <div className="p-5 md:p-8 border-b md:border-b-0 md:border-r border-surface-subtle">
        <div className="mb-5 flex items-center justify-between">
          <MonoLabel className="text-surface-fg-secondary">multi-site operations</MonoLabel>
          <span className="inline-flex items-center gap-2">
            <LiveDot pulse={false} />
            <MonoLabel className="text-gold">all sites · live</MonoLabel>
          </span>
        </div>

        <ul className="grid grid-cols-2 gap-3">
          {SITES.map((s) => (
            <li key={s.id} className="rounded-lg border border-surface-subtle bg-surface-card p-4 hover:border-gold/30 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-surface-fg">{s.name}</span>
                <LiveDot pulse={false} />
              </div>
              <dl className="grid grid-cols-2 gap-y-1.5 gap-x-4">
                <dt className="font-mono text-[10px] uppercase tracking-wide-label text-surface-fg-muted">available</dt>
                <dd className="font-mono text-sm text-surface-fg text-right">{s.available}</dd>
                <dt className="font-mono text-[10px] uppercase tracking-wide-label text-surface-fg-muted">in use</dt>
                <dd className="font-mono text-sm text-surface-fg-secondary text-right">{s.inUse}</dd>
              </dl>
            </li>
          ))}
        </ul>

        <p className="mt-5 font-mono text-[10px] uppercase tracking-wide-label text-surface-fg-muted">
          shared registry · same state, different surfaces per role
        </p>
      </div>

      {/* Right: phone mock — mobile workflow */}
      <div className="p-5 md:p-8 bg-surface-elevated/40">
        <MonoLabel className="block mb-4 text-surface-fg-secondary">mobile workflow · transport coordinator</MonoLabel>

        <div className="mx-auto w-full max-w-[260px] rounded-[28px] border border-surface-strong/60 bg-surface-canvas p-3 shadow-[0_0_40px_rgba(0,0,0,0.4)]">
          <div className="rounded-[20px] bg-surface-card p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-[10px] text-surface-fg-muted">14:32</span>
              <MonoLabel className="text-gold">role · transport</MonoLabel>
            </div>

            <div className="rounded-lg border border-surface-subtle bg-surface-canvas p-3 mb-3">
              <div className="font-mono text-xs text-surface-fg">EQ-VGH-0287</div>
              <div className="text-[11px] text-surface-fg-secondary mt-0.5">Sunrise Quickie 2</div>
              <div className="font-mono text-[10px] text-surface-fg-muted mt-0.5">VGH · Floor 3W</div>
              <span className="mt-2 inline-flex items-center rounded-full border border-gold/40 bg-gold/10 px-2 py-0.5 font-mono text-[10px] text-gold">
                in use
              </span>
            </div>

            <button
              type="button"
              className="w-full mb-2 inline-flex items-center justify-between rounded-md border border-surface-strong/60 bg-surface-elevated px-3 py-2 text-xs text-surface-fg hover:border-gold/30 transition-colors"
            >
              <span className="inline-flex items-center gap-2">
                <ArrowRight className="h-3.5 w-3.5" />
                Transfer to UBC
              </span>
              <ChevronRight className="h-3.5 w-3.5 text-surface-fg-muted" />
            </button>

            <button
              type="button"
              className="w-full mb-2 inline-flex items-center justify-between rounded-md border border-surface-subtle bg-surface-card px-3 py-2 text-xs text-surface-fg-secondary hover:border-gold/30 hover:text-surface-fg transition-colors"
            >
              <span className="inline-flex items-center gap-2">
                <Scan className="h-3.5 w-3.5" />
                Scan return
              </span>
              <ChevronRight className="h-3.5 w-3.5 text-surface-fg-muted" />
            </button>

            <button
              type="button"
              className="w-full inline-flex items-center justify-between rounded-md border border-signal-live/40 bg-signal-live/10 px-3 py-2 text-xs text-signal-live"
            >
              <span className="inline-flex items-center gap-2">
                <Check className="h-3.5 w-3.5" />
                Confirm handoff
              </span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <p className="mt-4 font-mono text-[10px] uppercase tracking-wide-label text-surface-fg-muted text-center">
          maintenance lead&apos;s view would surface different actions
        </p>
      </div>
    </div>
  )
}
