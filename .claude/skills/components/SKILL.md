---
name: components
description: Auto-imported global and content components plus layouts (default/blog). Use when using/creating components or working with ContentRenderer.
---

# Available Components

> Global and content components of the project. All auto-imported by Nuxt.

## Files

- `app/components/*.vue` - global components
- `app/components/content/*.vue` - components for Markdown (ContentRenderer)

---

## Global components (app/components/)

### AppLoader
Application loading overlay. No props. Used in `app.vue`.

### SplashScreen
Splash screen on load. No props. Used only in `app.vue`.

### ThemeToggle
Theme toggle button. No props. Uses `useAppStore()` internally.

### LocaleToggle
Language toggle button. No props. Uses `useI18n()` and `useAppStore()` internally.

### Footer
Site footer. No props. Reads data from locales and `contactInfo`.

### PostHeader

```vue
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

All props are optional (string, string[], etc.).

### ImageViewer

```vue
<ImageViewer v-model="showViewer" :src="imageUrl" :alt="imageAlt" />
```

Props: `modelValue: boolean`, `src: string`, `alt: string`.
Features: zoom (0.25x step, 1x–4x), drag/pan, scroll-to-zoom, download button.
In the `blog.vue` layout it activates automatically when clicking any `img` inside `.markdown-body`.

### Description
Overview section on the landing. No props.

### Info
General information component. No props.

### LandingWindow
Main hero of the landing page. No props. Reads everything from locales (`hero.*`).

---

## Content components (app/components/content/)

Only work inside Markdown rendered by `<ContentRenderer>`.

### table-of-contents

```md
::table-of-contents
::
```

Generates an automatic TOC from the article's H2/H3. No configuration.

### mermaid-diagram

```md
::mermaid-diagram{content="graph TD; A-->B; B-->C"}
::
```

### code-group (code tabs)

```md
:code-group

```ts [file.ts]
const x: number = 1
```

```js [file.js]
const x = 1
```

::
```

### ProsePre
Code block with syntax highlighting (Shiki, vitesse-light/dark themes) and copy button.
Generated automatically from ` ``` ` fences in Markdown.
Props: `code`, `language`, `filename`, `highlights`, `meta`.

### ProseTable
Table with horizontal scroll. Generated automatically from tables in Markdown.

### ProseCode
Inline code. Generated automatically from backticks in Markdown.

---

## Layouts

```ts
definePageMeta({ layout: 'default' })  // left sidebar, footer
definePageMeta({ layout: 'blog' })     // simple header, centered layout (max-width: 78ch), ImageViewer
```

| Layout | Scroller | File |
|--------|----------|---------|
| `default` | `.shell-main` | `app/layouts/default.vue` |
| `blog` | `.blog-main` | `app/layouts/blog.vue` |

The scrollers are relevant for GSAP and useBlogScroll() (see the `gsap-animations` skill).

---

## Restrictions

- Do not manually import global components - Nuxt auto-imports them by name
- The `content/` components only work inside `<ContentRenderer :value="post" />`
- Do not use Vuetify's `useDisplay()` outside of `<ClientOnly>` or `onMounted`
- `ImageViewer` and `SplashScreen` should only be used once per view
