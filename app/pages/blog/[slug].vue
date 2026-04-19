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

        <nav
          v-if="adjacentPosts && (adjacentPosts.prev || adjacentPosts.next)"
          class="post-navigation"
          aria-label="Post navigation"
        >
          <NuxtLink
            v-if="adjacentPosts.prev"
            :to="getPostLink(adjacentPosts.prev)"
            class="post-navigation-card post-navigation-prev"
          >
            <span class="post-navigation-label">← {{ t('blog.nav.prev') }}</span>
            <span class="post-navigation-title">{{ adjacentPosts.prev.title }}</span>
          </NuxtLink>
          <div
            v-else
            class="post-navigation-card post-navigation-placeholder"
            aria-hidden="true"
          />

          <NuxtLink
            v-if="adjacentPosts.next"
            :to="getPostLink(adjacentPosts.next)"
            class="post-navigation-card post-navigation-next"
          >
            <span class="post-navigation-label">{{ t('blog.nav.next') }} →</span>
            <span class="post-navigation-title">{{ adjacentPosts.next.title }}</span>
          </NuxtLink>
          <div
            v-else
            class="post-navigation-card post-navigation-placeholder"
            aria-hidden="true"
          />
        </nav>

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
const { getPost, getAdjacentPosts } = useBlog();

const ogLocale = computed(() => (locale.value === 'es' ? 'es_ES' : 'en_US'))
const twitterHandle = computed(() => {
  const raw = t('seo.twitterHandle').trim()
  if (!raw) return ''
  return raw.startsWith('@') ? raw : `@${raw}`
})

const slug = computed(() => route.params.slug as string);

const { data: post, pending } = await useAsyncData(
  () => `blog-post-${slug.value}-${locale.value}`,
  () => getPost(slug.value),
  {
    watch: [slug, locale],
  }
);

const { data: adjacentPosts } = await useAsyncData(
  () => `blog-post-adjacent-${slug.value}-${locale.value}`,
  () => getAdjacentPosts(slug.value),
  {
    watch: [slug, locale],
  }
)

const getPostLink = (blogPost: { slug?: string; id?: string }): string => {
  const target = blogPost.slug || blogPost.id
  return target ? localePath(`/blog/${target}`) : localePath('/blog')
}

watch(
  () => [post.value, pending.value],
  ([postValue, pendingValue]) => {
    if (!pendingValue && !postValue) {
      navigateTo(localePath('/blog'))
    }
  },
  { immediate: true }
)

const { url: siteUrl } = useSiteConfig()
const canonicalUrl = computed(() => {
  try {
    return new URL(route.path, siteUrl).toString()
  } catch {
    return undefined
  }
})

const seoTitle = computed(() => post.value?.title || t('seo.pages.blog.title'))
const seoDescription = computed(() => post.value?.summary || t('seo.pages.blog.description'))
const seoImage = computed(() => {
  const raw = post.value?.image || siteUrl + t('seo.defaults.ogImage')
  if (!raw) return raw
  try {
    return new URL(raw, siteUrl).toString()
  } catch {
    return raw
  }
})
const seoKeywords = computed(() => (post.value?.tags?.length ? post.value.tags.join(', ') : undefined))

useSeoMeta({
  title: () => seoTitle.value,
  description: () => seoDescription.value,
  keywords: () => seoKeywords.value,

  ogSiteName: () => t('seo.siteName'),
  ogLocale: () => ogLocale.value,
  ogType: 'article',
  ogUrl: () => canonicalUrl.value,
  ogTitle: () => seoTitle.value,
  ogDescription: () => seoDescription.value,
  ogImage: () => seoImage.value,
  ogImageAlt: () => t('seo.defaults.ogImageAlt'),

  twitterCard: 'summary_large_image',
  twitterSite: () => twitterHandle.value,
  twitterCreator: () => twitterHandle.value,
  twitterTitle: () => seoTitle.value,
  twitterDescription: () => seoDescription.value,
  twitterImage: () => seoImage.value,
})

useHead(() => {
  const published = post.value?.date || ''
  const modified = post.value?.lastmod || post.value?.date || ''
  const author = post.value?.author || t('seo.defaults.author')
  const tags = post.value?.tags || []

  const articleTags = tags.map((tag) => ({
    property: 'article:tag',
    content: tag,
  }))

  const jsonLd = post.value
    ? {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: seoTitle.value,
        description: seoDescription.value,
        image: seoImage.value ? [seoImage.value] : undefined,
        datePublished: published || undefined,
        dateModified: modified || undefined,
        author: {
          '@type': 'Person',
          name: author,
        },
        mainEntityOfPage: canonicalUrl.value
          ? {
              '@type': 'WebPage',
              '@id': canonicalUrl.value,
            }
          : undefined,
      }
    : null

  return {
    meta: [
      { property: 'article:published_time', content: published },
      { property: 'article:modified_time', content: modified },
      { property: 'article:author', content: author },
      ...articleTags,
    ],
    script: jsonLd
      ? [
          {
            type: 'application/ld+json',
            children: JSON.stringify(jsonLd),
          },
        ]
      : [],
  }
})
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

.post-navigation {
  margin-top: 3rem;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.post-navigation-card {
  min-height: 110px;
  padding: 1rem 1.2rem;
  border: 1px solid var(--line-soft);
  border-radius: var(--radius-md);
  background: var(--bg-soft);
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  text-decoration: none;
  transition: border-color 0.2s ease, transform 0.2s ease, background 0.2s ease;
}

.post-navigation-card:hover {
  border-color: var(--line-strong);
  background: var(--bg-mute);
  transform: translateY(-2px);
}

.post-navigation-label {
  font-size: 0.72rem;
  font-family: var(--font-mono);
  color: var(--text-subtle);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.post-navigation-title {
  font-size: 0.95rem;
  line-height: 1.35;
  color: var(--text-primary);
  font-weight: 600;
}

.post-navigation-next {
  text-align: right;
  align-items: flex-end;
}

.post-navigation-prev {
  text-align: left;
  align-items: flex-start;
}

.post-navigation-placeholder {
  visibility: hidden;
  pointer-events: none;
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

@media (max-width: 768px) {
  .post-navigation {
    grid-template-columns: 1fr;
  }

  .post-navigation-next {
    text-align: left;
    align-items: flex-start;
  }

  .post-navigation-placeholder {
    display: none;
  }
}
</style>
