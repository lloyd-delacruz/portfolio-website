import { PaperPillar, SurfaceModule } from './primitives'
import { CoordinationPanel } from './CoordinationPanel'

export function PillarCoordination() {
  return (
    <>
      <PaperPillar
        eyebrow="pillar V · coordination · 05 / 05"
        display={<>Four hospitals, one operational state.</>}
      >
        <p>
          Equipment moves between sites — patient transfers, staff rotations, reallocation during demand spikes. Without a shared registry, four hospitals diverge within days into four incompatible truths. With one, a transport coordinator at Lions Gate knows what&apos;s available at Richmond before she picks up the phone.
        </p>
        <p>
          The hard work isn&apos;t making four sites use the same software. It&apos;s making them agree on the same state, while letting each site&apos;s surface be shaped to its own rhythm.
        </p>
      </PaperPillar>
      <SurfaceModule
        caption="multi-site operational console · representative model"
        ariaLabel="Sites coordination panel with desktop dashboard and mobile workflow"
      >
        <CoordinationPanel />
      </SurfaceModule>
    </>
  )
}
