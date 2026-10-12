---
name: composables
description: Project composables - useBlog, usePageSeo, useSiteSeoDefaults, useBlogScroll, useReveal, useMotionPreference, useEmbeddingSpace, useScrollStory. Use when consuming blog, SEO, motion, reveal or embedding space logic.
---

# Composables

> All project composables in `app/composables/`, auto-imported by Nuxt.

## Key files

- `app/composables/useBlog.ts`
- `app/composables/usePageSeo.ts`
- `app/composables/useSiteSeoDefaults.ts`
- `app/composables/useBlogScroll.ts`
- `app/composables/useReveal.ts`
- `app/composables/useMotionPreference.ts`
- `app/composables/useEmbeddingSpace.ts`
- `app/composables/useScrollStory.ts`

## useBlog()

Blog logic for the active locale.

```ts
const {
  getPosts,
  getPost,
  getAdjacentPosts,
  findEquivalentPost,
  getRecentPosts,
  getPostsByTag,
  getAllTags,
} = useBlog()
```

- `getPosts(): Promise<BlogPost[]>` - all posts of the active locale, sorted by `order` descending, then date descending
- `getPost(slug): Promise<BlogPost | null>` - falls back to the English collection
- `getAdjacentPosts(slug): Promise<{ prev, next }>`
- `findEquivalentPost(currentPath, toLocale): Promise<BlogPost | null>`
- `getRecentPosts(limit = 5)`, `getPostsByTag(tag)`, `getAllTags()`

```ts
const { locale } = useI18n()
const { getPosts } = useBlog()

const { data: posts } = await useAsyncData(() => `home-writing-${locale.value}`, () => getPosts(), {
  watch: [locale],
})
```

## usePageSeo(pageKey, options?)

See the `seo` skill.

```ts
usePageSeo('home')
usePageSeo('work', {
  title: () => copy.value.name,
  description: () => copy.value.description,
})
```

## useSiteSeoDefaults()

Called once in `app/app.vue`. No parameters.

## useBlogScroll()

```ts
const { scrollToTop, getScrollTop, getScrollElement } = useBlogScroll()
```

All three operate on `window`: `scrollToTop()` smooth-scrolls to the top, `getScrollTop()` returns `window.scrollY` (0 on the server), `getScrollElement()` returns `window`.

## useMotionPreference()

```ts
const { allowMotion, allow3d, ready } = useMotionPreference()
```

Three `useState` booleans (`motion:allow`, `motion:allow3d`, `motion:ready`), all `false` during SSR. On the first mount in the client it reads reduced motion, WebGL support, `saveData` and `hardwareConcurrency`, passes them to `decideMotion` from `app/utils/motion.ts` and sets `ready`.

```ts
decideMotion({ reducedMotion, webgl, saveData, cores })
```

Reduced motion disables both flags; otherwise `allowMotion` is true and `allow3d` requires WebGL, no `saveData` and more than 4 cores (a `null` core count counts as capable).

## useReveal(root)

```ts
const root = ref<HTMLElement | null>(null)
useReveal(root)
```

```vue
<div ref="root">
  <h1 data-reveal="line">{{ title }}</h1>
  <div data-reveal="rule"></div>
  <span data-reveal="count">0.947</span>
</div>
```

- `line` - fades and lifts the element when it reaches `top 88%`
- `rule` - scales a line from the left when it reaches `top 90%`
- `count` - animates the first number found in the text from 0 when it reaches `top 90%`, keeping prefix, suffix, decimals and thousands separators

It runs inside `gsap.context()` scoped to `root`, uses `$gsap` and `$ScrollTrigger`, does nothing while `allowMotion` is false, starts when it becomes true, and reverts on unmount.

## useEmbeddingSpace() and useScrollStory()

See the `embedding-space` skill.

## Restrictions

- Do not call `useSiteSeoDefaults()` outside `app/app.vue`
- Do not use `useSeoMeta()` directly in pages; use `usePageSeo()`
- Call `useReveal` inside a component setup with a template ref that exists after mount
- Always pass `watch: [locale]` to `useAsyncData` calls that depend on the language
