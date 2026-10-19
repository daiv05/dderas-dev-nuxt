<template>
  <svg
    class="space-fallback"
    viewBox="-1.15 -1.15 2.3 2.3"
    preserveAspectRatio="xMidYMid meet"
    aria-hidden="true"
    focusable="false"
  >
    <g class="space-fallback__edges">
      <line
        v-for="([a, b], i) in space.edges"
        :key="`e${i}`"
        :x1="x(a)"
        :y1="y(a)"
        :x2="x(b)"
        :y2="y(b)"
      />
    </g>
    <g v-if="activeQuery" class="space-fallback__query">
      <line
        v-for="n in activeQuery.neighbors"
        :key="`q${n}`"
        :x1="activeQuery.position[0]"
        :y1="-activeQuery.position[1]"
        :x2="x(n)"
        :y2="y(n)"
      />
    </g>
    <circle
      v-for="(p, i) in space.points"
      :key="p.id"
      :cx="x(i)"
      :cy="y(i)"
      :r="0.007 + p.weight * 0.013"
      :class="['space-fallback__point', `is-${p.cluster}`, { 'is-hit': highlighted.has(i) }]"
    />
    <circle
      v-if="activeQuery"
      class="space-fallback__query-dot"
      :cx="activeQuery.position[0]"
      :cy="-activeQuery.position[1]"
      r="0.035"
    />
  </svg>
</template>

<script setup lang="ts">
const { space, activeQuery, highlighted } = useEmbeddingSpace()

const x = (i: number) => space.value.points[i]?.position[0] ?? 0
const y = (i: number) => -(space.value.points[i]?.position[1] ?? 0)
</script>

<style scoped>
.space-fallback {
  width: 100%;
  height: 100%;
  overflow: visible;
}

.space-fallback__edges line {
  stroke: var(--rule);
  stroke-width: 0.003;
}

.space-fallback__query line {
  stroke: var(--accent);
  stroke-width: 0.004;
  stroke-dasharray: 0.015 0.012;
}

.space-fallback__point {
  opacity: 0.75;
  transition: opacity var(--transition-base);
}

.space-fallback__point.is-agents {
  fill: var(--accent);
}

.space-fallback__point.is-rag {
  fill: var(--ink);
}

.space-fallback__point.is-ml {
  fill: var(--signal);
}

.space-fallback__point.is-fullstack {
  fill: var(--leaf);
}

.space-fallback__point.is-hit {
  opacity: 1;
  stroke: var(--paper);
  stroke-width: 0.006;
}

.space-fallback__query-dot {
  fill: none;
  stroke: var(--accent);
  stroke-width: 0.008;
}
</style>
