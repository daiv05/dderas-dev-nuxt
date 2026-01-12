<template>
  <section class="ues-section">
    <div class="ues-header">
      <p ref="label" class="eyebrow">{{ t('ues.eyebrow') }}</p>
      <h2 ref="titleEl" class="section-title">{{ t('ues.title') }}</h2>
      <p ref="descriptionEl" class="section-lead">
        {{ t('ues.lead') }}
      </p>
    </div>

    <div ref="gridRef" class="ues-grid">
      <v-sheet
        v-for="category in categories"
        :key="category.title"
        :ref="setPanelRef"
        class="ues-panel"
        elevation="0"
        rounded="xl"
      >
        <div class="panel-head">
          <span class="mono">{{ category.mode }}</span>
          <strong>{{ category.title }}</strong>
        </div>
        <p>{{ category.description }}</p>
        <ul class="resource-list">
          <li v-for="item in category.featured" :key="item.name">
            <a :href="item.link" target="_blank">{{ item.name }}</a>
          </li>
        </ul>
        <v-btn class="text-none" variant="outlined" rounded="pill" :href="category.driveLink" target="_blank">
          {{ t('ues.buttons.openFolder') }}
        </v-btn>
      </v-sheet>
    </div>

    <v-sheet class="ues-disclaimer" elevation="0">
      <div>
        <h3>{{ t('ues.noteBlock.title') }}</h3>
        <p>
          {{ t('ues.noteBlock.body') }}
        </p>
      </div>
      <v-btn class="text-none" variant="text" rounded="pill" :href="`mailto:${contactInfo.email}`">
        {{ t('ues.buttons.share') }}
      </v-btn>
    </v-sheet>
  </section>
</template>

<script setup lang="ts">
import { useEnterAnimations } from '~/composables/useEnterAnimations';
import { contactInfo } from '~/data/contact';

interface ResourceItem {
  name: string;
  link: string;
}

interface Category {
  title: string;
  mode: string;
  description: string;
  featured: ResourceItem[];
  driveLink: string;
}

const {
  label,
  titleEl,
  descriptionEl,
  setPanelRef,
  resetPanelRefs,
  setupEnterAnimations,
  cleanupEnterAnimations,
} = useEnterAnimations();

const gridRef = ref<HTMLElement | null>(null);
const { t, tm, rt } = useI18n();

const categories = computed<Category[]>(() => {
  const raw = tm('ues.categories');
  if (!Array.isArray(raw)) return [];
  
  return raw.map((cat) => ({
    title: rt(cat.title),
    mode: rt(cat.mode),
    description: rt(cat.description),
    featured: (cat.featured).map((item) => ({
      name: rt(item.name),
      link: rt(item.link)
    })),
    driveLink: rt(cat.driveLink)
  }));
});

onBeforeUpdate(() => {
  resetPanelRefs();
});

onMounted(() => {
  nextTick(() => {
    setupEnterAnimations({
      headerStart: 'top 80%',
      panelsStart: 'top 85%',
      headerTrigger: titleEl.value,
      panelsTrigger: gridRef.value,
    });
  });
});

onBeforeUnmount(() => {
  cleanupEnterAnimations();
});
</script>

<style scoped lang="scss">
.ues-section {
  padding: var(--section-gap) var(--shell-padding);
}

.ues-header {
  max-width: 780px;
  margin: 0 auto 2.5rem;
  text-align: center;
}

.ues-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.ues-panel {
  border: 1px solid var(--line-soft) !important;
  background: rgba(var(--v-theme-surface), 0.7);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.panel-head {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.resource-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.resource-list a {
  text-decoration: underline;
}

.ues-disclaimer {
  border: 1px solid var(--line-strong) !important;
  border-radius: var(--radius-lg);
  padding: 1.5rem 2rem;
  background: rgba(var(--v-theme-surface), 0.7);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
}

@media (max-width: 768px) {
  .ues-disclaimer {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
