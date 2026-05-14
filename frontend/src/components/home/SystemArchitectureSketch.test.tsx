import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SystemArchitectureSketch } from './SystemArchitectureSketch'

const SATELLITE_TITLES = [
  'QR Scan',
  'Event Stream',
  'State Engine',
  'Decision Layer',
  'Mobile Sync',
  'Multi-Site',
  'Alerts Bus',
  'Operations Surface',
]

const SATELLITE_CAPTIONS = [
  'Clinical input',
  'Audit log',
  'Asset lifecycle',
  'Routing rules',
  'Offline-tolerant',
  '4 hospitals',
  'Escalation paths',
  'Dashboard · alerts',
]

describe('SystemArchitectureSketch', () => {
  it('renders the central engine tile', () => {
    render(<SystemArchitectureSketch />)
    expect(screen.getByText(/^artificial intelligence$/i)).toBeInTheDocument()
    expect(screen.getByText(/orchestration core/i)).toBeInTheDocument()
  })

  it('renders all eight satellite titles', () => {
    render(<SystemArchitectureSketch />)
    for (const title of SATELLITE_TITLES) {
      expect(screen.getByText(title)).toBeInTheDocument()
    }
  })

  it('renders all eight satellite captions', () => {
    render(<SystemArchitectureSketch />)
    for (const caption of SATELLITE_CAPTIONS) {
      expect(screen.getByText(caption)).toBeInTheDocument()
    }
  })

  it('does not render decorative per-edge connector labels', () => {
    render(<SystemArchitectureSketch />)
    for (const label of ['event', 'state transition', 'rule decision', 'signal', 'feedback']) {
      expect(screen.queryByText(label)).toBeNull()
    }
  })

  it('renders the free-floating capability row', () => {
    render(<SystemArchitectureSketch />)
    for (const label of ['Machine Learning', 'LLMs', 'MCP', 'Agents', 'Skills', 'Automation']) {
      expect(screen.getByText(label)).toBeInTheDocument()
    }
  })

  it('no longer shows the previous live-deployment metadata', () => {
    render(<SystemArchitectureSketch />)
    expect(screen.queryByText(/4 sites/i)).toBeNull()
    expect(screen.queryByText(/800\+ assets/i)).toBeNull()
    expect(screen.queryByText(/microsoft lists \+ qr/i)).toBeNull()
  })

  it('exposes a descriptive aria-label for the diagram', () => {
    render(<SystemArchitectureSketch />)
    const img = screen.getByRole('img', { name: /artificial intelligence|engine|orchestrat/i })
    expect(img).toBeInTheDocument()
  })

  it('renders exactly one orbit pulse and no sonar / ack / seg-wash overlays', () => {
    const { container } = render(<SystemArchitectureSketch />)
    expect(container.querySelectorAll('.anim-heartbeat')).toHaveLength(1)
    expect(container.querySelectorAll('.anim-sonar')).toHaveLength(0)
    expect(container.querySelectorAll('.anim-ack')).toHaveLength(0)
    expect(container.querySelectorAll('.anim-seg-wash')).toHaveLength(0)
  })
})
