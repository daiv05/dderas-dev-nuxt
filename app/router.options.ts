import type { RouterConfig } from '@nuxt/schema'

const tick = () => new Promise<void>((resolve) => setTimeout(resolve, 0))

const getActiveScroller = (): HTMLElement | null => {
  const el = document.querySelector('.blog-main') || document.querySelector('.shell-main')
  return el instanceof HTMLElement ? el : null
}

const scrollContainerTo = (scroller: HTMLElement, top: number, left = 0, behavior: ScrollBehavior = 'auto') => {
  scroller.scrollTo({ top, left, behavior })
}

const scrollContainerToHash = (scroller: HTMLElement, hash: string) => {
  const selector = decodeURIComponent(hash)
  const target = document.querySelector(selector)
  if (!(target instanceof HTMLElement)) return false

  const scrollerRect = scroller.getBoundingClientRect()
  const targetRect = target.getBoundingClientRect()
  const top = scroller.scrollTop + (targetRect.top - scrollerRect.top) - 16

  scrollContainerTo(scroller, Math.max(0, top), 0, 'smooth')
  return true
}

const routeScrollTop = new Map<string, number>()

export default {
  async scrollBehavior(to, from, savedPosition) {
    if (import.meta.server) {
      return savedPosition || { left: 0, top: 0 }
    }

    await tick()

    const scroller = getActiveScroller()

    if (scroller && from.fullPath) {
      routeScrollTop.set(from.fullPath, scroller.scrollTop)
    }

    // Back/forward: restaurar posición.
    // Nota: NO restaurar por "ruta visitada" en navegación normal,
    // porque eso deja páginas (como Home) ligeramente abajo.
    if (savedPosition) {
      const rememberedTop = routeScrollTop.get(to.fullPath)
      const top = typeof rememberedTop === 'number' ? rememberedTop : savedPosition.top

      if (scroller) {
        scrollContainerTo(scroller, top, 0, 'auto')
        return false
      }

      return savedPosition
    }

    if (to.hash) {
      await tick()

      if (scroller && scrollContainerToHash(scroller, to.hash)) {
        return false
      }

      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }

    if (scroller) {
      scrollContainerTo(scroller, 0, 0, 'auto')
      // En algunos casos hay layout shift post-navegación.
      requestAnimationFrame(() => scrollContainerTo(scroller, 0, 0, 'auto'))
      return false
    }

    return { left: 0, top: 0 }
  },
} satisfies RouterConfig
