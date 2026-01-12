export type ThemeName = 'dark' | 'light'
export type LanguageCode = 'en' | 'es'

export const useAppStore = defineStore('app', () => {
  const theme = useCookie<ThemeName>('theme', {
    default: () => 'dark',
    sameSite: 'lax'
  })

  const language = useCookie<LanguageCode>('language', {
    default: () => 'en',
    sameSite: 'lax'
  })

  const setTheme = (value: ThemeName) => {
    theme.value = value
  }

  const toggleTheme = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }

  const setLanguage = (value: LanguageCode) => {
    language.value = value
  }

  return {
    theme,
    language,
    setTheme,
    toggleTheme,
    setLanguage
  }
})
