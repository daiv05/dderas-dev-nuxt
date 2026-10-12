<template>
  <div ref="host" class="space-canvas" aria-hidden="true"></div>
</template>

<script setup lang="ts">
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
  NoToneMapping,
  PerspectiveCamera,
  RingGeometry,
  Scene,
  Vector3,
  WebGLRenderer,
} from 'three'

import type { ClusterId } from '~/types/embedding-space'

const emit = defineEmits<{ error: [] }>()

const host = ref<HTMLElement | null>(null)
const { space, centroids, activeCluster, activeQuery, highlighted } = useEmbeddingSpace()

const CAMERA_Z = 2.1
const FOCUS_Z = 1.3
const sizeOf = (weight: number) => 0.005 + weight * 0.011

let renderer: WebGLRenderer | null = null
let frame = 0
let running = false
let offscreen = false
let themeObserver: MutationObserver | null = null
let intersection: IntersectionObserver | null = null
let resizeObserver: ResizeObserver | null = null

const pointer = { x: 0, y: 0 }
const scene = new Scene()
const camera = new PerspectiveCamera(45, 1, 0.1, 20)
camera.position.set(0, 0, CAMERA_Z)

const root = new Group()
const cloud = new Group()
root.add(cloud)
scene.add(root)

const points = space.value.points
const sphere = new IcosahedronGeometry(1, 1)
const pointMaterial = new MeshBasicMaterial({ transparent: true, opacity: 0.85 })
const mesh = new InstancedMesh(sphere, pointMaterial, points.length)
const matrix = new Matrix4()
cloud.add(mesh)

const edgePositions: number[] = []
for (const [a, b] of space.value.edges) {
  edgePositions.push(...points[a]!.position, ...points[b]!.position)
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
  return {
    agents: read('--terra'),
    rag: read('--ink'),
    ml: read('--maize'),
    fullstack: read('--moss'),
    ink: read('--ink'),
    terra: read('--terra'),
    paper: read('--paper'),
  } as Record<ClusterId | 'ink' | 'terra' | 'paper', Color>
}

const layoutPoints = () => {
  const hits = highlighted.value
  points.forEach((p, i) => {
    const s = sizeOf(p.weight) * (hits.has(i) ? 2.2 : 1)
    matrix.makeScale(s, s, s)
    matrix.setPosition(p.position[0], p.position[1], p.position[2])
    mesh.setMatrixAt(i, matrix)
  })
  mesh.instanceMatrix.needsUpdate = true
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
  edgeMaterial.color = palette.ink
  queryMaterial.color = palette.terra
  ringMaterial.color = palette.terra
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

const target = new Vector3()
const lookAt = new Vector3()
let last = 0

const tick = (now: number) => {
  frame = requestAnimationFrame(tick)
  const dt = Math.min((now - last) / 1000 || 0, 0.05)
  last = now
  cloud.rotation.y += dt * 0.035
  root.rotation.x = MathUtils.lerp(root.rotation.x, pointer.y * 0.18, 0.05)
  root.rotation.y = MathUtils.lerp(root.rotation.y, pointer.x * 0.25, 0.05)

  const cluster = activeCluster.value
  const focus = cluster ? centroids.value[cluster] : null
  if (focus) {
    root.updateMatrixWorld()
    lookAt.set(focus[0], focus[1], focus[2]).applyMatrix4(cloud.matrixWorld)
    target.set(lookAt.x * 0.95, lookAt.y * 0.95, FOCUS_Z)
  } else {
    lookAt.set(0, 0, 0)
    target.set(0, 0, CAMERA_Z)
  }
  camera.position.lerp(target, 0.035)
  camera.lookAt(lookAt.multiplyScalar(0.5))
  if (queryGroup.visible) ring.lookAt(camera.position)
  renderer?.render(scene, camera)
}

const start = () => {
  if (running || !renderer || offscreen || document.hidden) return
  running = true
  last = performance.now()
  frame = requestAnimationFrame(tick)
}

const stop = () => {
  running = false
  cancelAnimationFrame(frame)
}

const resize = () => {
  const el = host.value
  if (!el || !renderer) return
  const { clientWidth: w, clientHeight: h } = el
  if (!w || !h) return
  renderer.setSize(w, h, false)
  camera.aspect = w / h
  camera.updateProjectionMatrix()
}

const onPointer = (event: PointerEvent) => {
  pointer.x = (event.clientX / globalThis.innerWidth) * 2 - 1
  pointer.y = (event.clientY / globalThis.innerHeight) * 2 - 1
}

const onVisibility = () => {
  if (document.hidden) stop()
  else start()
}

watch(activeQuery, () => {
  buildQuery()
  layoutPoints()
  paint()
})

onMounted(() => {
  const el = host.value
  if (!el) return
  try {
    renderer = new WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' })
  } catch {
    emit('error')
    return
  }
  renderer.setPixelRatio(Math.min(globalThis.devicePixelRatio || 1, 1.5))
  renderer.setClearColor(0x000000, 0)
  renderer.toneMapping = NoToneMapping
  renderer.domElement.style.width = '100%'
  renderer.domElement.style.height = '100%'
  el.appendChild(renderer.domElement)

  layoutPoints()
  paint()
  buildQuery()
  resize()

  themeObserver = new MutationObserver(paint)
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
  resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(el)
  intersection = new IntersectionObserver(([entry]) => {
    offscreen = !entry?.isIntersecting
    if (offscreen) stop()
    else start()
  })
  intersection.observe(el)
  globalThis.addEventListener('pointermove', onPointer, { passive: true })
  document.addEventListener('visibilitychange', onVisibility)
  start()
})

onBeforeUnmount(() => {
  stop()
  themeObserver?.disconnect()
  resizeObserver?.disconnect()
  intersection?.disconnect()
  globalThis.removeEventListener('pointermove', onPointer)
  document.removeEventListener('visibilitychange', onVisibility)
  sphere.dispose()
  pointMaterial.dispose()
  edgeGeometry.dispose()
  edgeMaterial.dispose()
  queryMaterial.dispose()
  ringMaterial.dispose()
  ring.geometry.dispose()
  queryLines?.geometry.dispose()
  mesh.dispose()
  renderer?.dispose()
  renderer?.domElement.remove()
  renderer = null
})
</script>

<style scoped>
.space-canvas {
  position: absolute;
  inset: 0;
}
</style>
