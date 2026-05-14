import { PlaceholderCaseStudy } from '@/components/home/PlaceholderCaseStudy'
import { ProjectMeta } from '@/components/work/ProjectMeta'

export default function Page() {
  return (
    <div className="home2">
      <PlaceholderCaseStudy
        register="surface"
        capability="cloud automation + event-driven systems"
        title="Enterprise Healthcare Workflow Automation Engine"
        description="Power Automate, Azure Functions, and webhook orchestration wired into the Microsoft enterprise ecosystem — real-time healthcare workflow automation and operational alert systems. System brief in Phase 2."
      />
      <ProjectMeta slug="healthcare-automation-engine" />
    </div>
  )
}
