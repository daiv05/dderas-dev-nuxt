---
name: css-system
description: Field Notes CSS tokens, global stylesheets and utility classes. Use when editing styles, working in app/assets/styles/*, writing <style scoped>, or touching colors, spacing, typography or dark mode.
---

# CSS System

> Global stylesheets and conventions. Token values and design rules live in the `design-system` skill.

## Key files

- `app/assets/styles/tokens.css` - design tokens (light on `:root`, dark on `html.dark`) and legacy aliases
- `app/assets/styles/reset.css` - box-sizing, body font and colors, headings, links, selection, scrollbar, reduced motion
- `app/assets/styles/layout.css` - `.page-frame`, `.page-frame-blog`, `.section-stack`, `.grid-duo`, `.sticky-panel`
- `app/assets/styles/components.css` - `.eyebrow`, `.section-title`, `.section-lead`, `.inline-meta`, `.plain-sheet`, `.list-rows`, `.chipline`, `.no-outline-button`
- `app/assets/styles/utilities.css` - `.text-muted`, `.mono`
- `app/assets/styles/markdown.css` - styles for `.markdown-body`
- `app/assets/styles/global.css` - imports tokens, reset, layout, components, markdown and utilities in that order (the only global CSS in `nuxt.config.ts`)

## Usage

```css
.card {
  border: 1px solid var(--rule);
  border-radius: var(--radius-md);
  background: var(--ink-2);
  color: var(--ink);
  transition: border-color var(--transition-fast);
}

.card:hover {
  border-color: var(--terra);
}
```

```vue
<p class="eyebrow">{{ t('work.eyebrow') }}</p>
<h1 class="section-title">{{ t('work.title') }}</h1>
<p class="section-lead">{{ t('work.lead') }}</p>
```

Component-specific styles go in `<style scoped>` using the tokens.

## Dark mode

The theme class is applied to `<html>` through `useHead` in `app/app.vue`, so dark values are plain overrides under `html.dark`.

```css
html.dark {
  --paper: #15140f;
  --ink: #ede6d6;
}
```

Components never branch on the theme in CSS; they only reference tokens.

## Restrictions

- Do not hardcode hex colors in components; use the tokens from `tokens.css`
- Do not add new global CSS files; import them from `global.css` only if they are genuinely global
- Do not use `--v-theme-*` variables or any UI-framework class; they do not exist
- Prefer the token names (`--ink`, `--rule`, `--terra`) over the legacy aliases (`--text-subtle`, `--line-soft`, `--md-*`) in new code
- Respect `prefers-reduced-motion`; `reset.css` already disables transitions and animations globally
