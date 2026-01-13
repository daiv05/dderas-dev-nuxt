<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const route = useRoute()
const runtimeConfig = useRuntimeConfig()

const siteUrl = computed(() =>
  typeof runtimeConfig.public.siteUrl === 'string' && runtimeConfig.public.siteUrl
    ? runtimeConfig.public.siteUrl
    : 'https://deras.dev'
)

useHead(() => {
  const link: Array<Record<string, string>> = []

  const canonicalHref = (() => {
    try {
      return new URL(route.path, siteUrl.value).toString()
    } catch {
      return ''
    }
  })()

  if (canonicalHref) {
    link.push({ rel: 'canonical', href: canonicalHref })
  }

  const localeEntries = Array.isArray(locales.value) ? locales.value : []
  for (const entry of localeEntries as any[]) {
    const code = typeof entry === 'string' ? entry : entry?.code
    if (!code) continue

    const path = switchLocalePath(code)
    if (!path) continue

    try {
      link.push({ rel: 'alternate', hreflang: code, href: new URL(path, siteUrl.value).toString() })
    } catch {
      // noop
    }
  }

  const defaultPath = switchLocalePath('en')
  if (defaultPath) {
    try {
      link.push({ rel: 'alternate', hreflang: 'x-default', href: new URL(defaultPath, siteUrl.value).toString() })
    } catch {
      // noop
    }
  }

  return {
    htmlAttrs: {
      lang: locale.value,
    },
    link,
  }
})

useSiteSeoDefaults()
</script>
