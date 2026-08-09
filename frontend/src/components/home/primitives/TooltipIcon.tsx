// frontend/src/components/home/primitives/TooltipIcon.tsx
import type { ReactNode } from 'react'

type TooltipIconProps = {
  icon: ReactNode
  name: string
  description: string
}

/**
 * An icon tile that reveals a name + one-line description on hover/focus.
 * No JS state — group-hover/group-focus-within do the work, so this stays
 * a server component. The description is duplicated into visually-hidden
 * text inside the trigger itself (not just aria-describedby) since the
 * timing of role="tooltip" announcements is inconsistent across screen
 * readers.
 */
export function TooltipIcon({ icon, name, description }: TooltipIconProps) {
  const id = `stack-tip-${name.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}`

  return (
    <div className="group/tip relative">
      <div
        tabIndex={0}
        aria-describedby={id}
        className="grid h-11 w-11 cursor-default place-items-center rounded-xl bg-white ghair transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(28,22,46,0.10)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--plum)]"
      >
        {icon}
        <span className="sr-only">
          {name} — {description}
        </span>
      </div>

      <div
        id={id}
        role="tooltip"
        aria-hidden="true"
        className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2.5 w-max max-w-[200px] -translate-x-1/2 scale-95 rounded-lg bg-ink px-3 py-2 text-center opacity-0 shadow-lg transition-all duration-150 group-hover/tip:scale-100 group-hover/tip:opacity-100 group-focus-within/tip:scale-100 group-focus-within/tip:opacity-100"
      >
        <p className="text-[11.5px] font-semibold text-white">{name}</p>
        <p className="mt-0.5 text-[10.5px] leading-snug text-white/70">{description}</p>
        <span
          aria-hidden
          className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1 rotate-45 bg-ink"
        />
      </div>
    </div>
  )
}
