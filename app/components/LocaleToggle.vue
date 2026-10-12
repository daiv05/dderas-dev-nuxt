<template>
  <UiButton
    variant="ghost"
    size="sm"
    :to="target"
    :aria-label="t(`navigation.languageToggle.${other}`)"
    :title="t(`navigation.languageToggle.${other}`)"
  >
    {{ other.toUpperCase() }}
  </UiButton>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const other = computed<'en' | 'es'>(() => (locale.value === 'en' ? 'es' : 'en'))
const target = computed(() => switchLocalePath(other.value))
</script>
