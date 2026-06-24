# CLAUDE.md

Guidance for AI agents working in this repository.

## Project

Personal portfolio and blog by David Deras. Statically prerendered, bilingual (EN/ES), SSR-enabled.

**Stack:** Nuxt 4 · Vue 3.5 · TypeScript · Vuetify 4 (`ssr: true`) · Pinia · @nuxtjs/i18n v10 · @nuxt/content v3 · GSAP 3 + ScrollTrigger · @nuxtjs/sitemap · @nuxt/fonts · SQLite (better-sqlite3, used by @nuxt/content).

## Commands

```bash
npm run dev        # dev server
npm run build      # production build (SSR)
npm run generate   # static prerender
npm run preview    # preview the build locally
```

## Layout

```
app/
├── assets/styles/   # global CSS (variables, reset, layout, components, utilities, markdown)
├── components/      # global components; components/content/ for Markdown
├── composables/     # useBlog, usePageSeo, useEnterAnimations, ...
├── data/            # static data: contact.ts, projects.ts, sidebar-items.ts
├── layouts/         # default.vue, blog.vue
├── locales/         # en.json, es.json
├── pages/           # file-based routes
├── plugins/         # gsap.ts, vuetify.ts
├── stores/          # app.ts (theme/language)
└── app.vue          # root; calls useSiteSeoDefaults()
content/{en,es}/blog/ # Markdown articles (slug must match across EN/ES)
content.config.ts     # @nuxt/content collections + Zod schema
nuxt.config.ts        # modules, i18n, content, prerender
```

## Agent etiquette

- Use `<script setup lang="ts">`; type props/emits explicitly.
- After changes, verify with `npx nuxi typecheck` and `npx eslint .`.
- Do not create summary Markdown files unless asked.
- Prefer native Nuxt 4 solutions over Vue workarounds; follow existing patterns.
- When you change a composable/component/store/style/locale, update the matching
  `SKILL.md` in the same commit (see the skills README).
