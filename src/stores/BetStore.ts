import { defineStore } from 'pinia';

import APIBets from '@/services/Bets/Bets';
import { Bet } from '@/typings/BetTypes';

const betService = new APIBets();

interface Roostate {
  bets: Bet[] | null,
  selectedBet: Bet | null,
  errorMessage: string | null,
  isLoading: boolean
}

export const useBetStore = defineStore('LeagueStore', {
  state: (): Roostate => ({
    bets: null,
    selectedBet: null,
    errorMessage: null,
    isLoading: false
  }),

  actions: {
    async getBets(): Promise<void> {
      this.isLoading = true;
      try {
        const bets = await betService.getBets();
        this.bets = bets;
      } catch (error: any) {
        this.errorMessage = error.message;
      } finally {
        this.isLoading = false;
      }
    },

    async createBet(bet: Bet): Promise<void> {
      this.isLoading = true;
      try {
        await betService.createBet(bet);
        this.getBets();
      } catch (error: any) {
        this.errorMessage = error.message;
      } finally {
        this.isLoading = false;
      }
    },

    async updateBet(bet: Bet): Promise<void> {
      this.isLoading = true;
      try {
        await betService.updateBet(this.selectedBet?._id!, bet);
        this.getBets();
      } catch (error: any) {
        this.errorMessage = error.message;
      } finally {
        this.isLoading = false;
      }
    },

    async deleteBet(): Promise<void> {
      this.isLoading = true;
      try {
        await betService.deleteBet(this.selectedBet?._id!);
        this.getBets();
      } catch (error: any) {
        this.errorMessage = error.message;
      } finally {
        this.isLoading = false;
      }
    }
  }
});

export default useBetStore;