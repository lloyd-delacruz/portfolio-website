import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { HomeHero } from './HomeHero'

describe('HomeHero', () => {
  it('renders the shortened "Applied AI · Healthcare Ops" eyebrow', () => {
    render(<HomeHero />)
    expect(screen.getByText(/applied ai · healthcare ops/i)).toBeInTheDocument()
  })

  it('renders the headline and sub-headline', () => {
    render(<HomeHero />)
    expect(
      screen.getByRole('heading', {
        name: /i build ai systems that support healthcare operations/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/multi-site workflows, event streams, and decision layers/i),
    ).toBeInTheDocument()
  })

  it('does not force a hard line break inside the headline', () => {
    const { container } = render(<HomeHero />)
    expect(container.querySelector('h1 br')).toBeNull()
  })

  it('renders the recruiter-readable status line', () => {
    render(<HomeHero />)
    expect(
      screen.getByText(/open to applied ai, ai systems, and operational intelligence roles/i),
    ).toBeInTheDocument()
  })

  it('primary CTA links to the production system case study', () => {
    render(<HomeHero />)
    const cta = screen.getByRole('link', { name: /see the production system/i })
    expect(cta).toHaveAttribute('href', '/work/wheelchair-tracking')
  })

  it('secondary CTA anchors to the ai-workflow section', () => {
    render(<HomeHero />)
    const cta = screen.getByRole('link', { name: /ai workflow methodology/i })
    expect(cta).toHaveAttribute('href', '#ai-workflow')
  })
})
