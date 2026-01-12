<template>
  <section class="hero-shell">
    <v-container fluid class="hero-grid">
      <v-row class="hero-row" align="stretch">
        <v-col cols="12" md="6" class="hero-col">
          <div ref="copyBlock" class="hero-copy">
            <p class="eyebrow" data-animate>{{ t('hero.eyebrow') }}</p>
            <h1 class="hero-title" data-animate>
              {{ t('hero.title') }}
              <span class="hero-emphasis">
                {{ t('hero.highlight') }}
              </span>
            </h1>
            <p class="role-line" data-animate>
              <span class="role-label mono">{{ t('hero.roleLabel') }}</span>
              <span ref="roleTicker" class="role-value">{{ currentRole }}</span>
            </p>
            <p class="hero-lead" data-animate>
              {{ t('hero.lead') }}
            </p>

            <div ref="ctaGroup" class="hero-actions">
              <v-btn
                color="primary"
                variant="flat"
                rounded="pill"
                size="large"
                class="text-none"
                @click="goToProjects"
              >
                {{ t('hero.ctas.primary') }}
              </v-btn>
              <v-btn
                variant="outlined"
                rounded="pill"
                size="large"
                class="text-none"
                :href="`mailto:${contactInfo.email}`"
              >
                {{ t('hero.ctas.secondary') }}
              </v-btn>
            </div>

            <div ref="ledgerBlock" class="hero-ledger">
              <div class="ledger-title">{{ t('hero.agendaTitle') }}</div>
              <div class="ledger-grid no-auto-fit">
                <div v-for="item in agenda" :key="item.title" class="ledger-item">
                  <span class="label">{{ item.status }}</span>
                  <span class="value mono">{{ item.title }}</span>
                </div>
              </div>
            </div>
          </div>
        </v-col>

        <v-col cols="12" md="6" class="hero-col">
          <div ref="boardBlock" class="hero-board">
            <div class="board-section" data-animate>
              <div class="ledger-title">{{ t('hero.stackTitle') }}</div>
              <div class="ledger-grid">
                <div v-for="tech in techStack" :key="tech.name" class="ledger-item">
                  <span class="label">{{ tech.name }}</span>
                  <span class="value mono">{{ tech.detail }}</span>
                </div>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup lang="ts">
import { codeToHtml } from 'shiki'

import { contactInfo } from '~/data/contact'
import { gsap, gsapDefaults } from '~/plugins/gsap'

const { t, tm, rt, locale } = useI18n()
const localePath = useLocalePath()
const appStore = useAppStore()

// Refs del template
const copyBlock = ref<HTMLElement | null>(null)
const boardBlock = ref<HTMLElement | null>(null)
const ledgerBlock = ref<HTMLElement | null>(null)
const ctaGroup = ref<HTMLElement | null>(null)
const roleTicker = ref<HTMLElement | null>(null)

let ctx: gsap.Context | null = null

// Computed que resuelven correctamente las traducciones
const techStack = computed(() => {
  const raw = tm('hero.techStack');
  if (Array.isArray(raw)) {
    return raw.map((item) => ({
      name: rt(item.name),
      detail: rt(item.detail)
    }));
  }
  return [];
})

const agenda = computed(() => {
  const raw = tm('hero.agenda');
  if (Array.isArray(raw)) {
    return raw.map((item) => ({
      status: rt(item.status),
      title: rt(item.title)
    }));
  }
  return [];
})

const roles = computed(() => {
  const raw = tm('hero.roles');
  if (Array.isArray(raw)) {
    return raw.map((role) => rt(role));
  }
  return [];
})

// Estado del typewriter
const currentRole = ref('')
let roleIndex = 0
let charIndex = 0
let isDeleting = false
let typewriterTimeout: ReturnType<typeof setTimeout> | null = null

const codeSnippet = `const davidDeras = {
  location: '${contactInfo.city}, ${contactInfo.countryCode}',
  stack: ['Vue 3 + TS', 'Laravel 11', 'Node tooling'],
  sectors: ['GovTech', 'Retail', 'Data Viz'],
  currently: () => ['DTIC - MINSAL', 'MusyCharts OSS']
}
export default davidDeras;`

const highlightedSnippet = ref('')

const escapeHtml = (str: string) =>
  str.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')

const highlightSnippet = async () => {
  if (import.meta.server) return
  
  highlightedSnippet.value = `<pre class="code-pre"><code>${escapeHtml(codeSnippet)}</code></pre>`
  
  try {
    highlightedSnippet.value = await codeToHtml(codeSnippet, {
      lang: 'js',
      theme: appStore.theme === 'dark' ? 'github-dark-default' : 'github-light',
    })
  } catch (error) {
    console.warn('No se pudo cargar Shiki', error)
  }
}

