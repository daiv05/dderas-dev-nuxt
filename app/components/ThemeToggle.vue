<template>
  <UiButton
    variant="ghost"
    size="sm"
    icon-only
    :aria-label="themeTitle"
    :title="themeTitle"
    @click="appStore.toggleTheme()"
  >
    <ClientOnly>
      <UiIcon :name="appStore.theme === 'dark' ? 'sun' : 'moon'" :size="18" />
      <template #fallback>
        <UiIcon name="moon" :size="18" />
      </template>
    </ClientOnly>
  </UiButton>
</template>

<script setup lang="ts">
const { t } = useI18n()
const appStore = useAppStore()

const themeTitle = computed(() =>
  t(appStore.theme === 'dark' ? 'navigation.themeToggle.toLight' : 'navigation.themeToggle.toDark'),
)
</script>
