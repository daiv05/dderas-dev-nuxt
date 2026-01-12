import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  css: ["~/assets/styles/global.css"],

  modules: [
    "@pinia/nuxt",
    "@nuxtjs/i18n",
    "@nuxt/content",
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/hints",
    "@nuxt/a11y",
  ],
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
