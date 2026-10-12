---
name: embedding-space
description: Interactive 3D embedding space on the home page - three.js canvas, static SVG fallback, QueryConsole, scroll story, generated embedding-space.json and its Python pipeline. Use when touching app/components/space, useEmbeddingSpace, useScrollStory, utils/embedding-space.ts, scripts/ or the home build section.
---

# Embedding Space

> The site's projects, experience, capabilities and blog paragraphs embedded offline, reduced to 3D with UMAP and rendered as a point cloud with a live similarity query.

## Key files

- `app/types/embedding-space.ts` - `ClusterId`, `Vec3`, `SpacePoint`, `SpaceQuery`, `EmbeddingSpaceData`
- `app/utils/embedding-space.ts` - `CLUSTERS`, `parseSpace`, `computeCentroids`, `resolveQuery`, `createFallbackSpace`
- `app/utils/motion.ts` - `decideMotion`
- `app/composables/useEmbeddingSpace.ts`, `useScrollStory.ts`, `useMotionPreference.ts`
- `app/components/space/EmbeddingSpace.vue` - chooses canvas or fallback, renders the legend
- `app/components/space/EmbeddingCanvas.client.vue` - plain three.js renderer
- `app/components/space/EmbeddingFallback.vue` - static SVG
- `app/components/space/QueryConsole.vue` - live query input
- `app/components/home/HomeHero.vue`, `HomeBuild.vue` - consumers
- `app/data/embedding-space.json` - generated data
- `scripts/export-site-text.mjs`, `scripts/build-embedding-space.py`, `scripts/requirements.txt`
- `test/unit/embedding-space.test.ts`, `test/unit/motion.test.ts`

## Data model

```ts
export type ClusterId = 'agents' | 'rag' | 'ml' | 'fullstack'
export type Vec3 = [number, number, number]

export interface SpacePoint {
  id: string
  label: string
  cluster: ClusterId
  href: string | null
  weight: number
  position: Vec3
}

export interface SpaceQuery {
  text: string
  position: Vec3
  neighbors: number[]
}

export interface EmbeddingSpaceData {
  version: 1
  points: SpacePoint[]
  edges: [number, number][]
  queries: SpaceQuery[]
}
```

`parseSpace(raw)` validates a document and returns `EmbeddingSpaceData | null`. `resolveQuery(text, queries)` returns the exact match, otherwise the suggested query sharing the most words, otherwise the first. `computeCentroids(points)` returns one `Vec3` per cluster. `createFallbackSpace(seeds)` builds a deterministic clustered space from projects when the JSON is invalid.

## useEmbeddingSpace()

```ts
const { space, centroids, activeCluster, activeQuery, highlighted, runQuery } = useEmbeddingSpace()

runQuery('production RAG pipelines')
```

`space` loads `embedding-space.json` through `parseSpace`, falling back to `createFallbackSpace(projectList...)`. `activeCluster` (`space:cluster`) and the active query text (`space:query`) are `useState`. `highlighted` is a `Set<number>` of the active query's neighbor indices. `runQuery(text)` resolves and activates a query and returns it.

## useScrollStory(sections)

```ts
useScrollStory(CLUSTERS.map((cluster, i) => ({ el: refs[i]!, cluster })))
```

Creates one ScrollTrigger per section (`start: 'top 55%'`, `end: 'bottom 45%'`) that sets `activeCluster` on enter and enter-back, and resets it to `null` on unmount. `HomeBuild` renders four stacked cluster rows driven this way.

## Rendering

`EmbeddingSpace` always renders `EmbeddingFallback`. It mounts `<LazyEmbeddingCanvas>` only when `ready`, `allow3d`, browser idle (`requestIdleCallback`, 1500ms timeout) and no error have occurred.

`EmbeddingCanvas.client.vue` uses named imports from `three`: `WebGLRenderer`, `PerspectiveCamera`, `Scene`, `InstancedMesh`, `LineSegments` and others. It owns its `requestAnimationFrame` loop, caps the pixel ratio at 1.5, pauses on `document.hidden` and when an `IntersectionObserver` reports it offscreen, sizes through a `ResizeObserver`, repaints colors from the CSS tokens through a `MutationObserver` on the `html` class, and emits `error` if `WebGLRenderer` creation throws. Points are one `InstancedMesh`, neighbor edges are `LineSegments`, and the active query adds a ring and dashed lines. The camera lerps toward the active cluster centroid.

## QueryConsole

```vue
<QueryConsole autoplay />
```

Props: `autoplay?: boolean` (default `false`). Suggested queries come from `space.queries`; `pick` and `submit` call `runQuery`. With autoplay it types the first query after 700ms, or selects it immediately when `allowMotion` is false. Results are the deduplicated neighbor points linked with `localePath`. Text comes from `home.query.*`.

## Regenerating the data

```bash
npx tsx scripts/export-site-text.mjs
scripts/.venv/Scripts/python scripts/build-embedding-space.py
```

`export-site-text.mjs` writes `scripts/.cache/site-text.json` from `projectList`, `experienceList`, capabilities and `content/en/blog`. `build-embedding-space.py` embeds with `all-MiniLM-L6-v2`, reduces to 3D with UMAP, builds 3-nearest-neighbor edges and 5-neighbor query results, and writes `app/data/embedding-space.json`. Requirements are in `scripts/requirements.txt` (sentence-transformers, umap-learn, numpy<2.1, scikit-learn<1.6), installed in `scripts/.venv` with torch from the CPU index.

## Restrictions

- Do not edit `embedding-space.json` by hand; regenerate it
- Do not import `three` outside `EmbeddingCanvas.client.vue`
- Do not render the canvas during SSR or when `allow3d` is false; the fallback must always work
- Keep cluster ids in sync across `types/embedding-space.ts`, `CLUSTERS`, `ProjectCluster` and the `home.build.clusters.*` locale keys
- Clean up observers, listeners, geometries and materials in `onBeforeUnmount`
- Run the generation scripts after changing projects, experience or blog content that should appear in the space
