// frontend/src/components/home/SiteFooter.tsx
import Link from 'next/link'

const LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Work', href: '/work' },
  { label: 'Systems', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Thoughts', href: '/blog' },
  { label: 'Resume', href: '/about#resume' },
]

export function SiteFooter() {
  return (
    <footer className="ghair-t">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-ink-muted">© 2024 LD. All rights reserved.</p>
        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {LINKS.map((l) => (
            <Link key={l.label} href={l.href} className="text-sm text-ink-muted transition-colors hover:text-ink">
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  )
}
