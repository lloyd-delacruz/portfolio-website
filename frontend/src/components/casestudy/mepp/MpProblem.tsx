// frontend/src/components/casestudy/mepp/MpProblem.tsx
import { CsSection, Module } from '../bits'

type Field = { name: string; toVendor: boolean }

const ORDER_FIELDS: Field[] = [
  { name: 'patient_name', toVendor: false },
  { name: 'patient_address', toVendor: false },
  { name: 'diagnosis_code', toVendor: false },
  { name: 'clinician_notes', toVendor: false },
  { name: 'order_ref', toVendor: true },
  { name: 'equipment_sku', toVendor: true },
  { name: 'quantity', toVendor: true },
  { name: 'delivery_window', toVendor: true },
]

function FieldRow({ field, redacted }: { field: Field; redacted: boolean }) {
  return (
    <li className="flex items-center gap-3 py-[7px]">
      <span className="w-[152px] shrink-0 font-mono text-[12px] text-ink-soft">{field.name}</span>
      {redacted ? (
        <span
          className="h-[10px] flex-1 rounded-[3px]"
          style={{ background: 'repeating-linear-gradient(135deg, rgba(28,22,46,0.18) 0 5px, rgba(28,22,46,0.07) 5px 10px)' }}
          aria-label="withheld"
        />
      ) : (
        <span className="h-[10px] flex-1 rounded-[3px]" style={{ background: 'var(--plum-soft)' }} aria-hidden />
      )}
    </li>
  )
}

const PRESSURES = [
  {
    num: '01',
    title: 'Three parties, one order',
    body: 'A clinician prescribes, a coordinator provisions, an external vendor fulfils. Only one of them should ever hold identity.',
  },
  {
    num: '02',
    title: 'Sharing by convention fails',
    body: 'If the vendor payload is filtered in application code, one forgotten field is a disclosure. The stripping has to be structural.',
  },
  {
    num: '03',
    title: 'Encrypted data still needs finding',
    body: 'Coordinators search patients by name all day. Encryption that breaks lookup gets removed within a week.',
  },
]

export function MpProblem() {
  return (
    <CsSection
      id="problem"
      eyebrow="01 · The problem"
      title="An equipment order is a privacy problem wearing a logistics costume."
      intro="Provisioning needs outside vendors. Vendors need the equipment, the quantity and the window — not the person."
    >
      <Module>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
              On the order record
            </p>
            <ul className="mt-3">
              {ORDER_FIELDS.map((f) => (
                <FieldRow key={f.name} field={f} redacted={false} />
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-plum">
              What the vendor projection carries
            </p>
            <ul className="mt-3">
              {ORDER_FIELDS.map((f) => (
                <FieldRow key={f.name} field={f} redacted={!f.toVendor} />
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-5 text-xs italic text-ink-muted">
          Field names are illustrative of the design intent. Hatched bars are values the vendor projection never
          selects.
        </p>
      </Module>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {PRESSURES.map(({ num, title, body }) => (
          <div key={num} className="rounded-2xl bg-white p-5 ghair soft-shadow-sm">
            <span
              className="inline-flex items-center rounded-md px-2 py-[2px] text-[11px] font-bold tracking-[0.1em]"
              style={{ background: 'var(--plum-soft)', color: 'var(--plum)' }}
            >
              {num}
            </span>
            <h3 className="mt-3 font-display text-[15px] font-bold leading-snug text-ink">{title}</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-ink-soft">{body}</p>
          </div>
        ))}
      </div>
    </CsSection>
  )
}
