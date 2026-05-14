// Deterministic fixtures for the AeFlowDemo component.
// All values are hand-authored. No external calls; no real tenant data.

export const STEP_KINDS = ['trigger', 'function', 'branch', 'action', 'persist'] as const
export type StepKind = (typeof STEP_KINDS)[number]

export const STEP_ICONS = ['Webhook', 'Cloud', 'GitBranch', 'Send', 'Database'] as const
export type StepIcon = (typeof STEP_ICONS)[number]

export const ACTION_SURFACES = ['Teams', 'Planner', 'Lists'] as const
export type ActionSurface = (typeof ACTION_SURFACES)[number]

export interface FlowStep {
  id: 1 | 2 | 3 | 4 | 5
  label: string
  icon: StepIcon
  kind: StepKind
  /** ≤30 words. Shown as the active-step caption. */
  caption: string
}

export interface FlowAction {
  method: 'POST' | 'PATCH'
  path: string
  surface: ActionSurface
  /** Step id (1..5) at which this action becomes visible. */
  emittedAtStep: 1 | 2 | 3 | 4 | 5
}

export interface FlowAudit {
  correlationId: string
  outcome: 'ok' | 'retry' | 'fail'
  durationMs: number
}

export interface FlowTrigger {
  source: string
  payload: Record<string, unknown>
}

export interface FlowScenario {
  scenarioId: 'wheelchair-needs-service'
  trigger: FlowTrigger
  steps: FlowStep[]
  actions: FlowAction[]
  audit: FlowAudit
}

export const FLOW: FlowScenario = {
  scenarioId: 'wheelchair-needs-service',
  trigger: {
    source: 'Microsoft Lists · trigger: item changed',
    payload: {
      list: 'Assets',
      itemId: 'A-0427',
      assetType: 'wheelchair',
      site: 'Site A',
      previousStatus: 'in-service',
      currentStatus: 'needs_service',
      changedBy: 'biomed.tech@site',
    },
  },
  steps: [
    {
      id: 1,
      label: 'Trigger fires',
      icon: 'Webhook',
      kind: 'trigger',
      caption: 'List item change arrives. Flow run starts with a fresh correlation id.',
    },
    {
      id: 2,
      label: 'Classify severity',
      icon: 'Cloud',
      kind: 'function',
      caption: 'Azure Function inspects asset type and prior service history; returns severity = high.',
    },
    {
      id: 3,
      label: 'Route channel',
      icon: 'GitBranch',
      kind: 'branch',
      caption: 'Severity branch selects the biomed on-call channel and posts a structured incident card to Teams.',
    },
    {
      id: 4,
      label: 'Open task',
      icon: 'Send',
      kind: 'action',
      caption: 'Planner task created in the biomed repair bucket, due same shift, linked back to the asset.',
    },
    {
      id: 5,
      label: 'Update + audit',
      icon: 'Database',
      kind: 'persist',
      caption: 'Asset lifecycle stage advanced and one row appended to the flow audit list with outcome and duration.',
    },
  ],
  actions: [
    { method: 'POST',  path: '/teams/{teamId}/channels/{channelId}/messages', surface: 'Teams',   emittedAtStep: 3 },
    { method: 'POST',  path: '/planner/tasks',                                surface: 'Planner', emittedAtStep: 4 },
    { method: 'PATCH', path: '/sites/{siteId}/lists/{listId}/items/{itemId}', surface: 'Lists',   emittedAtStep: 5 },
  ],
  audit: {
    correlationId: 'flow-7c93a1',
    outcome: 'ok',
    durationMs: 1840,
  },
}
