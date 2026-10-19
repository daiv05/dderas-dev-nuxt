---
name: design-system
description: Field Notes design system - tokens, palette, typography, UiButton/UiIcon/UiDialog/UiTag primitives and icons. Use when building UI, choosing colors or fonts, adding an icon, or touching app/components/ui, app/utils/icons.ts or tokens.css.
---

# Field Notes Design System

> Cool paper and ink palette, Fraunces serif for text, JetBrains Mono for labels and UI chrome, cobalt as the single action color.

## Key files

- `app/assets/styles/tokens.css` - all tokens
- `app/components/ui/UiButton.vue`, `UiIcon.vue`, `UiDialog.vue`, `UiTag.vue` - primitives
- `app/utils/icons.ts` - `IconName` type and `iconPaths` (inline SVG path data)
- `nuxt.config.ts` - `fonts` section (Fraunces 400/600/700 normal and italic, JetBrains Mono 400/500) and `components: [{ path: "~/components", pathPrefix: false }]`

## Tokens

```css
:root {
  --paper: #eef0eb;
  --ink: #14181c;
  --muted: #565e66;
  --rule: rgba(20, 24, 28, 0.14);
  --accent: #2547b8;
  --signal: #0d8a86;
  --leaf: #6a7a2a;
  --on-accent: #ffffff;

  --font-serif: 'Fraunces', Georgia, 'Times New Roman', serif;
  --font-mono: 'JetBrains Mono', ui-monospace, 'Cascadia Code', Consolas, monospace;

  --page-max-width: 1200px;
  --reading-width: 72ch;
  --gutter: clamp(1.25rem, 4vw, 2.5rem);
  --section-gap: clamp(4rem, 9vw, 7rem);
  --nav-height: 3.5rem;

  --radius-sm: 4px;
  --radius-md: 6px;

  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --transition-fast: 160ms var(--ease-out);
  --transition-base: 260ms var(--ease-out);

  --ink-2: color-mix(in srgb, var(--ink) 2%, transparent);
  --ink-5: color-mix(in srgb, var(--ink) 5%, transparent);
  --ink-10: color-mix(in srgb, var(--ink) 10%, transparent);
  --ink-35: color-mix(in srgb, var(--ink) 35%, transparent);
}

html.dark {
  --paper: #0e1216;
  --ink: #e3e8e6;
  --muted: #949ea3;
  --rule: rgba(227, 232, 230, 0.14);
  --accent: #7c9cff;
  --signal: #4cc7bd;
  --leaf: #b7c76a;
  --on-accent: #0e1216;
}
```

Legacy aliases kept for the blog and Markdown styles: `--font-display`, `--font-body`, `--text-primary`, `--text-main`, `--text-subtle`, `--line-soft`, `--line-strong`, `--surface-faint`, `--surface-mild`, `--bg-elevated`, `--bg-soft`, `--bg-muted`, `--link`, `--link-hover`, `--radius-lg`, `--shell-padding` and the `--md-*` set.

Cluster colors of the embedding space: agents `--accent`, rag `--ink`, ml `--signal`, fullstack `--leaf`.

## Primitives

### UiButton

```vue
<UiButton variant="solid" :to="localePath('/work')">{{ t('home.work.all') }}</UiButton>
<UiButton variant="outline" size="sm" href="https://github.com/daiv05">GitHub</UiButton>
<UiButton variant="ghost" size="sm" icon-only :aria-label="t('navigation.open')" @click="open = !open">
  <UiIcon name="menu" :size="20" />
</UiButton>
```

Props: `variant?: 'solid' | 'outline' | 'ghost'` (default `outline`), `size?: 'sm' | 'md'` (default `md`), `to?: RouteLocationRaw` (renders `NuxtLink`), `href?: string` (renders `<a>`; external `http(s)` links get `target="_blank"` and `rel="noopener"`), `type?: 'button' | 'submit'` (default `button`), `iconOnly?: boolean`, `ariaLabel?: string`, `disabled?: boolean`. Without `to` or `href` it renders a `<button>`.

### UiIcon

```vue
<UiIcon name="arrow-right" :size="18" />
```

Props: `name: IconName`, `size?: number` (default 18). Renders an `aria-hidden` 24x24 SVG filled with `currentColor`.

### UiDialog

```vue
<UiDialog v-model:open="viewer.open" :label="viewer.alt">
  <img :src="viewer.src" :alt="viewer.alt" />
</UiDialog>
```

Props: `open: boolean`, `label: string`; emits `update:open`. Wraps a native `<dialog>` opened with `showModal()`; Escape and backdrop click emit `update:open` with `false`.

### UiTag

```vue
<UiTag v-for="tag in project.tags" :key="tag">{{ tag }}</UiTag>
```

Uppercase mono label with a `--rule` border; no props.

## Icons

`IconName` in `app/utils/icons.ts`: `github`, `linkedin`, `mail`, `arrow-right`, `arrow-up-right`, `arrow-up`, `arrow-left`, `menu`, `close`, `sun`, `moon`, `translate`, `zoom-in`, `zoom-out`, `restore`, `download`, `folder`, `book`, `search`, `database`.

Adding an icon: extend the `IconName` union and add its 24x24 path string to `iconPaths`.

## Restrictions

- Do not use generic fonts (Inter, Roboto, Arial, system-ui) or purple gradients; text is Fraunces and labels are JetBrains Mono
- Use `--accent` for the primary action and accents; use `--signal` and `--leaf` only as cluster or data colors
- Do not hardcode colors; both themes must work from the tokens
- Do not add an icon library; icons are inline paths in `icons.ts`
- Do not use native `<button>` or `<a>` for styled actions when `UiButton` fits
- Keep radii at `--radius-sm` and `--radius-md`
- Always pass `ariaLabel` to icon-only buttons
