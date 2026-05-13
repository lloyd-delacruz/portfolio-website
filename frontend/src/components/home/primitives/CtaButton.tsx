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
        'group inline-flex items-center gap-2.5 rounded-lg px-5 py-3 text-sm font-semibold transition-colors',
        'focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-ink focus-visible:outline-offset-2',
        isFilled
          ? 'bg-paper-ink text-paper-bg hover:bg-paper-ink/90'
          : 'border border-paper-ink/25 text-paper-ink hover:border-gold-ink/60 hover:text-gold-ink',
        className,
      )}
    >
      <span>{children}</span>
      <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
    </Link>
  )
}
