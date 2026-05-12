// frontend/src/components/home/primitives/CtaButton.tsx
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type CtaButtonProps = {
  href: string
  children: React.ReactNode
  variant?: 'filled' | 'outline'
  className?: string
}

export function CtaButton({ href, children, variant = 'filled', className }: CtaButtonProps) {
  const isFilled = variant === 'filled'
  return (
    <Link
      href={href}
      className={cn(
        'group inline-flex items-center justify-between gap-8 rounded-md px-5 py-3',
        'font-mono text-xs uppercase tracking-wide-label transition-colors',
        'focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2',
        isFilled
          ? 'bg-gold text-surface-canvas hover:bg-gold/90'
          : 'border border-surface-strong text-surface-fg hover:border-gold/50 hover:text-gold',
        className,
      )}
    >
      <span>{children}</span>
      <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
    </Link>
  )
}
