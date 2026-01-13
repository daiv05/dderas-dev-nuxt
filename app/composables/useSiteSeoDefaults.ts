const normalizeTwitterHandle = (handle: string): string => {
  const trimmed = handle.trim()
  if (!trimmed) return ''
  return trimmed.startsWith('@') ? trimmed : `@${trimmed}`
}

const joinKeywords = (keywords: unknown): string | undefined => {
  if (!Array.isArray(keywords)) return undefined
  const flattened = keywords
    .map((k) => (typeof k === 'string' ? k.trim() : ''))
    .filter(Boolean)
  return flattened.length ? flattened.join(', ') : undefined
}

export function useSiteSeoDefaults() {
  const { t, tm, rt, locale } = useI18n()
  const route = useRoute()
  const runtimeConfig = useRuntimeConfig()

  const siteUrl = computed(() =>
    typeof runtimeConfig.public.siteUrl === 'string' && runtimeConfig.public.siteUrl
      ? runtimeConfig.public.siteUrl
      : 'https://deras.dev'
  )

  const twitterHandle = computed(() => normalizeTwitterHandle(t('seo.twitterHandle')))

  const keywords = computed(() => {
    const raw = tm('seo.defaults.keywords')
    if (!Array.isArray(raw)) return undefined
    return joinKeywords(raw.map((k) => (typeof k === 'string' ? k : rt(k))))
  })

  const ogLocale = computed(() => (locale.value === 'es' ? 'es_ES' : 'en_US'))

  const ogUrl = computed(() => {
    try {
      return new URL(route.path, siteUrl.value).toString()
    } catch {
      return undefined
    }
  })

  useSeoMeta({
    title: () => t('seo.defaults.title'),
    description: () => t('seo.defaults.description'),
    keywords: () => keywords.value,
    author: () => t('seo.defaults.author'),

    ogSiteName: () => t('seo.siteName'),
    ogLocale: () => ogLocale.value,
    ogType: 'website',
    ogUrl: () => ogUrl.value,
    ogTitle: () => t('seo.defaults.title'),
    ogDescription: () => t('seo.defaults.description'),
    ogImage: () => t('seo.defaults.ogImage'),
    ogImageAlt: () => t('seo.defaults.ogImageAlt'),

    twitterCard: 'summary_large_image',
    twitterSite: () => twitterHandle.value,
    twitterCreator: () => twitterHandle.value,
    twitterTitle: () => t('seo.defaults.title'),
    twitterDescription: () => t('seo.defaults.description'),
    twitterImage: () => t('seo.defaults.ogImage'),

    robots: 'index,follow',
  })
}
