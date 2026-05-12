import { NavBar } from '@/components/home/NavBar'
import { ColdOpen } from '@/components/work/wheelchair/ColdOpen'

export default function Page() {
  return (
    <>
      <NavBar />
      <main className="bg-surface-canvas text-surface-fg">
        <ColdOpen />
      </main>
    </>
  )
}
