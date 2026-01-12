import { defineContentConfig, defineCollection, z } from '@nuxt/content'

// Schema común para todas las collections
const blogSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  slug: z.string().optional(), // El slug puede ser opcional, se generará automáticamente
  date: z.string(),
  lastmod: z.string().optional(),
  author: z.string().optional(),
  tags: z.array(z.string()).optional(),
  summary: z.string().optional(),
  image: z.string().optional()
})

export default defineContentConfig({
  collections: {
    // Collection para contenido en inglés
    content_en: defineCollection({
      type: 'page',
      source: {
        include: 'en/**/*.md',
        prefix: '/blog'
      },
      schema: blogSchema
    }),
    // Collection para contenido en español
    content_es: defineCollection({
      type: 'page',
      source: {
        include: 'es/**/*.md',
        prefix: '/blog'
      },
      schema: blogSchema
    })
  }
})
