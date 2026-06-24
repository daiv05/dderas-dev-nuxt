---
name: gsap-animations
description: GSAP + ScrollTrigger - animateInOnEnter, getMainScroller, useGsapAnimations. Use when adding enter/scroll animations.
---

# GSAP Animations

> GSAP + ScrollTrigger plugin and animation composables for the project.

## Key files

- `app/plugins/gsap.ts` - plugin, exports and helpers
- `app/composables/useEnterAnimations.ts` - animation composables (see the `composables` skill)

## Imports from the plugin

```ts
import {
  gsap,
  ScrollTrigger,
  getMainScroller,       // () => HTMLElement | null
  animateInOnEnter,      // ScrollTrigger helper
  isElementInViewport,   // (el, scroller?) => boolean
  clearGSAPProps,        // (elements) => void
  gsapDefaults,          // { ease: 'power3.out', duration: 0.8, clearProps: 'opacity,transform' }
  scrollTriggerDefaults, // { start: 'top 80%', once: true }
} from '~/plugins/gsap'
```

## getMainScroller()

```ts
const scroller = getMainScroller()
// default layout → document.querySelector('.shell-main')
// blog layout    → document.querySelector('.blog-main')
// SSR            → null
```

ScrollTrigger.defaults({ scroller }) is configured automatically in `app:mounted` and `page:finish`.

## animateInOnEnter(targets, options)

```ts
type AnimateInOnEnterOptions = {
  from?: gsap.TweenVars    // initial state (applied if the element is not in viewport)
  to?: gsap.TweenVars      // final state (include ease, duration, etc.)
  trigger?: HTMLElement | null
  scroller?: HTMLElement | null
  start?: string           // default: 'top 80%'
  once?: boolean           // default: true
}

animateInOnEnter(element, {
  from: { opacity: 0, y: 30 },
  to: { ...gsapDefaults, opacity: 1, y: 0 },
  scroller: getMainScroller(),
  start: 'top 80%',
  once: true,
})
```

If the element is already visible in the viewport, `from` is ignored and it is cleared directly.

## gsapDefaults

```ts
const gsapDefaults = {
  ease: 'power3.out',
  duration: 0.8,
  clearProps: 'opacity,transform',
}
```

## Pattern 1: useEnterAnimations (header + panels)

See the `composables` skill → `useEnterAnimations()` section.

```vue
<script setup>
const { label, titleEl, descriptionEl, setPanelRef, setupEnterAnimations, cleanupEnterAnimations } = useEnterAnimations()
onMounted(() => nextTick(() => setupEnterAnimations()))
onUnmounted(() => cleanupEnterAnimations())
</script>
```

## Pattern 2: useGsapAnimations (custom animations)

See the `composables` skill → `useGsapAnimations()` section. Automatic cleanup in `onBeforeUnmount`.

```ts
const { setupAnimations } = useGsapAnimations()

onMounted(() => {
  nextTick(() => {
    setupAnimations(() => {
      const scroller = getMainScroller()
      gsap.from('.my-element', {
        ...gsapDefaults,
        opacity: 0, y: 20,
        scrollTrigger: {
          trigger: '.my-element',
          scroller,
          start: 'top 80%',
          once: true,
        }
      })
    })
  })
})
```

## Debug

- URL: `?gsapDebug=1`
- localStorage: `localStorage.setItem('gsap:debug', '1')`
- `[gsap]` logs in the console with setup, fallback and animation events

## Restrictions

- GSAP only runs on the client - do not call outside of `onMounted` or `import.meta.client`
- Always use `useGsapAnimations()` or `useEnterAnimations()` (they create `gsap.context()` for cleanup)
- Call `setupAnimations` inside `nextTick()` within `onMounted` (layout ready)
- After DOM changes: `ScrollTrigger.refresh()`
- Do not call `gsap.set()` with clearProps before hydration (causes SSR mismatch)
