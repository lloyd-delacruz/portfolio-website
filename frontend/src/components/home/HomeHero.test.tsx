import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { HomeHero } from './HomeHero'

describe('HomeHero', () => {
  it('renders the Healthcare Systems Engineer eyebrow', () => {
    render(<HomeHero />)
    expect(screen.getByText(/healthcare systems engineer/i)).toBeInTheDocument()
  })

  it('renders the headline and one-sentence sub-headline', () => {
    render(<HomeHero />)
    expect(
      screen.getByRole('heading', {
        name: /operational healthcare systems, built from inside the workflow/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/i spent years on hospital and rehab floors before i wrote the software for them\./i),
    ).toBeInTheDocument()
  })

  it('does not force a hard line break inside the headline', () => {
    const { container } = render(<HomeHero />)
    expect(container.querySelector('h1 br')).toBeNull()
  })

  it('renders the discipline proof row', () => {
    render(<HomeHero />)
    expect(
      screen.getByText(/clinical workflows · backend systems · applied ai/i),
    ).toBeInTheDocument()
  })

  it('renders a subtle location + live-deployment caption', () => {
    render(<HomeHero />)
    expect(screen.getByText(/vancouver, bc/i)).toBeInTheDocument()
    expect(screen.getAllByText(/4 vch sites/i).length).toBeGreaterThan(0)
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

  it('renders the desk visual showing the live system instead of a generic capability diagram', () => {
    render(<HomeHero />)
    expect(screen.getByRole('img', { name: /capacity_service\.py code editor/i })).toBeInTheDocument()
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
