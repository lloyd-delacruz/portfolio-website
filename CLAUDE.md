# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Lloyd Dela Cruz's portfolio website - a modern, professional portfolio showcasing expertise in healthcare technology, data science, and full-stack development. Built with Next.js 15 and designed to highlight the intersection of engineering, healthcare, and technology skills.

## Development Commands

### Workspace Commands (run from root)
```bash
# Frontend development server
npm run dev
# or specifically
npm run frontend:dev

# Build frontend for production
npm run build
# or specifically
npm run frontend:build

# Start frontend production server
npm run start

# Linting and type checking
npm run lint
npm run type-check

```

### Frontend Commands (run from frontend/)
```bash
cd frontend
npm run dev      # Next.js dev server
npm run build    # Production build
npm run start    # Production server
npm run lint     # ESLint
npm run type-check # TypeScript check
```


## Architecture & Structure

### Tech Stack
**Frontend:**
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript with strict configuration
- **Styling**: Tailwind CSS with shadcn/ui components
- **Animations**: Framer Motion for smooth interactions
- **Icons**: Lucide React
- **Fonts**: Inter from Google Fonts


### Project Structure
```
portfolio-website/
├── frontend/              # Next.js frontend application
│   ├── src/
│   │   ├── app/          # Next.js App Router
│   │   │   ├── globals.css    # Global styles with Tailwind
│   │   │   ├── layout.tsx     # Root layout with metadata
│   │   │   └── page.tsx       # Homepage with hero and sections
│   │   ├── components/
│   │   │   ├── layout/        # Navigation and layout components
│   │   │   ├── sections/      # Page sections (About, Experience, Projects)
│   │   │   └── ui/            # Reusable UI components (shadcn/ui)
│   │   ├── lib/
│   │   │   └── utils.ts       # Utility functions (cn, animations)
│   │   └── types/
│   │       └── index.ts       # TypeScript type definitions
│   ├── components.json         # shadcn/ui components config
│   ├── eslint.config.mjs       # ESLint configuration
│   ├── postcss.config.js       # PostCSS configuration  
│   ├── tailwind.config.js      # Tailwind CSS configuration
│   ├── public/               # Static assets
│   ├── package.json
│   ├── tsconfig.json
│   └── next.config.js
├── package.json              # Workspace root package.json
├── CLAUDE.md
├── PRD.md
└── README.md
```

### Component Architecture
- **Sections**: Large page sections (Hero, About, Experience, Projects, Contact) 
- **Layout**: Navigation and footer components
- **UI**: Reusable components following shadcn/ui patterns
- All components use TypeScript and follow consistent naming conventions

### Styling System
- **Design System**: Custom Tailwind config with CSS variables for theming
- **Colors**: Uses HSL color system with semantic naming (primary, secondary, muted, etc.)
- **Components**: shadcn/ui component library configured in `components.json`
- **Responsive**: Mobile-first approach with Tailwind breakpoints

### Configuration Details
**Frontend:**
- **Static Export**: Configured for static site generation (`output: 'export'`)
- **Development Port**: Forced to 3001 via environment variables
- **Path Aliases**: `@/*` maps to `src/*` with specific component and lib aliases
- **Images**: Unoptimized for static export compatibility
- **Config Files**: Located in frontend root (tailwind.config.js, postcss.config.js, etc.)

**Workspace:**
- **Structure**: npm workspaces for project organization
- **Scripts**: Root package.json provides convenient frontend commands
- **Note**: README.md mentions port 3005 but actual config uses port 3001

## Key Features

### Current Implementation
- ✅ Responsive hero section with animated background elements
- ✅ Professional portfolio sections (Hero, About, Experience, Projects, Skills, Education)
- ✅ Smooth scroll navigation with section anchors
- ✅ Framer Motion animations throughout
- ✅ Mobile-responsive design
- ✅ Journey timeline and core values sections
- ✅ Contact and call-to-action sections

### Planned Enhancements (from PRD.md)
- Contact form with validation
- Detailed project pages with case studies
- Blog/articles section
- Resume/CV download functionality
- Interactive project demos

## Development Guidelines

### Component Patterns
- Use `'use client'` directive for components requiring interactivity
- Follow the established animation patterns in `src/lib/utils.ts`
- Maintain consistent spacing and layout patterns
- Use semantic HTML and proper accessibility attributes

### Styling Conventions
- Prefer Tailwind utility classes over custom CSS
- Use the `cn()` utility for conditional className logic
- Follow the established color and spacing system
- Maintain responsive design patterns

### Business Context
This portfolio targets healthcare technology decision makers, recruiters, and industry professionals. The unique value proposition emphasizes the intersection of healthcare domain expertise with technical skills. Content should maintain a professional yet approachable tone.

## Performance Considerations
- Static export configuration optimizes for deployment
- Images are unoptimized due to static hosting requirements
- Framer Motion animations are optimized for performance
- Component structure supports code splitting