import {
  gsap,
  getMainScroller,
  gsapDefaults,
  animateInOnEnter,
} from '~/plugins/gsap';

interface AnimationOptions {
  headerStart?: string;
  panelsStart?: string;
  headerTrigger?: HTMLElement | null;
  panelsTrigger?: HTMLElement | null;
  fadeHeader?: boolean;
  fadePanels?: boolean;
}

export function useEnterAnimations() {
  const label = ref<HTMLElement | null>(null);
  const titleEl = ref<HTMLElement | null>(null);
  const descriptionEl = ref<HTMLElement | null>(null);

  let panelRefs: HTMLElement[] = [];
  let ctx: gsap.Context | null = null;

  const setPanelRef = (el: any) => {
    const target = el?.$el ?? el;
    if (target && !panelRefs.includes(target)) {
      panelRefs.push(target);
    }
  };

  const resetPanelRefs = () => {
    panelRefs = [];
  };

  const setupEnterAnimations = ({
    headerStart = 'top 80%',
    panelsStart = 'top 80%',
    headerTrigger,
    panelsTrigger,
    fadeHeader = true,
    fadePanels = true,
  }: AnimationOptions = {}) => {
    const scroller = getMainScroller();
    const headerTargets = [label.value, titleEl.value, descriptionEl.value].filter(
      (el): el is HTMLElement => el !== null
    );
    const panels = panelRefs.filter((el): el is HTMLElement => el !== null);

    ctx = gsap.context(() => {
      if (headerTargets.length) {
        animateInOnEnter(headerTargets, {
          from: fadeHeader ? { opacity: 0, y: 24 } : { y: 24 },
          to: fadeHeader
            ? { ...gsapDefaults, opacity: 1, y: 0, stagger: 0.15 }
            : { ...gsapDefaults, y: 0, stagger: 0.15 },
          trigger: headerTrigger ?? titleEl.value,
          scroller,
          start: headerStart,
          once: true,
        });
      }

      if (panels.length) {
        animateInOnEnter(panels, {
          from: fadePanels ? { opacity: 0, y: 30 } : { y: 30 },
          to: fadePanels
            ? { ...gsapDefaults, opacity: 1, y: 0, stagger: 0.1 }
            : { ...gsapDefaults, y: 0, stagger: 0.1 },
          trigger: panelsTrigger,
          scroller,
          start: panelsStart,
          once: true,
        });
      }
    });
  };

  const cleanupEnterAnimations = () => {
    ctx?.revert();
    resetPanelRefs();
  };

  return {
    label,
    titleEl,
    descriptionEl,
    setPanelRef,
    resetPanelRefs,
    setupEnterAnimations,
    cleanupEnterAnimations,
  };
}

// Composable simplificado para animaciones personalizadas
export function useGsapAnimations() {
  let ctx: gsap.Context | null = null;

  const setupAnimations = (callback: () => void) => {
    // Esperar un frame ayuda en mobile (layout + scroller definidos)
    requestAnimationFrame(() => {
      ctx = gsap.context(callback);
    });
  };

  const cleanup = () => {
    ctx?.revert();
  };

  onBeforeUnmount(() => {
    cleanup();
  });

  return {
    setupAnimations,
    cleanup,
  };
}
