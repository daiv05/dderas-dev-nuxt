---
name: gsap-animations
description: GSAP, ScrollTrigger and Lenis plugins, $gsap/$ScrollTrigger/$lenis injections and data-reveal animations. Use when adding enter or scroll animations, using ScrollTrigger, or touching smooth scrolling.
---

# GSAP, ScrollTrigger and Lenis

> Animation plugins are client-only and provide helpers through the Nuxt app.

## Key files

- `app/plugins/gsap.client.ts` - registers ScrollTrigger, provides `$gsap` and `$ScrollTrigger`
- `app/plugins/lenis.client.ts` - Lenis smooth scrolling on `window`, provides `$lenis`
- `app/composables/useReveal.ts` - `data-reveal` animations (see the `composables` skill)
- `app/composables/useScrollStory.ts` - scroll-driven cluster selection (see the `embedding-space` skill)
- `app/composables/useMotionPreference.ts` - motion gating
- `app/router.options.ts` - hash scrolling with a 72px nav offset

## Plugins

```ts
export default defineNuxtPlugin({
  name: 'gsap',
  setup(nuxtApp) {
    gsap.registerPlugin(ScrollTrigger)

    nuxtApp.hook('page:finish', () => {
      requestAnimationFrame(() => ScrollTrigger.refresh())
    })

    return {
      provide: {
        gsap,
        ScrollTrigger,
      },
    }
  },
})
```

The `lenis` plugin depends on `gsap`. It creates `new Lenis({ lerp: 0.12 })`, forwards `scroll` events to `ScrollTrigger.update`, drives `lenis.raf` from `gsap.ticker`, and on `page:finish` calls `lenis.resize()` and `ScrollTrigger.refresh()`. With `prefers-reduced-motion: reduce` it provides `$lenis` as `null`.

## Usage in components

```ts
const nuxtApp = useNuxtApp()
const { allowMotion } = useMotionPreference()
const root = ref<HTMLElement | null>(null)
let ctx: { revert: () => void } | null = null

onMounted(() => {
  const gsap = nuxtApp.$gsap
  const ScrollTrigger = nuxtApp.$ScrollTrigger
  if (!allowMotion.value || !gsap || !ScrollTrigger || !root.value) return
  ctx = gsap.context(() => {
    gsap.from('.item', {
      opacity: 0,
      y: '0.6em',
      scrollTrigger: { trigger: root.value, start: 'top 88%', once: true },
    })
  }, root.value)
})

onBeforeUnmount(() => ctx?.revert())
```

For standard fade-ins, lines and counters use `useReveal(root)` with `data-reveal` attributes. `line` and `rule` targets that already sit inside the first viewport are left static (`shouldReveal(documentTop, innerHeight)` in `app/utils/motion.ts`), so above-the-fold content such as the hero paints immediately and is never hidden waiting for JavaScript.

Programmatic scrolling:

```ts
const { $lenis } = useNuxtApp()
if ($lenis) $lenis.scrollTo(0)
else globalThis.scrollTo({ top: 0, behavior: 'smooth' })
```

## Restrictions

- All scrolling happens on `window`; never set a custom `scroller` on ScrollTrigger
- Do not import `gsap` or `ScrollTrigger` per component; use `useNuxtApp().$gsap` and `$ScrollTrigger`
- Always wrap animations in `gsap.context()` and call `revert()` in `onBeforeUnmount`
- Only start animations when `allowMotion` is true
- `$lenis` can be `null`; always provide a `window.scrollTo` fallback
- Do not run animation code during SSR; the plugins are `.client` only
