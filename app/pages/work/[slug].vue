<template>
  <article v-if="project" ref="root" class="case">
    <NuxtLink :to="localePath('/work')" class="case__back mono">
      <UiIcon name="arrow-left" :size="14" />
      {{ t('work.back') }}
    </NuxtLink>

    <header class="case__head">
      <p class="case__eyebrow mono" data-reveal="line">{{ copy.category }}</p>
      <h1 class="case__title" data-reveal="line">{{ copy.name }}</h1>
      <p class="case__lead" data-reveal="line">{{ copy.description }}</p>
    </header>

    <dl class="case__facts" data-reveal="line">
      <div>
        <dt class="mono">{{ t('work.client') }}</dt>
        <dd>{{ copy.client }}</dd>
      </div>
      <div>
        <dt class="mono">{{ t('work.year') }}</dt>
        <dd>{{ project.date }}</dd>
      </div>
      <div v-if="project.metric">
        <dt class="mono">{{ t('work.result') }}</dt>
        <dd>
          <span class="case__metric">{{ project.metric.value }}</span>
          <span class="case__metric-label">{{ copy.metricLabel }}</span>
        </dd>
      </div>
      <div v-if="links.length">
        <dt class="mono">{{ t('work.links') }}</dt>
        <dd class="case__links">
          <UiButton v-for="link in links" :key="link.href" variant="outline" size="sm" :href="link.href">
            {{ link.label }}
            <UiIcon name="arrow-up-right" :size="14" />
          </UiButton>
        </dd>
      </div>
    </dl>

    <div class="case__rule" data-reveal="rule" aria-hidden="true"></div>

    <div class="case__body">
      <div class="case__story">
        <p v-for="(paragraph, i) in paragraphs" :key="i" data-reveal="line">{{ paragraph }}</p>
      </div>
      <aside class="case__aside">
        <h2 class="case__aside-title mono">{{ t('work.features') }}</h2>
        <ul class="case__features">
          <li v-for="feature in copy.features" :key="feature" data-reveal="line">{{ feature }}</li>
        </ul>
        <h2 class="case__aside-title mono">{{ t('work.stack') }}</h2>
        <div class="case__tags">
          <UiTag v-for="tag in project.tags" :key="tag">{{ tag }}</UiTag>
        </div>
      </aside>
    </div>

    <section v-if="images.length" class="case__gallery">
      <button
        v-for="(src, i) in images"
        :key="src"
        type="button"
        class="case__shot"
        :aria-label="`${copy.name} ${i + 1}`"
        @click="open(src, i)"
      >
        <img :src="src" :alt="`${copy.name} ${i + 1}`" loading="lazy" decoding="async" />
      </button>
    </section>

    <ImageViewer v-model="viewer.open" :src="viewer.src" :alt="viewer.alt" />
  </article>
</template>

<script setup lang="ts">
import { getProject } from '~/data/projects'

const route = useRoute()
const { t, locale } = useI18n()
const localePath = useLocalePath()
const root = ref<HTMLElement | null>(null)

const project = getProject(String(route.params.slug))
if (!project) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found' })
}

const lang = computed(() => (locale.value === 'es' ? 'es' : 'en'))
const copy = computed(() => project.translations[lang.value])
const paragraphs = computed(() =>
  copy.value.longDescription
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean),
)

const links = computed(() =>
  [
    { href: project.links.live, label: t('work.live') },
    { href: project.links.repo, label: t('work.repo') },
    { href: project.links.dataset, label: t('work.dataset') },
  ].filter((l): l is { href: string; label: string } => !!l.href),
)

const images = computed(() => Object.values(project.images))
const viewer = reactive({ open: false, src: '', alt: '' })

const open = (src: string, i: number) => {
  viewer.src = src
  viewer.alt = `${copy.value.name} ${i + 1}`
  viewer.open = true
}

useReveal(root)
usePageSeo('work', {
  title: () => copy.value.name,
  description: () => copy.value.description,
})
</script>

<style scoped>
.case {
  max-width: var(--page-max-width);
  margin: 0 auto;
  padding: 2.5rem var(--gutter) 0;
}

.case__back {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.75rem;
  color: var(--muted);
}

.case__back:hover {
  color: var(--accent);
}

.case__head {
  margin-top: 2.5rem;
  max-width: 48rem;
}

.case__eyebrow {
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent);
}

.case__title {
  font-size: clamp(2.6rem, 6.5vw, 4.6rem);
  letter-spacing: -0.03em;
  line-height: 1;
  margin: 0.75rem 0 1rem;
}

.case__lead {
  font-size: 1.2rem;
  color: var(--muted);
  line-height: 1.5;
}

.case__facts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
  gap: 1.5rem;
  margin: 3rem 0 0;
}

.case__facts dt {
  font-size: 0.65rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 0.4rem;
}

.case__facts dd {
  margin: 0;
}

.case__metric {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  line-height: 1;
  color: var(--accent);
}

.case__metric-label {
  font-size: 0.85rem;
  color: var(--muted);
}

.case__links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.case__rule {
  height: 1px;
  background: var(--ink);
  margin: 3rem 0;
}

.case__body {
  display: grid;
  grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr);
  gap: 4rem;
}

.case__story {
  display: grid;
  gap: 1.25rem;
  font-size: 1.08rem;
  line-height: 1.7;
}

.case__aside-title {
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted);
  margin: 0 0 1rem;
  font-weight: 500;
}

.case__features {
  list-style: none;
  margin: 0 0 2.5rem;
  padding: 0;
  display: grid;
  gap: 0.6rem;
}

.case__features li {
  position: relative;
  padding-left: 1.1rem;
  font-size: 0.95rem;
  line-height: 1.5;
}

.case__features li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.7em;
  width: 0.5rem;
  height: 1px;
  background: var(--accent);
}

.case__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.case__gallery {
  margin-top: 4rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
  gap: 1rem;
}

.case__shot {
  padding: 0;
  border: 1px solid var(--rule);
  border-radius: var(--radius-md);
  overflow: hidden;
  background: var(--ink-2);
  cursor: zoom-in;
}

.case__shot img {
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  transition: transform var(--transition-base);
}

.case__shot:hover img {
  transform: scale(1.02);
}

.case__shot:focus-visible {
  outline: 2px solid var(--accent);
}

@media (max-width: 900px) {
  .case__body {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
}
</style>
