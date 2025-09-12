<template>
  <aside class="w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col">
    <!-- Logo/Brand -->
    <div class="p-6 border-b border-gray-200">
      <h1 class="text-2xl font-bold text-green-500">{{ $t('admin.sidebar.title') }}</h1>
      <p class="text-sm text-gray-600 mt-1">{{ $t('admin.sidebar.subtitle') }}</p>
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
            {{ $t(`admin.sidebar.menu.${item.key}`) }}
          </router-link>
        </li>
      </ul>
    </nav>

    <!-- Language Toggle & User Info / Footer -->
    <div class="p-4 border-t border-gray-200">
      <!-- Language Toggle Button -->
      <div class="mb-4">
        <button 
          @click="toggleLanguage" 
          class="w-full p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center space-x-2"
          :aria-label="$t('admin.sidebar.toggleLanguage')"
        >
          <i class="fas fa-language text-gray-600"></i>
          <span class="text-gray-700 font-medium">{{ currentLocale.toUpperCase() }}</span>
        </button>
      </div>

      <!-- Logout Button -->
      <button 
        @click="handleLogout"
        class="w-full px-3 py-2 bg-red-700 text-sm text-gray-900 hover:bg-red-600 rounded-lg transition-colors duration-200 flex items-center justify-center"
      >
        <i class="fas fa-sign-out-alt mr-2"></i>
        {{ $t('admin.sidebar.logout') }}
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { API_BASE_URL, API_ENDPOINT, TOKEN_STORAGE_KEY } from '@/config/global'

const route = useRoute()
const router = useRouter()
const { locale, t } = useI18n()

const currentLocale = computed(() => locale.value)

const menuItems = [
  {
    path: '/admin/dashboard',
    key: 'dashboard',
    icon: 'fas fa-tachometer-alt'
  },
  {
    path: '/admin/experiences',
    key: 'experiences',
    icon: 'fas fa-briefcase'
  },
  {
    path: '/admin/education',
    key: 'education',
    icon: 'fas fa-graduation-cap'
  },
  {
    path: '/admin/certifications',
    key: 'certifications',
    icon: 'fas fa-certificate'
  },
  {
    path: '/admin/languages',
    key: 'languages',
    icon: 'fas fa-language'
  },
  {
    path: '/admin/projects',
    key: 'projects',
    icon: 'fas fa-project-diagram'
  },
  {
    path: '/admin/contact',
    key: 'contact',
    icon: 'fas fa-envelope'
  },
  {
    path: '/admin/change-password',
    key: 'adminChangePassword',
    icon: 'fas fa-key'
  },
]

const isActiveRoute = (path: string) => {
  return route.path === path
}

const toggleLanguage = () => {
  const newLocale = locale.value === 'fr' ? 'en' : 'fr'
  locale.value = newLocale
  localStorage.setItem('userLocale', newLocale)
}

//logique de déconnexion
const handleLogout = async () => {
  console.log('Déconnexion...')
  try{
    await new Promise(resolve => setTimeout(resolve, 1500))
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINT.logout}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json', 
        'Authorization': `Bearer ${localStorage.getItem(`${TOKEN_STORAGE_KEY}`)}` // Utilisation de la clé depuis la config
      },
     
    })

    if (response && response.ok) {
      console.log('Déconnexion réussie')
      localStorage.removeItem(`${TOKEN_STORAGE_KEY}`) // Utilisation de la clé depuis la config
      router.push('/admin/login')
      
    } else {
      //debug key error
      console.log(`Contenue de la clé : `, localStorage.getItem(`${TOKEN_STORAGE_KEY}`)) // Utilisation de la clé depuis la config
      console.error('Échec de la déconnexion')
    }

  }catch(error){
    console.error('Erreur lors de la déconnexion:', error)
  }
}
</script>