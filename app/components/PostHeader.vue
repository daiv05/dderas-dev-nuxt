<template>
  <header class="post-header">
    <img v-if="image" class="post-hero" :src="image" :alt="title" />
    <h1 class="post-title">{{ title }}</h1>
    <p v-if="summary" class="post-summary">{{ summary }}</p>
    <div class="post-metadata">
      <div class="metadata-row">
        <time v-if="date" :datetime="date" class="meta-item date">
          {{ formatDate(date) }}
        </time>
        <span v-if="lastmod" class="meta-item lastmod">
          {{ t('blog.post.lastUpdated') }}: {{ formatDate(lastmod) }}
        </span>
      </div>
      <div v-if="tags?.length" class="tags-row">
        <span v-for="tag in tags" :key="tag" class="tag">{{ tag }}</span>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
interface Props {
  title?: string
  date?: string
  lastmod?: string
  author?: string
  tags?: string[]
  image?: string
  summary?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  date: '',
  lastmod: '',
  author: '',
  tags: () => [],
  image: '',
  summary: ''
})

const { t, locale } = useI18n()

const formatDate = (dateString: string): string => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString(locale.value === 'es' ? 'es-ES' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<style scoped>
.post-header {
  margin-bottom: 2.5rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--line-soft);
  text-align: left;
}

.post-hero {
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-radius: var(--radius-md);
  margin-bottom: 2rem;
}

.post-title {
  font-size: clamp(1.8rem, 5vw, 2.8rem);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;
  margin: 0 0 1rem;
  color: var(--text-primary);
}

.post-summary {
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--text-subtle);
  margin: 0 0 1.25rem;
}

.post-metadata {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.metadata-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
}

.meta-item {
  font-size: 0.72rem;
  color: var(--text-subtle);
  font-family: var(--font-mono);
}

.tags-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  justify-content: flex-start;
}

.tag {
  display: inline-block;
  padding: 0.25rem 0.6rem;
  border-radius: var(--radius-sm);
  background-color: var(--surface-faint);
  color: var(--text-subtle);
  font-size: 0.65rem;
  font-family: var(--font-mono);
  border: 1px solid var(--line-soft);
}

@media (max-width: 768px) {
  .post-header {
    padding-bottom: 1.5rem;
    margin-bottom: 2rem;
  }

  .post-title {
    font-size: 1.8rem;
  }

  .post-summary {
    font-size: 1rem;
  }
}
</style>
