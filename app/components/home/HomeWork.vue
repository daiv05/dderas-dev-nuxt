<template>
  <section id="work" class="work">
    <SectionHeading index="02" :title="t('home.work.title')" />
    <div class="work__grid">
      <NuxtLink
        v-for="(project, i) in featured"
        :key="project.id"
        :to="localePath(`/work/${project.id}`)"
        class="work__card"
        :class="{ 'work__card--lead': i === 0 }"
        data-reveal="line"
      >
        <div>
          <h3 class="work__name">{{ project.translations[lang].name }}</h3>
          <p class="work__meta mono">{{ project.translations[lang].category }}</p>
        </div>
        <div v-if="project.metric">
          <p class="work__metric" data-reveal="count">{{ project.metric.value }}</p>
          <p class="work__metric-label">{{ project.translations[lang].metricLabel }}</p>
        </div>
        <span class="work__cta mono">
          {{ t('home.work.caseStudy') }}
          <UiIcon name="arrow-right" :size="14" />
        </span>
      </NuxtLink>
    </div>
    <NuxtLink :to="localePath('/work')" class="work__all mono" data-reveal="line">
      {{ t('home.work.all') }}
      <UiIcon name="arrow-right" :size="14" />
    </NuxtLink>
  </section>
</template>

<script setup lang="ts">
import { projectList } from '~/data/projects'

const { t, locale } = useI18n()
const localePath = useLocalePath()

const lang = computed(() => (locale.value === 'es' ? 'es' : 'en'))
const featured = projectList.filter((p) => p.featured)
</script>

<style scoped>
.work {
  padding-top: var(--section-gap);
}

.work__grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr;
  gap: 1rem;
}

.work__card {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
  min-height: 15rem;
  padding: 1.25rem;
  border: 1px solid var(--rule);
  border-radius: var(--radius-md);
  background: var(--paper);
  transition: border-color var(--transition-base), transform var(--transition-base);
}

.work__card:hover {
  border-color: var(--ink-35);
  transform: translateY(-2px);
}

.work__card:focus-visible {
  outline: 2px solid var(--terra);
  outline-offset: 2px;
}

.work__name {
  font-size: 1.3rem;
  font-weight: 600;
}

.work__meta {
  font-size: 0.7rem;
  color: var(--muted);
  margin-top: 0.3rem;
}

.work__metric {
  font-size: clamp(2rem, 4vw, 2.8rem);
  font-weight: 700;
  line-height: 1;
  color: var(--terra);
  letter-spacing: -0.02em;
}

.work__card--lead .work__metric {
  font-size: clamp(2.6rem, 5vw, 3.6rem);
}

.work__metric-label {
  font-size: 0.85rem;
  color: var(--muted);
  margin-top: 0.4rem;
}

.work__cta {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.7rem;
  color: var(--muted);
  transition: color var(--transition-fast), gap var(--transition-fast);
}

.work__card:hover .work__cta {
  color: var(--terra);
  gap: 0.6rem;
}

.work__all {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: 1.5rem;
  font-size: 0.8rem;
  color: var(--muted);
}

.work__all:hover {
  color: var(--terra);
}

@media (max-width: 900px) {
  .work__grid {
    grid-template-columns: 1fr;
  }

  .work__card {
    min-height: 0;
  }
}
</style>
