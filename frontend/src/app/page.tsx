// frontend/src/app/page.tsx
import { NavBar } from '@/components/home/NavBar'
import { HomeHero } from '@/components/home/HomeHero'
import { ValuesRow } from '@/components/home/ValuesRow'
import { QuoteBar } from '@/components/home/QuoteBar'
import { FlagshipFeature } from '@/components/home/FlagshipFeature'
import { CapabilityIndex } from '@/components/home/CapabilityIndex'
import { LiveStatusPanel } from '@/components/home/LiveStatusPanel'
import { SelectedSystems } from '@/components/home/SelectedSystems'
import { EssayStrip } from '@/components/home/EssayStrip'
import { ContactStrip } from '@/components/home/ContactStrip'
import { Reveal } from '@/components/home/Reveal'

export default function Home() {
  return (
    <>
      <NavBar active="work" />
      <main className="min-h-screen bg-paper-bg text-paper-ink">
        <HomeHero />
        <Reveal><ValuesRow /></Reveal>
        <Reveal><QuoteBar /></Reveal>
        <Reveal><FlagshipFeature /></Reveal>
        <Reveal><CapabilityIndex /></Reveal>
        <Reveal><LiveStatusPanel /></Reveal>
        <Reveal><SelectedSystems /></Reveal>
        <Reveal><EssayStrip /></Reveal>
        <Reveal><ContactStrip /></Reveal>
      </main>
    </>
  )
}
