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
        await subscriptionService.updateSubscription(this.planId!);
      } catch (error: any) {
        this.errorMessage = error.message;
      } finally {
        this.isLoading = false;
      }
    }
  }
});

export default useSubscriptionStore;