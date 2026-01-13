<template>
  <section class="hero-shell">
    <v-container fluid class="hero-grid">
      <v-row class="hero-row" align="stretch">
        <v-col cols="12" md="6" class="hero-col">
          <div ref="copyBlock" class="hero-copy">
            <p class="eyebrow" data-animate>{{ t("hero.eyebrow") }}</p>
            <h1 class="hero-title" data-animate>
              {{ t("hero.title") }}
              <span class="hero-emphasis">
                {{ t("hero.highlight") }}
              </span>
            </h1>
            <p class="role-line" data-animate>
              <span class="role-label mono">{{ t("hero.roleLabel") }}</span>
              <span ref="roleTicker" class="role-value">{{ currentRole }}</span>
            </p>
            <p class="hero-lead" data-animate>
              {{ t("hero.lead") }}
            </p>

            <div ref="ctaGroup" class="hero-actions">
              <v-btn
                color="primary"
                variant="flat"
                rounded="pill"
                size="large"
                class="text-none"
                @click="goToProjects"
              >
                {{ t("hero.ctas.primary") }}
              </v-btn>
              <v-btn
                variant="outlined"
                rounded="pill"
                size="large"
                class="text-none"
                :href="`mailto:${contactInfo.email}`"
              >
                {{ t("hero.ctas.secondary") }}
              </v-btn>
            </div>

            <div ref="ledgerBlock" class="hero-ledger">
              <div class="ledger-title">{{ t("hero.agendaTitle") }}</div>
              <div class="ledger-grid no-auto-fit">
                <div
                  v-for="item in agenda"
                  :key="item.title"
                  class="ledger-item"
                >
                  <span class="label">{{ item.status }}</span>
                  <span class="value mono">{{ item.title }}</span>
                </div>
              </div>
            </div>
          </div>
        </v-col>

        <v-col cols="12" md="6" class="hero-col">
          <div ref="boardBlock" class="hero-board">
            <div class="board-section" data-animate>
              <div class="ledger-title">{{ t("hero.stackTitle") }}</div>
              <div class="stack-groups">
                <div
                  v-for="group in stackGroups"
                  :key="group.name"
                  class="stack-group"
                >
                  <div class="stack-group-title">
                    <span
                      class="stack-group-dot"
                      :style="{ background: group.color }"
                    ></span>
                    <span class="mono">{{ group.name }}</span>
                  </div>

                  <div class="tech-cloud">
                    <component
                      is="div"
                      v-for="tech in group.techs"
                      :key="tech.id"
                      :class="['tech-badge', { 'is-svg': tech.kind === 'svg' }]"
                      :style="{ '--tech-color': tech.color }"
                      :aria-label="tech.label"
                    >
                      <span class="tech-icon" aria-hidden="true">
                        <v-icon
                          v-if="tech.kind === 'mdi'"
                          :icon="tech.icon"
                          size="18"
                        />
                        <span v-else class="tech-svg" v-html="tech.icon"></span>
                      </span>
                      <span class="tech-name mono">{{ tech.label }}</span>
                    </component>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup lang="ts">
import {
  mdiApi,
  mdiCodeBraces,
  mdiLaravel,
  mdiLanguagePhp,
  mdiLanguageTypescript,
  mdiVuejs,
} from "@mdi/js";

import { codeToHtml } from "shiki";

import { contactInfo } from "~/data/contact";
import { gsap, gsapDefaults } from "~/plugins/gsap";

const { t, tm, rt, locale } = useI18n();
const localePath = useLocalePath();
const appStore = useAppStore();

// Refs del template
const copyBlock = ref<HTMLElement | null>(null);
const boardBlock = ref<HTMLElement | null>(null);
const ledgerBlock = ref<HTMLElement | null>(null);
const ctaGroup = ref<HTMLElement | null>(null);
const roleTicker = ref<HTMLElement | null>(null);

let ctx: gsap.Context | null = null;

type TechRef = {
  id: string;
  label: string;
};

type TechStackGroup = {
  id: string;
  name: string;
  techs: TechRef[];
};

type TechBadge = {
  id: string;
  label: string;
  color: string;
  kind: "mdi" | "svg";
  icon: string;
  url?: string;
};

type StackGroup = {
  name: string;
  color: string;
  techs: TechBadge[];
};

// Computed que resuelven correctamente las traducciones.
// Nota: soporta el formato nuevo (id + techs) y un fallback al formato anterior (detail).
const techStack = computed<TechStackGroup[]>(() => {
  const raw = tm("hero.techStack");
  if (!Array.isArray(raw)) return [];

  return raw
    .map((item: any) => {
      const name = typeof item?.name === "string" ? item.name : rt(item?.name);
      const idRaw = item?.id ?? name;
      const id = typeof idRaw === "string" ? idRaw : rt(idRaw);

      if (Array.isArray(item?.techs)) {
        const techs = item.techs
          .map((tech: any): TechRef | null => {
            const techIdRaw = tech?.id;
            const techLabelRaw = tech?.label;

            const techId =
              typeof techIdRaw === "string" ? techIdRaw : rt(techIdRaw);
            const techLabel =
              typeof techLabelRaw === "string"
                ? techLabelRaw
                : rt(techLabelRaw);

            const safeLabel = (techLabel ?? "").trim();
            const safeId = (techId ?? "").trim() || makeId(safeLabel);
            if (!safeId || !safeLabel) return null;

            return { id: safeId, label: safeLabel };
          })
          .filter((tech: TechRef | null): tech is TechRef => tech !== null);

        return {
          id: (id ?? "").trim() || makeId(name),
          name,
          techs,
        };
      }

      const detail =
        typeof item?.detail === "string" ? item.detail : rt(item?.detail);
      const techs = splitTech(detail).map((label) => ({
        id: makeId(label),
        label,
      }));

      return {
        id: (id ?? "").trim() || makeId(name),
        name,
        techs,
      };
    })
    .filter((group): group is TechStackGroup => Boolean(group?.name));
});

