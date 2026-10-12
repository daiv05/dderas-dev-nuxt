<template>
  <div ref="host" class="space-canvas" aria-hidden="true">
    <TresCanvas
      :alpha="true"
      :clear-alpha="0"
      :antialias="true"
      :dpr="[1, 1.5]"
      render-mode="always"
      :tone-mapping="NoToneMapping"
      power-preference="low-power"
    >
      <EmbeddingScene :pointer="pointer" :paused="paused" />
    </TresCanvas>
  </div>
</template>

<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { NoToneMapping } from 'three'

const emit = defineEmits<{ error: [] }>()

const host = ref<HTMLElement | null>(null)
const pointer = reactive({ x: 0, y: 0 })
const offscreen = ref(false)
const hidden = ref(false)
const paused = computed(() => offscreen.value || hidden.value)

const onPointer = (event: PointerEvent) => {
  pointer.x = (event.clientX / globalThis.innerWidth) * 2 - 1
  pointer.y = (event.clientY / globalThis.innerHeight) * 2 - 1
}

const onVisibility = () => {
  hidden.value = document.hidden
}

let observer: IntersectionObserver | null = null

onErrorCaptured(() => {
  emit('error')
  return false
})

onMounted(() => {
  globalThis.addEventListener('pointermove', onPointer, { passive: true })
  document.addEventListener('visibilitychange', onVisibility)
  if (host.value) {
    observer = new IntersectionObserver(([entry]) => {
      offscreen.value = !entry?.isIntersecting
    })
    observer.observe(host.value)
  }
})

onBeforeUnmount(() => {
  globalThis.removeEventListener('pointermove', onPointer)
  document.removeEventListener('visibilitychange', onVisibility)
  observer?.disconnect()
})
</script>

<style scoped>
.space-canvas {
  position: absolute;
  inset: 0;
}
</style>
