// frontend/src/components/casestudy/spendwise/SwMark.tsx
// Hand-built SpendWise logo: overlapping translucent "S" ribbons in plum/pink/teal/amber.

export function SwMark({ size = 28, withWordmark = true }: { size?: number; withWordmark?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden>
        <defs>
          <linearGradient id="sw-a" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#6d28d9" /><stop offset="1" stopColor="#ec4899" />
          </linearGradient>
          <linearGradient id="sw-b" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#0d9488" /><stop offset="1" stopColor="#f59e0b" />
          </linearGradient>
        </defs>
        <path d="M34 12c-4-5-13-6-19-2S7 22 12 26s17 3 21 8-3 13-12 12-13-6-13-6" fill="none" stroke="url(#sw-a)" strokeWidth="7" strokeLinecap="round" opacity="0.92" />
        <path d="M14 36c4 5 13 6 19 2s8-12 3-16-17-3-21-8 3-13 12-12 13 6 13 6" fill="none" stroke="url(#sw-b)" strokeWidth="7" strokeLinecap="round" opacity="0.78" />
      </svg>
      {withWordmark && (
        <span className="font-display text-[1.05rem] font-extrabold tracking-tight text-ink">SpendWise</span>
      )}
    </span>
  )
}