const typeWriter = () => {
  if (import.meta.server) return
  
  const list = roles.value
  if (!list.length) {
    typewriterTimeout = setTimeout(typeWriter, 1500)
    return
  }

  const current = list[roleIndex % list.length] ?? ''

  if (isDeleting) {
    currentRole.value = current.substring(0, charIndex - 1)
    charIndex--
  } else {
    currentRole.value = current.substring(0, charIndex + 1)
    charIndex++
  }

  let typeSpeed = isDeleting ? 45 : 90

  if (!isDeleting && charIndex === current.length) {
    typeSpeed = 1800
    isDeleting = true
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false
    roleIndex = (roleIndex + 1) % list.length
    typeSpeed = 500
  }

  typewriterTimeout = setTimeout(typeWriter, typeSpeed)
}

const goToProjects = () => {
  navigateTo(localePath('/projects'))
}

onMounted(() => {
  nextTick(() => {
    highlightSnippet()

    ctx = gsap.context(() => {
      const copyTargets = copyBlock.value?.querySelectorAll('[data-animate]') ?? []
      const boardTargets = boardBlock.value?.querySelectorAll('[data-animate]') ?? []

      if (copyTargets.length) {
        gsap.from(copyTargets, {
          ...gsapDefaults,
          opacity: 0,
          y: 24,
          stagger: 0.15,
        })
      }

      if (ctaGroup.value) {
        gsap.from(ctaGroup.value, {
          ...gsapDefaults,
          opacity: 0,
          y: 24,
          delay: 0.4,
        })
      }

      if (ledgerBlock.value) {
        gsap.from(ledgerBlock.value, {
          ...gsapDefaults,
          opacity: 0,
          y: 24,
          delay: 0.5,
        })
      }

      if (boardTargets.length) {
        gsap.from(boardTargets, {
          ...gsapDefaults,
          opacity: 0,
          y: 30,
          stagger: 0.2,
          delay: 0.3,
        })
      }
    })

    setTimeout(typeWriter, 600)
  })
})

onBeforeUnmount(() => {
  ctx?.revert()
  if (typewriterTimeout) {
    clearTimeout(typewriterTimeout)
    typewriterTimeout = null
  }
})

watch(
  () => appStore.theme,
  () => {
    highlightSnippet()
  }
)

watch(
  () => locale.value,
  () => {
    roleIndex = 0
    charIndex = 0
    isDeleting = false
    currentRole.value = ''
  }
)
</script>

<style scoped lang="scss">
.hero-shell {
  padding: clamp(2rem, 6vw, 4rem) 0;
  border-bottom: 1px solid var(--line-soft);
}

.hero-grid {
  max-width: var(--page-max-width);
  margin: 0 auto;
}

.hero-row {
  display: flex;
  align-items: stretch;
}

.hero-col {
  display: flex;
  flex-direction: column;
}

.hero-copy,
.hero-board {
  border: 1px solid var(--line-soft);
  border-radius: var(--radius-lg);
  padding: clamp(1.5rem, 3vw, 2.75rem);
  background: rgba(var(--v-theme-surface), 0.7);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  height: 100%;
}

.hero-title {
  font-size: clamp(2.5rem, 6vw, 3.75rem);
  letter-spacing: -0.03em;
  line-height: 1.1;
}

.hero-emphasis {
  display: block;
  font-size: clamp(1.1rem, 2.2vw, 1.35rem);
  font-weight: 500;
  color: var(--text-subtle);
}

.role-line {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  height: 5.4rem;
}

.role-label {
  font-size: 0.75rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.role-value {
  font-size: 1.5rem;
  border-bottom: 1px solid var(--line-soft);
  padding-bottom: 0.35rem;
  height: 2.2rem;
}

.hero-lead {
  font-size: 1.1rem;
  color: var(--text-subtle);
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.hero-ledger {
  border-top: 1px solid var(--line-soft);
  padding-top: 2.25rem;
}

.ledger-title {
  font-size: 0.9rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 0.75rem;
}

.ledger-grid:not(.no-auto-fit) {
  display: grid;
  gap: 0.75rem;
}

.ledger-grid.no-auto-fit {
  display: grid;
  gap: 0.75rem;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.ledger-item {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  border: 1px solid var(--line-soft);
  border-radius: var(--radius-sm);
  padding: 0.85rem 1rem;
}

.ledger-item .label {
  font-size: 0.85rem;
  color: var(--text-subtle);
}

.hero-board {
  gap: 1.5rem;
}

.board-section {
  border-radius: var(--radius-md);
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.board-label {
  font-size: 0.95rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-subtle);
}

.board-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.board-list li {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--line-soft);
  padding-bottom: 0.5rem;
}

.board-list li:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.code-area {
  gap: 1rem;
}

.code-highlight {
  margin: 0;
  font-family: var(--font-mono);
  font-size: 0.9rem;
  line-height: 1.6;
  border-radius: var(--radius-sm);
  overflow-x: auto;
}

.code-highlight :deep(code) {
  text-shadow: none;
}

.code-pre {
  margin: 0;
}

@media (max-width: 959px) {
  .hero-col:not(:last-child) {
    margin-bottom: 1.5rem;
  }
}
</style>
