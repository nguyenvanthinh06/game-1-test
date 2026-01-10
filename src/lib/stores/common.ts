import { writable } from "svelte/store";
import type { EmbedConfig } from "../types/game";

export const embedConfig = writable<EmbedConfig>({
  totalAmount: 0,
  currency: 'USD',
});