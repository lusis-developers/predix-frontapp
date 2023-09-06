import {
  createRouter,
  createWebHistory,
  Router,
  RouteRecordRaw
} from 'vue-router';

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
      title: 'Dashboard'
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
  }
]

const router: Router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, _from, next) => {
  document.title = to.meta.title as string;
  next()
});

export default router
