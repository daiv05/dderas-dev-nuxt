<template>
  <span class="ui-tag"><slot /></span>
</template>

<style scoped>
.ui-tag {
  display: inline-flex;
  align-items: center;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--muted);
  border: 1px solid var(--rule);
  border-radius: var(--radius-sm);
  padding: 0.25rem 0.5rem;
  white-space: nowrap;
}
</style>
