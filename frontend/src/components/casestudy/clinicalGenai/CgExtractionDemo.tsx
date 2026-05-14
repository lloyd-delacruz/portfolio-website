// frontend/src/components/casestudy/clinicalGenai/CgExtractionDemo.tsx
'use client'

import { useEffect, useState } from 'react'
import { Play, Pause, RotateCcw, FileText, Braces, GitBranch, CheckCircle2, AlertCircle, XCircle } from 'lucide-react'
import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion'
import { CsSection, Module } from '../bits'
import {
  NOTES,
  FIELD_KEYS,
  FIELD_LABELS,
  type SyntheticNote,
  type FieldKey,
  type ValidationStatus,
} from '@/components/work/clinical-genai/data'

const STEPS = [
  { label: 'Note',       icon: FileText,  caption: 'A dictated rehab note arrives via the intake form. Free text, dictation patterns, abbreviations.' },
  { label: 'Extraction', icon: Braces,    caption: 'The LLM emits a schema-constrained JSON object. Each field carries its own confidence score.' },
  { label: 'Routing',    icon: GitBranch, caption: 'Validation rules and confidence thresholds decide whether the record goes to storage or to the review queue.' },
]

function Zone({ title, active, children }: { title: string; active: boolean; children: React.ReactNode }) {
  return (
    <div
      className="flex-1 rounded-xl p-4 transition-all duration-300"
      style={{
        background: active ? 'var(--plum-soft)' : 'var(--cream-2)',
        border: `1px solid ${active ? 'rgba(109,40,217,0.25)' : 'var(--line)'}`,
      }}
    >
      <p
        className="text-[10px] font-semibold uppercase tracking-[0.14em]"
        style={{ color: active ? 'var(--plum)' : 'var(--ink-muted)' }}
      >
        {title}
      </p>
      <div className="mt-3">{children}</div>
    </div>
  )
}

function confidenceTone(c: number): 'green' | 'amber' | 'coral' {
  if (c >= 0.85) return 'green'
  if (c >= 0.6) return 'amber'
  return 'coral'
}

const TONE_HEX: Record<'green' | 'amber' | 'coral', string> = {
  green: 'var(--green)',
  amber: 'var(--amber)',
  coral: 'var(--coral)',
}

const STATUS_ICON: Record<ValidationStatus, typeof CheckCircle2> = {
  pass: CheckCircle2,
  warn: AlertCircle,
  fail: XCircle,
}

const STATUS_TONE: Record<ValidationStatus, 'green' | 'amber' | 'coral'> = {
  pass: 'green',
  warn: 'amber',
  fail: 'coral',
}

function formatFieldValue(value: SyntheticNote['extracted'][FieldKey]['value']): string {
  if (value === null) return '∅'
  if (typeof value === 'number') return String(value)
  return value
}

