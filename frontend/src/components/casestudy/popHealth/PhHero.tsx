// frontend/src/components/casestudy/popHealth/PhHero.tsx
import Link from 'next/link'
import { ArrowRight, ArrowLeft, Globe, Database, Brain, Zap } from 'lucide-react'

function PhSystemMap() {
  // 4 small icon nodes (Globe → Database → Brain → Zap) connected by a faint plum signal line.
  // Inline SVG, no separate file (per spec §11.2).
  const W = 460
  const H = 200
  const Y = H / 2
  const NODES = [
    { Icon: Globe, label: 'Sources', x: 50 },
    { Icon: Database, label: 'Features', x: 180 },
    { Icon: Brain, label: 'Forecaster', x: 310 },
    { Icon: Zap, label: 'Inference', x: 410, primary: true },
  ]
  return (
    <div className="relative mx-auto w-full max-w-[460px]">
      <div className="relative w-full" style={{ paddingBottom: `${(H / W) * 100}%` }}>
        <div className="absolute inset-0">
          <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
            {/* connecting line */}
            <path
              d={`M ${NODES[0].x} ${Y} L ${NODES[NODES.length - 1].x} ${Y}`}
              stroke="var(--plum)"
              strokeWidth={1.6}
              strokeOpacity={0.35}
              strokeLinecap="round"
            />
            {NODES.map((n) => (
              <circle key={n.label} cx={n.x} cy={Y} r={3.2} fill="var(--plum)" opacity={n.primary ? 1 : 0.6} />
            ))}
          </svg>

          {/* glow */}
          <div
            className="absolute left-1/2 top-1/2 h-32 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
            style={{ background: 'radial-gradient(closest-side, rgba(124,58,237,0.18), transparent)' }}
          />

          {/* node cards */}
          {NODES.map((n) => (
            <div
              key={n.label}
              className="absolute flex h-[60px] w-[88px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-2xl bg-white px-2 ghair soft-shadow-sm"
              style={{
                left: `${(n.x / W) * 100}%`,
                top: '50%',
                borderColor: n.primary ? 'rgba(109,40,217,0.35)' : undefined,
                background: n.primary ? 'var(--plum-soft)' : undefined,
              }}
            >
              <n.Icon size={18} style={{ color: 'var(--plum)' }} strokeWidth={1.9} />
              <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-muted">
                {n.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function PhHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="hero-wash pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-[1180px] px-6 pb-14 pt-12 lg:pt-16">
        <Link
          href="/work"
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
        >
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
          All work
        </Link>

        <div className="mt-6 grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <span className="anim-rise inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-soft ghair">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--plum)' }} />
              Applied AI · Population Health
            </span>

            <h1
              className="anim-rise mt-5 font-display text-[2.5rem] font-extrabold leading-[1.06] text-ink sm:text-[3rem] lg:text-[3.4rem]"
              style={{ animationDelay: '60ms' }}
            >
              Population-Health
              <br />
              <span className="grad-plum-text">Intelligence Platform</span>
            </h1>

            <p
              className="anim-rise mt-5 max-w-[40ch] text-[1.08rem] leading-relaxed text-ink-soft"
              style={{ animationDelay: '120ms' }}
            >
              Calibrated life-expectancy forecasts for 193 nations — with the signals driving each trajectory.
            </p>

            <div className="anim-rise mt-7 flex flex-wrap items-center gap-3" style={{ animationDelay: '180ms' }}>
              <Link
                href="#demo"
                className="group inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white soft-shadow transition-transform hover:-translate-y-0.5"
                style={{ background: 'var(--plum)' }}
              >
                See the forecast
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="#problem"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-ink ghair-2 transition-colors hover:bg-[var(--cream-2)]"
              >
                Start from the problem
              </Link>
            </div>
          </div>

          <div className="anim-rise" style={{ animationDelay: '260ms' }}>
            <PhSystemMap />
          </div>
        </div>
      </div>
    </section>
  )
}
