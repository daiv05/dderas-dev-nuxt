<template>
  <section id="writing" class="writing">
    <SectionHeading index="04" :title="t('home.writing.title')" />
    <div class="writing__grid">
      <NuxtLink
        v-for="post in latest"
        :key="post.slug"
        :to="localePath(`/blog/${post.slug}`)"
        class="writing__post"
        data-reveal="line"
      >
        <span class="writing__title">{{ post.title }}</span>
        <span v-if="post.summary" class="writing__summary">{{ post.summary }}</span>
        <span class="writing__meta mono">{{ post.tags?.[0] ?? 'ml' }}</span>
      </NuxtLink>
    </div>
    <NuxtLink :to="localePath('/blog')" class="writing__all mono" data-reveal="line">
      {{ t('home.writing.all') }}
      <UiIcon name="arrow-right" :size="14" />
    </NuxtLink>
  </section>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()
const { getPosts } = useBlog()

const { data: posts } = await useAsyncData(() => `home-writing-${locale.value}`, () => getPosts(), {
  watch: [locale],
})

const latest = computed(() => (posts.value ?? []).filter((p) => p.slug).slice(0, 3))
</script>

<style scoped>
.writing {
  padding-top: var(--section-gap);
}

.writing__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.writing__post {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  border-top: 2px solid var(--ink);
  padding-top: 0.9rem;
}

.writing__title {
  font-size: 1.15rem;
  font-weight: 600;
  line-height: 1.3;
  transition: color var(--transition-fast);
}

.writing__post:hover .writing__title {
  color: var(--terra);
}

.writing__summary {
  font-size: 0.9rem;
  color: var(--muted);
}

.writing__meta {
  font-size: 0.65rem;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.writing__all {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: 1.5rem;
  font-size: 0.8rem;
  color: var(--muted);
}

.writing__all:hover {
  color: var(--terra);
}

@media (max-width: 900px) {
  .writing__grid {
    grid-template-columns: 1fr;
  }
}
</style>
