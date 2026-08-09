// frontend/src/components/home/primitives/TooltipIcon.tsx
import type { ReactNode } from 'react'

type TooltipIconProps = {
  icon: ReactNode
  name: string
  description: string
}

/**
 * A pill that always shows the tool's name (icon + label — never
 * hover-only, so the identity never depends on a hover firing) and
 * reveals a one-line "what it's about" tooltip below it on hover/focus.
 * No JS state — group-hover/group-focus-within do the work, so this
 * stays a server component. The description is duplicated into
 * visually-hidden text inside the trigger itself (not just
 * aria-describedby) since the timing of role="tooltip" announcements is
 * inconsistent across screen readers.
 */
export function TooltipIcon({ icon, name, description }: TooltipIconProps) {
  const id = `stack-tip-${name.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`

  return (
    <div className="group/tip relative inline-flex">
      <div
        tabIndex={0}
        aria-describedby={id}
        className="inline-flex cursor-default items-center gap-2 rounded-full bg-white px-3 py-1.5 ghair transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(28,22,46,0.10)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--plum)]"
      >
        <span className="grid h-5 w-5 shrink-0 place-items-center" aria-hidden>
          {icon}
        </span>
        <span className="text-[13px] font-medium text-ink-soft">{name}</span>
        <span className="sr-only"> — {description}</span>
      </div>

      <div
        id={id}
        role="tooltip"
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-full z-20 mt-2.5 w-max max-w-[210px] -translate-x-1/2 scale-95 rounded-lg bg-ink px-3 py-2 text-center opacity-0 shadow-lg transition-all duration-150 group-hover/tip:scale-100 group-hover/tip:opacity-100 group-focus-within/tip:scale-100 group-focus-within/tip:opacity-100"
      >
        <p className="text-[11px] leading-snug text-white">{description}</p>
        <span
          aria-hidden
          className="absolute bottom-full left-1/2 h-2 w-2 -translate-x-1/2 translate-y-1 rotate-45 bg-ink"
        />
      </div>
    </div>
  )
}
