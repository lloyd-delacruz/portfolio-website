// frontend/src/components/casestudy/clinicalAi/CaArchitecture.tsx
import { CsSection, Module, Chip } from '../bits'
import { DBox, HArrow, VArrow, DiagramPair } from './svg'

const DIAGRAM_LABEL =
  'Two flows meet at the vector store. Offline: the reference corpus is chunked, embedded with text-embedding-3-small and written to ChromaDB. Online: a clinician question is rewritten, retrieved with maximal marginal relevance from ChromaDB, then passed to a language model at temperature zero that returns either a cited answer or a refusal.'

function WideDiagram() {
  return (
    <svg viewBox="0 0 920 380" className="h-auto w-full" role="img" aria-label={DIAGRAM_LABEL}>
      <title>Offline ingestion and online query, converging on the vector store</title>

      <text x={20} y={18} fontSize={10.5} fontWeight={700} letterSpacing={0.7} style={{ fill: 'var(--ink-muted)' }}>
        OFFLINE INGESTION
      </text>
      <DBox x={20} y={30} w={140} h={58} label="Corpus" sub="clinical reference" fs={12} />
      <HArrow x1={160} x2={186} y={59} />
      <DBox x={190} y={30} w={130} h={58} label="Chunk" sub="split + tag" fs={12} />
      <HArrow x1={320} x2={356} y={59} />
      <DBox x={360} y={30} w={200} h={58} label="Embed" sub="text-embedding-3-small" fs={12} />
      <VArrow x={460} y1={88} y2={146} />

      <DBox x={360} y={150} w={200} h={80} label="ChromaDB" sub="vector store" tone="plum" />

      <VArrow x={430} y1={290} y2={234} />
      <VArrow x={492} y1={232} y2={288} />

      <text x={20} y={278} fontSize={10.5} fontWeight={700} letterSpacing={0.7} style={{ fill: 'var(--ink-muted)' }}>
        ONLINE QUERY
      </text>
      <DBox x={20} y={290} w={140} h={58} label="Question" sub="from a clinician" fs={12} />
      <HArrow x1={160} x2={186} y={319} />
      <DBox x={190} y={290} w={130} h={58} label="Rewrite" sub="before retrieval" fs={12} />
      <HArrow x1={320} x2={356} y={319} />
      <DBox x={360} y={290} w={200} h={58} label="Retrieve · MMR" sub="diverse, multi-source" fs={12} />
      <HArrow x1={560} x2={596} y={319} />
      <DBox x={600} y={282} w={150} h={74} label="LLM" sub="temperature 0" tone="plum" />

      <line x1={750} y1={319} x2={768} y2={319} style={{ stroke: 'var(--ink-muted)' }} strokeWidth={1.4} />
      <line x1={768} y1={191} x2={768} y2={319} style={{ stroke: 'var(--ink-muted)' }} strokeWidth={1.4} />
      <HArrow x1={768} x2={786} y={191} />
      <HArrow x1={750} x2={786} y={319} />
      <DBox x={790} y={160} w={122} h={62} label="Refusal" sub="names the gap" fs={11.5} tone="muted" />
      <DBox x={790} y={288} w={122} h={62} label="Answer" sub="+ citations" fs={11.5} />
    </svg>
  )
}

function StackedDiagram() {
  return (
    <svg viewBox="0 0 320 740" className="mx-auto h-auto w-full max-w-[360px]" role="img" aria-label={DIAGRAM_LABEL}>
      <title>Offline ingestion and online query, converging on the vector store</title>

      <text x={20} y={14} fontSize={10} fontWeight={700} letterSpacing={0.6} style={{ fill: 'var(--ink-muted)' }}>
        OFFLINE INGESTION
      </text>
      <DBox x={20} y={24} w={280} h={46} label="Corpus · clinical reference" fs={11.5} />
      <VArrow x={160} y1={70} y2={92} />
      <DBox x={20} y={96} w={280} h={46} label="Chunk · split + tag" fs={11.5} />
      <VArrow x={160} y1={142} y2={164} />
      <DBox x={20} y={168} w={280} h={52} label="Embed" sub="text-embedding-3-small" fs={11.5} />
      <VArrow x={160} y1={220} y2={242} />
      <DBox x={20} y={246} w={280} h={56} label="ChromaDB" sub="vector store" tone="plum" fs={12} />

      <line x1={20} y1={330} x2={300} y2={330} style={{ stroke: 'var(--line)' }} strokeWidth={1} strokeDasharray="5 4" />
      <text x={20} y={352} fontSize={10} fontWeight={700} letterSpacing={0.6} style={{ fill: 'var(--ink-muted)' }}>
        ONLINE QUERY
      </text>
      <DBox x={20} y={364} w={280} h={46} label="Question" fs={11.5} />
      <VArrow x={160} y1={410} y2={432} />
      <DBox x={20} y={436} w={280} h={46} label="Rewrite · before retrieval" fs={11.5} />
      <VArrow x={160} y1={482} y2={504} />
      <DBox x={20} y={508} w={280} h={52} label="Retrieve · MMR" sub="queries the index above" fs={11.5} />
      <VArrow x={160} y1={560} y2={582} />
      <DBox x={20} y={586} w={280} h={52} label="LLM · temperature 0" tone="plum" fs={11.5} />
      <VArrow x={86} y1={638} y2={660} />
      <VArrow x={234} y1={638} y2={660} />
      <DBox x={20} y={664} w={132} h={56} label="Answer" sub="+ citations" fs={11} />
      <DBox x={168} y={664} w={132} h={56} label="Refusal" sub="names the gap" fs={11} tone="muted" />
    </svg>
  )
}

export function CaArchitecture() {
  return (
    <CsSection
      id="pipeline"
      eyebrow="02 · Pipeline"
      title="Two flows, one index."
      intro="Ingestion runs offline and writes the index. Query time reads it. Everything the model says has to come back through that index."
    >
      <Module>
        <DiagramPair wide={<WideDiagram />} stacked={<StackedDiagram />} />
      </Module>

      <div className="mt-6 flex flex-wrap gap-2">
        <Chip tone="plum">ChromaDB</Chip>
        <Chip>LangChain 0.3</Chip>
        <Chip>OpenAI text-embedding-3-small</Chip>
        <Chip>PostgreSQL · users + conversations</Chip>
        <Chip>Google OAuth → app-issued JWT</Chip>
        <Chip>Token-budget rate limiting on embeddings</Chip>
      </div>
    </CsSection>
  )
}
