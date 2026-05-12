import { cn } from '@/lib/utils'

type Direction = 'surface-to-paper' | 'paper-to-surface'

type Props = {
  direction: Direction
  className?: string
}

export function RegisterHandoff({ direction, className }: Props) {
  const gradient =
    direction === 'surface-to-paper'
      ? 'bg-gradient-to-b from-surface-canvas to-paper-bg'
      : 'bg-gradient-to-b from-paper-bg to-surface-canvas'

  return (
    <div
      aria-hidden="true"
      className={cn('relative h-60 w-full', gradient, className)}
    >
      <div className="absolute left-1/2 top-1/2 h-px w-40 -translate-x-1/2 -translate-y-1/2 bg-gold/60" />
    </div>
  )
}
