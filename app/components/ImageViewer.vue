<template>
  <transition name="fade">
    <div v-if="modelValue" class="image-viewer-overlay" @click="close">
      <div class="viewer-toolbar" @click.stop>
        <v-btn
          icon
          variant="text"
          color="white"
          class="viewer-btn"
          density="compact"
          size="small"
          :title="t('blog.imageViewer.zoomOut')"
          :disabled="scale <= MIN_SCALE"
          @click.stop="zoomOut"
        >
          <v-icon :icon="mdiMagnifyMinus" size="22"></v-icon>
        </v-btn>
        <v-btn
          icon
          variant="text"
          color="white"
          class="viewer-btn"
          density="compact"
          size="small"
          :title="t('blog.imageViewer.zoomIn')"
          :disabled="scale >= MAX_SCALE"
          @click.stop="zoomIn"
        >
          <v-icon :icon="mdiMagnifyPlus" size="22"></v-icon>
        </v-btn>
        <v-btn
          icon
          variant="text"
          color="white"
          class="viewer-btn"
          density="compact"
          size="small"
          :title="t('blog.imageViewer.resetZoom')"
          :disabled="scale === 1 && translateX === 0 && translateY === 0"
          @click.stop="resetView"
        >
          <v-icon :icon="mdiRestore" size="22"></v-icon>
        </v-btn>

        <v-btn
          icon
          variant="text"
          color="white"
          class="viewer-btn"
          density="compact"
          size="small"
          :title="t('blog.imageViewer.download')"
          @click.stop="download"
        >
          <v-icon :icon="mdiDownload" size="22"></v-icon>
        </v-btn>
        <v-btn
          icon
          variant="text"
          color="white"
          class="viewer-btn"
          density="compact"
          size="small"
          :title="t('blog.imageViewer.close')"
          @click.stop="close"
        >
          <v-icon :icon="mdiClose" size="22"></v-icon>
        </v-btn>
      </div>

      <div
        ref="viewerContentRef"
        class="viewer-content"
        @wheel.prevent="onWheel"
      >
        <img
          :src="src"
          :alt="alt"
          class="viewer-image"
          :class="{ 'is-zoomed': scale > 1 }"
          :style="imageStyle"
          @click.stop
          @dblclick.stop="resetView"
          @pointerdown.stop.prevent="onPointerDown"
          @pointermove.stop.prevent="onPointerMove"
          @pointerup.stop.prevent="onPointerUp"
          @pointercancel.stop.prevent="onPointerUp"
          @pointerleave.stop.prevent="onPointerUp"
        />
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { mdiClose, mdiDownload, mdiMagnifyMinus, mdiMagnifyPlus, mdiRestore } from '@mdi/js';

interface Props {
  modelValue: boolean;
  src: string;
  alt: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  src: '',
  alt: '',
});

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
}>();

const { t } = useI18n();

const viewerContentRef = ref<HTMLElement | null>(null);

const MIN_SCALE = 1;
const MAX_SCALE = 4;
const ZOOM_STEP = 0.25;

const scale = ref(1);
const translateX = ref(0);
const translateY = ref(0);

const isDragging = ref(false);
const dragStartX = ref(0);
const dragStartY = ref(0);
const dragOriginTranslateX = ref(0);
const dragOriginTranslateY = ref(0);
const activePointerId = ref<number | null>(null);

const imageStyle = computed(() => {
  return {
    transform: `translate(${translateX.value}px, ${translateY.value}px) scale(${scale.value})`,
  };
});

const clampTranslate = (nextX: number, nextY: number) => {
  const container = viewerContentRef.value;
  if (!container || scale.value <= 1) {
    return { x: 0, y: 0 };
  }

  const rect = container.getBoundingClientRect();
  const maxX = (rect.width * (scale.value - 1)) / 2;
  const maxY = (rect.height * (scale.value - 1)) / 2;

  return {
    x: Math.max(-maxX, Math.min(maxX, nextX)),
    y: Math.max(-maxY, Math.min(maxY, nextY)),
  };
};

