export type ProjectStatus = 'live' | 'in-production' | 'prototype' | 'archived' | 'concept'

/**
 * Tiering drives grouping on /work and the homepage. It is data, not UI state —
 * we tier rather than filter at this project count (see docs).
 */
export type ProjectTier = 'flagship' | 'secondary' | 'concept' | 'client' | 'infrastructure'

export type ProjectCategory = 'Healthcare' | 'AI' | 'Data' | 'SaaS' | 'Web'

export interface ProjectMetaRecord {
  slug: string
  title: string
  shortTitle?: string
  status?: ProjectStatus
  statusLabel?: string
  role?: string
  period?: string
  deployment?: string
  /** Technologies actually present in the codebase. Verified against the repo. */
  stack?: string[]
  /**
   * Technologies the system was *designed* around but which are not implemented
   * in any repository. Rendered under a separate "Designed with" label so a
   * design exercise is never mistaken for shipped code.
   */
  designedWith?: string[]
  live?: { href: string; label?: string }
  source?: { href: string; label?: string }
  scale?: string
  tier?: ProjectTier
  category?: ProjectCategory[]
  tagline?: string
  order?: number
}

/**
 * Every metric in this registry was counted directly against the git tree of the
 * source repository. Deployment and adoption claims are only present where a
 * live URL was verified to resolve.
 *
 * Note: the flagship repositories are private, so no `source` links are set —
 * a source link to a private repo 404s for every visitor.
 */
