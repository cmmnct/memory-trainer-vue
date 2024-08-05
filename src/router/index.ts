import { createRouter, createWebHistory } from '@ionic/vue-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import HomeView from '@/views/HomeView.vue';
import GameView from '@/views/GameView.vue';
import LoginView from '@/views/LoginView.vue';
import SignUpView from '@/views/SignUpView.vue';
import StatisticsView from '@/views/StatisticsView.vue';

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    component: HomeView,
  },
  {
    path: '/game',
    component: GameView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    component: LoginView,
  },
  {
    path: '/signup',
    component: SignUpView,
  },
  {
    path: '/statistics',
    component: StatisticsView,
  },
];

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

router.beforeEach((to, from, next) => {
  const auth = getAuth();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  
  if (requiresAuth) {
    onAuthStateChanged(auth, user => {
      if (user) {
        next();
      } else {
        next('/login');
      }
    });
  } else {
    next();
  }
});

export default router;
