import { useEffect, useRef, useState } from 'react'

export function useInViewPause<T extends Element>() {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') return
    const el = ref.current
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => setInView(e.isIntersecting)),
      { threshold: 0.1 }
    )
    if (el) io.observe(el)
    return () => io.disconnect()
  }, [])

  return { ref, inView }
}
