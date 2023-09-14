import { defineStore } from 'pinia';

import APIBets from '@/services/Bets/Bets';
import { Bet } from '@/typings/BetTypes';
import { BetStatusEnum } from '@/enum/BetEnum';

const betService = new APIBets();

interface Roostate {
  bets: Bet[] | null,
  pendingBets: Bet[] | null,
  freeBets: Bet[] | null,
  freePendingBets: Bet[] | null,
  premiumPendingBets: Bet[] | null, 
  selectedBet: Bet | null,
  errorMessage: string | null,
  isLoading: boolean
}

export const useBetStore = defineStore('BetStore', {
  state: (): Roostate => ({
    bets: null,
    pendingBets: null,
    freeBets: null,
    freePendingBets: null,
    premiumPendingBets: null,
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
        this.getPendingBets();
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
        this.getPendingBets();
      } catch (error: any) {
        this.errorMessage = error.message;
      } finally {
        this.isLoading = false;
      }
    },

    async deleteBet(id: string): Promise<void> {
      this.isLoading = true;
      try {
        await betService.deleteBet(id);
        this.getBets();
      } catch (error: any) {
        this.errorMessage = error.message;
      } finally {
        this.isLoading = false;
      }
    },

    async getPendingBets(): Promise<void> {
      this.isLoading = true;
      try {
        const response = await betService.getPendingBets();
        this.pendingBets = response;
      } catch (error: any) {
        this.errorMessage = error.message;
      } finally {
        this.isLoading = false;
      }
    },

    async patchUpdateBetStatus(id: string, status: BetStatusEnum): Promise<void> {
      this.isLoading = true;
      try {
        await betService.patchUpdateBetStatus(id, status);
        this.getPendingBets();
      } catch (error: any) {
        this.errorMessage = error.message;
      } finally {
        this.isLoading = false;
      }
    },

    async getFreeBets(): Promise<void> {
      this.isLoading = true;
      try {
        const response = await betService.getFreeBets();
        this.freeBets = response;
      } catch (error: any) {
        this.errorMessage = error.message;
      } finally {
        this.isLoading = false;
      }
    },

    async getFreePendingBets(): Promise<void> {
      this.isLoading = true;
      try {
        const response = await betService.getFreePendingBets();
        this.freePendingBets = response;
      } catch (error: any) {
        this.errorMessage = error.message;
      } finally {
        this.isLoading = false;
      }
    },

    async getPremiumPendingBets(): Promise<void> {
      this.isLoading = true;
      try {
        const response = await betService.getPremiumPendingBets();
        this.premiumPendingBets = response;
      } catch (error: any) {
        this.errorMessage = error.message;
      } finally {
        this.isLoading = false;
      }
    }
  },
});

export default useBetStore;