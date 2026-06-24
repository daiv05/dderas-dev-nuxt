---
name: i18n
description: Bilingual EN/ES system (useI18n, localePath, locale files). Use when adding UI strings, localized routes, or keys in app/locales/*.json.
---

# Internationalization (i18n)

> Bilingual EN/ES system with @nuxtjs/i18n v10. Strategy prefix_except_default.

## Key files

- `app/locales/en.json` - English translations (base language)
- `app/locales/es.json` - Spanish translations
- `nuxt.config.ts` - configuration (`i18n:` section)

## Route strategy

- English (default, no prefix): `/`, `/about`, `/projects`, `/blog`, `/blog/[slug]`
- Spanish (with `/es` prefix): `/es/`, `/es/about`, `/es/projects`, `/es/blog`, `/es/blog/[slug]`

## Composables (auto-imported)

```ts
const { t, tm, rt, locale, setLocale } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
```

## Key functions

```ts
// Simple string
t('navigation.items.home')           // 'Home'
t('blog.post.author')                // 'Author'

// Array or object (returns AST, not strings)
const raw = tm('hero.techStack')
const items = raw.map(item => ({ name: rt(item.name) }))  // rt() resolves to a string

// Current locale
locale.value                         // 'en' | 'es'

// Change language
setLocale('es')                      // also update appStore.setLanguage('es')

// Localized route
localePath('/about')                 // '/about' or '/es/about'
localePath('/blog/my-article')       // '/blog/my-article' or '/es/blog/my-article'
localePath({ name: 'blog-slug', params: { slug: 'my-slug' } })

// Route to the same content in another language
switchLocalePath('es')               // '/es/about' if on '/about'
```

## Key structure in locales

```
navigation.*     - menu, brand, toggles, social links
errors.*         - error messages and actions
seo.*            - site SEO, defaults, pages
blog.*           - blog section texts (eyebrow, title, post.*, toc.*, pagination.*, nav.*)
footer.*         - footer
hero.*           - landing page hero
overview.*       - overview cards on the landing
about.*          - about page
projects.*       - projects page
resources.*      - resources page
loader.*         - loading messages
```

## useAsyncData with i18n pattern

```ts
const { locale } = useI18n()
const { getPosts } = useBlog()

const { data: posts } = await useAsyncData(
  () => `blog-index-${locale.value}`,
  () => getPosts(),
  { watch: [locale] }
)
```

## Localized navigation

```vue
<!-- Template -->
<NuxtLink :to="localePath('/blog')">Blog</NuxtLink>
<NuxtLink :to="localePath(`/blog/${post.slug}`)">{{ post.title }}</NuxtLink>
```

```ts
// Script
navigateTo(localePath('/about'))
```

## Restrictions

- Never hard-code UI strings; always use `t()`
- `tm()` returns AST (not strings); use `rt()` to resolve each element
- Add keys in **both** files (en.json and es.json) simultaneously
- Do not use `$router.push('/path')` without `localePath()`
- Language change: `setLocale()` + `appStore.setLanguage()` (see the `app-store` skill)
