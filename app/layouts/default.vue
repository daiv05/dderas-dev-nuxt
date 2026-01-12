<template>
  <v-app class="h-screen">
    <v-navigation-drawer
      v-model="drawer"
      app
      :permanent="isPermanent"
      :scrim="!isPermanent"
      class="shell-nav"
      width="280"
    >
      <div class="nav-root">
        <NuxtLink :to="localePath('/')" class="brand-mark">
          <span class="brand-initial">{{ t('navigation.brand.name') }}</span>
          <span class="brand-tag">{{ t('navigation.brand.tagline') }}</span>
        </NuxtLink>

        <v-divider class="nav-divider" thickness="1"></v-divider>

        <v-list density="compact" nav class="nav-list">
          <v-list-item
            v-for="item in items"
            :key="item.value"
            :class="['nav-link', { 'nav-link--active': isActive(item) }]"
            @click="goTo(item)"
          >
            <template #prepend>
              <v-icon
                class="nav-dot"
                :class="{ 'nav-dot--active': isActive(item) }"
                :icon="item.icon"
              ></v-icon>
            </template>
            <template v-if="item.openInNewTab" #append>
              <v-icon size="15" class="nav-dot" :icon="mdiArrowTopRight"></v-icon>
            </template>
            <v-list-item-title>{{ t(item.titleKey) }}</v-list-item-title>
          </v-list-item>
        </v-list>

        <div class="nav-bottom">
          <div class="nav-controls">
            <ThemeToggle />
            <LocaleToggle />
          </div>
          <v-divider></v-divider>
          <div class="nav-links">
            <a
              :href="contactInfo.socials.github"
              target="_blank"
              rel="noopener"
              aria-label="GitHub"
            >
              <v-icon size="18" :icon="mdiGithub"></v-icon>
            </a>
            <a
              :href="contactInfo.socials.linkedin"
              target="_blank"
              rel="noopener"
              aria-label="LinkedIn"
            >
              <v-icon size="18" :icon="mdiLinkedin"></v-icon>
            </a>
            <a :href="`mailto:${contactInfo.email}`" aria-label="Email">
              <v-icon size="18" :icon="mdiEmail"></v-icon>
            </a>
          </div>
        </div>
      </div>
    </v-navigation-drawer>

    <v-main class="shell-main">
      <div class="shell-main-inner">
        <!-- Mobile top bar - hidden by CSS on desktop -->
        <div class="mobile-top">
          <v-btn icon variant="text" title="Open menu" @click="drawer = true">
            <v-icon :icon="mdiMenu"></v-icon>
          </v-btn>
          <p class="mobile-title" @click="navigateTo(localePath('/'))">
            {{ t('navigation.brand.shortName') }}
          </p>
          <div class="mobile-controls">
            <ThemeToggle />
            <LocaleToggle />
          </div>
        </div>

        <!-- Mobile nav - hidden by CSS on desktop -->
        <ClientOnly>
          <div class="mobile-nav">
            <v-slide-group v-model="mobileSection" show-arrows center-active>
              <v-slide-group-item v-for="item in items" :key="item.value" :value="item.value">
                <v-btn
                  variant="text"
                  rounded="pill"
                  size="small"
                  class="nav-chip"
                  :class="{ 'nav-chip--active': mobileSection === item.value }"
                  @click="handleMobileNav(item)"
                >
                  {{ t(item.titleKey) }}
                  <template v-if="item.openInNewTab">
                    <v-icon size="15" class="nav-dot" :icon="mdiArrowTopRight"></v-icon>
                  </template>
                </v-btn>
              </v-slide-group-item>
            </v-slide-group>
          </div>
        </ClientOnly>

        <div class="shell-content">
          <slot />
        </div>

        <div class="footer-frame">
          <Footer />
        </div>
      </div>
    </v-main>

    <v-btn
      v-show="showScrollTop"
      :icon="mdiArrowUp"
      class="scroll-to-top"
      size="large"
      @click="scrollToTop"
    ></v-btn>
  </v-app>
</template>

<script setup lang="ts">
import { mdiArrowTopRight, mdiArrowUp, mdiEmail, mdiGithub, mdiLinkedin, mdiMenu } from '@mdi/js'

import { contactInfo } from '~/data/contact'
import { sidebarItems } from '~/data/sidebar-items'
import type { SidebarItem } from '~/data/sidebar-items'

const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const router = useRouter()

const items = sidebarItems
// Desktop-first approach for SSR: drawer starts open
const drawer = ref(true)
const showScrollTop = ref(false)
// Desktop-first for SSR (assumes desktop viewport initially)
const isDesktopViewport = ref(true)
// Track if component has hydrated
const isHydrated = ref(false)

// Permanent is always true in SSR to avoid hydration mismatch
const isPermanent = computed(() => {
  // In SSR, always return true (desktop-first)
  if (import.meta.server) return true
  // Before hydration completes, keep SSR value
  if (!isHydrated.value) return true
  // After hydration, use actual viewport state
  return isDesktopViewport.value
})

const basePath = (path: string) => path.replace(/^\/es(?=\/|$)/, '') || '/'

const getInitialMobileSection = () => {
  const currentPath = basePath(route.path)
  const active = items.find((item) => item.to === currentPath)
  return active ? active.value : (items[0]?.value ?? null)
}

