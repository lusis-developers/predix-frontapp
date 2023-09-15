import Navigation from '@/typings/LayoutTypes';

export const menuItems: Navigation[] = [
  {
    name: 'Histórico',
    link: 'record',
    icon: 'fa-solid fa-chart-area',
  },
  {
    name: 'Resultados',
    link: 'results',
    icon: 'fa-solid fa-star'
  },
  {
    name: 'Apuestas',
    link: 'bets',
    icon: 'fa-solid fa-chalkboard-user'
  },
  {
    name: 'Planes',
    link: 'plans',
    icon: 'fa-solid fa-ticket'
  },
  {
    name: 'Deportes',
    link: 'sports',
    icon: 'fa-sharp fa-solid fa-baseball'
  },
];

export const userMenuItems: Navigation[] = [
  {
    name: 'Picks',
    link: 'picks',
    icon: 'fa-solid fa-receipt',
  },
  {
    name: 'Estadística',
    link: 'statistics',
    icon: 'fa-solid fa-chart-simple',
  },
  {
    name: 'Perfil',
    link: 'profile',
    icon: 'fa-solid fa-user',
  },
];

export const webMenuItems: Navigation[] = [
  { name: "Histórico", 
    link: "/web/historial" 
  },
  { name: "Contacto", 
    link: "/web/contact" 
  },
  { name: "Planes", 
    link: "/web/subscriptions" 
  },
  { name: "Empezar gratis", 
    link: "/" 
  },
  { name: "Suscribirse", 
    link: "/web/subscriptions" 
  },
]