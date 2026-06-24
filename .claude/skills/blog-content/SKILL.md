---
name: blog-content
description: Create/edit blog articles in EN/ES - frontmatter, collections, images, Markdown features. Use when writing content under content/{en,es}/blog/.
---

# Blog Content

> Create and edit blog articles in both languages (EN and ES).

## Key files

- `content/en/blog/*.md` - articles in English
- `content/es/blog/*.md` - articles in Spanish
- `content.config.ts` - collections and schema (Zod)
- `public/blog/[slug]/shared/*.webp` - article images

## Frontmatter schema

```yaml
---
id: "my-article"           # recommended, same as the slug
title: "My article"        # REQUIRED
slug: "my-article"         # recommended; MUST be the same in EN and ES
order: 5                   # optional; higher number = appears earlier in the list
date: 2026-01-15           # REQUIRED, YYYY-MM-DD format
lastmod: 2026-01-20        # optional, last modified date
author: David Deras         # optional
tags:                      # optional
  - Vue
  - TypeScript
summary: "Short summary"   # optional, used in cards and SEO
image: /blog/my-article/shared/cover.webp  # optional
sitemap:                   # optional
  priority: 0.7
  loc: /blog/my-article    # /es/blog/my-article for ES
  lastmod: 2026-01-20
---
```

## Required vs optional fields

| Field | Type | Required |
|-------|------|----------|
| `title` | string | Yes |
| `date` | string (YYYY-MM-DD) | Yes |
| `id` | string | No (recommended) |
| `slug` | string | No (recommended) |
| `order` | number | No |
| `lastmod` | string | No |
| `author` | string | No |
| `tags` | string[] | No |
| `summary` | string | No |
| `image` | string (/public path) | No |
| `sitemap` | object | No |

## Sorting

- With `order`: sorts by `order` descending (higher number = more recent)
- Without `order`: sorts by `date` descending

## Full article structure

```md
---
[frontmatter]
---

Short intro paragraph.

::table-of-contents
::

---

## Section 1

Content...

## Section 2

More content...
```

## Images

```
public/blog/[slug]/
├── shared/          # shared EN/ES images (most cases)
│   └── cover.webp
├── en/              # EN-specific images (only if they differ)
└── es/              # ES-specific images (only if they differ)
```

- `.webp` format mandatory
- Reference in frontmatter: `image: /blog/my-article/shared/cover.webp`
- Reference in markdown: `![Alt text](/blog/my-article/shared/image.webp)`

## Collections (@nuxt/content v3)

- `content_en` - source: `en/**/*.md`, path prefix: `/blog`
- `content_es` - source: `es/**/*.md`, path prefix: `/blog`
- Do not use `queryCollection()` directly in pages; use `useBlog()` (see the `composables` skill)

## Special components in Markdown

```md
# Automatic table of contents
::table-of-contents
::

# Math formulas (KaTeX)
$$E = mc^2$$

Inline: $\alpha + \beta = \gamma$

# Mermaid diagram
::mermaid-diagram{content="graph TD; A-->B"}
::

# Code tabs
:code-group

```ts [TypeScript]
const x: number = 1
```

```js [JavaScript]
const x = 1
```

::
```

## Conventions

- The `slug` must be **identical** in `content/en/blog/` and `content/es/blog/`
- `.md` file name = slug (e.g. `my-article.md`)
- ES articles are translations of the same EN content (same slug = same post)
- External links: `[text](url){target="_blank" rel="noopener noreferrer"}`

## Restrictions

- Do not change the slug between EN and ES - it breaks `findEquivalentPost()` on language switch
- Images must exist in `/public` before the build (static prerendering)
- Do not use `queryCollection()` directly in pages; always go through `useBlog()`
