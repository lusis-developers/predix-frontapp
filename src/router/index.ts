import {
  createRouter,
  createWebHistory,
  Router,
  RouteRecordRaw
} from 'vue-router';

import { checkAccess } from './routerAccess';

// import layout components 
const DefaultContainer = () => import('@/components/webpage/layout/DefaultContainer.vue');
const InternalContainer = () => import('@/components/app/layout/AdminLayout.vue');

//import web views
import WebIndex from '@/views/WebIndex.vue';

// internal app views
const DashboardContainer = () => import('@/views/InternalApp/DashboardContainer.vue');
const TheRecords = () => import('@/views/InternalApp/TheRecords/TheRecords.vue');
const TheResults = () => import('@/views/InternalApp/TheResults/TheResults.vue');
const TheBets = () => import('@/views/InternalApp/TheBets/TheBets.vue');
const ThePlans = () => import('@/views/InternalApp/ThePlans/ThePlans.vue');
const TheSports = () => import('@/views/InternalApp/TheSports/TheSports.vue');

// user app views
// const UserDashboard = () => import('@/views/user/DashboardContainer.vue');
const UserBets = () => import('@/views/user/Bets/TheBets.vue');
const UserProfile = () => import('@/views/user/Profile/TheProfile.vue');
const UserRegister = () => import('@/views/UserRegister.vue');
const UserLogin = () => import('@/views/UserLogin.vue')


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'HomeView',
    component: DefaultContainer,
    meta: {
      title: 'Predix, apuestas deportivas 🏐🥇'
    },
    children: [
      {
        path: '',
        name: 'Web',
        component: WebIndex,
      }
    ]
  },
  {
    path: '/internal-app/dashboard',
    name: 'Dashboard',
    component: InternalContainer,
    meta: {
      requiresAdmin: true,
      title: 'Dashboard'
    },
    beforeEnter: async (to, from, next) => {
      await checkAccess(to, from, next);
    },
    children: [
      {
        path: '',
        name: 'internal-dashboard',
        component: DashboardContainer,
        meta: {
          title: 'Administrador'
        },
        children: [
          {
            path: 'record',
            name: 'record',
            component: TheRecords,
            meta: {
              title: 'Historico 📊'
            }
          },
          {
            path: 'results',
            name: 'results',
            component: TheResults,
            meta: {
              title: 'Resultados 📗'
            }
          },
          {
            path: 'bets',
            name: 'bets',
            component: TheBets,
            meta: {
              title: 'Apuestas 🥇'
            }
          },
          {
            path: 'plans',
            name: 'plans',
            component: ThePlans,
            meta: {
              title: 'Planes 📝'
            }
          },
          {
            path: 'sports',
            name: 'sports',
            component: TheSports,
            meta: {
              title: 'Deportes ⚾️'
            }
          },
        ],
      },   
    ],
  },
  {
    path: '/dashboard',
    name: 'UserDashboard',
    component: InternalContainer,
    meta: {
      requiresUser: true,
      title: 'Tú Dashboard'
    },
    beforeEnter: async (to, from, next) => {
      await checkAccess(to, from, next);
    },
    children: [
      {
        path: '',
        name: 'user-container',
        component: DashboardContainer,
        meta: {
          title: 'Administrador'
        },
        children: [
          {
            path: 'picks',
            name: 'picks',
            component: UserBets,
            meta: {
              title: 'Apuesta y gana 😎'
            }
          },
          {
            path: 'profile',
            name: 'profile',
            component: UserProfile,
            meta: {
              title: 'Cuéntanos de ti 😁'
            }
          },
          {
            path: 'statistics',
            name: 'statistics',
            component: UserProfile,
            meta: {
              title: 'Cuéntanos de ti 😁'
            }
          },
        ]
      },   
    ],
  },
  {
    path: '/register',
    name: 'Register',
    component: UserRegister,
    meta: {
      title: 'Regístrate'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: UserLogin,
    meta: {
      title: 'Inicia Sesión'
    }
  }
]

const router: Router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, _from, next) => {
  document.title = to.meta.title as string;

  next()
});

export default router
