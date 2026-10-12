import type { Ref } from 'vue'

import type { ClusterId } from '~/types/embedding-space'

interface StorySection {
  el: Ref<HTMLElement | null>
  cluster: ClusterId | null
}

/**
 * Sincroniza el cúmulo activo del espacio de embeddings con la sección visible durante el scroll.
 */
export function useScrollStory(sections: StorySection[]) {
  const { activeCluster } = useEmbeddingSpace()
  const nuxtApp = useNuxtApp()
  const triggers: { kill: () => void }[] = []

  onMounted(() => {
    const ScrollTrigger = nuxtApp.$ScrollTrigger
    if (!ScrollTrigger) return
    nextTick(() => {
      for (const section of sections) {
        const el = section.el.value
        if (!el) continue
        triggers.push(
          ScrollTrigger.create({
            trigger: el,
            start: 'top 55%',
            end: 'bottom 45%',
            onEnter: () => {
              activeCluster.value = section.cluster
            },
            onEnterBack: () => {
              activeCluster.value = section.cluster
            },
          }),
        )
      }
    })
  })

  onBeforeUnmount(() => {
    triggers.forEach((t) => t.kill())
    activeCluster.value = null
  })
}
