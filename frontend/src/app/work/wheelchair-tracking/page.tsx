import { NavBar } from '@/components/home/NavBar'
import {
  ColdOpen, PillarVisibility, PillarArchitecture, PillarScan,
  PillarLifecycle, PillarCoordination, ImpactGrid, Reflection,
  AINodes, CaseStudyClose,
} from '@/components/work/wheelchair'

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
        <CaseStudyClose />
      </main>
    </>
  )
}
