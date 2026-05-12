import { RegisterHandoff } from './primitives'

export function Reflection() {
  return (
    <>
      <RegisterHandoff direction="surface-to-paper" />
      <section className="bg-paper-bg text-paper-ink">
        <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
          <p className="font-mono text-[10px] uppercase tracking-wide-label text-paper-ink-soft mb-6">
            reflection · builder note
          </p>
          <h2 className="font-serif text-3xl md:text-5xl leading-[1.12] text-paper-ink max-w-[22ch] mb-8">
            The model is a tenant. The state machine is the building.
          </h2>

          <div className="font-serif text-lg md:text-xl leading-[1.65] text-paper-ink space-y-4 max-w-[58ch]">
            <p>
              For two years I assumed the interesting problem in healthcare AI was the model. The system taught me otherwise — it was always the workflow: the scan, the state, the small moment where a human and a registry have to agree on what just happened.
            </p>
            <p>
              State is how you give a system memory. Every metric on the page above reads downstream from a registry that knows the chair was returned at 14:32 and flagged for cleaning at 14:33. Get that honest, and an AI node has a real seat. Skip it, and no amount of model quality matters.
            </p>
          </div>

          <p className="mt-10 text-center font-mono text-sm italic text-gold-ink">
            Choose the workflow gesture first. Choose the model last.
          </p>
        </div>
      </section>
      <RegisterHandoff direction="paper-to-surface" />
    </>
  )
}
