import { PROJECTS } from '@/lib/projects'

interface Props {
  slug: string
}

export function ProjectMeta({ slug }: Props) {
  const record = PROJECTS[slug]

  if (!record) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`ProjectMeta: no registry entry for slug "${slug}"`)
    }
    return null
  }

  return null
}
