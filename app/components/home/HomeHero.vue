<template>
  <section class="hero">
    <div class="hero__copy">
      <p class="hero__eyebrow mono" data-reveal="line">{{ t('home.hero.eyebrow') }}</p>
      <h1 class="hero__title" data-reveal="line">
        {{ t('home.hero.title') }} <em>{{ t('home.hero.titleAccent') }}</em>
      </h1>
      <p class="hero__lead" data-reveal="line">{{ t('home.hero.lead') }}</p>
      <div class="hero__ctas" data-reveal="line">
        <UiButton variant="solid" :href="`mailto:${contactInfo.email}`">{{ t('home.hero.cta') }}</UiButton>
        <UiButton variant="outline" :href="contactInfo.socials.linkedin">
          <UiIcon name="linkedin" :size="16" />
          {{ t('home.hero.linkedin') }}
        </UiButton>
        <UiButton variant="outline" :href="contactInfo.socials.github">
          <UiIcon name="github" :size="16" />
          {{ t('home.hero.github') }}
        </UiButton>
      </div>
      <div class="hero__query" data-reveal="line">
        <QueryConsole autoplay />
        <p class="hero__query-note mono">{{ t('home.hero.queryNote') }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { contactInfo } from '~/data/contact'

const { t } = useI18n()
</script>

<style scoped>
.hero {
  min-height: calc(100vh - var(--nav-height));
  display: flex;
  align-items: center;
  padding: 3rem 0 4rem;
}

.hero__copy {
  position: relative;
  z-index: 1;
  width: 100%;
  min-width: 0;
  max-width: 36rem;
}

.hero__eyebrow {
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--muted);
}

.hero__title {
  font-size: clamp(2.2rem, 6vw, 4.4rem);
  overflow-wrap: break-word;
  line-height: 1;
  letter-spacing: -0.03em;
  margin: 1rem 0 1.25rem;
  font-weight: 700;
}

.hero__title em {
  font-weight: 400;
  color: var(--terra);
}

.hero__lead {
  font-size: 1.1rem;
  line-height: 1.55;
  color: var(--muted);
  max-width: 32rem;
}

.hero__ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin: 1.75rem 0 2.5rem;
}

.hero__query-note {
  font-size: 0.65rem;
  color: var(--muted);
  margin-top: 0.6rem;
}
</style>
