<template>
  <div class="page-frame-blog">
    <div v-if="pending" class="blog-loading">
      <p>{{ t("loader.message") }}</p>
    </div>

    <section v-else class="section-stack blog-wrapper">
      <!-- Lista de posts -->
      <div>
        <div v-if="posts.length > 0" class="blog-posts-list">
          <article
            v-for="post in posts"
            :key="post.slug"
            class="blog-post-entry"
          >
            <NuxtLink
              :to="localePath(`/blog/${post.slug}`)"
              class="post-entry-link"
            >
              <div class="post-entry-body">
                <div class="post-entry-text">
                  <div class="post-entry-meta">
                    <time
                      v-if="post.date"
                      :datetime="post.date"
                      class="post-date"
                    >
                      {{ formatDate(post.date) }}
                    </time>
                    <span v-if="post.tags?.length" class="post-tags">
                      <button
                        v-for="tag in post.tags"
                        :key="tag"
                        class="post-tag"
                        :class="{ active: activeTag === tag }"
                        @click.prevent="toggleTag(tag)"
                      >
                        {{ tag }}
                      </button>
                    </span>
                  </div>
                  <h2 class="post-entry-title">{{ post.title }}</h2>
                  <p v-if="post.summary" class="post-entry-summary">
                    {{ post.summary }}
                  </p>
                </div>
                <div v-if="post.image" class="post-entry-thumbnail">
                  <img
                    :src="post.image"
                    :alt="post.title"
                    fetchpriority="high"
                  />
                </div>
              </div>
            </NuxtLink>
          </article>
        </div>

        <div v-else class="blog-empty">
          <p>{{ t("blog.noResults") }}</p>
        </div>

        <div v-if="!pending && totalPages > 1" class="pagination">
          <button
            class="pagination-btn"
            :disabled="page === 1"
            @click="prevPage"
          >
            ← {{ t("blog.pagination.prev") }}
          </button>
          <span class="pagination-info">{{ page }} / {{ totalPages }}</span>
          <button
            class="pagination-btn"
            :disabled="page === totalPages"
            @click="nextPage"
          >
            {{ t("blog.pagination.next") }} →
          </button>
        </div>
      </div>

      <!-- Chipline de tags (colapsable) -->
      <div>
        <!-- Búsqueda + meta -->
        <div class="blog-list-header">
          <input
            ref="searchInputRef"
            v-model="searchQuery"
            class="search-input"
            type="search"
            :placeholder="t('blog.search')"
            autocomplete="off"
          />
          <button v-if="hasFilters" class="filter-clear" @click="clearFilters">
            {{ t("blog.filter.clear") }} x
          </button>
        </div>
        <div v-if="allTags?.length" class="blog-tags">
          <button
            v-for="tag in visibleTags"
            :key="tag"
            class="tag-chip"
            :class="{ active: activeTag === tag }"
            @click="toggleTag(tag)"
          >
            {{ tag }}
          </button>
          <button
            v-if="!tagsExpanded && hiddenTagsCount > 0"
            class="tag-chip tag-chip--more"
            @click="tagsExpanded = true"
          >
            +{{ hiddenTagsCount }}
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n();
const localePath = useLocalePath();
const { getPosts, getAllTags } = useBlog();
const { scrollToTop } = useBlogScroll();

const { data: allPosts, pending } = await useAsyncData(
  () => `blog-index-${locale.value}`,
  () => getPosts(),
  { watch: [locale] },
);

const { data: allTags } = await useAsyncData(
  () => `blog-tags-${locale.value}`,
  () => getAllTags(),
  { watch: [locale] },
);

// Ref del input de búsqueda para focus via Ctrl+K
const searchInputRef = ref<HTMLInputElement | null>(null);

if (import.meta.client) {
  const onKeydown = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key === "k") {
      e.preventDefault();
      searchInputRef.value?.focus();
    }
  };
  onMounted(() => window.addEventListener("keydown", onKeydown));
  onBeforeUnmount(() => window.removeEventListener("keydown", onKeydown));
}

// Estado de búsqueda y filtrado
const searchQuery = ref("");
const activeTag = ref<string | null>(null);

// Tags colapsables
const TAGS_VISIBLE = 6;
const tagsExpanded = ref(false);
const visibleTags = computed(() =>
  tagsExpanded.value
    ? (allTags.value ?? [])
    : (allTags.value ?? []).slice(0, TAGS_VISIBLE),
);
const hiddenTagsCount = computed(() =>
  Math.max(0, (allTags.value?.length ?? 0) - TAGS_VISIBLE),
);

const toggleTag = (tag: string) => {
  activeTag.value = activeTag.value === tag ? null : tag;
};

const clearFilters = () => {
  searchQuery.value = "";
  activeTag.value = null;
};

const hasFilters = computed(
  () => searchQuery.value.trim() !== "" || activeTag.value !== null,
);

const filteredPosts = computed(() => {
  if (!allPosts.value) return [];
  let result = allPosts.value;

  if (activeTag.value) {
    const tag = activeTag.value.toLowerCase();
    result = result.filter((p) => p.tags?.some((t) => t.toLowerCase() === tag));
  }

  const q = searchQuery.value.trim().toLowerCase();
  if (q) {
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.summary?.toLowerCase().includes(q) ||
        p.tags?.some((t) => t.toLowerCase().includes(q)),
    );
  }

  return result;
});

