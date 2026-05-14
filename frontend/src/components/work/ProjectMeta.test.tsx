import { describe, it, expect, vi, afterEach } from 'vitest'
import { render } from '@testing-library/react'
import { ProjectMeta } from './ProjectMeta'

describe('ProjectMeta — null cases', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('returns null when slug is not in the registry', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const { container } = render(<ProjectMeta slug="this-slug-does-not-exist" />)
    expect(container.firstChild).toBeNull()
    warnSpy.mockRestore()
  })

  it('warns in dev when slug is not in the registry', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    render(<ProjectMeta slug="missing-slug" />)
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('missing-slug'))
  })
})

describe('ProjectMeta — Flavor A (wheelchair-tracking)', () => {
  it('renders Status field with statusLabel and dot', () => {
    const { container, getByText } = render(<ProjectMeta slug="wheelchair-tracking" />)
    expect(getByText('Status')).toBeInTheDocument()
    expect(getByText('Live since Aug 2025')).toBeInTheDocument()
    const dot = container.querySelector('.project-meta__dot')
    expect(dot).toHaveAttribute('data-state', 'live')
    expect(dot).toHaveAttribute('aria-hidden', 'true')
  })

  it('renders Role, Period, Deployment, Scale fields', () => {
    const { getByText } = render(<ProjectMeta slug="wheelchair-tracking" />)
    expect(getByText('Role')).toBeInTheDocument()
    expect(getByText('Built solo')).toBeInTheDocument()
    expect(getByText('Period')).toBeInTheDocument()
    expect(getByText('Aug 2025 – present')).toBeInTheDocument()
    expect(getByText('Deployment')).toBeInTheDocument()
    expect(getByText('Hospital intranet · 4 sites')).toBeInTheDocument()
    expect(getByText('Scale')).toBeInTheDocument()
    expect(getByText('4 sites · 800+ assets')).toBeInTheDocument()
  })

  it('renders all stack chips', () => {
    const { getByText } = render(<ProjectMeta slug="wheelchair-tracking" />)
    ;['Microsoft Lists', 'QR workflows', 'React', 'TypeScript'].forEach((chip) => {
      expect(getByText(chip)).toBeInTheDocument()
    })
  })

  it('does not render Live or Source fields when unset', () => {
    const { queryByText } = render(<ProjectMeta slug="wheelchair-tracking" />)
    expect(queryByText('Live')).not.toBeInTheDocument()
    expect(queryByText('Source')).not.toBeInTheDocument()
  })

  it('wrapper has region role with aria-label', () => {
    const { getByRole } = render(<ProjectMeta slug="wheelchair-tracking" />)
    expect(getByRole('region', { name: /project metadata/i })).toBeInTheDocument()
  })
})
