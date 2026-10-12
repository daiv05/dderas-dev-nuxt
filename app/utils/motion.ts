export interface MotionSignals {
  reducedMotion: boolean
  webgl: boolean
  saveData: boolean
  cores: number | null
}

export interface MotionDecision {
  allowMotion: boolean
  allow3d: boolean
}

/**
 * Decide si se permiten animaciones y la escena 3D a partir de las señales del navegador.
 */
export function decideMotion(signals: MotionSignals): MotionDecision {
  if (signals.reducedMotion) return { allowMotion: false, allow3d: false }
  const lowEnd = signals.cores !== null && signals.cores <= 4
  return { allowMotion: true, allow3d: signals.webgl && !signals.saveData && !lowEnd }
}
