import type { Metadata, Viewport } from 'next'
import './globals.css'
import '@fontsource-variable/source-serif-4'
import { geistSans, geistMono, jakarta } from '@/lib/fonts'
import { SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  // metadataBase is required for relative Open Graph / canonical URLs to
  // resolve. Without it Next emits relative URLs, which crawlers ignore.
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Lloyd Dela Cruz — Healthcare Systems Engineer',
    template: '%s — Lloyd Dela Cruz',
  },
  description:
    'Healthcare systems engineer building clinical workflow infrastructure — multi-tenant, audit-enforced systems for equipment fleets, provisioning and clinical retrieval.',
  authors: [{ name: 'Lloyd Dela Cruz' }],
  creator: 'Lloyd Dela Cruz',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    siteName: 'Lloyd Dela Cruz',
    locale: 'en_CA',
    url: '/',
    title: 'Lloyd Dela Cruz — Healthcare Systems Engineer',
    description:
      'Clinical workflows, backend architecture and applied AI. Operational healthcare systems, built from inside the workflow.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lloyd Dela Cruz — Healthcare Systems Engineer',
    description:
      'Clinical workflows, backend architecture and applied AI. Operational healthcare systems, built from inside the workflow.',
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.ico',
    apple: '/favicon.svg',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  // Matches --cream. Previously #0a0a0c, which painted mobile browser chrome
  // near-black above a cream page.
  themeColor: '#fbfaf8',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${jakarta.variable} scroll-smooth`}
    >
      {/* bg-[#fbfaf8] matches --cream. The previous bg-surface-canvas painted
          the body #0a0a0c, which showed through on overscroll and on any
          route not wrapped in .home2. */}
      <body className="font-sans antialiased bg-[#fbfaf8] text-[#1f1a2e]">
        {children}
      </body>
    </html>
  )
}
