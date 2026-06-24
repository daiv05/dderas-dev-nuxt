---
name: ssr-patterns
description: SSR-safe patterns for Nuxt 4 - useAsyncData, useCookie, ClientOnly, hydration, scrollers. Use when facing hydration mismatches or accessing window/document.
---

# SSR and Nuxt Patterns

> Guards, hydration, cookies and SSR-safe patterns for Nuxt 4 with SSR enabled.

## Client/server guards

```ts
import.meta.server   // true during SSR
import.meta.client   // true in the browser
```

Use `<ClientOnly>` in templates instead of `v-if` with `import.meta.client`.

## ClientOnly

```vue
<ClientOnly>
  <!-- Only renders on the client -->
  <ComponentWithWindow />
  <template #fallback>
    <div>Loading...</div>
  </template>
</ClientOnly>
```

Use when accessing `window`, `document`, `localStorage`, or Vuetify's `useDisplay()`.

## useAsyncData - correct pattern

```ts
const { locale } = useI18n()

const { data, pending, error } = await useAsyncData(
  () => `unique-key-${parameter.value}-${locale.value}`,  // key as a function if it depends on reactives
  () => fetchFunction(parameter.value),
  { watch: [parameter, locale] }  // watch: [locale] is mandatory if the fetch depends on the language
)
```

- The key must be unique per route/language/parameter
- `watch: [locale]` triggers automatic refetch on language change

## useCookie - SSR-safe persistence

```ts
const value = useCookie<string>('cookie-name', {
  default: () => 'default-value',
  sameSite: 'lax'
})
// Read: value.value  |  Write: value.value = 'new'
```

Do not use `localStorage` directly; use `useCookie`.

## isHydrated - avoid mismatch

```ts
const isHydrated = ref(false)

onMounted(() => {
  nextTick(() => {
    isHydrated.value = true
    // now it is safe to access the DOM/window
  })
})

// In a computed that may differ between SSR and client:
const computedValue = computed(() => {
  if (!isHydrated.value) return ssrValue
  return clientValue
})
```

## Project scrollers

```ts
import { getMainScroller } from '~/plugins/gsap'

const scroller = getMainScroller()  // HTMLElement | null in SSR
// default layout → .shell-main
// blog layout    → .blog-main
```

- Do not use `window.scrollY` directly; it may differ between scrollers
- `getMainScroller()` returns `null` in SSR - guard it with `import.meta.client`

## Programmatic navigation

```ts
const localePath = useLocalePath()

navigateTo(localePath('/about'))
navigateTo(localePath('/blog/my-slug'), { replace: true })

// New tab
const router = useRouter()
const url = router.resolve(localePath('/blog')).href
globalThis.open(url, '_blank')
```

## Restrictions

- Do not access `window` or `document` outside of `onMounted` or `import.meta.client` guards
- Do not use `$router.push()` without `localePath()`
- Do not use `localStorage` for persistence; use `useCookie()`
- Vuetify's `useDisplay()` only works inside `<ClientOnly>` or `onMounted`
- Do not call `getMainScroller()` in SSR (returns null, won't throw but is useless)
