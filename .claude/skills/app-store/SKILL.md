---
name: app-store
description: Global Pinia store (useAppStore) for theme and language with cookie persistence. Use when changing theme or language, or touching app/stores/app.ts.
---

# App Store (Pinia)

> Global app store: theme and language with SSR-safe cookie persistence.

## Key files

- `app/stores/app.ts` - store definition

## API

```ts
const appStore = useAppStore()  // auto-imported by Nuxt

// Types
type ThemeName = 'dark' | 'light'
type LanguageCode = 'en' | 'es'

// Reactive state (backed by useCookie)
appStore.theme     // ThemeName - default: 'dark'
appStore.language  // LanguageCode - default: 'en'

// Methods
appStore.setTheme('light')
appStore.toggleTheme()
appStore.setLanguage('es')
```

## Persistence

- `theme` and `language` use `useCookie()` - SSR-safe, no hydration mismatch
- Cookies: `theme` and `language`, both with `sameSite: 'lax'`
- The store is initialized before Vuetify (`app:mounted` hook)

## Theme change

```ts
// Change theme (Vuetify syncs automatically via watch in plugins/vuetify.ts)
appStore.toggleTheme()
appStore.setTheme('light')

// The plugin also adds/removes the .dark class on <html>
```

## Language change

```ts
// ALWAYS call setLocale() in addition to setLanguage() to sync i18n
const { setLocale } = useI18n()
const appStore = useAppStore()

appStore.setLanguage('es')
setLocale('es')
```

## Restrictions

- Do not call `vuetify.theme.change()` or `vuetify.theme.global.name` directly from components
- Do not read `localStorage` for the theme; use the store
- Changing language requires both `setLanguage()` (store) and `setLocale()` (i18n)
- Do not import the store with `import { useAppStore } from '~/stores/app'` - Nuxt auto-imports it
