<template>
  <v-app class="blog-layout">
    <v-app-bar flat scroll-behavior="hide" scroll-threshold="300" elevation="0" class="blog-header">
      <div class="blog-header-content">
        <NuxtLink :to="localePath('/blog')" class="blog-brand">
          <span class="blog-brand-name">{{ t('navigation.brand.name') }}</span>
        </NuxtLink>
        <div class="blog-header-actions">
          <v-btn rounded="pill" size="small" class="text-none" :to="localePath('/')">
            {{ t('navigation.backToMain') }}
          </v-btn>
          <div class="blog-controls">
            <ThemeToggle />
            <LocaleToggle />
          </div>
        </div>
      </div>
    </v-app-bar>

    <!-- Contenido principal -->
    <v-main class="blog-main">
      <div class="blog-container" @click="handleImageClick">
        <slot />
      </div>
    </v-main>

    <!-- Footer simple -->
    <footer class="blog-footer">
      <div class="blog-footer-content">
        <NuxtLink class="blog-footer-text" :to="localePath('/')">
          © {{ currentYear }} {{ t('navigation.brand.name') }}
        </NuxtLink>
        <div class="blog-footer-links">
          <a :href="contactInfo.socials.github" target="_blank" rel="noopener" aria-label="GitHub">
            <v-icon size="20" :icon="mdiGithub"></v-icon>
          </a>
          <a
            :href="contactInfo.socials.linkedin"
            target="_blank"
            rel="noopener"
            aria-label="LinkedIn"
          >
            <v-icon size="20" :icon="mdiLinkedin"></v-icon>
          </a>
          <a :href="`mailto:${contactInfo.email}`" aria-label="Email">
            <v-icon size="20" :icon="mdiEmail"></v-icon>
          </a>
        </div>
      </div>
    </footer>

    <ClientOnly>
      <v-btn
        v-show="showScrollTop"
        :icon="mdiArrowUp"
        class="scroll-to-top"
        size="large"
        @click="scrollToTop"
      ></v-btn>
    </ClientOnly>

    <ImageViewer v-model="showImageViewer" :src="selectedImage.src" :alt="selectedImage.alt" />
  </v-app>
</template>

<script setup lang="ts">
import { mdiArrowUp, mdiGithub, mdiLinkedin, mdiEmail } from '@mdi/js'
import { contactInfo } from '~/data/contact'

const { t } = useI18n()
const localePath = useLocalePath()

const showScrollTop = ref(false)
const showImageViewer = ref(false)
const selectedImage = ref({ src: '', alt: '' })
const currentYear = new Date().getFullYear()

const handleImageClick = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (target.tagName === 'IMG' && target.closest('.markdown-body')) {
    if (target.closest('a')) return

    const img = target as HTMLImageElement
    selectedImage.value = {
      src: img.src,
      alt: img.alt || ''
    }
    showImageViewer.value = true
  }
}

const scrollToTop = () => {
  if (import.meta.client) {
    const scroller = document.querySelector('.blog-main')
    if (scroller) {
      scroller.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
}

// Scroll to top functionality
if (import.meta.client) {
  onMounted(() => {
    const scroller = document.querySelector('.blog-main')
    if (!scroller) return

    const handleScroll = () => {
      showScrollTop.value = scroller.scrollTop > 300
    }

    scroller.addEventListener('scroll', handleScroll)

    onBeforeUnmount(() => {
      scroller.removeEventListener('scroll', handleScroll)
    })
  })
}
</script>

<style scoped>
.blog-layout {
  background: rgb(var(--v-theme-background));
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.blog-header {
  border-bottom: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  background: rgba(var(--v-theme-surface), 0.92) !important;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.blog-header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 78ch;
  margin: 0 auto;
  padding: 0 16px;
}

.blog-brand {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: rgb(var(--v-theme-on-surface));
  margin-left: 1rem;
}

.blog-brand-name {
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.2;
}

.blog-header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.blog-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.blog-main {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
}

.blog-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 60px 16px;
}

.blog-footer {
  border-top: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  background: rgb(var(--v-theme-surface));
  padding: 16px;
}

.blog-footer-content {
  max-width: 78ch;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.blog-footer-text {
  margin: 0;
  font-size: 0.875rem;
  opacity: 0.7;
  text-decoration: none;
  color: inherit;
}

.blog-footer-links {
  display: flex;
  gap: 16px;
}

.blog-footer-links a {
  color: rgb(var(--v-theme-on-surface));
  opacity: 0.7;
  transition: opacity 0.2s;
}

.blog-footer-links a:hover {
  opacity: 1;
}

.scroll-to-top {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1000;
}

/* Responsive */
@media (max-width: 600px) {
  .blog-header-content {
    padding: 0 12px;
  }

  .blog-brand-name {
    font-size: 1.1rem;
  }

  .blog-container {
    padding: 24px 12px;
  }

  .blog-footer-content {
    flex-direction: column;
    gap: 12px;
    text-align: center;
  }
}
</style>
