// frontend/src/components/home/primitives/BrandWordmark.tsx
import Link from 'next/link'

export function BrandWordmark() {
  return (
    <Link
      href="/"
      className="font-sans text-2xl font-bold tracking-tight-h text-paper-ink transition-colors hover:text-gold-ink focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-ink focus-visible:outline-offset-2"
      aria-label="Lloyd Dela Cruz — home"
    >
      LD
    </Link>
  )
}
