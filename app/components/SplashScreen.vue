<template>
  <div v-if="visible" ref="overlayRef" class="splash-overlay">
    <svg
      viewBox="0 0 130 75"
      class="daiv-svg"
      aria-hidden="true"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!--
        Each <path> is a single continuous stroke for one letter.
        stroke-dashoffset animation draws them sequentially via GSAP.
        Coordinates (viewBox 0 0 130 75):
          baseline y≈58, x-height y≈35, cap height y≈12
      -->

      <!-- D — capital italic cursive, oval bowl -->
      <path
        class="daiv-path"
        d="M 14,58
           C 12,44 12,24 18,14
           C 22,6 32,4 40,8
           C 50,12 56,24 54,38
           C 52,52 44,62 34,64
           C 24,66 16,60 14,58"
      />

      <!-- a — lowercase cursive with loop, exits right as downstroke -->
      <path
        class="daiv-path"
        d="M 54,38
           C 56,28 64,26 68,32
           C 74,22 82,22 82,32
           C 82,44 76,56 68,58
           C 60,60 54,52 56,46
           C 58,40 66,38 76,40
           L 78,58"
      />

      <!-- i — short upstroke and downstroke -->
      <path
        class="daiv-path"
        d="M 80,56
           C 82,46 84,38 86,36
           L 88,58"
      />

      <!-- i dot — appears with a pop after the i stem -->
      <circle class="daiv-dot" cx="86" cy="27" r="2.2" />

      <!-- v — two diagonals meeting at the base -->
      <path
        class="daiv-path"
        d="M 88,38
           C 92,46 96,56 100,60
           C 104,54 108,44 116,38"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
import gsap from 'gsap'

const overlayRef = ref<HTMLElement | null>(null)
const visible = ref(true)

onMounted(async () => {
  await nextTick()

  const overlay = overlayRef.value
  if (!overlay) return

  const paths = overlay.querySelectorAll<SVGPathElement>('.daiv-path')
  const dot = overlay.querySelector<SVGCircleElement>('.daiv-dot')

  // Set up stroke-dasharray/dashoffset so each path starts invisible
  paths.forEach(path => {
    const len = path.getTotalLength()
    gsap.set(path, { strokeDasharray: len, strokeDashoffset: len })
  })
  if (dot) {
    gsap.set(dot, { scale: 0, transformOrigin: '50% 50%' })
  }

  const tl = gsap.timeline({
    onComplete: () => {
      visible.value = false
    },
  })

  // Draw each letter stroke sequentially
  tl.to(paths, {
    strokeDashoffset: 0,
    duration: 1.1,
    stagger: 0.2,
    ease: 'power2.inOut',
  })

  // Pop in the i-dot slightly before the i stroke finishes
  if (dot) {
    tl.to(dot, { scale: 1, duration: 0.18, ease: 'back.out(2)' }, '-=0.5')
  }

  // Hold the completed signature briefly
  tl.to({}, { duration: 0.35 })

  // Fade the whole overlay out
  tl.to(overlay, {
    opacity: 0,
    duration: 0.45,
    ease: 'power2.in',
  })
})
</script>

<style scoped>
.splash-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgb(var(--v-theme-background));
  display: flex;
  align-items: center;
  justify-content: center;
}

.daiv-svg {
  width: min(260px, 60vw);
  overflow: visible;
}

.daiv-path {
  fill: none;
  stroke: rgb(var(--v-theme-primary));
  stroke-width: 2.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.daiv-dot {
  fill: rgb(var(--v-theme-primary));
}
</style>
