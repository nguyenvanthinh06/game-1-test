import { writable } from "svelte/store";
import type { IGameBetReq } from "../types/game";

export const startTrigger = writable<number>(0)
export const gameReqData = writable<IGameBetReq | undefined>(undefined);