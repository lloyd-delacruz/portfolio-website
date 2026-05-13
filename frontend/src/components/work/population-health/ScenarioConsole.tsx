// frontend/src/components/work/population-health/ScenarioConsole.tsx
'use client'

import React, { useMemo, useState } from 'react'
import { MonoOutputCard } from '@/components/work/deep-dive'
import { predict, attributions, COUNTRIES, WEIGHTS, type InputVector } from './surrogate'

const FIELD_RANGES = {
  schooling: { min: 4, max: 20, step: 0.1, unit: 'yrs' },
  gdp: { min: 300, max: 80000, step: 100, unit: 'USD' },
  immunization: { min: 50, max: 100, step: 1, unit: '%' },
  hiv: { min: 0, max: 12, step: 0.1, unit: '/1k' },
} as const

function formatNumber(n: number, digits = 1): string {
  return n.toLocaleString('en-US', { minimumFractionDigits: digits, maximumFractionDigits: digits })
}

function formatDelta(d: number): string {
  const sign = d >= 0 ? '+' : '−'
  return `${sign}${formatNumber(Math.abs(d), 1)}y`
}

export function ScenarioConsole() {
  const [countryCode, setCountryCode] = useState(COUNTRIES[2].code) // Bangladesh as default
  const country = useMemo(() => COUNTRIES.find((c) => c.code === countryCode) ?? COUNTRIES[0], [countryCode])
  const [inputs, setInputs] = useState<InputVector>(country.defaults)

  // When country changes, snap inputs back to its defaults
  React.useEffect(() => {
    setInputs(country.defaults)
  }, [country])

  const prediction = useMemo(() => predict(country, inputs, WEIGHTS), [country, inputs])
  const attr = useMemo(() => attributions(country, inputs, WEIGHTS), [country, inputs])
  const baselineDelta = prediction.value - country.baseline

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_1.1fr]">
      {/* Inputs */}
      <div className="dd-card p-6">
        <div className="dd-mono mb-4 text-[11px] tracking-[0.14em] text-[var(--dd-text-muted)]">
          SCENARIO INPUTS
        </div>
        <label className="block">
          <span className="dd-mono text-[12px] text-[var(--dd-text-muted)]">Country</span>
          <select
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            className="dd-mono mt-1 w-full rounded-md border border-[var(--dd-border-strong)] bg-[var(--dd-surface-2)] px-3 py-2 text-[14px] text-[var(--dd-text)]"
          >
            {COUNTRIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name}
              </option>
            ))}
          </select>
        </label>

        <div className="mt-5 space-y-5">
          {(Object.keys(FIELD_RANGES) as Array<keyof InputVector>).map((field) => {
            const range = FIELD_RANGES[field]
            const label = {
              schooling: 'Schooling',
              gdp: 'GDP per capita',
              immunization: 'Immunization coverage',
              hiv: 'HIV deaths / 1k',
            }[field]
            return (
              <label key={field} className="block">
                <span className="dd-mono flex items-baseline justify-between text-[12px] text-[var(--dd-text-muted)]">
                  <span>{label}</span>
                  <span className="text-[var(--dd-text)]">
                    {formatNumber(inputs[field], field === 'gdp' || field === 'immunization' ? 0 : 1)} {range.unit}
                  </span>
                </span>
                <input
                  type="range"
                  min={range.min}
                  max={range.max}
                  step={range.step}
                  value={inputs[field]}
                  onChange={(e) => setInputs((prev) => ({ ...prev, [field]: Number(e.target.value) }))}
                  className="mt-2 w-full accent-[var(--dd-accent)]"
                  aria-label={label}
                />
              </label>
            )
          })}
        </div>
      </div>

      {/* Output */}
      <MonoOutputCard
        headline={{
          label: 'PROJECTED LIFE EXPECTANCY',
          value: formatNumber(prediction.value, 1),
          suffix: 'years',
        }}
        sub={`±${formatNumber(prediction.ci90, 1)} (90% CI)`}
        sections={[
          {
            title: 'TOP CONTRIBUTING SIGNALS',
            rows: attr.map((a) => ({
              label: a.label,
              value: formatDelta(a.delta),
              tone: a.delta >= 0 ? 'ok' : 'danger',
            })),
          },
        ]}
        footer={`vs. national baseline (${country.name}, 2015):  ${formatDelta(baselineDelta)}`}
      />
    </div>
  )
}
