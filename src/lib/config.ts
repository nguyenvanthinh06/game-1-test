import { writable } from 'svelte/store'

export type GameConfig = {
  token?: string
  total_amount?: number
  currency?: string
  locales?: string
  apiUrl?: string
}

type WindowEmbed = {
  __GAME_EMBED__?: Partial<GameConfig>
}

declare const window: Window & WindowEmbed

const defaultConfig: GameConfig = {
  token: undefined,
  total_amount: 0,
  currency: 'BTC',
  locales: undefined,
  apiUrl: undefined,
}

export const config = writable<GameConfig>(defaultConfig)

export function initConfig(initial?: Partial<GameConfig>) {
  config.set({
    ...defaultConfig,
    ...(initial ?? {}),
  })
}

export function loadConfigFromWindow() {
  if (typeof window !== 'undefined' && window.__GAME_EMBED__) {
    initConfig(window.__GAME_EMBED__)
    return window.__GAME_EMBED__
  }
  return undefined
}
