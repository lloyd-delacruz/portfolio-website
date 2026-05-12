import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useScanState } from './useScanState'

// Force the reduced-motion default to false unless overridden.
function mockMatchMedia(matches: boolean) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
      onchange: null,
    }),
  })
}

const config = { initialState: 'in_use' as const, siteId: 'vgh-3w', staffId: '4471' }

describe('useScanState', () => {
  beforeEach(() => {
    mockMatchMedia(false)
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns initial state with empty log', () => {
    const { result } = renderHook(() => useScanState(config))
    expect(result.current.current).toBe('in_use')
    expect(result.current.log).toEqual([])
    expect(result.current.scanInFlight).toBe(false)
  })

  it('transitions in_use → returned and appends a log entry', () => {
    const { result } = renderHook(() => useScanState(config))
    act(() => result.current.scan('returned'))
    // Scan is in-flight during the 200ms sweep
    expect(result.current.scanInFlight).toBe(true)
    act(() => vi.advanceTimersByTime(200))
    expect(result.current.current).toBe('returned')
    expect(result.current.log).toHaveLength(1)
    expect(result.current.log[0]).toMatchObject({
      from: 'in_use',
      to: 'returned',
      site: 'vgh-3w',
      staffId: '4471',
    })
    act(() => vi.advanceTimersByTime(60))
    expect(result.current.scanInFlight).toBe(false)
  })

  it('rejects disallowed transitions (in_use → cleaning is not allowed)', () => {
    const { result } = renderHook(() => useScanState(config))
    act(() => result.current.scan('cleaning'))
    // No transition occurred
    expect(result.current.current).toBe('in_use')
    expect(result.current.log).toHaveLength(0)
    expect(result.current.scanInFlight).toBe(false)
  })

  it('truncates the log to 5 most recent entries', () => {
    const { result } = renderHook(() => useScanState(config))
    const sequence = ['returned', 'needs_cleaning', 'cleaning', 'available', 'in_use', 'returned'] as const
    for (const next of sequence) {
      act(() => result.current.scan(next))
      act(() => vi.advanceTimersByTime(260))
    }
    expect(result.current.log).toHaveLength(5)
    // Newest entry first
    expect(result.current.log[0]).toMatchObject({ from: 'in_use', to: 'returned' })
  })

  it('with reduced motion, applies state change without scan-flight delay', () => {
    mockMatchMedia(true)
    const { result } = renderHook(() => useScanState(config))
    act(() => result.current.scan('returned'))
    // Reduced-motion path is synchronous: state already changed, no flight
    expect(result.current.current).toBe('returned')
    expect(result.current.scanInFlight).toBe(false)
    expect(result.current.log).toHaveLength(1)
  })

  it('reset returns to the initial state with empty log', () => {
    const { result } = renderHook(() => useScanState(config))
    act(() => result.current.scan('returned'))
    act(() => vi.advanceTimersByTime(260))
    act(() => result.current.reset())
    expect(result.current.current).toBe('in_use')
    expect(result.current.log).toEqual([])
  })
})
