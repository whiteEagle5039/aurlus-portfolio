<template>
  <aside class="w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col">
    <!-- Logo/Brand -->
    <div class="p-6 border-b border-gray-200">
      <h1 class="text-2xl font-bold text-green-500">Admin Panel</h1>
      <p class="text-sm text-gray-600 mt-1">Gestion du portfolio</p>
    </div>

    <!-- Navigation Menu -->
    <nav class="flex-1 px-4 py-6">
      <ul class="space-y-2">
        <li v-for="item in menuItems" :key="item.path">
          <router-link
            :to="item.path"
            :class="[
              'flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200',
              isActiveRoute(item.path) 
                ? 'bg-green-100 text-green-700 border-r-2 border-green-500' 
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            ]"
          >
            <i :class="[item.icon, 'mr-3 text-lg']"></i>
            {{ item.label }}
          </router-link>
        </li>
      </ul>
    </nav>

    <!-- User Info / Footer -->
    <div class="p-4 border-t border-gray-200">
      <div class="flex items-center space-x-3">
        <div class="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
          <i class="fas fa-user text-white"></i>
        </div>
        <div class="flex-1">
          <p class="text-sm font-medium text-gray-900">Administrateur</p>
          <p class="text-xs text-gray-600">En ligne</p>
        </div>
      </div>
      
      <button 
        @click="handleLogout"
        class="w-full mt-3 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200 flex items-center justify-center"
      >
        <i class="fas fa-sign-out-alt mr-2"></i>
        Déconnexion
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const menuItems = [
  {
    path: '/admin/dashboard',
    label: 'Tableau de bord',
    icon: 'fas fa-tachometer-alt'
  },
  {
    path: '/admin/experiences',
    label: 'Expériences',
    icon: 'fas fa-briefcase'
  },
  {
    path: '/admin/education',
    label: 'Formations',
    icon: 'fas fa-graduation-cap'
  },
  {
    path: '/admin/certifications',
    label: 'Certifications',
    icon: 'fas fa-certificate'
  },
  {
    path: '/admin/languages',
    label: 'Langues & Compétences',
    icon: 'fas fa-language'
  },
  {
    path: '/admin/projects',
    label: 'Projets',
    icon: 'fas fa-project-diagram'
  },
  {
    path: '/admin/contact',
    label: 'Messages',
    icon: 'fas fa-envelope'
  }
]

const isActiveRoute = (path: string) => {
  return route.path === path
}

const handleLogout = () => {
  // Logique de déconnexion
  console.log('Déconnexion...')
  // router.push('/')
}
</script>