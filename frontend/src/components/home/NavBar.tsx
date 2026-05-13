// frontend/src/components/home/NavBar.tsx
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { BrandWordmark } from './primitives'
import { cn } from '@/lib/utils'

type NavKey = 'work' | 'about' | 'thoughts' | 'contact'
type Register = 'light' | 'dark'

const LINKS: { key: NavKey; label: string; href: string }[] = [
  { key: 'work',     label: 'Work',     href: '#systems' },
  { key: 'about',    label: 'About',    href: '/about' },
  { key: 'thoughts', label: 'Thoughts', href: '/blog' },
  { key: 'contact',  label: 'Contact',  href: '#contact' },
]

export function NavBar({ active, register = 'dark' }: { active?: NavKey; register?: Register }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isLight = register === 'light'

  return (
    <header
      className={cn(
        'fixed left-0 right-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? isLight
            ? 'border-b border-paper-subtle bg-paper-bg/80 backdrop-blur-md'
            : 'border-b border-surface-subtle bg-surface-canvas/70 backdrop-blur-md'
          : 'bg-transparent',
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <BrandWordmark register={register} />
        <ul className="flex items-center gap-7">
          {LINKS.map((link) => (
            <li key={link.href} className="relative">
              <Link
                href={link.href}
                className={cn(
                  'text-sm font-semibold transition-colors',
                  'focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
                  isLight ? 'focus-visible:outline-gold-ink' : 'focus-visible:outline-gold',
                  active === link.key
                    ? isLight ? 'text-gold-ink' : 'text-gold'
                    : isLight
                      ? 'text-paper-ink-soft hover:text-paper-ink'
                      : 'text-surface-fg-secondary hover:text-surface-fg',
                )}
              >
                {link.label}
              </Link>
              {active === link.key && (
                <span
                  className={cn(
                    'absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full',
                    isLight ? 'bg-gold-ink' : 'bg-gold',
                  )}
                />
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
