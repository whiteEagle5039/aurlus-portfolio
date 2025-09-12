<template>
  <div class="space-y-6">
    <!-- Indicateur de chargement -->
    <div v-if="loading" class="flex justify-center items-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      <span class="ml-2 text-gray-600">{{ $t('common.loading') }}</span>
    </div>

    <div v-else>
      <!-- Statistiques -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-2 bg-blue-100 rounded-lg">
              <i class="fas fa-briefcase text-blue-600"></i>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">{{ $t('admin.pages.dashboard.stats.experiences') }}</p>
              <p class="text-2xl font-semibold text-gray-900">{{ stats.experiences }}</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-2 bg-green-100 rounded-lg">
              <i class="fas fa-graduation-cap text-green-600"></i>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">{{ $t('admin.pages.dashboard.stats.educations') }}</p>
              <p class="text-2xl font-semibold text-gray-900">{{ stats.educations }}</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-2 bg-yellow-100 rounded-lg">
              <i class="fas fa-certificate text-yellow-600"></i>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">{{ $t('admin.pages.dashboard.stats.certifications') }}</p>
              <p class="text-2xl font-semibold text-gray-900">{{ stats.certifications }}</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-2 bg-purple-100 rounded-lg">
              <i class="fas fa-project-diagram text-purple-600"></i>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">{{ $t('admin.pages.dashboard.stats.projects') }}</p>
              <p class="text-2xl font-semibold text-gray-900">{{ stats.projects }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-2 bg-indigo-100 rounded-lg">
              <i class="fas fa-language text-indigo-600"></i>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">{{ $t('admin.pages.dashboard.stats.languages') }}</p>
              <p class="text-2xl font-semibold text-gray-900">{{ stats.languages }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-2 bg-pink-100 rounded-lg">
              <i class="fas fa-cogs text-pink-600"></i>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">{{ $t('admin.pages.dashboard.stats.skills') }}</p>
              <p class="text-2xl font-semibold text-gray-900">{{ stats.skills }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Actions rapides -->
      <div class="bg-white rounded-lg shadow">
        <div class="m-6 p-6 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">{{ $t('admin.pages.dashboard.quickActions.title') }}</h3>
        </div>
        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <router-link
              to="/admin/experiences"
              class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <i class="fas fa-plus text-green-600 mr-3"></i>
              <span class="font-medium">{{ $t('admin.pages.dashboard.quickActions.addExperience') }}</span>
            </router-link>
            
            <router-link
              to="/admin/education"
              class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <i class="fas fa-plus text-blue-600 mr-3"></i>
              <span class="font-medium">{{ $t('admin.pages.dashboard.quickActions.addEducation') }}</span>
            </router-link>
            
            <router-link
              to="/admin/certifications"
              class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <i class="fas fa-plus text-yellow-600 mr-3"></i>
              <span class="font-medium">{{ $t('admin.pages.dashboard.quickActions.addCertification') }}</span>
            </router-link>
            
            <router-link
              to="/admin/projects"
              class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <i class="fas fa-plus text-purple-600 mr-3"></i>
              <span class="font-medium">{{ $t('admin.pages.dashboard.quickActions.addProject') }}</span>
            </router-link>
            
            <router-link
              to="/admin/skills"
              class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <i class="fas fa-plus text-pink-600 mr-3"></i>
              <span class="font-medium">{{ $t('admin.pages.dashboard.quickActions.addSkill') }}</span>
            </router-link>

            <router-link
              to="/admin/languages"
              class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <i class="fas fa-plus text-indigo-600 mr-3"></i>
              <span class="font-medium">{{ $t('admin.pages.dashboard.quickActions.addLanguage') }}</span>
            </router-link>

            <router-link
              to="/admin/about"
              class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <i class="fas fa-plus text-teal-600 mr-3"></i>
              <span class="font-medium">{{ $t('admin.pages.dashboard.quickActions.addAbout') }}</span>
            </router-link>
            
            <router-link
              to="/admin/contact"
              class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <i class="fas fa-eye text-gray-600 mr-3"></i>
              <span class="font-medium">{{ $t('admin.pages.dashboard.quickActions.viewMessages') }}</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Notifications -->
    <div v-if="notification.show" 
         :class="[
           'fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 transition-all duration-300',
           notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
         ]">
      <div class="flex items-center">
        <i :class="notification.type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'" class="mr-2"></i>
        {{ notification.message }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { API_BASE_URL, API_ENDPOINT, TOKEN_STORAGE_KEY } from '@/config/global'

const { locale, t } = useI18n()

interface Stats {
  experiences: number
  educations: number
  certifications: number
  projects: number
  languages: number
  skills: number
  about: number
  messages: number
}

interface ActivityItem {
  id: number
  type: string
  message: string
  created_at: string
}

const currentLocale = computed(() => locale.value)
const loading = ref(true)
const loadingActivity = ref(false)

const stats = ref<Stats>({
  experiences: 0,
  educations: 0,
  certifications: 0,
  projects: 0,
  languages: 0,
  skills: 0,
  about: 0,
  messages: 0
})

const recentActivity = ref<ActivityItem[]>([])

const notification = ref({
  show: false,
  type: 'success' as 'success' | 'error',
  message: ''
})

const showNotification = (type: 'success' | 'error', message: string) => {
  notification.value = { show: true, type, message }
  setTimeout(() => {
    notification.value.show = false
  }, 3000)
}

const apiHeaders = computed(() => ({
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem(TOKEN_STORAGE_KEY)}`
}))

const loadStats = async () => {
  try {
    const endpoints = [
      { key: 'experiences', url: `${API_BASE_URL}${API_ENDPOINT.experiences}` },
      { key: 'educations', url: `${API_BASE_URL}${API_ENDPOINT.educations}` },
      { key: 'certifications', url: `${API_BASE_URL}${API_ENDPOINT.certifications}/stats` },
      { key: 'projects', url: `${API_BASE_URL}${API_ENDPOINT.projects}/stats` },
      { key: 'languages', url: `${API_BASE_URL}${API_ENDPOINT.languages}/stats` },
      { key: 'skills', url: `${API_BASE_URL}${API_ENDPOINT.skills}/stats` }
    ]

    const responses = await Promise.allSettled(
      endpoints.map(endpoint => 
        fetch(endpoint.url, {
          method: 'GET',
          headers: apiHeaders.value
        })
      )
    )

    const newStats = { ...stats.value }

    for (let i = 0; i < responses.length; i++) {
      const response = responses[i]
      const endpoint = endpoints[i]

      if (response.status === 'fulfilled' && response.value.ok) {
        const result = await response.value.json()
        
        if (endpoint.key === 'experiences' || endpoint.key === 'educations') {
          // Pour les endpoints qui retournent directement les données
          newStats[endpoint.key as keyof Stats] = result.data?.length || 0
        } else {
          // Pour les endpoints stats qui retournent { total: number }
          newStats[endpoint.key as keyof Stats] = result.total || 0
        }
      }
    }

    // Simuler les messages pour l'instant (à remplacer par une vraie API)
    newStats.messages = 12

    stats.value = newStats

  } catch (error) {
    console.error('Erreur lors du chargement des statistiques:', error)
    showNotification('error', t('admin.pages.dashboard.errors.statsLoadFailed'))
  }
}

const loadRecentActivity = async () => {
  loadingActivity.value = true
  try {
    // Simuler l'activité récente pour l'instant
    // À remplacer par un vrai endpoint API
    await new Promise(resolve => setTimeout(resolve, 500))
    
    recentActivity.value = [
      {
        id: 1,
        type: 'message',
        message: t('admin.pages.dashboard.recentActivity.newMessage'),
        created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 2,
        type: 'experience',
        message: t('admin.pages.dashboard.recentActivity.experienceUpdated'),
        created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 3,
        type: 'certification',
        message: t('admin.pages.dashboard.recentActivity.certificationAdded'),
        created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 4,
        type: 'project',
        message: t('admin.pages.dashboard.recentActivity.projectCreated'),
        created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
      }
    ]
  } catch (error) {
    console.error('Erreur lors du chargement de l\'activité récente:', error)
    showNotification('error', t('admin.pages.dashboard.errors.activityLoadFailed'))
  } finally {
    loadingActivity.value = false
  }
}

const getActivityColor = (type: string): string => {
  const colors = {
    message: 'bg-red-400',
    experience: 'bg-blue-400',
    certification: 'bg-yellow-400',
    project: 'bg-purple-400',
    education: 'bg-green-400',
    skill: 'bg-pink-400',
    language: 'bg-indigo-400',
    about: 'bg-teal-400'
  }
  return colors[type as keyof typeof colors] || 'bg-gray-400'
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
  
  if (diffInHours < 1) {
    return t('admin.pages.dashboard.time.justNow')
  } else if (diffInHours < 24) {
    return t('admin.pages.dashboard.time.hoursAgo', { hours: diffInHours })
  } else {
    const diffInDays = Math.floor(diffInHours / 24)
    return t('admin.pages.dashboard.time.daysAgo', { days: diffInDays })
  }
}

const initializeDashboard = async () => {
  loading.value = true
  try {
    await Promise.all([
      loadStats(),
      loadRecentActivity()
    ])
  } catch (error) {
    console.error('Erreur lors de l\'initialisation du dashboard:', error)
    showNotification('error', t('admin.pages.dashboard.errors.initFailed'))
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  initializeDashboard()
})
</script>