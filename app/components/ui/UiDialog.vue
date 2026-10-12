<template>
  <dialog
    ref="dialogEl"
    class="ui-dialog"
    :aria-label="label"
    @cancel.prevent="close"
    @click="onBackdrop"
  >
    <slot />
  </dialog>
</template>

<script setup lang="ts">
const props = defineProps<{ open: boolean; label: string }>()
const emit = defineEmits<{ 'update:open': [value: boolean] }>()

const dialogEl = ref<HTMLDialogElement | null>(null)

const close = () => emit('update:open', false)

const onBackdrop = (event: MouseEvent) => {
  if (event.target === dialogEl.value) close()
}

watch(
  () => props.open,
  (open) => {
    const el = dialogEl.value
    if (!el) return
    if (open && !el.open) el.showModal()
    if (!open && el.open) el.close()
  },
)

onMounted(() => {
  if (props.open) dialogEl.value?.showModal()
})
</script>

<style scoped>
.ui-dialog {
  border: 0;
  padding: 0;
  max-width: 100vw;
  max-height: 100vh;
  width: 100vw;
  height: 100vh;
  background: transparent;
  color: var(--ink);
}

.ui-dialog::backdrop {
  background: color-mix(in srgb, #0d0c09 82%, transparent);
  backdrop-filter: blur(4px);
}
</style>
