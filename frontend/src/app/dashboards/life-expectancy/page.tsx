// frontend/src/app/dashboards/life-expectancy/page.tsx
import type { Metadata } from 'next'
import { MovedTo } from '@/components/work/deep-dive'

export const metadata: Metadata = {
  title: 'Population-Health Intelligence Platform — Lloyd Dela Cruz',
  description: 'This case study has moved to /work/population-health-intelligence.',
}

export default function Page() {
  return (
    <MovedTo
      href="/work/population-health-intelligence"
      title="Population-Health Intelligence Platform"
    />
  )
}
