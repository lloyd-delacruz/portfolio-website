// frontend/src/components/home/BuiltWithRow.tsx
import Image from 'next/image'

type AiTool = { label: string; logo: string }

const AI_TOOLS: AiTool[] = [
  { label: 'Claude',         logo: '/logos/claude.svg' },
  { label: 'OpenAI',         logo: '/logos/openai.svg' },
  { label: 'Gemini',         logo: '/logos/gemini.svg' },
  { label: 'Cursor',         logo: '/logos/cursor.svg' },
  { label: 'GitHub Copilot', logo: '/logos/github-copilot.svg' },
  { label: 'Antigravity',    logo: '/logos/antigravity.svg' },
]

const STACK = [
  'SQL',
  'Python',
  'R',
  'Tableau',
  'Power BI',
  'Next.js',
  'TypeScript',
  'FastAPI',
  'PostgreSQL',
  'Power Platform',
  'Microsoft Lists',
  'QR / barcode workflows',
]

export function BuiltWithRow() {
  return (
    <section className="mx-auto max-w-[1180px] px-6 pb-14 pt-2">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[auto_1fr_auto_1fr] lg:items-center lg:gap-8">
        {/* AI tools group */}
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
          AI tools
        </p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          {AI_TOOLS.map(({ label, logo }) => (
            <span key={label} className="inline-flex items-center gap-2 text-[14px] font-medium text-ink-soft">
              <Image
                src={logo}
                alt=""
                width={18}
                height={18}
                aria-hidden
                style={{ filter: 'grayscale(1)', opacity: 0.75 }}
                unoptimized
              />
              {label}
            </span>
          ))}
        </div>

        {/* divider on lg+, hidden on smaller */}
        <div className="hidden h-8 w-px bg-[var(--line)] lg:block" aria-hidden />

        {/* Stack group */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
            Stack
          </p>
          {STACK.map((item) => (
            <span key={item} className="text-[14px] font-medium text-ink-soft">
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
