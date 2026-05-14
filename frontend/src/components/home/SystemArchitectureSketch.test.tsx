import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SystemArchitectureSketch } from './SystemArchitectureSketch'

describe('SystemArchitectureSketch', () => {
  it('renders the three node titles', () => {
    render(<SystemArchitectureSketch />)
    for (const title of [
      'QR scan',
      'State + decision engine',
      'Operations surface',
    ]) {
      expect(screen.getByText(title)).toBeInTheDocument()
    }
  })

  it('renders each node caption directly under its node', () => {
    render(<SystemArchitectureSketch />)
    for (const caption of ['Clinical end', 'Lifecycle + routing', 'Dashboard · alerts']) {
      expect(screen.getByText(caption)).toBeInTheDocument()
    }
  })

  it('does not render the removed five-node titles', () => {
    render(<SystemArchitectureSketch />)
    for (const removed of ['Event stream', 'State engine', 'Decision layer', 'QR scan / Mobile']) {
      expect(screen.queryByText(removed)).toBeNull()
    }
  })

  it('does not render decorative per-edge connector labels', () => {
    render(<SystemArchitectureSketch />)
    for (const label of ['event', 'state transition', 'rule decision', 'signal', 'feedback']) {
      expect(screen.queryByText(label)).toBeNull()
    }
  })

  it('renders the anchored live deployment row with site and asset counts', () => {
    render(<SystemArchitectureSketch />)
    expect(screen.getByText(/live/i)).toBeInTheDocument()
    expect(screen.getByText(/4 sites/i)).toBeInTheDocument()
    expect(screen.getByText(/800\+ assets/i)).toBeInTheDocument()
    expect(screen.getByText(/microsoft lists \+ qr/i)).toBeInTheDocument()
  })

  it('exposes a descriptive aria-label for the diagram', () => {
    render(<SystemArchitectureSketch />)
    const img = screen.getByRole('img', { name: /scan|engine|operations|loop|cycle/i })
    expect(img).toBeInTheDocument()
  })

  it('renders exactly one travel pulse and no sonar / ack / seg-wash overlays', () => {
    const { container } = render(<SystemArchitectureSketch />)
    expect(container.querySelectorAll('.anim-heartbeat')).toHaveLength(1)
    expect(container.querySelectorAll('.anim-sonar')).toHaveLength(0)
    expect(container.querySelectorAll('.anim-ack')).toHaveLength(0)
    expect(container.querySelectorAll('.anim-seg-wash')).toHaveLength(0)
  })
})
