/**
 * Plugin de GSAP para Nuxt 4
 * Configura GSAP y ScrollTrigger solo en el cliente
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type ScrollerEl = HTMLElement | Window;

const isGsapDebugEnabled = (): boolean => {
  if (import.meta.server) return false;

  try {
    const search = typeof globalThis.location?.search === 'string' ? globalThis.location.search : '';
    const params = new URLSearchParams(search);
    if (params.get('gsapDebug') === '1') return true;

    const stored = globalThis.localStorage?.getItem('gsap:debug');
    if (stored === '1') return true;
  } catch {
    // noop
  }

  return false;
};

const gsapDebug = (...args: unknown[]) => {
  if (!isGsapDebugEnabled()) return;
  // eslint-disable-next-line no-console
  console.info('[gsap]', ...args);
};

const getScrollerEl = (scroller: HTMLElement | null | undefined): ScrollerEl => {
  return scroller ?? globalThis.window;
};

const isIntersectingViewport = (el: HTMLElement, scrollerEl: ScrollerEl) => {
  const rect = el.getBoundingClientRect();
  if (scrollerEl === globalThis.window) {
    return rect.top < globalThis.innerHeight && rect.bottom > 0;
  }
  const scrollerRect = (scrollerEl as HTMLElement).getBoundingClientRect();
  return rect.top < scrollerRect.bottom && rect.bottom > scrollerRect.top;
};

type FallbackEntry = {
  el: HTMLElement;
  scrollerEl: ScrollerEl;
  to: gsap.TweenVars;
};

const fallbackEntries = new Map<HTMLElement, FallbackEntry>();
const scrollerToElements = new Map<ScrollerEl, Set<HTMLElement>>();
const activeScrollerListeners = new Set<ScrollerEl>();

const markRevealed = (el: HTMLElement) => {
  el.dataset.gsapRevealed = '1';
};

const isRevealed = (el: HTMLElement) => el.dataset.gsapRevealed === '1';

const cleanupElement = (el: HTMLElement) => {
  const entry = fallbackEntries.get(el);
  if (!entry) return;
  fallbackEntries.delete(el);

  const set = scrollerToElements.get(entry.scrollerEl);
  if (set) {
    set.delete(el);
    if (set.size === 0) {
      scrollerToElements.delete(entry.scrollerEl);
      removeFallbackListeners(entry.scrollerEl);
    }
  }
};

const checkScroller = (scrollerEl: ScrollerEl) => {
  const set = scrollerToElements.get(scrollerEl);
  if (!set || set.size === 0) return;

  for (const el of Array.from(set)) {
    if (!el.isConnected) {
      cleanupElement(el);
      continue;
    }

    if (isRevealed(el)) {
      cleanupElement(el);
      continue;
    }

    if (!isIntersectingViewport(el, scrollerEl)) {
      continue;
    }

    const entry = fallbackEntries.get(el);
    if (!entry) {
      cleanupElement(el);
      continue;
    }

    gsap.to(el, { ...entry.to });
    markRevealed(el);
    cleanupElement(el);
  }
};

const addFallbackListeners = (scrollerEl: ScrollerEl) => {
  if (activeScrollerListeners.has(scrollerEl)) return;
  activeScrollerListeners.add(scrollerEl);

  gsapDebug('fallback:listeners:add', {
    scroller: scrollerEl === globalThis.window ? 'window' : '.shell-main/.blog-main',
  });

  const onScroll = () => checkScroller(scrollerEl);
  const onResize = () => checkScroller(scrollerEl);

  // Store handlers on the scroller element so we can remove them later.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const target: any = scrollerEl;
  target.__gsapFallbackOnScroll = onScroll;
  target.__gsapFallbackOnResize = onResize;

  if (scrollerEl === globalThis.window) {
    globalThis.addEventListener('scroll', onScroll, { passive: true });
    globalThis.addEventListener('resize', onResize, { passive: true });
  } else {
    (scrollerEl as HTMLElement).addEventListener('scroll', onScroll, { passive: true });
    globalThis.addEventListener('resize', onResize, { passive: true });
  }

  // Initial checks after layout settles (mobile toolbars/layout shift)
  checkScroller(scrollerEl);
  requestAnimationFrame(() => checkScroller(scrollerEl));
  setTimeout(() => checkScroller(scrollerEl), 250);
};

const removeFallbackListeners = (scrollerEl: ScrollerEl) => {
  if (!activeScrollerListeners.has(scrollerEl)) return;
  activeScrollerListeners.delete(scrollerEl);

  gsapDebug('fallback:listeners:remove', {
    scroller: scrollerEl === globalThis.window ? 'window' : '.shell-main/.blog-main',
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const target: any = scrollerEl;
  const onScroll = target.__gsapFallbackOnScroll;
  const onResize = target.__gsapFallbackOnResize;
  delete target.__gsapFallbackOnScroll;
  delete target.__gsapFallbackOnResize;

  if (typeof onScroll !== 'function' || typeof onResize !== 'function') return;

  if (scrollerEl === globalThis.window) {
    globalThis.removeEventListener('scroll', onScroll);
    globalThis.removeEventListener('resize', onResize);
  } else {
    (scrollerEl as HTMLElement).removeEventListener('scroll', onScroll);
    globalThis.removeEventListener('resize', onResize);
  }
};

const registerFallback = (el: HTMLElement, scrollerEl: ScrollerEl, to: gsap.TweenVars) => {
  fallbackEntries.set(el, { el, scrollerEl, to });
  let set = scrollerToElements.get(scrollerEl);
  if (!set) {
    set = new Set();
    scrollerToElements.set(scrollerEl, set);
  }
  set.add(el);
  gsapDebug('fallback:register', {
    el: el.className || el.tagName,
    scroller: scrollerEl === globalThis.window ? 'window' : '.shell-main/.blog-main',
  });
  addFallbackListeners(scrollerEl);
};

export default defineNuxtPlugin((nuxtApp) => {
  // Solo ejecutar en el cliente
  if (import.meta.client) {
    gsap.registerPlugin(ScrollTrigger);

    const safeSetup = () => {
      // En mobile a veces el layout/DOM no está listo en el primer tick.
      // Reintenta un par de veces para asegurar que .shell-main exista.
      gsapDebug('safeSetup:start', {
        hasShellMain: !!document.querySelector('.shell-main'),
        hasBlogMain: !!document.querySelector('.blog-main'),
      });
      setupGSAP({ retries: 4, delayMs: 50 });
      requestAnimationFrame(() => ScrollTrigger.refresh());
      setTimeout(() => ScrollTrigger.refresh(), 200);
    };

    nuxtApp.hook('app:mounted', () => {
      safeSetup();
    });

    // Al terminar navegación (Nuxt SPA), refrescar triggers
    nuxtApp.hook('page:finish', () => {
      safeSetup();
    });

    // Refrescar ScrollTrigger después de la carga completa
    globalThis.addEventListener('load', () => {
      setTimeout(() => ScrollTrigger.refresh(), 50);
    });

    // Limpiar al cerrar pestaña
    globalThis.addEventListener('beforeunload', () => {
      killAllScrollTriggers();
    });
  }

  return {
    provide: {
      gsap: {
        instance: gsap,
        ScrollTrigger,
        setup: setupGSAP,
        killAll: killAllScrollTriggers,
        refresh: refreshScrollTriggers,
      }
    }
  };
});

function setupGSAP(options?: { retries?: number; delayMs?: number }) {
  if (import.meta.server) return;

  const retries = options?.retries ?? 0;
  const delayMs = options?.delayMs ?? 0;

  const scroller = getMainScroller();
  if (!scroller) {
    gsapDebug('setupGSAP:no-scroller', { retries });
    if (retries > 0) {
      setTimeout(() => setupGSAP({ retries: retries - 1, delayMs }), delayMs);
    }
    return;
  }

  gsapDebug('setupGSAP:scroller', {
    className: scroller.className,
    clientHeight: scroller.clientHeight,
    scrollHeight: scroller.scrollHeight,
  });

  ScrollTrigger.defaults({
    scroller: scroller,
  });

  ScrollTrigger.config({
    autoRefreshEvents: "visibilitychange,DOMContentLoaded,load,resize",
  });
}

function killAllScrollTriggers() {
  if (import.meta.server) return;
  gsapDebug('killAllScrollTriggers');
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

  // Limpiar fallback también
  fallbackEntries.clear();
  for (const [scrollerEl] of scrollerToElements) {
    removeFallbackListeners(scrollerEl);
  }
  scrollerToElements.clear();
}

function refreshScrollTriggers() {
  if (import.meta.server) return;
  gsapDebug('refreshScrollTriggers');
  ScrollTrigger.refresh();
}

/**
 * Verifica si un elemento ya está en el viewport
 */
