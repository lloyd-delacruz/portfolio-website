import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { FeaturedWork, PROJECTS, ANCHOR_CASE_HREF } from './FeaturedWork'

describe('FeaturedWork — composition', () => {
  it('exports exactly 4 PROJECTS in the curated order: anchor, two new placeholders, SpendWise', () => {
    expect(PROJECTS).toHaveLength(4)
    expect(PROJECTS[0].href).toBe(ANCHOR_CASE_HREF)
    expect(PROJECTS[0].title).toBe('Multi-Site Hospital Equipment Tracking & Analytics System')
    expect(PROJECTS[1].title).toBe('Clinical GenAI Agent & Analytics Pipeline')
    expect(PROJECTS[2].title).toBe('Enterprise Healthcare Workflow Automation Engine')
    expect(PROJECTS[3].title).toBe('SpendWise')
  })

  it('removed Population-Health Intelligence, Clinical Risk Engine, and EquiTrackr from the homepage list', () => {
    const titles = PROJECTS.map((p) => p.title)
    expect(titles).not.toContain('Population-Health Intelligence Platform')
    expect(titles).not.toContain('Clinical Risk Engine')
    expect(titles).not.toContain('EquiTrackr')
  })

  it('repositions SpendWise as a Full-Stack Product Engineering proof point', () => {
    const sw = PROJECTS.find((p) => p.title === 'SpendWise')
    expect(sw?.badge).toBe('FULL-STACK PRODUCT ENGINEERING')
    expect(sw?.body).toMatch(/full-stack product platform/i)
    expect(sw?.body).toMatch(/non-healthcare proof point for product-engineering breadth/i)
  })

  it('placeholder cards point at the new placeholder routes', () => {
    expect(PROJECTS[1].href).toBe('/work/clinical-genai-pipeline')
    expect(PROJECTS[2].href).toBe('/work/healthcare-automation-engine')
  })
})

describe('FeaturedWork — render', () => {
  it('renders the section eyebrow + the new sub-line describing the deliberate progression', () => {
    render(<FeaturedWork />)
    expect(screen.getByText(/^featured work$/i)).toBeInTheDocument()
    expect(
      screen.getByText(
        /a deliberate progression: real healthcare operations · applied ai & data engineering · enterprise automation · product-engineering breadth/i,
      ),
    ).toBeInTheDocument()
  })

  it('renders the rebranded anchor title once', () => {
    render(<FeaturedWork />)
    expect(
      screen.getByRole('heading', { name: /multi-site hospital equipment tracking & analytics system/i }),
    ).toBeInTheDocument()
  })

  it('renders the three non-anchor cards in the grid', () => {
    render(<FeaturedWork />)
    expect(
      screen.getByRole('heading', { name: /clinical genai agent & analytics pipeline/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /enterprise healthcare workflow automation engine/i }),
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /^spendwise$/i })).toBeInTheDocument()
  })
})
