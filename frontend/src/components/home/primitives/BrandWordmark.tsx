// frontend/src/components/home/primitives/BrandWordmark.tsx
import Link from 'next/link'
import { cn } from '@/lib/utils'

export function BrandWordmark({ register = 'dark' }: { register?: 'light' | 'dark' }) {
  return (
    <Link
      href="/"
      className={cn(
        'font-sans text-2xl font-bold tracking-tight-h transition-colors focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
        register === 'light'
          ? 'text-paper-ink hover:text-gold-ink focus-visible:outline-gold-ink'
          : 'text-surface-fg hover:text-gold focus-visible:outline-gold',
      )}
      aria-label="Lloyd Dela Cruz — home"
    >
      LD
    </Link>
  )
}
