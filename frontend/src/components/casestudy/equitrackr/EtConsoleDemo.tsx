// frontend/src/components/casestudy/equitrackr/EtConsoleDemo.tsx
'use client'

import { useEffect, useState } from 'react'
import {
  Play, Pause, RotateCcw, ScanLine, Droplets, LayoutDashboard,
  Inbox, SprayCan, ArrowLeftRight, Check, AlertTriangle, ArrowRight,
} from 'lucide-react'
import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion'
import { CsSection, Module } from '../bits'

const STEPS = [
  { label: 'Scan asset', caption: 'A porter scans pump IP-1140 at Imaging on pickup — the only input the workflow needs.' },
  { label: 'State transition', caption: 'The scan resolves to a check-out: IP-1140 moves Available → In Use, assigned to ICU request #4821.' },
  { label: 'Visibility update', caption: 'Every surface re-reads the registry: Imaging’s available count drops, the request shows assigned with an ETA.' },
  { label: 'Coordination workflow', caption: 'On delivery the request closes; on return a cleaning task is queued, and Imaging falling below par raises a re-balance suggestion.' },
]

function Qr({ active }: { active: boolean }) {
  const cells = [1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1]
  return (
    <div className={`grid grid-cols-4 gap-[3px] rounded-md bg-white p-1.5 ghair transition-shadow ${active ? 'soft-shadow' : ''}`}>
      {cells.map((on, i) => (
        <span key={i} className="h-2 w-2 rounded-[1px]" style={{ background: on ? 'var(--plum)' : 'transparent' }} />
      ))}
    </div>
  )
}

function Zone({ title, active, children }: { title: string; active: boolean; children: React.ReactNode }) {
  return (
    <div
      className="flex-1 rounded-xl p-4 transition-all duration-300"
      style={{
        background: active ? 'var(--plum-soft)' : 'var(--cream-2)',
        border: `1px solid ${active ? 'rgba(109,40,217,0.25)' : 'var(--line)'}`,
      }}
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em]" style={{ color: active ? 'var(--plum)' : 'var(--ink-muted)' }}>{title}</p>
      <div className="mt-3">{children}</div>
    </div>
  )
}

