<template>
  <footer class="site-footer">
    <div class="site-footer__inner">
      <div class="site-footer__brand">
        <p class="site-footer__name">David Deras</p>
        <p class="site-footer__role mono">{{ t('footer.role') }}</p>
      </div>
      <nav class="site-footer__links mono" :aria-label="t('footer.label')">
        <a :href="`mailto:${contactInfo.email}`">{{ contactInfo.email }}</a>
        <a :href="contactInfo.socials.linkedin" target="_blank" rel="noopener">LinkedIn</a>
        <a :href="contactInfo.socials.github" target="_blank" rel="noopener">GitHub</a>
        <NuxtLink :to="localePath('/resources')">{{ t('navigation.items.resources') }}</NuxtLink>
      </nav>
      <p class="site-footer__meta mono">© {{ year }} · San Salvador, El Salvador</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { contactInfo } from '~/data/contact'

const { t } = useI18n()
const localePath = useLocalePath()
const year = new Date().getFullYear()
</script>

<style scoped>
.site-footer {
  border-top: 1px solid var(--rule);
  margin-top: var(--section-gap);
}

.site-footer__inner {
  max-width: var(--page-max-width);
  margin: 0 auto;
  padding: 2.5rem var(--gutter) 3rem;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1.5rem 2rem;
  align-items: end;
}

.site-footer__name {
  font-size: 1.25rem;
  font-weight: 600;
}

.site-footer__role {
  font-size: 0.75rem;
  color: var(--muted);
  margin-top: 0.25rem;
}

.site-footer__links {
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
  font-size: 0.8rem;
}

.site-footer__links a {
  color: var(--muted);
  transition: color var(--transition-fast);
}

.site-footer__links a:hover {
  color: var(--accent);
}

.site-footer__meta {
  grid-column: 1 / -1;
  font-size: 0.7rem;
  color: var(--muted);
}

@media (max-width: 760px) {
  .site-footer__inner {
    grid-template-columns: 1fr;
  }
}
</style>
