import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { HomeHero } from './HomeHero'

describe('HomeHero', () => {
  it('renders the "Healthcare Operations · Data & AI Systems" eyebrow', () => {
    render(<HomeHero />)
    expect(screen.getByText(/healthcare operations · data & ai systems/i)).toBeInTheDocument()
  })

  it('renders the headline and sub-headline', () => {
    render(<HomeHero />)
    expect(
      screen.getByRole('heading', {
        name: /operational healthcare systems, engineered from inside the workflow/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/9 years inside hospital operations, an msc in data science/i),
    ).toBeInTheDocument()
  })

  it('does not force a hard line break inside the headline', () => {
    const { container } = render(<HomeHero />)
    expect(container.querySelector('h1 br')).toBeNull()
  })

  it('renders the recruiter-readable status line', () => {
    render(<HomeHero />)
    expect(
      screen.getByText(
        /open to healthcare data, analytics, ai, and application engineering roles — remote, hybrid, or on-site/i,
      ),
    ).toBeInTheDocument()
    expect(screen.getByText(/vancouver, bc/i)).toBeInTheDocument()
  })

  it('primary CTA links to the production system case study', () => {
    render(<HomeHero />)
    const cta = screen.getByRole('link', { name: /see the production system/i })
    expect(cta).toHaveAttribute('href', '/work/wheelchair-tracking')
  })

  it('secondary CTA anchors to the core-capabilities section', () => {
    render(<HomeHero />)
    const cta = screen.getByRole('link', { name: /core capabilities/i })
    expect(cta).toHaveAttribute('href', '#core-capabilities')
  })
})
