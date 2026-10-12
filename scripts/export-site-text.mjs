import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { experienceList } from '../app/data/experience.ts'
import { projectList } from '../app/data/projects.ts'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const blogDir = join(root, 'content', 'en', 'blog')
const outFile = join(root, 'scripts', '.cache', 'site-text.json')

const MIN_PARAGRAPH = Number(process.env.MIN_PARAGRAPH ?? 80)
const MAX_PARAGRAPHS_PER_POST = 40

const capabilities = {
  agents: [
    'Agent runtime with administrable skills and lifecycle hooks',
    'Internal tool registry for safe tool calling',
    'Model Context Protocol client for external tool servers',
    'Queued agent executions with events and user interactions',
    'Provider-agnostic LLM layer with Claude, Gemini and OpenAI-compatible drivers',
    'Automatic model fallback when a provider fails',
    'Layered prompt assembly and conversation memory',
    'Guardrails against prompt injection, prompt leaks and PII exposure',
    'Per-turn observability of token cost, latency and tool calls',
    'Human handoff queues with service level agreements',
  ],
  rag: [
    'Retrieval-augmented generation pipelines in production',
    'Layout-aware document chunking with Docling',
    'Token-aware chunks annotated with headings and page numbers',
    'Embeddings indexed with HNSW in PostgreSQL pgvector',
    'Hybrid semantic and full-text search',
    'Spanish full-text search over conversation history',
    'Embedding-based routing across specialized assistants',
    'FastAPI microservice for document extraction',
    'Knowledge base ingestion from PDF, DOCX and PPTX',
    'Semantic search over activities, places and documents',
  ],
  ml: [
    'Computer vision classifier deployed offline on Android',
    'Int8 quantized TensorFlow Lite model for edge devices',
    'Leave-one-source-out evaluation and leakage audits',
    'Fairness audit across lab and field images',
    'Hyperparameter search with Optuna and K-fold cross-validation',
    'Out-of-distribution detection with Mahalanobis distance',
    'Soft-voting ensembles for server-side inference',
    'ONNX and TFLite numerical parity checks',
    'Statistical tests and probability for machine learning',
    'Exploratory data analysis and honest model evaluation',
  ],
  fullstack: [
    'Laravel APIs with JWT authentication and role-based access',
    'Vue 3 frontends with Pinia and Vuetify',
    'Node.js and Express microservices',
    'Google Cloud Run, Cloud Tasks and Pub/Sub deployments',
    'PostgreSQL, MongoDB and Redis data layers',
    'Messaging channels on Telegram and WhatsApp',
    'Progressive web apps with audit logs and dashboards',
    'Desktop apps with Tauri and Rust',
    'Static sites with Nuxt, content collections and i18n',
    'Excel bulk imports, PDF generation and real-time WebSockets',
  ],
}

const queries = [
  'production RAG pipelines',
  'agent tool calling with MCP',
  'computer vision on the edge',
  'full stack platforms on Google Cloud',
  'honest model evaluation',
]

const classify = (text) => {
  const t = text.toLowerCase()
  if (/agent|harness|mcp|tool/.test(t)) return 'agents'
  if (/rag|retrieval|embedding|chunk|search/.test(t)) return 'rag'
  if (/model|vision|classifier|\bml\b/.test(t)) return 'ml'
  return 'fullstack'
}

const items = []

for (const p of projectList) {
  const en = p.translations.en
  items.push({
    id: `project:${p.id}`,
    label: en.name,
    cluster: p.cluster,
    href: `/work/${p.id}`,
    weight: p.featured ? 1 : 0.6,
    text: [en.name, en.description, ...en.features].join('. '),
  })
}

for (const e of experienceList) {
  e.translations.en.bullets.forEach((bullet, n) => {
    items.push({
      id: `exp:${e.id}:${n}`,
      label: e.translations.en.role,
      cluster: classify(bullet),
      href: '/#experience',
      weight: 0.5,
      text: bullet,
    })
  })
}

for (const [cluster, phrases] of Object.entries(capabilities)) {
  phrases.forEach((phrase, n) => {
    items.push({ id: `cap:${cluster}:${n}`, label: phrase, cluster, href: '/#build', weight: 0.8, text: phrase })
  })
}

const stripFrontmatter = (md) => md.replace(/^---[\s\S]*?\n---\s*/, '')
const frontmatterValue = (md, key) => {
  const m = md.match(new RegExp(`^${key}:\\s*['"]?(.+?)['"]?\\s*$`, 'm'))
  return m ? m[1] : null
}

for (const file of readdirSync(blogDir).filter((f) => f.endsWith('.md'))) {
  const md = readFileSync(join(blogDir, file), 'utf8')
  const slug = frontmatterValue(md, 'slug') ?? file.replace(/\.md$/, '')
  const title = frontmatterValue(md, 'title') ?? slug
  const cluster = /vue|vite/.test(slug) ? 'fullstack' : 'ml'
  const body = stripFrontmatter(md)
    .replace(/```[\s\S]*?```/g, '')
    .replace(/\$\$[\s\S]*?\$\$/g, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/<[^>]+>/g, '')
  const paragraphs = body
    .split(/\n\s*\n/)
    .map((p) => p.replace(/[#>*_`|-]+/g, ' ').replace(/\s+/g, ' ').trim())
    .filter((p) => p.length >= MIN_PARAGRAPH)
    .slice(0, MAX_PARAGRAPHS_PER_POST)
  paragraphs.forEach((text, n) => {
    items.push({ id: `blog:${slug}:${n}`, label: title, cluster, href: `/blog/${slug}`, weight: 0.3, text })
  })
}

mkdirSync(dirname(outFile), { recursive: true })
writeFileSync(outFile, JSON.stringify({ items, queries }, null, 2))
console.log(`items: ${items.length}`)
