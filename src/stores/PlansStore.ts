import { defineStore } from 'pinia';

import type { Plan } from '@/typings/PlanTypes';
import APIPlans from '@/services/Plans/Plans';

const plansService = new APIPlans();

interface Roostate {
  userData: Plan[] | null,
  errorMessage: string | null,
  isLoading: boolean
}

export const usePlanStore = defineStore('PlanStore', {
  state: (): Roostate => ({
    userData: null,
    errorMessage: null,
    isLoading: false
  }),

  actions: {
    async getPlans(): Promise<void> {
      this.isLoading = true;
      try {
        const response = await plansService.getPlans('plans');
        console.log(response);
      } catch (error) {
        this.errorMessage = error.message;
      } finally {
        this.isLoading = false;
      }
    }
  }
});

export default usePlanStore;