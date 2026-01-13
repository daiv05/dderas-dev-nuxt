<template>
  <footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-brand">
        <p class="eyebrow">{{ t('navigation.brand.name') }}</p>
        <p>
          {{ t('footer.description') }}
        </p>
      </div>

      <div class="footer-links">
        <p class="mono">{{ t('footer.quickMap') }}</p>
        <div class="nav-pills">
          <NuxtLink :to="localePath('/')">{{ t('footer.links.home') }}</NuxtLink>
          <NuxtLink :to="localePath('/projects')">
            {{ t('footer.links.projects') }}
          </NuxtLink>
          <NuxtLink :to="localePath('/resources')">{{ t('footer.links.resources') }}</NuxtLink>
        </div>
      </div>

      <div class="footer-contact">
        <p class="mono">{{ t('footer.contact') }}</p>
        <a :href="`mailto:${contactInfo.email}`">{{ contactInfo.email }}</a>
        <div class="social-inline">
          <a :href="contactInfo.socials.github" target="_blank" rel="noopener">GitHub</a>
          <a :href="contactInfo.socials.linkedin" target="_blank" rel="noopener">LinkedIn</a>
          <a :href="contactInfo.socials.twitter" target="_blank" rel="noopener">Twitter</a>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <span class="mono">© deras.dev - {{ currentYear }}</span>
      <span>{{ t('footer.builtWith') }}</span>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { contactInfo } from '~/data/contact';

const { t } = useI18n();
const localePath = useLocalePath();

const currentYear = computed(() => new Date().getFullYear());
</script>

<style scoped lang="scss">
.site-footer {
  border-top: 1px solid var(--line-soft);
  padding: 2.5rem var(--shell-padding);
}

.footer-inner {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.footer-brand p:last-child {
  color: var(--text-subtle);
}

.footer-links,
.footer-contact {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.nav-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.nav-pills a {
  border: 1px solid var(--line-soft);
  border-radius: 999px;
  padding: 0.35rem 0.85rem;
  font-size: 0.85rem;
}

.cv-link {
  font-size: 0.9rem;
  text-decoration: underline;
  width: fit-content;
}

.footer-links a,
.footer-contact a {
  text-decoration: none;
}

.social-inline {
  display: flex;
  gap: 0.75rem;
}

.footer-bottom {
  border-top: 1px solid var(--line-soft);
  padding-right: 60px;
  padding-top: 1rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  color: var(--text-subtle);
}
</style>
