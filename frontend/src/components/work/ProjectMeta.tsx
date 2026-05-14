import { PROJECTS, type ProjectStatus } from '@/lib/projects'

interface Props {
  slug: string
}

const STATUS_DISPLAY: Record<ProjectStatus, string> = {
  'live': 'Live',
  'in-production': 'In production',
  'prototype': 'Prototype',
  'archived': 'Archived',
  'concept': 'Concept',
}

export function ProjectMeta({ slug }: Props) {
  const record = PROJECTS[slug]

  if (!record) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`ProjectMeta: no registry entry for slug "${slug}"`)
    }
    return null
  }

  const hasStack = record.stack && record.stack.length > 0
  const hasContent =
    record.status ||
    record.statusLabel ||
    record.role ||
    record.period ||
    record.deployment ||
    record.scale ||
    record.live?.href ||
    record.source?.href ||
    hasStack

  if (!hasContent) return null

  const statusText = record.statusLabel ?? (record.status ? STATUS_DISPLAY[record.status] : undefined)

  return (
    <aside className="project-meta" role="region" aria-label="Project metadata">
      <dl className="project-meta__list">
        {statusText && (
          <div className="project-meta__field">
            <dt>Status</dt>
            <dd>
              {record.status && (
                <span
                  className="project-meta__dot"
                  data-state={record.status}
                  aria-hidden="true"
                />
              )}
              {statusText}
            </dd>
          </div>
        )}
        {record.role && (
          <div className="project-meta__field">
            <dt>Role</dt>
            <dd>{record.role}</dd>
          </div>
        )}
        {record.period && (
          <div className="project-meta__field">
            <dt>Period</dt>
            <dd>{record.period}</dd>
          </div>
        )}
        {record.deployment && (
          <div className="project-meta__field">
            <dt>Deployment</dt>
            <dd>{record.deployment}</dd>
          </div>
        )}
        {record.scale && (
          <div className="project-meta__field">
            <dt>Scale</dt>
            <dd>{record.scale}</dd>
          </div>
        )}
        {record.live?.href && (
          <div className="project-meta__field">
            <dt>Live</dt>
            <dd>
              <a href={record.live.href}>{record.live.label ?? record.live.href}</a>
            </dd>
          </div>
        )}
        {record.source?.href && (
          <div className="project-meta__field">
            <dt>Source</dt>
            <dd>
              <a href={record.source.href}>{record.source.label ?? record.source.href}</a>
            </dd>
          </div>
        )}
        {hasStack && (
          <div className="project-meta__field project-meta__field--wide">
            <dt>Stack</dt>
            <dd>
              {record.stack!.map((chip) => (
                <span key={chip} className="project-meta__chip">
                  {chip}
                </span>
              ))}
            </dd>
          </div>
        )}
      </dl>
    </aside>
  )
}
