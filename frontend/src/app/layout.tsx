import type { Metadata, Viewport } from 'next'
import './globals.css'
import '@fontsource-variable/source-serif-4'
import { geistSans, geistMono } from '@/lib/fonts'

export const metadata: Metadata = {
  title: 'Lloyd Dela Cruz — Applied AI Systems',
  description: 'Applied AI engineer building the workflow infrastructure that makes operational AI work in the real world.',
  authors: [{ name: 'Lloyd Dela Cruz' }],
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0a0c',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}
    >
      <body className="font-sans antialiased bg-surface-canvas text-surface-fg">
        {children}
      </body>
    </html>
  )
}
