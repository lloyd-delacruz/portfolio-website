import { describe, expect, it } from 'vitest'
import {
  NOTES,
  FIELD_KEYS,
  type SyntheticNote,
  type FieldKey,
  type RoutingDestination,
} from '../data'

describe('clinical-genai fixtures', () => {
  it('exposes exactly three notes', () => {
    expect(NOTES).toHaveLength(3)
  })

  it('every note carries every field defined in FIELD_KEYS', () => {
    NOTES.forEach((note) => {
      FIELD_KEYS.forEach((key) => {
        expect(note.extracted[key]).toBeDefined()
        expect(typeof note.extracted[key].confidence).toBe('number')
        expect(note.extracted[key].confidence).toBeGreaterThanOrEqual(0)
        expect(note.extracted[key].confidence).toBeLessThanOrEqual(1)
      })
    })
  })

  it('every note has at least one validation rule', () => {
    NOTES.forEach((note) => {
      expect(note.validation.length).toBeGreaterThan(0)
      note.validation.forEach((r) => {
        expect(['pass', 'warn', 'fail']).toContain(r.status)
      })
    })
  })

  it('routing destination is one of the documented options', () => {
    const allowed: RoutingDestination[] = ['postgres', 'review']
    NOTES.forEach((note) => {
      expect(allowed).toContain(note.routing.destination)
    })
  })

  it('happy-path note routes to postgres', () => {
    const happy = NOTES.find((n) => n.id === 'note-clean')
    expect(happy).toBeDefined()
    expect(happy!.routing.destination).toBe('postgres')
  })

  it('ambiguous and incomplete notes route to review', () => {
    const ambig = NOTES.find((n) => n.id === 'note-ambiguous')
    const incomp = NOTES.find((n) => n.id === 'note-incomplete')
    expect(ambig!.routing.destination).toBe('review')
    expect(incomp!.routing.destination).toBe('review')
  })

  it('exposes one cycle order with three entries', () => {
    const ids = new Set(NOTES.map((n) => n.id))
    expect(ids.size).toBe(3)
  })

  it('SyntheticNote type compiles when referenced', () => {
    const sample: SyntheticNote = NOTES[0]
    const key: FieldKey = FIELD_KEYS[0]
    expect(sample.extracted[key]).toBeDefined()
  })
})
