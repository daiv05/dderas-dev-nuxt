<template>
  <TresPerspectiveCamera :position="[0, 0, 2.1]" :fov="45" :near="0.1" :far="20" />
  <primitive :object="root" />
</template>

<script setup lang="ts">
import { useLoop, useTres } from '@tresjs/core'
import {
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  Group,
  IcosahedronGeometry,
  InstancedMesh,
  LineBasicMaterial,
  LineDashedMaterial,
  LineSegments,
  MathUtils,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  RingGeometry,
  Vector3,
} from 'three'

import type { ClusterId } from '~/types/embedding-space'

const props = defineProps<{ pointer: { x: number; y: number }; paused: boolean }>()

const { space, centroids, activeCluster, activeQuery, highlighted } = useEmbeddingSpace()
const { camera, invalidate } = useTres()

const root = new Group()
const cloud = new Group()
root.add(cloud)

const points = space.value.points
const sphere = new IcosahedronGeometry(1, 1)
const pointMaterial = new MeshBasicMaterial({ transparent: true, opacity: 0.85 })
const mesh = new InstancedMesh(sphere, pointMaterial, points.length)
const matrix = new Matrix4()
points.forEach((p, i) => {
  const s = 0.008 + p.weight * 0.016
  matrix.makeScale(s, s, s)
  matrix.setPosition(p.position[0], p.position[1], p.position[2])
  mesh.setMatrixAt(i, matrix)
})
mesh.instanceMatrix.needsUpdate = true
cloud.add(mesh)

const edgePositions: number[] = []
for (const [a, b] of space.value.edges) {
  const pa = points[a]!.position
  const pb = points[b]!.position
  edgePositions.push(...pa, ...pb)
}
const edgeGeometry = new BufferGeometry()
edgeGeometry.setAttribute('position', new Float32BufferAttribute(edgePositions, 3))
const edgeMaterial = new LineBasicMaterial({ transparent: true, opacity: 0.16 })
cloud.add(new LineSegments(edgeGeometry, edgeMaterial))

const queryGroup = new Group()
const queryMaterial = new LineDashedMaterial({ dashSize: 0.025, gapSize: 0.018, transparent: true, opacity: 0.9 })
const ringMaterial = new MeshBasicMaterial({ transparent: true, opacity: 0.95 })
const ring = new Mesh(new RingGeometry(0.028, 0.038, 32), ringMaterial)
queryGroup.add(ring)
cloud.add(queryGroup)
let queryLines: LineSegments | null = null

const readPalette = () => {
  const css = getComputedStyle(document.documentElement)
  const read = (name: string) => new Color(css.getPropertyValue(name).trim() || '#888888')
  return { agents: read('--terra'), rag: read('--ink'), ml: read('--maize'), fullstack: read('--moss'), ink: read('--ink'), terra: read('--terra'), paper: read('--paper') } as Record<ClusterId | 'ink' | 'terra' | 'paper', Color>
}

const paint = () => {
  const palette = readPalette()
  const hits = highlighted.value
  const dim = hits.size > 0
  points.forEach((p, i) => {
    const color = palette[p.cluster].clone()
    if (dim && !hits.has(i)) color.lerp(palette.paper, 0.45)
    mesh.setColorAt(i, color)
  })
  if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
  pointMaterial.opacity = dim ? 0.7 : 0.85
  edgeMaterial.color = palette.ink
  queryMaterial.color = palette.terra
  ringMaterial.color = palette.terra
  invalidate()
}

const buildQuery = () => {
  if (queryLines) {
    queryGroup.remove(queryLines)
    queryLines.geometry.dispose()
    queryLines = null
  }
  const q = activeQuery.value
  queryGroup.visible = !!q
  if (!q) return
  ring.position.set(q.position[0], q.position[1], q.position[2])
  const positions: number[] = []
  for (const n of q.neighbors) positions.push(...q.position, ...points[n]!.position)
  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new Float32BufferAttribute(positions, 3))
  queryLines = new LineSegments(geometry, queryMaterial)
  queryLines.computeLineDistances()
  queryGroup.add(queryLines)
}

const highlightScale = () => {
  const hits = highlighted.value
  points.forEach((p, i) => {
    const s = (0.008 + p.weight * 0.016) * (hits.has(i) ? 2.2 : 1)
    matrix.makeScale(s, s, s)
    matrix.setPosition(p.position[0], p.position[1], p.position[2])
    mesh.setMatrixAt(i, matrix)
  })
  mesh.instanceMatrix.needsUpdate = true
}

let themeObserver: MutationObserver | null = null

onMounted(() => {
  paint()
  buildQuery()
  highlightScale()
  themeObserver = new MutationObserver(paint)
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
})

watch(activeQuery, () => {
  buildQuery()
  highlightScale()
  paint()
})

const target = new Vector3()
const lookAt = new Vector3()
const { onBeforeRender } = useLoop()

onBeforeRender(({ delta }) => {
  if (props.paused) return
  const dt = Math.min(delta, 0.05)
  cloud.rotation.y += dt * 0.035
  root.rotation.x = MathUtils.lerp(root.rotation.x, props.pointer.y * 0.18, 0.05)
  root.rotation.y = MathUtils.lerp(root.rotation.y, props.pointer.x * 0.25, 0.05)

  const cluster = activeCluster.value
  const focus = cluster ? centroids.value[cluster] : null
  if (focus) {
    lookAt.set(focus[0], focus[1], focus[2]).applyMatrix4(cloud.matrixWorld)
    target.set(lookAt.x * 0.6, lookAt.y * 0.6, 1.55)
  } else {
    lookAt.set(0, 0, 0)
    target.set(0, 0, 2.1)
  }
  const cam = camera.value
  if (cam) {
    cam.position.lerp(target, 0.035)
    cam.lookAt(lookAt.multiplyScalar(0.5))
    if (queryGroup.visible) ring.lookAt(cam.position)
  }
})

onBeforeUnmount(() => {
  themeObserver?.disconnect()
  sphere.dispose()
  pointMaterial.dispose()
  edgeGeometry.dispose()
  edgeMaterial.dispose()
  queryMaterial.dispose()
  ringMaterial.dispose()
  ring.geometry.dispose()
  queryLines?.geometry.dispose()
  mesh.dispose()
})
</script>
