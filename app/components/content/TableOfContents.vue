<template>
  <nav v-if="tocLinks.length" class="md-toc">
    <ul>
      <li
        v-for="link in tocLinks"
        :key="link.id"
        :class="{ active: activeId === link.id }"
      >
        <a :href="`#${link.id}`" @click.prevent="scrollToHeading(link.id)">
          {{ link.text }}
        </a>
        <ul v-if="link.children && link.children.length">
          <li
            v-for="child in link.children"
            :key="child.id"
            :class="{ active: activeId === child.id }"
          >
            <a :href="`#${child.id}`" @click.prevent="scrollToHeading(child.id)">
              {{ child.text }}
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
/**
 * TableOfContents - Componente para generar índice de contenidos automáticamente
 * Escanea los headings H2 y H3 del documento y crea navegación con scroll spy
 */
interface Link {
  id: string
  text: string
  depth: number
  children?: Link[]
}

interface Props {
  title?: string
}

defineProps<Props>()

const activeId = ref('')
const tocLinks = ref<Link[]>([])

const scrollToHeading = (id: string) => {
  const element = document.getElementById(id)
  if (!element) return

  const scroller = document.querySelector('.blog-main') || globalThis
  const offsetTop = element.offsetTop - 100
  
  if (scroller === globalThis) {
    globalThis.scrollTo({ top: offsetTop, behavior: 'smooth' })
  } else {
    (scroller as HTMLElement).scrollTo({ top: offsetTop, behavior: 'smooth' })
  }
}

const buildTocFromDom = () => {
  const headings = Array.from(document.querySelectorAll('.markdown-body h2[id], .markdown-body h3[id]'))
  
  const links: Link[] = []
  let currentH2: Link | null = null
  
  headings.forEach((heading) => {
    const id = heading.id
    const text = heading.textContent || ''
    const depth = Number.parseInt(heading.tagName.substring(1))
    
    if (depth === 2) {
      currentH2 = { id, text, depth, children: [] }
      links.push(currentH2)
    } else if (depth === 3 && currentH2) {
      currentH2.children = currentH2.children || []
      currentH2.children.push({ id, text, depth })
    }
  })
  
  tocLinks.value = links
}

onMounted(() => {
  if (!import.meta.client) return

  // Esperar a que el contenido se renderice
  nextTick(() => {
    buildTocFromDom()
    
    // Observar qué heading está visible
    const headings = document.querySelectorAll('.markdown-body h2[id], .markdown-body h3[id], .markdown-body h4[id]')
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            activeId.value = entry.target.id
          }
        })
      },
      {
        rootMargin: '-100px 0px -66%',
        threshold: 0
      }
    )

    headings.forEach((heading) => observer.observe(heading))

    onBeforeUnmount(() => {
      observer.disconnect()
    })
  })
})
</script>
