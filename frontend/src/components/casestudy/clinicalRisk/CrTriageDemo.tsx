// frontend/src/components/casestudy/clinicalRisk/CrTriageDemo.tsx
'use client'

import { useEffect, useMemo, useState } from 'react'
import { Play, Pause, RotateCcw, ClipboardList, Sigma, Flag } from 'lucide-react'
import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion'
import { CsSection, Module } from '../bits'
import casesJson from '@/components/work/clinical-risk/wdbc-cases.json'
import {
  predictMalignancy,
  ambiguityFlag,
  type WdbcFeatures,
} from '@/components/work/clinical-risk/surrogate'

interface CaseRecord {
  id: string
  label: string
  features: WdbcFeatures
}

const ALL_CASES = casesJson.cases as CaseRecord[]

// Auto-cycle order: benign → ambiguous → malignant.
const CYCLE_IDS = ['WDBC-112', 'WDBC-301', 'WDBC-219'] as const
const CYCLE_CASES: CaseRecord[] = CYCLE_IDS.map(
  (id) => ALL_CASES.find((c) => c.id === id) ?? ALL_CASES[0],
)

const STEPS = [
  { label: 'Case', icon: ClipboardList, caption: 'Pick a case — the surrogate loads its biopsy feature vector.' },
  { label: 'Inference', icon: Sigma, caption: 'Calibrated probability + 90% CI band, with the top contributing signals.' },
  { label: 'Triage', icon: Flag, caption: 'When the CI straddles 0.5, the ambiguity flag fires for clinician second-review.' },
]

const TOP_FEATURES: Array<keyof WdbcFeatures> = ['worst_concave_points', 'worst_perimeter', 'worst_radius']
const FIELD_LABEL: Record<keyof WdbcFeatures, string> = {
  worst_concave_points: 'Worst concave points',
  worst_perimeter: 'Worst perimeter',
  worst_radius: 'Worst radius',
  mean_texture: 'Mean texture',
  worst_smoothness: 'Worst smoothness',
  mean_concavity: 'Mean concavity',
  worst_area: 'Worst area',
  mean_radius: 'Mean radius',
}

function formatProbability(p: number): string {
  return p.toFixed(2)
}

