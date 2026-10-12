import type { Ref } from 'vue'

const parseCount = (text: string) => {
  const match = text.match(/^([^\d]*)([\d,.]+)(.*)$/)
  if (!match) return null
  const raw = match[2]!
  const value = Number(raw.replace(/,/g, ''))
  if (!Number.isFinite(value)) return null
  const decimals = raw.includes('.') ? raw.split('.')[1]!.length : 0
  return { prefix: match[1] ?? '', value, decimals, grouped: raw.includes(','), suffix: match[3] ?? '' }
}

/**
 * Anima al entrar en pantalla los elementos marcados con data-reveal="line", "rule" o "count" dentro de root.
 */
export function useReveal(root: Ref<HTMLElement | null>) {
  const { allowMotion } = useMotionPreference()
  const nuxtApp = useNuxtApp()
  let ctx: { revert: () => void } | null = null

  const setup = () => {
    const el = root.value
    if (!el || !allowMotion.value || ctx) return
    const gsap = nuxtApp.$gsap
    const ScrollTrigger = nuxtApp.$ScrollTrigger
    if (!gsap || !ScrollTrigger) return

    ctx = gsap.context(() => {
      el.querySelectorAll<HTMLElement>('[data-reveal="line"]').forEach((target, i) => {
        gsap.from(target, {
          opacity: 0,
          y: '0.6em',
          duration: 0.8,
          ease: 'power3.out',
          delay: (i % 6) * 0.06,
          scrollTrigger: { trigger: target, start: 'top 88%', once: true },
        })
      })

      el.querySelectorAll<HTMLElement>('[data-reveal="rule"]').forEach((target) => {
        gsap.from(target, {
          scaleX: 0,
          transformOrigin: 'left center',
          duration: 1.1,
          ease: 'power2.inOut',
          scrollTrigger: { trigger: target, start: 'top 90%', once: true },
        })
      })

      el.querySelectorAll<HTMLElement>('[data-reveal="count"]').forEach((target) => {
        const parsed = parseCount(target.textContent?.trim() ?? '')
        if (!parsed) return
        const state = { v: 0 }
        const format = (v: number) =>
          parsed.prefix +
          (parsed.grouped ? Math.round(v).toLocaleString('en-US') : v.toFixed(parsed.decimals)) +
          parsed.suffix
        ScrollTrigger.create({
          trigger: target,
          start: 'top 90%',
          once: true,
          onEnter: () => {
            gsap.to(state, {
              v: parsed.value,
              duration: 1.4,
              ease: 'power2.out',
              onUpdate: () => {
                target.textContent = format(state.v)
              },
            })
          },
        })
      })
    }, el)
  }

  onMounted(() => {
    nextTick(setup)
  })

  watch(allowMotion, (allowed) => {
    if (allowed) nextTick(setup)
  })

  onBeforeUnmount(() => {
    ctx?.revert()
    ctx = null
  })
}
