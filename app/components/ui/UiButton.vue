<template>
  <NuxtLink v-if="to" :to="to" :class="classes" :aria-label="ariaLabel">
    <slot />
  </NuxtLink>
  <a
    v-else-if="href"
    :href="href"
    :class="classes"
    :aria-label="ariaLabel"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener' : undefined"
  >
    <slot />
  </a>
  <button v-else :type="type" :class="classes" :aria-label="ariaLabel" :disabled="disabled">
    <slot />
  </button>
</template>

<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

const props = withDefaults(
  defineProps<{
    variant?: 'solid' | 'outline' | 'ghost'
    size?: 'sm' | 'md'
    to?: RouteLocationRaw
    href?: string
    type?: 'button' | 'submit'
    iconOnly?: boolean
    ariaLabel?: string
    disabled?: boolean
  }>(),
  { variant: 'outline', size: 'md', type: 'button' },
)

const external = computed(() => !!props.href && /^https?:\/\//.test(props.href))

const classes = computed(() => [
  'ui-btn',
  `ui-btn--${props.variant}`,
  `ui-btn--${props.size}`,
  { 'ui-btn--icon': props.iconOnly },
])
</script>

<style scoped>
.ui-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  letter-spacing: 0.01em;
  line-height: 1;
  border-radius: var(--radius-sm);
  border: 1px solid transparent;
  background: transparent;
  color: var(--ink);
  cursor: pointer;
  text-decoration: none;
  transition:
    background-color var(--transition-fast),
    color var(--transition-fast),
    border-color var(--transition-fast),
    transform var(--transition-fast);
}

.ui-btn--md {
  padding: 0.75rem 1.1rem;
}

.ui-btn--sm {
  padding: 0.5rem 0.75rem;
  font-size: 0.75rem;
}

.ui-btn--icon.ui-btn--md {
  padding: 0.6rem;
}

.ui-btn--icon.ui-btn--sm {
  padding: 0.4rem;
}

.ui-btn--solid {
  background: var(--accent);
  border-color: var(--accent);
  color: var(--on-accent);
}

.ui-btn--solid:hover {
  background: color-mix(in srgb, var(--accent) 86%, var(--ink));
}

.ui-btn--outline {
  border-color: var(--ink-35);
}

.ui-btn--outline:hover {
  border-color: var(--ink);
  background: var(--ink-5);
}

.ui-btn--ghost:hover {
  background: var(--ink-5);
}

.ui-btn:active {
  transform: translateY(1px);
}

.ui-btn:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.ui-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>
