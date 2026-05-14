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
    const captions = ['FRAME', 'SPEC', 'PLAN', 'DISPATCH AGENTS', 'PASS?', 'REVIEW', 'SHIP']
    for (const caption of captions) {
      expect(screen.getAllByText(caption).length).toBeGreaterThan(0)
    }
  })

  it('exposes the loop to assistive tech as an ordered list of 7 items', () => {
    render(<EngineeringLoop />)
    const list = screen.getByRole('list', { name: /how i work with ai/i })
    expect(within(list).getAllByRole('listitem')).toHaveLength(7)
  })
})
