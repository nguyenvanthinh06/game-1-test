import type { EmbedConfig } from "./types/game";
import { pickKey, toNumber } from "./utils";


export function readEmbedConfig<T = unknown>(): EmbedConfig<T> {
  if (typeof window === "undefined") return {};

  const params = new URLSearchParams(window.location.search);
  const frameEl = window.frameElement as HTMLElement | null;
  const dataset = (frameEl?.dataset ?? {}) as Record<string, string>;
  const globalCfg = (window as any).__GAME_EMBED__ ?? {};

  const pick = (key: string) =>
    params.get(key) ?? pickKey(dataset, key) ?? pickKey(globalCfg, key);

  const token = pick("token") ?? pick("access_token");
  const totalAmount =
    toNumber(pick("total_amount") ?? pick("totalAmount")) ?? 0;
  const currency = pick("currency") ?? undefined;
  const locales = pick("locales") ?? pick("locale") ?? 'en';
  const apiUrl =
    pick("apiUrl") ?? pick("api_url") ?? pick("apiurl") ?? '';

  return { token, totalAmount, currency, locales, apiUrl };
}
