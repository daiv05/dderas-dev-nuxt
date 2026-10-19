<template>
  <section id="experience" class="experience">
    <SectionHeading index="03" :title="t('home.experience.title')" />
    <ol class="experience__list">
      <li v-for="entry in experienceList" :key="entry.id" class="experience__item" data-reveal="line">
        <span class="experience__dates mono">{{ range(entry.start, entry.end) }}</span>
        <div>
          <h3 class="experience__role">{{ entry.translations[lang].role }}</h3>
          <p class="experience__org">{{ entry.translations[lang].org }}</p>
          <ul class="experience__bullets">
            <li v-for="bullet in entry.translations[lang].bullets" :key="bullet">{{ bullet }}</li>
          </ul>
        </div>
      </li>
    </ol>
  </section>
</template>

<script setup lang="ts">
import { experienceList } from '~/data/experience'

const { t, locale } = useI18n()

const lang = computed(() => (locale.value === 'es' ? 'es' : 'en'))

const range = (start: string, end: string | null) => {
  const from = start.slice(0, 4)
  const to = end ? end.slice(0, 4) : t('home.experience.present')
  return from === to ? from : `${from} — ${to}`
}
</script>

<style scoped>
.experience {
  padding-top: var(--section-gap);
}

.experience__list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.experience__item {
  display: grid;
  grid-template-columns: 9rem 1fr;
  gap: 1.5rem;
  padding: 1.5rem 0;
  border-bottom: 1px solid var(--rule);
}

.experience__dates {
  font-size: 0.75rem;
  color: var(--muted);
  padding-top: 0.4rem;
}

.experience__role {
  font-size: 1.25rem;
  font-weight: 600;
}

.experience__org {
  color: var(--muted);
  margin-top: 0.15rem;
}

.experience__bullets {
  list-style: none;
  margin: 0.9rem 0 0;
  padding: 0;
  display: grid;
  gap: 0.5rem;
  max-width: 46rem;
}

.experience__bullets li {
  position: relative;
  padding-left: 1.1rem;
  line-height: 1.55;
}

.experience__bullets li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.7em;
  width: 0.5rem;
  height: 1px;
  background: var(--accent);
}

@media (max-width: 760px) {
  .experience__item {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
}
</style>
