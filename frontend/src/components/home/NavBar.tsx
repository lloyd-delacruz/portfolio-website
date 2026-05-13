// frontend/src/components/home/NavBar.tsx
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { BrandWordmark } from './primitives'
import { cn } from '@/lib/utils'

type NavKey = 'work' | 'about' | 'thoughts' | 'contact'

const LINKS: { key: NavKey; label: string; href: string }[] = [
  { key: 'work',     label: 'Work',     href: '#systems' },
  { key: 'about',    label: 'About',    href: '/about' },
  { key: 'thoughts', label: 'Thoughts', href: '/blog' },
  { key: 'contact',  label: 'Contact',  href: '#contact' },
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
          ? 'border-b border-paper-subtle bg-paper-bg/80 backdrop-blur-md'
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
                  'text-sm font-semibold transition-colors',
                  'focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-ink focus-visible:outline-offset-2',
                  active === link.key ? 'text-gold-ink' : 'text-paper-ink-soft hover:text-paper-ink',
                )}
              >
                {link.label}
              </Link>
              {active === link.key && (
                <span className="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-gold-ink" />
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
