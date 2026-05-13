// frontend/src/components/home/primitives/StatItem.tsx
import { cn } from '@/lib/utils'

type StatItemProps = { value: string; label: string; className?: string }

export function StatItem({ value, label, className }: StatItemProps) {
  return (
    <div className={cn('text-center', className)}>
      <div className="text-2xl md:text-3xl font-bold text-gold-ink">{value}</div>
      <div className="mt-1 text-[11px] uppercase tracking-wide-label text-paper-ink-soft">{label}</div>
    </div>
  )
}
