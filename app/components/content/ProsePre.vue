<template>
  <div class="md-code-block" :data-lang="displayLanguage">
    <div v-if="filename" class="md-code-filename">
      {{ filename }}
    </div>
    <button
      class="md-code-copy"
      type="button"
      :aria-label="copied ? 'Copied!' : 'Copy to clipboard'"
      @click="copyCode"
    >
      <svg
        v-show="!copied"
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="icon-copy"
      >
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
      </svg>
      <svg
        v-show="copied"
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="icon-copied"
      >
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </button>
    <pre :class="$props.class"><slot /></pre>
  </div>
</template>

<script setup lang="ts">
/**
 * ProsePre - Componente para bloques de código con highlighting y botón de copiar
 * Reemplaza el elemento <pre> en markdown
 * Props pasadas automáticamente por Nuxt Content
 */
interface Props {
  code?: string        // El código raw sin highlighting
  language?: string    // Lenguaje del código (js, ts, vue, etc)
  filename?: string    // Nombre del archivo [file.js]
  highlights?: number[] // Líneas a resaltar {1,3-5}
  meta?: string        // Metadata adicional
  class?: string       // Clases CSS de Shiki
}

const props = defineProps<Props>()

const copied = ref(false)
const codeRef = ref<HTMLElement>()
let timer: ReturnType<typeof setTimeout>

const displayLanguage = computed(() => {
  return props.language || 'text'
})

const copyCode = async () => {
  const textToCopy = props.code || codeRef.value?.textContent || ''
  if (!textToCopy) return

  try {
    await navigator.clipboard.writeText(textToCopy)
    copied.value = true
    
    clearTimeout(timer)
    timer = setTimeout(() => {
      copied.value = false
    }, 1200)
  } catch (error) {
    console.error('Failed to copy code:', error)
  }
}

onMounted(() => {
  // Guardar referencia al elemento code para fallback
  nextTick(() => {
    const parent = document.querySelector('.md-code-block')
    if (parent) {
      codeRef.value = parent.querySelector('code') as HTMLElement
    }
  })
})

onBeforeUnmount(() => {
  clearTimeout(timer)
})
</script>
