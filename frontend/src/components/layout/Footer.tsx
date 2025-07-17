'use client'

import { Button } from '@/components/ui/button'
import { Github, Linkedin, Mail, Moon, Sun } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Footer() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true'
    setDarkMode(isDark)
    if (isDark) {
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    localStorage.setItem('darkMode', newDarkMode.toString())
    if (newDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      href: 'https://github.com/lloydelacruz',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://linkedin.com/in/lloydelacruz',
    },
    {
      name: 'Email',
      icon: Mail,
      href: 'mailto:lloyd@example.com',
    }
  ]

  return (
    <footer className="w-full border-t border-border bg-background py-8 mt-8">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 px-4">
        <div className="text-center md:text-left">
          <span className="text-lg font-semibold text-foreground">Lloyd Dela Cruz</span>
          <span className="block text-sm text-muted-foreground">Data Analyst & Full-Stack Developer</span>
        </div>
        <div className="flex items-center gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring transition-all"
              aria-label={link.name}
            >
              <link.icon className="h-5 w-5 text-foreground" />
            </a>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={toggleDarkMode}
            aria-label="Toggle theme"
            className="ml-2 w-10 h-10"
          >
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      <div className="mt-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Lloyd Dela Cruz. All rights reserved.
      </div>
    </footer>
  )
}