

<template>
  <header class="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
    <div class="flex items-center justify-between">
      <!-- Page Info -->
      <div>
        <h2 class="text-2xl font-semibold text-gray-800">{{ pageTitle }}</h2>
        <p class="text-gray-600 text-sm">{{ pageDescription }}</p>
      </div>
      
      <!-- Header Actions -->
      <div class="flex items-center space-x-4">
        <!-- Notifications -->
        <button 
          @click="toggleNotifications"
          class="relative p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200 rounded-lg hover:bg-gray-100"
          :class="{ 'text-green-500': hasUnreadNotifications }"
        >
          <font-awesome-icon icon="bell" class="text-lg" />
          
          <!-- Badge -->
          <span 
            v-if="notificationCount > 0" 
            class="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-md"
          >
            {{ notificationCount > 9 ? '9+' : notificationCount }}
          </span>
        </button>
        
        <!-- Settings -->
        <button 
          @click="openSettings"
          class="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200 rounded-lg hover:bg-gray-100"
        >
          <i class="fas fa-cog text-lg"></i>
        </button>
        
        <!-- View Portfolio Button -->
        <button 
          @click="viewPortfolio"
          class="px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-lg hover:bg-green-600 transition-colors duration-200 flex items-center space-x-2"
        >
          <i class="fas fa-external-link-alt"></i>
          <span>{{ $t('admin.header.viewPortfolio') }}</span>
        </button>
        
        <!-- User Profile -->
        <div class="flex items-center space-x-3 pl-4 border-l border-gray-200">
          <div class="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center">
            <!-- <i class="fas fa-user text-white text-sm">A</i> -->
            A
          </div>
          <div class="hidden md:block">
            <p class="text-sm font-medium text-gray-700">{{ $t('admin.sidebar.user.name') }}</p>
            <p class="text-xs text-gray-500">{{ userRole }}</p>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const router = useRouter()
const { locale, t } = useI18n()

// Reactive state
const notificationCount = ref(3)
const hasUnreadNotifications = computed(() => notificationCount.value > 0)
const userRole = computed(() => t('admin.sidebar.user.status'))

const currentLocale = computed(() => locale.value)

// Page info mapping
const pageInfo = computed(() => {
  const routeMap: Record<string, { title: string; description: string }> = {
    '/admin/dashboard': {
      title: t('admin.pages.dashboard.title'),
      description: t('admin.pages.dashboard.description')
    },
    '/admin/experiences': {
      title: t('admin.pages.experiences.title'),
      description: t('admin.pages.experiences.description')
    },
    '/admin/education': {
      title: t('admin.pages.education.title'),
      description: t('admin.pages.education.description')
    },
    '/admin/certifications': {
      title: t('admin.pages.certifications.title'),
      description: t('admin.pages.certifications.description')
    },
    '/admin/languages': {
      title: t('admin.pages.languages.title'),
      description: t('admin.pages.languages.description')
    },
    '/admin/projects': {
      title: t('admin.pages.projects.title'),
      description: t('admin.pages.projects.description')
    },
    '/admin/contact': {
      title: t('admin.pages.contact.title'),
      description: t('admin.pages.contact.description')
    }
  }
  
  return routeMap[route.path] || { 
    title: t('admin.pages.default.title'), 
    description: t('admin.pages.default.description') 
  }
})

const pageTitle = computed(() => pageInfo.value.title)
const pageDescription = computed(() => pageInfo.value.description)

// Methods
const toggleNotifications = () => {
  console.log('Toggle notifications')
  // Logique pour afficher/masquer les notifications
}

const openSettings = () => {
  console.log('Open settings')
  // Logique pour ouvrir les paramètres
}

const viewPortfolio = () => {
  // Ouvrir le portfolio dans un nouvel onglet
  window.open('/', '_blank')
}
</script>