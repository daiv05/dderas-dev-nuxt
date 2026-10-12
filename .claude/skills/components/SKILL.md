---
name: components
description: Auto-imported components - layout shell (SiteNav, SiteFooter), ui primitives, home sections, toggles, ImageViewer, content components - and the default/blog layouts. Use when using or creating components, layouts, or working with ContentRenderer.
---

# Components and Layouts

> Components are auto-imported with `pathPrefix: false`, so `app/components/home/HomeHero.vue` is used as `<HomeHero>`.

## Key files

- `app/components/*.vue` - shell and shared components
- `app/components/ui/` - primitives (see the `design-system` skill)
- `app/components/space/` - embedding space (see the `embedding-space` skill)
- `app/components/home/` - home page sections
- `app/components/content/` - Markdown components for `ContentRenderer`
- `app/layouts/default.vue`, `app/layouts/blog.vue`

## Shell components

- `SiteNav` - sticky header with brand, links (`work`, `experience`, `writing`, `resources`), `LocaleToggle`, `ThemeToggle` and a mobile panel; no props. The `experience` link points to `/#experience`.
- `SiteFooter` - role, email, LinkedIn, GitHub and resources link from `contactInfo`; no props.
- `ScrollTopButton` - fixed button that calls `$lenis.scrollTo(0)` or `window.scrollTo`.
- `ThemeToggle` - ghost `UiButton` calling `appStore.toggleTheme()`; the icon renders inside `ClientOnly`.
- `LocaleToggle` - ghost `UiButton` linking to `switchLocalePath` of the other locale.
- `ImageViewer` - zoom, pan, reset, download and close overlay.
- `PostHeader` - blog article header.

```vue
<ScrollTopButton :threshold="300" />
<ImageViewer v-model="showImageViewer" :src="selectedImage.src" :alt="selectedImage.alt" />
<PostHeader
  :title="post.title"
  :date="post.date"
  :lastmod="post.lastmod"
  :author="post.author"
  :tags="post.tags"
  :image="post.image"
  :summary="post.summary"
/>
```

`ScrollTopButton` props: `threshold?: number` (default 500). `ImageViewer` props: `modelValue: boolean`, `src: string`, `alt: string`.

## Home sections

`HomeHero`, `HomeBuild`, `HomeWork`, `HomeExperience` (anchor `#experience`), `HomeWriting` and `HomeContact` take no props and read text from `home.*`. `SectionHeading` takes `index: string`, `title: string`, `note?: string`. They are composed in `app/pages/index.vue`.

## Content components

Only work inside Markdown rendered by `<ContentRenderer>`.

```md
::table-of-contents
::

::mermaid-diagram{content="graph TD; A-->B; B-->C"}
::
```

`code-group` renders tabbed code blocks. `ProsePre` (Shiki highlighting with copy button), `ProseTable` and `ProseCode` are generated automatically from Markdown fences, tables and inline code.

## Layouts

```ts
definePageMeta({ layout: 'default' })
definePageMeta({ layout: 'blog' })
```

| Layout | Structure |
|--------|-----------|
| `default` | skip link, `SiteNav`, `<main id="main">`, `SiteFooter`, `ScrollTopButton` |
| `blog` | sticky header with brand and post count, back link, `LocaleToggle`, `ThemeToggle`, `<main id="main">` with a 900px container, `SiteFooter`, `ScrollTopButton`, `ImageViewer` |

Both layouts scroll on `window`. In `blog`, clicking an `img` inside `.markdown-body` (not inside a link) opens `ImageViewer`.

## Restrictions

- Do not import components manually; Nuxt auto-imports them by name without folder prefixes
- Do not give two components the same name in different folders
- `content/` components only work inside `<ContentRenderer :value="post" />`
- Use `UiButton`, `UiIcon`, `UiTag` and `UiDialog` instead of native styled controls
- Use `ClientOnly` or a `.client.vue` suffix for components that need `window`, `document` or WebGL
- Use `ImageViewer` once per layout
