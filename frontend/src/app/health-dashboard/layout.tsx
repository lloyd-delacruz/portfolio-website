import type { Metadata } from 'next'

/**
 * Same rationale as src/app/dashboards/layout.tsx: this page is unreachable
 * from any live navigation or the sitemap, and the page itself is a
 * ('use client') component that can't export metadata directly.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: true },
}

export default function HealthDashboardLayout({ children }: { children: React.ReactNode }) {
  return children
}
