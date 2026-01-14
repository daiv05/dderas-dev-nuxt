import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

const SITE_URL = import.meta.env.NUXT_PUBLIC_SITE_URL || "https://deras.dev";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/sitemap.xml', '/robots.txt'],
    },
  },
  
  site: {
    url: SITE_URL,
    name: "DDeras",
    description:
      "Personal website and blog of David Deras - Full-Stack Developer",
  },

  sitemap: {
    xslColumns: [
      { label: 'URL', width: '50%' },
      { label: 'Last Modified', select: 'sitemap:lastmod', width: '25%' },
      { label: 'Priority', select: 'sitemap:priority', width: '12.5%' },
      { label: 'Change Frequency', select: 'sitemap:changefreq', width: '12.5%' },
      { label: 'Hreflangs', select: 'count(xhtml:link)', width: '25%' },
    ],
    zeroRuntime: true,
  },

  runtimeConfig: {
    public: {
      siteUrl: SITE_URL,
    },
  },

  app: {
    head: {
      title: "DDeras",
      titleTemplate: "%s · DDeras",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "color-scheme", content: "dark light" },
        { name: "format-detection", content: "telephone=no" },
      ],
    },
  },

  css: ["~/assets/styles/global.css"],

  modules: [
    "@pinia/nuxt",
    "@nuxtjs/i18n",
    "@nuxtjs/sitemap",
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/hints",
    "@nuxt/a11y",
  ],
  router: {
    options: {
      scrollBehaviorType: "smooth",
    },
  },
  content: {
    build: {
      markdown: {
        highlight: {
          theme: {
            default: "vitesse-light",
            dark: "vitesse-dark",
          },
          preload: ["vue", "javascript", "typescript", "json", "bash", "shell"],
        },
        toc: {
          depth: 3,
          searchDepth: 3,
        },
      },
    },
  },
  i18n: {
    strategy: "prefix_except_default",
    defaultLocale: "en",
    restructureDir: "app",
    langDir: "locales",
    lazy: false,
    baseUrl: SITE_URL,
    locales: [
      { code: "en", language: "en-US", name: "English", file: "en.json" },
      { code: "es", language: "es-ES", name: "Español", file: "es.json" },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "language",
      redirectOn: "root",
      alwaysRedirect: false,
      fallbackLocale: "en",
    },
    bundle: {
      optimizeTranslationDirective: false,
    },
  },
  build: {
    transpile: ["vuetify"],
  },
  vite: {
    ssr: {
      noExternal: ["vuetify"],
    },
    plugins: [vuetify({ autoImport: true })],
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
});
