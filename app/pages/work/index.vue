<template>
  <div ref="root" class="work-index">
    <header class="work-index__head">
      <p class="work-index__eyebrow mono" data-reveal="line">{{ t('work.eyebrow') }}</p>
      <h1 class="work-index__title" data-reveal="line">{{ t('work.title') }}</h1>
      <p class="work-index__lead" data-reveal="line">{{ t('work.lead') }}</p>
    </header>
    <div class="work-index__rule" data-reveal="rule" aria-hidden="true"></div>
    <ol class="work-index__list">
      <li v-for="(project, i) in ordered" :key="project.id" data-reveal="line">
        <NuxtLink :to="localePath(`/work/${project.id}`)" class="work-row">
          <span class="work-row__index mono">{{ String(i + 1).padStart(2, '0') }}</span>
          <span class="work-row__year mono">{{ project.date }}</span>
          <span class="work-row__main">
            <span class="work-row__name">{{ project.translations[lang].name }}</span>
            <span class="work-row__category">{{ project.translations[lang].category }}</span>
          </span>
          <span class="work-row__tags">
            <UiTag v-for="tag in project.tags.slice(0, 3)" :key="tag">{{ tag }}</UiTag>
          </span>
          <UiIcon name="arrow-right" :size="18" class="work-row__arrow" />
        </NuxtLink>
      </li>
    </ol>
  </div>
</template>

<script setup lang="ts">
import { projectList } from '~/data/projects'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const root = ref<HTMLElement | null>(null)

const lang = computed(() => (locale.value === 'es' ? 'es' : 'en'))
const ordered = [...projectList.filter((p) => p.featured), ...projectList.filter((p) => !p.featured)]

useReveal(root)
usePageSeo('work')
</script>

<style scoped>
.work-index {
  max-width: var(--page-max-width);
  margin: 0 auto;
  padding: 4rem var(--gutter) 0;
}

.work-index__eyebrow {
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--muted);
}

.work-index__title {
  font-size: clamp(2.4rem, 6vw, 4rem);
  letter-spacing: -0.03em;
  margin: 0.75rem 0;
}

.work-index__lead {
  color: var(--muted);
  max-width: 36rem;
  font-size: 1.1rem;
}

.work-index__rule {
  height: 1px;
  background: var(--ink);
  margin: 3rem 0 0;
}

.work-index__list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.work-row {
  display: grid;
  grid-template-columns: 2.5rem 3.5rem 1fr auto 1.5rem;
  align-items: center;
  gap: 1.25rem;
  padding: 1.4rem 0;
  border-bottom: 1px solid var(--rule);
  transition: background-color var(--transition-fast);
}

.work-row:hover {
  background: var(--ink-2);
}

.work-row:focus-visible {
  outline: 2px solid var(--terra);
}

.work-row__index {
  font-size: 0.7rem;
  color: var(--terra);
}

.work-row__year {
  font-size: 0.75rem;
  color: var(--muted);
}

.work-row__main {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.work-row__name {
  font-size: 1.35rem;
  font-weight: 600;
  transition: color var(--transition-fast);
}

.work-row:hover .work-row__name {
  color: var(--terra);
}

.work-row__category {
  font-size: 0.9rem;
  color: var(--muted);
}

.work-row__tags {
  display: flex;
  gap: 0.35rem;
}

.work-row__arrow {
  color: var(--muted);
  transition: transform var(--transition-fast), color var(--transition-fast);
}

.work-row:hover .work-row__arrow {
  color: var(--terra);
  transform: translateX(3px);
}

@media (max-width: 760px) {
  .work-row {
    grid-template-columns: 2rem 1fr 1.25rem;
  }

  .work-row__year,
  .work-row__tags {
    display: none;
  }
}
</style>