// Resetear página al cambiar filtros
watch([searchQuery, activeTag], () => {
  page.value = 1;
});

// Resetear filtros al cambiar idioma
watch(locale, () => {
  searchQuery.value = "";
  activeTag.value = null;
});

// Paginación
const page = ref(1);
const pageSize = 6;

const totalPages = computed(() =>
  Math.max(1, Math.ceil(filteredPosts.value.length / pageSize)),
);

const posts = computed(() => {
  const start = (page.value - 1) * pageSize;
  return filteredPosts.value.slice(start, start + pageSize);
});

const prevPage = () => {
  if (page.value > 1) {
    page.value--;
    scrollToTop();
  }
};

const nextPage = () => {
  if (page.value < totalPages.value) {
    page.value++;
    scrollToTop();
  }
};

const formatDate = (dateString: string): string => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString(locale.value === "es" ? "es-ES" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

definePageMeta({
  layout: "blog",
});

usePageSeo("blog");
</script>

<style scoped>
.blog-loading,
.blog-empty {
  text-align: center;
  padding: 4rem 1rem;
  color: var(--text-subtle);
}

.blog-wrapper {
  display: flex;
  flex-direction: column;
  max-width: 68ch;
  margin: 0 auto;
}

/* Chipline de tags */
.blog-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 1rem;
}

.tag-chip {
  background: none;
  border: 1px solid var(--line-soft);
  border-radius: 999px;
  padding: 0.25rem 0.75rem;
  font-size: 0.7rem;
  font-family: var(--font-mono);
  color: var(--text-subtle);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.tag-chip:hover {
  border-color: var(--line-strong);
  color: var(--text-primary);
}

.tag-chip.active {
  background: rgba(var(--v-theme-primary), 0.1);
  border-color: rgba(var(--v-theme-primary), 0.4);
  color: rgb(var(--v-theme-primary));
}

.tag-chip--more {
  border-style: dashed;
  opacity: 0.6;
}

.tag-chip--more:hover {
  opacity: 1;
}

/* Búsqueda + clear en una línea */
.blog-list-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  border-bottom: 1px solid var(--line-soft);
  margin-bottom: 0;
  transition: border-color var(--transition-fast);
}

.blog-list-header:focus-within {
  border-color: var(--line-strong);
}

.search-input {
  flex: 1;
  background: none;
  border: none;
  padding: 0.5rem 0;
  font-size: 0.875rem;
  font-family: inherit;
  color: var(--text-primary);
  outline: none;
}

.search-input::placeholder {
  color: var(--text-subtle);
  opacity: 0.5;
}

.search-input::-webkit-search-cancel-button {
  display: none;
}

.filter-clear {
  background: none;
  border: none;
  cursor: pointer;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--text-subtle);
  padding: 0;
  white-space: nowrap;
  flex-shrink: 0;
  transition: color var(--transition-fast);
}

.filter-clear:hover {
  color: var(--text-primary);
}

/* Lista de posts */
.blog-posts-list {
  display: flex;
  flex-direction: column;
}

.blog-post-entry {
  border-top: 1px solid var(--line-soft);
}

.blog-post-entry:last-child {
  border-bottom: 1px solid var(--line-soft);
}

.post-entry-link {
  text-decoration: none;
  color: inherit;
  display: block;
  padding: 1.75rem 0;
}

.post-entry-body {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1.5rem;
  align-items: start;
}

.post-entry-text {
  min-width: 0;
}

.post-entry-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 0.6rem;
}

.post-date {
  font-size: 0.72rem;
  font-family: var(--font-mono);
  color: rgba(var(--v-theme-primary), 0.55);
}

.post-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.post-tag {
  background: none;
  border: none;
  padding: 0;
  font-size: 0.65rem;
  font-family: var(--font-mono);
  color: var(--text-subtle);
  cursor: pointer;
  transition: color var(--transition-fast);
}

.post-tag:hover {
  color: var(--text-primary);
}

.post-tag.active {
  color: rgb(var(--v-theme-primary));
}

.post-entry-title {
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 1.3;
  margin: 0 0 0.6rem;
  color: var(--text-primary);
  transition: color var(--transition-fast);
}

.post-entry-link:hover .post-entry-title {
  color: rgb(var(--v-theme-primary));
}

.post-entry-summary {
  font-size: 0.875rem;
  line-height: 1.6;
  color: var(--text-subtle);
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-entry-thumbnail {
  width: 72px;
  height: 72px;
  flex-shrink: 0;
  border-radius: var(--radius-sm);
  overflow: hidden;
}

.post-entry-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Paginación */
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 2.5rem;
  padding-top: 2rem;
}

.pagination-btn {
  background: none;
  border: none;
  padding: 0;
  font-size: 0.875rem;
  font-family: inherit;
  color: var(--text-subtle);
  cursor: pointer;
  transition: color var(--transition-fast);
}

.pagination-btn:hover:not(:disabled) {
  color: var(--text-primary);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.pagination-btn:disabled {
  opacity: 0.2;
  cursor: not-allowed;
  text-decoration: none;
}

.pagination-info {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  opacity: 0.4;
  color: var(--text-primary);
}

@media (max-width: 480px) {
  .post-entry-thumbnail {
    display: none;
  }

  .post-entry-body {
    grid-template-columns: 1fr;
  }

  .pagination {
    gap: 1rem;
  }
}
</style>
