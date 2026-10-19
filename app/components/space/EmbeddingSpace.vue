<template>
  <div class="space" :class="{ 'space--live': showCanvas }">
    <ClientOnly>
      <div class="space__fallback">
        <EmbeddingFallback />
      </div>
    </ClientOnly>
    <LazyEmbeddingCanvas v-if="showCanvas" class="space__canvas" @error="failed = true" />
    <ul class="space__legend mono" :aria-label="t('home.space.legend')">
      <li
        v-for="cluster in CLUSTERS"
        :key="cluster"
        :class="[`is-${cluster}`, { 'is-active': activeCluster === cluster }]"
      >
        <span class="space__swatch" aria-hidden="true"></span>
        {{ t(`home.build.clusters.${cluster}.tag`) }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { CLUSTERS } from '~/utils/embedding-space'

const { t } = useI18n()
const { allow3d, ready } = useMotionPreference()
const { activeCluster } = useEmbeddingSpace()

const idle = ref(false)
const failed = ref(false)
const showCanvas = computed(() => ready.value && allow3d.value && idle.value && !failed.value)

onMounted(() => {
  const start = () => {
    idle.value = true
  }
  const ric = (globalThis as typeof globalThis & { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback
  const schedule = () => {
    setTimeout(() => {
      if (ric) ric(start, { timeout: 2000 })
      else start()
    }, 1200)
  }
  if (document.readyState === 'complete') schedule()
  else globalThis.addEventListener('load', schedule, { once: true })
})
</script>

<style scoped>
.space {
  position: relative;
  width: 100%;
  height: 100%;
}

.space__fallback,
.space__canvas {
  position: absolute;
  inset: 0;
}

.space__fallback {
  transition: opacity 900ms var(--ease-out);
}

.space--live .space__fallback {
  opacity: 0;
}

.space__legend {
  position: absolute;
  right: var(--gutter);
  top: 1.25rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem 1rem;
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: 0.65rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted);
}

.space__legend li {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  transition: color var(--transition-base);
}

.space__legend li.is-active {
  color: var(--ink);
}

.space__swatch {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: currentColor;
}

.is-agents .space__swatch {
  background: var(--accent);
}

.is-rag .space__swatch {
  background: var(--ink);
}

.is-ml .space__swatch {
  background: var(--signal);
}

.is-fullstack .space__swatch {
  background: var(--leaf);
}
</style>
