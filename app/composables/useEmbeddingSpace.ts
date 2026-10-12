import generated from '~/data/embedding-space.json'
import { projectList } from '~/data/projects'
import type { ClusterId, EmbeddingSpaceData, SpaceQuery } from '~/types/embedding-space'
import { computeCentroids, createFallbackSpace, parseSpace, resolveQuery } from '~/utils/embedding-space'

let cachedSpace: EmbeddingSpaceData | null = null

const loadSpace = (): EmbeddingSpaceData => {
  if (cachedSpace) return cachedSpace
  cachedSpace =
    parseSpace(generated) ??
    createFallbackSpace(
      projectList.map((p) => ({ id: p.id, label: p.translations.en.name, cluster: p.cluster, href: `/work/${p.id}` })),
    )
  return cachedSpace
}

/**
 * Estado compartido del espacio de embeddings: datos, centroides, cúmulo activo y consulta activa.
 */
export function useEmbeddingSpace() {
  const space = computed(loadSpace)
  const centroids = computed(() => computeCentroids(space.value.points))
  const activeCluster = useState<ClusterId | null>('space:cluster', () => null)
  const activeQueryText = useState<string | null>('space:query', () => null)

  const activeQuery = computed<SpaceQuery | null>(
    () => space.value.queries.find((q) => q.text === activeQueryText.value) ?? null,
  )

  const highlighted = computed(() => new Set(activeQuery.value?.neighbors ?? []))

  const runQuery = (text: string) => {
    const query = resolveQuery(text, space.value.queries)
    activeQueryText.value = query?.text ?? null
    return query
  }

  return { space, centroids, activeCluster, activeQuery, highlighted, runQuery }
}
