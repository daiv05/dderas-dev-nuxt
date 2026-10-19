<template>
  <div class="section-heading">
    <span class="section-heading__index mono" data-reveal="line">{{ index }}</span>
    <h2 class="section-heading__title" data-reveal="line">{{ title }}</h2>
    <span v-if="note" class="section-heading__note mono" data-reveal="line">· {{ note }}</span>
  </div>
  <div class="section-heading__rule" data-reveal="rule" aria-hidden="true"></div>
</template>

<script setup lang="ts">
defineProps<{ index: string; title: string; note?: string }>()
</script>

<style scoped>
.section-heading {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.4rem 1rem;
  margin-bottom: 1rem;
}

.section-heading__index {
  font-size: 0.75rem;
  color: var(--accent);
}

.section-heading__title {
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  font-weight: 600;
  letter-spacing: -0.02em;
}

.section-heading__note {
  font-size: 0.7rem;
  color: var(--muted);
}

.section-heading__rule {
  height: 1px;
  background: var(--rule);
  margin-bottom: 2rem;
}
</style>
