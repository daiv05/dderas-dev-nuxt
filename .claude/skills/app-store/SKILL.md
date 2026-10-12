---
name: app-store
description: Global Pinia store (useAppStore) for theme and language with cookie persistence. Use when changing theme or language, or touching app/stores/app.ts or the theme class in app.vue.
---

# App Store (Pinia)

> Global store for theme and language with SSR-safe cookie persistence.

## Key files

- `app/stores/app.ts` - store definition
- `app/app.vue` - applies the theme class to `<html>` through `useHead` and injects `themeBootScript` in the head
- `app/utils/theme.ts` - `readThemeCookie(cookie)` and `themeBootScript`
- `app/plugins/theme.client.ts` - restores the saved theme into the store before hydration
- `app/components/ThemeToggle.vue`, `app/components/LocaleToggle.vue` - consumers

## API

```ts
const appStore = useAppStore()

type ThemeName = 'dark' | 'light'
type LanguageCode = 'en' | 'es'

appStore.theme
appStore.language

appStore.setTheme('light')
appStore.toggleTheme()
appStore.setLanguage('es')
```

`theme` defaults to `'dark'` and `language` to `'en'`; both are `useCookie` refs with `sameSite: 'lax'` (cookies `theme` and `language`).

## Theme application

```ts
useHead(() => {
  return {
    htmlAttrs: {
      lang: locale.value,
      class: appStore.theme === 'dark' ? 'dark' : ''
    },
  }
})
```

The `dark` class on `<html>` activates the `html.dark` overrides in `tokens.css`. The site is prerendered with the default `dark` theme, so two client pieces restore the visitor's choice: `themeBootScript` toggles the class from the `theme` cookie before the first paint, and `theme.client.ts` (which depends on the `pinia` plugin) writes the cookie value into the store, overriding the prerendered payload state. The embedding canvas observes `class` attribute changes on `<html>` to repaint.

## Language change

```ts
const { setLocale } = useI18n()
const appStore = useAppStore()

appStore.setLanguage('es')
setLocale('es')
```

`LocaleToggle` navigates with `switchLocalePath` instead.

## Restrictions

- Do not toggle the `dark` class manually; change the store
- Do not read `localStorage` for the theme; use the store
- Changing language programmatically requires both `setLanguage()` and `setLocale()`
- Do not import the store manually; Nuxt auto-imports `useAppStore`
- Wrap theme-dependent icons in `ClientOnly` with a fallback, as `ThemeToggle` does
