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
npm run dev      # Next.js dev server on port 3001
npm run build    # Production build
npm run start    # Production server
npm run lint     # ESLint
npm run type-check # TypeScript check

# Blog/Content management
npm run create-post      # Create new blog post
npm run list-posts       # List all blog posts
npm run preview-posts    # Preview blog posts content
```


## Architecture & Structure

### Tech Stack
**Frontend:**
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript with strict configuration
- **Styling**: Tailwind CSS with shadcn/ui components
- **Content**: MDX support with @next/mdx
- **Animations**: Framer Motion for smooth interactions
- **Icons**: Lucide React and Radix UI icons
- **Charts**: Chart.js and Recharts for data visualization
- **Typography**: @tailwindcss/typography for blog content


### Project Structure
```
portfolio-website/
├── frontend/              # Next.js frontend application
│   ├── src/
│   │   ├── app/          # Next.js App Router
│   │   │   ├── globals.css    # Global styles with Tailwind
│   │   │   ├── layout.tsx     # Root layout with metadata
│   │   │   ├── page.tsx       # Homepage with hero and sections
│   │   │   └── blog/          # Blog pages and layouts
│   │   ├── components/
│   │   │   ├── layout/        # Navigation and footer components
│   │   │   ├── sections/      # Page sections (About, Experience, Projects)
│   │   │   ├── ui/            # Reusable UI components (shadcn/ui)
│   │   │   └── blog/          # Blog-specific components
│   │   ├── lib/
│   │   │   └── utils.ts       # Utility functions (cn, animations)
│   │   └── types/
│   │       └── index.ts       # TypeScript type definitions
│   ├── content/
│   │   └── blog/             # MDX blog posts
│   ├── scripts/
│   │   └── create-post.js    # Blog post creation script
│   ├── components.json         # shadcn/ui components config
│   ├── eslint.config.mjs       # ESLint configuration
│   ├── postcss.config.js       # PostCSS configuration  
│   ├── tailwind.config.js      # Tailwind CSS configuration
│   ├── next.config.js          # Next.js config with MDX support
│   ├── public/               # Static assets
│   ├── package.json
│   └── tsconfig.json
├── package.json              # Workspace root package.json
├── CLAUDE.md
├── PRD.md
└── README.md
```

### Component Architecture
- **Sections**: Large page sections (Hero, About, Experience, Projects, Contact) 
- **Layout**: Navigation and footer components
- **UI**: Reusable components following shadcn/ui patterns
- **Blog**: Content-specific components for MDX rendering and blog functionality
- All components use TypeScript and follow consistent naming conventions

### Styling System
- **Design System**: Custom Tailwind config with CSS variables for theming
- **Colors**: Uses HSL color system with semantic naming (primary, secondary, muted, etc.)
- **Components**: shadcn/ui component library configured in `components.json`
- **Responsive**: Mobile-first approach with Tailwind breakpoints

### Configuration Details
**Frontend:**
- **Static Export**: Configured for production (`output: 'export'` in production only)
- **Development Port**: Uses port 3001 (configured in package.json)
- **MDX Support**: Configured with @next/mdx for blog content
- **Path Aliases**: `@/*` maps to `src/*` with specific component and lib aliases
- **Images**: Unoptimized for static export compatibility
- **Config Files**: Located in frontend root (tailwind.config.js, postcss.config.js, etc.)

**Workspace:**
- **Structure**: npm workspaces for project organization
- **Scripts**: Root package.json provides convenient frontend commands
- **Content Management**: MDX blog posts in `content/blog/` with creation scripts

## Key Features

### Current Implementation
- ✅ Responsive hero section with animated background elements
- ✅ Professional portfolio sections (Hero, About, Experience, Projects, Skills, Education)
- ✅ Smooth scroll navigation with section anchors
- ✅ Framer Motion animations throughout
- ✅ Mobile-responsive design
- ✅ Journey timeline and core values sections
- ✅ Contact and call-to-action sections
- ✅ Blog/articles section with MDX support
- ✅ Data visualization with Chart.js and Recharts

### Planned Enhancements (from PRD.md)
- Contact form with validation
- Detailed project pages with case studies
- Resume/CV download functionality
- Interactive project demos

## Development Guidelines

### Component Patterns
- Use `'use client'` directive for components requiring interactivity
- Follow the established animation patterns in `src/lib/utils.ts`
- Maintain consistent spacing and layout patterns
- Use semantic HTML and proper accessibility attributes
- Blog components should support MDX rendering with proper typography

### Content Management
- Blog posts are stored in `frontend/content/blog/` as MDX files
- Use `npm run create-post` to generate new blog post templates
- Follow the established frontmatter structure for metadata
- Leverage @tailwindcss/typography for consistent blog styling

### Styling Conventions
- Prefer Tailwind utility classes over custom CSS
- Use the `cn()` utility for conditional className logic
- Follow the established color and spacing system
- Maintain responsive design patterns

### Business Context
This portfolio targets healthcare technology decision makers, recruiters, and industry professionals. The unique value proposition emphasizes the intersection of healthcare domain expertise with technical skills. Content should maintain a professional yet approachable tone.

## Performance Considerations
- Static export configuration optimizes for deployment (production only)
- Images are unoptimized due to static hosting requirements
- Framer Motion animations are optimized for performance
- Component structure supports code splitting
- MDX content is processed at build time for optimal performance
- Development mode uses standard Next.js features for hot reloading