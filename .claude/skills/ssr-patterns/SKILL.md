---
name: ssr-patterns
description: SSR-safe patterns for Nuxt 4 - useAsyncData, useCookie, useState, ClientOnly, .client components, hydration, window scrolling. Use when facing hydration mismatches or accessing window/document/WebGL.
---

# SSR and Nuxt Patterns

> Guards, hydration, cookies and SSR-safe patterns for Nuxt 4 with SSR enabled.

## Key files

- `app/composables/useMotionPreference.ts` - client-only signals exposed through `useState`
- `app/components/space/EmbeddingSpace.vue` - lazy client-only canvas
- `app/components/space/EmbeddingCanvas.client.vue` - `.client` component using WebGL
- `app/plugins/gsap.client.ts`, `app/plugins/lenis.client.ts` - client-only plugins
- `app/components/ThemeToggle.vue` - `ClientOnly` with fallback

## Client/server guards

```ts
import.meta.server
import.meta.client
```

Use `<ClientOnly>` in templates instead of `v-if` with `import.meta.client`.

## ClientOnly

```vue
<ClientOnly>
  <UiIcon :name="appStore.theme === 'dark' ? 'sun' : 'moon'" :size="18" />
  <template #fallback>
    <UiIcon name="moon" :size="18" />
  </template>
</ClientOnly>
```

## Client-only components and plugins

- A `.client.vue` suffix (`EmbeddingCanvas.client.vue`) or `.client.ts` suffix (`gsap.client.ts`, `lenis.client.ts`) keeps the file out of SSR
- Heavy client components are loaded lazily and only after readiness: `<LazyEmbeddingCanvas v-if="showCanvas" />`
- Plugin helpers can be absent on the server; read them through `useNuxtApp().$gsap`, `$ScrollTrigger`, `$lenis` and guard for `undefined` or `null`

## Shared client state with useState

```ts
const allowMotion = useState('motion:allow', () => false)
const allow3d = useState('motion:allow3d', () => false)
const ready = useState('motion:ready', () => false)

onMounted(() => {
  if (ready.value) return
  allowMotion.value = true
  ready.value = true
})
```

Server render uses the default `false` values, and they are only changed in `onMounted`, so the hydrated markup matches. Gate any motion or WebGL output on `ready` and the flags.

## useAsyncData

```ts
const { locale } = useI18n()

const { data, pending, error } = await useAsyncData(
  () => `unique-key-${parameter.value}-${locale.value}`,
  () => fetchFunction(parameter.value),
  { watch: [parameter, locale] }
)
```

- The key must be unique per route, language and parameter
- `watch: [locale]` is mandatory when the fetch depends on the language

## useCookie

```ts
const value = useCookie<string>('cookie-name', {
  default: () => 'default-value',
  sameSite: 'lax'
})
```

## Scrolling

All scrolling happens on `window`, handled by Lenis on the client.

```ts
const onScroll = () => {
  scrolled.value = globalThis.scrollY > 8
}

onMounted(() => {
  globalThis.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  globalThis.removeEventListener('scroll', onScroll)
})
```

## Restrictions

- Do not access `window`, `document` or `navigator` outside `onMounted` or `import.meta.client` guards
- Do not create custom scroll containers; scroll on `window`
- Do not use `$router.push()` without `localePath()`
- Do not use `localStorage` for persistence; use `useCookie()`
- Do not render WebGL, GSAP or Lenis output during SSR
- Do not initialize `useState` motion flags to `true` on the server
