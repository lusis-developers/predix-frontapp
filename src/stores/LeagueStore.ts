import { defineStore } from 'pinia';

import APILeagues from '@/services/Leagues/Leagues';
import useSportStore from './SportStore';
import type { League } from '@/typings/LeagueTypes';
import type { ImageFile } from '@/typings/FileTypes';

const leagueService = new APILeagues();

const sportStore = useSportStore();

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

    async createLeague(league: League): Promise<void> {
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

    async updateLeague(id: string, league: League): Promise<void> {
      this.isLoading = true;
      try {
        await leagueService.updateLeague(id, league);
        // this.getSports();
      } catch (error: any) {
        this.errorMessage = error.message;
      } finally {
        this.isLoading = false;
      }
    },

    async deleteLeague(id: string): Promise<void> {
      this.isLoading = true;
      try {
        await leagueService.deleteLeague(id);
        if (sportStore.selectedSport) {
          sportStore.selectedSport.leaguesDetails = sportStore.selectedSport?.leaguesDetails
            .filter(league => league._id === id)
        }
      } catch (error: any) {
        this.errorMessage = error.message;
      } finally {
        this.isLoading = false;
      }
    }
  }
});

export default useLeagueStore;