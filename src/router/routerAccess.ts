import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import APIUsers from '@/services/User/User';
import { UserRoleEnum } from '@/enum/UserEnum';

const userService = new APIUsers();

export async function checkAccess(to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext) {  
  try {
    const response = await userService.getSession();
    const userRole = response.data?.role;
    const emailVerified = response.data.emailVerified;

    if (!userRole || userRole.length === 0) {
      // if user is not authenticated, redirected to '/'
      next('/');
      return;
    }
  
    if (userRole?.includes(UserRoleEnum.ADMIN) && to.meta.requiresAdmin) {
      next();
    } else if (userRole?.includes(UserRoleEnum.USER) && to.meta.requiresUser) {
      if (!emailVerified) {
        next('/no-email-verify');
      }
      next();
    } else {
      next('/access-denied');
    }
  } catch (error) {
    next('/');
  }
}