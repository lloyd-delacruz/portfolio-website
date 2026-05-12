import { NavBar } from '@/components/home/NavBar'
import { ColdOpen } from '@/components/work/wheelchair/ColdOpen'
import { PillarVisibility } from '@/components/work/wheelchair/PillarVisibility'

export default function Page() {
  return (
    <>
      <NavBar />
      <main>
        <ColdOpen />
        <PillarVisibility />
      </main>
    </>
  )
}
