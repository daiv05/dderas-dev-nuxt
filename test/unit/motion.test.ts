import { describe, expect, it } from 'vitest'
import { decideMotion } from '~/utils/motion'

const base = { reducedMotion: false, webgl: true, saveData: false, cores: 8 }

describe('decideMotion', () => {
  it('allows motion and 3D on capable devices', () => {
    expect(decideMotion(base)).toEqual({ allowMotion: true, allow3d: true })
  })
  it('disables everything with reduced motion', () => {
    expect(decideMotion({ ...base, reducedMotion: true })).toEqual({ allowMotion: false, allow3d: false })
  })
  it('keeps motion but disables 3D without WebGL', () => {
    expect(decideMotion({ ...base, webgl: false })).toEqual({ allowMotion: true, allow3d: false })
  })
  it('disables 3D with save-data', () => {
    expect(decideMotion({ ...base, saveData: true }).allow3d).toBe(false)
  })
  it('disables 3D with 4 or fewer cores', () => {
    expect(decideMotion({ ...base, cores: 4 }).allow3d).toBe(false)
  })
  it('allows 3D when core count is unknown', () => {
    expect(decideMotion({ ...base, cores: null }).allow3d).toBe(true)
  })
})
