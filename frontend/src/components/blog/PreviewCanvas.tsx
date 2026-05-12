'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export type PreviewVariant =
  | 'healthcare'
  | 'ai'
  | 'data-science'
  | 'development'
  | 'default'

export function variantFromCategory(category: string): PreviewVariant {
  switch (category) {
    case 'healthcare':
    case 'ai':
    case 'data-science':
    case 'development':
      return category
    default:
      return 'default'
  }
}

type Props = {
  variant: PreviewVariant
  active: boolean
  className?: string
}

export function PreviewCanvas({ variant, active, className }: Props) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'relative h-[140px] w-full overflow-hidden rounded-md',
        'border border-surface-subtle bg-surface-card',
        className
      )}
    >
      {variant === 'healthcare' && <HealthcareScene active={active} />}
      {variant === 'ai' && <AIScene active={active} />}
      {variant === 'data-science' && <DataScienceScene active={active} />}
      {variant === 'development' && <DevelopmentScene active={active} />}
      {variant === 'default' && <DefaultScene active={active} />}
    </div>
  )
}

function HealthcareScene({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 200 100" className="h-full w-full">
      <line
        x1="20" y1="50" x2="180" y2="50"
        stroke="currentColor" strokeWidth="1"
        className="text-surface-fg-muted"
      />
      {[20, 100, 180].map((cx) => (
        <circle
          key={cx} cx={cx} cy="50" r="4"
          fill="currentColor"
          className="text-surface-fg-muted"
        />
      ))}
      <motion.circle
        cx="20" cy="50" r="3.5"
        fill="currentColor"
        className="text-gold"
        animate={active ? { cx: [20, 100, 180], opacity: [0, 1, 1, 0] } : { cx: 20, opacity: 0 }}
        transition={{ duration: 1.6, ease: 'easeInOut', times: [0, 0.5, 0.9, 1] }}
      />
    </svg>
  )
}

function AIScene({ active }: { active: boolean }) {
  const arrowDelays = [0, 0.15, 0.3, 0.45]
  return (
    <svg viewBox="0 0 200 100" className="h-full w-full">
      <rect
        x="85" y="35" width="30" height="30" rx="3"
        fill="none" stroke="currentColor" strokeWidth="1"
        className="text-surface-fg-muted"
      />
      {/* left input arrows */}
      {[35, 65].map((y, i) => (
        <motion.line
          key={`in-${y}`}
          x1="20" y1={y} x2="83" y2={y === 35 ? 42 : 58}
          stroke="currentColor" strokeWidth="1"
          className={active ? 'text-gold' : 'text-surface-fg-muted'}
          animate={active ? { opacity: [0.3, 1, 0.3] } : { opacity: 0.4 }}
          transition={{ duration: 1.2, repeat: Infinity, delay: arrowDelays[i] }}
        />
      ))}
      {/* right output arrows */}
      {[42, 58].map((y, i) => (
        <motion.line
          key={`out-${y}`}
          x1="117" y1={y} x2="180" y2={y === 42 ? 35 : 65}
          stroke="currentColor" strokeWidth="1"
          className={active ? 'text-gold' : 'text-surface-fg-muted'}
          animate={active ? { opacity: [0.3, 1, 0.3] } : { opacity: 0.4 }}
          transition={{ duration: 1.2, repeat: Infinity, delay: arrowDelays[i + 2] }}
        />
      ))}
    </svg>
  )
}

function DataScienceScene({ active }: { active: boolean }) {
  // a hand-drawn sparkline path
  const d = 'M 10 70 L 35 55 L 60 62 L 85 40 L 110 48 L 135 28 L 160 35 L 190 15'
  return (
    <svg viewBox="0 0 200 100" className="h-full w-full">
      {/* baseline */}
      <line
        x1="10" y1="85" x2="190" y2="85"
        stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 3"
        className="text-surface-fg-muted opacity-50"
      />
      <motion.path
        d={d}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-gold"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: active ? 1 : 0.15 }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
      />
    </svg>
  )
}

function DevelopmentScene({ active }: { active: boolean }) {
  const dots = [20, 40, 60, 80, 100]
  return (
    <svg viewBox="0 0 200 120" className="h-full w-full">
      <line
        x1="100" y1="20" x2="100" y2="100"
        stroke="currentColor" strokeWidth="1"
        className="text-surface-fg-muted"
      />
      {dots.map((cy, i) => (
        <motion.circle
          key={cy}
          cx="100" cy={cy} r={i === 0 ? 4 : 3}
          fill="currentColor"
          className={i === 0 ? 'text-gold' : 'text-surface-fg-muted'}
          animate={
            i === 0 && active
              ? { r: [4, 6, 4], opacity: [1, 0.6, 1] }
              : { r: i === 0 ? 4 : 3 }
          }
          transition={{ duration: 1.1, repeat: i === 0 && active ? Infinity : 0 }}
        />
      ))}
    </svg>
  )
}

function DefaultScene({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 200 100" className="h-full w-full">
      {Array.from({ length: 25 }).map((_, i) => {
        const row = Math.floor(i / 5)
        const col = i % 5
        return (
          <motion.circle
            key={i}
            cx={40 + col * 30}
            cy={15 + row * 18}
            r={1.5}
            fill="currentColor"
            className="text-surface-fg-muted"
            animate={{ opacity: active ? [0.3, 1, 0.3] : 0.35 }}
            transition={{
              duration: 1.6,
              repeat: active ? Infinity : 0,
              delay: (row + col) * 0.08,
            }}
          />
        )
      })}
    </svg>
  )
}
