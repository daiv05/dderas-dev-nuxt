import { decideMotion } from '~/utils/motion'

const hasWebGL = () => {
  try {
    const canvas = document.createElement('canvas')
    return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    return false
  }
}

/**
 * Expone si el visitante admite animaciones y la escena 3D; en servidor ambos son falsos hasta montar en cliente.
 */
export function useMotionPreference() {
  const allowMotion = useState('motion:allow', () => false)
  const allow3d = useState('motion:allow3d', () => false)
  const ready = useState('motion:ready', () => false)

  onMounted(() => {
    if (ready.value) return
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
    const decision = decideMotion({
      reducedMotion: globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches,
      webgl: hasWebGL(),
      saveData: connection?.saveData === true,
      cores: typeof navigator.hardwareConcurrency === 'number' ? navigator.hardwareConcurrency : null,
    })
    allowMotion.value = decision.allowMotion
    allow3d.value = decision.allow3d
    ready.value = true
  })

  return { allowMotion, allow3d, ready }
}
