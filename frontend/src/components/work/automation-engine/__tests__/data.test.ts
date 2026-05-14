import { describe, expect, it } from 'vitest'
import {
  FLOW,
  STEP_KINDS,
  ACTION_SURFACES,
  type FlowScenario,
  type FlowStep,
  type FlowAction,
} from '../data'

describe('automation-engine flow fixture', () => {
  it('exposes one named scenario', () => {
    expect(FLOW.scenarioId).toBe('wheelchair-needs-service')
    expect(FLOW.trigger.source).toMatch(/Microsoft Lists/i)
  })

  it('has exactly 5 orchestration steps with stable ids 1..5', () => {
    expect(FLOW.steps).toHaveLength(5)
    FLOW.steps.forEach((s, i) => {
      expect(s.id).toBe(i + 1)
      expect(STEP_KINDS).toContain(s.kind)
      expect(s.label.length).toBeGreaterThan(0)
    })
  })

  it('has at least one orchestration step of kind "function"', () => {
    expect(FLOW.steps.some((s) => s.kind === 'function')).toBe(true)
  })

  it('every action references an allowed Microsoft Graph surface', () => {
    FLOW.actions.forEach((a: FlowAction) => {
      expect(ACTION_SURFACES).toContain(a.surface)
      expect(['POST', 'PATCH']).toContain(a.method)
      expect(a.path.startsWith('/')).toBe(true)
    })
  })

  it('produces a deterministic correlation id and ok outcome', () => {
    expect(FLOW.audit.correlationId).toMatch(/^[A-Za-z0-9-]+$/)
    expect(FLOW.audit.outcome).toBe('ok')
    expect(FLOW.audit.durationMs).toBeGreaterThan(0)
  })

  it('FlowScenario type compiles when referenced', () => {
    const sample: FlowScenario = FLOW
    const step: FlowStep = sample.steps[0]
    expect(step.id).toBe(1)
  })
})
