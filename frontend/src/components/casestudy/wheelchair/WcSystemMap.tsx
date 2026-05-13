// frontend/src/components/casestudy/wheelchair/WcSystemMap.tsx
import { Accessibility } from 'lucide-react'

const W = 560
const H = 380

const SITES = [
  { key: 'a', label: 'Site A', count: 214, x: 8,   y: 8,   color: 'var(--plum)',  to: [118, 44] as const, from: [200, 146] as const },
  { key: 'b', label: 'Site B', count: 198, x: 442, y: 8,   color: 'var(--blue)',  to: [442, 44] as const, from: [360, 146] as const },
  { key: 'c', label: 'Site C', count: 173, x: 8,   y: 308, color: 'var(--green)', to: [118, 336] as const, from: [200, 234] as const },
  { key: 'd', label: 'Site D', count: 208, x: 442, y: 308, color: 'var(--coral)', to: [442, 336] as const, from: [360, 234] as const },
]

const CARD_W = 110
const CARD_H = 64

export function WcSystemMap() {
  return (
    <div className="relative mx-auto w-full max-w-[560px]">
      <div className="relative w-full" style={{ paddingBottom: `${(H / W) * 100}%` }}>
        <div className="absolute inset-0">
          <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
            {SITES.map((s) => {
              const mx = (s.from[0] + s.to[0]) / 2
              return (
                <g key={s.key}>
                  <path
                    d={`M ${s.from[0]} ${s.from[1]} C ${mx} ${s.from[1]}, ${s.to[0]} ${(s.from[1] + s.to[1]) / 2}, ${s.to[0]} ${s.to[1]}`}
                    stroke={s.color}
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeOpacity={0.4}
                    className="flow-line"
                  />
                  <circle cx={s.from[0]} cy={s.from[1]} r={3.2} fill={s.color} opacity={0.8} />
                  <circle cx={s.to[0]} cy={s.to[1]} r={3.2} fill={s.color} opacity={0.8} />
                </g>
              )
            })}
          </svg>

          {/* glow */}
          <div
            className="absolute left-1/2 top-1/2 h-44 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
            style={{ background: 'radial-gradient(closest-side, rgba(124,58,237,0.16), transparent)' }}
          />

          {/* registry */}
          <div className="anim-drift absolute left-1/2 top-1/2 flex h-[110px] w-[170px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-[18px] bg-white ghair-2 soft-shadow-lg">
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-muted">Operational</span>
            <span className="font-display text-xl font-extrabold text-plum">Registry</span>
            <span className="mt-1.5 inline-flex items-center gap-1.5 text-[11px] text-ink-soft">
              <span className="anim-pulse h-1.5 w-1.5 rounded-full" style={{ background: 'var(--green)' }} />
              793 assets · synced
            </span>
          </div>

          {/* site cards */}
          {SITES.map((s) => (
            <div
              key={s.key}
              className="anim-float absolute flex flex-col justify-center rounded-2xl bg-white px-3 py-2 ghair soft-shadow-sm"
              style={{
                width: CARD_W,
                height: CARD_H,
                left: `${(s.x / W) * 100}%`,
                top: `${(s.y / H) * 100}%`,
                animationDelay: `${(SITES.indexOf(s) % 4) * 0.7}s`,
              }}
            >
              <span className="text-[11px] font-semibold text-ink">{s.label}</span>
              <span className="mt-0.5 inline-flex items-center gap-1.5 text-[11px] text-ink-muted">
                <Accessibility size={12} style={{ color: s.color }} strokeWidth={2} />
                {s.count} tracked
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
