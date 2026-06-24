# Project Skills

Reference skills that synthesize the conventions, APIs and standards of this
project (Nuxt 4 + Vuetify 4 + i18n + @nuxt/content v3 + GSAP + Pinia). They let
an agent act with full project context without re-exploring the codebase on
every task.

## How they work

Each skill lives in its own folder with a `SKILL.md` file:

```
.claude/skills/<name>/SKILL.md
```

The Claude Code harness **auto-discovers** any `.claude/skills/<name>/SKILL.md`
- no `settings.json` change is required. The frontmatter `description` is what
the harness reads to decide when a skill is relevant, so it must name the
symbols / files / tasks that should trigger loading it.

## Available skills

| Skill | Covers | Primary project files |
|-------|--------|-----------------------|
| `css-system` | CSS variables, utility classes, theme colors | `app/assets/styles/*` |
| `app-store` | Pinia store (theme/language), cookie persistence | `app/stores/app.ts` |
| `ssr-patterns` | SSR guards, hydration, useCookie, scrollers | (cross-cutting) |
| `i18n` | Bilingual EN/ES, useI18n, localePath | `app/locales/*.json`, `nuxt.config.ts` |
| `composables` | useBlog, usePageSeo, useEnterAnimations, etc. | `app/composables/*` |
| `seo` | usePageSeo(), ogType, `seo.*` locale structure | `app/composables/usePageSeo.ts`, locales |
| `gsap-animations` | GSAP plugin, animateInOnEnter, getMainScroller | `app/plugins/gsap.ts`, `app/composables/useEnterAnimations.ts` |
| `vuetify` | Vuetify 4, themes, MDI icons, useDisplay() | `app/plugins/vuetify.ts`, `app/stores/app.ts` |
| `components` | Global + content components, layouts | `app/components/*`, `app/layouts/*` |
| `data-files` | contact.ts, projects.ts, sidebar-items.ts | `app/data/*` |
| `blog-content` | Frontmatter, collections, images, Markdown features | `content/{en,es}/blog/*`, `content.config.ts` |
| `pages-and-routing` | Routes, definePageMeta, navigation, prerender | `app/pages/*`, `app/router.options.ts` |

## Maintenance

These skills are manually curated snapshots. They drift from the code unless
kept in sync.

**Rule:** when you modify a composable, component, store, style or locale,
update the corresponding `SKILL.md` **in the same commit**. Use the table above
(skill → project files) to find which skill to touch.

## Adding a new skill

1. Create a folder `.claude/skills/<name>/`.
2. Add `<name>/SKILL.md` starting with frontmatter:

   ```yaml
   ---
   name: <kebab-case>
   description: <one line, trigger-oriented - name the symbols/files/tasks that should load this skill>
   ---
   ```

3. Write the body: start with **Key files**, then API/usage with real code
   snippets, and end with a **Restrictions** section ("do not …" rules).
4. Add a row to the table above and to the project memory pointer.

## Conventions

- Frontmatter and body are written in **English**.
- Code snippets, paths and identifiers mirror the real codebase exactly.
- Cross-reference other skills as: see the `<name>` skill.