function formatContribution(c: number): string {
  const sign = c >= 0 ? '+' : '−'
  return `${sign}${Math.abs(c).toFixed(2)}`
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

export function CrTriageDemo() {
  const reduced = usePrefersReducedMotion()
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [cycleIdx, setCycleIdx] = useState(0)
  const [activeCase, setActiveCase] = useState<CaseRecord>(CYCLE_CASES[0])
  const [features, setFeatures] = useState<WdbcFeatures>(CYCLE_CASES[0].features)
  const [userEdited, setUserEdited] = useState(false)

  useEffect(() => {
    if (reduced) setPlaying(false)
  }, [reduced])

  useEffect(() => {
    if (!playing) return
    const id = setInterval(() => {
      setStep((s) => {
        const next = (s + 1) % 3
        if (next === 0) {
          // wrap: advance to next case in the cycle
          setCycleIdx((ci) => {
            const nextCi = (ci + 1) % CYCLE_CASES.length
            const c = CYCLE_CASES[nextCi]
            setActiveCase(c)
            setFeatures(c.features)
            setUserEdited(false)
            return nextCi
          })
        }
        return next
      })
    }, 1900)
    return () => clearInterval(id)
  }, [playing])

  const result = useMemo(() => predictMalignancy(features), [features])
  const ambiguous = ambiguityFlag(result)

  const confidenceTone: 'green' | 'amber' | 'coral' = ambiguous
    ? 'amber'
    : result.p > 0.5
      ? 'coral'
      : 'green'
  const triageText = ambiguous
    ? 'Second review recommended — CI crosses 0.5'
    : result.p > 0.5
      ? 'Priority review queue'
      : 'Standard review queue'

  const toneColor: Record<typeof confidenceTone, string> = {
    green: 'var(--green)',
    amber: 'var(--amber)',
    coral: 'var(--coral)',
  }

  const handleCaseSelect = (id: string) => {
    const c = ALL_CASES.find((x) => x.id === id) ?? ALL_CASES[0]
    setActiveCase(c)
    setFeatures(c.features)
    setUserEdited(false)
    setPlaying(false)
  }

  const handleFeatureChange = (field: keyof WdbcFeatures, value: number) => {
    setFeatures((prev) => ({ ...prev, [field]: value }))
    setUserEdited(true)
    setPlaying(false)
  }

  const handleStepClick = (i: number) => {
    setStep(i)
    setPlaying(false)
  }

  const reset = () => {
    setStep(0)
    setCycleIdx(0)
    setActiveCase(CYCLE_CASES[0])
    setFeatures(CYCLE_CASES[0].features)
    setUserEdited(false)
    setPlaying(false)
  }

  // suppress unused warning — cycleIdx is read for state tracking
  void cycleIdx

  return (
    <CsSection
      id="demo"
      eyebrow="03 · Live triage"
      title="One case at a time."
      intro="Pick a case, see the calibrated probability, watch the ambiguity flag fire when the model is unsure."
      footnote="Interactive prototype · calibrated surrogate of the production ensemble."
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
          {/* Zone 1 — Case */}
          <Zone title="The case" active={step === 0}>
            <select
              value={activeCase.id}
              onChange={(e) => handleCaseSelect(e.target.value)}
              className="w-full rounded-md border border-[var(--line)] bg-white px-3 py-2 text-[13px] font-medium text-ink"
            >
              {ALL_CASES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
            <div className="mt-3 space-y-2">
              {TOP_FEATURES.map((field) => (
                <label key={field} className="block">
                  <span className="flex items-baseline justify-between text-[11px] text-ink-muted">
                    <span>{FIELD_LABEL[field]}</span>
                    <span className="font-medium text-ink">{features[field].toFixed(3)}</span>
                  </span>
                  <input
                    type="number"
                    step="0.001"
                    value={features[field]}
                    onChange={(e) => handleFeatureChange(field, Number(e.target.value))}
                    className="mt-1 w-full rounded-md border border-[var(--line)] bg-white px-2 py-1 text-[12px] text-ink"
                    aria-label={FIELD_LABEL[field]}
                  />
                </label>
              ))}
              <p className="text-[10px] text-ink-muted">+5 more features applied silently</p>
            </div>
          </Zone>

          {/* Zone 2 — Inference */}
          <Zone title="The inference" active={step === 1}>
            <div className="rounded-lg bg-white p-3" style={{ border: '1px solid var(--line)' }}>
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                p(malignancy)
              </p>
              <p className="mt-1 font-display text-2xl font-extrabold text-ink">{formatProbability(result.p)}</p>
              <p className="mt-0.5 text-[11px] text-ink-muted">
                CI {formatProbability(result.ciLow)} – {formatProbability(result.ciHigh)}
              </p>
              <div className="mt-3 space-y-1">
                {result.topAttributions.slice(0, 4).map((a) => (
                  <div key={a.field} className="flex items-baseline justify-between text-[11px]">
                    <span className="text-ink-soft">
                      <span className="mr-1.5 text-ink-muted">▸</span>
                      {a.label}
                    </span>
                    <span
                      className="font-medium"
                      style={{ color: a.contribution >= 0 ? 'var(--coral)' : 'var(--green)' }}
                    >
                      {formatContribution(a.contribution)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Zone>

          {/* Zone 3 — Triage */}
          <Zone title="The triage" active={step === 2}>
            <div className="rounded-lg bg-white p-3" style={{ border: '1px solid var(--line)' }}>
              <div className="flex items-center gap-2">
                <span
                  className={`grid h-7 w-7 place-items-center rounded-md ${ambiguous ? 'animate-pulse' : ''}`}
                  style={{
                    background: ambiguous ? 'rgba(245,158,11,0.16)' : 'rgba(28,22,46,0.06)',
                    color: ambiguous ? 'var(--amber)' : 'var(--ink-muted)',
                  }}
                >
                  <Flag size={14} strokeWidth={2.2} />
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-soft">
                  Ambiguity flag {ambiguous ? '· active' : '· dark'}
                </span>
              </div>
              <p
                className="mt-3 text-[13px] font-semibold leading-snug"
                style={{ color: toneColor[confidenceTone] }}
              >
                {triageText}
              </p>
              <p className="mt-2 text-[11px] text-ink-muted">
                Cohort position · <span className="font-medium text-ink">{result.cohortPercentile.toFixed(0)}th %ile</span>
              </p>
              {userEdited && (
                <p className="mt-2 text-[10px] italic text-ink-muted">user-edited features</p>
              )}
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
