// frontend/src/components/home/HomeNav.tsx
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Work', href: '/work' },
  { label: 'Systems', href: '/systems' },
  { label: 'About', href: '/about' },
  { label: 'Thoughts', href: '/blog' },
]

export function HomeNav({ active = 'Home' }: { active?: string }) {
  return (
    <header className="sticky top-0 z-50 bg-[var(--cream)]/85 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-[1180px] items-center justify-between px-6">
        <Link href="/" className="font-display text-xl font-extrabold tracking-tight text-plum">
          LD
        </Link>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
          {LINKS.map((l) => {
            const isActive = l.label === active
            return (
              <Link
                key={l.label}
                href={l.href}
                className="relative text-sm font-medium text-ink-soft transition-colors hover:text-ink"
              >
                <span className={isActive ? 'text-plum' : ''}>{l.label}</span>
                {isActive && (
                  <span className="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-plum" />
                )}
              </Link>
            )
          })}
        </nav>

        <Link
          href="/contact"
          className="group inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white soft-shadow-sm transition-transform hover:-translate-y-0.5"
          style={{ background: 'var(--plum)' }}
        >
          Let&apos;s connect
          <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </header>
  )
}
