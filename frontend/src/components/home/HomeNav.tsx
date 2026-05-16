// frontend/src/components/home/HomeNav.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Menu, X } from 'lucide-react'

const LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Work', href: '/work' },
  { label: 'Systems', href: '/systems' },
  { label: 'About', href: '/about' },
  { label: 'Thoughts', href: '/blog' },
]

export function HomeNav({ active = 'Home' }: { active?: string }) {
  const [isOpen, setIsOpen] = useState(false)

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

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="group hidden items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white soft-shadow-sm transition-transform hover:-translate-y-0.5 sm:inline-flex"
            style={{ background: 'var(--plum)' }}
          >
            Let&apos;s connect
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </Link>

          <button
            type="button"
            onClick={() => setIsOpen((v) => !v)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-plum transition-colors hover:bg-plum/10 md:hidden"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-plum/10 bg-[var(--cream)]/95 backdrop-blur-md md:hidden">
          <nav className="mx-auto flex max-w-[1180px] flex-col gap-1 px-6 py-4">
            {LINKS.map((l) => {
              const isActive = l.label === active
              return (
                <Link
                  key={l.label}
                  href={l.href}
                  onClick={() => setIsOpen(false)}
                  className={`rounded-lg px-3 py-2.5 text-base font-medium transition-colors ${
                    isActive ? 'bg-plum/10 text-plum' : 'text-ink-soft hover:bg-plum/5 hover:text-ink'
                  }`}
                >
                  {l.label}
                </Link>
              )
            })}
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white soft-shadow-sm sm:hidden"
              style={{ background: 'var(--plum)' }}
            >
              Let&apos;s connect
              <ArrowRight size={15} />
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
