<svelte:options customElement="game-1-test" />

<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import BetForm from "./lib/components/BetForm.svelte";
  import { readEmbedConfig } from "./lib/embed";
  import { setupI18n, setLocale } from "./lib/i18n";
  import GameMain from "./lib/components/GameMain.svelte";
  import { isLoading } from "svelte-i18n";
  import Loading from "./lib/components/Loading.svelte";
  import { embedConfig } from "./lib/stores/common";
  import { http } from "./lib/http";
  import { observeElementSize } from "./lib/utils";

  // Defaults from URL/query/global for iframe usage.
  const embedDefaults = readEmbedConfig();

  // Props from the custom element. These are populated when the host sets
  // attributes (token -> token, total-amount -> total_amount, api-url -> apiUrl).
  export let token: string | undefined = embedDefaults.token;
  export let totalAmount: number | undefined = embedDefaults.totalAmount;
  export let currency: string | undefined = embedDefaults.currency;
  export let locales: string | undefined = embedDefaults.locales;
  export let apiUrl: string | undefined = embedDefaults.apiUrl;

  let container: HTMLElement | null = null;
  let cleanupSize: (() => void) | null = null;
  let widthFrame: number | undefined;
  let heightFrame: number | undefined;
  let startTrigger = 0;
  // Setup i18n
  setupI18n(locales ?? "en");
  setLocale(locales ?? "en");

  // Setup http client
  http.setToken(token ?? "");
  http.setBaseUrl(apiUrl ?? "");
  // Set embedConfig to store
  embedConfig.set({
    totalAmount: totalAmount ?? 0,
    currency: currency ?? "USD",
  });

  onMount(() => {
    cleanupSize = observeElementSize(container, ({ width, height }) => {
      widthFrame = width;
      heightFrame = height;
    });
  });

  onDestroy(() => {
    cleanupSize?.();
  });
</script>

<div
  bind:this={container}
  class="vitc-game"
  style={`width: ${widthFrame ? `${widthFrame}px` : "100%"}; height: ${heightFrame ? `${heightFrame}px` : "100%"};`}
>
  {#if $isLoading}
    <Loading />
  {:else}
    <div class="vitc-game__sidebar">
      <BetForm />
    </div>
    <div class="vitc-game__main" style="flex: 1;">
      <GameMain />
    </div>
  {/if}
</div>

<style lang="scss">
  .vitc-game {
    width: 100%;
    height: 100%;
    display: flex;
    color: var(--color-white);
    background-color: var(--primary-color);
    font-family:
      "Inter",
      system-ui,
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      sans-serif;

    &__sidebar {
      width: 30%;
      height: 100%;
      background-color: var(--secondary-color);
    }

    &__main {
      flex: 1;
    }
  }
</style>