export function isElementInViewport(
  element: HTMLElement | null,
  scroller: HTMLElement | null = null
) {
  if (import.meta.server || !element) return false;

  const rect = element.getBoundingClientRect();
  const scrollerEl = scroller || getMainScroller() || globalThis.window;

  if (scrollerEl === globalThis.window) {
    const viewportHeight = globalThis.innerHeight || document.documentElement.clientHeight;
    const viewportWidth = globalThis.innerWidth || document.documentElement.clientWidth;
    return rect.top < viewportHeight && rect.bottom > 0 && rect.left < viewportWidth && rect.right > 0;
  }

  const scrollerRect = (scrollerEl as HTMLElement).getBoundingClientRect();
  return rect.top < scrollerRect.bottom && rect.bottom > scrollerRect.top;
}

export function clearGSAPProps(elements: HTMLElement | HTMLElement[]) {
  if (import.meta.server) return;
  
  const targets = Array.isArray(elements) ? elements : [elements];
  targets.forEach((el) => {
    if (el) {
      gsap.set(el, { clearProps: "all" });
    }
  });
}

/**
 * Obtiene el contenedor de scroll principal
 */
export function getMainScroller(): HTMLElement | null {
  if (import.meta.server) return null;
  
  return (
    document.querySelector(".shell-main") ||
    document.querySelector(".blog-main")
  );
}

