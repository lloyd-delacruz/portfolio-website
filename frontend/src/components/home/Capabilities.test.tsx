import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Capabilities } from './Capabilities'

describe('Capabilities', () => {
  it('renders the section eyebrow, heading, and subhead', () => {
    render(<Capabilities />)
    expect(screen.getByText(/^core capabilities$/i)).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /built across the stack hospitals run on/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/four capability clusters — built on real clinical operations/i),
    ).toBeInTheDocument()
  })

  it('exposes the #core-capabilities anchor for the hero CTA', () => {
    const { container } = render(<Capabilities />)
    expect(container.querySelector('#core-capabilities')).not.toBeNull()
  })

  it('renders all four cluster titles', () => {
    render(<Capabilities />)
    expect(screen.getByRole('heading', { name: /clinical operations intelligence/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /applied ai & data systems/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /analytics & visualization/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /application development/i })).toBeInTheDocument()
  })

  it('renders every sub-skill from the four clusters', () => {
    render(<Capabilities />)
    const bullets = [
      // Clinical Operations Intelligence
      'Hospital workflow optimization',
      'Rehabilitation operations',
      'Equipment tracking systems',
      'Operational analytics',
      // Applied AI & Data Systems
      'SQL · Python · R',
      'Prompt engineering · LLM workflows',
      'Structured data extraction',
      'AI-assisted automation',
      // Analytics & Visualization
      'Tableau · Power BI',
      'Time-series analytics',
      'KPI & operational reporting',
      'Data storytelling',
      // Application Development
      'React · Next.js · TypeScript',
      'FastAPI · PostgreSQL',
      'Cloud deployment',
      'Production-grade UX',
    ]
    for (const b of bullets) {
      expect(screen.getByText(b)).toBeInTheDocument()
    }
  })

  it('cards are not rendered as click-through links', () => {
    const { container } = render(<Capabilities />)
    const cardLinks = container.querySelectorAll('[data-cluster-card] a')
    expect(cardLinks.length).toBe(0)
  })

  it('does NOT render the prior 5-card single-row labels', () => {
    render(<Capabilities />)
    expect(screen.queryByText(/multi-site operational systems/i)).toBeNull()
    expect(screen.queryByText(/ai workflow engineering/i)).toBeNull()
    expect(screen.queryByText(/operational intelligence layers/i)).toBeNull()
    expect(screen.queryByText(/equipment & asset workflows/i)).toBeNull()
    expect(screen.queryByText(/production engineering discipline/i)).toBeNull()
  })
})
