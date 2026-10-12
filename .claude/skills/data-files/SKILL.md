---
name: data-files
description: Static data - contact.ts, projects.ts, experience.ts and the generated embedding-space.json. Use when displaying contact, project or experience info, adding a project, or touching app/data.
---

# Data Files (app/data/)

> Static TypeScript data for contact, projects and experience, plus the generated embedding space.

## Key files

- `app/data/contact.ts` - owner contact information
- `app/data/projects.ts` - projects with translations and `getProject`
- `app/data/experience.ts` - experience entries
- `app/data/embedding-space.json` - generated, see the `embedding-space` skill

## contact.ts

```ts
import { contactInfo } from '~/data/contact'

contactInfo.name
contactInfo.title
contactInfo.location
contactInfo.city
contactInfo.country
contactInfo.countryCode
contactInfo.email
contactInfo.siteUrl
contactInfo.socials.github
contactInfo.socials.linkedin
```

There is no `twitter` field.

## projects.ts

```ts
import { projectList, getProject } from '~/data/projects'

export type ProjectCluster = 'agents' | 'rag' | 'ml' | 'fullstack'

export interface ProjectTranslation {
  name: string
  description: string
  longDescription: string
  client: string
  category: string
  technologies: string
  features: string[]
  metricLabel?: string
}

export interface Project {
  id: string
  date: string
  tags: string[]
  featured: boolean
  cluster: ProjectCluster
  metric: { value: string } | null
  images: Record<number, string>
  links: { live: string | null; repo: string | null; dataset: string | null }
  translations: Record<'en' | 'es', ProjectTranslation>
}
```

```ts
const { locale } = useI18n()
const lang = computed(() => (locale.value === 'es' ? 'es' : 'en'))
const project = getProject(String(route.params.slug))
const copy = computed(() => project?.translations[lang.value])
```

`getProject(id)` returns `Project | undefined`. `longDescription` paragraphs are separated by blank lines. `nuxt.config.ts` prerenders `/work/<id>` and `/es/work/<id>` for every entry in `projectList`.

## experience.ts

```ts
export interface ExperienceEntry {
  id: string
  start: string
  end: string | null
  translations: Record<'en' | 'es', { role: string; org: string; bullets: string[] }>
}
```

`experienceList: ExperienceEntry[]`; `start` and `end` use `YYYY-MM` and `end: null` means present.

## Adding a project

1. Add an entry to `projectList` with both `en` and `es` translations, a `cluster`, `featured`, `metric` (or `null`) and `links`
2. Regenerate the embedding space (see the `embedding-space` skill)
3. Run `npm test` (`test/unit/projects.test.ts` validates the list)

## Restrictions

- Do not hardcode email or social URLs; import `contactInfo`
- Every project and experience entry needs both `en` and `es` translations
- `cluster` must be one of `agents`, `rag`, `ml`, `fullstack`
- Do not use `useBlog()` for projects; they are static
- Do not edit `embedding-space.json` by hand
