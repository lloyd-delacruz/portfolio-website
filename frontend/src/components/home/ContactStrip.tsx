import { MonoLabel } from './primitives'

const LINKS = [
  { label: 'github',   href: 'https://github.com/lloyddelacruz' },
  { label: 'linkedin', href: 'https://www.linkedin.com/in/lloyddelacruz/' },
  { label: 'x',        href: 'https://x.com/lloyddelacruz' },
]

export function ContactStrip() {
  return (
    <section id="contact" className="bg-surface-canvas border-t border-surface-subtle">
      <div className="mx-auto max-w-6xl px-6 py-14 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <a
          href="mailto:lloyd.vince1985@gmail.com"
          className="font-mono text-sm md:text-base text-surface-fg hover:text-gold transition-colors"
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
                className="font-mono text-xs uppercase tracking-wide-label text-surface-fg-secondary hover:text-surface-fg transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li><MonoLabel>vancouver, bc</MonoLabel></li>
        </ul>
      </div>
    </section>
  )
}
