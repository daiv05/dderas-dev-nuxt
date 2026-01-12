<template>
  <ClientOnly>
    <v-btn
      class="theme-toggle"
      icon
      variant="text"
      density="comfortable"
      :title="themeTitle"
      aria-label="Toggle theme"
      @click="toggleTheme"
    >
      <v-icon
        :icon="themeIcon"
        size="22"
      ></v-icon>
    </v-btn>
  </ClientOnly>
</template>

<script setup lang="ts">
import { mdiWeatherSunny, mdiWeatherNight } from '@mdi/js';

const { t } = useI18n();
const appStore = useAppStore();

const themeIcon = computed(() => 
  appStore.theme === 'dark' ? mdiWeatherSunny : mdiWeatherNight
);

const themeTitle = computed(() => 
  t(
    appStore.theme === 'dark'
      ? 'navigation.themeToggle.toLight'
      : 'navigation.themeToggle.toDark'
  )
);

const toggleTheme = () => {
  appStore.theme = appStore.theme === 'dark' ? 'light' : 'dark';
};
</script>

<style scoped>
.theme-toggle {
  color: var(--text-subtle);
}

.theme-toggle:hover {
  color: var(--text-main);
  background: var(--bg-soft);
}
</style>
