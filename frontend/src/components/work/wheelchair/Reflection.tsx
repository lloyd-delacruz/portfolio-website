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
          <h2 className="font-serif text-3xl md:text-5xl leading-[1.1] text-paper-ink max-w-[26ch] mb-10">
            What operational systems teach you about AI.
          </h2>

          <div className="font-serif text-lg md:text-xl leading-[1.7] text-paper-ink space-y-5 max-w-[64ch]">
            <p>
              For two years I assumed the interesting problem in healthcare AI was the model. The system taught me otherwise. The interesting problem was always the workflow — the scan, the state, the small moment where the human and the registry have to agree on what&apos;s true. Models can&apos;t fix a workflow that doesn&apos;t know what just happened.
            </p>
            <p>
              State is how you give a system memory. Every metric on the previous page, every audit, every future model — they all read downstream from a registry that knows the chair was returned at 14:32 and flagged for cleaning at 14:33. The state machine is the foundation. The model is a tenant.
            </p>
            <p>
              This is the architecture I want to extend AI into — not graft AI onto. When the registry is honest, the scan is fast, and the coordination is shared, an AI node has a real seat at the workflow. Without those, no amount of model quality matters.
            </p>
          </div>

          <p className="mt-12 text-center font-mono text-sm italic text-gold-ink">
            Choose the workflow gesture first. Choose the model last.
          </p>
        </div>
      </section>
    </>
  )
}
