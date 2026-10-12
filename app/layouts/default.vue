<template>
  <div class="shell">
    <a href="#main" class="skip-link mono">{{ t('navigation.skip') }}</a>
    <SiteNav />
    <main id="main" class="shell__main">
      <slot />
    </main>
    <SiteFooter />
    <ScrollTopButton />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>

<style scoped>
.shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.shell__main {
  flex: 1;
  position: relative;
}

.skip-link {
  position: absolute;
  left: 1rem;
  top: -3rem;
  z-index: 60;
  background: var(--ink);
  color: var(--paper);
  padding: 0.5rem 0.75rem;
  font-size: 0.75rem;
  border-radius: var(--radius-sm);
}

.skip-link:focus {
  top: 0.75rem;
}
</style>
