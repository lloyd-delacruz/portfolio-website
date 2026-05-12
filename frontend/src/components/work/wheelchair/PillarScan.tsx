import { PaperPillar, SurfaceModule } from './primitives'
import { ScanConsole } from './ScanConsole'

export function PillarScan() {
  return (
    <>
      <PaperPillar
        eyebrow="pillar III · the scan · 03 / 05"
        display={<>The scan is the architecture.</>}
      >
        <p>
          The QR sticker isn&apos;t the system, and neither is the camera. The system is the agreement that <em>when a chair is scanned, the registry becomes true.</em> Every other surface — the dashboard, the audit trail, the maintenance flag — reads downstream from that one event. Try it.
        </p>
      </PaperPillar>
      <SurfaceModule
        caption="interactive prototype · representative state model · workflow_core v3.x"
        ariaLabel="Interactive QR scan to state change console"
      >
        <ScanConsole />
      </SurfaceModule>
    </>
  )
}
