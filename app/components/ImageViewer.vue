<template>
  <transition name="fade">
    <div v-if="modelValue" class="image-viewer-overlay" @click="close">
      <div class="viewer-toolbar" @click.stop>
        <v-btn
          icon
          variant="text"
          color="white"
          class="viewer-btn"
          :title="t('blog.imageViewer.download')"
          @click.stop="download"
        >
          <v-icon :icon="mdiDownload" size="28"></v-icon>
        </v-btn>
        <v-btn
          icon
          variant="text"
          color="white"
          class="viewer-btn"
          :title="t('blog.imageViewer.close')"
          @click.stop="close"
        >
          <v-icon :icon="mdiClose" size="28"></v-icon>
        </v-btn>
      </div>

      <div class="viewer-content">
        <img :src="src" :alt="alt" class="viewer-image" @click.stop />
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { mdiClose, mdiDownload } from '@mdi/js';

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

const close = () => {
  emit('update:modelValue', false);
};

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
  display: flex;
  justify-content: flex-end;
  padding: 1rem 2rem;
  gap: 1rem;
  z-index: 10000;
}

.viewer-content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 2rem 2rem;
  overflow: hidden;
}

.viewer-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 4px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  transition: transform 0.3s ease;
}

.viewer-btn {
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.viewer-btn:hover {
  background-color: rgba(255, 255, 255, 0.2);
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
