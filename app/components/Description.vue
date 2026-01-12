<template>
  <section ref="sectionRef" class="overview-section">
    <div ref="gridRef" class="overview-grid">
      <v-sheet
        v-for="area in areas"
        :key="area.title"
        class="overview-panel"
        elevation="0"
        rounded="xl"
        tabindex="0"
        @click="goTo(area)"
        @keyup.enter="goTo(area)"
        @keyup.space.prevent="goTo(area)"
      >
        <div class="panel-top">
          <span class="mono"></span>
          <span class="panel-link"><v-icon :icon="mdiArrowTopRight"></v-icon></span>
        </div>
        <h3>{{ area.title }}</h3>
        <p>{{ area.body }}</p>
      </v-sheet>
    </div>

    <v-sheet ref="ctaSection" class="collab-panel" elevation="0">
      <div>
        <h3>{{ collaboration.title }}</h3>
        <p>
          {{ collaboration.body }}
        </p>
      </div>
      <v-btn class="text-none" variant="outlined" rounded="pill" size="large" :href="`mailto:${contactInfo.email}`">
        {{ collaboration.cta }}
      </v-btn>
    </v-sheet>
  </section>
</template>

<script setup lang="ts">
import { mdiArrowTopRight } from '@mdi/js';
import { contactInfo } from '~/data/contact';
import {
  getMainScroller,
  gsapDefaults,
  animateInOnEnter,
} from '~/plugins/gsap';
import { useGsapAnimations } from '~/composables/useEnterAnimations';

interface Area {
  title: string;
  body: string;
  to: string;
  openInNewTab?: boolean;
}

interface Collaboration {
  title: string;
  body: string;
  cta: string;
}

const { t, tm, rt } = useI18n();
const localePath = useLocalePath();
const router = useRouter();
const { setupAnimations } = useGsapAnimations();

// Refs del template
const gridRef = ref<HTMLElement | null>(null);
const ctaSection = ref<HTMLElement | null>(null);

// Computed que obtiene las traducciones
const areas = computed(() => {
  const raw = tm('overview.cards');
  if (Array.isArray(raw)) {
    return raw.map((item) => ({
      title: rt(item.title),
      body: rt(item.body),
      to: rt(item.to),
      openInNewTab: item.openInNewTab
    }));
  }
  return [];
});

const collaboration = computed(() => {
  const raw = tm('overview.collaboration');
  if (raw && typeof raw === 'object') {
    return {
      title: rt(raw.title),
      body: rt(raw.body),
      cta: rt(raw.cta)
    };
  }
  return {};
});

const goTo = (area: Area) => {
  const path = localePath(area.to);
  
  if (area.openInNewTab) {
    if (import.meta.client) {
      const route = router.resolve(path);
      globalThis.open(route.href, '_blank');
    }
  } else {
    navigateTo(path);
  }
};


const initAnimations = () => {
  setupAnimations(() => {
    const scroller = getMainScroller();
    
    // Obtener panels directamente del DOM
    const panels = gridRef.value?.querySelectorAll('.overview-panel') ?? [];
    const ctaEl = ctaSection.value;

    // Animar cada panel individualmente cuando entra en viewport
    if (panels.length) {
      Array.from(panels).forEach((panel) => {
        if (panel instanceof HTMLElement) {
          animateInOnEnter(panel, {
            from: { opacity: 0, y: 30 },
            to: { ...gsapDefaults, opacity: 1, y: 0 },
            trigger: panel,
            scroller,
            start: 'top bottom',
            once: true,
          });
        }
      });
    }

    if (ctaEl) {
      animateInOnEnter(ctaEl, {
        from: { opacity: 0, y: 24 },
        to: { ...gsapDefaults, opacity: 1, y: 0 },
        trigger: ctaEl,
        scroller,
        start: 'top bottom',
        once: true,
      });
    }
  });
};

onMounted(() => {
  nextTick(initAnimations);
});
</script>

<style scoped lang="scss">
.overview-section {
  padding: clamp(2rem, 6vw, 4rem) var(--shell-padding);
  border-bottom: 1px solid var(--line-soft);
}

.overview-header {
  max-width: 720px;
  margin: 0 auto 3rem;
  text-align: center;
}

.overview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.overview-panel {
  border: 1px solid var(--line-soft) !important;
  background: rgba(var(--v-theme-surface), 0.7);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  cursor: pointer;
  transition:
    border-color var(--transition-base),
    transform var(--transition-base);
}

.overview-panel:focus-visible {
  outline: none;
  border-color: var(--line-strong) !important;
}

.overview-panel:hover {
  transform: translateY(-4px);
  border-color: var(--line-strong) !important;
}

.panel-top {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: var(--text-subtle);
}

.panel-link {
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.overview-panel h3 {
  font-size: 1.4rem;
  margin: 0;
}

.overview-panel p {
  color: var(--text-subtle);
}

.panel-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: auto;
}

.panel-tags span {
  border: 1px solid var(--line-soft);
  border-radius: 999px;
  padding: 0.3rem 0.9rem;
  font-size: 0.85rem;
}

.collab-panel {
  border: 1px solid var(--line-strong) !important;
  border-radius: var(--radius-lg);
  padding: 1.5rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  background: rgba(var(--v-theme-surface), 0.7);
}

.collab-panel h3 {
  margin-bottom: 0.5rem;
}

.collab-panel p {
  color: var(--text-subtle);
  max-width: 520px;
}

@media (max-width: 768px) {
  .collab-panel {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
