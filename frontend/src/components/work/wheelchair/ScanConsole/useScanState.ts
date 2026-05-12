import { useCallback, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion'

export type EquipmentState =
  | 'in_use'
  | 'returned'
  | 'needs_cleaning'
  | 'cleaning'
  | 'available'

export type LogEntry = {
  id: string
  timestamp: string
  site: string
  from: EquipmentState
  to: EquipmentState
  staffId: string
}

type Config = {
  initialState: EquipmentState
  siteId: string
  staffId: string
}

export const TRANSITIONS: Record<EquipmentState, EquipmentState[]> = {
  in_use:         ['returned'],
  returned:       ['needs_cleaning', 'available'],
  needs_cleaning: ['cleaning'],
  cleaning:       ['available'],
  available:      ['in_use'],
}

const SCAN_SWEEP_MS = 200
const LOG_SETTLE_MS = 60
const MAX_LOG = 5

function nowHMS(): string {
  const d = new Date()
  const pad = (n: number) => n.toString().padStart(2, '0')
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}

function makeId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

export function useScanState(config: Config) {
  const reducedMotion = usePrefersReducedMotion()
  const [current, setCurrent] = useState<EquipmentState>(config.initialState)
  const [log, setLog] = useState<LogEntry[]>([])
  const [scanInFlight, setScanInFlight] = useState(false)
  const flightTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const commit = useCallback(
    (from: EquipmentState, to: EquipmentState) => {
      const entry: LogEntry = {
        id: makeId(),
        timestamp: nowHMS(),
        site: config.siteId,
        staffId: config.staffId,
        from,
        to,
      }
      setCurrent(to)
      setLog((prev) => [entry, ...prev].slice(0, MAX_LOG))
    },
    [config.siteId, config.staffId]
  )

  const scan = useCallback(
    (next: EquipmentState) => {
      const allowed = TRANSITIONS[current].includes(next)
      if (!allowed) return

      if (reducedMotion) {
        commit(current, next)
        return
      }

      setScanInFlight(true)
      if (flightTimer.current) clearTimeout(flightTimer.current)
      if (settleTimer.current) clearTimeout(settleTimer.current)

      flightTimer.current = setTimeout(() => {
        commit(current, next)
        settleTimer.current = setTimeout(() => setScanInFlight(false), LOG_SETTLE_MS)
      }, SCAN_SWEEP_MS)
    },
    [current, reducedMotion, commit]
  )

  const reset = useCallback(() => {
    if (flightTimer.current) clearTimeout(flightTimer.current)
    if (settleTimer.current) clearTimeout(settleTimer.current)
    setCurrent(config.initialState)
    setLog([])
    setScanInFlight(false)
  }, [config.initialState])

  return { current, log, scanInFlight, scan, reset, reducedMotion }
}