export function CgExtractionDemo() {
  const reduced = usePrefersReducedMotion()
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [noteIdx, setNoteIdx] = useState(0)

  useEffect(() => {
    if (reduced) setPlaying(false)
  }, [reduced])

  useEffect(() => {
    if (!playing) return
    const id = setInterval(() => {
      setStep((s) => {
        const next = (s + 1) % 3
        if (next === 0) {
          setNoteIdx((n) => (n + 1) % NOTES.length)
        }
        return next
      })
    }, 1900)
    return () => clearInterval(id)
  }, [playing])

  const note = NOTES[noteIdx]

  const handleNoteSelect = (id: SyntheticNote['id']) => {
    const idx = NOTES.findIndex((n) => n.id === id)
    setNoteIdx(idx >= 0 ? idx : 0)
    setPlaying(false)
  }

  const handleStepClick = (i: number) => {
    setStep(i)
    setPlaying(false)
  }

  const reset = () => {
    setStep(0)
    setNoteIdx(0)
    setPlaying(false)
  }

  const routingTone: 'green' | 'amber' = note.routing.destination === 'postgres' ? 'green' : 'amber'

  return (
    <CsSection
      id="demo"
      eyebrow="03 · Extraction in action"
      title="Watch a messy note become structured data."
      intro="Three stages, one synthetic note. Step through it or let it run."
      footnote="Interactive prototype · synthetic example · no PHI."
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
            onClick={reset}
            className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-ink-soft transition-colors hover:text-ink"
            style={{ border: '1px solid var(--line)' }}
          >
            <RotateCcw size={13} />
            Reset
          </button>
          <div className="ml-auto flex flex-wrap gap-1.5">
            {STEPS.map((s, i) => (
              <button
                key={s.label}
                onClick={() => handleStepClick(i)}
                className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-medium transition-colors"
                style={{
                  background: i === step ? 'var(--plum-soft)' : 'transparent',
                  color: i === step ? 'var(--plum)' : 'var(--ink-muted)',
                }}
              >
                <span
                  className="grid h-4 w-4 place-items-center rounded-full text-[9px] font-bold"
                  style={{
                    background: i === step ? 'var(--plum)' : 'rgba(28,22,46,0.10)',
                    color: i === step ? '#fff' : 'var(--ink-muted)',
                  }}
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
          <div
            className="h-full rounded-r-full transition-all duration-500"
            style={{ width: `${((step + 1) / 3) * 100}%`, background: 'var(--plum)' }}
          />
        </div>

        {/* stage */}
        <div className="grid grid-cols-1 gap-3 p-5 lg:grid-cols-3">
          {/* Zone 1 — Dictated note */}
          <Zone title="Dictated note" active={step === 0}>
            <select
              value={note.id}
              onChange={(e) => handleNoteSelect(e.target.value as SyntheticNote['id'])}
              className="w-full rounded-md border border-[var(--line)] bg-white px-3 py-2 text-[13px] font-medium text-ink"
            >
              {NOTES.map((n) => (
                <option key={n.id} value={n.id}>
                  {n.id === 'note-clean' && 'Clean note · happy path'}
                  {n.id === 'note-ambiguous' && 'Ambiguous note · review queue'}
                  {n.id === 'note-incomplete' && 'Incomplete note · review queue'}
                </option>
              ))}
            </select>
            <div className="mt-3 rounded-lg bg-white p-3" style={{ border: '1px solid var(--line)' }}>
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                {note.patientLabel} · {note.session}
              </p>
              <p className="mt-2 text-[12px] leading-relaxed text-ink-soft" style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace' }}>
                {note.noteText}
              </p>
            </div>
          </Zone>

          {/* Zone 2 — Structured extraction */}
          <Zone title="Structured extraction" active={step === 1}>
            <div className="rounded-lg bg-white p-3" style={{ border: '1px solid var(--line)' }}>
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted">JSON output</p>
              <div className="mt-2 space-y-1.5">
                {FIELD_KEYS.map((key) => {
                  const f = note.extracted[key]
                  const tone = confidenceTone(f.confidence)
                  return (
                    <div key={key} className="flex items-baseline justify-between gap-2 text-[11px]">
                      <span className="truncate text-ink-soft">
                        <span className="mr-1 text-ink-muted">▸</span>
                        {FIELD_LABELS[key]}
                      </span>
                      <span className="flex shrink-0 items-center gap-1.5">
                        <span className="font-medium text-ink">{formatFieldValue(f.value)}</span>
                        <span
                          className="inline-flex items-center rounded-full px-1.5 py-[1px] text-[9px] font-semibold"
                          style={{ background: 'rgba(28,22,46,0.05)', color: TONE_HEX[tone] }}
                        >
                          {f.confidence.toFixed(2)}
                        </span>
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </Zone>

          {/* Zone 3 — Validation + routing */}
          <Zone title="Validation &amp; routing" active={step === 2}>
            <div className="space-y-2">
              <div className="rounded-lg bg-white p-3" style={{ border: '1px solid var(--line)' }}>
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted">Validation</p>
                <div className="mt-2 space-y-1.5">
                  {note.validation.map((r) => {
                    const Icon = STATUS_ICON[r.status]
                    const tone = STATUS_TONE[r.status]
                    return (
                      <div key={r.rule} className="flex items-start gap-1.5 text-[11px]">
                        <Icon size={13} style={{ color: TONE_HEX[tone] }} strokeWidth={2.2} />
                        <div className="flex-1">
                          <span className="text-ink-soft">{r.rule}</span>
                          {r.detail && <span className="ml-1 text-[10px] text-ink-muted">· {r.detail}</span>}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div
                className="rounded-lg p-3"
                style={{
                  background: routingTone === 'green' ? 'rgba(16,185,129,0.10)' : 'rgba(245,158,11,0.10)',
                  border: `1px solid ${routingTone === 'green' ? 'rgba(16,185,129,0.30)' : 'rgba(245,158,11,0.30)'}`,
                }}
              >
                <p
                  className="text-[10px] font-semibold uppercase tracking-[0.14em]"
                  style={{ color: TONE_HEX[routingTone] }}
                >
                  Routing
                </p>
                <p className="mt-1 text-[13px] font-semibold leading-snug" style={{ color: TONE_HEX[routingTone] }}>
                  {note.routing.destination === 'postgres' ? '→ PostgreSQL' : '→ Review queue'}
                </p>
                {note.routing.reason && (
                  <p className="mt-1 text-[11px] text-ink-muted">{note.routing.reason}</p>
                )}
              </div>
            </div>
          </Zone>
        </div>

        {/* caption */}
        <div className="border-t px-5 py-4" style={{ borderColor: 'var(--line)' }}>
          <p className="text-[13px] leading-relaxed text-ink-soft">
            <span className="font-semibold text-ink">
              {step + 1}. {STEPS[step].label} —{' '}
            </span>
            {STEPS[step].caption}
          </p>
        </div>
      </Module>
    </CsSection>
  )
}
