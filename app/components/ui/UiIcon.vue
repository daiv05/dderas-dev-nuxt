<template>
  <svg
    class="ui-icon"
    viewBox="0 0 24 24"
    :width="size"
    :height="size"
    aria-hidden="true"
    focusable="false"
  >
    <path :d="iconPaths[name]" fill="currentColor" />
  </svg>
</template>

<script setup lang="ts">
import { iconPaths, type IconName } from '~/utils/icons'

withDefaults(defineProps<{ name: IconName; size?: number }>(), { size: 18 })
</script>

<style scoped>
.ui-icon {
  display: inline-block;
  flex-shrink: 0;
  vertical-align: middle;
}
</style>
