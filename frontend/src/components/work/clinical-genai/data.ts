// Synthetic rehab note fixtures driving the extraction demo.
// No real patient data. All values are hand-authored for a deterministic demo.

export const FIELD_KEYS = [
  'mobility_level',
  'assistance_required',
  'gait_distance_m',
  'pain_score',
  'therapy_tolerance',
  'discharge_readiness',
] as const

export type FieldKey = (typeof FIELD_KEYS)[number]

export interface ExtractedField {
  value: string | number | null
  confidence: number // 0..1
}

export type ValidationStatus = 'pass' | 'warn' | 'fail'

export interface ValidationRule {
  rule: string
  status: ValidationStatus
  detail?: string
}

export type RoutingDestination = 'postgres' | 'review'

export interface RoutingDecision {
  destination: RoutingDestination
  reason?: string
}

export interface SyntheticNote {
  id: 'note-clean' | 'note-ambiguous' | 'note-incomplete'
  patientLabel: string // e.g. "Patient 042 · synthetic"
  session: string // e.g. "Session 04"
  noteText: string // 50–80 words of dictated rehab prose
  extracted: Record<FieldKey, ExtractedField>
  validation: ValidationRule[]
  routing: RoutingDecision
}

const CLEAN: SyntheticNote = {
  id: 'note-clean',
  patientLabel: 'Patient 042 · synthetic',
  session: 'Session 04',
  noteText:
    'Pt ambulated 30m with rolling walker, contact-guard assist. Pain 2/10 at rest, 3/10 with weight-bearing. Tolerated full 45-min session, no signs of fatigue. Transfers sit-to-stand independent. Plan: progress to single-point cane next visit, discharge planning to begin within two weeks.',
  extracted: {
    mobility_level:       { value: 'ambulatory · walker',          confidence: 0.94 },
    assistance_required:  { value: 'contact-guard',                 confidence: 0.92 },
    gait_distance_m:      { value: 30,                              confidence: 0.96 },
    pain_score:           { value: 3,                               confidence: 0.90 },
    therapy_tolerance:    { value: 'tolerated full session',        confidence: 0.91 },
    discharge_readiness:  { value: 'approaching · 2 weeks',         confidence: 0.88 },
  },
  validation: [
    { rule: 'Schema valid',          status: 'pass' },
    { rule: 'Ranges valid',          status: 'pass' },
    { rule: 'Required fields',       status: 'pass' },
    { rule: 'Confidence ≥ 0.85',     status: 'pass' },
  ],
  routing: { destination: 'postgres' },
}

const AMBIGUOUS: SyntheticNote = {
  id: 'note-ambiguous',
  patientLabel: 'Patient A · synthetic',
  session: 'Session 07',
  noteText:
    'Worked on bed mobility, transfers. Pt fatigued, somewhat reluctant. Gait attempted with FWW, distance ~5m before requesting to sit. Pain reported but pt unclear on number, "not too bad". Family asked about going home — not addressed today. Tolerance variable.',
  extracted: {
    mobility_level:       { value: 'ambulatory · FWW',              confidence: 0.78 },
    assistance_required:  { value: 'min-A',                         confidence: 0.71 },
    gait_distance_m:      { value: 5,                               confidence: 0.82 },
    pain_score:           { value: null,                            confidence: 0.42 },
    therapy_tolerance:    { value: 'variable',                      confidence: 0.69 },
    discharge_readiness:  { value: 'unclear',                       confidence: 0.38 },
  },
  validation: [
    { rule: 'Schema valid',          status: 'pass' },
    { rule: 'Ranges valid',          status: 'pass' },
    { rule: 'Required fields',       status: 'warn', detail: 'pain_score is null' },
    { rule: 'Confidence ≥ 0.85',     status: 'fail', detail: 'discharge_readiness · 0.38' },
  ],
  routing: {
    destination: 'review',
    reason: 'Low confidence on discharge_readiness',
  },
}

const INCOMPLETE: SyntheticNote = {
  id: 'note-incomplete',
  patientLabel: 'Patient B · synthetic',
  session: 'Session 02',
  noteText:
    'Brief session, pt nauseous mid-treatment. Sit-to-stand x3 with mod-A. Did not attempt ambulation. Pain 4/10. Will retry tomorrow. Therapy abbreviated.',
  extracted: {
    mobility_level:       { value: 'transfers only',                confidence: 0.86 },
    assistance_required:  { value: 'mod-A',                         confidence: 0.89 },
    gait_distance_m:      { value: null,                            confidence: 0.20 },
    pain_score:           { value: 4,                               confidence: 0.93 },
    therapy_tolerance:    { value: 'abbreviated · nausea',          confidence: 0.84 },
    discharge_readiness:  { value: 'not yet',                       confidence: 0.79 },
  },
  validation: [
    { rule: 'Schema valid',          status: 'pass' },
    { rule: 'Ranges valid',          status: 'pass' },
    { rule: 'Required fields',       status: 'fail', detail: 'gait_distance_m missing' },
    { rule: 'Confidence ≥ 0.85',     status: 'warn', detail: 'gait_distance_m · 0.20' },
  ],
  routing: {
    destination: 'review',
    reason: 'Required field missing · gait_distance_m',
  },
}

// Demo cycle order: clean (happy path) → ambiguous (load-bearing moment) → incomplete.
export const NOTES: SyntheticNote[] = [CLEAN, AMBIGUOUS, INCOMPLETE]

export const FIELD_LABELS: Record<FieldKey, string> = {
  mobility_level:       'Mobility level',
  assistance_required:  'Assistance required',
  gait_distance_m:      'Gait distance (m)',
  pain_score:           'Pain score',
  therapy_tolerance:    'Therapy tolerance',
  discharge_readiness:  'Discharge readiness',
}
