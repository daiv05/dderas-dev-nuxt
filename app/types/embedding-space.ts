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
