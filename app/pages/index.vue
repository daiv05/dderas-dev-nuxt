<template>
  <div ref="root" class="home">
    <div class="home__story">
      <div class="home__space" aria-hidden="true">
        <EmbeddingSpace />
      </div>
      <div class="home__frame">
        <HomeHero />
        <HomeBuild />
      </div>
    </div>
    <div class="home__frame">
      <HomeWork />
      <HomeExperience />
      <HomeWriting />
      <HomeContact />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })

const root = ref<HTMLElement | null>(null)

useReveal(root)
usePageSeo('home')
</script>

<style scoped>
.home__story {
  position: relative;
}

.home__space {
  position: sticky;
  top: var(--nav-height);
  height: calc(100vh - var(--nav-height));
  margin-bottom: calc((100vh - var(--nav-height)) * -1);
  margin-left: auto;
  width: min(62vw, 980px);
  z-index: 0;
  pointer-events: none;
  -webkit-mask-image: linear-gradient(to right, transparent 0%, #000 22%);
  mask-image: linear-gradient(to right, transparent 0%, #000 22%);
}

.home__space :deep(.space__legend) {
  pointer-events: auto;
}

.home__frame {
  position: relative;
  z-index: 1;
  max-width: var(--page-max-width);
  margin: 0 auto;
  padding: 0 var(--gutter);
}

@media (max-width: 900px) {
  .home__space {
    width: 100%;
    opacity: 0.35;
    -webkit-mask-image: none;
    mask-image: none;
  }
}
</style>
