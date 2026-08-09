// frontend/src/components/casestudy/clientWork/CwWire.tsx
// Abstract monochrome layout sketches. These are not screenshots and are not
// derived from any client's visual identity — they only indicate page shape.

export type WireKind = 'clinic' | 'booking' | 'roster' | 'grid' | 'editorial'

const FILL = 'rgba(28,22,46,0.10)'
const FILL_STRONG = 'rgba(28,22,46,0.20)'

function Bar({ x, y, w, h, strong }: { x: number; y: number; w: number; h: number; strong?: boolean }) {
  return <rect x={x} y={y} width={w} height={h} rx={2} style={{ fill: strong ? FILL_STRONG : FILL }} />
}

export function CwWire({ kind }: { kind: WireKind }) {
  return (
    <svg
      viewBox="0 0 112 76"
      className="h-[68px] w-[100px] shrink-0"
      role="img"
      aria-label={`Abstract layout sketch: ${kind} page structure`}
    >
      <title>Layout sketch</title>
      <rect x={0.5} y={0.5} width={111} height={75} rx={7} style={{ fill: '#ffffff', stroke: 'var(--line-strong)' }} strokeWidth={1} />
      <Bar x={8} y={8} w={26} h={4} strong />
      <Bar x={78} y={8} w={26} h={4} />

      {kind === 'clinic' && (
        <>
          <Bar x={8} y={20} w={56} h={22} strong />
          <Bar x={70} y={20} w={34} h={22} />
          <Bar x={8} y={48} w={30} h={20} />
          <Bar x={42} y={48} w={30} h={20} />
          <Bar x={76} y={48} w={28} h={20} />
        </>
      )}
      {kind === 'booking' && (
        <>
          <Bar x={8} y={20} w={96} h={18} strong />
          <Bar x={8} y={44} w={44} h={24} />
          <Bar x={58} y={44} w={46} h={10} />
          <Bar x={58} y={58} w={30} h={10} />
        </>
      )}
      {kind === 'roster' && (
        <>
          <Bar x={8} y={20} w={96} h={14} strong />
          <Bar x={8} y={40} w={96} h={7} />
          <Bar x={8} y={51} w={96} h={7} />
          <Bar x={8} y={62} w={68} h={7} />
        </>
      )}
      {kind === 'grid' && (
        <>
          <Bar x={8} y={20} w={30} h={22} strong />
          <Bar x={42} y={20} w={30} h={22} />
          <Bar x={76} y={20} w={28} h={22} />
          <Bar x={8} y={48} w={30} h={20} />
          <Bar x={42} y={48} w={30} h={20} />
          <Bar x={76} y={48} w={28} h={20} />
        </>
      )}
      {kind === 'editorial' && (
        <>
          <Bar x={8} y={20} w={62} h={30} strong />
          <Bar x={76} y={20} w={28} h={8} />
          <Bar x={76} y={32} w={28} h={8} />
          <Bar x={76} y={44} w={20} h={6} />
          <Bar x={8} y={56} w={96} h={12} />
        </>
      )}
    </svg>
  )
}