const svgIcons = {
  vite: `<svg width="18" height="18" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient y2="0.85775" y1="-0.03321" x2="0.57637" x1="-0.00829" id="a">
      <stop stop-color="#41d1ff" offset="0"/>
      <stop stop-color="#bd34fe" offset="1"/>
      </linearGradient>
      <linearGradient y2="0.8903" y1="0.0224" x2="0.51051" x1="0.27987" id="b">
      <stop stop-color="#ffea83" offset="0"/>
      <stop stop-color="#ffdd35" offset="0.083"/>
      <stop stop-color="#ffa800" offset="1"/>
      </linearGradient>
    </defs>
    <g transform="scale(0.13)">
      <title>Layer 1</title>
      <path id="svg_1" d="m124.766,19.52l-57.442,102.718c-1.187,2.121 -4.234,2.133 -5.437,0.024l-58.582,-102.73c-1.313,-2.302 0.652,-5.087 3.261,-4.622l57.504,10.277a3.09,3.09 0 0 0 1.11,0l56.3,-10.261c2.598,-0.473 4.575,2.289 3.286,4.594zm0,0" fill="url(#a)"/>
      <path id="svg_2" d="m91.46,1.43l-42.506,8.328a1.56,1.56 0 0 0 -1.258,1.437l-2.617,44.168a1.563,1.563 0 0 0 1.91,1.614l11.836,-2.735a1.562,1.562 0 0 1 1.88,1.836l-3.517,17.219a1.562,1.562 0 0 0 1.985,1.805l7.308,-2.223c1.133,-0.344 2.223,0.652 1.985,1.812l-5.59,27.047c-0.348,1.692 1.902,2.614 2.84,1.164l0.625,-0.968l34.64,-69.13c0.582,-1.16 -0.421,-2.48 -1.69,-2.234l-12.185,2.352a1.558,1.558 0 0 1 -1.793,-1.965l7.95,-27.562a1.56,1.56 0 0 0 -1.803,-1.965zm0,0" fill="url(#b)"/>
    </g>
  </svg>`,

  vitest: `<svg xmlns="http://www.w3.org/2000/svg" width="19.7" height="18" viewBox="0 0 256 234">
    <path fill="#fcc72b" d="m192.115 70.808l-61.2 88.488a5.27 5.27 0 0 1-2.673 2.002a5.3 5.3 0 0 1-3.343-.005a5.25 5.25 0 0 1-2.66-2.01a5.2 5.2 0 0 1-.903-3.203l2.45-48.854l-39.543-8.386a5.26 5.26 0 0 1-2.292-1.118a5.22 5.22 0 0 1-1.83-4.581a5.2 5.2 0 0 1 .895-2.383L142.218 2.27a5.28 5.28 0 0 1 6.016-1.996a5.24 5.24 0 0 1 2.66 2.01c.643.942.96 2.066.903 3.203l-2.45 48.855l39.542 8.386a5.26 5.26 0 0 1 2.293 1.117a5.21 5.21 0 0 1 1.829 4.582a5.2 5.2 0 0 1-.896 2.382" />
    <path fill="#729b1b" d="M128.025 233.537a12.36 12.36 0 0 1-8.763-3.63l-57.828-57.823a12.39 12.39 0 0 1 .023-17.5a12.394 12.394 0 0 1 17.5-.024l49.068 49.061L234.917 96.733a12.39 12.39 0 0 1 17.523 17.524l-115.655 115.65a12.34 12.34 0 0 1-8.76 3.63" />
    <path fill="#729b1b" fill-opacity="0.5" d="M127.975 233.537a12.36 12.36 0 0 0 8.763-3.63l57.828-57.823a12.4 12.4 0 0 0 3.605-8.754a12.395 12.395 0 0 0-12.375-12.376a12.4 12.4 0 0 0-8.755 3.606l-49.066 49.061L21.082 96.733a12.392 12.392 0 0 0-17.524 17.524l115.656 115.65a12.35 12.35 0 0 0 8.76 3.63" />
  </svg>`,

  pinia: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="18" viewBox="0 0 256 331"><defs><linearGradient id="SVGGAvQ3cLQ" x1="55.342%" x2="42.817%" y1="0%" y2="42.863%"><stop offset="0%" stop-color="#52ce63"/><stop offset="100%" stop-color="#51a256"/></linearGradient><linearGradient id="SVG4P8TSbqN" x1="55.349%" x2="42.808%" y1="0%" y2="42.863%"><stop offset="0%" stop-color="#52ce63"/><stop offset="100%" stop-color="#51a256"/></linearGradient><linearGradient id="SVGoccVobJE" x1="50%" x2="50%" y1="0%" y2="58.811%"><stop offset="0%" stop-color="#8ae99c"/><stop offset="100%" stop-color="#52ce63"/></linearGradient><linearGradient id="SVG49P4Ac0i" x1="51.378%" x2="44.585%" y1="17.473%" y2="100%"><stop offset="0%" stop-color="#ffe56c"/><stop offset="100%" stop-color="#ffc63a"/></linearGradient></defs><path fill="url(#SVGGAvQ3cLQ)" d="M67.56 173.328c30.366-2.985 41.08-27.648 44.735-64.823c3.654-37.175-21.174-70.814-31.502-69.799s-43.15 40.322-46.805 77.497c-3.654 37.175 3.205 60.11 33.572 57.125" transform="rotate(-38 72.877 106.136)"/><path fill="url(#SVG4P8TSbqN)" d="M184.454 186.277c30.367 2.986 36.394-20.032 32.74-57.207c-3.655-37.175-35.645-76.4-45.973-77.415s-35.989 32.542-32.334 69.717s15.201 61.92 45.567 64.905" transform="rotate(52 178.34 119.085)"/><path fill="url(#SVGoccVobJE)" d="M129.232 151.601c27.341 0 34.878-26.184 34.878-67.013S138.531 3.745 129.232 3.745S93.605 43.758 93.605 84.588c0 40.829 8.286 67.013 35.627 67.013" transform="rotate(7 128.858 77.673)"/><path fill="url(#SVG49P4Ac0i)" d="M113.386 330.307c56.896 0 103.038-16.528 103.038-91.482s-46.142-136.462-103.038-136.462c-56.897 0-103.002 61.507-103.002 136.462s46.105 91.482 103.002 91.482"/><ellipse cx="165.427" cy="216.677" fill="#eaadcc" rx="14.717" ry="6.845"/><ellipse cx="57.273" cy="212.57" fill="#eaadcc" rx="14.717" ry="6.845" transform="rotate(7 57.273 212.57)"/><path d="M96.266 210.285a2.054 2.054 0 1 0-3.406 2.295c3.151 4.676 7.997 7.39 14.373 8.119c6.348.725 12.016-.902 16.877-4.852a2.054 2.054 0 1 0-2.59-3.187c-3.999 3.249-8.563 4.559-13.82 3.958c-5.23-.598-8.986-2.7-11.434-6.333M65.818 178.63a14.67 14.67 0 0 1 10.551 3.945a14.67 14.67 0 0 1 4.672 10.25a14.67 14.67 0 0 1-3.945 10.55a14.67 14.67 0 0 1-10.25 4.672a14.67 14.67 0 0 1-10.551-3.945a14.67 14.67 0 0 1-4.67-10.25a14.67 14.67 0 0 1 3.944-10.55a14.67 14.67 0 0 1 10.249-4.672"/><path fill="#fff" d="M66.59 190.932a4.792 4.792 0 1 0-9.578.336a4.792 4.792 0 0 0 9.579-.336"/><path d="M154.99 182.366a14.67 14.67 0 0 1 10.552 3.944a14.67 14.67 0 0 1 4.67 10.25a14.67 14.67 0 0 1-3.944 10.551a14.67 14.67 0 0 1-10.25 4.671a14.67 14.67 0 0 1-10.55-3.945a14.67 14.67 0 0 1-4.672-10.25a14.67 14.67 0 0 1 3.945-10.55a14.67 14.67 0 0 1 10.25-4.671"/><path fill="#fff" d="M65.71 175.552c9.824-.343 18.066 7.342 18.409 17.165s-7.342 18.065-17.166 18.408s-18.064-7.342-18.407-17.166c-.343-9.823 7.341-18.064 17.164-18.407m12.252 17.38c-.224-6.423-5.613-11.448-12.037-11.223c-6.422.224-11.447 5.612-11.222 12.035c.224 6.424 5.612 11.448 12.035 11.224s11.448-5.612 11.224-12.036m76.921-13.645c9.824-.343 18.065 7.342 18.408 17.165s-7.342 18.065-17.165 18.408s-18.065-7.342-18.408-17.165s7.342-18.065 17.165-18.408m12.251 17.38c-.224-6.423-5.612-11.447-12.036-11.223s-11.448 5.613-11.223 12.036s5.612 11.448 12.035 11.224c6.424-.225 11.448-5.613 11.224-12.037"/><path fill="#fff" d="M155.763 194.668a4.792 4.792 0 1 0-9.578.335a4.792 4.792 0 0 0 9.578-.335"/><path fill="#ecb732" d="m38.083 243.16l22.33 23.235l16.022-17.044a3.765 3.765 0 0 1 5.486 5.157l-16.283 17.324l23.1 24.036a3.765 3.765 0 1 1-5.43 5.218l-22.834-23.761l-10.725 11.41a3.765 3.765 0 1 1-5.486-5.158l10.986-11.688l-22.595-23.511a3.765 3.765 0 1 1 5.43-5.218m149.956 0a3.765 3.765 0 1 1 5.429 5.218l-22.596 23.511l10.988 11.688a3.765 3.765 0 0 1-.042 5.201l-.123.121a3.765 3.765 0 0 1-5.322-.165l-10.725-11.41l-22.834 23.762a3.765 3.765 0 0 1-5.197.222l-.127-.116a3.765 3.765 0 0 1-.105-5.324l23.1-24.036l-16.284-17.324a3.765 3.765 0 0 1 .042-5.2l.123-.121a3.765 3.765 0 0 1 5.321.164l16.021 17.044z"/><path fill="#ffc73b" d="M136.602 126.74a3.765 3.765 0 0 1 0 5.323l-17.53 17.531l10.684 10.686a3.765 3.765 0 0 1 .12 5.2l-.12.125a3.765 3.765 0 0 1-5.324 0l-10.686-10.686l-10.686 10.686a3.765 3.765 0 1 1-5.324-5.325l10.685-10.686l-17.53-17.53a3.765 3.765 0 0 1-.12-5.2l.12-.125a3.765 3.765 0 0 1 5.324 0l17.531 17.53l17.531-17.53a3.765 3.765 0 0 1 5.325 0"/></svg>`,

  vercel: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 128 128"><path fill="currentColor" d="M63.984 17.184 127.964 128H0Zm0 0"/></svg>`,

  railway: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 1024 1024" fill="none"><path d="M4.756 438.175A520.713 520.713 0 0 0 0 489.735h777.799c-2.716-5.306-6.365-10.09-10.045-14.772-132.97-171.791-204.498-156.896-306.819-161.26-34.114-1.403-57.249-1.967-193.037-1.967-72.677 0-151.688.185-228.628.39-9.96 26.884-19.566 52.942-24.243 74.14h398.571v51.909H4.756ZM783.93 541.696H.399c.82 13.851 2.112 27.517 3.978 40.999h723.39c32.248 0 50.299-18.297 56.162-40.999ZM45.017 724.306S164.941 1018.77 511.46 1024c207.112 0 385.071-123.006 465.907-299.694H45.017Z" fill="currentColor"/><path d="M511.454 0C319.953 0 153.311 105.16 65.31 260.612c68.771-.144 202.704-.226 202.704-.226h.031v-.051c158.309 0 164.193.707 195.118 1.998l19.149.706c66.7 2.224 148.683 9.384 213.19 58.19 35.015 26.471 85.571 84.896 115.708 126.52 27.861 38.499 35.876 82.756 16.933 125.158-17.436 38.97-54.952 62.215-100.383 62.215H16.69s4.233 17.944 10.58 37.751h970.632A510.385 510.385 0 0 0 1024 512.218C1024.01 229.355 794.532 0 511.454 0Z" fill="currentColor"/></svg>`,

  cloudflare: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 256 117"><path fill="#fbad41" d="M205.52 50.813c-.858 0-1.705.03-2.551.058q-.207.012-.398.094a1.42 1.42 0 0 0-.92.994l-3.628 12.672c-1.565 5.449-.983 10.48 1.646 14.174c2.41 3.416 6.42 5.421 11.289 5.655l19.679 1.194c.585.03 1.092.312 1.4.776a1.92 1.92 0 0 1 .2 1.692a2.5 2.5 0 0 1-2.134 1.662l-20.448 1.193c-11.11.515-23.062 9.58-27.255 20.633l-1.474 3.9a1.092 1.092 0 0 0 .967 1.49h70.425a1.87 1.87 0 0 0 1.81-1.365A51.2 51.2 0 0 0 256 101.828c0-28.16-22.582-50.984-50.449-50.984"/><path fill="#f6821f" d="m174.782 115.362l1.303-4.583c1.568-5.449.987-10.48-1.639-14.173c-2.418-3.417-6.424-5.422-11.296-5.656l-92.312-1.193a1.82 1.82 0 0 1-1.459-.776a1.92 1.92 0 0 1-.203-1.693a2.5 2.5 0 0 1 2.154-1.662l93.173-1.193c11.063-.511 23.015-9.58 27.208-20.633l5.313-14.04c.214-.596.27-1.238.156-1.86C191.126 20.51 166.91 0 137.96 0C111.269 0 88.626 17.403 80.5 41.596a27 27 0 0 0-19.156-5.359C48.549 37.524 38.25 47.946 36.979 60.88a27.9 27.9 0 0 0 .702 9.642C16.773 71.145 0 88.454 0 109.726c0 1.923.137 3.818.413 5.667c.115.897.879 1.57 1.783 1.568h170.48a2.22 2.22 0 0 0 2.106-1.63"/></svg>`,

  vuetify: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 256 222"><path fill="#1697f6" d="m130.711 49.564l-51.043 88.428L128 221.754l64.015-110.877L256 0h-96.692z"/><path fill="#aeddff" d="m64.015 110.877l3.352 5.831l47.748-82.742L134.734 0H0z"/><path fill="#1867c0" d="M159.308 0C183.503 79.623 128 221.754 128 221.754l-48.332-83.762z"/><path fill="#7bc6ff" d="M134.734 0C32.794 0 67.367 116.708 67.367 116.708z"/></svg>`,

  primevue: `<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
    <g>
      <title>Layer 1</title>
      <g id="prime">
      <polygon fill="#40b681" id="svg_1" points="15.36 11.33 14.26 11.08 15.12 12.3 15.12 16.09 18.05 13.65 18.05 9.5 16.7 9.98 15.36 11.33"/>
      <polygon fill="#40b681" id="svg_2" points="8.52 11.33 7.17 9.98 5.83 9.5 5.83 13.65 8.76 16.09 8.76 12.3 9.62 11.08 8.52 11.33"/>
      <polygon fill="#40b681" id="svg_3" points="13.16 11.45 10.72 11.45 10.11 11.08 9.13 12.55 9.13 18.05 9.86 19.14 10.72 20 13.16 20 14.02 19.14 14.75 18.05 14.75 12.55 13.77 11.08 13.16 11.45"/>
      <polygon fill="#40b681" id="svg_4" points="15.12 18.41 16.7 16.82 16.7 15.24 15.12 16.58 15.12 18.41"/>
      <polygon fill="#40b681" id="svg_5" points="7.17 16.82 8.76 18.41 8.76 16.58 7.17 15.24 7.17 16.82"/>
      <polygon fill="#40b681" id="svg_6" points="11.08 10.96 11.7 10.96 11.7 4 10.35 4 9.38 6.31 4.97 5.95 5.71 9.01 10.96 10.96 11.08 10.96"/>
      <path fill="#40b681" id="svg_7" d="m14.5,6.31l-0.97,-2.31l-1.35,0l0,7l0.82,0l5.25,-2l0.75,-3l-4.5,0.31z"/>
      <polygon fill="#40b681" id="svg_8" points="17.32 5.71 15.6 4 13.89 4 14.75 5.95 17.32 5.71"/>
      <polygon fill="#40b681" id="svg_9" points="9.98 4 8.27 4 6.56 5.71 9.13 5.95 9.98 4"/>
      </g>
    </g>
  </svg>`,

  copilot: `<svg xmlns="http://www.w3.org/2000/svg" width="22.16" height="18" viewBox="0 0 256 208">
    <path fill="currentColor" d="M205.28 31.36c14.096 14.88 20.016 35.2 22.512 63.68c6.626 0 12.805 1.47 16.976 7.152l7.792 10.56A17.55 17.55 0 0 1 256 123.2v28.688c-.008 3.704-1.843 7.315-4.832 9.504C215.885 187.222 172.35 208 128 208c-49.066 0-98.19-28.273-123.168-46.608c-2.989-2.189-4.825-5.8-4.832-9.504V123.2c0-3.776 1.2-7.424 3.424-10.464l7.792-10.544c4.173-5.657 10.38-7.152 16.992-7.152c2.496-28.48 8.4-48.8 22.512-63.68C77.331 3.165 112.567.06 127.552 0H128c14.72 0 50.4 2.88 77.28 31.36m-77.264 47.376c-3.04 0-6.544.176-10.272.544c-1.312 4.896-3.248 9.312-6.08 12.128c-11.2 11.2-24.704 12.928-31.936 12.928c-6.802 0-13.927-1.42-19.744-5.088c-5.502 1.808-10.786 4.415-11.136 10.912c-.586 12.28-.637 24.55-.688 36.824c-.026 6.16-.05 12.322-.144 18.488c.024 3.579 2.182 6.903 5.44 8.384C79.936 185.92 104.976 192 128.016 192c23.008 0 48.048-6.08 74.512-18.144c3.258-1.48 5.415-4.805 5.44-8.384c.317-18.418.062-36.912-.816-55.312h.016c-.342-6.534-5.648-9.098-11.168-10.912c-5.82 3.652-12.927 5.088-19.728 5.088c-7.232 0-20.72-1.728-31.936-12.928c-2.832-2.816-4.768-7.232-6.08-12.128a106 106 0 0 0-10.24-.544m-26.941 43.93c5.748 0 10.408 4.66 10.408 10.409v19.183c0 5.749-4.66 10.409-10.408 10.409s-10.408-4.66-10.408-10.409v-19.183c0-5.748 4.66-10.408 10.408-10.408m53.333 0c5.749 0 10.409 4.66 10.409 10.409v19.183c0 5.749-4.66 10.409-10.409 10.409c-5.748 0-10.408-4.66-10.408-10.409v-19.183c0-5.748 4.66-10.408 10.408-10.408M81.44 28.32c-11.2 1.12-20.64 4.8-25.44 9.92c-10.4 11.36-8.16 40.16-2.24 46.24c4.32 4.32 12.48 7.2 21.28 7.2c6.72 0 19.52-1.44 30.08-12.16c4.64-4.48 7.52-15.68 7.2-27.04c-.32-9.12-2.88-16.64-6.72-19.84c-4.16-3.68-13.6-5.28-24.16-4.32m68.96 4.32c-3.84 3.2-6.4 10.72-6.72 19.84c-.32 11.36 2.56 22.56 7.2 27.04c10.56 10.72 23.36 12.16 30.08 12.16c8.8 0 16.96-2.88 21.28-7.2c5.92-6.08 8.16-34.88-2.24-46.24c-4.8-5.12-14.24-8.8-25.44-9.92c-10.56-.96-20 .64-24.16 4.32M128 56c-2.56 0-5.6.16-8.96.48c.32 1.76.48 3.68.64 5.76c0 1.44 0 2.88-.16 4.48c3.2-.32 5.92-.32 8.48-.32s5.28 0 8.48.32c-.16-1.6-.16-3.04-.16-4.48c.16-2.08.32-4 .64-5.76c-3.36-.32-6.4-.48-8.96-.48" />
  </svg>`,

  claude: `<svg xmlns="http://www.w3.org/2000/svg" width="17.93" height="18" viewBox="0 0 256 257">
    <path fill="#d97757" d="m50.228 170.321l50.357-28.257l.843-2.463l-.843-1.361h-2.462l-8.426-.518l-28.775-.778l-24.952-1.037l-24.175-1.296l-6.092-1.297L0 125.796l.583-3.759l5.12-3.434l7.324.648l16.202 1.101l24.304 1.685l17.629 1.037l26.118 2.722h4.148l.583-1.685l-1.426-1.037l-1.101-1.037l-25.147-17.045l-27.22-18.017l-14.258-10.37l-7.713-5.25l-3.888-4.925l-1.685-10.758l7-7.713l9.397.649l2.398.648l9.527 7.323l20.35 15.75L94.817 91.9l3.889 3.24l1.555-1.102l.195-.777l-1.75-2.917l-14.453-26.118l-15.425-26.572l-6.87-11.018l-1.814-6.61c-.648-2.723-1.102-4.991-1.102-7.778l7.972-10.823L71.42 0l10.63 1.426l4.472 3.888l6.61 15.101l10.694 23.786l16.591 32.34l4.861 9.592l2.592 8.879l.973 2.722h1.685v-1.556l1.36-18.211l2.528-22.36l2.463-28.776l.843-8.1l4.018-9.722l7.971-5.25l6.222 2.981l5.12 7.324l-.713 4.73l-3.046 19.768l-5.962 30.98l-3.889 20.739h2.268l2.593-2.593l10.499-13.934l17.628-22.036l7.778-8.749l9.073-9.657l5.833-4.601h11.018l8.1 12.055l-3.628 12.443l-11.342 14.388l-9.398 12.184l-13.48 18.147l-8.426 14.518l.778 1.166l2.01-.194l30.46-6.481l16.462-2.982l19.637-3.37l8.88 4.148l.971 4.213l-3.5 8.62l-20.998 5.184l-24.628 4.926l-36.682 8.685l-.454.324l.519.648l16.526 1.555l7.065.389h17.304l32.21 2.398l8.426 5.574l5.055 6.805l-.843 5.184l-12.962 6.611l-17.498-4.148l-40.83-9.721l-14-3.5h-1.944v1.167l11.666 11.406l21.387 19.314l26.767 24.887l1.36 6.157l-3.434 4.86l-3.63-.518l-23.526-17.693l-9.073-7.972l-20.545-17.304h-1.36v1.814l4.73 6.935l25.017 37.59l1.296 11.536l-1.814 3.76l-6.481 2.268l-7.13-1.297l-14.647-20.544l-15.1-23.138l-12.185-20.739l-1.49.843l-7.194 77.448l-3.37 3.953l-7.778 2.981l-6.48-4.925l-3.436-7.972l3.435-15.749l4.148-20.544l3.37-16.333l3.046-20.285l1.815-6.74l-.13-.454l-1.49.194l-15.295 20.999l-23.267 31.433l-18.406 19.702l-4.407 1.75l-7.648-3.954l.713-7.064l4.277-6.286l25.47-32.405l15.36-20.092l9.917-11.6l-.065-1.686h-.583L44.07 198.125l-12.055 1.555l-5.185-4.86l.648-7.972l2.463-2.593l20.35-13.999z" />
  </svg>`,

  gcp: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 256 206"><path fill="#ea4335" d="m170.252 56.819l22.253-22.253l1.483-9.37C153.437-11.677 88.976-7.496 52.42 33.92C42.267 45.423 34.734 59.764 30.717 74.573l7.97-1.123l44.505-7.34l3.436-3.513c19.797-21.742 53.27-24.667 76.128-6.168z"/><path fill="#4285f4" d="M224.205 73.918a100.25 100.25 0 0 0-30.217-48.722l-31.232 31.232a55.52 55.52 0 0 1 20.379 44.037v5.544c15.35 0 27.797 12.445 27.797 27.796c0 15.352-12.446 27.485-27.797 27.485h-55.671l-5.466 5.934v33.34l5.466 5.231h55.67c39.93.311 72.553-31.494 72.864-71.424a72.3 72.3 0 0 0-31.793-60.453"/><path fill="#34a853" d="M71.87 205.796h55.593V161.29H71.87a27.3 27.3 0 0 1-11.399-2.498l-7.887 2.42l-22.409 22.253l-1.952 7.574c12.567 9.489 27.9 14.825 43.647 14.757"/><path fill="#fbbc05" d="M71.87 61.426C31.94 61.663-.237 94.227.001 134.158a72.3 72.3 0 0 0 28.222 56.88l32.248-32.246c-13.99-6.322-20.208-22.786-13.887-36.776s22.786-20.208 36.775-13.888a27.8 27.8 0 0 1 13.887 13.888l32.248-32.248A72.22 72.22 0 0 0 71.87 61.427"/></svg>`,

  figma: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="18" viewBox="0 0 256 384">
    <path fill="#0acf83" d="M64 384c35.328 0 64-28.672 64-64v-64H64c-35.328 0-64 28.672-64 64s28.672 64 64 64" />
    <path fill="#a259ff" d="M0 192c0-35.328 28.672-64 64-64h64v128H64c-35.328 0-64-28.672-64-64" />
    <path fill="#f24e1e" d="M0 64C0 28.672 28.672 0 64 0h64v128H64C28.672 128 0 99.328 0 64" />
    <path fill="#ff7262" d="M128 0h64c35.328 0 64 28.672 64 64s-28.672 64-64 64h-64z" />
    <path fill="#1abcfe" d="M256 192c0 35.328-28.672 64-64 64s-64-28.672-64-64s28.672-64 64-64s64 28.672 64 64" />
  </svg>`
};

function splitTech(value: string): string[] {
  return (value ?? "")
    .split("·")
    .map((x) => x.trim())
    .filter(Boolean);
}

function makeId(label: string): string {
  return (label ?? "")
    .toLowerCase()
    .replaceAll("+", "plus")
    .replaceAll(/\s+/g, "-")
    .replaceAll(/[^a-z0-9-]/g, "");
}

type TechPreset = Pick<TechBadge, "color" | "kind" | "icon"> &
  Partial<Pick<TechBadge, "url">>;

const techPresets: Record<string, TechPreset> = {
  vue: {
    color: "#42B883",
    kind: "mdi",
    icon: mdiVuejs,
  },
  typescript: {
    color: "#3178C6",
    kind: "mdi",
    icon: mdiLanguageTypescript,
  },
  vite: {
    color: "#A855F7",
    kind: "svg",
    icon: svgIcons.vite,
  },
  pinia: {
    color: "#F7D336",
    kind: "svg",
    icon: svgIcons.pinia,
  },
  laravel: {
    color: "#FF2D20",
    kind: "mdi",
    icon: mdiLaravel,
  },
  php: {
    color: "#8892BF",
    kind: "mdi",
    icon: mdiLanguagePhp,
  },
  "api-rest": {
    color: "#22C55E",
    kind: "mdi",
    icon: mdiApi,
  },
  vercel: {
    color: "#E5E7EB",
    kind: "svg",
    icon: svgIcons.vercel,
  },
  railway: {
    color: "#8B5CF6",
    kind: "svg",
    icon: svgIcons.railway,
  },
  gcp: {
    color: "#60A5FA",
    kind: "svg",
    icon: svgIcons.gcp,
  },
  cloudflare: {
    color: "#F97316",
    kind: "svg",
    icon: svgIcons.cloudflare,
  },
  vuetify: {
    color: "#1697F6",
    kind: "svg",
    icon: svgIcons.vuetify,
  },
  primevue: {
    color: "#22C55E",
    kind: "svg",
    icon: svgIcons.primevue,
  },
  figma: {
    color: "#F43F5E",
    kind: "svg",
    icon: svgIcons.figma,
  },
  vitest: {
    color: "#F59E0B",
    kind: "svg",
    icon: svgIcons.vitest,
  },
  copilot: {
    color: "#A78BFA",
    kind: "svg",
    icon: svgIcons.copilot,
  },
  claude: {
    color: "#FB7185",
    kind: "svg",
    icon: svgIcons.claude,
  }
};

const resolveTech = (tech: TechRef): TechBadge => {
  const preset = techPresets[tech.id];
  if (preset) {
    return {
      id: tech.id,
      label: tech.label,
      ...preset,
    };
  }

  return {
    id: tech.id || makeId(tech.label),
    label: tech.label,
    color: "#94A3B8",
    kind: "mdi",
    icon: mdiCodeBraces,
  };
};

const groupColor = (groupId: string, groupName: string): string => {
  const id = (groupId ?? "").toLowerCase();
  switch (id) {
    case "frontend":
      return "#22C55E";
    case "backend":
      return "#F97316";
    case "infra":
      return "#60A5FA";
    case "ui":
      return "#A78BFA";
    case "testing":
      return "#F59E0B";
    case "ai":
      return "#FB7185";
  }

  const name = (groupName ?? "").toLowerCase();
  if (name.includes("front")) return "#22C55E";
  if (name.includes("back")) return "#F97316";
  if (name.includes("infra")) return "#60A5FA";
  if (name === "ui" || name.includes("ui")) return "#A78BFA";
  if (name.includes("test")) return "#F59E0B";
  if (name.includes("ai")) return "#FB7185";
  return "#94A3B8";
};

const stackGroups = computed<StackGroup[]>(() => {
  return techStack.value.map((group) => {
    const uniq = new Map<string, TechBadge>();

    group.techs.forEach((tech) => {
      const resolved = resolveTech(tech);
      if (!uniq.has(resolved.id)) uniq.set(resolved.id, resolved);
    });

    return {
      name: group.name,
      color: groupColor(group.id, group.name),
      techs: Array.from(uniq.values()),
    };
  });
});

const agenda = computed(() => {
  const raw = tm("hero.agenda");
  if (Array.isArray(raw)) {
    return raw.map((item) => ({
      status: rt(item.status),
      title: rt(item.title),
    }));
  }
  return [];
});

const roles = computed(() => {
  const raw = tm("hero.roles");
  if (Array.isArray(raw)) {
    return raw.map((role) => rt(role));
  }
  return [];
});

// Estado del typewriter
const currentRole = ref("");
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typewriterTimeout: ReturnType<typeof setTimeout> | null = null;

const codeSnippet = `const davidDeras = {
  location: '${contactInfo.city}, ${contactInfo.countryCode}',
  stack: ['Vue 3 + TS', 'Laravel 11', 'Node tooling'],
  sectors: ['GovTech', 'Retail', 'Data Viz'],
  currently: () => ['DTIC - MINSAL', 'MusyCharts OSS']
}
export default davidDeras;`;

const highlightedSnippet = ref("");

const escapeHtml = (str: string) =>
  str.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

const highlightSnippet = async () => {
  if (import.meta.server) return;

  highlightedSnippet.value = `<pre class="code-pre"><code>${escapeHtml(codeSnippet)}</code></pre>`;

  try {
    highlightedSnippet.value = await codeToHtml(codeSnippet, {
      lang: "js",
      theme: appStore.theme === "dark" ? "github-dark-default" : "github-light",
    });
  } catch (error) {
    console.warn("No se pudo cargar Shiki", error);
  }
};

const typeWriter = () => {
  if (import.meta.server) return;

  const list = roles.value;
  if (!list.length) {
    typewriterTimeout = setTimeout(typeWriter, 1500);
    return;
  }

  const current = list[roleIndex % list.length] ?? "";

  if (isDeleting) {
    currentRole.value = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    currentRole.value = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let typeSpeed = isDeleting ? 45 : 90;

  if (!isDeleting && charIndex === current.length) {
    typeSpeed = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % list.length;
    typeSpeed = 500;
  }

  typewriterTimeout = setTimeout(typeWriter, typeSpeed);
};

const goToProjects = () => {
  navigateTo(localePath("/projects"));
};

onMounted(() => {
  nextTick(() => {
    highlightSnippet();

    ctx = gsap.context(() => {
      const copyTargets =
        copyBlock.value?.querySelectorAll("[data-animate]") ?? [];
      const boardTargets =
        boardBlock.value?.querySelectorAll("[data-animate]") ?? [];

      if (copyTargets.length) {
        gsap.from(copyTargets, {
          ...gsapDefaults,
          opacity: 0,
          y: 24,
          stagger: 0.15,
        });
      }

      if (ctaGroup.value) {
        gsap.from(ctaGroup.value, {
          ...gsapDefaults,
          opacity: 0,
          y: 24,
          delay: 0.4,
        });
      }

      if (ledgerBlock.value) {
        gsap.from(ledgerBlock.value, {
          ...gsapDefaults,
          opacity: 0,
          y: 24,
          delay: 0.5,
        });
      }

      if (boardTargets.length) {
        gsap.from(boardTargets, {
          ...gsapDefaults,
          opacity: 0,
          y: 30,
          stagger: 0.2,
          delay: 0.3,
        });
      }
    });

    setTimeout(typeWriter, 600);
  });
});

onBeforeUnmount(() => {
  ctx?.revert();
  if (typewriterTimeout) {
    clearTimeout(typewriterTimeout);
    typewriterTimeout = null;
  }
});

watch(
  () => appStore.theme,
  () => {
    highlightSnippet();
  }
);

watch(
  () => locale.value,
  () => {
    roleIndex = 0;
    charIndex = 0;
    isDeleting = false;
    currentRole.value = "";
  }
);
</script>

<style scoped lang="scss">
.hero-shell {
  padding: clamp(2rem, 6vw, 4rem) 0;
  border-bottom: 1px solid var(--line-soft);
}

.hero-grid {
  max-width: var(--page-max-width);
  margin: 0 auto;
}

.hero-row {
  display: flex;
  align-items: stretch;
}

.hero-col {
  display: flex;
  flex-direction: column;
}

.hero-copy,
.hero-board {
  border: 1px solid var(--line-soft);
  border-radius: var(--radius-lg);
  padding: clamp(1.5rem, 3vw, 2.75rem);
  background: rgba(var(--v-theme-surface), 0.7);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  height: 100%;
}

.hero-title {
  font-size: clamp(2.5rem, 6vw, 3.75rem);
  letter-spacing: -0.03em;
  line-height: 1.1;
}

.hero-emphasis {
  display: block;
  font-size: clamp(1.1rem, 2.2vw, 1.35rem);
  font-weight: 500;
  color: var(--text-subtle);
}

.role-line {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  height: 5.4rem;
}

.role-label {
  font-size: 0.75rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.role-value {
  font-size: 1.5rem;
  border-bottom: 1px solid var(--line-soft);
  padding-bottom: 0.35rem;
  height: 2.2rem;
}

.hero-lead {
  font-size: 1.1rem;
  color: var(--text-subtle);
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.hero-ledger {
  border-top: 1px solid var(--line-soft);
  padding-top: 2.25rem;
}

.ledger-title {
  font-size: 0.9rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 0.75rem;
}

.ledger-grid:not(.no-auto-fit) {
  display: grid;
  gap: 0.75rem;
}

.ledger-grid.no-auto-fit {
  display: grid;
  gap: 0.75rem;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.ledger-item {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  border: 1px solid var(--line-soft);
  border-radius: var(--radius-sm);
  padding: 0.85rem 1rem;
}

.ledger-item .label {
  font-size: 0.85rem;
  color: var(--text-subtle);
}

.hero-board {
  gap: 1.5rem;
}

.board-section {
  border-radius: var(--radius-md);
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.board-label {
  font-size: 0.95rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-subtle);
}

.board-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.board-list li {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--line-soft);
  padding-bottom: 0.5rem;
}

.board-list li:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.stack-groups {
  display: grid;
  gap: 1rem;
}

.stack-group {
  border: 1px solid var(--line-soft);
  border-radius: var(--radius-md);
  padding: 1rem;
  background: rgba(var(--v-theme-surface), 0.35);
}

.stack-group-title {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  margin-bottom: 0.75rem;
  opacity: 0.9;
}

.stack-group-dot {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  box-shadow: 0 0 0 4px var(--line-soft);
}

.tech-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
}

.tech-badge {
  --tech-color: #94a3b8;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.45rem 0.7rem;
  border-radius: 999px;
  border: 1px solid var(--line-soft);
  background: rgba(var(--v-theme-surface), 0.5);
  text-decoration: none;
  color: rgb(var(--v-theme-on-surface));
  transition:
    transform 0.18s ease,
    border-color 0.18s ease,
    background-color 0.18s ease,
    box-shadow 0.18s ease;
}

.tech-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--tech-color);
}

.tech-badge.is-svg .tech-icon {
  border-radius: 8px;
  padding: 2px 4px;
}

.tech-svg {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
}

.tech-name {
  font-size: 0.85rem;
  letter-spacing: 0.02em;
}

.code-area {
  gap: 1rem;
}

.code-highlight {
  margin: 0;
  font-family: var(--font-mono);
  font-size: 0.9rem;
  line-height: 1.6;
  border-radius: var(--radius-sm);
  overflow-x: auto;
}

.code-highlight :deep(code) {
  text-shadow: none;
}

.code-pre {
  margin: 0;
}

@media (max-width: 959px) {
  .hero-col:not(:last-child) {
    margin-bottom: 1.5rem;
  }
}
</style>
