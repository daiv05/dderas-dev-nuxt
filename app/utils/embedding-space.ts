import type { ClusterId, EmbeddingSpaceData, SpacePoint, SpaceQuery, Vec3 } from '~/types/embedding-space'

export const CLUSTERS: ClusterId[] = ['agents', 'rag', 'ml', 'fullstack']

const isVec3 = (v: unknown): v is Vec3 =>
  Array.isArray(v) && v.length === 3 && v.every((n) => typeof n === 'number' && Number.isFinite(n))

const isPoint = (p: unknown): p is SpacePoint => {
  if (!p || typeof p !== 'object') return false
  const o = p as Record<string, unknown>
  return (
    typeof o.id === 'string' &&
    typeof o.label === 'string' &&
    CLUSTERS.includes(o.cluster as ClusterId) &&
    (o.href === null || typeof o.href === 'string') &&
    typeof o.weight === 'number' &&
    isVec3(o.position)
  )
}

/**
 * Valida un documento de espacio de embeddings y lo devuelve tipado, o null si no cumple el esquema.
 */
export function parseSpace(raw: unknown): EmbeddingSpaceData | null {
  if (!raw || typeof raw !== 'object') return null
  const o = raw as Record<string, unknown>
  if (o.version !== 1 || !Array.isArray(o.points) || !Array.isArray(o.edges) || !Array.isArray(o.queries)) return null
  if (!o.points.every(isPoint)) return null
  const n = o.points.length
  const inRange = (i: unknown) => Number.isInteger(i) && (i as number) >= 0 && (i as number) < n
  const edgesOk = o.edges.every((e) => Array.isArray(e) && e.length === 2 && inRange(e[0]) && inRange(e[1]))
  const queriesOk = o.queries.every((q) => {
    const r = q as Record<string, unknown> | null
    return typeof r?.text === 'string' && isVec3(r.position) && Array.isArray(r.neighbors) && r.neighbors.every(inRange)
  })
  if (!edgesOk || !queriesOk) return null
  return raw as EmbeddingSpaceData
}

export function computeCentroids(points: SpacePoint[]): Record<ClusterId, Vec3> {
  const acc = Object.fromEntries(CLUSTERS.map((c) => [c, { sum: [0, 0, 0] as Vec3, n: 0 }])) as Record<
    ClusterId,
    { sum: Vec3; n: number }
  >
  for (const p of points) {
    const a = acc[p.cluster]
    a.sum = [a.sum[0] + p.position[0], a.sum[1] + p.position[1], a.sum[2] + p.position[2]]
    a.n += 1
  }
  return Object.fromEntries(
    CLUSTERS.map((c) => {
      const { sum, n } = acc[c]
      return [c, n ? ([sum[0] / n, sum[1] / n, sum[2] / n] as Vec3) : ([0, 0, 0] as Vec3)]
    }),
  ) as Record<ClusterId, Vec3>
}

const tokenize = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .split(/[^a-z0-9]+/)
    .filter((t) => t.length > 2)

/**
 * Resuelve texto libre a la consulta sugerida con más palabras en común; si no hay coincidencias devuelve la primera.
 */
export function resolveQuery(text: string, queries: SpaceQuery[]): SpaceQuery | null {
  const first = queries[0]
  if (!first) return null
  const exact = queries.find((q) => q.text.toLowerCase() === text.trim().toLowerCase())
  if (exact) return exact
  const words = new Set(tokenize(text))
  let best = first
  let bestScore = 0
  for (const q of queries) {
    const score = tokenize(q.text).filter((t) => words.has(t)).length
    if (score > bestScore) {
      best = q
      bestScore = score
    }
  }
  return best
}

const CLUSTER_ANCHORS: Record<ClusterId, Vec3> = {
  agents: [-0.55, 0.35, 0.1],
  rag: [0.5, 0.4, -0.15],
  ml: [-0.35, -0.45, 0.2],
  fullstack: [0.45, -0.4, -0.1],
}

const seeded = (seed: number) => () => {
  seed = (seed * 16807) % 2147483647
  return (seed - 1) / 2147483646
}

/**
 * Genera un espacio determinista agrupado por cúmulo para cuando no existe el JSON generado.
 */
export function createFallbackSpace(
  seeds: { id: string; label: string; cluster: ClusterId; href: string | null }[],
): EmbeddingSpaceData {
  const rand = seeded(42)
  const points: SpacePoint[] = []
  for (const cluster of CLUSTERS) {
    const own = seeds.filter((s) => s.cluster === cluster)
    const total = Math.max(own.length, 24)
    const a = CLUSTER_ANCHORS[cluster]
    for (let i = 0; i < total; i++) {
      const seed = own[i]
      points.push({
        id: seed?.id ?? `${cluster}-${i}`,
        label: seed?.label ?? '',
        cluster,
        href: seed?.href ?? null,
        weight: seed ? 1 : 0.25 + rand() * 0.35,
        position: [a[0] + (rand() - 0.5) * 0.45, a[1] + (rand() - 0.5) * 0.45, a[2] + (rand() - 0.5) * 0.45],
      })
    }
  }
  const edges: [number, number][] = []
  for (let i = 0; i + 1 < points.length; i += 2) {
    if (points[i]!.cluster === points[i + 1]!.cluster) edges.push([i, i + 1])
  }
  const ragIdx = points
    .map((p, i) => (p.cluster === 'rag' ? i : -1))
    .filter((i) => i >= 0)
    .slice(0, 5)
  return {
    version: 1,
    points,
    edges,
    queries: [{ text: 'production RAG pipelines', position: CLUSTER_ANCHORS.rag, neighbors: ragIdx }],
  }
}
