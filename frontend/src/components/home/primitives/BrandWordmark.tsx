// frontend/src/components/home/primitives/BrandWordmark.tsx
import Link from 'next/link'

export function BrandWordmark() {
  return (
    <Link
      href="/"
      className="font-serif text-2xl font-medium tracking-tight-h text-surface-fg transition-colors hover:text-gold focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2"
      aria-label="Lloyd Dela Cruz — home"
    >
      LD
    </Link>
  )
}
