// frontend/src/components/casestudy/automationEngine/AeFlowDemo.tsx
'use client'

import { useEffect, useState } from 'react'
import {
  Play, Pause, RotateCcw,
  Webhook, Cloud, GitBranch, Send, Database,
  CheckCircle2, ArrowRight,
} from 'lucide-react'
import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion'
import { CsSection, Module, Chip } from '../bits'
import { FLOW, type StepIcon } from '@/components/work/automation-engine/data'

const ICON_MAP: Record<StepIcon, typeof Webhook> = {
  Webhook,
  Cloud,
  GitBranch,
  Send,
  Database,
}

const CYCLE_MS = 2200

type StepStatus = 'pending' | 'running' | 'done'

function statusFor(stepId: number, activeStep: number): StepStatus {
  if (stepId < activeStep) return 'done'
  if (stepId === activeStep) return 'running'
  return 'pending'
}

export function AeFlowDemo() {
  const reduced = usePrefersReducedMotion()
  const [activeStep, setActiveStep] = useState<number>(reduced ? FLOW.steps.length : 1)
  const [playing, setPlaying] = useState<boolean>(!reduced)

  useEffect(() => {
    if (!playing) return
    const t = setInterval(() => {
      setActiveStep((s) => (s >= FLOW.steps.length ? 1 : s + 1))
    }, CYCLE_MS)
    return () => clearInterval(t)
  }, [playing])

  const visibleActions = FLOW.actions.filter((a) => a.emittedAtStep <= activeStep)
  const auditVisible = activeStep >= FLOW.steps.length
  const currentCaption = FLOW.steps.find((s) => s.id === activeStep)?.caption ?? ''

  function handleStepClick(id: number) {
    setPlaying(false)
    setActiveStep(id)
  }

  return (
    <CsSection
      id="demo"
      eyebrow="03 · One flow, end-to-end"
      title="Watch one handoff become a workflow."
      intro="A trigger fires, the orchestrator decides, actions fan out, and everything is logged. Step through it or let it run."
      footnote="Representative built prototype. Concrete example shown to illustrate the shape — the same scaffold is reused across the patterns shown next."
    >
      <div
        aria-live="polite"
        className="sr-only"
      >
        {`Step ${activeStep} of ${FLOW.steps.length}: ${currentCaption}`}
      </div>

      <div className="mb-5 flex items-center gap-2">
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          className="inline-flex items-center gap-2 rounded-full bg-[var(--plum)] px-3 py-1.5 text-xs font-semibold text-white"
        >
          {playing ? <Pause size={13} /> : <Play size={13} />}
          {playing ? 'Pause' : 'Run flow'}
        </button>
        <button
          type="button"
          onClick={() => { setPlaying(false); setActiveStep(1) }}
          className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-ink ghair"
        >
          <RotateCcw size={13} /> Reset
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Zone 1 — trigger payload */}
        <Module className="p-5">
          <header className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
            {FLOW.trigger.source}
          </header>
          <pre className="mt-3 overflow-auto rounded-lg bg-[var(--cream-2)] p-3 text-[11px] leading-snug text-ink-soft">
{JSON.stringify(FLOW.trigger.payload, null, 2)}
          </pre>
        </Module>

        {/* Zone 2 — orchestration */}
        <Module className="p-5">
          <header className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
            Orchestration
          </header>
          <ol className="mt-3 space-y-2">
            {FLOW.steps.map((step) => {
              const status = statusFor(step.id, activeStep)
              const Icon = ICON_MAP[step.icon]
              return (
                <li key={step.id}>
                  <button
                    type="button"
                    aria-current={status === 'running' ? 'step' : undefined}
                    onClick={() => handleStepClick(step.id)}
                    className="flex w-full items-center gap-3 rounded-lg p-2 text-left transition-all duration-300"
                    style={{
                      background:
                        status === 'running'
                          ? 'rgba(59,130,246,0.10)'
                          : status === 'done'
                            ? 'rgba(16,185,129,0.08)'
                            : 'transparent',
                      border:
                        status === 'running'
                          ? '1px solid rgba(59,130,246,0.35)'
                          : '1px solid rgba(28,22,46,0.06)',
                    }}
                  >
                    <span
                      className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-white"
                      style={{
                        color:
                          status === 'done'
                            ? 'var(--green)'
                            : status === 'running'
                              ? 'var(--blue)'
                              : 'rgba(28,22,46,0.4)',
                      }}
                    >
                      {status === 'done' ? <CheckCircle2 size={15} /> : <Icon size={14} />}
                    </span>
                    <span className="flex-1 text-[12px] font-medium text-ink">{step.label}</span>
                    <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                      {step.kind}
                    </span>
                  </button>
                </li>
              )
            })}
          </ol>
          <p className="mt-3 text-[11px] italic leading-snug text-ink-soft">{currentCaption}</p>
        </Module>

        {/* Zone 3 — actions & audit */}
        <div className="flex flex-col gap-4">
          <Module className="p-5">
            <header className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
              Actions fanned out
            </header>
            <ul className="mt-3 space-y-2">
              {FLOW.actions.map((a) => {
                const visible = a.emittedAtStep <= activeStep
                return (
                  <li
                    key={a.path}
                    className="flex items-center gap-2 rounded-md bg-[var(--cream-2)] p-2"
                    style={{ opacity: visible ? 1 : 0.35 }}
                  >
                    <Chip tone={visible ? 'green' : 'neutral'}>{a.method}</Chip>
                    <code className="flex-1 truncate text-[10.5px] text-ink">{a.path}</code>
                    <span className="text-[10px] text-ink-muted">{a.surface}</span>
                    {visible && <CheckCircle2 size={13} style={{ color: 'var(--green)' }} />}
                  </li>
                )
              })}
            </ul>
            {visibleActions.length === 0 && (
              <p className="mt-2 text-[10px] italic text-ink-muted">Awaiting orchestration…</p>
            )}
          </Module>

          <Module className="p-5">
            <header className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
              Audit log
            </header>
            <div
              className="mt-3 flex items-center gap-3 rounded-md bg-[var(--cream-2)] p-3"
              style={{ opacity: auditVisible ? 1 : 0.35 }}
            >
              <ArrowRight size={14} style={{ color: 'var(--blue)' }} />
              <code className="flex-1 text-[10.5px] text-ink">
                {FLOW.audit.correlationId} · outcome={FLOW.audit.outcome} · {FLOW.audit.durationMs}ms
              </code>
            </div>
          </Module>
        </div>
      </div>
    </CsSection>
  )
}
