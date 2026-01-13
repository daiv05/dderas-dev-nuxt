<template>
  <section class="projects-section">
    <div class="projects-header">
      <p ref="label" class="eyebrow">{{ t('projects.eyebrow') }}</p>
      <h2 ref="titleEl" class="section-title">{{ t('projects.title') }}</h2>
      <p ref="descriptionEl" class="section-lead">
        {{ t('projects.lead') }}
      </p>
    </div>

    <div ref="ledgerRef" class="projects-grid">
      <div
        v-for="(project, i) in projects"
        :key="project.id"
        :ref="(el) => capturePanelRef(el, i)"
        class="project-card"
        @click="openProjectDetail(project)"
      >
        <div class="card-image-container">
          <v-img
            :src="media(project)[0] || '/img/placeholder.webp'"
            :alt="project.name"
            class="card-image"
            cover
          ></v-img>
        </div>

        <div class="card-content">
          <div class="card-header">
            <h3 class="card-title">{{ project.name }}</h3>
            <p v-if="project.client" class="card-client">{{ project.client }}</p>
          </div>

          <p class="card-description">{{ project.description }}</p>

          <div class="card-footer">
            <div class="tech-preview">
              <v-chip
                v-for="(tag, idx) in project.tags.slice(0, 3)"
                :key="idx"
                size="x-small"
                variant="outlined"
                class="mr-1"
              >
                {{ tag }}
              </v-chip>
              <span v-if="project.tags.length > 3" class="tech-more">
                +{{ project.tags.length - 3 }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de detalles del proyecto -->
    <v-dialog v-model="detailDialog.open" max-width="1200px" scrollable>
      <v-card v-if="detailDialog.project" class="detail-modal">
        <v-card-title class="detail-header">
          <div class="detail-header-content">
            <div>
              <h2 class="detail-title">{{ detailDialog.project.name }}</h2>
              <p v-if="detailDialog.project.client" class="detail-client">
                {{ detailDialog.project.client }}
              </p>
            </div>
            <v-btn :icon="mdiClose" variant="text" @click="closeProjectDetail"></v-btn>
          </div>
        </v-card-title>

        <v-card-text class="detail-content">
          <v-row>
            <v-col cols="12" md="8">
              <div class="section-block">
                <h4 class="block-title">{{ t('projects.labels.summary') }}</h4>
                <p class="block-text">
                  {{ detailDialog.project.longDescription || detailDialog.project.description }}
                </p>
              </div>

              <div class="section-block mt-6">
                <h4 class="block-title">{{ t('projects.labels.deliverables') }}</h4>
                <ul class="feature-list">
                  <li v-for="feature in detailDialog.project.features" :key="feature">
                    {{ feature }}
                  </li>
                </ul>
              </div>

              <div v-if="media(detailDialog.project).length" class="media-section mt-8">
                <div class="d-flex justify-space-between align-center mb-4">
                  <h4 class="block-title mb-0">{{ t('projects.labels.captures') }}</h4>
                </div>
                <v-slide-group show-arrows class="gallery-strip">
                  <v-slide-group-item
                    v-for="(image, idx) in media(detailDialog.project)"
                    :key="idx"
                  >
                    <v-img
                      :src="image"
                      :alt="detailDialog.project.name"
                      class="gallery-thumb"
                      cover
                      @click="openGallery(detailDialog.project, idx)"
                    ></v-img>
                  </v-slide-group-item>
                </v-slide-group>
              </div>
            </v-col>

            <v-col cols="12" md="4">
              <div class="meta-sidebar">
                <div class="meta-item">
                  <span class="meta-label">{{ t('projects.labels.technologies') }}</span>
                  <div class="tech-tags">
                    <v-chip
                      v-for="tag in detailDialog.project.tags"
                      :key="tag"
                      size="small"
                      variant="outlined"
                      class="mr-1 mb-1"
                    >
                      {{ tag }}
                    </v-chip>
                  </div>
                </div>

                <div class="meta-item mt-6">
                  <span class="meta-label">{{ t('projects.labels.year') || 'Año' }}</span>
                  <p class="mono">{{ detailDialog.project.date }}</p>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions class="detail-actions">
          <v-btn
            v-if="
              detailDialog.project.online &&
              detailDialog.project.link &&
              detailDialog.project.link !== '#'
            "
            variant="tonal"
            color="primary"
            :href="detailDialog.project.link"
            target="_blank"
            :prepend-icon="mdiOpenInNew"
            class="text-none"
          >
            {{ t('projects.labels.viewOnline') }}
          </v-btn>
          <v-btn
            v-if="
              detailDialog.project.repo &&
              detailDialog.project.link_repo &&
              detailDialog.project.link_repo !== '#'
            "
            variant="tonal"
            :href="detailDialog.project.link_repo"
            target="_blank"
            :prepend-icon="mdiGithub"
            class="text-none"
          >
            {{ t('projects.labels.viewRepo') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="gallery.open" fullscreen transition="dialog-bottom-transition">
      <div class="lightbox">
        <div class="lightbox-bar">
          <div>
            <p class="eyebrow">{{ gallery.project?.category }}</p>
            <h3>{{ gallery.project?.name }}</h3>
          </div>
          <v-btn :icon="mdiClose" variant="text" @click="closeGallery"></v-btn>
        </div>

        <div class="lightbox-carousel">
          <div class="lightbox-track">
            <div
              v-for="(image, idx) in gallery.images"
              :key="idx"
              class="lightbox-frame"
              :class="{ 'lightbox-frame--active': gallery.index === idx }"
            >
              <v-img
                :src="image"
                :alt="gallery.project?.name"
                class="lightbox-image"
                contain
              ></v-img>
            </div>
          </div>
        </div>

        <div class="lightbox-controls">
          <v-btn :icon="mdiChevronLeft" variant="tonal" @click="stepGallery(-1)"></v-btn>
          <span class="mono">{{ gallery.index + 1 }} / {{ gallery.images.length }}</span>
          <v-btn :icon="mdiChevronRight" variant="tonal" @click="stepGallery(1)"></v-btn>
        </div>
      </div>
    </v-dialog>
  </section>
</template>

<script setup>
import { mdiChevronLeft, mdiChevronRight, mdiClose, mdiOpenInNew, mdiGithub } from '@mdi/js';
import { ref, computed, onMounted, onUnmounted, onBeforeUpdate, nextTick } from 'vue';
import { useI18n } from 'vue-i18n';

import { useEnterAnimations } from '@/composables/useEnterAnimations.js';
import { projectList } from '@/data/projects.js';

const { t, locale } = useI18n();
const projects = computed(() =>
  projectList.map((project) => {
    const translation = project.translations?.[locale.value] ?? project.translations?.en ?? {};
    return {
      ...project,
      ...translation,
    };
  })
);
const {
  label,
  titleEl,
  descriptionEl,
  setPanelRef,
  resetPanelRefs,
  setupEnterAnimations,
  cleanupEnterAnimations,
} = useEnterAnimations();
const ledgerRef = ref(null);
const gallery = ref({ open: false, images: [], project: null, index: 0 });
const detailDialog = ref({ open: false, project: null });
const projectPanels = ref([]);

const capturePanelRef = (el, index) => {
  setPanelRef(el);
  if (el) {
    projectPanels.value[index] = el;
  }
};

const openProjectDetail = (project) => {
  detailDialog.value = {
    open: true,
    project,
  };
};

const closeProjectDetail = () => {
  detailDialog.value.open = false;
  detailDialog.value.project = null;
};

onBeforeUpdate(() => {
  resetPanelRefs();
  projectPanels.value = [];
});

const media = (project) => {
  if (!project.images) return [];
  return Object.values(project.images);
};

const openGallery = (project, idx = 0) => {
  gallery.value = {
    open: true,
    images: media(project),
    project,
    index: idx,
  };
};

const closeGallery = () => {
  gallery.value.open = false;
  gallery.value.index = 0;
};

const stepGallery = (direction) => {
  if (!gallery.value.images.length) return;
  const total = gallery.value.images.length;
  gallery.value.index = (gallery.value.index + direction + total) % total;
};

onMounted(async () => {
  await nextTick();
  setupEnterAnimations({
    headerStart: 'top 85%',
    panelsStart: 'top 85%',
    headerTrigger: titleEl.value,
    panelsTrigger: ledgerRef.value?.$el ?? ledgerRef.value,
  });
});
onUnmounted(() => {
  cleanupEnterAnimations();
});
</script>

<style scoped lang="scss">
.projects-section {
  padding: var(--section-gap) var(--shell-padding);
}

.projects-header {
  max-width: 820px;
  margin: 0 auto 3rem;
  text-align: center;
}

.projects-grid {
  column-count: 3;
  column-gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.project-card {
  background: rgba(var(--v-theme-surface), 0.4);
  border: 1px solid var(--line-soft);
  border-radius: var(--radius-lg);
  overflow: hidden;
  cursor: pointer;
  display: inline-block;
  width: 100%;
  margin-bottom: 2rem;
  break-inside: avoid;
}

.card-image-container {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.card-image {
  width: 100%;
}

.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), transparent);
}

.date-badge {
  background: rgba(var(--v-theme-surface), 0.9);
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  color: var(--text-subtle);
  backdrop-filter: blur(8px);
}

.card-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
}

.card-header {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.category-tag {
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgb(var(--v-theme-primary));
  margin-bottom: 0.25rem;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.3;
  color: rgb(var(--v-theme-on-surface));
}

.card-client {
  font-size: 0.85rem;
  color: var(--text-subtle);
  font-style: italic;
}

.card-description {
  font-size: 0.9rem;
  line-height: 1.6;
  color: rgba(var(--v-theme-on-surface), 0.8);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.5rem;
  border-top: 1px solid var(--line-soft);
}

.tech-preview {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  flex-wrap: wrap;
}

.tech-more {
  font-size: 0.75rem;
  color: var(--text-subtle);
  font-weight: 500;
}

/* Modal de detalles */
.detail-modal {
  background: rgba(var(--v-theme-surface)) !important;
}

.detail-header {
  border-bottom: 1px solid var(--line-soft);
  padding: 1.5rem 2rem;
}

.detail-header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
}

.detail-title {
  font-size: 1.75rem;
  font-weight: 600;
  margin-top: 0.5rem;
  margin-bottom: 0.25rem;
}

.detail-client {
  font-size: 0.95rem;
  color: var(--text-subtle);
  font-style: italic;
}

.detail-content {
  padding: 2rem !important;
}

.detail-actions {
  border-top: 1px solid var(--line-soft);
  padding: 1.5rem 2rem;
  gap: 0.75rem;
}

.block-title {
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-subtle);
  margin-bottom: 1rem;
}

