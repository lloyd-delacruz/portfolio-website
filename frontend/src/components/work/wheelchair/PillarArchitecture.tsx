import { PaperPillar, SurfaceModule } from './primitives'
import { ArchitectureDiagram } from './ArchitectureDiagram'

export function PillarArchitecture() {
  return (
    <>
      <PaperPillar
        eyebrow="pillar II · architecture · 02 / 05"
        display={<>The system isn&apos;t an app. It&apos;s a coordination surface.</>}
      >
        <p>
          Microsoft Lists holds the registry of truth — every chair, every state, every site. QR codes anchor each piece of equipment to that registry physically. Mobile scans are the workflow gesture: the moment a chair changes state in the real world is the moment the system learns about it. Dashboards are the operational lens, role-shaped: a transport coordinator sees a different surface than a maintenance lead.
        </p>
        <p>
          Choose the workflow gesture first, then the state model, then the data, then the interface. The model — if there ever is one — comes last. This is the order operational AI actually has to be built in, and it&apos;s the order most teams reverse.
        </p>
      </PaperPillar>
      <SurfaceModule
        caption="canonical architecture · representative model"
        ariaLabel="System architecture diagram"
      >
        <ArchitectureDiagram />
      </SurfaceModule>
    </>
  )
}
