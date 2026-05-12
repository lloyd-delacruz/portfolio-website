import { PaperPillar, SurfaceModule } from './primitives'
import { LifecycleStateMachine } from './LifecycleStateMachine'

export function PillarLifecycle() {
  return (
    <>
      <PaperPillar
        eyebrow="pillar IV · lifecycle · 04 / 05"
        display={<>Equipment isn&apos;t inventory. It&apos;s a lifecycle.</>}
      >
        <p>
          A chair moves through phases — in use, returned, soiled, cleaned, inspected, maintained, retired. Without a state model, the operational view collapses into a binary: <em>here</em> or <em>missing</em>. With one, the system has memory: it knows what each chair has been through, what&apos;s overdue, what&apos;s likely to break.
        </p>
        <p>
          States are how you give a system memory. Without them, every shift starts cold and every coordinator is guessing.
        </p>
      </PaperPillar>
      <SurfaceModule
        caption="30-day distribution · representative figures"
        ariaLabel="Equipment lifecycle state machine"
      >
        <LifecycleStateMachine />
      </SurfaceModule>
    </>
  )
}
