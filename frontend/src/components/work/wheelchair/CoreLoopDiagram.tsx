'use client'

import { motion } from 'framer-motion'
import { Camera, RefreshCw, Database, LayoutDashboard } from 'lucide-react'
import { useInViewPause } from '@/lib/hooks/useInViewPause'
import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion'
import { MonoLabel } from '@/components/home/primitives'

type Stage = {
  id: string
  n: string
  icon: typeof Camera
  title: string
  sub: string
  detail: string
}

const STAGES: Stage[] = [
  { id: 'scan',     n: '1', icon: Camera,          title: 'Scan the chair',   sub: 'QR sticker · mobile camera',     detail: 'the workflow gesture — one tap by frontline staff' },
  { id: 'state',    n: '2', icon: RefreshCw,       title: 'State changes',    sub: 'in_use → returned → cleaning',   detail: 'the real-world event becomes a recorded transition' },
  { id: 'registry', n: '3', icon: Database,        title: 'Registry updates', sub: 'workflow_core · single truth',   detail: 'every change timestamped + audited, all four sites' },
  { id: 'surfaces', n: '4', icon: LayoutDashboard, title: 'Dashboards read',  sub: 'role-shaped views',              detail: 'everyone downstream sees the same state, their way' },
]

const READERS = [
  { role: 'transport',   sees: 'what to move next' },
  { role: 'maintenance', sees: 'what is overdue' },
  { role: 'coordinator', sees: 'what is short, where' },
]

export function CoreLoopDiagram() {
  const reduced = usePrefersReducedMotion()
  const { ref, inView } = useInViewPause<HTMLDivElement>()
  const animate = !reduced && inView

  return (
    <div
      ref={ref}
      className="rounded-2xl border border-surface-subtle bg-surface-card p-6 md:p-10"
      role="img"
      aria-label="The core loop: a QR scan changes a chair's state, the workflow_core registry records it, and every role dashboard reads the updated state downstream."
    >
      <div className="mb-8 flex items-center justify-between">
        <MonoLabel className="text-surface-fg-secondary">the core loop</MonoLabel>
        <MonoLabel className="text-surface-fg-muted">scan → state → registry → dashboards</MonoLabel>
      </div>

      {/* Pipeline */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] md:items-stretch">
        {STAGES.map((s, i) => (
          <div key={s.id} className="contents">
            <div className="relative overflow-hidden rounded-xl border border-surface-subtle bg-surface-canvas p-4 md:p-5">
              {animate && (
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0, 1, 0, 0] }}
                  transition={{
                    duration: STAGES.length * 1.4,
                    times: [0, i / STAGES.length, (i + 0.5) / STAGES.length, (i + 1) / STAGES.length, 1],
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              )}
              <div className="relative flex items-center gap-2.5">
                <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-gold/10 font-mono text-xs text-gold">
                  {s.n}
                </span>
                <s.icon className="h-4 w-4 text-surface-fg-secondary" aria-hidden />
              </div>
              <div className="relative mt-3 text-sm font-medium text-surface-fg">{s.title}</div>
              <div className="relative mt-1 font-mono text-[10px] uppercase tracking-wide-label text-surface-fg-muted">
                {s.sub}
              </div>
              <div className="relative mt-3 text-[11px] leading-relaxed text-surface-fg-secondary">
                {s.detail}
              </div>
            </div>

            {/* Connector */}
            {i < STAGES.length - 1 && (
              <div aria-hidden className="flex items-center justify-center" >
                {/* horizontal on md+ */}
                <div className="relative hidden h-px w-8 bg-white/[0.14] md:block lg:w-12">
                  {animate && (
                    <motion.span
                      className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-gold shadow-[0_0_8px_hsl(var(--accent-gold)/0.7)]"
                      initial={{ left: '-10%', opacity: 0 }}
                      animate={{ left: ['-10%', '110%'], opacity: [0, 1, 1, 0] }}
                      transition={{
                        duration: 1.4,
                        delay: i * 1.4,
                        repeat: Infinity,
                        repeatDelay: (STAGES.length - 1) * 1.4,
                        ease: 'linear',
                      }}
                    />
                  )}
                </div>
                {/* vertical on mobile */}
                <div className="my-1 h-5 w-px bg-white/[0.14] md:hidden" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Downstream readers branching off the registry */}
      <div className="mt-8 border-t border-surface-subtle pt-6">
        <MonoLabel className="block mb-3 text-surface-fg-muted">downstream of the registry · same state, different surface</MonoLabel>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {READERS.map((r) => (
            <li key={r.role} className="rounded-lg border border-surface-subtle bg-surface-canvas px-4 py-3">
              <div className="font-mono text-[10px] uppercase tracking-wide-label text-gold">{r.role}</div>
              <div className="mt-1 text-[13px] text-surface-fg-secondary">sees {r.sees}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
