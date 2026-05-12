// frontend/src/components/home/NavBar.tsx
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { BrandWordmark } from './primitives'
import { cn } from '@/lib/utils'

type NavKey = 'work' | 'about' | 'thoughts' | 'contact'

const LINKS: { key: NavKey; label: string; href: string }[] = [
  { key: 'work',     label: 'work',     href: '#systems' },
  { key: 'about',    label: 'about',    href: '/about' },
  { key: 'thoughts', label: 'thoughts', href: '/blog' },
  { key: 'contact',  label: 'contact',  href: '#contact' },
]

export function NavBar({ active }: { active?: NavKey }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed left-0 right-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-surface-subtle bg-surface-canvas/70 backdrop-blur-md'
          : 'bg-transparent',
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <BrandWordmark />
        <ul className="flex items-center gap-7">
          {LINKS.map((link) => (
            <li key={link.href} className="relative">
              <Link
                href={link.href}
                className={cn(
                  'font-mono text-xs uppercase tracking-wide-label transition-colors',
                  'focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2',
                  active === link.key
                    ? 'text-gold'
                    : 'text-surface-fg-secondary hover:text-surface-fg',
                )}
              >
                {link.label}
              </Link>
              {active === link.key && (
                <span className="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-gold" />
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
