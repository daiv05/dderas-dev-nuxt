import { describe, expect, it } from 'vitest'
import { readThemeCookie } from '~/utils/theme'

describe('readThemeCookie', () => {
  it('reads the light theme among other cookies', () => {
    expect(readThemeCookie('language=es; theme=light; other=1')).toBe('light')
  })
  it('reads the dark theme', () => {
    expect(readThemeCookie('theme=dark')).toBe('dark')
  })
  it('returns null when the cookie is missing', () => {
    expect(readThemeCookie('language=es')).toBeNull()
  })
  it('returns null for unknown values', () => {
    expect(readThemeCookie('theme=sepia')).toBeNull()
  })
  it('does not match cookies that only end with theme', () => {
    expect(readThemeCookie('xtheme=light')).toBeNull()
  })
})
