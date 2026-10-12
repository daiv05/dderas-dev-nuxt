<template>
  <section ref="pageRoot" class="resources-section">
    <!-- Header -->
    <div class="resources-header">
      <div class="eyebrow-container" data-reveal="line">
        <p class="eyebrow">{{ t('resources.eyebrow') }}</p>
      </div>
      <h1 class="section-title" data-reveal="line">{{ t('resources.title') }}</h1>
      <p class="section-lead" data-reveal="line">
        {{ t('resources.lead') }}
      </p>
    </div>

    <!-- Main Grid -->
    <div class="resources-grid">
      <div
        v-for="category in categories"
        :key="category.type"
        data-reveal="line"
        class="resource-card-wrapper"
      >
        <div v-if="category.type !== 'tools'" :class="['resource-block', `type-${category.type}`]">
          <!-- Illustration Area (Left/Top) -->
          <div class="block-visual">
            <img 
              v-if="category.image" 
              :src="category.image" 
              :alt="category.title" 
              class="block-image"
            />
          </div>

          <!-- Content Area -->
          <div class="block-content">
            <h3 class="block-title">{{ category.title }}</h3>
            <p class="block-desc">{{ category.description }}</p>

            <!-- Subcategories for Study -->
            <div v-if="category.subcategories" class="list-preview">
               <span v-for="sub in category.subcategories" :key="sub.name" class="list-chip">
                  <UiIcon name="folder" :size="14" />
                  {{ sub.name }}
               </span>
            </div>

            <!-- Enhanced Book List -->
             <div v-if="category.items" class="books-grid">
                <a
                  v-for="book in category.items" 
                  :key="book.title" 
                  :href="book.link"
                  target="_blank"
                  class="book-item-card"
                >
                  <div class="book-cover-placeholder">
                    <img v-if="book.image" :src="book.image" :alt="book.title" class="book-cover-img" />
                    <UiIcon v-else name="book" :size="24" class="book-icon" />
                  </div>
                  <div class="book-details">
                    <strong class="book-title">{{ book.title }}</strong>
                    <span class="book-author">{{ book.author }}</span>
                    <p v-if="book.recommendation" class="book-rec">
                      "{{ book.recommendation }}"
                    </p>
                  </div>
                </a>
             </div>
            
            <UiButton
              v-if="category.link"
              class="block-action"
              variant="ghost"
              :href="category.link"
            >
              {{ category.linkText || t('resources.viewMore') }}
              <UiIcon name="arrow-right" :size="16" />
            </UiButton>
          </div>
        </div>
      </div>
    </div>

    <div class="collab-panel" data-reveal="line">
      <div>
        <h3>{{ t('resources.noteBlock.title') }}</h3>
        <p>
          {{ t('resources.noteBlock.body') }}
        </p>
      </div>
      <UiButton variant="outline" :href="`mailto:${contactInfo.email}`">
        {{ t('resources.noteBlock.cta') }}
      </UiButton>
    </div>
  </section>
</template>

<script setup lang="ts">
import { contactInfo } from '~/data/contact'

interface ResourceCategory {
  type: string
  title: string
  description: string
  image?: string // Agregado tipo image
  link?: string
  linkText?: string
  tags?: string[]
  subcategories?: Array<{
    name: string
    items: string[]
  }>
  items?: Array<{
    title: string
    author: string
    description: string
    recommendation?: string
    image?: string
    link: string
  }>
  links?: Array<{
    name: string
    description: string
    url: string
  }>
}

const pageRoot = ref<HTMLElement | null>(null)
useReveal(pageRoot)
const { t, tm, rt } = useI18n()

type Raw = Record<string, unknown>

