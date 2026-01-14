type SeoValue = string | (() => string)

type PageSeoOptions = {
  title?: SeoValue
  description?: SeoValue
  ogType?: 'website' | 'article'
  image?: SeoValue
  keywords?: SeoValue
}

const resolveSeoValue = (value: SeoValue | undefined, fallback: () => string): (() => string) => {
  if (typeof value === 'function') return value
  if (typeof value === 'string') return () => value
  return fallback
}

const joinKeywords = (keywords: unknown): string | undefined => {
  if (!Array.isArray(keywords)) return undefined
  const flattened = keywords
    .map((k) => (typeof k === 'string' ? k.trim() : ''))
    .filter(Boolean)
  return flattened.length ? flattened.join(', ') : undefined
}

export function usePageSeo(pageKey: string, options: PageSeoOptions = {}) {
  const { t, tm, locale } = useI18n()
  const route = useRoute()

  const { url: siteUrl } = useSiteConfig()

  const ogLocale = computed(() => (locale.value === 'es' ? 'es_ES' : 'en_US'))

  const title = resolveSeoValue(options.title, () => t(`seo.pages.${pageKey}.title`))
  const description = resolveSeoValue(
    options.description,
    () => t(`seo.pages.${pageKey}.description`)
  )

  const image = resolveSeoValue(options.image, () => siteUrl + t('seo.defaults.ogImage'))

  const keywords = resolveSeoValue(options.keywords, () => {
    const raw = tm(`seo.pages.${pageKey}.keywords`)
    if (Array.isArray(raw)) {
      return joinKeywords(raw.filter((k): k is string => typeof k === 'string')) || ''
    }

    const defaults = tm('seo.defaults.keywords')
    if (Array.isArray(defaults)) {
      return joinKeywords(defaults.filter((k): k is string => typeof k === 'string')) || ''
    }

    return ''
  })

  const ogUrl = computed(() => {
    try {
      return new URL(route.path, siteUrl).toString()
    } catch {
      return undefined
    }
  })

  useSeoMeta({
    title,
    description,
    keywords,

    ogSiteName: () => t('seo.siteName'),
    ogLocale: () => ogLocale.value,
    ogType: options.ogType ?? 'website',
    ogUrl: () => ogUrl.value,
    ogTitle: title,
    ogDescription: description,
    ogImage: image,
    ogImageAlt: () => t('seo.defaults.ogImageAlt'),

    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: image,
  })
}
