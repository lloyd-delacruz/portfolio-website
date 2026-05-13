/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'xs': '320px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
    },
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        'paper-subtle': 'rgba(0,0,0,0.08)',
        'paper-border': 'rgba(42,37,32,0.16)',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        surface: {
          canvas:    'hsl(var(--surface-canvas))',
          card:      'hsl(var(--surface-card))',
          elevated:  'hsl(var(--surface-elevated))',
          fg:        'hsl(var(--surface-fg))',
          'fg-secondary': 'hsl(var(--surface-fg-secondary))',
          'fg-muted':     'hsl(var(--surface-fg-muted))',
        },
        paper: {
          bg:       'hsl(var(--paper-bg))',
          card:     'hsl(var(--paper-card))',
          ink:      'hsl(var(--paper-ink))',
          'ink-soft': 'hsl(var(--paper-ink-soft))',
        },
        gold: {
          DEFAULT: 'hsl(var(--accent-gold))',
          ink:     'hsl(var(--accent-gold-ink))',
        },
        signal: {
          live: 'hsl(var(--signal-live))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      borderColor: {
        'surface-subtle': 'rgba(255,255,255,0.06)',
        'surface-strong': 'rgba(255,255,255,0.12)',
        'paper-subtle':   'rgba(0,0,0,0.08)',
        'paper-border':   'rgba(42,37,32,0.16)',
      },
      fontFamily: {
        sans:  ['var(--font-geist-sans)', 'system-ui', '-apple-system', 'sans-serif'],
        mono:  ['var(--font-geist-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        serif: ['"Source Serif 4 Variable"', 'Georgia', 'serif'],
      },
      letterSpacing: {
        'tight-display': '-0.02em',
        'tight-h':       '-0.01em',
        'wide-label':    '0.14em',
      },
    },
  },
  plugins: [],
}