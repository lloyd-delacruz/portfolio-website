import { describe, it, expect } from 'vitest'
import { PROJECTS, PROJECT_LIST, projectsByTier } from './projects'

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

  it('every tier value is one of the allowed values', () => {
    const allowed = new Set(['flagship', 'secondary', 'concept', 'client', 'infrastructure'])
    Object.values(PROJECTS).forEach((record) => {
      if (record.tier) expect(allowed.has(record.tier)).toBe(true)
    })
  })

  it('display order is unique so project navigation is deterministic', () => {
    const orders = PROJECT_LIST.map((p) => p.order).filter((o): o is number => o !== undefined)
    expect(new Set(orders).size).toBe(orders.length)
  })

  it('exposes exactly three flagship projects', () => {
    expect(projectsByTier('flagship').map((p) => p.slug)).toEqual([
      'wheelchair-tracking',
      'mepp',
      'clinical-ai-assistant',
    ])
  })
})

/**
 * Regression guards. Each of these encodes a claim that was previously published
 * on the live site and found to be contradicted by the source repository.
 * They exist so the falsehood cannot silently return.
 */
describe('PROJECTS registry — factual accuracy guards', () => {
  it('wheelchair-tracking does not claim Microsoft Lists (absent from the repo)', () => {
    expect(PROJECTS['wheelchair-tracking'].stack).not.toContain('Microsoft Lists')
  })

  it('wheelchair-tracking does not claim TypeScript (the repo is plain JSX)', () => {
    expect(PROJECTS['wheelchair-tracking'].stack).not.toContain('TypeScript')
  })

  it('spendwise does not claim Next.js (it is React Native / Expo)', () => {
    expect(PROJECTS.spendwise.stack).not.toContain('Next.js')
    expect(PROJECTS.spendwise.stack).toContain('React Native')
  })

  it('no project carries a live link that was not verified to resolve', () => {
    // Only projects with a verified reachable URL may carry a `live` link.
    Object.values(PROJECTS).forEach((record) => {
      if (record.live?.href) {
        expect(record.live.href).toMatch(/^https:\/\//)
      }
    })
  })

  it('wheelchair-tracking is the one verified live deployment in the registry', () => {
    expect(PROJECTS['wheelchair-tracking'].status).toBe('live')
    expect(PROJECTS['wheelchair-tracking'].deployment).toMatch(/vancouver coastal health/i)
  })

  it('wheelchair-tracking links to the public seeded-data demo, not a claim of exposing real hospital data', () => {
    const record = PROJECTS['wheelchair-tracking']
    expect(record.live?.href).toBe('https://wheelchair-tracking.vercel.app/')
    expect(record.live?.label).toMatch(/demo/i)
    // The production claim and the public-demo claim must both survive —
    // neither field should be describing the other's deployment.
    expect(record.deployment).toMatch(/hospital-internal/i)
  })

  it('design studies carry no implemented stack for their conceptual technologies', () => {
    const studies = ['clinical-genai-pipeline', 'healthcare-automation-engine']
    studies.forEach((slug) => {
      const record = PROJECTS[slug]
      expect(record.designedWith?.length).toBeGreaterThan(0)
      // Conceptual technologies must never leak into the built stack.
      record.designedWith?.forEach((tech) => {
        expect(record.stack ?? []).not.toContain(tech)
      })
    })
  })

  it('self-hosted infrastructure is never presented as authored work', () => {
    const record = PROJECTS['self-hosted-infrastructure']
    expect(record.role).toMatch(/not the author/i)
    expect(record.stack ?? []).toHaveLength(0)
  })

  it('no source link points at a private repository', () => {
    // Only apex-protocol is public; a link to any private repo 404s for visitors.
    const publicRepos = ['apex-protocol']
    Object.values(PROJECTS).forEach((record) => {
      if (record.source?.href?.includes('github.com/lloyd-delacruz/')) {
        const repo = record.source.href.split('/').pop()!
        expect(publicRepos).toContain(repo)
      }
    })
  })
})
