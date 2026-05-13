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

  it('exposes a descriptive aria-label on the role=img wrapper', () => {
    render(<SystemArchitectureSketch />)
    const img = screen.getByRole('img', { name: /system architecture/i })
    expect(img).toBeInTheDocument()
  })
})
