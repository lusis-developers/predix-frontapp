import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import { UserRoleEnum } from '@/enum/UserEnum';
import useUserStore from '@/stores/UserStore'


export async function checkAccess(to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext) {
  const userStore = useUserStore();
  
  try {
    await userStore.getSession();
    
    const userRole = userStore.user?.role;
    if (!userRole || userRole.length === 0) {
      // if user is not authenticated, redirected to '/'
      next('/');
      return;
    }
  
    if (userRole?.includes(UserRoleEnum.ADMIN) && to.meta.requiresAdmin) {
      next();
    } else if (userRole?.includes(UserRoleEnum.USER) && to.meta.requiresUser) {
      next();
    } else {
      next('/access-denied');
    }
  } catch (error) {
    next('/');
  }
}