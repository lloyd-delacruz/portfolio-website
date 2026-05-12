import { RegisterHandoff, PaperPillar, SurfaceModule } from './primitives'
import { PreSystemDashboard } from './PreSystemDashboard'

export function PillarVisibility() {
  return (
    <>
      <RegisterHandoff direction="surface-to-paper" />
      <PaperPillar
        eyebrow="pillar I · visibility · 01 / 05"
        display={<>Before the system, an empty wheelchair was a small disappearance.</>}
      >
        <p>
          Across four hospitals, thousands of patient movements per week relied on equipment whose location no system could name. Retrieval was a radio call. Maintenance was a sticky note. The most expensive item in the building — the patient&apos;s time — was being spent looking for the second-most-expensive item.
        </p>
        <p>
          The interesting move wasn&apos;t the model. It was making the work observable. A logistics system that can&apos;t see itself can&apos;t improve, and most operational AI fails here, long before the algorithm — in the layer where the human and the system stop agreeing on what&apos;s true.
        </p>
      </PaperPillar>
      <SurfaceModule
        caption="pre-system state · representative"
        ariaLabel="What invisibility looks like"
      >
        <PreSystemDashboard />
      </SurfaceModule>
    </>
  )
}
