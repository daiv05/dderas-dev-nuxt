<template>
  <section class="about-shell">
    <div class="about-grid">
      <div ref="profileSection" class="profile-column">
        <div class="profile-card">
          <img src="/img/me/me.png" :alt="contactInfo.name" />
          <ul class="fact-list">
            <li v-for="fact in quickFacts" :key="fact.label">
              <span class="label">{{ fact.label }}</span>
              <span v-if="!fact.isLink" class="value">{{ fact.value }}</span>
              <a
                v-else
                :href="fact.url"
                target="_blank"
                rel="noopener"
                class="value link"
              >
                {{ fact.value }}
              </a>
            </li>
          </ul>
          <div class="profile-actions">
            <v-btn
              variant="outlined"
              rounded="pill"
              :href="`mailto:${contactInfo.email}`"
            >
              {{ t("about.buttons.contact") }}
            </v-btn>
          </div>
        </div>
      </div>

      <div ref="detailsSection" class="details-column">
        <div class="detail-block">
          <h3>{{ aboutMeContent.title }}</h3>
          <p>
            {{ aboutMeContent.body }}
          </p>
        </div>

        <div class="detail-block">
          <div class="block-header">
            <h3>{{ skillsContent.title }}</h3>
          </div>
          <div class="skills-groups">
            <div
              v-for="group in skillGroups"
              :key="group.title"
              class="skill-group"
            >
              <h4 class="group-title">{{ group.title }}</h4>
              <ul class="skill-list">
                <li v-for="item in group.items" :key="item">{{ item }}</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="detail-block">
          <h3>{{ experienceContent.title }}</h3>
          <v-timeline
            density="compact"
            side="end"
            align="start"
            truncate-line="both"
            class="experience-timeline"
          >
            <v-timeline-item
              v-for="item in experience"
              :key="item.title"
              dot-color="primary"
              size="x-small"
            >
              <div class="mb-4">
                <div class="text-caption mono mb-1">{{ item.date }}</div>
                <div class="text-h6 font-weight-bold mb-1">
                  {{ item.title }}
                </div>
                <p class="text-body-2 text-medium-emphasis mb-2">
                  {{ item.description }}
                </p>
                <div class="chipline">
                  <span v-for="tag in item.tags" :key="tag">{{ tag }}</span>
                </div>
              </div>
            </v-timeline-item>
          </v-timeline>
        </div>

        <div class="detail-block">
          <h3>{{ interestsContent.title }}</h3>
          <div class="chipline">
            <span v-for="interest in interests" :key="interest">{{
              interest
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { contactInfo } from "~/data/contact";
import {
  getMainScroller,
  gsapDefaults,
  animateInOnEnter,
} from "~/plugins/gsap";
import { useGsapAnimations } from "~/composables/useEnterAnimations";

interface SkillGroup {
  title: string;
  items: string[];
}

interface ExperienceItem {
  title: string;
  date: string;
  description: string;
  tags: string[];
}

const { t, tm, rt } = useI18n();
const { setupAnimations } = useGsapAnimations();

const profileSection = ref<HTMLElement | null>(null);
const detailsSection = ref<HTMLElement | null>(null);
const quickFacts = computed(() => [
  { label: t("about.facts.location"), value: contactInfo.location },
  { label: t("about.facts.email"), value: contactInfo.email },
  {
    label: t("about.facts.github"),
    value: "daiv05",
    isLink: true,
    url: contactInfo.socials.github,
  },
  { label: t("about.facts.languages"), value: t("about.facts.languagesValue") },
  { label: t("about.facts.mode"), value: t("about.facts.modeValue") },
]);
const skillsContent = computed(() => {
  const raw = tm("about.skills");
  return raw
    ? {
        title: rt(raw.title),
        groups: raw.groups || [],
      }
    : { title: "", groups: [] };
});

const skillGroups = computed<SkillGroup[]>(() => {
  const groups = skillsContent.value.groups;
  return groups.map((group) => ({
    title: rt(group.title),
    items: group.items.map((item) => rt(item)),
  }));
});

const aboutMeContent = computed(() => {
  const raw = tm("about.me");
  return raw
    ? {
        title: rt(raw.title),
        body: rt(raw.body),
      }
    : { title: "", body: "" };
});

const experienceContent = computed(() => {
  const raw = tm("about.experience");
  return raw
    ? {
        title: rt(raw.title),
        timeline: raw.timeline || [],
      }
    : { title: "", timeline: [] };
});

const experience = computed<ExperienceItem[]>(() => {
  const timeline = experienceContent.value.timeline;
  return timeline.map((item) => ({
    title: rt(item.title),
    date: rt(item.date),
    description: rt(item.description),
    tags: item.tags.map((tag) => rt(tag)),
  }));
});

const interestsContent = computed(() => {
  const raw = tm("about.interests");
  return raw
    ? {
        title: rt(raw.title),
        items: raw.items || [],
      }
    : { title: "", items: [] };
});

const interests = computed<string[]>(() => {
  const items = interestsContent.value.items;
  return items.map((item) => rt(item));
});

onMounted(() => {
  nextTick(() => {
    setupAnimations(() => {
      const scroller = getMainScroller();

      if (profileSection.value) {
        animateInOnEnter(profileSection.value, {
          from: { opacity: 0, x: -40 },
          to: { ...gsapDefaults, opacity: 1, x: 0, duration: 0.9 },
          trigger: profileSection.value,
          scroller,
          start: "top 85%",
          once: true,
        });
      }

      if (detailsSection.value) {
        animateInOnEnter(detailsSection.value, {
          from: { opacity: 0, x: 40 },
          to: { ...gsapDefaults, opacity: 1, x: 0, duration: 0.9 },
          trigger: detailsSection.value,
          scroller,
          start: "top 85%",
          once: true,
        });
      }
    });
  });
});
</script>

<style scoped lang="scss">
.about-shell {
  padding: var(--section-gap) var(--shell-padding);
}

.about-header {
  max-width: 840px;
  margin: 0 auto 3rem;
  text-align: center;
}

.about-grid {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 2rem;
  align-items: start;
}

.profile-card {
  border: 1px solid var(--line-soft);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  background: rgba(var(--v-theme-surface), 0.85);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.profile-card img {
  width: 100%;
  border-radius: var(--radius-md);
}

.fact-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.fact-list li {
  border-bottom: 1px solid var(--line-soft);
  padding-bottom: 0.65rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.fact-list li:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.fact-list .label {
  font-size: 0.8rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-subtle);
}

.profile-actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.details-column {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.detail-block {
  border: 1px solid var(--line-soft);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  background: rgba(var(--v-theme-surface), 0.85);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.block-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.skills-groups {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.skill-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.group-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: rgb(var(--v-theme-primary));
  margin-bottom: 0.25rem;
}

.skill-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.skill-list li {
  font-size: 0.9rem;
  color: var(--text-subtle);
  position: relative;
  padding-left: 1rem;
}

.skill-list li::before {
  content: "•";
  position: absolute;
  left: 0;
  color: rgb(var(--v-theme-primary));
  opacity: 0.85;
}

.timeline {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.timeline-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.timeline p {
  color: var(--text-subtle);
  margin: 0.35rem 0 0.5rem;
}

@media (max-width: 1024px) {
  .about-grid {
    grid-template-columns: 1fr;
  }

  .profile-card {
    max-width: 420px;
    margin: 0 auto;
  }
}

.link {
  color: rgb(var(--v-theme-primary));
  text-decoration: none;
  transition: opacity 0.2s;
}

.link:hover {
  text-decoration: underline;
  opacity: 0.8;
}
</style>
