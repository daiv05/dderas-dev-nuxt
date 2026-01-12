<template>
  <div class="app-loader" style="z-index: 2000">
    <div class="loader">
      <span class="bar" aria-hidden="true"></span>
      <span class="bar" aria-hidden="true"></span>
      <span class="bar" aria-hidden="true"></span>
    </div>
    <p class="loader-text">{{ t('loader.message') }}</p>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n();
</script>

<style scoped>
.app-loader {
  position: fixed;
  top: 0;
  left: 0;
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(2px);
}

.loader {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.app-loader .bar {
  display: inline-block;
  width: 6px;
  height: 28px;
  border-radius: 3px;
  opacity: 0.9;
  background-color: rgb(var(--v-theme-on-surface));
  animation: pulse 1s ease-in-out infinite;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.18);
  will-change: transform, opacity;
}

.bar:nth-child(1) {
  animation-delay: 0s;
}
.bar:nth-child(2) {
  animation-delay: 0.15s;
}
.bar:nth-child(3) {
  animation-delay: 0.3s;
}

@keyframes pulse {
  0%,
  100% {
    transform: scaleY(0.7);
    opacity: 0.8;
  }
  50% {
    transform: scaleY(1.2);
    opacity: 1;
  }
}

.loader-text {
  font-size: 0.9rem;
  font-weight: 600;
  color: rgb(var(--v-theme-on-surface));
  opacity: 0.9;
}
</style>