export const PROJECTS: Record<string, ProjectMetaRecord> = {
  'wheelchair-tracking': {
    slug: 'wheelchair-tracking',
    title: 'Wheelchair Tracking',
    status: 'live',
    statusLabel: 'Live · 4 VCH sites',
    role: 'Built solo · 830 of 838 commits',
    period: 'Aug 2025 – present',
    // The system runs on hospital-internal infrastructure in production.
    // wheelchair-tracking.vercel.app is a separate, publicly reachable build
    // seeded with synthetic demo data (confirmed isolated from any real
    // health-authority data) — kept live specifically so this case study can
    // be tried hands-on. See docs/guides/ in the source repo for role docs.
    deployment: 'Hospital-internal deployment · 4 Vancouver Coastal Health sites',
    live: { href: 'https://wheelchair-tracking.vercel.app/', label: 'Live demo (seeded data)' },
    stack: ['React 18', 'Vite', 'JavaScript', 'Supabase', 'PostgreSQL', 'Row-Level Security', 'Edge Functions'],
    scale: '4 sites · 800+ assets tracked · 90 migrations · 243 test files',
    tier: 'flagship',
    category: ['Healthcare', 'SaaS'],
    tagline: 'Multi-tenant equipment fleet tracking where the database, not the browser, enforces the workflow.',
    order: 1,
  },

  mepp: {
    slug: 'mepp',
    title: 'MEPP 2.0',
    shortTitle: 'MEPP',
    status: 'prototype',
    statusLabel: 'Backend complete · not deployed',
    role: 'Built solo',
    period: '2026',
    deployment: 'Not deployed · synthetic data only',
    stack: ['TypeScript', 'PostgreSQL', 'Row-Level Security', 'AES-256-GCM', 'OpenAPI'],
    scale: '31 hand-authored migrations · 112 tests · 19-state machine',
    tier: 'flagship',
    category: ['Healthcare', 'SaaS'],
    tagline: 'Medical equipment provisioning where vendors structurally cannot receive patient identity.',
    order: 2,
  },

  'clinical-ai-assistant': {
    slug: 'clinical-ai-assistant',
    title: 'Clinical AI Assistant',
    status: 'prototype',
    statusLabel: 'Working locally · not deployed',
    role: 'Built solo',
    period: '2026',
    deployment: 'Dockerised · no public instance',
    stack: ['Python', 'LangChain', 'ChromaDB', 'OpenAI embeddings', 'PostgreSQL', 'TypeScript'],
    scale: '52 test files · retrieval-focused test suite',
    tier: 'flagship',
    category: ['Healthcare', 'AI'],
    tagline: 'Retrieval-grounded clinical answers with page-level citations — and an engineered refusal when the corpus falls short.',
    order: 3,
  },

  spendwise: {
    slug: 'spendwise',
    title: 'SpendWise',
    status: 'prototype',
    statusLabel: 'Feature-complete · unreleased',
    role: 'Built solo',
    period: '2025 – 2026',
    deployment: 'Not released · CI green',
    stack: ['React Native', 'Expo', 'Express', 'Prisma', 'PostgreSQL', 'TypeScript'],
    scale: '33 migrations · 85 tests · double-entry ledger',
    tier: 'secondary',
    category: ['SaaS', 'Data'],
    tagline: 'Envelope budgeting on an append-only ledger Postgres will not let you edit.',
    order: 4,
  },

  'gemms-ai-assistant': {
    slug: 'gemms-ai-assistant',
    title: 'Gemms AI Assistant',
    status: 'prototype',
    statusLabel: 'Working · no infrastructure',
    role: 'Primary author · 59 of 66 commits',
    period: '2026',
    deployment: 'Not deployed',
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'pgvector', 'HNSW'],
    scale: 'Tenant-scoped vector retrieval · 6 tests',
    tier: 'secondary',
    category: ['AI', 'SaaS'],
    tagline: 'Multi-tenant retrieval widget where tenant filtering runs before ranking, not after.',
    order: 5,
  },

  'clinical-risk-engine': {
    slug: 'clinical-risk-engine',
    title: 'Clinical Risk Engine',
    status: 'concept',
    statusLabel: 'Design study · runs in-browser',
    role: 'System design',
    period: '2025',
    deployment: 'Static export · client-side inference on a pre-computed model',
    stack: ['Next.js', 'TypeScript'],
    designedWith: ['Python', 'scikit-learn'],
    scale: 'Wisconsin Diagnostic · 569 cases · 30 features',
    tier: 'concept',
    category: ['Healthcare', 'Data'],
    order: 6,
  },

  'population-health-intelligence': {
    slug: 'population-health-intelligence',
    title: 'Population-Health Intelligence Platform',
    status: 'concept',
    statusLabel: 'Design study · runs in-browser',
    role: 'System design',
    period: '2025',
    deployment: 'Static export · client-side inference on a pre-computed model',
    stack: ['Next.js', 'TypeScript'],
    designedWith: ['Python', 'scikit-learn'],
    scale: '193 countries · WHO · World Bank · IMF',
    tier: 'concept',
    category: ['Data', 'Healthcare'],
    order: 7,
  },

  'clinical-genai-pipeline': {
    slug: 'clinical-genai-pipeline',
    title: 'Clinical GenAI Agent & Analytics Pipeline',
    status: 'concept',
    statusLabel: 'Design study · no implementation',
    role: 'System design',
    period: '2025',
    deployment: 'Designed pipeline · synthetic data only',
    stack: ['Next.js', 'TypeScript'],
    designedWith: ['FastAPI', 'Python', 'PostgreSQL', 'LLM structured outputs'],
    scale: '8-stage pipeline · 6 tables · synthetic notes',
    tier: 'concept',
    category: ['Healthcare', 'AI'],
    order: 8,
  },

  'healthcare-automation-engine': {
    slug: 'healthcare-automation-engine',
    title: 'Enterprise Healthcare Workflow Automation Engine',
    status: 'concept',
    statusLabel: 'Design study · no implementation',
    role: 'System design',
    period: '2025',
    deployment: 'Designed patterns · not built',
    stack: [],
    designedWith: ['Power Automate', 'Azure Functions', 'Microsoft Graph', 'SharePoint / Lists', 'Webhooks'],
    scale: '4 reusable patterns · cross-system orchestration',
    tier: 'concept',
    category: ['Healthcare'],
    order: 9,
  },

  equitrackr: {
    slug: 'equitrackr',
    title: 'EquiTrackr',
    status: 'archived',
    statusLabel: 'Superseded by Wheelchair Tracking',
    role: 'Built solo',
    period: '2025',
    deployment: 'Not deployed · mock data layer',
    stack: ['Next.js', 'TypeScript'],
    tier: 'concept',
    category: ['Healthcare'],
    tagline: 'The earlier clinical-equipment prototype that Wheelchair Tracking grew out of.',
    order: 10,
  },

  'apex-protocol': {
    slug: 'apex-protocol',
    title: 'Apex Protocol',
    status: 'concept',
    role: 'Solo concept',
    period: '2025',
    source: { href: 'https://github.com/lloyd-delacruz/apex-protocol', label: 'github.com/lloyd-delacruz/apex-protocol' },
    tier: 'concept',
    category: ['Web'],
    order: 11,
  },

  'client-work': {
    slug: 'client-work',
    title: 'Client & Deployed Web Work',
    shortTitle: 'Client Work',
    status: 'live',
    statusLabel: 'Delivered for real businesses',
    role: 'Design & build',
    period: '2025 – 2026',
    stack: ['Next.js', 'Astro', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    tier: 'client',
    category: ['Web'],
    tagline: 'Marketing and booking sites delivered for clinics, community organisations and local business.',
    order: 12,
  },

  'website-gemms': {
    slug: 'website-gemms',
    title: 'Website Gemms',
    status: 'live',
    role: 'Built solo',
    period: '2026',
    stack: ['Astro', 'TypeScript'],
    live: { href: 'https://websitegemms.vercel.app', label: 'websitegemms.vercel.app' },
    tier: 'client',
    category: ['Web'],
    order: 13,
  },

  'self-hosted-infrastructure': {
    slug: 'self-hosted-infrastructure',
    title: 'Self-Hosted Healthcare Infrastructure',
    shortTitle: 'Self-Hosted Infra',
    status: 'concept',
    statusLabel: 'Third-party software · evaluation',
    role: 'Evaluation & self-hosting — not the author of these codebases',
    period: '2026',
    deployment: 'Self-hosted evaluation',
    stack: [],
    designedWith: ['OpenEMR', 'Cal.com', 'PHP', 'Docker'],
    tier: 'infrastructure',
    category: ['Healthcare'],
    tagline: 'Evaluating open-source EMR and scheduling platforms as the foundation for a clinic booking product.',
    order: 14,
  },
}

/** Projects in stable display order. */
export const PROJECT_LIST = Object.values(PROJECTS).sort(
  (a, b) => (a.order ?? 999) - (b.order ?? 999)
)

export function projectsByTier(tier: ProjectTier): ProjectMetaRecord[] {
  return PROJECT_LIST.filter((p) => p.tier === tier)
}
