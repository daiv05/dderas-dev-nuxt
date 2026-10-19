<template>
  <section id="contact" class="contact">
    <div class="contact__rule" data-reveal="rule" aria-hidden="true"></div>
    <div class="contact__inner">
      <div>
        <h2 class="contact__title" data-reveal="line">
          {{ t('home.contact.title') }} <em>{{ t('home.contact.titleAccent') }}</em>
        </h2>
        <p class="contact__lead" data-reveal="line">{{ t('home.contact.lead') }}</p>
      </div>
      <div class="contact__links" data-reveal="line">
        <UiButton variant="solid" :href="`mailto:${contactInfo.email}`">
          <UiIcon name="mail" :size="16" />
          {{ contactInfo.email }}
        </UiButton>
        <UiButton variant="outline" :href="contactInfo.socials.linkedin">
          <UiIcon name="linkedin" :size="16" />
          LinkedIn
        </UiButton>
        <UiButton variant="outline" :href="contactInfo.socials.github">
          <UiIcon name="github" :size="16" />
          GitHub
        </UiButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { contactInfo } from '~/data/contact'

const { t } = useI18n()
</script>

<style scoped>
.contact {
  padding-top: var(--section-gap);
}

.contact__rule {
  height: 1px;
  background: var(--ink);
  margin-bottom: 2.5rem;
}

.contact__inner {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 2rem;
}

.contact__title {
  font-size: clamp(2.2rem, 5vw, 3.6rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.02;
}

.contact__title em {
  font-weight: 400;
  color: var(--accent);
}

.contact__lead {
  color: var(--muted);
  margin-top: 0.75rem;
  max-width: 30rem;
}

.contact__links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}
</style>
