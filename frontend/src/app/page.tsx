// frontend/src/app/page.tsx
import { NavBar } from '@/components/home/NavBar'
import { HeroSystemsMap } from '@/components/home/HeroSystemsMap'
import { ValuesRow } from '@/components/home/ValuesRow'
import { QuoteBar } from '@/components/home/QuoteBar'
import { FlagshipFeature } from '@/components/home/FlagshipFeature'
import { CapabilityIndex } from '@/components/home/CapabilityIndex'
import { LiveStatusPanel } from '@/components/home/LiveStatusPanel'
import { SelectedSystems } from '@/components/home/SelectedSystems'
import { EssayStrip } from '@/components/home/EssayStrip'
import { ContactStrip } from '@/components/home/ContactStrip'

export default function Home() {
  return (
    <>
      <NavBar active="work" />
      <main className="min-h-screen bg-surface-canvas text-surface-fg">
        <HeroSystemsMap />
        <ValuesRow />
        <QuoteBar />
        <FlagshipFeature />
        <CapabilityIndex />
        <LiveStatusPanel />
        <SelectedSystems />
        <EssayStrip />
        <ContactStrip />
      </main>
    </>
  )
}
