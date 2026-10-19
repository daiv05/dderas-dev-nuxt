<template>
  <header class="site-nav" :class="{ 'site-nav--scrolled': scrolled }">
    <div class="site-nav__inner">
      <NuxtLink :to="localePath('/')" class="site-nav__brand mono" @click="open = false">
        dderas<span class="site-nav__dot">.</span>dev
      </NuxtLink>

      <nav class="site-nav__links mono" :aria-label="t('navigation.label')">
        <NuxtLink
          v-for="item in items"
          :key="item.key"
          :to="item.to"
          class="site-nav__link"
          :class="{ 'is-active': isActive(item.key) }"
        >
          {{ t(`navigation.items.${item.key}`) }}
        </NuxtLink>
        <span class="site-nav__sep" aria-hidden="true"></span>
        <LocaleToggle />
        <ThemeToggle />
      </nav>

      <div class="site-nav__mobile">
        <ThemeToggle />
        <UiButton
          variant="ghost"
          size="sm"
          icon-only
          :aria-label="t(open ? 'navigation.close' : 'navigation.open')"
          :aria-expanded="open"
          @click="open = !open"
        >
          <UiIcon :name="open ? 'close' : 'menu'" :size="20" />
        </UiButton>
      </div>
    </div>

    <div v-if="open" class="site-nav__panel">
      <nav class="site-nav__panel-links" :aria-label="t('navigation.label')">
        <NuxtLink
          v-for="(item, i) in items"
          :key="item.key"
          :to="item.to"
          class="site-nav__panel-link"
          @click="open = false"
        >
          <span class="mono site-nav__panel-index">{{ String(i + 1).padStart(2, '0') }}</span>
          {{ t(`navigation.items.${item.key}`) }}
        </NuxtLink>
      </nav>
      <div class="site-nav__panel-foot mono">
        <LocaleToggle />
        <a :href="`mailto:${contactInfo.email}`">{{ contactInfo.email }}</a>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { contactInfo } from '~/data/contact'

type NavKey = 'work' | 'experience' | 'writing' | 'resources'

const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

const open = ref(false)
const scrolled = ref(false)

const items = computed<{ key: NavKey; to: string }[]>(() => [
  { key: 'work', to: localePath('/work') },
  { key: 'experience', to: `${localePath('/')}#experience` },
  { key: 'writing', to: localePath('/blog') },
  { key: 'resources', to: localePath('/resources') },
])

const basePath = computed(() => route.path.replace(/^\/es(?=\/|$)/, '') || '/')

const isActive = (key: NavKey) => {
  const p = basePath.value
  if (key === 'work') return p.startsWith('/work')
  if (key === 'writing') return p.startsWith('/blog')
  if (key === 'resources') return p.startsWith('/resources')
  return false
}

const onScroll = () => {
  scrolled.value = globalThis.scrollY > 8
}

watch(() => route.fullPath, () => {
  open.value = false
})

watch(open, (value) => {
  if (import.meta.client) document.documentElement.classList.toggle('nav-open', value)
})

onMounted(() => {
  onScroll()
  globalThis.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  globalThis.removeEventListener('scroll', onScroll)
  document.documentElement.classList.remove('nav-open')
})
</script>

<style scoped>
.site-nav {
  position: sticky;
  top: 0;
  z-index: 40;
  background: color-mix(in srgb, var(--paper) 88%, transparent);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-bottom: 1px solid transparent;
  transition: border-color var(--transition-base);
}

.site-nav--scrolled {
  border-bottom-color: var(--rule);
}

.site-nav__inner {
  max-width: var(--page-max-width);
  margin: 0 auto;
  height: var(--nav-height);
  padding: 0 var(--gutter);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.site-nav__brand {
  font-size: 0.95rem;
  font-weight: 500;
  letter-spacing: -0.01em;
}

.site-nav__dot {
  color: var(--accent);
}

.site-nav__links {
  display: flex;
  align-items: center;
  gap: 1.4rem;
  font-size: 0.8rem;
}

.site-nav__link {
  color: var(--muted);
  position: relative;
  padding: 0.25rem 0;
  transition: color var(--transition-fast);
}

.site-nav__link::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -2px;
  height: 1px;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--transition-base);
}

.site-nav__link:hover,
.site-nav__link.is-active {
  color: var(--ink);
}

.site-nav__link:hover::after,
.site-nav__link.is-active::after {
  transform: scaleX(1);
}

.site-nav__sep {
  width: 1px;
  height: 1rem;
  background: var(--rule);
}

.site-nav__mobile {
  display: none;
  align-items: center;
  gap: 0.25rem;
}

.site-nav__panel {
  position: fixed;
  inset: var(--nav-height) 0 0 0;
  background: var(--paper);
  padding: 2rem var(--gutter);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-top: 1px solid var(--rule);
}

.site-nav__panel-links {
  display: flex;
  flex-direction: column;
}

.site-nav__panel-link {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  font-size: 2rem;
  font-weight: 600;
  padding: 0.9rem 0;
  border-bottom: 1px solid var(--rule);
}

.site-nav__panel-index {
  font-size: 0.75rem;
  color: var(--accent);
  font-weight: 400;
}

.site-nav__panel-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.8rem;
  color: var(--muted);
}

@media (max-width: 760px) {
  .site-nav__links {
    display: none;
  }

  .site-nav__mobile {
    display: flex;
  }
}
</style>
