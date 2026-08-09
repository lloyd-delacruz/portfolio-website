// frontend/src/components/casestudy/mepp/MpBlindIndex.tsx
import { CsSection, Module } from '../bits'
import { DBox, HArrow, VArrow, DiagramPair } from './svg'

const MONO = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'

function Bytes({ x, y, w, h, text }: { x: number; y: number; w: number; h: number; text: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={7} style={{ fill: 'var(--cream-2)', stroke: 'var(--line-strong)' }} strokeWidth={1} />
      <text x={x + w / 2} y={y + h / 2 + 4} textAnchor="middle" fontSize={12} fontFamily={MONO} style={{ fill: 'var(--ink-soft)' }}>
        {text}
      </text>
    </g>
  )
}

const DIAGRAM_LABEL =
  'A patient name is derived two ways. AES-256-GCM with a random nonce produces different ciphertext each time, so the value is retrievable but not searchable. A keyed HMAC produces the same digest every time, so equality lookups can use an index.'

function WideDiagram() {
  return (
    <svg viewBox="0 0 920 320" className="h-auto w-full" role="img" aria-label={DIAGRAM_LABEL}>
      <title>Two derivations of one patient name: ciphertext and blind index</title>

      <DBox x={8} y={130} w={150} h={60} label="Patient name" sub="plaintext input" />
      <line x1={158} y1={160} x2={180} y2={160} style={{ stroke: 'var(--ink-muted)' }} strokeWidth={1.4} />
      <line x1={180} y1={60} x2={180} y2={260} style={{ stroke: 'var(--ink-muted)' }} strokeWidth={1.4} />
      <HArrow x1={180} x2={216} y={60} />
      <HArrow x1={180} x2={216} y={260} />

      {/* Encryption path */}
      <DBox x={220} y={32} w={196} h={56} label="AES-256-GCM" sub="random nonce per call" />
      <HArrow x1={416} x2={454} y={60} />
      <Bytes x={458} y={18} w={186} h={32} text="0x9f3a…c1" />
      <Bytes x={458} y={58} w={186} h={32} text="0xb7e0…4d" />
      <text x={458} y={108} fontSize={11} style={{ fill: 'var(--ink-muted)' }}>
        same name, twice → different bytes
      </text>
      <HArrow x1={644} x2={676} y={60} />
      <DBox x={680} y={30} w={232} h={60} label="Retrievable, not searchable" sub="equality lookup impossible" fs={12} tone="muted" />

      {/* Blind index path */}
      <DBox x={220} y={232} w={196} h={56} label="HMAC · keyed" sub="deterministic digest" />
      <HArrow x1={416} x2={454} y={260} />
      <Bytes x={458} y={244} w={186} h={32} text="0x4e11…a9" />
      <text x={458} y={298} fontSize={11} style={{ fill: 'var(--ink-muted)' }}>
        same name, always → same digest
      </text>
      <HArrow x1={644} x2={676} y={260} tone="plum" />
      <DBox x={680} y={230} w={232} h={60} label="Index-speed lookup" sub="B-tree on the digest" fs={12} tone="plum" />
    </svg>
  )
}

function StackedDiagram() {
  return (
    <svg viewBox="0 0 320 630" className="mx-auto h-auto w-full max-w-[360px]" role="img" aria-label={DIAGRAM_LABEL}>
      <title>Two derivations of one patient name: ciphertext and blind index</title>

      <DBox x={20} y={8} w={280} h={50} label="Patient name" sub="plaintext input" fs={12} />
      <VArrow x={160} y1={58} y2={82} />

      <DBox x={20} y={84} w={280} h={54} label="AES-256-GCM" sub="random nonce per call" fs={12} />
      <VArrow x={160} y1={138} y2={160} />
      <Bytes x={40} y={162} w={240} h={30} text="0x9f3a…c1" />
      <Bytes x={40} y={198} w={240} h={30} text="0xb7e0…4d" />
      <text x={160} y={248} textAnchor="middle" fontSize={10.5} style={{ fill: 'var(--ink-muted)' }}>
        same name, twice → different bytes
      </text>
      <VArrow x={160} y1={258} y2={282} />
      <DBox x={20} y={284} w={280} h={54} label="Retrievable, not searchable" sub="equality lookup impossible" fs={11.5} tone="muted" />

      <line x1={20} y1={362} x2={300} y2={362} style={{ stroke: 'var(--line)' }} strokeWidth={1} strokeDasharray="4 4" />
      <text x={160} y={386} textAnchor="middle" fontSize={10.5} fontWeight={700} style={{ fill: 'var(--plum)' }}>
        SAME INPUT · SECOND DERIVATION
      </text>

      <DBox x={20} y={398} w={280} h={54} label="HMAC · keyed" sub="deterministic digest" fs={12} />
      <VArrow x={160} y1={452} y2={474} />
      <Bytes x={40} y={476} w={240} h={30} text="0x4e11…a9" />
      <text x={160} y={526} textAnchor="middle" fontSize={10.5} style={{ fill: 'var(--ink-muted)' }}>
        same name, always → same digest
      </text>
      <VArrow x={160} y1={536} y2={560} tone="plum" />
      <DBox x={20} y={562} w={280} h={54} label="Index-speed lookup" sub="B-tree on the digest" fs={11.5} tone="plum" />
    </svg>
  )
}

const NOTES = [
  {
    k: 'The constraint',
    v: 'Patient names had to be encrypted at rest and still be typed into a search box by a coordinator.',
  },
  {
    k: 'Why encryption breaks search',
    v: 'AES-GCM randomises its nonce, so the same name encrypts to different ciphertext every time. Nothing matches.',
  },
  {
    k: 'The resolution',
    v: 'Store two derivations of the same value: ciphertext for retrieval, a keyed HMAC digest as a blind index for equality.',
  },
]

export function MpBlindIndex() {
  return (
    <CsSection
      id="blind-index"
      eyebrow="03 · The hard part"
      title="Searching a database that holds no readable identity."
      intro="Encryption and lookup pull in opposite directions. The blind index is how the order search survived the encryption."
    >
      <Module>
        <DiagramPair wide={<WideDiagram />} stacked={<StackedDiagram />} />
      </Module>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {NOTES.map(({ k, v }) => (
          <div key={k} className="rounded-2xl bg-white p-5 ghair soft-shadow-sm">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-plum">{k}</p>
            <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">{v}</p>
          </div>
        ))}
      </div>

      <div
        className="mt-6 rounded-2xl px-7 py-6 ghair"
        style={{ background: 'linear-gradient(105deg,#ede9fe 0%,#f5f0fe 60%,#fce7f3 100%)' }}
      >
        <p className="font-display text-lg font-extrabold leading-snug text-ink sm:text-xl">
          The result: index-speed patient lookup over a database that stores no readable identity.
        </p>
      </div>
    </CsSection>
  )
}
