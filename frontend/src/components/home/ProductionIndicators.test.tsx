import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ProductionIndicators } from './ProductionIndicators'

describe('ProductionIndicators', () => {
  it('renders all four metric values', () => {
    render(<ProductionIndicators />)
    expect(screen.getByText('4')).toBeInTheDocument()
    expect(screen.getByText('800+')).toBeInTheDocument()
    expect(screen.getByText('498')).toBeInTheDocument()
    expect(screen.getByText('9+')).toBeInTheDocument()
  })

  it('labels the verified live deployment and the engineering-evidence metrics', () => {
    render(<ProductionIndicators />)
    expect(screen.getByText(/hospital sites · live deployment/i)).toBeInTheDocument()
    expect(screen.getByText(/assets tracked in production/i)).toBeInTheDocument()
    expect(screen.getByText(/automated tests across 5 systems/i)).toBeInTheDocument()
  })

  it('renders the availability paragraph + contact link', () => {
    render(<ProductionIndicators />)
    expect(screen.getByText(/currently available/i)).toBeInTheDocument()
    expect(
      screen.getByText(
        /vancouver, bc · open to healthcare systems, backend, and applied ai engineering roles — remote, hybrid, or on-site/i,
      ),
    ).toBeInTheDocument()
    const link = screen.getByRole('link', { name: /start a conversation/i })
    expect(link).toHaveAttribute('href', '/contact')
  })

  it('does NOT render inflated claims beyond what was verified', () => {
    render(<ProductionIndicators />)
    expect(screen.queryByText('10+')).toBeNull()
    expect(screen.queryByText(/50\+/)).toBeNull()
    expect(screen.queryByText('1,500+')).toBeNull()
  })
})
