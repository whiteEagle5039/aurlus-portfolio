// src/router/index.ts

import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

// Layouts
import DefaultLayout from '../layouts/DefaultLayout.vue'
import AdminLayout from '../layouts/AdminLayout.vue'

// Pages Portfolio
import Home from '../components/Home.vue'

// Pages Admin Auth (sans layout)
import AdminLogin from '../admin/views/AdminLogin.vue'
import AdminChangePassword from '../admin/views/AdminChangePassword.vue'

// Pages Admin (avec layout)
import AdminDashboardHome from '../admin/views/AdminDashboardHome.vue'
import AdminExperience from '../admin/views/AdminExperience.vue'
import AdminEducation from '../admin/views/AdminEducation.vue'
import AdminCertifications from '../admin/views/AdminCertifications.vue'
import AdminLanguages from '../admin/views/AdminLanguages.vue'
import AdminProjects from '../admin/views/AdminProjects.vue'
import AdminAbout from '@/admin/views/AdminAbout.vue'
// Guards d'authentification
const requireAuth = (to: any, from: any, next: any) => {
  const token = localStorage.getItem('adminToken')
  if (token) {
    next()
  } else {
    next('/admin/login')
  }
}

const requireGuest = (to: any, from: any, next: any) => {
  const token = localStorage.getItem('adminToken')
  if (!token) {
    next()
  } else {
    next('/admin/dashboard')
  }
}

const routes: Array<RouteRecordRaw> = [
  // Routes publiques (portfolio)
  {
    path: '/',
    component: DefaultLayout,
    children: [
      { 
        path: '', 
        name: 'Home', 
        component: Home,
        meta: { title: 'Portfolio' }
      }
      // Ajoutez d'autres pages du portfolio ici si nécessaire
      // { path: 'about', name: 'About', component: About }
    ]
  },

  // Routes d'authentification admin (sans layout)
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: AdminLogin,
    beforeEnter: requireGuest,
    meta: { 
      title: 'Connexion Admin',
      requiresGuest: true 
    }
  },
  

  // Routes admin protégées (avec layout)
  {
    path: '/admin',
    component: AdminLayout,
    beforeEnter: requireAuth,
    meta: { requiresAuth: true },
    children: [
      // Redirection par défaut vers dashboard
      { 
        path: '', 
        redirect: '/admin/dashboard' 
      },
      { 
        path: 'dashboard', 
        name: 'AdminDashboard', 
        component: AdminDashboardHome,
        meta: { title: 'Tableau de bord' }
      },
      { 
        path: 'experiences', 
        name: 'AdminExperiences', 
        component: AdminExperience,
        meta: { title: 'Gestion des expériences' }
      },
      { 
        path: 'education', 
        name: 'AdminEducation', 
        component: AdminEducation,
        meta: { title: 'Gestion des formations' }
      },
      { 
        path: 'certifications', 
        name: 'AdminCertifications', 
        component: AdminCertifications,
        meta: { title: 'Gestion des certifications' }
      },
      { 
        path: 'languages', 
        name: 'AdminLanguages', 
        component: AdminLanguages,
        meta: { title: 'Langues & Compétences' }
      },
      { 
        path: 'projects', 
        name: 'AdminProjects', 
        component: AdminProjects,
        meta: { title: 'Gestion des projets' }
      },
      {
        path: 'change-password',
        name: 'AdminChangePassword',
        component: AdminChangePassword,
        meta: { title: 'Changer profil'}
      }, 
      {
        path: 'about',
        name: 'AdminAbout',
        component: AdminAbout,
        meta: { requiresAuth: true }
      }
    ]
  },

  // Route 404 - Redirection vers l'accueil
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // Gestion du scroll lors de la navigation
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  }
})

// Guard global pour la gestion des titres et de l'authentification
router.beforeEach((to, from, next) => {
  // Mise à jour du titre de la page
  if (to.meta?.title) {
    document.title = `${to.meta.title} - Portfolio`
  } else {
    document.title = 'Portfolio'
  }

  // Gestion spéciale pour la page de changement de mot de passe
  if (to.name === 'AdminChangePassword') {
    // Permettre l'accès si c'est un premier changement ou si l'utilisateur est connecté
    const token = localStorage.getItem('adminToken')
    const isFirstTimeChange = to.query.firstTime === 'true'
    
    if (token || isFirstTimeChange) {
      next()
    } else {
      next('/admin/login')
    }
    return
  }

  next()
})

// Guard après navigation pour des actions spécifiques
router.afterEach((to, from) => {
  // Actions à effectuer après chaque navigation
  // Par exemple, analytics, logs, etc.
})

export default router