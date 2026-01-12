<template>
  <div class="page-frame-blog">
    <div v-if="pending" class="post-loading">
      <p>{{ t("loader.message") }}</p>
    </div>

    <section v-else-if="post" class="section-stack blog-wrapper">
      <article class="blog-post">
        <nav class="breadcrumbs" aria-label="Breadcrumb">
          <NuxtLink :to="localePath('/blog')">
            {{ t("navigation.backToBlog") }}
          </NuxtLink>
          <span class="separator">/</span>
          <span class="current">{{ post.title }}</span>
        </nav>

        <PostHeader
          :title="post.title"
          :date="post.date"
          :lastmod="post.lastmod"
          :author="post.author"
          :tags="post.tags"
          :image="post.image"
          :summary="post.summary"
        />

        <div class="markdown-body">
          <ContentRenderer :value="post" />
        </div>

        <footer class="post-footer">
          <NuxtLink :to="localePath('/blog')" class="back-to-blog">
            ← {{ t("blog.backToIndex") }}
          </NuxtLink>
        </footer>
      </article>
    </section>

    <div v-else class="post-not-found">
      <h1>{{ t("blog.noResults") }}</h1>
      <NuxtLink :to="localePath('/blog')">
        {{ t("blog.backToIndex") }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "blog",
});

const route = useRoute();
const { t, locale } = useI18n();
const localePath = useLocalePath();
const { getPost } = useBlog();

const slug = computed(() => route.params.slug as string);

// Obtener el post del blog
const { data: post, pending } = await useAsyncData(
  () => `blog-post-${slug.value}-${locale.value}`,
  () => getPost(slug.value),
  {
    watch: [slug, locale], // Re-fetch cuando cambie el idioma o el slug
  }
);

// SEO
useHead(() => ({
  title: post.value?.title || t("seo.pages.blog.title"),
  meta: [
    {
      name: "description",
      content: post.value?.summary || t("seo.pages.blog.description"),
    },
    {
      property: "og:title",
      content: post.value?.title || t("seo.pages.blog.title"),
    },
    {
      property: "og:description",
      content: post.value?.summary || t("seo.pages.blog.description"),
    },
    {
      property: "og:image",
      content: post.value?.image || t("seo.defaults.ogImage"),
    },
    {
      property: "article:published_time",
      content: post.value?.date || "",
    },
    {
      property: "article:modified_time",
      content: post.value?.lastmod || post.value?.date || "",
    },
    {
      property: "article:author",
      content: post.value?.author || t("seo.defaults.author"),
    },
  ],
}));
</script>

<style scoped>
.blog-wrapper {
  display: flex;
  flex-direction: column;
  max-width: 68ch;
  margin: 0 auto;
}

.post-loading,
.post-not-found {
  text-align: center;
  padding: 4rem 1rem;
  color: var(--text-subtle);
}

.post-not-found h1 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: var(--text-primary);
}

.post-not-found a {
  color: var(--accent);
  text-decoration: none;
  font-weight: 600;
}

.post-not-found a:hover {
  text-decoration: underline;
}

.breadcrumbs {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: var(--text-subtle);
  margin-bottom: 1.5rem;
}

.breadcrumbs a {
  text-decoration: none;
  color: var(--text-subtle);
  transition: color 0.2s ease;
}

.breadcrumbs a:hover {
  color: var(--text-primary);
}

.breadcrumbs .separator {
  opacity: 0.5;
}

.breadcrumbs .current {
  color: var(--text-primary);
  font-weight: 500;
}

.post-footer {
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid var(--line-soft);
}

.back-to-blog {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--accent);
  text-decoration: none;
  font-weight: 600;
  transition: transform 0.2s ease;
}

.back-to-blog:hover {
  transform: translateX(-4px);
}
</style>
