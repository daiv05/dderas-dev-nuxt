<template>
  <div class="query">
    <form class="query__bar mono" role="search" @submit.prevent="submit">
      <label :for="inputId" class="query__prompt">›</label>
      <input
        :id="inputId"
        v-model="text"
        class="query__input"
        type="search"
        autocomplete="off"
        spellcheck="false"
        :placeholder="t('home.query.placeholder')"
        :aria-label="t('home.query.label')"
        @focus="stopTyping"
      />
      <span class="query__meta" aria-hidden="true">top-5</span>
    </form>

    <div class="query__chips mono" :aria-label="t('home.query.suggested')">
      <button
        v-for="q in space.queries"
        :key="q.text"
        type="button"
        class="query__chip"
        :class="{ 'is-active': activeQuery?.text === q.text }"
        @click="pick(q.text)"
      >
        {{ q.text }}
      </button>
    </div>

    <ol v-if="results.length" class="query__results" :aria-label="t('home.query.results')" aria-live="polite">
      <li v-for="(r, i) in results" :key="r.id" class="query__result">
        <span class="query__rank mono">{{ String(i + 1).padStart(2, '0') }}</span>
        <span :class="['query__dot', `is-${r.cluster}`]" aria-hidden="true"></span>
        <NuxtLink v-if="r.href" :to="localeHref(r.href)" :prefetch="false" class="query__label">{{ r.label }}</NuxtLink>
        <span v-else class="query__label">{{ r.label }}</span>
      </li>
    </ol>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{ autoplay?: boolean }>(), { autoplay: false })

const { t } = useI18n()
const localePath = useLocalePath()
const { space, activeQuery, runQuery } = useEmbeddingSpace()
const { allowMotion, ready } = useMotionPreference()

const inputId = useId()
const text = ref('')
let typer: ReturnType<typeof setInterval> | null = null

const results = computed(() => {
  const q = activeQuery.value
  if (!q) return []
  const seen = new Set<string>()
  return q.neighbors
    .map((i) => space.value.points[i])
    .filter((p): p is NonNullable<typeof p> => !!p)
    .filter((p) => {
      const key = `${p.label}|${p.href}`
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
})

const localeHref = (href: string) => {
  const [path, hash] = href.split('#')
  const base = localePath(path || '/')
  return hash ? `${base}#${hash}` : base
}

const stopTyping = () => {
  if (typer) clearInterval(typer)
  typer = null
}

const pick = (value: string) => {
  stopTyping()
  text.value = value
  runQuery(value)
}

const submit = () => {
  stopTyping()
  const resolved = runQuery(text.value)
  if (resolved && !text.value.trim()) text.value = resolved.text
}

const autoplayFirst = () => {
  const first = space.value.queries[0]?.text
  if (!first || activeQuery.value) return
  if (!allowMotion.value) {
    pick(first)
    return
  }
  let i = 0
  typer = setInterval(() => {
    i += 1
    text.value = first.slice(0, i)
    if (i >= first.length) {
      stopTyping()
      runQuery(first)
    }
  }, 35)
}

onMounted(() => {
  if (!props.autoplay) return
  if (ready.value) setTimeout(autoplayFirst, 700)
  else {
    const stop = watch(ready, (r) => {
      if (!r) return
      stop()
      setTimeout(autoplayFirst, 700)
    })
  }
})

onBeforeUnmount(stopTyping)
</script>

<style scoped>
.query {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 0.75rem;
  min-width: 0;
  max-width: 34rem;
}

.query__bar {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  background: var(--ink);
  color: var(--paper);
  border-radius: var(--radius-sm);
  padding: 0.7rem 0.9rem;
  font-size: 0.8rem;
}

.query__prompt {
  color: var(--signal);
}

.query__input {
  flex: 1;
  min-width: 0;
  background: transparent;
  border: 0;
  outline: none;
  color: inherit;
  font: inherit;
}

.query__input::placeholder {
  color: color-mix(in srgb, var(--paper) 72%, transparent);
}

.query__input::-webkit-search-cancel-button {
  display: none;
}

.query__bar:focus-within {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.query__meta {
  font-size: 0.65rem;
  color: color-mix(in srgb, var(--paper) 78%, transparent);
}

.query__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.query__chip {
  font: inherit;
  font-size: 0.7rem;
  color: var(--muted);
  background: transparent;
  border: 1px solid var(--rule);
  border-radius: var(--radius-sm);
  padding: 0.3rem 0.55rem;
  max-width: 100%;
  text-align: left;
  cursor: pointer;
  transition: color var(--transition-fast), border-color var(--transition-fast);
}

.query__chip:hover,
.query__chip.is-active {
  color: var(--ink);
  border-color: var(--ink-35);
}

.query__chip:focus-visible {
  outline: 2px solid var(--accent);
}

.query__results {
  list-style: none;
  margin: 0;
  padding: 0;
  border-top: 1px solid var(--rule);
}

.query__result {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.45rem 0;
  border-bottom: 1px solid var(--rule);
  font-size: 0.9rem;
}

.query__rank {
  font-size: 0.65rem;
  color: var(--accent);
}

.query__dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex-shrink: 0;
}

.query__dot.is-agents {
  background: var(--accent);
}

.query__dot.is-rag {
  background: var(--ink);
}

.query__dot.is-ml {
  background: var(--signal);
}

.query__dot.is-fullstack {
  background: var(--leaf);
}

.query__label {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

a.query__label:hover {
  color: var(--accent);
}
</style>
