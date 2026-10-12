import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default defineNuxtPlugin({
  name: 'lenis',
  dependsOn: ['gsap'],
  setup(nuxtApp) {
    const reduced = globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return { provide: { lenis: null as Lenis | null } }

    const lenis = new Lenis({ lerp: 0.12 })
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    nuxtApp.hook('page:finish', () => {
      lenis.resize()
      ScrollTrigger.refresh()
    })

    return { provide: { lenis: lenis as Lenis | null } }
  },
})
