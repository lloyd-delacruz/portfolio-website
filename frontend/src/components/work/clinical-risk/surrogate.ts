// frontend/src/components/work/clinical-risk/surrogate.ts
import surrogate from './wdbc-surrogate.json'

export interface WdbcFeatures {
  worst_concave_points: number
  worst_perimeter: number
  worst_radius: number
  mean_texture: number
  worst_smoothness: number
  mean_concavity: number
  worst_area: number
  mean_radius: number
}

export interface FeatureAttribution {
  field: keyof WdbcFeatures
  label: string
  contribution: number
}

export interface PredictionResult {
  p: number
  ciLow: number
  ciHigh: number
  topAttributions: FeatureAttribution[]
  cohortPercentile: number
}

const FIELD_LABELS: Record<keyof WdbcFeatures, string> = {
  worst_concave_points: 'Worst concave points',
  worst_perimeter:      'Worst perimeter',
  worst_radius:         'Worst radius',
  mean_texture:         'Mean texture',
  worst_smoothness:     'Worst smoothness',
  mean_concavity:       'Mean concavity',
  worst_area:           'Worst area',
  mean_radius:          'Mean radius',
}

// surrogate.json holds: { bias, weights, mu, sigma, isotonicTable, nEff, cohort }
type Surrogate = {
  bias: number
  weights: Record<keyof WdbcFeatures, number>
  mu: Record<keyof WdbcFeatures, number>
  sigma: Record<keyof WdbcFeatures, number>
  /** Sorted (raw, calibrated) pairs */
  isotonicTable: Array<[number, number]>
  nEff: number
  /** Sorted vector of calibrated probabilities from the training cohort, for percentile lookup */
  cohort: number[]
}

const S = surrogate as Surrogate

function sigmoid(z: number): number {
  return 1 / (1 + Math.exp(-z))
}

function calibrate(pRaw: number): number {
  // Linear interpolation on the precomputed isotonic table
  const t = S.isotonicTable
  if (pRaw <= t[0][0]) return t[0][1]
  if (pRaw >= t[t.length - 1][0]) return t[t.length - 1][1]
  for (let i = 0; i < t.length - 1; i++) {
    const [x0, y0] = t[i]
    const [x1, y1] = t[i + 1]
    if (pRaw >= x0 && pRaw <= x1) {
      const k = (pRaw - x0) / (x1 - x0)
      return y0 + k * (y1 - y0)
    }
  }
  return pRaw
}

function percentile(value: number): number {
  const arr = S.cohort
  let lo = 0
  let hi = arr.length
  while (lo < hi) {
    const mid = (lo + hi) >> 1
    if (arr[mid] < value) lo = mid + 1
    else hi = mid
  }
  return (lo / arr.length) * 100
}

export function predictMalignancy(x: WdbcFeatures): PredictionResult {
  const fields = Object.keys(FIELD_LABELS) as Array<keyof WdbcFeatures>

  let z = S.bias
  const contribs: FeatureAttribution[] = fields.map((f) => {
    const zi = ((x[f] - S.mu[f]) / S.sigma[f]) * S.weights[f]
    z += zi
    return { field: f, label: FIELD_LABELS[f], contribution: zi }
  })

  const pRaw = sigmoid(z)
  const p = calibrate(pRaw)
  const se = Math.sqrt((p * (1 - p)) / S.nEff)
  const band = 1.645 * se
  const ciLow = Math.max(0, p - band)
  const ciHigh = Math.min(1, p + band)
  const topAttributions = contribs
    .slice()
    .sort((a, b) => Math.abs(b.contribution) - Math.abs(a.contribution))
    .slice(0, 5)
  const cohortPercentile = percentile(p)

  return { p, ciLow, ciHigh, topAttributions, cohortPercentile }
}

export function ambiguityFlag(ci: { ciLow: number; ciHigh: number }): boolean {
  return ci.ciLow < 0.5 && ci.ciHigh > 0.5
}
