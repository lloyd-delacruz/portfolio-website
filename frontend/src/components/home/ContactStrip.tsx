import { MonoLabel } from './primitives'

const LINKS = [
  { label: 'github',   href: 'https://github.com/lloyddelacruz' },
  { label: 'linkedin', href: 'https://www.linkedin.com/in/lloyddelacruz/' },
  { label: 'x',        href: 'https://x.com/lloyddelacruz' },
]

const FOCUS_RING =
  'focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold-ink focus-visible:outline-offset-2'

export function ContactStrip() {
  return (
    <section id="contact" className="bg-paper-bg border-t border-paper-subtle">
      <div className="mx-auto max-w-6xl px-6 py-14 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <a
          href="mailto:lloyd.vince1985@gmail.com"
          className={`text-sm md:text-base font-semibold text-paper-ink hover:text-gold-ink transition-colors ${FOCUS_RING}`}
        >
          lloyd.vince1985@gmail.com
        </a>
        <ul className="flex items-center gap-6">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`font-mono text-xs uppercase tracking-wide-label text-paper-ink-soft hover:text-paper-ink transition-colors ${FOCUS_RING}`}
              >
                {l.label}
              </a>
            </li>
          ))}
          <li><MonoLabel className="text-paper-ink-soft">vancouver, bc</MonoLabel></li>
        </ul>
      </div>
    </section>
  )
}
