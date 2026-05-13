'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, X, type LucideIcon } from 'lucide-react'
import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion'

type Props = {
  Icon: LucideIcon
  title: string
  tint: string
  bg: string
  children: ReactNode
  detail: ReactNode
  detailLabel?: string
}

export function InfoCard({ Icon, title, tint, bg, children, detail, detailLabel = 'More' }: Props) {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const reduced = usePrefersReducedMotion()

  // portal target only exists after mount (no SSR mismatch)
  useEffect(() => {
    setMounted(true)
  }, [])

  // Esc to close + body scroll lock while open
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open])

  const modal =
    mounted &&
    createPortal(
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            aria-hidden={!open}
          >
            {/* backdrop */}
            <button
              type="button"
              aria-label="Close"
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-[rgba(28,22,46,0.45)] backdrop-blur-[2px]"
            />

            {/* dialog */}
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby={`infocard-title-${title.replace(/\W+/g, '-').toLowerCase()}`}
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.97 }}
              animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.2, 0.7, 0.3, 1] }}
              className="home2 relative z-10 flex max-h-[85vh] w-full max-w-[520px] flex-col overflow-hidden rounded-2xl bg-white ghair-2 soft-shadow-lg"
            >
              <div className="flex items-start gap-3 border-b border-[var(--line)] px-6 py-5 sm:px-7">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl" style={{ background: bg }}>
                  <Icon size={22} style={{ color: tint }} strokeWidth={1.9} />
                </div>
                <h3
                  id={`infocard-title-${title.replace(/\W+/g, '-').toLowerCase()}`}
                  className="mt-1 flex-1 font-display text-[19px] font-bold text-ink"
                  style={{ letterSpacing: '-0.01em' }}
                >
                  {title}
                </h3>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="grid h-8 w-8 place-items-center rounded-full text-ink-muted transition-colors hover:bg-black/5 hover:text-ink"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="flex-1 overflow-auto px-6 py-5 text-[0.95rem] leading-relaxed text-ink-soft sm:px-7">
                {detail}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body,
    )

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="lift group flex h-full w-full flex-col rounded-2xl bg-white p-6 text-left ghair sm:p-7"
      >
        <div className="flex items-center gap-3">
          <div
            className="grid h-12 w-12 place-items-center rounded-xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
            style={{ background: bg }}
          >
            <Icon size={22} style={{ color: tint }} strokeWidth={1.9} />
          </div>
          <h3 className="font-display text-[19px] font-bold text-ink" style={{ letterSpacing: '-0.01em' }}>
            {title}
          </h3>
        </div>

        <div className="mt-5 flex-1 text-[0.98rem] leading-relaxed text-ink-soft">{children}</div>

        <span
          className="mt-5 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors group-hover:text-ink"
          style={{ color: 'var(--ink-muted)' }}
        >
          <Plus size={13} strokeWidth={2.2} style={{ color: tint }} />
          {detailLabel}
        </span>
      </button>

      {modal}
    </>
  )
}
