import { describe, expect, it } from 'vitest'
import { computeCentroids, createFallbackSpace, parseSpace, resolveQuery } from '~/utils/embedding-space'
import type { SpaceQuery } from '~/types/embedding-space'

const valid = {
  version: 1,
  points: [
    { id: 'a', label: 'A', cluster: 'rag', href: null, weight: 1, position: [0, 0, 0] },
    { id: 'b', label: 'B', cluster: 'rag', href: '/work/x', weight: 0.5, position: [2, 0, 0] },
    { id: 'c', label: 'C', cluster: 'ml', href: null, weight: 0.5, position: [0, 4, 0] },
  ],
  edges: [[0, 1]],
  queries: [{ text: 'production RAG pipelines', position: [1, 0, 0], neighbors: [0, 1] }],
}

describe('parseSpace', () => {
  it('accepts a valid document', () => {
    expect(parseSpace(valid)?.points).toHaveLength(3)
  })
  it('rejects unknown clusters', () => {
    expect(parseSpace({ ...valid, points: [{ ...valid.points[0], cluster: 'x' }] })).toBeNull()
  })
  it('rejects edges pointing outside the points array', () => {
    expect(parseSpace({ ...valid, edges: [[0, 9]] })).toBeNull()
  })
  it('rejects non-objects', () => {
    expect(parseSpace(null)).toBeNull()
    expect(parseSpace('x')).toBeNull()
  })
})

describe('computeCentroids', () => {
  it('averages positions per cluster and zeroes empty clusters', () => {
    const c = computeCentroids(parseSpace(valid)!.points)
    expect(c.rag).toEqual([1, 0, 0])
    expect(c.ml).toEqual([0, 4, 0])
    expect(c.agents).toEqual([0, 0, 0])
  })
})

describe('resolveQuery', () => {
  const queries: SpaceQuery[] = [
    { text: 'production RAG pipelines', position: [0, 0, 0], neighbors: [0] },
    { text: 'agent tool calling with MCP', position: [0, 0, 0], neighbors: [1] },
    { text: 'computer vision on the edge', position: [0, 0, 0], neighbors: [2] },
  ]
  it('returns an exact suggested query', () => {
    expect(resolveQuery('agent tool calling with MCP', queries)?.neighbors).toEqual([1])
  })
  it('matches free text by keyword overlap, ignoring case and accents', () => {
    expect(resolveQuery('Visión on EDGE devices', queries)?.text).toBe('computer vision on the edge')
  })
  it('falls back to the first query when nothing matches', () => {
    expect(resolveQuery('pizza recipes', queries)?.text).toBe('production RAG pipelines')
  })
  it('falls back to the first query on empty text', () => {
    expect(resolveQuery('   ', queries)?.text).toBe('production RAG pipelines')
  })
  it('returns null when there are no queries', () => {
    expect(resolveQuery('rag', [])).toBeNull()
  })
})

describe('createFallbackSpace', () => {
  const seeds = [
    { id: 'p1', label: 'P1', cluster: 'ml' as const, href: '/work/p1' },
    { id: 'p2', label: 'P2', cluster: 'rag' as const, href: null },
  ]
  it('is deterministic', () => {
    expect(createFallbackSpace(seeds)).toEqual(createFallbackSpace(seeds))
  })
  it('produces a valid document with at least one query', () => {
    const space = createFallbackSpace(seeds)
    expect(parseSpace(space)).not.toBeNull()
    expect(space.queries.length).toBeGreaterThan(0)
    expect(space.points.length).toBeGreaterThanOrEqual(seeds.length)
  })
})

describe('generated embedding space', () => {
  it('passes schema validation and has 300-800 points', async () => {
    const generated = (await import('~/data/embedding-space.json')).default
    const space = parseSpace(generated)
    expect(space).not.toBeNull()
    expect(space!.points.length).toBeGreaterThanOrEqual(300)
    expect(space!.points.length).toBeLessThanOrEqual(800)
    expect(space!.queries[0]?.neighbors).toHaveLength(5)
  })
})
