import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GaleryView from '@/views/GaleryView.vue'
import PhotosView from '@/components/gallery/PhotosView.vue'
import ThemeView from '@/views/ThemeView.vue'
import Login from '@/views/Auth/LoginView.vue'
import SecretFriendView from '@/views/SecretFriendView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/galeria',
      name: 'galeria',
      component: GaleryView,
    },
    {
      path: '/fotos',
      name: 'photo-view',
      component: PhotosView,
    },
    {
      path: '/tematica',
      name: 'theme-view',
      component: ThemeView,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/amigo-secreto',
      name: 'secret-friend-view',
      component: SecretFriendView,
      meta: { requiresAuth: true }
    }
  ],
  scrollBehavior() {
    return { top: 0 }
  },

})


export default router
