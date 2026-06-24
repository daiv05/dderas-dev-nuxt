---
name: composables
description: Project composables - useBlog, usePageSeo, useEnterAnimations, useBlogScroll, useGsapAnimations. Use when consuming blog/SEO/animation logic.
---

# Composables

> All project composables in `app/composables/`. Auto-imported by Nuxt.

## Files

- `app/composables/useBlog.ts`
- `app/composables/usePageSeo.ts`
- `app/composables/useSiteSeoDefaults.ts`
- `app/composables/useBlogScroll.ts`
- `app/composables/useEnterAnimations.ts`

---

## useBlog()

Blog logic. Uses the active locale internally.

```ts
const {
  getPosts,           // () => Promise<BlogPost[]> - all posts of the active locale, sorted
  getPost,            // (slug: string) => Promise<BlogPost | null> - falls back to EN if missing in ES
  getAdjacentPosts,   // (slug: string) => Promise<{ prev: BlogPost|null, next: BlogPost|null }>
  findEquivalentPost, // (currentPath: string, toLocale: string) => Promise<BlogPost | null>
  getRecentPosts,     // (limit?: number) => Promise<BlogPost[]> - default 5
  getPostsByTag,      // (tag: string) => Promise<BlogPost[]> - case-insensitive partial search
  getAllTags,          // () => Promise<string[]> - unique tags, alphabetically sorted
} = useBlog()
```

### BlogPost type

```ts
interface BlogPost {
  slug?: string
  title: string
  date: string          // 'YYYY-MM-DD'
  order?: number
  lastmod?: string
  author?: string
  tags?: string[]
  summary?: string
  image?: string        // path from /public
  id?: string
  path?: string
}
```

### Usage with useAsyncData

```ts
const { locale } = useI18n()
const { getPosts } = useBlog()

const { data: posts, pending } = await useAsyncData(
  () => `blog-index-${locale.value}`,
  () => getPosts(),
  { watch: [locale] }
)

// For a specific post:
const { data: post } = await useAsyncData(
  () => `blog-post-${slug}-${locale.value}`,
  () => getPost(slug),
  { watch: [locale] }
)
```

---

## usePageSeo(pageKey, options?)

Configures all the SEO of a page (title, description, OG, Twitter).

```ts
// Static page - reads seo.pages.[pageKey].* from the locale
usePageSeo('home')
usePageSeo('me')
usePageSeo('projects')
usePageSeo('blog')
usePageSeo('resources')

// With dynamic options (overrides those from the locale)
usePageSeo('blog', {
  title: () => post.value?.title,        // string or () => string
  description: () => post.value?.summary,
  ogType: 'article',                      // 'website' | 'article', default: 'website'
  image: () => post.value?.image,
  keywords: () => post.value?.tags?.join(', '),
})
```

---

## useSiteSeoDefaults()

Only call in `app/app.vue`. Configures robots, canonical and global site defaults.

```ts
useSiteSeoDefaults()  // no parameters
```

---

## useBlogScroll()

```ts
const { scrollToTop, getScrollTop, getScrollElement } = useBlogScroll()

scrollToTop()         // smooth scroll to the top of the blog
getScrollTop()        // number - current position
getScrollElement()    // HTMLElement | Window - the blog scroller
```

---

## useEnterAnimations()

Header pattern (label + title + description) + panels with GSAP.

```ts
const {
  label,                   // ref<HTMLElement | null> - eyebrow label
  titleEl,                 // ref<HTMLElement | null> - main title
  descriptionEl,           // ref<HTMLElement | null> - description/lead
  setPanelRef,             // (el: any) => void - use as :ref in v-for
  resetPanelRefs,          // () => void
  setupEnterAnimations,    // (options?: AnimationOptions) => void
  cleanupEnterAnimations,  // () => void
} = useEnterAnimations()
```

```ts
// AnimationOptions (all optional)
{
  headerStart?: string          // default: 'top 80%'
  panelsStart?: string          // default: 'top 80%'
  headerTrigger?: HTMLElement | null
  panelsTrigger?: HTMLElement | null
  fadeHeader?: boolean          // default: true - animates opacity
  fadePanels?: boolean          // default: true
}
```

```vue
<script setup>
const { label, titleEl, descriptionEl, setPanelRef, setupEnterAnimations, cleanupEnterAnimations } = useEnterAnimations()
onMounted(() => nextTick(() => setupEnterAnimations()))
onUnmounted(() => cleanupEnterAnimations())
</script>

<template>
  <p ref="label" class="eyebrow">Label</p>
  <h1 ref="titleEl">Title</h1>
  <p ref="descriptionEl">Description</p>
  <div v-for="item in items" :key="item.id" :ref="setPanelRef">...</div>
</template>
```

---

## useGsapAnimations()

For custom animations without the header/panels pattern. Automatic cleanup in `onBeforeUnmount`.

```ts
const { setupAnimations, cleanup } = useGsapAnimations()

onMounted(() => {
  nextTick(() => {
    setupAnimations(() => {
      // GSAP code here - automatically inside gsap.context()
      const scroller = getMainScroller()
      animateInOnEnter(document.querySelector('.my-el'), {
        from: { opacity: 0, y: 30 },
        to: { ...gsapDefaults, opacity: 1, y: 0 },
        scroller,
      })
    })
  })
})
```
