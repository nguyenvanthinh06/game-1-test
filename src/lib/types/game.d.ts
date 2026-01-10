export type EmbedConfig<T = unknown> = {
  token?: string
  totalAmount?: number
  currency?: string
  locales?: string
  apiUrl?: string
  gameDetail?: T
}

export interface ITicket {
  min: number
  max: number
}

export interface IGameBetReq {
  action: "play"
  bet_amount: number
  entity_wallet_code: string
  tickets: ITicket[]
}

interface IGamePayload {
  win_chance: number
  tickets: ITicket[]
  ticket_result: number
}

export interface IGameBetRes {
  status: "finish_loss" | "finish_win"
  entity_wallet_code: string
  balance: number
  bet_amount: number
  nonce: number
  payout_multiplier: number
  payout_amount: number
  game_payload?: IGamePayload
}