/**
 * Anima elementos cuando entran al viewport.
 * - Establece estado inicial solo si el elemento no está visible.
 * - Usa ScrollTrigger.onEnter para lanzar la animación.
 */

type AnimateInOnEnterOptions = {
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  trigger?: HTMLElement | null;
  scroller?: HTMLElement | null;
  start?: string;
  once?: boolean;
};

export function animateInOnEnter(
  targets: HTMLElement | HTMLElement[],
  {
    from = {},
    to = {},
    trigger,
    scroller,
    start = "top 80%",
    once = true,
  }: AnimateInOnEnterOptions = {}
) {
  if (import.meta.server) return;
  
  const elems = Array.isArray(targets) ? targets : [targets];
  const scr = scroller || getMainScroller();

  // Filtrar elementos válidos
  const validElements = elems.filter((el): el is HTMLElement => 
    el instanceof HTMLElement && typeof el.getBoundingClientRect === 'function'
  );

  validElements.forEach((el) => {
    const visible = isElementInViewport(el, scr);
    gsapDebug('animateInOnEnter:element', {
      el: el.className || el.tagName,
      visible,
      hasScroller: !!scr,
      start,
      once,
    });
    if (visible) {
      gsap.set(el, { clearProps: "opacity,transform" });
    } else {
      gsap.set(el, { ...from });
    }

    ScrollTrigger.create({
      trigger: trigger || el,
      scroller: scr,
      start,
      once,
      onEnter: () => {
        gsapDebug('animateInOnEnter:onEnter', { el: el.className || el.tagName });
        gsap.to(el, { ...to });
      },
    });
  });
}

export const gsapDefaults = {
  ease: "power3.out",
  duration: 0.8,
  clearProps: "opacity,transform",
};

export const scrollTriggerDefaults = {
  start: "top 80%",
  once: true,
};

export { gsap } from "gsap";
export { ScrollTrigger } from "gsap/ScrollTrigger";
