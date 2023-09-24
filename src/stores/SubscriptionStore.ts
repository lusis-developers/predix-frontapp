import { defineStore } from 'pinia';

import APISubscription from '@/services/Subscription/Subscription';
import useUserStore from './UserStore';

const subscriptionService = new APISubscription();

const userStore = useUserStore();

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
        localStorage.removeItem('is-paying');
        userStore.getSession();
      }
    }
  }
});

export default useSubscriptionStore;