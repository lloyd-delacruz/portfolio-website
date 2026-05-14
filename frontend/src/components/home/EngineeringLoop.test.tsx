import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { EngineeringLoop } from './EngineeringLoop'

describe('EngineeringLoop', () => {
  it('renders the section heading copy', () => {
    render(<EngineeringLoop />)
    expect(screen.getByText(/how i work with ai/i)).toBeInTheDocument()
    expect(screen.getByText(/an algorithm, not a vibe\./i)).toBeInTheDocument()
    expect(screen.getByText(/this is the loop i run\./i)).toBeInTheDocument()
  })

  it('renders all seven stage captions', () => {
    render(<EngineeringLoop />)
    const captions = ['FRAME', 'SPEC', 'PLAN', 'BUILD', 'VERIFY', 'SHIP', 'OBSERVE']
    for (const caption of captions) {
      expect(screen.getAllByText(caption).length).toBeGreaterThan(0)
    }
  })

  it('exposes the loop to assistive tech as an ordered list of 7 items', () => {
    render(<EngineeringLoop />)
    const list = screen.getByRole('list', { name: /how i work with ai/i })
    expect(within(list).getAllByRole('listitem')).toHaveLength(7)
  })

  it('renders monospace artifact labels under each stage', () => {
    render(<EngineeringLoop />)
    const artifacts = ['brief', 'spec.md', 'plan.md', 'diff+tests', 'gate report', 'release notes', 'logs/traces']
    for (const artifact of artifacts) {
      expect(screen.getAllByText(artifact).length).toBeGreaterThan(0)
    }
  })

  it('renders the three decision-diamond question labels', () => {
    render(<EngineeringLoop />)
    for (const question of ['CLEAR?', 'GATE?', 'HEALTHY?']) {
      expect(screen.getAllByText(question).length).toBeGreaterThan(0)
    }
  })

  it('renders three amber NO arcs', () => {
    const { container } = render(<EngineeringLoop />)
    expect(container.querySelectorAll('[data-testid="no-arc"]').length).toBe(3)
  })

  it('renders three green YES branch labels', () => {
    const { container } = render(<EngineeringLoop />)
    expect(container.querySelectorAll('[data-testid="yes-branch"]').length).toBe(3)
  })
})