export function EtConsoleDemo() {
  const reduced = usePrefersReducedMotion()
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(true)

  useEffect(() => { if (reduced) setPlaying(false) }, [reduced])
  useEffect(() => {
    if (!playing) return
    const id = setInterval(() => setStep((s) => (s + 1) % 4), 2000)
    return () => clearInterval(id)
  }, [playing])

  const assetState = step >= 1 ? 'In Use' : 'Available'
  const assetColor = step >= 1 ? 'var(--plum)' : 'var(--green)'
  const pumps = step >= 2 ? 5 : 6
  const reqStatus = step >= 3 ? 'Delivered · closed' : step >= 2 ? 'Assigned · ETA ~6 min' : 'Open'
  const showCoord = step >= 3

  return (
    <CsSection
      id="console"
      eyebrow="03 · Operational console"
      title="Scan → transition → visibility → coordination."
      intro="One scan, four effects. Step through a real request being fulfilled — or let it run."
      footnote="Interactive prototype · representative workflow & figures."
    >
      <Module className="!p-0">
        {/* controls */}
        <div className="flex flex-wrap items-center gap-2 px-5 py-4" style={{ borderBottom: '1px solid var(--line)' }}>
          <button
            onClick={() => setPlaying((p) => !p)}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-white transition-transform hover:-translate-y-0.5"
            style={{ background: 'var(--plum)' }}
          >
            {playing ? <Pause size={13} /> : <Play size={13} />}
            {playing ? 'Pause' : 'Run loop'}
          </button>
          <button
            onClick={() => { setStep(0); setPlaying(false) }}
            className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-ink-soft ghair transition-colors hover:text-ink"
          >
            <RotateCcw size={13} /> Reset
          </button>
          <div className="ml-auto flex flex-wrap gap-1.5">
            {STEPS.map((s, i) => (
              <button
                key={s.label}
                onClick={() => { setStep(i); setPlaying(false) }}
                className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-medium transition-colors"
                style={{ background: i === step ? 'var(--plum-soft)' : 'transparent', color: i === step ? 'var(--plum)' : 'var(--ink-muted)' }}
              >
                <span className="grid h-4 w-4 place-items-center rounded-full text-[9px] font-bold" style={{ background: i === step ? 'var(--plum)' : 'rgba(28,22,46,0.10)', color: i === step ? '#fff' : 'var(--ink-muted)' }}>{i + 1}</span>
                <span className="hidden sm:inline">{s.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* progress */}
        <div className="h-1 w-full bg-[var(--cream-2)]">
          <div className="h-full rounded-r-full transition-all duration-500" style={{ width: `${((step + 1) / 4) * 100}%`, background: 'var(--plum)' }} />
        </div>

        {/* stage */}
        <div className="grid grid-cols-1 gap-3 p-5 lg:grid-cols-3">
          {/* zone 1 — scan */}
          <Zone title="The scan" active={step === 0}>
            <div className="flex items-center gap-3">
              <Qr active={step === 0} />
              <div className="flex items-center gap-1.5 text-ink-muted">
                <ScanLine size={16} className={step === 0 ? 'text-plum' : ''} />
                <ArrowRight size={13} />
              </div>
              <div className="rounded-lg bg-white p-2.5 ghair">
                <p className="flex items-center gap-1.5 text-[12px] font-semibold text-ink">
                  <Droplets size={13} style={{ color: 'var(--plum)' }} /> IP-1140
                </p>
                <p className="mt-0.5 text-[11px] text-ink-muted">Infusion pump · Imaging</p>
              </div>
            </div>
          </Zone>

          {/* zone 2 — registry record */}
          <Zone title="Registry record" active={step === 1}>
            <div className="rounded-lg bg-white p-3 ghair">
              <div className="flex items-center justify-between">
                <p className="text-[12px] font-semibold text-ink">IP-1140 · infusion pump</p>
                <span className="rounded-full px-2 py-0.5 text-[10px] font-semibold text-white transition-colors duration-300" style={{ background: assetColor }}>{assetState}</span>
              </div>
              <div className="mt-2 space-y-1">
                <p className="text-[11px] text-ink-muted">08:50 · available · Imaging store</p>
                {step >= 1 && <p className="anim-rise text-[11px] font-medium text-ink">09:12 · checked out · transport → ICU · req #4821</p>}
                {step >= 3 && <p className="anim-rise text-[11px] text-ink-muted">09:38 · returned · scanned at ICU</p>}
              </div>
            </div>
          </Zone>

          {/* zone 3 — boards & coordination */}
          <Zone title="Boards & coordination" active={step >= 2}>
            <div className="space-y-2">
              <div className="flex items-center gap-2 rounded-lg bg-white p-2.5 ghair">
                <LayoutDashboard size={14} style={{ color: 'var(--plum)' }} />
                <span className="text-[11px] text-ink-soft">Imaging · pumps available</span>
                <span className="ml-auto text-[12px] font-semibold text-ink">{pumps}</span>
                {step >= 2 && <span className="anim-rise rounded px-1 text-[10px] font-bold text-white" style={{ background: 'var(--coral)' }}>−1</span>}
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-white p-2.5 ghair">
                <Inbox size={14} style={{ color: 'var(--plum)' }} />
                <span className="text-[11px] text-ink-soft">Req #4821 · ICU</span>
                <span className="ml-auto text-[11px] font-medium" style={{ color: step >= 3 ? 'var(--green)' : step >= 2 ? 'var(--plum)' : 'var(--ink-muted)' }}>{reqStatus}</span>
              </div>
              {showCoord ? (
                <>
                  <div className="anim-rise flex items-center gap-2 rounded-lg p-2.5" style={{ background: 'rgba(245,158,11,0.12)' }}>
                    <SprayCan size={14} style={{ color: 'var(--amber)' }} />
                    <span className="text-[11px] font-medium text-ink">Cleaning queued · IP-1140</span>
                    <span className="ml-auto inline-flex items-center gap-1 text-[10px] font-semibold" style={{ color: 'var(--amber)' }}><Check size={11} /> EVS notified</span>
                  </div>
                  <div className="anim-rise flex items-center gap-2 rounded-lg p-2.5" style={{ background: 'rgba(248,112,96,0.10)' }}>
                    <ArrowLeftRight size={14} style={{ color: 'var(--coral)' }} />
                    <span className="text-[11px] font-medium text-ink">Imaging · 5 vs par 6</span>
                    <span className="ml-auto inline-flex items-center gap-1 text-[10px] font-semibold" style={{ color: 'var(--coral)' }}><AlertTriangle size={11} /> suggest +2</span>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-2 rounded-lg bg-white p-2.5 ghair">
                  <Check size={14} style={{ color: 'var(--green)' }} />
                  <span className="text-[11px] text-ink-muted">Pool within par · no action</span>
                </div>
              )}
            </div>
          </Zone>
        </div>

        {/* caption */}
        <div className="px-5 py-4" style={{ borderTop: '1px solid var(--line)' }}>
          <p className="text-[13px] leading-relaxed text-ink-soft">
            <span className="font-semibold text-ink">{step + 1}. {STEPS[step].label} — </span>
            {STEPS[step].caption}
          </p>
        </div>
      </Module>
    </CsSection>
  )
}
