# David Deras - Portfolio & Blog

> Personal portfolio and engineering blog built with Nuxt 4, a custom "Field Notes" design system and an interactive 3D embedding space

[![Nuxt](https://img.shields.io/badge/Nuxt-4-00DC82?style=for-the-badge&logo=nuxt.js)](https://nuxt.com/)
[![Vue.js](https://img.shields.io/badge/Vue.js-3.5-4FC08D?style=for-the-badge&logo=vue.js)](https://vuejs.org/)
[![three.js](https://img.shields.io/badge/three.js-0.186-000000?style=for-the-badge&logo=three.js)](https://threejs.org/)
[![GSAP](https://img.shields.io/badge/GSAP-3-88CE02?style=for-the-badge&logo=greensock)](https://greensock.com/gsap/)

## Features

- **Embedding space**: the home page renders the site's own projects, experience and writing as a 3D point cloud, with a live similarity query and a camera that travels between clusters on scroll
- **Dark/Light theme**: warm paper and ink palette driven by CSS tokens
- **Bilingual**: English and Spanish with prefixed routes
- **Motion with fallbacks**: GSAP, ScrollTrigger and Lenis, with a static SVG for reduced motion, no WebGL, save-data or low-end devices
- **Static prerendering**: every page, including each case study, is prerendered

## Technology Stack

- **Nuxt 4** - Vue 3.5, TypeScript, SSR and static generation
- **three.js** - 3D embedding space
- **GSAP 3 + ScrollTrigger + Lenis** - reveal animations and smooth scrolling
- **@nuxt/content v3** - Markdown blog with KaTeX and Mermaid
- **@nuxtjs/i18n** - EN/ES localization
- **Pinia** - theme and language state
- **Vitest** - unit tests

## Sections

- **Home**: hero with the live embedding space, the four capability clusters, selected work, experience, writing and contact
- **Work**: archive of projects and a case study page for each one
- **Blog**: engineering articles in English and Spanish
- **Resources**: curated list of tools and libraries

## Development

```bash
npm install
npm run dev
npm test
```

The embedding space data in `app/data/embedding-space.json` is generated offline with `scripts/export-site-text.mjs` and `scripts/build-embedding-space.py`.

## Contact

David Deras - david@deras.dev

Portfolio: [https://deras.dev](https://deras.dev)

---

Made by [David Deras](https://github.com/daiv05)
