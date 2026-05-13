// frontend/src/components/work/population-health/__tests__/surrogate.test.ts
import { describe, it, expect } from 'vitest'
import { predict, attributions, type Country } from '../surrogate'

const FIXTURE: Country = {
  code: 'TST',
  name: 'Testland',
  baseline: 70.0,
  sigma: 1.2,
  defaults: { schooling: 12, gdp: 8000, immunization: 90, hiv: 1.0 },
}

const WEIGHTS = {
  schooling: 0.6,
  gdp: 0.00015,
  immunization: 0.08,
  hiv: -0.9,
}

describe('predict', () => {
  it('returns the baseline when inputs match the country defaults', () => {
    const result = predict(FIXTURE, FIXTURE.defaults, WEIGHTS)
    expect(result.value).toBeCloseTo(70.0, 5)
    expect(result.ci90).toBeCloseTo(1.2 * 1.645, 5)
  })

  it('adds positive contribution when schooling exceeds the country default', () => {
    const result = predict(FIXTURE, { ...FIXTURE.defaults, schooling: 14 }, WEIGHTS)
    expect(result.value).toBeCloseTo(70.0 + 0.6 * 2, 5)
  })

  it('subtracts contribution when HIV rate rises above default', () => {
    const result = predict(FIXTURE, { ...FIXTURE.defaults, hiv: 3.0 }, WEIGHTS)
    expect(result.value).toBeCloseTo(70.0 + -0.9 * (3.0 - 1.0), 5)
  })
})

describe('attributions', () => {
  it('returns one entry per input dimension, sorted by absolute magnitude descending', () => {
    const x = { schooling: 14, gdp: 8000, immunization: 90, hiv: 3.0 }
    const result = attributions(FIXTURE, x, WEIGHTS)
    expect(result).toHaveLength(4)
    expect(Math.abs(result[0].delta)).toBeGreaterThanOrEqual(Math.abs(result[1].delta))
  })

  it('zero-contribution dimensions still appear', () => {
    const result = attributions(FIXTURE, FIXTURE.defaults, WEIGHTS)
    expect(result).toHaveLength(4)
    expect(result.every((r) => r.delta === 0)).toBe(true)
  })
})
