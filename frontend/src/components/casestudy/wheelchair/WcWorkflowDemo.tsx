// frontend/src/components/casestudy/wheelchair/WcWorkflowDemo.tsx
'use client'

import { useEffect, useState } from 'react'
import {
  Play, Pause, RotateCcw, ScanLine, Accessibility, LayoutDashboard,
  History, Wrench, ArrowLeftRight, Check, AlertTriangle, ArrowRight,
} from 'lucide-react'
import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion'
import { CsSection, Module } from '../bits'

const STEPS = [
  { label: 'Scan QR', icon: ScanLine, caption: 'A coordinator scans the chair on return — the only input the system needs.' },
  { label: 'State update', icon: Accessibility, caption: 'The scan resolves to a transition. WC-2207 moves from In Use to Returned, with a timestamp.' },
  { label: 'Operational visibility', icon: LayoutDashboard, caption: 'Every downstream surface re-reads from the registry: counts, audit trail, site boards.' },
  { label: 'Lifecycle coordination', icon: Wrench, caption: 'Thresholds fire automatically — a cleaning flag here, a transfer suggestion there.' },
]

function Qr({ active }: { active: boolean }) {
  const cells = [1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0]
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
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em]" style={{ color: active ? 'var(--plum)' : 'var(--ink-muted)' }}>
        {title}
      </p>
      <div className="mt-3">{children}</div>
    </div>
  )
}

export function WcWorkflowDemo() {
  const reduced = usePrefersReducedMotion()
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(true)

  useEffect(() => {
    if (reduced) setPlaying(false)
  }, [reduced])

  useEffect(() => {
    if (!playing) return
    const id = setInterval(() => setStep((s) => (s + 1) % 4), 1900)
    return () => clearInterval(id)
  }, [playing])

  const state = step >= 1 ? 'Returned' : 'In Use'
  const stateColor = step >= 1 ? 'var(--blue)' : 'var(--plum)'
  const available = step >= 2 ? 42 : 41
  const showFlag = step >= 3

  return (
    <CsSection
      id="workflow"
      eyebrow="03 · Operational workflow"
      title="Watch a scan move the whole system."
      intro="One gesture, four effects. Step through it — or let it run."
      footnote="Interactive prototype · representative state model."
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
            <RotateCcw size={13} />
            Reset
          </button>
          <div className="ml-auto flex flex-wrap gap-1.5">
            {STEPS.map((s, i) => (
              <button
                key={s.label}
                onClick={() => { setStep(i); setPlaying(false) }}
                className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-medium transition-colors"
                style={{
                  background: i === step ? 'var(--plum-soft)' : 'transparent',
                  color: i === step ? 'var(--plum)' : 'var(--ink-muted)',
                }}
              >
                <span
                  className="grid h-4 w-4 place-items-center rounded-full text-[9px] font-bold"
                  style={{ background: i === step ? 'var(--plum)' : 'rgba(28,22,46,0.10)', color: i === step ? '#fff' : 'var(--ink-muted)' }}
                >
                  {i + 1}
                </span>
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
          <Zone title="The gesture" active={step === 0}>
            <div className="flex items-center gap-3">
              <Qr active={step === 0} />
              <div className="flex items-center gap-1.5 text-ink-muted">
                <ScanLine size={16} className={step === 0 ? 'text-plum' : ''} />
                <ArrowRight size={13} />
              </div>
              <div className="rounded-lg bg-white p-2.5 ghair">
                <p className="flex items-center gap-1.5 text-[12px] font-semibold text-ink">
                  <Accessibility size={13} style={{ color: 'var(--plum)' }} /> WC-2207
                </p>
                <p className="mt-0.5 text-[11px] text-ink-muted">Site B · floor 3</p>
              </div>
            </div>
          </Zone>

          {/* zone 2 — registry record */}
          <Zone title="Registry record" active={step === 1}>
            <div className="rounded-lg bg-white p-3 ghair">
              <div className="flex items-center justify-between">
                <p className="text-[12px] font-semibold text-ink">WC-2207</p>
                <span
                  className="rounded-full px-2 py-0.5 text-[10px] font-semibold text-white transition-colors duration-300"
                  style={{ background: stateColor }}
                >
                  {state}
                </span>
              </div>
              <div className="mt-2 space-y-1">
                <p className="text-[11px] text-ink-muted">13:40 · in use · transport, floor 3</p>
                {step >= 1 && (
                  <p className="anim-rise text-[11px] font-medium text-ink">14:02 · returned · scanned at Site B</p>
                )}
              </div>
            </div>
          </Zone>

          {/* zone 3 — downstream */}
          <Zone title="Reads downstream" active={step >= 2}>
            <div className="space-y-2">
              <div className="flex items-center gap-2 rounded-lg bg-white p-2.5 ghair">
                <LayoutDashboard size={14} style={{ color: 'var(--plum)' }} />
                <span className="text-[11px] text-ink-soft">Available · Site B</span>
                <span className="ml-auto text-[12px] font-semibold text-ink">{available}</span>
                {step >= 2 && <span className="anim-rise rounded px-1 text-[10px] font-bold text-white" style={{ background: 'var(--green)' }}>+1</span>}
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-white p-2.5 ghair">
                <History size={14} style={{ color: 'var(--plum)' }} />
                <span className="text-[11px] text-ink-soft">Audit trail</span>
                <span className="ml-auto text-[11px] text-ink-muted">{step >= 2 ? '14:02 · returned' : 'synced'}</span>
              </div>
              {showFlag ? (
                <>
                  <div className="anim-rise flex items-center gap-2 rounded-lg p-2.5" style={{ background: 'rgba(245,158,11,0.12)' }}>
                    <Wrench size={14} style={{ color: 'var(--amber)' }} />
                    <span className="text-[11px] font-medium text-ink">Returns since clean: 8</span>
                    <span className="ml-auto inline-flex items-center gap-1 text-[10px] font-semibold" style={{ color: 'var(--amber)' }}>
                      <AlertTriangle size={11} /> flag for cleaning
                    </span>
                  </div>
                  <div className="anim-rise flex items-center gap-2 rounded-lg p-2.5" style={{ background: 'rgba(248,112,96,0.10)' }}>
                    <ArrowLeftRight size={14} style={{ color: 'var(--coral)' }} />
                    <span className="text-[11px] font-medium text-ink">Site D · −6 below par</span>
                    <span className="ml-auto text-[10px] font-semibold" style={{ color: 'var(--coral)' }}>suggest transfer ×4</span>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-2 rounded-lg bg-white p-2.5 ghair">
                  <Check size={14} style={{ color: 'var(--green)' }} />
                  <span className="text-[11px] text-ink-muted">No thresholds tripped</span>
                </div>
              )}
            </div>
          </Zone>
        </div>

        {/* caption */}
        <div className="border-t px-5 py-4 ghair-t">
          <p className="text-[13px] leading-relaxed text-ink-soft">
            <span className="font-semibold text-ink">{step + 1}. {STEPS[step].label} — </span>
            {STEPS[step].caption}
          </p>
        </div>
      </Module>
    </CsSection>
  )
}
