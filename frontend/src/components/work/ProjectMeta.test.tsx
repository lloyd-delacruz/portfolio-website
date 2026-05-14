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
