import { describe, it, expect } from 'vitest'
import { PROJECTS } from './projects'

describe('PROJECTS registry', () => {
  it('every entry slug matches its key', () => {
    Object.entries(PROJECTS).forEach(([key, record]) => {
      expect(record.slug).toBe(key)
    })
  })

  it('every entry has slug + title', () => {
    Object.values(PROJECTS).forEach((record) => {
      expect(record.slug).toBeTruthy()
      expect(record.title).toBeTruthy()
    })
  })

  it('contains all nine in-scope projects', () => {
    const expected = [
      'wheelchair-tracking',
      'clinical-risk-engine',
      'population-health-intelligence',
      'clinical-genai-pipeline',
      'apex-protocol',
      'equitrackr',
      'spendwise',
      'website-gemms',
      'healthcare-automation-engine',
    ]
    expected.forEach((slug) => {
      expect(PROJECTS[slug]).toBeDefined()
    })
  })

  it('every status value is one of the allowed enum values', () => {
    const allowed = new Set(['live', 'in-production', 'prototype', 'archived', 'concept'])
    Object.values(PROJECTS).forEach((record) => {
      if (record.status) expect(allowed.has(record.status)).toBe(true)
    })
  })
})
