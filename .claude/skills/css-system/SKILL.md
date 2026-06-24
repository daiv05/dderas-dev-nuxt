---
name: css-system
description: CSS custom properties, utility classes and theme colors. Use when editing styles, working in app/assets/styles/*, writing <style scoped>, or touching colors, spacing or typography.
---

# CSS Style System

> Global CSS variables, utility classes and styling conventions of the project.

## Key files

- `app/assets/styles/variables.css` - global custom properties
- `app/assets/styles/reset.css` - base reset (box-sizing, fonts, body colors)
- `app/assets/styles/layout.css` - layout classes (`.page-frame`, `.page-frame-blog`, `.section-stack`)
- `app/assets/styles/components.css` - reusable component classes
- `app/assets/styles/utilities.css` - micro-utilities
- `app/assets/styles/markdown.css` - styles for `.markdown-body`
- `app/assets/styles/global.css` - imports all of the above (the only global CSS in nuxt.config)

## CSS variables (variables.css)

### Typography
```css
--font-display: 'Epilogue', sans-serif
--font-body: 'Epilogue', sans-serif
--font-mono: 'JetBrains Mono', monospace
```

### Layout
```css
--page-max-width: 1200px
--shell-padding: clamp(1.5rem, 2vw, 2.5rem)
--section-gap: clamp(4rem, 8vw, 6rem)
```

### Borders and surfaces (theme-reactive)
```css
--line-soft: rgba(var(--v-theme-on-surface), 0.15)
--line-strong: rgba(var(--v-theme-on-surface), 0.35)
--surface-faint: rgba(var(--v-theme-on-surface), 0.05)
--surface-mild: rgba(var(--v-theme-on-surface), 0.10)
--text-subtle: rgba(var(--v-theme-on-surface), 0.75)
```

### Semantic colors (mapped to Vuetify)
```css
--text-primary: rgb(var(--v-theme-on-surface))
--bg-soft: rgba(var(--v-theme-surface), 0.85)
--bg-muted: rgba(var(--v-theme-surface), 0.65)
--bg-elevated: rgb(var(--v-theme-surface))
--link: rgb(var(--v-theme-primary))
--link-hover: rgb(var(--v-theme-primary))
```

### Radii
```css
--radius-lg: 28px
--radius-md: 18px
--radius-sm: 10px
```

### Transitions
```css
--transition-fast: 160ms cubic-bezier(0.4, 0, 0.2, 1)
--transition-base: 240ms cubic-bezier(0.4, 0, 0.2, 1)
--transition-slow: 360ms cubic-bezier(0.4, 0, 0.2, 1)
```

### Markdown variables
```css
--md-text, --md-muted, --md-bg
--md-code-bg, --md-code-border, --md-code-inline-text
--md-blockquote-bg, --md-blockquote-border
--md-table-border
```

## Utility classes

### components.css
| Class | Description |
|-------|-------------|
| `.eyebrow` | Uppercase monospace label, text-subtle color |
| `.section-title` | `font-size: clamp(2.25rem, 6vw, 3.4rem)`, `letter-spacing: -0.02em` |
| `.section-lead` | `font-size: 1.15rem`, text-subtle color |
| `.inline-meta` | Flex wrap with gap, `font-size: 0.95rem` |
| `.plain-sheet` | Card with border, radius-md, padding 1.5rem |
| `.list-rows` | Grid with border-bottom separators on each `li` |
| `.chipline` | Flex wrap of chips with pill border |
| `.no-outline-button` | Pill button with border, no background (hover: surface-faint) |

### utilities.css
| Class | Description |
|-------|-------------|
| `.text-muted` | `color: var(--text-subtle)` |
| `.mono` | `font-family: var(--font-mono)` |

## Vuetify theme colors

### Dark (default)
```
primary: #859FFF    secondary: #5C7EFF    accent: #A785FF
background: #0B0E14  surface: #151920    surface-variant: #1F252C
on-surface: #EDF2F7
```

### Light
```
primary: #3451D9    secondary: #2F29B0    accent: #6600A3
background: #F8F9FC  surface: #FFFFFF    surface-variant: #E8EBF0
on-surface: #0F1419
```

## Restrictions

- Do not create your own colors; always map from `rgb(var(--v-theme-*))` to respect dark/light
- Do not add new global CSS without updating `global.css`
- Use `<style scoped lang="scss">` in Vue components (scss available)
- Do not use `!important` outside of Vuetify overrides
- The dark theme adds the `.dark` class to `<html>` (see `plugins/vuetify.ts`)
