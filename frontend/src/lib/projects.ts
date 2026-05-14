export type ProjectStatus = 'live' | 'in-production' | 'prototype' | 'archived' | 'concept'

export interface ProjectMetaRecord {
  slug: string
  title: string
  status?: ProjectStatus
  statusLabel?: string
  role?: string
  period?: string
  deployment?: string
  stack?: string[]
  live?: { href: string; label?: string }
  source?: { href: string; label?: string }
  scale?: string
}

export const PROJECTS: Record<string, ProjectMetaRecord> = {
  'wheelchair-tracking': {
    slug: 'wheelchair-tracking',
    title: 'Wheelchair Tracking',
    status: 'live',
    statusLabel: 'Live since Aug 2025',
    role: 'Built solo',
    period: 'Aug 2025 – present',
    deployment: 'Hospital intranet · 4 sites',
    stack: ['Microsoft Lists', 'QR workflows', 'React', 'TypeScript'],
    scale: '4 sites · 800+ assets',
  },

  'clinical-risk-engine': {
    slug: 'clinical-risk-engine',
    title: 'Clinical Risk Engine',
    status: 'prototype',
    role: 'Applied AI engineering',
    period: '2025',
    deployment: 'Static export · client-side inference',
    stack: ['Next.js', 'TypeScript', 'Python', 'scikit-learn'],
    scale: 'Wisconsin Diagnostic · 569 cases · 30 features',
  },

  'population-health-intelligence': {
    slug: 'population-health-intelligence',
    title: 'Population-Health Intelligence Platform',
    status: 'prototype',
    role: 'Applied AI engineering',
    period: '2025',
    deployment: 'Static export · client-side inference',
    stack: ['Next.js', 'TypeScript', 'Python', 'scikit-learn'],
    scale: '193 countries · WHO · World Bank · IMF',
  },

  'clinical-genai-pipeline': {
    slug: 'clinical-genai-pipeline',
    title: 'Clinical GenAI Agent & Analytics Pipeline',
    status: 'prototype',
    role: 'System design · Applied AI engineering',
    period: '2025',
    deployment: 'Designed pipeline · synthetic data only',
    stack: ['FastAPI', 'Python', 'PostgreSQL', 'LLM structured outputs', 'React', 'TypeScript'],
    scale: '8-stage pipeline · 6 tables · synthetic notes',
  },

  'apex-protocol': {
    slug: 'apex-protocol',
    title: 'Apex Protocol',
    status: 'concept',
    role: 'Solo concept',
    period: '2025',
  },

  'equitrackr': {
    slug: 'equitrackr',
    title: 'EquiTrackr',
    status: 'prototype',
    role: 'Built solo',
    period: '2025',
    stack: ['Next.js', 'TypeScript'],
  },

  'spendwise': {
    slug: 'spendwise',
    title: 'SpendWise',
    status: 'prototype',
    role: 'Built solo',
    period: '2025',
    stack: ['Next.js', 'TypeScript'],
  },

  'website-gemms': {
    slug: 'website-gemms',
    title: 'Website Gemms',
    status: 'concept',
    role: 'Solo concept',
    period: '2025',
  },
}
