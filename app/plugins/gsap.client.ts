import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

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
