import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SystemArchitectureSketch } from './SystemArchitectureSketch'

describe('SystemArchitectureSketch', () => {
  it('renders all five node titles', () => {
    render(<SystemArchitectureSketch />)
    for (const title of [
      'QR scan / Mobile',
      'Event stream',
      'State engine',
      'Decision layer',
      'Operations surface',
    ]) {
      expect(screen.getByText(title)).toBeInTheDocument()
    }
  })

  it('renders each node secondary caption', () => {
    render(<SystemArchitectureSketch />)
    for (const caption of [
      'Clinical end',
      'Audit log',
      'Asset lifecycle',
      'Routing rules',
      'Dashboard · alerts',
    ]) {
      expect(screen.getByText(caption)).toBeInTheDocument()
    }
  })

  it('renders the live-deployment caption beneath the diagram', () => {
    render(<SystemArchitectureSketch />)
    expect(
      screen.getByText(/wheelchair tracking — live across 4 sites · 800\+ assets/i),
    ).toBeInTheDocument()
  })

  it('renders all five connector labels including the closing feedback edge', () => {
    render(<SystemArchitectureSketch />)
    for (const label of ['event', 'state transition', 'rule decision', 'signal', 'feedback']) {
      expect(screen.getByText(label)).toBeInTheDocument()
    }
  })

  it('exposes an aria-label that describes the cyclical topology', () => {
    render(<SystemArchitectureSketch />)
    const img = screen.getByRole('img', { name: /loop|cycle|feeds? back/i })
    expect(img).toBeInTheDocument()
  })

  it('renders exactly one heartbeat pulse element with the anim-heartbeat utility', () => {
    const { container } = render(<SystemArchitectureSketch />)
    expect(container.querySelectorAll('.anim-heartbeat')).toHaveLength(1)
  })

  it('renders exactly one counter-flow ack pulse element with the anim-ack utility', () => {
    const { container } = render(<SystemArchitectureSketch />)
    expect(container.querySelectorAll('.anim-ack')).toHaveLength(1)
  })

  it('renders five sonar ring elements (one per node beep)', () => {
    const { container } = render(<SystemArchitectureSketch />)
    expect(container.querySelectorAll('.anim-sonar')).toHaveLength(5)
  })

  it('renders five segment wash overlays (one per connector)', () => {
    const { container } = render(<SystemArchitectureSketch />)
    expect(container.querySelectorAll('.anim-seg-wash')).toHaveLength(5)
  })
})
