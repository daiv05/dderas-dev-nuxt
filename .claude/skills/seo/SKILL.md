---
name: seo
description: Per-page SEO with usePageSeo() and useSiteSeoDefaults(). Use when setting title/description/OG/Twitter meta or working with seo.* keys in locales.
---

# Per-page SEO

> Configure SEO for pages and blog articles with usePageSeo().

## Key files

- `app/composables/usePageSeo.ts` - per-page composable
- `app/composables/useSiteSeoDefaults.ts` - global defaults (`app.vue` only)
- `app/app.vue` - canonical and hreflang links
- `app/locales/en.json`, `app/locales/es.json` - `seo.*` section

## Static pages

```ts
usePageSeo('home')
usePageSeo('work')
usePageSeo('blog')
usePageSeo('resources')
```

## PageSeoOptions

```ts
type SeoValue = string | (() => string)

type PageSeoOptions = {
  title?: SeoValue
  description?: SeoValue
  ogType?: 'website' | 'article'
  image?: SeoValue
  keywords?: SeoValue
}
```

`ogType` defaults to `'website'`. Relative images are resolved against the site URL.

## Dynamic pages

```ts
usePageSeo('work', {
  title: () => copy.value.name,
  description: () => copy.value.description,
})
```

## Locale structure

```json
{
  "seo": {
    "siteName": "DDeras",
    "twitterHandle": "",
    "defaults": { "title": "", "description": "", "keywords": [], "author": "", "ogImage": "", "ogImageAlt": "" },
    "pages": {
      "home": { "title": "", "description": "", "keywords": [] },
      "blog": { "title": "", "description": "", "keywords": [] },
      "resources": { "title": "", "description": "", "keywords": [] },
      "work": { "title": "", "description": "", "keywords": [] }
    }
  }
}
```

## Generated meta

- `title`, `description`, `keywords`
- Open Graph: `og:site_name`, `og:locale`, `og:type`, `og:url`, `og:title`, `og:description`, `og:image`, `og:image:alt`
- Twitter: `twitter:card` (`summary_large_image`), `twitter:title`, `twitter:description`, `twitter:image`, plus `twitter:site` and `twitter:creator` only when `seo.twitterHandle` is not empty (the handle is normalized to start with `@`)

## Adding a pageKey

1. Add `seo.pages.<key>` in `en.json` and `es.json`
2. Call `usePageSeo('<key>')` in the page

## Restrictions

- Call `useSiteSeoDefaults()` only in `app/app.vue`
- Do not call `useSeoMeta()` directly in pages; use `usePageSeo()`
- Use functions for options that depend on reactive values
- Every `pageKey` needs `title` and `description` in both locales
