import type { Metadata } from 'next'
import './globals.css'
import { inter } from '@/lib/fonts'

export const metadata: Metadata = {
  title: 'Lloyd Dela Cruz - Data Analytics Professional',
  description: 'Results-driven analytics professional with BSc Industrial Engineering and 20+ years healthcare experience. AWS AI Practitioner specializing in data analytics, Lean Six Sigma, and operational optimization.',
  keywords: ['Lloyd Dela Cruz', 'Data Analytics', 'Healthcare Technology', 'AWS AI Practitioner', 'Data Science', 'Healthcare Analytics'],
  authors: [{ name: 'Lloyd Dela Cruz' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#1e40af',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
