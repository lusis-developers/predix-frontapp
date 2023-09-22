import { defineStore } from 'pinia';
import router from '@/router';

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
        this.user = response.data;

        localStorage.setItem('access_token', this.user?.token!);

        await router.push('/dashboard/picks');
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
        await router.push('/login');
      } catch (error: any) {
        this.errorMessage = error.message;
      } finally {
        this.isLoading = false;
      }
    },

    async getSession(): Promise<void> {
      this.isLoading = false;
      try {
        const response = await userService.getSession();
        this.user = response.data;
      } catch (error: any) {
        this.errorMessage = error.message;
      } finally {
        this.isLoading = false;
      }
    },

    async logout(): Promise<void> {
      this.isLoading = true;
      try {
        localStorage.removeItem('access_token');
        this.user = null;
        await router.push('/');
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
    async updateUser(user: User): Promise<void> {
      this.isLoading = true;
      try {
        await userService.updateUser(this.user?._id!, user);
        await this.getSession();  
      } catch (error: any) {
        this.errorMessage = error.message;
      } finally {
        this.isLoading = false;
      }
    },
    
  }
});

export default useUserStore;