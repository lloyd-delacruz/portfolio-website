// frontend/src/components/casestudy/popHealth/PhForecastDemo.tsx
'use client'

import { useEffect, useMemo, useState } from 'react'
import { Play, Pause, RotateCcw, Globe, Sliders, BarChart3 } from 'lucide-react'
import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion'
import { CsSection, Module } from '../bits'
import {
  predict,
  attributions,
  COUNTRIES,
  WEIGHTS,
  type InputVector,
  type Country,
} from '@/components/work/population-health/surrogate'

const FIELD_RANGES = {
  schooling: { min: 4, max: 20, step: 0.1, unit: 'yrs', label: 'Schooling' },
  gdp: { min: 300, max: 80000, step: 100, unit: 'USD', label: 'GDP per capita' },
  immunization: { min: 50, max: 100, step: 1, unit: '%', label: 'Immunization' },
  hiv: { min: 0, max: 12, step: 0.1, unit: '/1k', label: 'HIV deaths' },
} as const

const STEPS = [
  { label: 'Country', icon: Globe, caption: 'Pick a country — the surrogate loads its 2015 baseline and feature defaults.' },
  { label: 'Scenario', icon: Sliders, caption: 'Adjust a signal — here, +3 years of schooling above the country default.' },
  { label: 'Forecast', icon: BarChart3, caption: 'The model returns the prediction, a 90% CI band, and the ranked signals driving it.' },
]

const DEFAULT_COUNTRY = COUNTRIES.find((c) => c.code === 'BGD') ?? COUNTRIES[0]

function formatNumber(n: number, digits = 1): string {
  return n.toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits })
}

function formatDelta(d: number): string {
  const sign = d >= 0 ? '+' : '−'
  return `${sign}${formatNumber(Math.abs(d), 1)}y`
}

/** Auto-cycle "boost schooling" override applied at step 2+ */
function withSchoolingBoost(country: Country): InputVector {
  return { ...country.defaults, schooling: country.defaults.schooling + 3 }
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

export function PhForecastDemo() {
  const reduced = usePrefersReducedMotion()
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [country, setCountry] = useState<Country>(DEFAULT_COUNTRY)
  const [userOverride, setUserOverride] = useState<InputVector | null>(null)

  useEffect(() => {
    if (reduced) setPlaying(false)
  }, [reduced])

  useEffect(() => {
    if (!playing) return
    const id = setInterval(() => setStep((s) => (s + 1) % 3), 1900)
    return () => clearInterval(id)
  }, [playing])

  // When user touches a slider or country, pause cycling and use overrides directly.
  // Otherwise, derive inputs from current step (step 0/1: defaults; step 2: schooling boost).
  const inputs: InputVector = useMemo(() => {
    if (userOverride) return userOverride
    return step >= 1 ? withSchoolingBoost(country) : country.defaults
  }, [userOverride, country, step])

  const prediction = useMemo(() => predict(country, inputs, WEIGHTS), [country, inputs])
  const attr = useMemo(() => attributions(country, inputs, WEIGHTS), [country, inputs])
  const baselineDelta = prediction.value - country.baseline

  const handleCountryChange = (code: string) => {
    const next = COUNTRIES.find((c) => c.code === code) ?? COUNTRIES[0]
    setCountry(next)
    setUserOverride(null)
    setPlaying(false)
  }

  const handleSlider = (field: keyof InputVector, value: number) => {
    setUserOverride({ ...inputs, [field]: value })
    setPlaying(false)
  }

  const handleStepClick = (i: number) => {
    setStep(i)
    setUserOverride(null)
    setPlaying(false)
  }

  const reset = () => {
    setStep(0)
    setUserOverride(null)
    setPlaying(false)
  }

  return (
    <CsSection
      id="demo"
      eyebrow="03 · Live forecast"
      title="Watch the model reason."
      intro="One country, one scenario, one forecast — with the signals that drove it. Step through it or let it run."
      footnote="Interactive prototype · deterministic surrogate of the trained ensemble."
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
            className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-ink-soft ghair transition-colors hover:text-ink"
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
          {/* Zone 1 — Country */}
          <Zone title="The country" active={step === 0}>
            <select
              value={country.code}
              onChange={(e) => handleCountryChange(e.target.value)}
              className="w-full rounded-md border border-[var(--line)] bg-white px-3 py-2 text-[13px] font-medium text-ink"
            >
              {COUNTRIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name}
                </option>
              ))}
            </select>
            <p className="mt-3 text-[11px] text-ink-muted">
              Baseline · <span className="font-medium text-ink">{formatNumber(country.baseline, 1)} years</span>{' '}
              (2015)
            </p>
          </Zone>

          {/* Zone 2 — Scenario */}
          <Zone title="The scenario" active={step === 1}>
            <div className="space-y-2.5">
              {(Object.keys(FIELD_RANGES) as Array<keyof InputVector>).map((field) => {
                const range = FIELD_RANGES[field]
                return (
                  <label key={field} className="block">
                    <span className="flex items-baseline justify-between text-[11px] text-ink-muted">
                      <span>{range.label}</span>
                      <span className="font-medium text-ink">
                        {formatNumber(inputs[field], field === 'gdp' || field === 'immunization' ? 0 : 1)}{' '}
                        {range.unit}
                      </span>
                    </span>
                    <input
                      type="range"
                      min={range.min}
                      max={range.max}
                      step={range.step}
                      value={inputs[field]}
                      onChange={(e) => handleSlider(field, Number(e.target.value))}
                      className="mt-1 w-full"
                      style={{ accentColor: 'var(--plum)' }}
                      aria-label={range.label}
                    />
                  </label>
                )
              })}
            </div>
          </Zone>

          {/* Zone 3 — Forecast */}
          <Zone title="The forecast" active={step === 2}>
            <div className="rounded-lg bg-white p-3 ghair">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted">Projected</p>
              <p className="mt-1 font-display text-2xl font-extrabold text-ink">
                {formatNumber(prediction.value, 1)}{' '}
                <span className="text-sm font-medium text-ink-muted">years</span>
              </p>
              <p className="mt-0.5 text-[11px] text-ink-muted">
                ±{formatNumber(prediction.ci90, 1)} (90% CI)
              </p>
              <div className="mt-3 space-y-1">
                {attr.slice(0, 4).map((a) => (
                  <div key={a.field} className="flex items-baseline justify-between text-[11px]">
                    <span className="text-ink-soft">
                      <span className="mr-1.5 text-ink-muted">▸</span>
                      {a.label}
                    </span>
                    <span
                      className="font-medium"
                      style={{ color: a.delta >= 0 ? 'var(--green)' : 'var(--coral)' }}
                    >
                      {formatDelta(a.delta)}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-3 border-t pt-2 text-[11px] text-ink-muted" style={{ borderColor: 'var(--line)' }}>
                vs. baseline · <span className="font-medium text-ink">{formatDelta(baselineDelta)}</span>
              </p>
            </div>
          </Zone>
        </div>

        {/* caption */}
        <div className="border-t px-5 py-4 ghair-t">
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
