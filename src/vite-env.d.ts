/// <reference types="svelte" />
/// <reference types="vite/client" />

declare module '*.svelte' {
  import { SvelteComponentTyped } from 'svelte'
  export default class Component<
    Props = Record<string, never>,
    Events = Record<string, CustomEvent<any>>,
    Slots = Record<string, any>
  > extends SvelteComponentTyped<Props, Events, Slots> {}
}
