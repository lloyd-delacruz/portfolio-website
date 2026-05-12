import Link from 'next/link'

export function BrandWordmark() {
  return (
    <Link
      href="/"
      className="font-mono text-sm tracking-wide-label text-surface-fg hover:text-gold transition-colors"
      aria-label="Lloyd Dela Cruz — home"
    >
      lloyd<span className="text-gold">.</span>dev
    </Link>
  )
}
