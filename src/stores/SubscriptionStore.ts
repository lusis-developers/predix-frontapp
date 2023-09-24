import { defineStore } from 'pinia';

import APISubscription from '@/services/Subscription/Subscription';

const subscriptionService = new APISubscription();

interface Roostate {
  planId: string | null,
  errorMessage: string | null,
  isLoading: boolean
}

export const useSubscriptionStore = defineStore('SubscriptionStore', {
  state: (): Roostate => ({
    planId: null,
    errorMessage: null,
    isLoading: false
  }),

  actions: {
    async subscribe() {
      this.isLoading = true;
      try {
        await subscriptionService.updateSubscription(localStorage.getItem('planId')!);
      } catch (error: any) {
        this.errorMessage = error.message;
      } finally {
        this.isLoading = false;
        localStorage.removeItem('planId');
      }
    }
  }
});

export default useSubscriptionStore;