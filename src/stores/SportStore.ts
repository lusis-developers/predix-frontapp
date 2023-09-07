import { defineStore } from 'pinia';

import APISports from '@/services/Sports/Sports';
import type { Sport } from '@/typings/SportTypes';
import type { ImageFile } from '@/typings/FileTypes';

const sportService = new APISports();

interface Roostate {
  sports: Sport[] | null,
  // selectedPlan: Plan | null,
  errorMessage: string | null,
  isLoading: boolean
}

export const useSportStore = defineStore('SportStore', {
  state: (): Roostate => ({
    sports: null,
    // selectedSport: null,
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

    async uploadSportImage(file: File): Promise<ImageFile | void> {
      this.isLoading = true;
      try {
        // const response = await plansService.uploadPlanImage(file);
        // return response.data;
      } catch (error: any) {
        this.errorMessage = error.message;
        return;
      } finally {
        this.isLoading = false;
      }
    },

    async createSport(sport: Plan): Promise<void> {
      this.isLoading = true;
      try {
        // await plansService.createPlan(plan);
        this.getSports();
      } catch (error: any) {
        this.errorMessage = error.message;
      } finally {
        this.isLoading = false;
      }
    },

    async updatePlan(plan: Plan): Promise<void> {
      this.isLoading = true;
      try {
        // await plansService.updatePlan(this.selectedPlan?._id!, plan);
        this.getPlans();
      } catch (error: any) {
        this.errorMessage = error.message;
      } finally {
        this.isLoading = false;
      }
    },

    async deletePlan(): Promise<void> {
      this.isLoading = true;
      try {
        // await plansService.deletePlan(this.selectedPlan?._id!);
        await this.getPlans();
      } catch (error: any) {
        this.errorMessage = error.message;
      } finally {
        this.isLoading = false;
      }
    }
  }
});

export default useSportStore;