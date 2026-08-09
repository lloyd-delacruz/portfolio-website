import type { Metadata } from 'next'

/**
 * These dashboard demos predate the current site and are not linked from any
 * live navigation, the sitemap, or /work — they are unreachable except by
 * direct URL. A route-segment layout is the least invasive way to mark them
 * noindex without touching the ('use client') page files themselves, which
 * can't export metadata directly.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: true },
}

export default function DashboardsLayout({ children }: { children: React.ReactNode }) {
  return children
}
