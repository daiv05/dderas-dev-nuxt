import { readThemeCookie } from '~/utils/theme'

export default defineNuxtPlugin({
  name: 'theme',
  dependsOn: ['pinia'],
  setup() {
    const saved = readThemeCookie(document.cookie)
    if (!saved) return
    const appStore = useAppStore()
    if (appStore.theme !== saved) appStore.setTheme(saved)
  },
})
