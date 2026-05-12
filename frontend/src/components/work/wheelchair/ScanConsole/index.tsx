'use client'

import { useMemo } from 'react'
import { ScannerPanel } from './ScannerPanel'
import { EquipmentRecord } from './EquipmentRecord'
import { DistributedEffect } from './DistributedEffect'
import { useScanState, TRANSITIONS, type EquipmentState } from './useScanState'

const STATE_SENTENCE: Record<EquipmentState, string> = {
  in_use:         'in use',
  returned:       'returned',
  needs_cleaning: 'needs cleaning',
  cleaning:       'cleaning',
  available:      'available',
}

const VGH_BASE_AVAILABLE = 187

export function ScanConsole() {
  const state = useScanState({ initialState: 'in_use', siteId: 'vgh-3w', staffId: '4471' })
  const allowed = TRANSITIONS[state.current]

  // Derive a live VGH-available count from the log. Decrement on (any → in_use),
  // increment on (in_use → returned). Other transitions don't move the available pool.
  const vghAvailable = useMemo(() => {
    let n = VGH_BASE_AVAILABLE
    // log is newest-first; iterate oldest-first
    for (const e of [...state.log].reverse()) {
      if (e.to === 'in_use') n -= 1
      else if (e.from === 'in_use' && e.to === 'returned') n += 1
    }
    return n
  }, [state.log])

  return (
    <div className="grid grid-cols-1 md:grid-cols-3">
      <ScannerPanel
        current={state.current}
        scanInFlight={state.scanInFlight}
        reducedMotion={state.reducedMotion}
        allowed={allowed}
        onScan={state.scan}
      />
      <EquipmentRecord
        current={state.current}
        log={state.log}
        reducedMotion={state.reducedMotion}
      />
      <DistributedEffect
        scanInFlight={state.scanInFlight}
        reducedMotion={state.reducedMotion}
        activeSite="vgh"
        vghAvailable={vghAvailable}
      />
      <div className="sr-only" role="status" aria-live="polite">
        {`Equipment EQ-VGH-0287, state ${STATE_SENTENCE[state.current]}.`}
      </div>
    </div>
  )
}
