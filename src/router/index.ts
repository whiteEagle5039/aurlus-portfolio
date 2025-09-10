// src/router/index.ts

import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

// Layouts
import DefaultLayout from '../layouts/DefaultLayout.vue'
import AdminLayout from '../layouts/AdminLayout.vue'

// Pages Portfolio
import Home from '../components/Home.vue'

// Pages Admin
import AdminDashboardHome from '../admin/views/AdminDashboardHome.vue'
import AdminExperience from '../admin/views/AdminExperience.vue'
import AdminEducation from '../admin/views/AdminEducation.vue'
import AdminCertifications from '../admin/views/AdminCertifications.vue'
import AdminLanguages from '../admin/views/AdminLanguages.vue'
import AdminProjects from '../admin/views/AdminProjects.vue'
import AdminContact from '../admin/views/AdminContact.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      { path: '', name: 'Home', component: Home },
      // { path: 'about', name: 'About', component: About }
    ]
  },
  {
    path: '/admin',
    component: AdminLayout,
    children: [
      { path: 'dashboard', name: 'AdminDashboard', component: AdminDashboardHome },
      { path: 'experiences', name: 'AdminExperiences', component: AdminExperience },
      { path: 'education', name: 'AdminEducation', component: AdminEducation },
      { path: 'certifications', name: 'AdminCertifications', component: AdminCertifications },
      { path: 'languages', name: 'AdminLanguages', component: AdminLanguages },
      { path: 'projects', name: 'AdminProjects', component: AdminProjects },
      { path: 'contact', name: 'AdminContact', component: AdminContact }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
