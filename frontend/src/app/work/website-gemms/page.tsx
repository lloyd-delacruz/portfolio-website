import { PlaceholderCaseStudy } from '@/components/home/PlaceholderCaseStudy'
import { ProjectMeta } from '@/components/work/ProjectMeta'

export default function Page() {
  return (
    <div className="home2">
      <PlaceholderCaseStudy
        register="surface"
        capability="05 · ai-assisted digital experiences"
        title="Website Gemms"
        description="AI-assisted digital product and web studio. System brief in Phase 2."
      />
      <ProjectMeta slug="website-gemms" />
    </div>
  )
}
