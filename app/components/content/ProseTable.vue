<template>
  <div class="md-table-wrap">
    <table v-bind="attrs">
      <slot />
    </table>
  </div>
</template>

<script setup lang="ts">
const attrs = useAttrs()
</script>
