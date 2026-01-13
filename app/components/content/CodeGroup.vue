<template>
  <div class="md-code-tabs">
    <div v-if="tabs.length > 0" class="md-code-tabs__header">
      <button
        v-for="(tab, index) in tabs"
        :key="index"
        type="button"
        class="md-code-tabs__tab"
        :class="{ 'is-active': activeTab === index }"
        @click="activeTab = index"
      >
        {{ tab.label }}
      </button>
    </div>
    <div class="md-code-tabs__panels">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * CodeGroup - Componente para mostrar múltiples bloques de código con tabs
 * Uso en markdown:
 * 
 * :::code-group
 * ```js [npm]
 * npm install package
 * ```
 * ```js [yarn]
 * yarn add package
 * ```
 * ```js [pnpm]
 * pnpm add package
 * ```
 * :::
 */

interface Tab {
  label: string
  index: number
}

const activeTab = ref(0)
const tabs = ref<Tab[]>([])

onMounted(() => {
  nextTick(() => {
    // Obtener todos los bloques de código del DOM
    const container = document.querySelector('.md-code-tabs__panels')
    if (!container) return
    
    const codeBlocks = container.querySelectorAll('.md-code-block')
    const extractedTabs: Tab[] = []
    
    codeBlocks.forEach((block, index) => {
      const htmlBlock = block as HTMLElement
      
      // Extraer label del filename o del data-lang
      const filenameEl = block.querySelector('.md-code-filename')
      const filename = filenameEl?.textContent?.trim() || ''
      const lang = htmlBlock.dataset.lang || ''
      const label = filename || lang || `Tab ${index + 1}`
      
      extractedTabs.push({ label, index })
      
      // Agregar clase para mostrar/ocultar según tab activo
      htmlBlock.dataset.tabIndex = String(index)
      htmlBlock.classList.add('in-code-group') // Marcar que está en un code group
      if (index === 0) {
        htmlBlock.classList.add('is-active')
      }
    })
    
    tabs.value = extractedTabs
  })
})

watch(activeTab, (newIndex) => {
  // Actualizar qué bloque está visible
  const container = document.querySelector('.md-code-tabs__panels')
  if (!container) return
  
  const codeBlocks = container.querySelectorAll('.md-code-block')
  codeBlocks.forEach((block, index) => {
    if (index === newIndex) {
      block.classList.add('is-active')
    } else {
      block.classList.remove('is-active')
    }
  })
})
</script>
