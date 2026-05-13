// frontend/src/components/casestudy/spendwise/SwPhone.tsx
import type { ReactNode } from 'react'

// A small iPhone-style frame: black bezel, notch, "9:41" status bar, home indicator.
// `children` is the screen content; the screen area is a white column with px-3 py-3.
export function SwPhone({
  children,
  className = '',
  width = 220,
}: {
  children: ReactNode
  className?: string
  width?: number
}) {
  return (
    <div
      className={`relative shrink-0 rounded-[2rem] bg-[#15131c] p-[6px] soft-shadow-lg ${className}`}
      style={{ width }}
    >
      {/* notch */}
      <div className="absolute left-1/2 top-[6px] z-10 h-[16px] w-[34%] -translate-x-1/2 rounded-b-[10px] bg-[#15131c]" aria-hidden />
      <div className="overflow-hidden rounded-[1.6rem] bg-white">
        {/* status bar */}
        <div className="flex items-center justify-between px-4 pb-1 pt-2 text-[9px] font-semibold text-ink">
          <span>9:41</span>
          <span className="flex items-center gap-1">
            <span className="inline-block h-1.5 w-3 rounded-[1px]" style={{ background: 'rgba(31,26,46,0.7)' }} />
            <span className="inline-block h-1.5 w-2 rounded-[1px]" style={{ background: 'rgba(31,26,46,0.4)' }} />
          </span>
        </div>
        {/* screen */}
        <div className="px-3 pb-7 pt-1">{children}</div>
        {/* home indicator */}
        <div className="mx-auto mb-2 h-1 w-1/4 rounded-full" style={{ background: 'rgba(31,26,46,0.2)' }} aria-hidden />
      </div>
    </div>
  )
}
