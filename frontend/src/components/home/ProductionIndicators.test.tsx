import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ProductionIndicators } from './ProductionIndicators'

describe('ProductionIndicators', () => {
  it('renders all four metric values', () => {
    render(<ProductionIndicators />)
    expect(screen.getByText('4')).toBeInTheDocument()
    expect(screen.getByText('800+')).toBeInTheDocument()
    expect(screen.getByText('10+')).toBeInTheDocument()
    expect(screen.getByText(/aug 2025/i)).toBeInTheDocument()
  })

  it('labels the live-deployment metric', () => {
    render(<ProductionIndicators />)
    expect(screen.getByText(/hospital sites · live deployment/i)).toBeInTheDocument()
  })

  it('renders availability + roles line + contact link', () => {
    render(<ProductionIndicators />)
    expect(screen.getByText(/currently available/i)).toBeInTheDocument()
    expect(
      screen.getByText(/open to applied ai, ai systems, and operational intelligence roles/i),
    ).toBeInTheDocument()
    const link = screen.getByRole('link', { name: /start a conversation/i })
    expect(link).toHaveAttribute('href', '/contact')
  })

  it('does NOT render dropped/inflated claims', () => {
    render(<ProductionIndicators />)
    expect(screen.queryByText(/50\+/)).toBeNull()
    expect(screen.queryByText(/8\+/)).toBeNull()
  })
})
