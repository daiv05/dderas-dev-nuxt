<template>
  <v-app class="error-app">
    <main class="error-stage">
      <div class="error-bg" aria-hidden="true">
        <div class="error-grid"></div>
        <div class="error-glow"></div>
        <div class="error-noise"></div>
      </div>

      <v-container class="error-container">
        <NuxtLink :to="homeHref" class="error-brand">
          <span class="error-brand__name">{{ t('navigation.brand.name') }}</span>
        </NuxtLink>

        <v-card class="error-card" elevation="0">
          <div class="error-card__top">
            <p class="error-eyebrow">
              {{ t(isNotFound ? 'errors.notFound.eyebrow' : 'errors.generic.eyebrow') }}
            </p>

            <div class="error-code" :data-text="String(statusCode)">
              {{ statusCode }}
            </div>

            <h1 class="error-title">
              {{ t(isNotFound ? 'errors.notFound.title' : 'errors.generic.title') }}
            </h1>
            <p class="error-lead">
              {{ t(isNotFound ? 'errors.notFound.lead' : 'errors.generic.lead') }}
            </p>

            <p class="error-hint">
              <span class="error-hint__label">{{ t('errors.hint.label') }}</span>
              <span class="error-hint__text">{{ hintText }}</span>
            </p>
          </div>

          <v-divider />

          <div class="error-actions">
            <v-btn class="text-none" color="primary" variant="flat" rounded="pill" @click="goHome">
              {{ t('errors.actions.home') }}
            </v-btn>

            <v-btn class="text-none" variant="tonal" rounded="pill" @click="goBack">
              {{ t('errors.actions.back') }}
            </v-btn>

            <v-btn class="text-none" variant="text" rounded="pill" @click="reload">
              {{ t('errors.actions.reload') }}
            </v-btn>

            <v-btn
              class="text-none"
              variant="text"
              rounded="pill"
              :href="reportHref"
              target="_blank"
              rel="noopener"
            >
              {{ t('errors.actions.report') }}
            </v-btn>
          </div>

          <v-expand-transition>
            <div v-show="showDetails" class="error-details">
              <div class="error-details__row">
                <span class="error-details__k">{{ t('errors.details.path') }}</span>
                <span class="error-details__v">{{ safePath }}</span>
              </div>
              <div class="error-details__row">
                <span class="error-details__k">{{ t('errors.details.message') }}</span>
                <span class="error-details__v">{{ safeMessage }}</span>
              </div>
              <div v-if="devStack" class="error-details__stack">
                <span class="error-details__k">{{ t('errors.details.stack') }}</span>
                <pre class="error-details__pre">{{ devStack }}</pre>
              </div>
            </div>
          </v-expand-transition>

          <div class="error-details-toggle">
            <v-btn
              variant="text"
              density="comfortable"
              rounded="pill"
              class="error-details-toggle__btn"
              @click="showDetails = !showDetails"
            >
              {{ t(showDetails ? 'errors.actions.hideDetails' : 'errors.actions.showDetails') }}
            </v-btn>
          </div>
        </v-card>
      </v-container>
    </main>
  </v-app>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

const statusCode = computed(() => (typeof props.error?.statusCode === 'number' ? props.error.statusCode : 500))
const isNotFound = computed(() => statusCode.value === 404)

const safeMessage = computed(() => {
  const message = props.error?.message
  if (typeof message === 'string' && message.trim()) return message
  return t('errors.details.unknown')
})

const safePath = computed(() => {
  const path = route.fullPath
  return typeof path === 'string' && path ? path : '/'
})

const devStack = computed(() => {
  if (!import.meta.dev) return ''
  const stack = (props.error as any)?.stack
  return typeof stack === 'string' ? stack : ''
})

const homeHref = computed(() => localePath('/'))

const hintOptions = computed(() => {
  if (isNotFound.value) {
    return [
      t('errors.hint.notFound.0'),
      t('errors.hint.notFound.1'),
      t('errors.hint.notFound.2'),
    ]
  }

  return [
    t('errors.hint.generic.0'),
    t('errors.hint.generic.1'),
    t('errors.hint.generic.2'),
  ]
})

const stableIndex = computed(() => {
  const seed = `${statusCode.value}:${safePath.value}`
  let hash = 0
  for (const ch of seed) {
    hash = (hash * 31 + (ch.codePointAt(0) ?? 0)) >>> 0
  }
  const len = hintOptions.value.length
  return len ? hash % len : 0
})

const hintText = computed(() => hintOptions.value[stableIndex.value] ?? '')

const showDetails = ref(false)

const reportHref = computed(() => {
  const subject = encodeURIComponent(`DDeras · Error ${statusCode.value}`)
  const body = encodeURIComponent(
    [
      `URL: ${safePath.value}`,
      `Status: ${statusCode.value}`,
      `Message: ${safeMessage.value}`,
      '',
      'What were you doing when this happened?',
    ].join('\n')
  )

  return `mailto:davidderas50@gmail.com?subject=${subject}&body=${body}`
})

useHead(() => ({
  title: `${statusCode.value} · ${t(isNotFound.value ? 'errors.notFound.title' : 'errors.generic.title')}`,
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
}))

const goHome = () => {
  clearError({ redirect: homeHref.value })
}

