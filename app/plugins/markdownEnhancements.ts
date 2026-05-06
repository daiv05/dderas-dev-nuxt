/**
 * Agrega smooth scroll a los anchor links
 */
const enhanceAnchorLinks = (): void => {
  document.addEventListener('click', (e: MouseEvent) => {
    const target = e.target as HTMLElement
    const anchor = target?.closest?.('a[href^="#"]') as HTMLAnchorElement
    if (!anchor) return

    const href = anchor.getAttribute('href')
    if (!href || href === '#') return

    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      history.pushState(history.state, '', href)
    }
  })
}

export default defineNuxtPlugin(() => {
  if (import.meta.client) {
    if (!globalThis.__mdEnhancementsInstalled) {
      globalThis.__mdEnhancementsInstalled = true
      enhanceAnchorLinks()
    }
  }
})

// Declaración global para TypeScript
declare global {
  var __mdEnhancementsInstalled: boolean | undefined
}
