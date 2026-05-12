import { cn } from '@/lib/utils'

type LiveDotProps = { className?: string; pulse?: boolean }

export function LiveDot({ className, pulse = true }: LiveDotProps) {
  return (
    <span className={cn('relative inline-flex h-1.5 w-1.5', className)}>
      {pulse && (
        <span className="absolute inset-0 rounded-full bg-signal-live opacity-60 animate-ping" />
      )}
      <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-signal-live shadow-[0_0_10px_rgba(108,217,154,0.6)]" />
    </span>
  )
}
