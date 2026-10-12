---
name: i18n
description: Bilingual EN/ES system (useI18n, localePath, locale files, key namespaces). Use when adding UI strings, localized routes, or keys in app/locales/*.json.
---

# Internationalization (i18n)

> Bilingual EN/ES system with @nuxtjs/i18n v10, strategy `prefix_except_default`.

## Key files

- `app/locales/en.json` - English (default)
- `app/locales/es.json` - Spanish
- `nuxt.config.ts` - `i18n` section

## Routes

- English, no prefix: `/`, `/work`, `/work/[slug]`, `/blog`, `/blog/[slug]`, `/resources`
- Spanish, `/es` prefix: `/es`, `/es/work`, `/es/work/[slug]`, `/es/blog`, `/es/blog/[slug]`, `/es/resources`

## Composables

```ts
const { t, tm, rt, locale, setLocale } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
```

```ts
t('navigation.items.work')
t('home.work.all')

const raw = tm(`home.build.clusters.${cluster}.evidence`)
const items = Array.isArray(raw) ? raw.map((v) => rt(v as Parameters<typeof rt>[0])) : []

localePath('/work')
localePath(`/work/${project.id}`)
switchLocalePath('es')
```

## Key namespaces

```
navigation.*   - brand, themeToggle, languageToggle, items (work, experience, writing, resources, blog), links, label, open, close, skip, scrollTop, backToMain
home.*         - hero, build (title, note, clusters.<agents|rag|ml|fullstack>.{title, body, evidence, tag}), work, experience, writing, contact, space.legend, query
work.*         - eyebrow, title, lead, back, client, year, result, links, live, repo, dataset, features, stack
footer.*       - role, label
seo.*          - siteName, twitterHandle, defaults, pages (home, blog, resources, work)
blog.*         - eyebrow, title, lead, search, pagination, post, toc, nav, imageViewer, filter
resources.*    - eyebrow, title, lead, categories, noteBlock, viewMore
errors.*       - generic, notFound, actions, hint, details
loader.*       - message
```

Project and experience text lives in `app/data/*.ts`, not in the locale files.

## useAsyncData

```ts
const { data: posts } = await useAsyncData(() => `home-writing-${locale.value}`, () => getPosts(), {
  watch: [locale],
})
```

## Restrictions

- Never hard-code UI strings; use `t()`
- `tm()` returns AST; resolve each element with `rt()`
- Add every key to both `en.json` and `es.json`
- Do not use `$router.push('/path')` without `localePath()`
- Do not reference removed namespaces (`hero.*`, `overview.*`, `about.*`, `projects.*`, `seo.pages.me`, `seo.pages.projects`)
- Programmatic language change needs `setLocale()` and `appStore.setLanguage()` (see the `app-store` skill)
