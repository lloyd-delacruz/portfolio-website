import { PlaceholderCaseStudy } from '@/components/home/PlaceholderCaseStudy'
import { ProjectMeta } from '@/components/work/ProjectMeta'

export default function Page() {
  return (
    <div className="home2">
      <PlaceholderCaseStudy
        register="surface"
        capability="03 · ai-native product systems"
        title="Apex Protocol"
        description="AI-assisted fitness intelligence platform. System brief in Phase 2."
      />
      <ProjectMeta slug="apex-protocol" />
    </div>
  )
}
