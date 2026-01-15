<template>
  <div class="page-frame-blog">
    <div v-if="pending" class="blog-loading">
      <p>{{ t("loader.message") }}</p>
    </div>

    <section class="section-stack blog-wrapper" v-else-if="posts && posts.length > 0">
      <div class="blog-posts-grid">
        <article v-for="post in posts" :key="post.slug" class="blog-post-card">
          <NuxtLink
            :to="localePath(`/blog/${post.slug}`)"
            class="post-card-link"
          >
            <div v-if="post.image" class="post-card-image">
              <img :src="post.image" :alt="post.title" loading="lazy" />
            </div>
            <div class="post-card-content">
              <div class="post-card-meta">
                <time v-if="post.date" :datetime="post.date" class="post-date">
                  {{ formatDate(post.date) }}
                </time>
              </div>
              <h2 class="post-card-title">{{ post.title }}</h2>
              <p v-if="post.summary" class="post-card-summary">
                {{ post.summary }}
              </p>
              <span class="post-card-cta">
                {{ t("blog.post.readMore") }} →
              </span>
            </div>
          </NuxtLink>
        </article>
      </div>
    </section>

    <div v-else class="blog-empty">
      <p>{{ t("blog.noResults") }}</p>
    </div>

    <div v-if="!pending && totalPages > 1" class="pagination">
      <button class="pagination-btn" :disabled="page === 1" @click="prevPage">
        ← {{ t("blog.pagination.prev") }}
      </button>
      <span class="pagination-info">
        {{ t("blog.pagination.page") }} {{ page }} {{ t("blog.pagination.of") }}
        {{ totalPages }}
      </span>
      <button
        class="pagination-btn"
        :disabled="page === totalPages"
        @click="nextPage"
      >
        {{ t("blog.pagination.next") }} →
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n();
const localePath = useLocalePath();
const { getPosts } = useBlog();

// Obtener posts del blog
const { data: allPosts, pending } = await useAsyncData(
  () => `blog-index-${locale.value}`,
  () => getPosts(),
  {
    watch: [locale],
  }
);

// Paginación
const page = ref(1);
const pageSize = 6;

const totalPages = computed(() =>
  Math.max(1, Math.ceil((allPosts.value?.length || 0) / pageSize))
);

const posts = computed(() => {
  if (!allPosts.value) return [];
  const start = (page.value - 1) * pageSize;
  return allPosts.value.slice(start, start + pageSize);
});

const scrollBlogTop = () => {
  if (!import.meta.client) return
  const scroller = document.querySelector('.blog-main')
  if (scroller instanceof HTMLElement) {
    scroller.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  globalThis.scrollTo({ top: 0, behavior: 'smooth' })
}

const prevPage = () => {
  if (page.value > 1) {
    page.value--;
    scrollBlogTop()
  }
};

const nextPage = () => {
  if (page.value < totalPages.value) {
    page.value++;
    scrollBlogTop()
  }
};

// Formatear fecha
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

usePageSeo('blog')
</script>

<style scoped>
.blog-index-header {
  text-align: center;
  margin-bottom: 4rem;
}

.blog-title {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  line-height: 1.2;
  margin: 0 0 1rem;
  color: var(--text-primary);
}

.blog-lead {
  font-size: 1.125rem;
  line-height: 1.6;
  color: var(--text-subtle);
  max-width: 600px;
  margin: 0 auto;
}

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

.blog-posts-grid {
  display: grid;
  gap: 2rem;
}

.blog-post-card {
  background: var(--bg-soft);
  border: 1px solid var(--line-soft);
  border-radius: var(--radius-md);
  overflow: hidden;
  transition: all 0.3s ease;
}

.blog-post-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-color: var(--line-strong);
}

.post-card-link {
  text-decoration: none;
  color: inherit;
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 0;
  align-items: center;
}

.post-card-image {
  width: 100%;
  height: 100%;
  min-height: 150px;
  overflow: hidden;
  background: var(--bg-mute);
}

.post-card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.blog-post-card:hover .post-card-image img {
  transform: scale(1.05);
}

.post-card-content {
  padding: 1.5rem;
}

.post-card-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.post-date {
  font-size: 0.75rem;
  color: var(--text-subtle);
  font-family: var(--font-mono);
}

.post-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.post-tag {
  font-size: 0.65rem;
  padding: 0.25rem 0.5rem;
  background: var(--bg-mute);
  border: 1px solid var(--line-soft);
  border-radius: var(--radius-sm);
  color: var(--text-primary);
  font-family: var(--font-mono);
}

.post-card-title {
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.3;
  margin: 0 0 0.75rem;
  color: var(--text-primary);
}

.post-card-summary {
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--text-subtle);
  margin: 0 0 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-card-cta {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--accent);
  display: inline-block;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--line-soft);
}

.pagination-btn {
  padding: 0.75rem 1.25rem;
  border: 1px solid var(--line-soft);
  border-radius: var(--radius-md);
  background: var(--bg-soft);
  color: var(--text-primary);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.pagination-btn:hover:not(:disabled) {
  border-color: var(--line-strong);
  background: var(--bg-mute);
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-info {
  font-family: var(--font-mono);
  color: var(--text-subtle);
  font-size: 0.95rem;
}

@media (max-width: 768px) {
  .blog-index-header {
    margin-bottom: 2rem;
  }

  .blog-posts-grid {
    gap: 1.5rem;
  }

  .post-card-link {
    grid-template-columns: 1fr;
  }

  .post-card-image {
    height: 200px;
    min-height: unset;
  }

  .pagination {
    flex-direction: column;
    gap: 0.75rem;
  }

  .pagination-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
