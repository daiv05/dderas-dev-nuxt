---
name: data-files
description: Static data - contact.ts, projects.ts, sidebar-items.ts. Use when displaying contact/projects info or adding navigation items.
---

# Data Files (app/data/)

> Static TypeScript data for contact, projects and navigation.

## Files

- `app/data/contact.ts` - owner contact information
- `app/data/projects.ts` - array of projects with translations
- `app/data/sidebar-items.ts` - sidebar navigation items

---

## contact.ts

```ts
import { contactInfo } from '~/data/contact'

// Available fields
contactInfo.name          // string
contactInfo.title         // 'Full Stack Developer'
contactInfo.location      // 'San Salvador, El Salvador'
contactInfo.city          // 'San Salvador'
contactInfo.country       // 'El Salvador'
contactInfo.countryCode   // 'SV'
contactInfo.email         // 'david@deras.dev'
contactInfo.siteUrl       // 'https://deras.dev' (or NUXT_PUBLIC_SITE_URL)
contactInfo.socials.github    // 'https://github.com/daiv05'
contactInfo.socials.linkedin  // 'https://linkedin.com/in/dderas'
contactInfo.socials.twitter   // 'https://twitter.com/daiv_09'
```

Do not hardcode these values in components; always import from this file.

---

## sidebar-items.ts

```ts
import { sidebarItems, type SidebarItem } from '~/data/sidebar-items'

interface SidebarItem {
  titleKey: string       // i18n key, e.g. 'navigation.items.home'
  value: string          // unique identifier, e.g. 'home'
  icon: string           // SVG path from @mdi/js
  to: string             // route without localePath (applied in the layout)
  openInNewTab?: boolean
}
```

### Current items

| value | to | titleKey |
|-------|----|----|
| `home` | `/` | `navigation.items.home` |
| `about` | `/about` | `navigation.items.about` |
| `projects` | `/projects` | `navigation.items.projects` |
| `blog` | `/blog` | `navigation.items.blog` |
| `resources` | `/resources` | `navigation.items.resources` |

### Adding a new item

```ts
// 1. In sidebar-items.ts:
import { mdiNewIcon } from '@mdi/js'

{ titleKey: 'navigation.items.new', value: 'new', icon: mdiNewIcon, to: '/new' }

// 2. In app/locales/en.json and es.json → navigation.items.new: "..."
```

---

## projects.ts

```ts
import { projects } from '~/data/projects'

// Structure (with en/es translations)
interface Project {
  id: string
  title: string
  description: { en: string; es: string }
  tags: string[]
  url?: string
  github?: string
  image?: string
  featured?: boolean
}
```

To display with the current locale:
```ts
const { locale } = useI18n()
const description = project.description[locale.value as 'en' | 'es']
```

---

## Restrictions

- Do not hardcode email, social network URLs or siteUrl - import from `contact.ts`
- Do not modify `sidebar-items.ts` without adding the corresponding i18n key in both locales
- The data in `projects.ts` is static; do not use `useBlog()` for projects
