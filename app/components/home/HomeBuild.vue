<template>
  <section id="build" class="build">
    <SectionHeading index="01" :title="t('home.build.title')" :note="t('home.build.note')" />
    <div class="build__list">
      <article
        v-for="(cluster, i) in CLUSTERS"
        :key="cluster"
        :ref="(el) => setRef(i, el)"
        class="build__item"
        :class="[`is-${cluster}`, { 'is-active': activeCluster === cluster }]"
      >
        <p class="build__tag mono" data-reveal="line">
          <span class="build__dot" aria-hidden="true"></span>
          {{ t(`home.build.clusters.${cluster}.tag`) }}
        </p>
        <h3 class="build__title" data-reveal="line">{{ t(`home.build.clusters.${cluster}.title`) }}</h3>
        <p class="build__body" data-reveal="line">{{ t(`home.build.clusters.${cluster}.body`) }}</p>
        <ul class="build__evidence" data-reveal="line">
          <li v-for="item in evidence(cluster)" :key="item">
            <UiTag>{{ item }}</UiTag>
          </li>
        </ul>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ComponentPublicInstance } from 'vue'

import type { ClusterId } from '~/types/embedding-space'
import { CLUSTERS } from '~/utils/embedding-space'

const { t, tm, rt } = useI18n()
const { activeCluster } = useEmbeddingSpace()

const refs = CLUSTERS.map(() => ref<HTMLElement | null>(null))

const setRef = (i: number, el: Element | ComponentPublicInstance | null) => {
  const target = refs[i]
  if (target) target.value = el instanceof HTMLElement ? el : null
}

const evidence = (cluster: ClusterId) => {
  const raw = tm(`home.build.clusters.${cluster}.evidence`)
  return Array.isArray(raw) ? raw.map((v) => rt(v as Parameters<typeof rt>[0])) : []
}

useScrollStory(CLUSTERS.map((cluster, i) => ({ el: refs[i]!, cluster })))
</script>

<style scoped>
.build {
  padding: var(--section-gap) 0 0;
}

.build__list {
  display: grid;
  max-width: 34rem;
}

.build__item {
  min-height: 62vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.75rem;
  border-left: 1px solid var(--rule);
  padding: 2rem 0 2rem 1.5rem;
  transition: border-color var(--transition-base);
}

.build__item.is-active {
  border-left-color: var(--terra);
}

.build__tag {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.7rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--muted);
}

.build__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.is-agents .build__dot {
  background: var(--terra);
}

.is-rag .build__dot {
  background: var(--ink);
}

.is-ml .build__dot {
  background: var(--maize);
}

.is-fullstack .build__dot {
  background: var(--moss);
}

.build__title {
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  font-weight: 600;
  letter-spacing: -0.02em;
}

.build__body {
  font-size: 1.05rem;
  color: var(--muted);
  max-width: 30rem;
}

.build__evidence {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  list-style: none;
  padding: 0;
  margin: 0.5rem 0 0;
}

@media (max-width: 760px) {
  .build__item {
    min-height: 0;
    padding: 1.5rem 0 1.5rem 1rem;
  }
}
</style>
