import { defineStore } from 'pinia';

import APIUsers from '@/services/User/User';
import type { User } from '@/typings/UserTypes';
import type { ImageFile } from '@/typings/FileTypes';

const userService = new APIUsers(); 

interface Roostate {
  user: User | null,
  errorMessage: string | null,
  isLoading: boolean
}

export const useUserStore = defineStore('UserStore', {
  state: (): Roostate => ({
    user: null,
    errorMessage: null,
    isLoading: false
  }),

  actions: {
    async uploadUserImage(file: File): Promise<ImageFile | void> {
      this.isLoading = true;
      try {
        const response = await userService.uploadUserImage(file);
        return response.data;
      } catch (error: any) {
        this.errorMessage = error.message;
        return;
      } finally {
        this.isLoading = false;
      }
    },

    async login(email: string, password: string): Promise<void> {
      this.isLoading = true;
      try {
        const response = await userService.login(email, password);
        this.user = response.data
      } catch (error: any) {
        this.errorMessage = error.message;
      } finally {
        this.isLoading = false;
      }
    },

    async register(email: string, password: string, birthdate: string): Promise<void> {
      this.isLoading = true;
      try {
        await userService.register(email, password, birthdate);
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
  }
});

export default useUserStore;