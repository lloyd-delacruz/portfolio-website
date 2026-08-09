import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { FeaturedWork, PROJECTS, ANCHOR_CASE_HREF } from './FeaturedWork'

describe('FeaturedWork — composition', () => {
  it('exports exactly 4 PROJECTS in the curated order: anchor, MEPP, Clinical AI, SpendWise', () => {
    expect(PROJECTS).toHaveLength(4)
    expect(PROJECTS[0].href).toBe(ANCHOR_CASE_HREF)
    expect(PROJECTS[0].title).toBe('Multi-Tenant Clinical Equipment Tracking')
    expect(PROJECTS[1].title).toBe('MEPP 2.0 — Equipment Provisioning')
    expect(PROJECTS[2].title).toBe('Clinical AI Assistant')
    expect(PROJECTS[3].title).toBe('SpendWise')
  })

  it('keeps design studies and superseded prototypes off the homepage', () => {
    const titles = PROJECTS.map((p) => p.title)
    expect(titles).not.toContain('Population-Health Intelligence Platform')
    expect(titles).not.toContain('Clinical Risk Engine')
    expect(titles).not.toContain('EquiTrackr')
    expect(titles).not.toContain('Enterprise Healthcare Workflow Automation Engine')
  })

  it('non-anchor cards point at their case study routes', () => {
    expect(PROJECTS[1].href).toBe('/work/mepp')
    expect(PROJECTS[2].href).toBe('/work/clinical-ai-assistant')
    expect(PROJECTS[3].href).toBe('/work/spendwise')
  })

  it('every card carries a status signal', () => {
    PROJECTS.forEach((p) => {
      expect(['production', 'prototype', 'concept']).toContain(p.status)
    })
  })

  it('exactly one card — the verified live deployment — is marked production', () => {
    const production = PROJECTS.filter((p) => p.status === 'production')
    expect(production).toHaveLength(1)
    expect(production[0].title).toBe('Multi-Tenant Clinical Equipment Tracking')
  })

  /**
   * Regression guards — each string below was published on the live site and
   * is contradicted by the source repository's tech stack (independent of
   * the deployment claim, which was separately verified as accurate).
   */
  describe('factual accuracy guards', () => {
    it('the anchor card claims neither Microsoft Lists nor Power Platform', () => {
      expect(PROJECTS[0].stack).not.toMatch(/microsoft lists/i)
      expect(PROJECTS[0].stack).not.toMatch(/power platform/i)
    })

    it('SpendWise is described as React Native, not Next.js', () => {
      const sw = PROJECTS.find((p) => p.title === 'SpendWise')!
      expect(sw.stack).toMatch(/react native/i)
      expect(sw.stack).not.toMatch(/next\.js/i)
    })
  })
})

describe('FeaturedWork — render', () => {
  it('renders the section eyebrow + sub-line', () => {
    render(<FeaturedWork />)
    expect(screen.getByText(/^featured work$/i)).toBeInTheDocument()
    expect(screen.getByText(/the hard part was in the data layer/i)).toBeInTheDocument()
  })

  it('renders the three non-anchor cards in the grid', () => {
    render(<FeaturedWork />)
    expect(screen.getByRole('heading', { name: /mepp 2\.0/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /clinical ai assistant/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /^spendwise$/i })).toBeInTheDocument()
  })

  it('links every card to its case study', () => {
    render(<FeaturedWork />)
    expect(screen.getByRole('link', { name: /mepp 2\.0/i })).toHaveAttribute('href', '/work/mepp')
  })
})
