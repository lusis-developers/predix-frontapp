import APIBase from '../Base';
import type { ResponseMessageType } from '@/typings/ResponseMessagesTypes';
import type { Bet } from '@/typings/BetTypes';

class APIBets extends APIBase {
  async getBets(): Promise<Bet[]> {
    return this.get<Bet[]>('bets');
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
}


export default APIBets;