const setScale = (nextScale: number) => {
  const clamped = Math.max(MIN_SCALE, Math.min(MAX_SCALE, nextScale));
  scale.value = clamped;

  const clampedTranslate = clampTranslate(translateX.value, translateY.value);
  translateX.value = clampedTranslate.x;
  translateY.value = clampedTranslate.y;

  if (scale.value <= 1) {
    translateX.value = 0;
    translateY.value = 0;
  }
};

const zoomIn = () => setScale(scale.value + ZOOM_STEP);
const zoomOut = () => setScale(scale.value - ZOOM_STEP);
const resetView = () => {
  scale.value = 1;
  translateX.value = 0;
  translateY.value = 0;
};

const onWheel = (event: WheelEvent) => {
  if (!props.modelValue) return;

  // Trackpad/rueda: deltaY < 0 => acercar
  const direction = event.deltaY < 0 ? 1 : -1;
  const step = event.ctrlKey ? ZOOM_STEP / 2 : ZOOM_STEP;
  setScale(scale.value + direction * step);
};

const onPointerDown = (event: PointerEvent) => {
  if (scale.value <= 1) return;

  const target = event.currentTarget as HTMLElement | null;
  if (!target) return;

  activePointerId.value = event.pointerId;
  target.setPointerCapture(event.pointerId);
  isDragging.value = true;
  dragStartX.value = event.clientX;
  dragStartY.value = event.clientY;
  dragOriginTranslateX.value = translateX.value;
  dragOriginTranslateY.value = translateY.value;
};

const onPointerMove = (event: PointerEvent) => {
  if (!isDragging.value) return;
  if (activePointerId.value !== event.pointerId) return;

  const deltaX = event.clientX - dragStartX.value;
  const deltaY = event.clientY - dragStartY.value;
  const nextX = dragOriginTranslateX.value + deltaX;
  const nextY = dragOriginTranslateY.value + deltaY;

  const clamped = clampTranslate(nextX, nextY);
  translateX.value = clamped.x;
  translateY.value = clamped.y;
};

const onPointerUp = (event: PointerEvent) => {
  if (activePointerId.value !== event.pointerId) return;
  isDragging.value = false;
  activePointerId.value = null;
};

const close = () => {
  emit('update:modelValue', false);
};

watch(
  () => props.modelValue,
  (open) => {
    if (open) resetView();
  }
);

watch(
  () => props.src,
  () => {
    if (props.modelValue) resetView();
  }
);

const download = async () => {
  if (!props.src) return;

  if (import.meta.client) {
    try {
      const response = await fetch(props.src);
      const blob = await response.blob();
      const url = globalThis.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = props.alt || 'image';
      document.body.appendChild(a);
      a.click();
      a.remove();
      globalThis.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading image:', error);
      // Fallback
      const a = document.createElement('a');
      a.href = props.src;
      a.download = props.alt || 'image';
      a.target = '_blank';
      a.click();
    }
  }
};
</script>

<style scoped>
.image-viewer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.95);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  backdrop-filter: blur(5px);
}

.viewer-toolbar {
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  justify-content: flex-end;
  padding: 0.35rem;
  gap: 0.25rem;
  z-index: 10000;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(10px);
  opacity: 0.75;
  transition: opacity 0.2s ease, background 0.2s ease;
}

.image-viewer-overlay:hover .viewer-toolbar {
  opacity: 1;
  background: rgba(0, 0, 0, 0.32);
}

.viewer-content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  overflow: hidden;
  touch-action: none;
}

.viewer-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 4px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  transition: transform 0.3s ease;
  transform-origin: center center;
  cursor: zoom-in;
  user-select: none;
}

.viewer-image.is-zoomed {
  cursor: grab;
}

.viewer-image.is-zoomed:active {
  cursor: grabbing;
}

.viewer-btn {
  min-width: 32px;
  width: 32px;
  height: 32px;
  border-radius: 999px;
}

.viewer-btn:hover {
  opacity: 1;
  background-color: rgba(255, 255, 255, 0.12);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
