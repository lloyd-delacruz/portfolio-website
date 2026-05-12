import { NavBar } from '@/components/home/NavBar'
import {
  ColdOpen,
  SurfaceSection,
  ProblemDiagram,
  CoreLoopDiagram,
  ScanConsole,
  LifecycleStateMachine,
  CoordinationPanel,
  ImpactGrid,
  AINodes,
  Reflection,
  CaseStudyClose,
} from '@/components/work/wheelchair'

function FramedModule({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-surface-subtle bg-surface-card">
      {children}
    </div>
  )
}

export default function Page() {
  return (
    <>
      <NavBar />
      <main>
        <ColdOpen />

        <SurfaceSection
          label="01 · the problem"
          heading={<>Across four hospitals, an empty wheelchair was a small disappearance.</>}
          intro="Thousands of patient moves a week relied on equipment no system could locate. Retrieval was a radio call. Maintenance was a sticky note."
          footnote="pre-system state · representative"
        >
          <ProblemDiagram />
        </SurfaceSection>

        <SurfaceSection
          label="02 · how it works · the core loop"
          heading={<>The scan is the architecture.</>}
          intro="One gesture moves the whole system: scan a chair, its state changes, the registry records it, every dashboard reads downstream. Pick the gesture first — the model, if there ever is one, comes last."
          footnote="canonical loop · workflow_core v3.x · representative model"
        >
          <CoreLoopDiagram />
        </SurfaceSection>

        <SurfaceSection
          label="03 · try it"
          heading={<>Scan a chair — watch the registry become true.</>}
          intro="Every other surface — dashboard, audit trail, maintenance flag — reads downstream from this one event."
          footnote="interactive prototype · representative state model · workflow_core v3.x"
        >
          <FramedModule>
            <ScanConsole />
          </FramedModule>
        </SurfaceSection>

        <SurfaceSection
          label="04 · lifecycle"
          heading={<>Equipment isn&apos;t inventory — it&apos;s a lifecycle.</>}
          intro="A chair moves through states: in use, returned, cleaned, inspected, maintained, retired. States are how you give a system memory — and how it knows what&apos;s overdue."
          footnote="30-day distribution · representative figures · phase 2 wires real telemetry"
        >
          <LifecycleStateMachine />
        </SurfaceSection>

        <SurfaceSection
          label="05 · operations · four sites, one state"
          heading={<>How a coordinator uses it during a demand spike.</>}
          intro="Equipment moves between sites all day. One shared registry, role-shaped surfaces — see the shortage on the board, tap transfer on the chair, confirm the handoff."
          footnote="multi-site operational console · representative model"
        >
          <FramedModule>
            <CoordinationPanel />
          </FramedModule>
        </SurfaceSection>

        <ImpactGrid />
        <AINodes />
        <Reflection />
        <CaseStudyClose />
      </main>
    </>
  )
}
