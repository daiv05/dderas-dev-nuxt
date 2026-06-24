---
name: pages-and-routing
description: Pages, routes, definePageMeta, localized navigation, prerender. Use when creating pages or changing navigation/routing.
---

# Pages and Routes

> Page structure, available routes and navigation patterns.

## Key files

- `app/pages/index.vue` - `/`
- `app/pages/about.vue` - `/about`
- `app/pages/projects.vue` - `/projects`
- `app/pages/resources.vue` - `/resources`
- `app/pages/blog/index.vue` - `/blog`
- `app/pages/blog/[slug].vue` - `/blog/[slug]`
- `app/router.options.ts` - custom scroll behavior
- `app/data/sidebar-items.ts` - menu items (see the `data-files` skill)

## Available routes

| Route | Layout | Description |
|------|--------|-------------|
| `/` | `default` | Landing with hero and overview |
| `/about` | `default` | Profile and experience |
| `/projects` | `default` | Project portfolio |
| `/resources` | `default` | Resources and material |
| `/blog` | `blog` | Article listing (6/page) |
| `/blog/[slug]` | `blog` | Individual article |

All routes have an equivalent in `/es/*`.

## Creating a new page

```vue
<!-- app/pages/new.vue -->
<script setup lang="ts">
definePageMeta({ layout: 'default' })
usePageSeo('new')  // must exist in seo.pages.new in both locales
</script>

<template>
  <!-- content -->
</template>
```

Additional steps:
1. Add `seo.pages.new` in `app/locales/en.json` and `es.json`
2. Add an item in `app/data/sidebar-items.ts` (if it goes in the menu)
3. Add a key in `navigation.items.new` in both locales

## Navigation

```vue
<!-- Template -->
<NuxtLink :to="localePath('/blog')">Blog</NuxtLink>
<NuxtLink :to="localePath(`/blog/${post.slug}`)">{{ post.title }}</NuxtLink>
```

```ts
// Script
const localePath = useLocalePath()
navigateTo(localePath('/about'))
navigateTo(localePath('/blog/my-slug'), { replace: true })

// New tab
const router = useRouter()
const url = router.resolve(localePath('/blog')).href
globalThis.open(url, '_blank')
```

## Scroll behavior (router.options.ts)

- Smooth scroll enabled globally
- Available scrollers: `.shell-main` (default) and `.blog-main` (blog)
- Hash links (`#heading`) smooth-scroll to the heading
- Scroll position is remembered per route

## Configured redirects

```
/tools     → /
/es/tools  → /es
```

## Static prerendering

- `nitro.prerender.crawlLinks: true` - prerenders all linked routes
- Blog pages are prerendered automatically from the markdown files
- Explicit prerendered routes: `/sitemap.xml`, `/robots.txt`

## contactInfo in pages

```ts
// To display email, socials, etc. in pages
import { contactInfo } from '~/data/contact'
// Do not hardcode email or social network URLs
```

## Restrictions

- Always `definePageMeta({ layout: '...' })` in each page (there is no default layout)
- Always `usePageSeo('pageKey')` in each page (SEO critical for prerender)
- Do not use `$router.push()` without `localePath()`
- Do not create new layouts without updating `plugins/gsap.ts` (depends on `.shell-main`/`.blog-main`)
- The route param in `/blog/[slug].vue` is `route.params.slug`
