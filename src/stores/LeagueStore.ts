import { defineStore } from 'pinia';

import APILeagues from '@/services/Leagues/Leagues';
import type { League } from '@/typings/LeagueTypes';
import type { ImageFile } from '@/typings/FileTypes';

const leagueService = new APILeagues();

interface Roostate {
  leagues: League[] | null,
  selectedLeague: League | null,
  errorMessage: string | null,
  isLoading: boolean
}

export const useLeagueStore = defineStore('LeagueStore', {
  state: (): Roostate => ({
    leagues: null,
    selectedLeague: null,
    errorMessage: null,
    isLoading: false
  }),

  actions: {
    // async getSports(): Promise<void> {
    //   this.isLoading = true;
    //   try {
    //     const response = await sportService.getSports();
    //     this.sports = response;
    //   } catch (error: any) {
    //     this.errorMessage = error.message;
    //   } finally {
    //     this.isLoading = false;
    //   }
    // },

    async uploadLeagueImage(file: File): Promise<ImageFile | void> {
      this.isLoading = true;
      try {
        const response = await leagueService.uploadLeagueImage(file);
        return response.data;
      } catch (error: any) {
        this.errorMessage = error.message;
        return;
      } finally {
        this.isLoading = false;
      }
    },

    async createSport(league: League): Promise<void> {
      this.isLoading = true;
      try {
        await leagueService.createLeagues(league);
        // this.getSports();
      } catch (error: any) {
        this.errorMessage = error.message;
      } finally {
        this.isLoading = false;
      }
    },

    // async updateSport(sport: Sport): Promise<void> {
    //   this.isLoading = true;
    //   try {
    //     await sportService.updateSport(this.selectedSport?._id!, sport);
    //     this.getSports();
    //   } catch (error: any) {
    //     this.errorMessage = error.message;
    //   } finally {
    //     this.isLoading = false;
    //   }
    // },

    // async deleteSport(): Promise<void> {
    //   this.isLoading = true;
    //   try {
    //     await sportService.deleteSport(this.selectedSport?._id!);
    //     await this.getSports();
    //   } catch (error: any) {
    //     this.errorMessage = error.message;
    //   } finally {
    //     this.isLoading = false;
    //   }
    // }
  }
});

export default useLeagueStore;