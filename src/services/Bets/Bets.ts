import APIBase from '../Base';
import type { ResponseMessageType } from '@/typings/ResponseMessagesTypes';
import type { Bet } from '@/typings/BetTypes';
import { BetStatusEnum } from '@/enum/BetEnum';
import { PaginatedResponse } from '@/typings/Pagination';

class APIBets extends APIBase {
  async getBets(limit = 10, page = 1): Promise<PaginatedResponse<Bet>> {
    return this.get<PaginatedResponse<Bet>>(`bets?limit=${limit}&page=${page}`);
  }

  async createBet(bet: Bet): Promise<Bet> {
    return this.post<Bet>('bets', bet)
  }

  async updateBet(id: string, bet: Bet): Promise<ResponseMessageType> {
    return this.put<ResponseMessageType>(`bets/${id}`, bet);
  }

  async deleteBet(id: string): Promise<ResponseMessageType> {
    return this.delete<ResponseMessageType>(`bets/${id}`)
  }

  async getPendingBets(): Promise<Bet[]> {
    return this.get<Bet[]>(`bets/pendings`);
  }

  async patchUpdateBetStatus(id : string, status: BetStatusEnum): Promise<ResponseMessageType> {
    return this.patch<ResponseMessageType>(`bets/${id}`, { status: status })
  }

  async getFreeBets(): Promise<Bet[]> {
    return this.get<Bet[]>('bets/is-free');
  }

  async getFreePendingBets(): Promise<Bet[]> {
    return this.get<Bet[]>('bets/is-free/pendings');
  }

  async getPremiumPendingBets(): Promise<Bet[]> {
    return this.get<Bet[]>('bets/premium/pendings');
  }
}


export default APIBets;