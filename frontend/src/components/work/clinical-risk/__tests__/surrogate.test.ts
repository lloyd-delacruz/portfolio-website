// frontend/src/components/work/clinical-risk/__tests__/surrogate.test.ts
import { describe, it, expect } from 'vitest'
import { predictMalignancy, ambiguityFlag, type WdbcFeatures } from '../surrogate'

// A clearly malignant fixture (high concave points, large radius)
const MALIGNANT: WdbcFeatures = {
  worst_concave_points: 0.30,
  worst_perimeter: 200,
  worst_radius: 25,
  mean_texture: 25,
  worst_smoothness: 0.18,
  mean_concavity: 0.20,
  worst_area: 2000,
  mean_radius: 22,
}

// A clearly benign fixture
const BENIGN: WdbcFeatures = {
  worst_concave_points: 0.05,
  worst_perimeter: 80,
  worst_radius: 12,
  mean_texture: 14,
  worst_smoothness: 0.09,
  mean_concavity: 0.03,
  worst_area: 400,
  mean_radius: 11,
}

describe('predictMalignancy', () => {
  it('returns a probability > 0.7 for a clearly malignant feature vector', () => {
    const result = predictMalignancy(MALIGNANT)
    expect(result.p).toBeGreaterThan(0.7)
  })

  it('returns a probability < 0.3 for a clearly benign feature vector', () => {
    const result = predictMalignancy(BENIGN)
    expect(result.p).toBeLessThan(0.3)
  })

  it('returns a CI band fully within [0,1]', () => {
    const result = predictMalignancy(MALIGNANT)
    expect(result.ciLow).toBeGreaterThanOrEqual(0)
    expect(result.ciHigh).toBeLessThanOrEqual(1)
    expect(result.ciHigh).toBeGreaterThan(result.ciLow)
  })

  it('returns top-5 contributing features ranked by |contribution|', () => {
    const result = predictMalignancy(MALIGNANT)
    expect(result.topAttributions).toHaveLength(5)
    for (let i = 0; i < result.topAttributions.length - 1; i++) {
      expect(Math.abs(result.topAttributions[i].contribution)).toBeGreaterThanOrEqual(
        Math.abs(result.topAttributions[i + 1].contribution),
      )
    }
  })
})

describe('ambiguityFlag', () => {
  it('returns true when the CI straddles 0.5', () => {
    expect(ambiguityFlag({ ciLow: 0.42, ciHigh: 0.58 })).toBe(true)
  })

  it('returns false when CI is fully above 0.5', () => {
    expect(ambiguityFlag({ ciLow: 0.62, ciHigh: 0.81 })).toBe(false)
  })

  it('returns false when CI is fully below 0.5', () => {
    expect(ambiguityFlag({ ciLow: 0.10, ciHigh: 0.28 })).toBe(false)
  })
})
