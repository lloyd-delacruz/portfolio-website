import { NavBar } from '@/components/home/NavBar'
import { HeroSystemsMap } from '@/components/home/HeroSystemsMap'
import { CapabilityIndex } from '@/components/home/CapabilityIndex'
import { LiveStatusPanel } from '@/components/home/LiveStatusPanel'
import { FlagshipFeature } from '@/components/home/FlagshipFeature'
import { SelectedSystems } from '@/components/home/SelectedSystems'
import { EssayStrip } from '@/components/home/EssayStrip'
import { ContactStrip } from '@/components/home/ContactStrip'

export default function Home() {
  return (
    <>
      <NavBar />
      <main className="min-h-screen bg-surface-canvas text-surface-fg">
        <HeroSystemsMap />
        <CapabilityIndex />
        <LiveStatusPanel />
        <FlagshipFeature />
        <SelectedSystems />
        <EssayStrip />
        <ContactStrip />
      </main>
    </>
  )
}
