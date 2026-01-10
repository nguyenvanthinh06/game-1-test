import { mount } from 'svelte'
import BetForm from './components/BetForm.svelte'
import type { GameConfig } from './config'

export type WidgetInstance = {
  destroy: () => void
  setProps: (props: Partial<GameConfig>) => void
}

export function mountGameWidget(target: HTMLElement, props?: Partial<GameConfig>): WidgetInstance {
  const app = mount(BetForm, { target, props })

  return {
    destroy() {
      if (app && typeof (app as any).$destroy === 'function') {
        ;(app as any).$destroy()
      }
    },
    setProps(nextProps: Partial<GameConfig>) {
      if (app && typeof (app as any).$set === 'function') {
        ;(app as any).$set(nextProps)
      }
    },
  }
}
