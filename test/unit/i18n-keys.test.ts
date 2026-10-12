import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { describe, expect, it } from 'vitest'

import en from '~/locales/en.json'
import es from '~/locales/es.json'

const appDir = fileURLToPath(new URL('../../app', import.meta.url))

const sourceFiles = (dir: string): string[] =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) return sourceFiles(path)
    return /\.(vue|ts)$/.test(name) ? [path] : []
  })

const usedKeys = () => {
  const keys = new Set<string>()
  for (const file of sourceFiles(appDir)) {
    const text = readFileSync(file, 'utf8')
    for (const match of text.matchAll(/\b(?:t|tm)\(\s*['"]([a-zA-Z][\w.]*)['"]/g)) keys.add(match[1]!)
  }
  return [...keys]
}

const has = (messages: unknown, key: string) =>
  key.split('.').reduce<unknown>((node, part) => (node && typeof node === 'object' ? (node as Record<string, unknown>)[part] : undefined), messages) !== undefined

describe('i18n keys', () => {
  const keys = usedKeys()

  it('finds literal keys in the source', () => {
    expect(keys.length).toBeGreaterThan(20)
  })

  it('every literal key used in app/ exists in en.json', () => {
    expect(keys.filter((k) => !has(en, k))).toEqual([])
  })

  it('every literal key used in app/ exists in es.json', () => {
    expect(keys.filter((k) => !has(es, k))).toEqual([])
  })
})
