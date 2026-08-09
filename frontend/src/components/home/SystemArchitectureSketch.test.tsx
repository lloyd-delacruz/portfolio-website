import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SystemArchitectureSketch } from './SystemArchitectureSketch'

const STAGE_TITLES = [
  'Clinical input',
  'Policy boundary',
  'State + audit',
  'Retrieval',
  'Operations',
]

const STAGE_CAPTIONS = [
  'QR scan · form',
  'Role gate · RLS',
  'Postgres',
  'Cited answers',
  'Role dashboards',
]

describe('SystemArchitectureSketch', () => {
  it('renders every stage of the enforcement path', () => {
    render(<SystemArchitectureSketch />)
    for (const title of STAGE_TITLES) {
      expect(screen.getByText(title)).toBeInTheDocument()
    }
  })

  it('renders every stage caption', () => {
    render(<SystemArchitectureSketch />)
    for (const caption of STAGE_CAPTIONS) {
      expect(screen.getByText(caption)).toBeInTheDocument()
    }
  })

  it('renders the feedback edge and the explanatory caption', () => {
    render(<SystemArchitectureSketch />)
    expect(screen.getByText(/feeds back into the next request/i)).toBeInTheDocument()
    expect(screen.getByText(/the client cannot write a transition/i)).toBeInTheDocument()
  })

  it('caption states the verified live deployment', () => {
    render(<SystemArchitectureSketch />)
    expect(screen.getByText(/4 vancouver coastal health sites/i)).toBeInTheDocument()
  })

  it('exposes a descriptive aria-label for the diagram', () => {
    render(<SystemArchitectureSketch />)
    const img = screen.getByRole('img', { name: /enforcement path/i })
    expect(img).toBeInTheDocument()
  })

  /**
   * Regression guards. The previous version orbited eight satellites around a
   * tile labelled "Artificial Intelligence" and captioned one of them
   * "4 hospitals" — asserting both a capability and a deployment rather than
   * demonstrating either.
   */
  describe('credibility guards', () => {
    it('does not present "Artificial Intelligence" as a component', () => {
      render(<SystemArchitectureSketch />)
      expect(screen.queryByText(/^artificial intelligence$/i)).toBeNull()
      expect(screen.queryByText(/orchestration core/i)).toBeNull()
    })

    it('does not render a free-floating buzzword row', () => {
      render(<SystemArchitectureSketch />)
      for (const label of ['Machine Learning', 'LLMs', 'MCP', 'Agents', 'Skills', 'Automation']) {
        expect(screen.queryByText(label)).toBeNull()
      }
    })

    it('does not attribute the deployment to a satellite node — it is a caption fact, not orbit decoration', () => {
      render(<SystemArchitectureSketch />)
      expect(screen.queryByText(/^4 hospitals$/i)).toBeNull()
      expect(screen.queryByText(/800\+/)).toBeNull()
    })
  })
})
