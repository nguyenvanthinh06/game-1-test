import { http } from "../http";
import type { IGameBetReq, IGameBetRes } from "../types/game";

export async function betGame(req: IGameBetReq): Promise<IGameBetRes> {
  const res = await http.post<IGameBetRes>(
    "game-originals/originals_dice/handle",
    req
  );
  return res;
}