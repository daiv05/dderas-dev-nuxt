# CLAUDE.md

Guidance for AI agents working in this repository.

## Project

Personal portfolio and blog by David Deras. Statically prerendered, bilingual (EN/ES), SSR-enabled. The home page is built around an interactive 3D embedding space of the site's own content.

**Stack:** Nuxt 4 · Vue 3.5 · TypeScript (`ssr: true`) · Pinia · @nuxtjs/i18n v10 · @nuxt/content v3 · three.js · GSAP 3 + ScrollTrigger · Lenis · Vitest · @nuxtjs/sitemap · @nuxt/fonts (Fraunces, JetBrains Mono) · SQLite (better-sqlite3, used by @nuxt/content).

## Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Production build (SSR) |
| `npm run generate` | Static prerender to `.output/public` |
| `npm run preview` | Preview the build locally |
| `npm test` | Vitest unit tests in `test/unit` |
| `npx tsx scripts/export-site-text.mjs` | Export site text to `scripts/.cache/site-text.json` |
| `scripts/.venv/Scripts/python -I scripts/build-embedding-space.py` | Regenerate `app/data/embedding-space.json` (Windows venv path) |

## Layout

| Path | Contents |
|---|---|
| `app/assets/styles/` | `tokens.css` design tokens, reset, layout, components, utilities, markdown |
| `app/components/` | Registered with `pathPrefix: false` (`components/home/HomeHero.vue` is `<HomeHero>`) |
| `app/components/ui/` | `UiButton`, `UiIcon`, `UiDialog`, `UiTag` |
| `app/components/space/` | `EmbeddingSpace`, `EmbeddingCanvas.client`, `EmbeddingFallback`, `QueryConsole` |
| `app/components/home/` | `HomeHero`, `HomeBuild`, `HomeWork`, `HomeExperience`, `HomeWriting`, `HomeContact`, `SectionHeading` |
| `app/components/content/` | Markdown components used by `ContentRenderer` |
| `app/composables/` | `useBlog`, `usePageSeo`, `useReveal`, `useMotionPreference`, `useEmbeddingSpace`, `useScrollStory` and others |
| `app/data/` | `contact.ts`, `projects.ts`, `experience.ts`, generated `embedding-space.json` |
| `app/layouts/` | `default.vue`, `blog.vue` |
| `app/locales/` | `en.json`, `es.json` |
| `app/pages/` | File-based routes: `index`, `work/`, `blog/`, `resources` |
| `app/plugins/` | `gsap.client.ts`, `lenis.client.ts`, `theme.client.ts`, `analytics.ts`, `markdownEnhancements.ts` |
| `app/stores/` | `app.ts` (theme and language cookies) |
| `app/types/` | `embedding-space.ts` |
| `app/utils/` | `embedding-space.ts`, `motion.ts`, `theme.ts`, `icons.ts` |
| `app/router.options.ts` | Legacy redirects and hash scrolling with nav offset |
| `app/app.vue` | Root: head, hreflang, theme boot script, `useSiteSeoDefaults()` |
| `content/{en,es}/blog/` | Markdown articles (slug must match across EN/ES) |
| `scripts/` | Embedding space generation: `export-site-text.mjs`, `build-embedding-space.py`, `requirements.txt` |
| `test/unit/` | Vitest tests: embedding-space, motion, projects, theme |
| `content.config.ts` | `@nuxt/content` collections and Zod schema |
| `nuxt.config.ts` | Modules, i18n, content, fonts, components, routeRules, prerender routes |
| `vitest.config.ts` | Vitest config with alias `~` to `./app` |

## Agent etiquette

- Use `<script setup lang="ts">`; type props/emits explicitly.
- After changes, verify with `npx nuxi typecheck`, `npx eslint .` and `npm test`.
- Do not create summary Markdown files unless asked.
- Prefer native Nuxt 4 solutions over Vue workarounds; follow existing patterns.
- When you change a composable/component/store/style/locale, update the matching `SKILL.md` in the same commit (see the skills README).
