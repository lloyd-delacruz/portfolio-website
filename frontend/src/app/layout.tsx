import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Lloyd Dela Cruz - Code Architect',
  description: 'Industrial Engineer turned Data Scientist, bridging healthcare and technology through code.',
  keywords: ['Lloyd Dela Cruz', 'Full Stack Developer', 'Data Scientist', 'Healthcare Technology'],
  authors: [{ name: 'Lloyd Dela Cruz' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