const categories = computed<ResourceCategory[]>(() => {
  const raw = tm('resources.categories')
  if (!Array.isArray(raw)) return []

  const text = (value: unknown) => (value == null ? '' : rt(value as Parameters<typeof rt>[0]))
  const list = (value: unknown) => (Array.isArray(value) ? (value as Raw[]) : [])

  return (raw as Raw[]).map((cat) => {
    const base: ResourceCategory = {
      type: text(cat.type),
      title: text(cat.title),
      description: text(cat.description),
    }

    if (cat.image) base.image = text(cat.image)

    if (cat.link) {
      base.link = text(cat.link)
      base.linkText = text(cat.linkText)
    }

    if (cat.tags) base.tags = list(cat.tags).map((tag) => text(tag))

    if (cat.subcategories) {
      base.subcategories = list(cat.subcategories).map((sub) => ({
        name: text(sub.name),
        items: list(sub.items).map((item) => text(item)),
      }))
    }

    if (cat.items) {
      base.items = list(cat.items).map((item) => ({
        title: text(item.title),
        author: text(item.author),
        description: text(item.description),
        recommendation: text(item.recommendation),
        image: typeof item.image === 'string' ? item.image : undefined,
        link: text(item.link),
      }))
    }

    if (cat.links) {
      base.links = list(cat.links).map((link) => ({
        name: text(link.name),
        description: text(link.description),
        url: text(link.url),
      }))
    }

    return base
  })
})

usePageSeo('resources')
</script>

<style scoped lang="scss">
.resources-section {
  padding: var(--section-gap) var(--shell-padding);
  overflow: hidden;
}

.resources-header {
  max-width: 800px;
  margin: 0 auto 5rem;
  text-align: center;
}

.eyebrow-container {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.eyebrow-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: var(--terra);
}

.resources-grid {
  display: flex;
  flex-direction: column;
  gap: 6rem;
  max-width: 900px;
  margin: 0 auto 6rem;
}

.resource-card-wrapper {
  width: 100%;
}

.resource-block {
  display: grid;
  gap: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: 240px 1fr;
    gap: 3rem;
  }
}

// Visual Area
.block-visual {
  height: 200px;
  background: var(--surface-faint);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  
  @media (min-width: 768px) {
    height: 240px;
    position: sticky;
    top: 2rem;
  }
}

.block-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 1rem;
}

// Content Area
.block-content {
  display: flex;
  flex-direction: column;
}

.block-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  letter-spacing: -0.02em;
}

.block-desc {
  color: var(--text-subtle);
  line-height: 1.7;
  font-size: 1.05rem;
  margin-bottom: 2rem;
  max-width: 600px;
}

.block-action {
  align-self: flex-start;
  text-transform: none;
  font-weight: 600;
  letter-spacing: 0;
  padding: 0 1.5rem;
}

// Subcategories chips
.list-preview {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.list-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.85rem;
  border-radius: 12px;
  background: var(--bg-soft);
  border: 1px solid var(--line-soft);
  font-size: 0.9rem;
  color: var(--text-main);
}

// Books Grid
.books-grid {
  display: grid;
  gap: 1.5rem;
  margin-bottom: 1rem;
}

.book-item-card {
  display: grid;
  grid-template-columns: 60px 1fr;
  gap: 1.25rem;
  padding: 1.25rem;
  background: var(--bg-soft);
  border: 1px solid var(--surface-faint);
  border-radius: var(--radius-md);
  text-decoration: none;
  transition: all 0.2s ease;
  
  &:hover {
    background: var(--bg-elevated);
    border-color: var(--line-soft);
    transform: translateY(-2px);
    
    .book-title { color: var(--terra); }
  }
}

.book-cover-placeholder {
  width: 60px;
  height: 80px;
  background: var(--surface-mild);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-subtle);
  overflow: hidden;
}

.book-cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.book-details {
  display: flex;
  flex-direction: column;
}

.book-title {
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
  transition: color 0.2s ease;
}

.book-author {
  font-size: 0.85rem;
  color: var(--text-subtle);
  margin-bottom: 0.75rem;
}

.book-rec {
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--text-subtle);
  font-style: italic;
  margin: 0;
  position: relative;
  padding-left: 0.75rem;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 4px;
    bottom: 4px;
    width: 2px;
    background: var(--line-soft);
  }
}

.collab-panel {
  border: 1px solid var(--line-strong) !important;
  border-radius: var(--radius-lg);
  padding: 1.5rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  background: color-mix(in srgb, var(--paper) 70%, transparent);
}

.collab-panel h3 {
  margin-bottom: 0.5rem;
}

.collab-panel p {
  color: var(--text-subtle);
  max-width: 520px;
}

@media (max-width: 768px) {
  .collab-panel {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
