<template>
  <header class="post-header">
    <img v-if="image" class="post-hero" :src="image" :alt="title" />
    <h1 class="post-title">{{ title }}</h1>
    <p v-if="summary" class="post-summary">{{ summary }}</p>
    <div class="post-metadata">
      <div class="metadata-row">
        <span v-if="date" class="meta-item date">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            width="16"
            height="16"
          >
            <path
              d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"
            />
          </svg>
          {{ formatDate(date) }}
        </span>
        <span v-if="lastmod" class="meta-item lastmod">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            width="16"
            height="16"
          >
            <path
              d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.25 2.52.77-1.28-3.52-2.09V8z"
            />
          </svg>
          {{ t('blog.post.lastUpdated') }}: {{ formatDate(lastmod) }}
        </span>
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
  margin-left: auto;
  margin-right: auto;
  max-width: 800px;
  text-align: center;
}

.post-hero {
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-radius: var(--radius-md);
  border: 1px solid var(--line-soft);
  margin-bottom: 1.5rem;
}

.post-title {
  font-size: clamp(1.6rem, 4vw, 2.4rem);
  font-weight: 700;
  line-height: 1.2;
  margin: 0 0 1rem;
  color: var(--text-primary);
}

.post-summary {
  font-size: 1.15rem;
  line-height: 1.6;
  color: var(--text-subtle);
  margin: 0 0 1.25rem;
}

.post-metadata {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  width: 100%;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.metadata-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.meta-item {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.75rem;
  color: var(--text-subtle);
  font-family: var(--font-mono);
  justify-content: center;
}

.meta-item svg {
  flex-shrink: 0;
  opacity: 0.7;
}

.meta-item.author {
  font-weight: 600;
  color: var(--text-primary);
}

.tags-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}

.tag {
  display: inline-block;
  padding: 0.35rem 0.75rem;
  border-radius: var(--radius-sm);
  background-color: var(--bg-soft);
  color: var(--text-primary);
  font-size: 0.7rem;
  font-family: var(--font-mono);
  font-weight: 600;
  border: 1px solid var(--line-soft);
  transition: all 0.2s ease;
}

.tag:hover {
  background-color: var(--bg-mute);
  border-color: var(--accent);
  transform: translateY(-1px);
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

  .metadata-row {
    font-size: 0.7rem;
  }
}
</style>
