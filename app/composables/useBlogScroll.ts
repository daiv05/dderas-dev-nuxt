/**
 * Composable para manejar el scroll en el layout del blog
 */

export const useBlogScroll = () => {
  /**
   * Obtiene el elemento que realmente tiene el scroll en el blog
   */
  const getScrollElement = (): Window => {
    return globalThis.window
  }

  /**
   * Hace scroll al inicio del contenedor del blog
   */
  const scrollToTop = () => {
    if (!import.meta.client) return
    
    const scroller = getScrollElement()
    
    if (scroller instanceof HTMLElement) {
      // Intentar scroll animado primero
      try {
        scroller.scrollTo({ top: 0, behavior: 'smooth' })
      } catch {
        // Fallback para navegadores que no soporten behavior: smooth
        scroller.scrollTop = 0
      }
    } else {
      try {
        globalThis.scrollTo({ top: 0, behavior: 'smooth' })
      } catch {
        globalThis.scrollTo(0, 0)
      }
    }
  }

  /**
   * Obtiene la posición de scroll actual
   */
  const getScrollTop = (): number => {
    if (!import.meta.client) return 0
    
    const scroller = getScrollElement()
    
    if (scroller instanceof HTMLElement) {
      return scroller.scrollTop
    }
    
    return globalThis.scrollY || 0
  }

  return {
    scrollToTop,
    getScrollTop,
    getScrollElement
  }
}
