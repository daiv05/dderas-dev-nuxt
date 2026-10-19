<template>
  <div class="blog-shell">
    <header class="blog-header">
      <div class="blog-header__inner">
        <NuxtLink :to="localePath('/blog')" class="blog-brand">
          <span class="blog-brand__name">{{ t('navigation.brand.blogName') }}</span>
          <span v-if="postCount" class="blog-brand__edition mono">no.{{ String(postCount).padStart(2, '0') }}</span>
        </NuxtLink>
        <div class="blog-header__actions mono">
          <NuxtLink :to="localePath('/')" class="blog-back">
            <UiIcon name="arrow-left" :size="14" />
            {{ t('navigation.backToMain') }}
          </NuxtLink>
          <LocaleToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>

    <main id="main" class="blog-main">
      <div class="blog-container" @click="handleImageClick">
        <slot />
      </div>
    </main>

    <SiteFooter />
    <ScrollTopButton :threshold="300" />
    <ImageViewer v-model="showImageViewer" :src="selectedImage.src" :alt="selectedImage.alt" />
  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()
const { getPosts } = useBlog()

const { data: allPosts } = await useAsyncData(
  () => `blog-layout-count-${locale.value}`,
  () => getPosts(),
  { watch: [locale] },
)
const postCount = computed(() => allPosts.value?.length ?? 0)

const showImageViewer = ref(false)
const selectedImage = ref({ src: '', alt: '' })

const handleImageClick = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (target.tagName !== 'IMG' || !target.closest('.markdown-body') || target.closest('a')) return
  const img = target as HTMLImageElement
  selectedImage.value = { src: img.src, alt: img.alt || '' }
  showImageViewer.value = true
}
</script>

<style scoped>
.blog-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.blog-header {
  position: sticky;
  top: 0;
  z-index: 40;
  border-bottom: 1px solid var(--rule);
  background: color-mix(in srgb, var(--paper) 90%, transparent);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.blog-header__inner {
  max-width: 900px;
  margin: 0 auto;
  height: var(--nav-height);
  padding: 0 var(--gutter);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.blog-brand {
  display: flex;
  align-items: baseline;
  gap: 0.6rem;
}

.blog-brand__name {
  font-size: 1.2rem;
  font-weight: 700;
  font-style: italic;
}

.blog-brand__edition {
  font-size: 0.7rem;
  color: var(--accent);
}

.blog-header__actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
}

.blog-back {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  color: var(--muted);
  margin-right: 0.5rem;
  transition: color var(--transition-fast);
}

.blog-back:hover {
  color: var(--ink);
}

.blog-main {
  flex: 1;
}

.blog-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 3.5rem var(--gutter);
}

@media (max-width: 600px) {
  .blog-container {
    padding: 1.5rem var(--gutter);
  }

  .blog-back span {
    display: none;
  }
}
</style>
