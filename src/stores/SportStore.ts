import { defineStore } from 'pinia';

import APISports from '@/services/Sports/Sports';
import type { Sport } from '@/typings/SportTypes';
import type { ImageFile } from '@/typings/FileTypes';

const sportService = new APISports();

interface Roostate {
  sports: Sport[] | null,
  selectedSport: Sport | null,
  errorMessage: string | null,
  isLoading: boolean
}

export const useSportStore = defineStore('SportStore', {
  state: (): Roostate => ({
    sports: null,
    selectedSport: null,
    errorMessage: null,
    isLoading: false
  }),

  actions: {
    async getSports(): Promise<void> {
      this.isLoading = true;
      try {
        const response = await sportService.getSports();
        this.sports = response;
      } catch (error: any) {
        this.errorMessage = error.message;
      } finally {
        this.isLoading = false;
      }
    },

    async getSport(id: string): Promise<Sport | void> {
      this.isLoading = true;
      try {
        const sport = await sportService.getSport(id);
        return sport[0];
      } catch (error: any) {
        this.errorMessage = error.message;
      } finally {
        this.isLoading = false;
      }
    },

    async uploadSportImage(file: File): Promise<ImageFile | void> {
      this.isLoading = true;
      try {
        const response = await sportService.uploadSportImage(file);
        return response.data;
      } catch (error: any) {
        this.errorMessage = error.message;
        return;
      } finally {
        this.isLoading = false;
      }
    },

    async createSport(sport: Sport): Promise<void> {
      this.isLoading = true;
      try {
        await sportService.createSport(sport);
        this.getSports();
      } catch (error: any) {
        this.errorMessage = error.message;
      } finally {
        this.isLoading = false;
      }
    },

    async updateSport(sport: Sport): Promise<void> {
      this.isLoading = true;
      try {
        await sportService.updateSport(this.selectedSport?._id!, sport);
        this.getSports();
      } catch (error: any) {
        this.errorMessage = error.message;
      } finally {
        this.isLoading = false;
      }
    },

    async deleteSport(): Promise<void> {
      this.isLoading = true;
      try {
        await sportService.deleteSport(this.selectedSport?._id!);
        await this.getSports();
      } catch (error: any) {
        this.errorMessage = error.message;
      } finally {
        this.isLoading = false;
      }
    }
  }
});

export default useSportStore;