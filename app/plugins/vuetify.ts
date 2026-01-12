import 'vuetify/styles'

import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createVuetify } from 'vuetify'

import type { ThemeName } from '~/stores/app'

export default defineNuxtPlugin((nuxtApp) => {
  const appStore = useAppStore()
  
  const vuetify = createVuetify({
    ssr: true,
    components,
    directives,
    theme: {
      defaultTheme: appStore.theme, // Use theme from store (SSR-safe)
      themes: {
        light: {
          colors: {
            primary: '#3451D9',
            secondary: '#2F29B0',
            accent: '#6600A3',

            background: '#F8F9FC',
            surface: '#FFFFFF',
            'surface-variant': '#E8EBF0',
            'on-surface': '#0F1419',
            'on-background': '#0F1419',
            'on-primary': '#FFFFFF',
            error: '#DC2626',
            info: '#2563EB',
            success: '#059669',
            warning: '#D97706'
          }
        },
        dark: {
          colors: {
            primary: '#859FFF',
            secondary: '#5C7EFF',
            accent: '#A785FF',

            background: '#0B0E14',
            surface: '#151920',
            'surface-variant': '#1F252C',
            'on-surface': '#EDF2F7',
            'on-background': '#EDF2F7',
            'on-primary': '#000000',
            error: '#FCA5A5',
            info: '#93C5FD',
            success: '#6EE7B7',
            warning: '#FCD34D'
          }
        }
      }
    },
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi
      }
    }
  })

  nuxtApp.vueApp.use(vuetify)

  // Sincronizar tema con Vuetify (solo cliente para manipulación DOM)
  if (import.meta.client) {
    // Aplicar tema al DOM
    const applyTheme = (themeName: ThemeName) => {
      vuetify.theme.change(themeName)
      
      if (themeName === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }

    // Watch para cambios de tema
    watch(
      () => appStore.theme,
      (newTheme) => {
        if (newTheme) {
          applyTheme(newTheme)
        }
      }
    )
  }
})