.block-text {
  line-height: 1.7;
  color: rgba(var(--v-theme-on-surface), 0.9);
  white-space: pre-line;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  li {
    position: relative;
    padding-left: 1.5rem;
    line-height: 1.5;
    color: rgba(var(--v-theme-on-surface), 0.85);

    &::before {
      content: '-';
      position: absolute;
      left: 0;
      color: rgb(var(--v-theme-primary));
    }
  }
}

.meta-sidebar {
  border-left: 1px solid var(--line-soft);
  padding-left: 2rem;
  height: 100%;
}

.meta-item {
  margin-bottom: 1.5rem;
}

.meta-label {
  display: block;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-subtle);
  margin-bottom: 0.75rem;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.gallery-strip :deep(.v-slide-group__content) {
  gap: 1rem;
}

.gallery-thumb {
  width: 240px;
  height: 150px;
  border-radius: var(--radius-md);
  border: 1px solid var(--line-soft);
  cursor: pointer;
}

.lightbox {
  width: 100%;
  height: 100%;
  padding: clamp(1.5rem, 4vw, 3rem);
  background: rgba(var(--v-theme-surface), 0.98);
  color: rgb(var(--v-theme-on-surface));
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.lightbox-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.lightbox-carousel {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
}

.lightbox-track {
  display: flex;
  gap: 2rem;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.lightbox-frame {
  flex-shrink: 0;
  width: min(960px, 80vw);
  height: min(620px, 75vh);
  background: rgb(var(--v-theme-surface));
  display: none;
  align-items: center;
  justify-content: center;
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.lightbox-frame--active {
  display: flex;
  opacity: 1;
  transform: scale(1);
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.lightbox-image {
  width: 100%;
  height: 100%;
}

.lightbox-image :deep(img) {
  object-fit: contain;
  max-width: 100%;
  max-height: 100%;
}

.lightbox-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  font-size: 0.85rem;
  color: rgba(var(--v-theme-on-surface), 0.85);
}

@media (max-width: 960px) {
  .projects-grid {
    column-count: 2;
    column-gap: 1.5rem;
  }

  .meta-sidebar {
    border-left: none;
    padding-left: 0;
    margin-top: 2rem;
    border-top: 1px solid var(--line-soft);
    padding-top: 2rem;
  }

  .detail-header,
  .detail-content,
  .detail-actions {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  .gallery-thumb {
    width: 200px;
    height: 120px;
  }

  .lightbox-frame {
    width: 100%;
    height: 60vh;
  }
}

@media (max-width: 600px) {
  .projects-grid {
    column-count: 1;
  }

  .project-card {
    margin-bottom: 1.5rem;
  }
}
</style>
