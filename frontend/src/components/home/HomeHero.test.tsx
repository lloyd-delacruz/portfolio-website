import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { HomeHero } from './HomeHero'

describe('HomeHero', () => {
  it('renders the Healthcare Systems Engineer eyebrow', () => {
    render(<HomeHero />)
    expect(screen.getByText(/healthcare systems engineer/i)).toBeInTheDocument()
  })

  it('renders the headline and sub-headline', () => {
    render(<HomeHero />)
    expect(
      screen.getByRole('heading', {
        name: /operational healthcare systems, built from inside the workflow/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/before i wrote the software for them/i),
    ).toBeInTheDocument()
  })

  it('does not force a hard line break inside the headline', () => {
    const { container } = render(<HomeHero />)
    expect(container.querySelector('h1 br')).toBeNull()
  })

  it('renders the discipline, location and live-deployment line', () => {
    render(<HomeHero />)
    expect(
      screen.getByText(/clinical workflows · backend architecture · applied ai/i),
    ).toBeInTheDocument()
    expect(screen.getByText(/vancouver, bc/i)).toBeInTheDocument()
    expect(screen.getByText(/live across 4 vancouver coastal health sites/i)).toBeInTheDocument()
  })

  it('primary CTA is "See the live system" and links to the flagship case study', () => {
    render(<HomeHero />)
    const cta = screen.getByRole('link', { name: /see the live system/i })
    expect(cta).toHaveAttribute('href', '/work/wheelchair-tracking')
  })

  it('secondary CTA links to the work index', () => {
    render(<HomeHero />)
    const cta = screen.getByRole('link', { name: /view all projects/i })
    expect(cta).toHaveAttribute('href', '/work')
  })

  /**
   * Regression guard: the hero must describe the ONE verified deployment
   * precisely (4 VCH sites, hospital-internal) rather than a vague or
   * inflated claim.
   */
  it('does not overstate the deployment beyond what was verified', () => {
    render(<HomeHero />)
    expect(screen.queryByText(/nationwide/i)).toBeNull()
    expect(screen.queryByText(/10\+ sites/i)).toBeNull()
  })
})
