// frontend/src/components/work/clinical-risk/CaseTriagePanel.tsx
'use client'

import React, { useMemo, useState } from 'react'
import { MonoOutputCard } from '@/components/work/deep-dive'
import casesJson from './wdbc-cases.json'
import { predictMalignancy, ambiguityFlag, type WdbcFeatures } from './surrogate'

interface CaseRecord {
  id: string
  label: string
  features: WdbcFeatures
}

const CASES = casesJson.cases as CaseRecord[]

const GROUPS: Array<{ title: string; fields: Array<keyof WdbcFeatures> }> = [
  { title: 'Radius / perimeter / area', fields: ['mean_radius', 'worst_radius', 'worst_perimeter', 'worst_area'] },
  { title: 'Smoothness / concavity',    fields: ['worst_smoothness', 'mean_concavity', 'worst_concave_points'] },
  { title: 'Texture',                   fields: ['mean_texture'] },
]

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

export function CaseTriagePanel() {
  const [caseId, setCaseId] = useState(CASES[0].id)
  const initial = useMemo(() => CASES.find((c) => c.id === caseId) ?? CASES[0], [caseId])
  const [features, setFeatures] = useState<WdbcFeatures>(initial.features)

  React.useEffect(() => {
    setFeatures(initial.features)
  }, [initial])

  const result = useMemo(() => predictMalignancy(features), [features])
  const ambiguous = ambiguityFlag(result)
  const confidenceLabel = ambiguous
    ? 'AMBIGUOUS'
    : result.p > 0.5
      ? 'HIGH CONFIDENCE'
      : 'LOW CONFIDENCE'
  const triageRecommendation = ambiguous
    ? 'Second review recommended — confidence band crosses decision boundary'
    : result.p > 0.5
      ? 'Priority review queue'
      : 'Standard review queue'

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_1.1fr]">
      {/* Inputs */}
      <div className="dd-card p-6">
        <div className="dd-mono mb-4 text-[11px] tracking-[0.14em] text-[var(--dd-text-muted)]">
          CASE INPUTS
        </div>
        <label className="block">
          <span className="dd-mono text-[12px] text-[var(--dd-text-muted)]">Case</span>
          <select
            value={caseId}
            onChange={(e) => setCaseId(e.target.value)}
            className="dd-mono mt-1 w-full rounded-md border border-[var(--dd-border-strong)] bg-[var(--dd-surface-2)] px-3 py-2 text-[14px] text-[var(--dd-text)]"
          >
            {CASES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </label>

        <div className="mt-5 space-y-5">
          {GROUPS.map((group) => (
            <fieldset key={group.title}>
              <legend className="dd-mono text-[11px] tracking-[0.14em] text-[var(--dd-text-muted)]">
                {group.title.toUpperCase()}
              </legend>
              <ul className="mt-2 space-y-2">
                {group.fields.map((field) => (
                  <li key={field}>
                    <label className="block">
                      <span className="dd-mono flex items-baseline justify-between text-[12px] text-[var(--dd-text-muted)]">
                        <span>{FIELD_LABEL[field]}</span>
                        <span className="text-[var(--dd-text)]">{features[field].toFixed(3)}</span>
                      </span>
                      <input
                        type="number"
                        step="0.001"
                        value={features[field]}
                        onChange={(e) =>
                          setFeatures((prev) => ({ ...prev, [field]: Number(e.target.value) }))
                        }
                        className="dd-mono mt-1 w-full rounded-md border border-[var(--dd-border-strong)] bg-[var(--dd-surface-2)] px-2 py-1 text-[13px] text-[var(--dd-text)]"
                        aria-label={FIELD_LABEL[field]}
                      />
                    </label>
                  </li>
                ))}
              </ul>
            </fieldset>
          ))}
        </div>
      </div>

      {/* Output */}
      <MonoOutputCard
        headline={{
          label: 'MALIGNANCY PROBABILITY',
          value: formatProbability(result.p),
          suffix: `[${confidenceLabel}]`,
        }}
        sub={`Calibrated CI (90%)   ${formatProbability(result.ciLow)} – ${formatProbability(result.ciHigh)}`}
        flag={{
          label: 'AMBIGUITY FLAG',
          active: ambiguous,
          note: ambiguous
            ? '(CI straddles 0.5 — clinician second-review)'
            : '(CI fully on one side of 0.5)',
        }}
        sections={[
          {
            title: 'TRIAGE',
            rows: [
              {
                label: 'Recommendation',
                value: triageRecommendation,
                tone: ambiguous ? 'warn' : result.p > 0.5 ? 'danger' : 'ok',
              },
              {
                label: 'Cohort position',
                value: `${result.cohortPercentile.toFixed(0)}th percentile`,
                tone: 'default',
              },
            ],
          },
          {
            title: 'TOP CONTRIBUTING SIGNALS',
            rows: result.topAttributions.map((a) => ({
              label: a.label,
              value: formatContribution(a.contribution),
              tone: a.contribution >= 0 ? 'danger' : 'ok',
            })),
          },
        ]}
      />
    </div>
  )
}
