// frontend/src/components/home/primitives/IconBadge.tsx
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

type IconBadgeProps = { icon: LucideIcon; className?: string }

export function IconBadge({ icon: Icon, className }: IconBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex h-9 w-9 items-center justify-center rounded-md border border-gold-ink/30 bg-gold-ink/5 text-gold-ink',
        className,
      )}
      aria-hidden="true"
    >
      <Icon className="h-4 w-4" strokeWidth={1.5} />
    </span>
  )
}
