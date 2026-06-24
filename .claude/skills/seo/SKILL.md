---
name: seo
description: Per-page SEO with usePageSeo() and useSiteSeoDefaults(). Use when setting title/description/OG/Twitter meta or working with seo.* keys in locales.
---

# Per-page SEO

> Configure SEO for pages and blog articles with usePageSeo().

## Key files

- `app/composables/usePageSeo.ts` - main composable
- `app/composables/useSiteSeoDefaults.ts` - global defaults (app.vue only)
- `app/locales/en.json` → `seo.*` section
- `app/locales/es.json` → `seo.*` section

## Static pages

```ts
// In <script setup> of the page - reads seo.pages.[pageKey].* from the active locale
usePageSeo('home')
usePageSeo('me')
usePageSeo('projects')
usePageSeo('blog')
usePageSeo('resources')
```

## PageSeoOptions type

```ts
type SeoValue = string | (() => string)

type PageSeoOptions = {
  title?: SeoValue
  description?: SeoValue
  ogType?: 'website' | 'article'   // default: 'website'
  image?: SeoValue                  // absolute or relative URL (resolved automatically)
  keywords?: SeoValue
}
```

## Blog article (dynamic SEO)

```ts
const { data: post } = await useAsyncData(...)

usePageSeo('blog', {
  title: () => post.value?.title || t('seo.pages.blog.title'),
  description: () => post.value?.summary || t('seo.pages.blog.description'),
  ogType: 'article',
  image: () => post.value?.image,
  keywords: () => post.value?.tags?.join(', '),
})
```

## SEO key structure in locales

```json
{
  "seo": {
    "siteName": "DDeras",
    "twitterHandle": "daiv_09",
    "defaults": {
      "title": "Software Engineer",
      "description": "...",
      "keywords": ["Vue", "TypeScript", "..."],
      "author": "David Deras",
      "ogImage": "/punpun_OG.webp",
      "ogImageAlt": "..."
    },
    "pages": {
      "home":      { "title": "...", "description": "...", "keywords": ["..."] },
      "me":        { "title": "...", "description": "...", "keywords": ["..."] },
      "projects":  { "title": "...", "description": "...", "keywords": ["..."] },
      "blog":      { "title": "...", "description": "...", "keywords": ["..."] },
      "resources": { "title": "...", "description": "...", "keywords": ["..."] }
    }
  }
}
```

## What usePageSeo() generates

- `useSeoMeta()` with: title, description, keywords
- OG: `og:site_name`, `og:locale`, `og:type`, `og:url`, `og:title`, `og:description`, `og:image`, `og:image:alt`
- Twitter: `twitter:card` (summary_large_image), `twitter:site`, `twitter:creator`, `twitter:title`, `twitter:description`, `twitter:image`

## Adding a new pageKey

1. Add `seo.pages.[newKey]` in `app/locales/en.json`
2. Add `seo.pages.[newKey]` in `app/locales/es.json`
3. Call `usePageSeo('newKey')` in the page

## Restrictions

- `useSiteSeoDefaults()` only call in `app/app.vue` (once at startup)
- Do not call `useSeoMeta()` directly in pages; use `usePageSeo()`
- Options may be strings or functions - use functions when the value is reactive
- The image is resolved as an absolute URL automatically (siteUrl is prepended if relative)
