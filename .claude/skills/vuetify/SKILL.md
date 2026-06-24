---
name: vuetify
description: Vuetify 4 - themes, @mdi/js icons, useDisplay, components. Use when using v-* components or touching the theme.
---

# Vuetify 4

> Using Vuetify 4 in the project: themes, icons, components and SSR restrictions.

## Key files

- `app/plugins/vuetify.ts` - configuration and theme synchronization
- `app/stores/app.ts` - active theme (source of truth)

## Configuration

- Vuetify 4 with `ssr: true`
- Icons: MDI SVG (`@mdi/js`) - tree-shaking, no CDN
- Theme: synchronized with `useAppStore().theme` via watch in the plugin

## Theme colors

### Dark (default)
```
primary: #859FFF    secondary: #5C7EFF    accent: #A785FF
background: #0B0E14  surface: #151920    surface-variant: #1F252C
on-surface: #EDF2F7  on-background: #EDF2F7
error: #FCA5A5       info: #93C5FD       success: #6EE7B7   warning: #FCD34D
```

### Light
```
primary: #3451D9    secondary: #2F29B0    accent: #6600A3
background: #F8F9FC  surface: #FFFFFF    surface-variant: #E8EBF0
on-surface: #0F1419  on-background: #0F1419
error: #DC2626       info: #2563EB       success: #059669   warning: #D97706
```

## Using colors in CSS

```css
/* Access theme colors in CSS */
color: rgb(var(--v-theme-primary));
background: rgba(var(--v-theme-surface), 0.8);
border-color: rgba(var(--v-theme-on-surface), 0.15);
```

## Using icons

```ts
import { mdiHome, mdiAccount, mdiPost, mdiFolder, mdiSchool } from '@mdi/js'

// In a Vuetify template
<v-icon :icon="mdiHome" />
<v-list-item :prepend-icon="mdiAccount" />
```

Only import icons from `@mdi/js` (not `@mdi/font` or CDN).

## Changing the theme

```ts
// CORRECT: use the store (the plugin syncs with Vuetify automatically)
const appStore = useAppStore()
appStore.toggleTheme()
appStore.setTheme('light')

// INCORRECT: do not use directly
// vuetify.theme.global.name.value = 'light'  ← deprecated
```

## Dark class on HTML

The plugin adds/removes `.dark` on `<html>` when the theme changes:
```css
.dark .my-element { /* dark mode styles */ }
```

## Vuetify components used

```
v-app               - main wrapper (in layouts)
v-navigation-drawer - desktop sidebar
v-app-bar           - mobile top bar
v-list / v-list-item - navigation
v-btn               - buttons
v-chip              - chips/tags
v-slide-group       - horizontal mobile navigation
v-tooltip           - tooltips
v-divider           - separators
```

## useDisplay() - responsive

```ts
// Only available on the client or inside ClientOnly
const { mobile, mdAndUp } = useDisplay()

// In SSR it returns default values (false) - may cause mismatch
// Always use with isHydrated or inside ClientOnly
```

## Restrictions

- Do not use `vuetify.theme.global.name` (deprecated in Vuetify 4)
- Do not import icons from `@mdi/font` or CDN - only `@mdi/js`
- `useDisplay()` only works correctly on the client (see the `ssr-patterns` skill)
- Do not override theme colors with hardcoded values; use the `--v-theme-*` CSS variables
- `ssr: true` is configured - do not remove it
