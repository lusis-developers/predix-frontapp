import { defineStore } from 'pinia';

import type { Plan } from '@/typings/PlanTypes';
import APIPlans from '@/services/Plans/Plans';

const plansService = new APIPlans();

interface Roostate {
  plans: Plan[] | null,
  errorMessage: string | null,
  isLoading: boolean
}

export const usePlanStore = defineStore('PlanStore', {
  state: (): Roostate => ({
    plans: null,
    errorMessage: null,
    isLoading: false
  }),

  actions: {
    async getPlans(): Promise<void> {
      this.isLoading = true;
      try {
        const response = await plansService.getPlans();
        this.plans = response;
      } catch (error: any) {
        this.errorMessage = error.message;
      } finally {
        this.isLoading = false;
      }
    }
  }
});

export default usePlanStore;