const goBack = () => {
  if (import.meta.client && globalThis.history.length > 1) {
    globalThis.history.back()
    return
  }
  goHome()
}

const reload = () => {
  if (import.meta.client) {
    globalThis.location.reload()
    return
  }
  clearError()
}
</script>

<style scoped>
.error-app {
  min-height: 100vh;
}

.error-stage {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 56px 0;
  overflow: hidden;
}

.error-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.error-grid {
  position: absolute;
  inset: -40px;
  background-image:
    linear-gradient(to right, rgba(255, 255, 255, 0.06) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.06) 1px, transparent 1px);
  background-size: 44px 44px;
  transform: perspective(900px) rotateX(55deg) translateY(-120px);
  transform-origin: center;
  opacity: 0.55;
  filter: blur(0.15px);
  animation: gridFloat 10s ease-in-out infinite;
}

.error-glow {
  position: absolute;
  inset: -20%;
  background:
    radial-gradient(45% 40% at 20% 20%, rgba(124, 58, 237, 0.38), transparent 60%),
    radial-gradient(40% 35% at 80% 30%, rgba(14, 165, 233, 0.34), transparent 60%),
    radial-gradient(45% 40% at 40% 80%, rgba(16, 185, 129, 0.22), transparent 65%);
  filter: blur(28px);
  opacity: 0.9;
}

.error-noise {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
  opacity: 0.08;
  mix-blend-mode: overlay;
}

.error-container {
  position: relative;
  z-index: 1;
}

.error-brand {
  display: inline-flex;
  flex-direction: column;
  gap: 4px;
  text-decoration: none;
  margin-bottom: 18px;
}

.error-brand__name {
  font-weight: 700;
  letter-spacing: 0.2px;
  color: var(--text-main);
  font-size: 18px;
}

.error-brand__tag {
  color: var(--text-muted);
  font-size: 13px;
}

.error-card {
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(18, 18, 22, 0.62);
  backdrop-filter: blur(14px);
  border-radius: 18px;
  overflow: hidden;
}

.error-card__top {
  padding: 28px 24px 18px;
}

.error-eyebrow {
  margin: 0 0 10px;
  color: var(--text-muted);
  font-size: 13px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.error-code {
  position: relative;
  display: inline-block;
  font-size: 66px;
  line-height: 1;
  font-weight: 900;
  letter-spacing: -0.04em;
  color: var(--text-main);
  margin-bottom: 10px;
}

.error-code::before,
.error-code::after {
  content: attr(data-text);
  position: absolute;
  inset: 0;
  opacity: 0.45;
  mix-blend-mode: screen;
}

.error-code::before {
  transform: translate(2px, -1px);
  color: rgba(14, 165, 233, 0.8);
  clip-path: inset(0 0 55% 0);
  animation: glitch 2.6s infinite linear;
}

.error-code::after {
  transform: translate(-2px, 1px);
  color: rgba(124, 58, 237, 0.78);
  clip-path: inset(45% 0 0 0);
  animation: glitch 2.3s infinite linear;
}

.error-title {
  margin: 0 0 8px;
  font-size: 22px;
  font-weight: 750;
  color: var(--text-main);
}

.error-lead {
  margin: 0 0 16px;
  color: var(--text-muted);
  max-width: 70ch;
}

.error-hint {
  margin: 0;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px dashed rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.03);
  display: grid;
  gap: 6px;
}

.error-hint__label {
  font-size: 12px;
  color: var(--text-muted);
}

.error-hint__text {
  color: var(--text-main);
}

.error-actions {
  padding: 16px 18px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.error-details-toggle {
  padding: 0 18px 14px;
}

.error-details-toggle__btn {
  text-transform: none;
}

.error-details {
  padding: 14px 18px 6px;
  display: grid;
  gap: 10px;
}

.error-details__row {
  display: grid;
  gap: 4px;
}

.error-details__k {
  color: var(--text-muted);
  font-size: 12px;
}

.error-details__v {
  color: var(--text-main);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New",
    monospace;
  font-size: 12.5px;
  overflow-wrap: anywhere;
}

.error-details__stack {
  display: grid;
  gap: 6px;
}

.error-details__pre {
  margin: 0;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.25);
  overflow: auto;
  max-height: 240px;
  font-size: 12px;
  color: var(--text-main);
}

@keyframes gridFloat {
  0% {
    transform: perspective(900px) rotateX(55deg) translateY(-120px) translateX(0);
  }
  50% {
    transform: perspective(900px) rotateX(55deg) translateY(-105px) translateX(16px);
  }
  100% {
    transform: perspective(900px) rotateX(55deg) translateY(-120px) translateX(0);
  }
}

@keyframes glitch {
  0% {
    filter: none;
  }
  20% {
    filter: saturate(1.2);
  }
  21% {
    filter: saturate(0.6);
  }
  48% {
    filter: none;
  }
  49% {
    filter: saturate(1.4);
  }
  50% {
    filter: none;
  }
  100% {
    filter: none;
  }
}

@media (min-width: 960px) {
  .error-card__top {
    padding: 34px 34px 20px;
  }

  .error-actions {
    padding: 18px 24px;
  }

  .error-details-toggle {
    padding: 0 24px 18px;
  }

  .error-details {
    padding: 16px 24px 8px;
  }
}
</style>
