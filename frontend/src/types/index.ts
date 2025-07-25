// Global TypeScript type definitions for the portfolio website

export interface NavItem {
  href: string
  label: string
}

export interface ButtonProps {
  variant?: 'default' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  className?: string
  onClick?: () => void
  disabled?: boolean
}

export interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  imageUrl?: string
  category: 'dashboard' | 'web-app' | 'mobile' | 'data-analysis'
}

export interface Experience {
  id: string
  company: string
  position: string
  duration: string
  description: string[]
  technologies: string[]
  achievements?: string[]
}

export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  duration: string
  gpa?: string
  achievements?: string[]
}

export interface Skill {
  name: string
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
  category: 'Programming' | 'Database' | 'Cloud' | 'Analytics' | 'Framework' | 'Other'
}

// Re-export dashboard types
export * from './dashboard.types';