import { NavBar } from '@/components/home/NavBar'
import { ColdOpen } from '@/components/work/wheelchair/ColdOpen'
import { PillarVisibility } from '@/components/work/wheelchair/PillarVisibility'
import { PillarArchitecture } from '@/components/work/wheelchair/PillarArchitecture'
import { PillarScan } from '@/components/work/wheelchair/PillarScan'

export default function Page() {
  return (
    <>
      <NavBar />
      <main>
        <ColdOpen />
        <PillarVisibility />
        <PillarArchitecture />
        <PillarScan />
      </main>
    </>
  )
}
