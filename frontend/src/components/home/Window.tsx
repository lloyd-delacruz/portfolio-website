import type { ReactNode } from 'react'

/**
 * Three-dot browser-chrome window used by FeaturedWork previews,
 * AnchorCase screenshot, and any future homepage screenshot tile.
 */
export function Window({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-1 flex-col gap-2 rounded-md bg-white/85 p-2.5">
      <div className="flex items-center gap-1">
        <span className="h-1.5 w-1.5 rounded-full bg-black/15" />
        <span className="h-1.5 w-1.5 rounded-full bg-black/15" />
        <span className="h-1.5 w-1.5 rounded-full bg-black/15" />
      </div>
      {children}
    </div>
  )
}
