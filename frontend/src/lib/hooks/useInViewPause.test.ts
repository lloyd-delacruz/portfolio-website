import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useInViewPause } from './useInViewPause'

let observeCb: ((entries: { isIntersecting: boolean }[]) => void) | null = null

class MockIntersectionObserver {
  constructor(cb: (entries: { isIntersecting: boolean }[]) => void) { observeCb = cb }
  observe() {}
  disconnect() {}
  unobserve() {}
  takeRecords() { return [] }
  root = null
  rootMargin = ''
  thresholds = []
}

beforeEach(() => {
  // @ts-expect-error - test env
  global.IntersectionObserver = MockIntersectionObserver
  observeCb = null
})
afterEach(() => { vi.restoreAllMocks() })

describe('useInViewPause', () => {
  it('returns inView=false initially', () => {
    const { result } = renderHook(() => useInViewPause<HTMLDivElement>())
    expect(result.current.inView).toBe(false)
  })

  it('flips to true when IntersectionObserver reports intersecting', () => {
    const { result } = renderHook(() => useInViewPause<HTMLDivElement>())
    act(() => {
      observeCb?.([{ isIntersecting: true }])
    })
    expect(result.current.inView).toBe(true)
  })
})
