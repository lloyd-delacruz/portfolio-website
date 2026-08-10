import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { WcDemoGuide } from './WcDemoGuide'

describe('WcDemoGuide', () => {
  it('renders a #demo-guide anchor target matching the hero CTA', () => {
    const { container } = render(<WcDemoGuide />)
    expect(container.querySelector('#demo-guide')).not.toBeNull()
  })

  it('renders all five in-scope roles and excludes the deprecated cleaner role', () => {
    render(<WcDemoGuide />)
    // Role names legitimately appear more than once (a card title, plus a
    // mention in the "suggested path" narrative) — assert presence, not count.
    ;['Super-Admin', 'Admin', 'Therapist', 'Rehab Assistant', 'Wheelchair Technician'].forEach((role) => {
      expect(screen.getAllByText(role).length).toBeGreaterThanOrEqual(1)
    })
    expect(screen.queryByText(/cleaner/i)).not.toBeInTheDocument()
  })

  it('renders working credentials for every role, matching the verified table', () => {
    render(<WcDemoGuide />)
    const expected: Record<string, { email: string; password: string }> = {
      'Super-Admin': { email: 'admin@wheelchairtrack.ca', password: 'Platform123!' },
      Admin: { email: 'admin@vgh.ca', password: 'Admin123!' },
      Therapist: { email: 'therapist1@vgh.ca', password: 'Therapist123!' },
      'Rehab Assistant': { email: 'rehab1@vgh.ca', password: 'Rehab123!' },
      'Wheelchair Technician': { email: 'tech1@vgh.ca', password: 'Tech123!' },
    }
    Object.values(expected).forEach(({ email, password }) => {
      expect(screen.getByText(email)).toBeInTheDocument()
      expect(screen.getByText(password)).toBeInTheDocument()
    })
  })

  it('every role card exposes a labeled copy-credentials control', () => {
    render(<WcDemoGuide />)
    const buttons = screen.getAllByRole('button', { name: /copy/i })
    expect(buttons.length).toBeGreaterThanOrEqual(5)
  })

  it('states plainly that this is a shared, seeded demo environment', () => {
    render(<WcDemoGuide />)
    expect(screen.getAllByText(/seeded|synthetic|shared/i).length).toBeGreaterThanOrEqual(1)
  })
})
