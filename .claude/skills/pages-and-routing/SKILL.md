---
name: pages-and-routing
description: Pages, routes, definePageMeta, localized navigation, redirects, hash scrolling and prerender. Use when creating pages or changing navigation and routing.
---

# Pages and Routes

> Page structure, routes and navigation patterns.

## Key files

- `app/pages/index.vue` - `/`
- `app/pages/work/index.vue` - `/work`
- `app/pages/work/[slug].vue` - `/work/[slug]`
- `app/pages/resources.vue` - `/resources`
- `app/pages/blog/index.vue` - `/blog`
- `app/pages/blog/[slug].vue` - `/blog/[slug]`
- `app/router.options.ts` - scroll behavior and redirects
- `app/components/SiteNav.vue` - navigation items
- `nuxt.config.ts` - `routeRules` and prerender routes

## Routes

| Route | Layout | Description |
|------|--------|-------------|
| `/` | `default` | Home: hero with embedding space, build clusters, work, experience (`#experience`), writing, contact |
| `/work` | `default` | Project archive, featured first |
| `/work/[slug]` | `default` | Case study; throws a 404 for an unknown id |
| `/resources` | `default` | Resources |
| `/blog` | `blog` | Article listing |
| `/blog/[slug]` | `blog` | Article |

Every route has an `/es/*` equivalent.

## Creating a page

```vue
<script setup lang="ts">
definePageMeta({ layout: 'default' })

const { t } = useI18n()
const root = ref<HTMLElement | null>(null)

useReveal(root)
usePageSeo('work')
</script>

<template>
  <div ref="root">
    <h1 data-reveal="line">{{ t('work.title') }}</h1>
  </div>
</template>
```

Additional steps:
1. Add `seo.pages.<key>` in `app/locales/en.json` and `es.json`
2. Add the item to `items` in `SiteNav.vue` and `navigation.items.<key>` in both locales (if it belongs in the menu)

## Navigation

```vue
<NuxtLink :to="localePath('/work')">{{ t('navigation.items.work') }}</NuxtLink>
<NuxtLink :to="localePath(`/work/${project.id}`)">{{ name }}</NuxtLink>
```

```ts
const localePath = useLocalePath()
navigateTo(localePath('/blog/my-slug'), { replace: true })
```

## Scroll and redirects

```ts
const NAV_OFFSET = 72

scrollBehavior(to, from, savedPosition) {
  if (savedPosition) return savedPosition
  if (to.hash) {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ el: to.hash, top: NAV_OFFSET }), to.path === from.path ? 0 : 120)
    })
  }
  return { left: 0, top: 0 }
}
```

- Scrolling is on `window`; hash targets are offset by 72px for the sticky nav
- `router.options.ts` redirects `/tools` to `/` and `/es/tools` to `/es`
- `routeRules` redirect `/about` to `/#experience`, `/projects` to `/work`, and the `/es` equivalents

## Prerendering

- `nitro.prerender.crawlLinks: true`
- Explicit routes: `/sitemap.xml`, `/robots.txt`, and `/work/<id>` plus `/es/work/<id>` for every project
- Blog pages are prerendered from the Markdown files

## Restrictions

- Always call `definePageMeta({ layout: '...' })` (`default` or `blog`) and `usePageSeo('key')` in each page
- Do not use `$router.push()` without `localePath()`
- Do not hardcode email or social URLs in pages; import `contactInfo` from `~/data/contact`
- Do not create a page per project; case studies come from `projectList` via `work/[slug].vue`
- The route param in `[slug].vue` is `route.params.slug`
