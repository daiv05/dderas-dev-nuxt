import type { ThemeName } from '~/stores/app'

/**
 * Extrae el tema guardado en la cookie "theme" de una cadena document.cookie.
 */
export function readThemeCookie(cookie: string): ThemeName | null {
  const match = cookie.match(/(?:^|;\s*)theme=([^;]*)/)
  const value = match?.[1]
  return value === 'light' || value === 'dark' ? value : null
}

export const themeBootScript = `(function(){try{var m=document.cookie.match(/(?:^|;\\s*)theme=([^;]*)/);var t=m?m[1]:'dark';document.documentElement.classList.toggle('dark',t!=='light')}catch(e){}})()`