const mobileSection = ref(getInitialMobileSection())

// Update viewport state based on media query
const updateViewport = () => {
  if (import.meta.client) {
    isDesktopViewport.value = globalThis.matchMedia('(min-width: 960px)').matches
    // Sync drawer with viewport
    drawer.value = isDesktopViewport.value
  }
}

watch(
  () => route.path,
  (path) => {
    const p = basePath(path)
    const active = items.find((item) => item.to === p)
    if (active) {
      mobileSection.value = active.value
    }
  }
)

const goTo = (item: SidebarItem) => {
  if (item.openInNewTab) {
    if (import.meta.client) {
      const url = router.resolve(localePath(item.to)).href
      globalThis.open(url, '_blank')
    }
  } else {
    navigateTo(localePath(item.to))
  }
  // Close drawer on mobile
  if (!isDesktopViewport.value) {
    drawer.value = false
  }
}

const handleMobileNav = (item: SidebarItem) => {
  mobileSection.value = item.value
  navigateTo(localePath(item.to))
}

const isActive = (item: SidebarItem) => {
  const currentPath = basePath(route.path)
  return currentPath === item.to
}

const handleScroll = () => {
  if (import.meta.client) {
    showScrollTop.value = globalThis.scrollY > 500
  }
}

const scrollToTop = () => {
  if (import.meta.client) {
    globalThis.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

onMounted(() => {
  // Initialize viewport state and setup resize listener
  if (import.meta.client) {
    // Use nextTick to ensure hydration is complete before making changes
    nextTick(() => {
      // Mark as hydrated FIRST
      isHydrated.value = true
      
      // Then check viewport
      const isDesktop = globalThis.matchMedia('(min-width: 960px)').matches
      isDesktopViewport.value = isDesktop
      
      // Close drawer if on mobile (after hydration complete)
      if (!isDesktop) {
        drawer.value = false
      }
      
      // Setup resize listener for subsequent changes
      globalThis.addEventListener('resize', updateViewport)
    })
  }
  // Setup scroll listener
  if (import.meta.client) {
    globalThis.addEventListener('scroll', handleScroll)
  }
})

onBeforeUnmount(() => {
  if (import.meta.client) {
    globalThis.removeEventListener('resize', updateViewport)
    globalThis.removeEventListener('scroll', handleScroll)
  }
})
</script>

<style scoped lang="scss">
.h-screen {
  height: 100vh;
}

.shell-nav {
  border-right: 1px solid var(--line-soft) !important;
  background: rgb(var(--v-theme-background)) !important;
  height: 100vh;
}

/* Hide drawer on mobile during SSR/initial render (desktop-first approach) */
@media (max-width: 959px) {
  .shell-nav:not(.v-navigation-drawer--active) {
    transform: translateX(-100%) !important;
  }
}

.nav-root {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 1.5rem;
  gap: 1.5rem;
  min-height: 0;
}

.brand-mark {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-family: var(--font-mono);
  font-weight: 600;
  letter-spacing: 0.06em;
}

.brand-initial {
  font-size: 1.1rem;
}

.brand-tag {
  font-size: 0.85rem;
  color: var(--text-subtle);
}

.nav-divider {
  border-color: var(--line-soft) !important;
}

.nav-list {
  flex: 1;
  padding: 0;
  overflow-y: auto;
  min-height: 0;
}

:deep(.v-list-item__content) {
  gap: 0.35rem;
}

.nav-link {
  border: 1px solid transparent;
  border-radius: var(--radius-sm);
  margin-bottom: 0.5rem;
  padding-inline: 0.75rem;
}

.nav-link--active {
  border-color: var(--line-strong);
}

.nav-dot {
  margin-right: 0.85rem;
}

.nav-bottom {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: auto;
}

.nav-controls {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.nav-links {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.85rem;
}

.nav-links a {
  padding: 0.35rem 0.75rem;
  border: 1px solid var(--line-soft);
  border-radius: 999px;
}

.shell-main {
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
}

.shell-main-inner {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.shell-content {
  flex: 1;
}

.footer-frame {
  padding-top: 0;
}

.mobile-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem var(--shell-padding) 1rem;
  position: sticky;
  top: 0;
  background: rgb(var(--v-theme-background));
  z-index: 5;
}

/* Hide mobile-top on desktop with media query */
@media (min-width: 960px) {
  .mobile-top {
    display: none;
  }
}

.mobile-title {
  font-weight: 600;
}

.mobile-controls {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.mobile-nav {
  display: flex;
  justify-content: center;
  padding: 0.5rem var(--shell-padding);
  border-bottom: 1px solid var(--line-soft);
}

/* Hide mobile-nav on desktop with media query */
@media (min-width: 960px) {
  .mobile-nav {
    display: none;
  }
}

.nav-chip {
  border: 1px solid transparent;
}

.nav-chip--active {
  border-color: var(--line-strong);
}

.scroll-to-top {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  border: 1px solid var(--line-strong);
  background: rgb(var(--v-theme-background));
}

@media (max-width: 600px) {
  .scroll-to-top {
    bottom: 1rem;
    right: 1rem;
  }
}
</style>
