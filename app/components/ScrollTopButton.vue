<template>
  <Transition name="scroll-top">
    <UiButton
      v-show="visible"
      class="scroll-top"
      variant="outline"
      size="sm"
      icon-only
      :aria-label="t('navigation.scrollTop')"
      :title="t('navigation.scrollTop')"
      @click="toTop"
    >
      <UiIcon name="arrow-up" :size="18" />
    </UiButton>
  </Transition>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{ threshold?: number }>(), { threshold: 500 })

const { t } = useI18n()
const { $lenis } = useNuxtApp()
const visible = ref(false)

const onScroll = () => {
  visible.value = globalThis.scrollY > props.threshold
}

const toTop = () => {
  if ($lenis) $lenis.scrollTo(0)
  else globalThis.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  onScroll()
  globalThis.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  globalThis.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
.scroll-top {
  position: fixed;
  right: 1.25rem;
  bottom: 1.25rem;
  z-index: 30;
  background: var(--paper);
}

.scroll-top-enter-active,
.scroll-top-leave-active {
  transition: opacity var(--transition-base), transform var(--transition-base);
}

.scroll-top-enter-from,
.scroll-top-leave-to {
  opacity: 0;
  transform: translateY(6px);
}
</style>
