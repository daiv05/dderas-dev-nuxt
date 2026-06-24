<template>
  <section ref="sectionRef" class="overview-section">
    <div class="now-header">
      <span class="now-label mono">{{ t('hero.agendaTitle') }}</span>
    </div>

    <div ref="gridRef" class="now-grid">
      <div v-for="item in agenda" :key="item.title" class="now-panel">
        <span class="now-bar" aria-hidden="true"></span>
        <div class="now-content">
          <h3 class="now-title">{{ item.title }}</h3>
          <p class="now-status">{{ item.status }}</p>
        </div>
      </div>
    </div>

    <v-sheet ref="ctaSection" class="collab-panel glass" elevation="0">
      <div>
        <h3>{{ collaboration.title }}</h3>
        <p>
          {{ collaboration.body }}
        </p>
      </div>
      <v-btn
        class="text-none"
        color="primary"
        variant="flat"
        rounded="pill"
        size="large"
        :href="`mailto:${contactInfo.email}`"
      >
        {{ collaboration.cta }}
      </v-btn>
    </v-sheet>
  </section>
</template>

<script setup lang="ts">
import { contactInfo } from '~/data/contact';
import {
  getMainScroller,
  gsapDefaults,
  animateInOnEnter,
} from '~/plugins/gsap';
import { useGsapAnimations } from '~/composables/useEnterAnimations';

const { t, tm, rt } = useI18n();
const { setupAnimations } = useGsapAnimations();

// Refs del template
const gridRef = ref<HTMLElement | null>(null);
const ctaSection = ref<HTMLElement | null>(null);

// "En qué estoy ahora": trabajo en curso
const agenda = computed(() => {
  const raw = tm('hero.agenda');
  if (Array.isArray(raw)) {
    return raw.map((item) => ({
      title: rt(item.title),
      status: rt(item.status),
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

const initAnimations = () => {
  setupAnimations(() => {
    const scroller = getMainScroller();

    // Obtener panels directamente del DOM
    const panels = gridRef.value?.querySelectorAll('.now-panel') ?? [];
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

.overview-section {
  max-width: var(--page-max-width);
  margin: 0 auto;
}

.now-header {
  margin-bottom: 1.25rem;
}

.now-label {
  font-size: 0.78rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-subtle);
}

.now-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1rem;
  margin-bottom: 2.5rem;
}

.now-panel {
  display: flex;
  gap: 1rem;
  border: 1px solid var(--line-soft);
  border-radius: var(--radius-md);
  background: rgba(var(--v-theme-surface), 0.5);
  padding: 1.25rem 1.4rem;
  transition:
    border-color var(--transition-base),
    transform var(--transition-base);
}

.now-panel:hover {
  transform: translateY(-3px);
  border-color: rgba(var(--brand-from), 0.45);
}

.now-bar {
  flex-shrink: 0;
  width: 3px;
  border-radius: 999px;
  background: var(--brand-gradient);
}

.now-content {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.now-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
}

.now-status {
  font-size: 0.9rem;
  line-height: 1.45;
  color: var(--text-subtle);
  margin: 0;
}

.collab-panel {
  border: 1px solid var(--line-soft) !important;
  border-radius: var(--radius-lg);
  padding: 1.75rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  box-shadow: var(--shadow-md);
}

.glass {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
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
