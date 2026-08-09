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
    expect(getByText('Live · 4 VCH sites')).toBeInTheDocument()
    const dot = container.querySelector('.project-meta__dot')
    expect(dot).toHaveAttribute('data-state', 'live')
    expect(dot).toHaveAttribute('aria-hidden', 'true')
  })

  it('renders Role, Period, Deployment, Scale fields', () => {
    const { getByText } = render(<ProjectMeta slug="wheelchair-tracking" />)
    expect(getByText('Role')).toBeInTheDocument()
    expect(getByText('Built solo · 830 of 838 commits')).toBeInTheDocument()
    expect(getByText('Period')).toBeInTheDocument()
    expect(getByText('Aug 2025 – present')).toBeInTheDocument()
    expect(getByText('Deployment')).toBeInTheDocument()
    expect(getByText('Hospital-internal deployment · 4 Vancouver Coastal Health sites')).toBeInTheDocument()
    expect(getByText('Scale')).toBeInTheDocument()
    expect(getByText('4 sites · 800+ assets tracked · 90 migrations · 243 test files')).toBeInTheDocument()
  })

  it('renders the verified stack chips', () => {
    const { getByText } = render(<ProjectMeta slug="wheelchair-tracking" />)
    ;['React 18', 'Vite', 'JavaScript', 'Supabase', 'PostgreSQL'].forEach((chip) => {
      expect(getByText(chip)).toBeInTheDocument()
    })
  })

  it('does not claim Microsoft Lists or TypeScript — neither is in the repo', () => {
    const { queryByText } = render(<ProjectMeta slug="wheelchair-tracking" />)
    expect(queryByText('Microsoft Lists')).not.toBeInTheDocument()
    expect(queryByText('TypeScript')).not.toBeInTheDocument()
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

describe('ProjectMeta — Flavor C (equitrackr — archived predecessor)', () => {
  it('renders Status, Role, Period, Built with', () => {
    const { getByText } = render(<ProjectMeta slug="equitrackr" />)
    expect(getByText('Status')).toBeInTheDocument()
    expect(getByText('Superseded by Wheelchair Tracking')).toBeInTheDocument()
    expect(getByText('Role')).toBeInTheDocument()
    expect(getByText('Built solo')).toBeInTheDocument()
    expect(getByText('Period')).toBeInTheDocument()
    expect(getByText('Built with')).toBeInTheDocument()
  })

  it('omits Scale, Live, Source', () => {
    const { queryByText } = render(<ProjectMeta slug="equitrackr" />)
    expect(queryByText('Scale')).not.toBeInTheDocument()
    expect(queryByText('Live')).not.toBeInTheDocument()
    expect(queryByText('Source')).not.toBeInTheDocument()
  })

  it('status dot reflects archived state', () => {
    const { container } = render(<ProjectMeta slug="equitrackr" />)
    const dot = container.querySelector('.project-meta__dot')
    expect(dot).toHaveAttribute('data-state', 'archived')
  })
})

describe('ProjectMeta — design studies are labelled as such', () => {
  it('renders "Designed with" separately from "Built with"', () => {
    const { getByText, container } = render(<ProjectMeta slug="clinical-genai-pipeline" />)
    // The in-browser demo genuinely is built with Next.js, so "Built with"
    // is expected — what matters is that the conceptual backend is not in it.
    expect(getByText('Built with')).toBeInTheDocument()
    expect(getByText('Designed with')).toBeInTheDocument()

    // FastAPI must render as a design-stage chip, never as a shipped one.
    const fastapi = getByText('FastAPI')
    expect(fastapi).toHaveClass('project-meta__chip--designed')

    const builtChips = Array.from(
      container.querySelectorAll('.project-meta__chip:not(.project-meta__chip--designed)')
    ).map((el) => el.textContent)
    expect(builtChips).not.toContain('FastAPI')
    expect(builtChips).not.toContain('PostgreSQL')
  })

  it('carries an explicit not-implemented disclaimer', () => {
    const { getByText } = render(<ProjectMeta slug="clinical-genai-pipeline" />)
    expect(getByText(/not implemented in a shipped codebase/i)).toBeInTheDocument()
  })

  it('self-hosted infrastructure states non-authorship in the Role field', () => {
    const { getByText } = render(<ProjectMeta slug="self-hosted-infrastructure" />)
    expect(getByText(/not the author of these codebases/i)).toBeInTheDocument()
  })
})
