import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BuiltWithRow } from './BuiltWithRow'

describe('BuiltWithRow', () => {
  it('renders both group labels', () => {
    render(<BuiltWithRow />)
    expect(screen.getByText(/^ai tools$/i)).toBeInTheDocument()
    expect(screen.getByText(/^stack$/i)).toBeInTheDocument()
  })

  it('renders all six AI tool names', () => {
    render(<BuiltWithRow />)
    for (const tool of ['Claude', 'OpenAI', 'Gemini', 'Cursor', 'GitHub Copilot', 'Antigravity']) {
      expect(screen.getByText(tool)).toBeInTheDocument()
    }
  })

  it('renders all stack item names', () => {
    render(<BuiltWithRow />)
    for (const item of ['Next.js', 'TypeScript', 'PostgreSQL', 'Microsoft Lists', 'QR workflows']) {
      expect(screen.getByText(item)).toBeInTheDocument()
    }
  })

  it('does not render LangChain or AWS (dropped on purpose)', () => {
    render(<BuiltWithRow />)
    expect(screen.queryByText(/langchain/i)).toBeNull()
    expect(screen.queryByText(/^aws$/i)).toBeNull()
  })
})
