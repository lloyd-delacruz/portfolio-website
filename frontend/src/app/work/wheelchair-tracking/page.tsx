import { NavBar } from '@/components/home/NavBar'
import { ColdOpen } from '@/components/work/wheelchair/ColdOpen'
import { PillarVisibility } from '@/components/work/wheelchair/PillarVisibility'
import { PillarArchitecture } from '@/components/work/wheelchair/PillarArchitecture'
import { PillarScan } from '@/components/work/wheelchair/PillarScan'
import { PillarLifecycle } from '@/components/work/wheelchair/PillarLifecycle'
import { PillarCoordination } from '@/components/work/wheelchair/PillarCoordination'
import { ImpactGrid } from '@/components/work/wheelchair/ImpactGrid'
import { Reflection } from '@/components/work/wheelchair/Reflection'
import { AINodes } from '@/components/work/wheelchair/AINodes'

export default function Page() {
  return (
    <>
      <NavBar />
      <main>
        <ColdOpen />
        <PillarVisibility />
        <PillarArchitecture />
        <PillarScan />
        <PillarLifecycle />
        <PillarCoordination />
        <ImpactGrid />
        <Reflection />
        <AINodes />
      </main>
    </>
  )
}
