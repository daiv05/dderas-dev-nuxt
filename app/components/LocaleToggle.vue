<template>
  <v-menu location="top center" origin="bottom center" transition="scale-transition">
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        icon
        variant="text"
        class="language-btn"
        density="comfortable"
        aria-label="Change locale"
      >
        <v-icon :icon="mdiTranslate" size="small"></v-icon>
      </v-btn>
    </template>
    <v-list density="compact" nav>
      <v-list-item
        v-for="option in languageOptions"
        :key="option.value"
        :value="option.value"
        :active="locale === option.value"
        color="primary"
        @click="changeLocale(option.value)"
      >
        <v-list-item-title>{{ option.label }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
import { mdiTranslate } from '@mdi/js';

const { t, locale, setLocale } = useI18n();

interface LanguageOption {
  value: string;
  label: string;
}

const languageOptions = computed<LanguageOption[]>(() => [
  {
    value: 'en',
    label: t('navigation.languageToggle.en'),
  },
  {
    value: 'es',
    label: t('navigation.languageToggle.es'),
  },
]);

const changeLocale = (newLocale: string) => {
  setLocale(newLocale as 'en' | 'es');
};
</script>

<style scoped>
.language-btn {
  color: var(--text-subtle);
  font-weight: 400;
  text-transform: none;
  letter-spacing: normal;
}

.language-btn:hover {
  color: var(--text-main);
  background: var(--bg-soft);
}
</style>
