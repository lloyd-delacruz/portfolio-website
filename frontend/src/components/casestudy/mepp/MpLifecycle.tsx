// frontend/src/components/casestudy/mepp/MpLifecycle.tsx
import { CsSection, Module, Chip } from '../bits'
import { DBox, HArrow, VArrow, DiagramPair } from './svg'

const DIAGRAM_LABEL =
  'A transition request passes a guard. Illegal moves are rejected and the state is unchanged. Legal moves write a new two-level state, which produces a database audit-trigger entry, an append-only version row, and where relevant a security incident record.'

function WideDiagram() {
  return (
    <svg viewBox="0 0 920 300" className="h-auto w-full" role="img" aria-label={DIAGRAM_LABEL}>
      <title>Order state transition mechanics</title>

      <DBox x={8} y={118} w={160} h={64} label="Transition request" sub="from clinician or vendor" fs={12} />
      <HArrow x1={168} x2={206} y={150} />
      <DBox x={210} y={118} w={170} h={64} label="Guard" sub="is this move legal?" />

      <VArrow x={295} y1={182} y2={212} dashed />
      <DBox x={210} y={214} w={170} h={54} label="Rejected" sub="state unchanged" fs={12} tone="muted" />

      <HArrow x1={380} x2={418} y={150} />
      <DBox x={422} y={118} w={170} h={64} label="New state" sub="level 1 + level 2" tone="plum" />

      <line x1={592} y1={150} x2={612} y2={150} style={{ stroke: 'var(--ink-muted)' }} strokeWidth={1.4} />
      <line x1={612} y1={60} x2={612} y2={240} style={{ stroke: 'var(--ink-muted)' }} strokeWidth={1.4} />
      <HArrow x1={612} x2={648} y={60} />
      <HArrow x1={612} x2={648} y={150} />
      <HArrow x1={612} x2={648} y={240} />

      <DBox x={652} y={32} w={260} h={56} label="Audit trigger" sub="written by the database, not the app" fs={12} />
      <DBox x={652} y={122} w={260} h={56} label="Version row" sub="order edits are append-only" fs={12} />
      <DBox x={652} y={212} w={260} h={56} label="security_incidents" sub="recorded, never swallowed" fs={12} />
    </svg>
  )
}

function StackedDiagram() {
  return (
    <svg viewBox="0 0 320 440" className="mx-auto h-auto w-full max-w-[360px]" role="img" aria-label={DIAGRAM_LABEL}>
      <title>Order state transition mechanics</title>

      <DBox x={20} y={8} w={280} h={50} label="Transition request" fs={12} />
      <VArrow x={160} y1={58} y2={82} />
      <DBox x={20} y={84} w={280} h={54} label="Guard" sub="is this move legal?" fs={12} />

      <VArrow x={85} y1={138} y2={162} dashed />
      <VArrow x={235} y1={138} y2={162} />
      <DBox x={20} y={164} w={132} h={52} label="Rejected" sub="unchanged" fs={11} tone="muted" />
      <DBox x={168} y={164} w={132} h={52} label="New state" sub="two levels" fs={11} tone="plum" />

      <VArrow x={234} y1={216} y2={240} />
      <rect x={8} y={244} width={304} height={188} rx={14} style={{ fill: 'none', stroke: 'var(--line)' }} strokeWidth={1} strokeDasharray="5 4" />
      <text x={22} y={262} fontSize={10} fontWeight={700} letterSpacing={0.6} style={{ fill: 'var(--ink-muted)' }}>
        EFFECTS
      </text>
      <DBox x={22} y={272} w={276} h={46} label="Audit trigger" sub="written by the database" fs={11.5} />
      <DBox x={22} y={324} w={276} h={46} label="Version row" sub="append-only order edits" fs={11.5} />
      <DBox x={22} y={376} w={276} h={46} label="security_incidents" sub="recorded, never swallowed" fs={11.5} />
    </svg>
  )
}

export function MpLifecycle() {
  return (
    <CsSection
      eyebrow="04 · Order lifecycle"
      title="Nineteen states, and no way to move between them quietly."
      intro="The order lifecycle is a two-level state machine. Every accepted transition leaves evidence the application layer cannot rewrite."
    >
      <Module>
        <DiagramPair wide={<WideDiagram />} stacked={<StackedDiagram />} />
      </Module>

      <div className="mt-6 flex flex-wrap gap-2">
        <Chip tone="plum">19 states · two levels</Chip>
        <Chip>31 hand-authored SQL migrations</Chip>
        <Chip>112 tests</Chip>
        <Chip>OpenAPI generated from the routes</Chip>
      </div>
    </CsSection>
  )
}
