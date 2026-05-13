// frontend/src/components/home/FooterCTA.tsx
import Link from 'next/link'
import { MessageCircle, ArrowRight, Github, Linkedin, Twitter, Mail } from 'lucide-react'

const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com', Icon: Github },
  { label: 'LinkedIn', href: 'https://linkedin.com', Icon: Linkedin },
  { label: 'Twitter', href: 'https://twitter.com', Icon: Twitter },
  { label: 'Email', href: 'mailto:lloyd.delacruz@outlook.com', Icon: Mail },
]

export function FooterCTA() {
  return (
    <section className="mx-auto max-w-[1180px] px-6 py-12">
      <div
        className="grid grid-cols-1 items-center gap-8 rounded-3xl px-9 py-9 ghair lg:grid-cols-[1.4fr_1fr_auto]"
        style={{ background: 'linear-gradient(105deg,#ede9fe 0%,#f5f0fe 45%,#fce7f3 100%)' }}
      >
        <div className="flex items-center gap-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-white soft-shadow-sm" style={{ background: 'var(--plum)' }}>
            <MessageCircle size={22} />
          </div>
          <h2 className="font-display text-2xl font-extrabold leading-tight text-ink sm:text-3xl">
            Let&apos;s build something{' '}
            <span className="grad-plum-text">extraordinary together.</span>
          </h2>
        </div>

        <div>
          <p className="text-sm leading-relaxed text-ink-soft">
            I&apos;m open to exciting opportunities and collaborations. Let&apos;s connect!
          </p>
          <Link
            href="/contact"
            className="group mt-4 inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white soft-shadow-sm transition-transform hover:-translate-y-0.5"
            style={{ background: 'var(--plum)' }}
          >
            Start a conversation
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="lg:text-right">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-muted">Find me on</p>
          <div className="mt-3 flex gap-2 lg:justify-end">
            {SOCIALS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noreferrer"
                className="grid h-10 w-10 place-items-center rounded-full bg-white text-ink-soft ghair transition-colors hover:text-plum"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
