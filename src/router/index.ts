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
        }
      }
    ]
  }
]

const router: Router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title as string;
  next()
});

export default router
