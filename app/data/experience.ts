export interface ExperienceEntry {
  id: string
  start: string
  end: string | null
  translations: Record<'en' | 'es', { role: string; org: string; bullets: string[] }>
}

export const experienceList: ExperienceEntry[] = [
  {
    id: 'innovacion-swe',
    start: '2024-01',
    end: null,
    translations: {
      en: {
        role: 'Software Engineer (Full Stack & AI)',
        org: 'Secretaría de Innovación de la Presidencia',
        bullets: [
          'Built LLM agent-harness components (runtime, skills, tool registry, lifecycle hooks, MCP client, queued executions) for a multi-tenant platform designed to serve 200+ public institutions.',
          'Built RAG pipelines: Docling-based document chunking in a FastAPI microservice, Gemini embeddings indexed with HNSW in PostgreSQL/pgvector, and hybrid semantic and full-text search.',
          'Developed tool-calling assistants on a provider-agnostic LLM layer (Claude, Gemini, OpenAI-compatible) with automatic fallback, guardrails and per-turn token-cost observability.',
          'Built Laravel and Node.js microservices, REST APIs and Vue.js/Vuetify frontends for thousands of interactions across web, Telegram and WhatsApp.',
        ],
      },
      es: {
        role: 'Ingeniero de Software (Full Stack e IA)',
        org: 'Secretaría de Innovación de la Presidencia',
        bullets: [
          'Desarrollé componentes del harness de agentes LLM (runtime, skills, registro de herramientas, hooks, cliente MCP, ejecuciones en cola) para una plataforma multi-tenant diseñada para 200+ instituciones públicas.',
          'Construí pipelines RAG: fragmentación de documentos con Docling en un microservicio FastAPI, embeddings de Gemini indexados con HNSW en PostgreSQL/pgvector y búsqueda híbrida semántica y de texto completo.',
          'Desarrollé asistentes con llamadas a herramientas sobre una capa LLM agnóstica al proveedor (Claude, Gemini, compatible con OpenAI) con respaldo automático, guardrails y observabilidad de costos por turno.',
          'Desarrollé microservicios en Laravel y Node.js, APIs REST y frontends en Vue.js y Vuetify para miles de interacciones en web, Telegram y WhatsApp.',
        ],
      },
    },
  },
  {
    id: 'innovacion-intern',
    start: '2023-06',
    end: '2023-12',
    translations: {
      en: {
        role: 'Frontend Developer Intern',
        org: 'Secretaría de Innovación de la Presidencia',
        bullets: ['Built Vue.js and Vuetify interfaces integrated with REST APIs for institutional web systems.'],
      },
      es: {
        role: 'Pasante de Desarrollo Frontend',
        org: 'Secretaría de Innovación de la Presidencia',
        bullets: ['Desarrollé interfaces en Vue.js y Vuetify integradas con APIs REST para sistemas web institucionales.'],
      },
    },
  },
  {
    id: 'freelance-erp',
    start: '2023-03',
    end: '2023-12',
    translations: {
      en: {
        role: 'Full Stack Developer',
        org: 'Freelance (Retail & Warehouse Client)',
        bullets: ['Built a custom ERP for inventory, HR, finance and administrative workflows using Scrum.'],
      },
      es: {
        role: 'Desarrollador Full Stack',
        org: 'Freelance (Cliente de Retail y Bodega)',
        bullets: ['Desarrollé un ERP a medida para inventario, RR. HH., finanzas y procesos administrativos con Scrum.'],
      },
    },
  },
]
