import { BetEnum } from "@/enum/BetEnum"

export type Bet = {
  _id?: string,
  sport: string,
  league: string,
  teamA: string,
  teamB: string,
  date: string,
  profit: number,
  percentage: number,
  description: string,
  isFree: boolean,
  status: BetEnum   
}