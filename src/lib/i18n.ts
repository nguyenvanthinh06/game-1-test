import { getLocaleFromNavigator, init, locale as $locale, register } from 'svelte-i18n'

register('en', () => import('./locales/en.json'))
register('vi', () => import('./locales/vi.json'))

let initialized = false

export function setupI18n(startLocale?: string) {
  if (initialized) return

  const initialLocale = startLocale?.trim() || 'en'

  init({
    fallbackLocale: 'en',
    initialLocale,
  })

  initialized = true
}

export function setLocale(lang: string) {
  if (!lang) return
  $locale.set(lang)
}
