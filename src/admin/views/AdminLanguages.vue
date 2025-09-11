<template>
  <div class="space-y-6">
    <!-- Header avec bouton d'ajout -->
    <div class="flex justify-between items-center">
      <div>
        <h3 class="text-lg font-medium text-gray-900">{{ $t('admin.pages.languages.title') }}</h3>
        <p class="text-sm text-gray-600">{{ $t('admin.pages.languages.subtitle') }}</p>
      </div>
      <button
        @click="openModal()"
        class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
      >
        <i class="fas fa-plus"></i>
        <span>{{ $t('admin.pages.languages.addButton') }}</span>
      </button>
    </div>

    <!-- Statistiques -->
    <div v-if="stats" class="grid grid-cols-1 md:grid-cols-5 gap-4">
      <div class="bg-white p-4 rounded-lg shadow">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <i class="fas fa-language text-white text-sm"></i>
            </div>
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium text-gray-500">{{ $t('admin.pages.languages.stats.total') }}</p>
            <p class="text-lg font-semibold text-gray-900">{{ stats.total }}</p>
          </div>
        </div>
      </div>
      
      <div class="bg-white p-4 rounded-lg shadow">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <i class="fas fa-check text-white text-sm"></i>
            </div>
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium text-gray-500">{{ $t('admin.pages.languages.stats.active') }}</p>
            <p class="text-lg font-semibold text-gray-900">{{ stats.active }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg shadow">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
              <i class="fas fa-crown text-white text-sm"></i>
            </div>
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium text-gray-500">{{ $t('admin.pages.languages.stats.native') }}</p>
            <p class="text-lg font-semibold text-gray-900">{{ stats.native }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg shadow">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
              <i class="fas fa-star text-white text-sm"></i>
            </div>
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium text-gray-500">{{ $t('admin.pages.languages.stats.advanced') }}</p>
            <p class="text-lg font-semibold text-gray-900">{{ stats.advanced }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg shadow">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
              <i class="fas fa-certificate text-white text-sm"></i>
            </div>
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium text-gray-500">{{ $t('admin.pages.languages.stats.withCertification') }}</p>
            <p class="text-lg font-semibold text-gray-900">{{ stats.with_certification }}</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Indicateur de chargement -->
    <div v-if="loading" class="flex justify-center items-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
      <span class="ml-2 text-gray-600">{{ $t('common.loading') }}</span>
    </div>
    
    <!-- Liste des langues -->
    <div v-else class="bg-white rounded-lg shadow overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{ $t('admin.pages.languages.table.language') }}
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{ $t('admin.pages.languages.table.level') }}
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{ $t('admin.pages.languages.table.certification') }}
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{ $t('admin.pages.languages.table.status') }}
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{ $t('admin.pages.languages.table.actions') }}
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="language in languages" :key="language.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <span class="text-2xl mr-3">{{ language.flag }}</span>
                  <div>
                    <div class="text-sm font-medium text-gray-900">
                      {{ currentLocale === 'fr' ? language.name_fr : language.name_en }}
                    </div>
                    <div v-if="language.description_fr || language.description_en" class="text-sm text-gray-500 truncate max-w-xs">
                      {{ currentLocale === 'fr' ? language.description_fr : language.description_en }}
                    </div>
                    <div class="text-xs text-gray-400">
                      {{ currentLocale === 'fr' ? language.name_en : language.name_fr }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-1 bg-gray-200 rounded-full h-2 mr-3">
                    <div 
                      :class="getLevelColor(language.level)"
                      :style="{ width: language.level + '%' }"
                      class="h-2 rounded-full"
                    ></div>
                  </div>
                  <span class="text-sm text-gray-600">{{ language.level }}%</span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ language.certification || '-' }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span 
                  :class="getStatusClass(language)"
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                >
                  {{ getStatusText(language) }}
                </span>
                <div v-if="!language.is_active" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mt-1">
                  {{ $t('common.inactive') }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                <!-- Éditer -->
                <button
                  @click="openModal(language)"
                  class="text-indigo-600 hover:text-indigo-900 transition-colors"
                  :title="$t('common.edit')"
                >
                  <font-awesome-icon icon="edit" />
                </button>
                <!-- Activer / Désactiver -->
                <button
                  @click="toggleStatus(language.id)"
                  :class="[
                    'transition-colors',
                    language.is_active 
                      ? 'text-orange-600 hover:text-orange-900' 
                      : 'text-green-600 hover:text-green-900'
                  ]"
                  :title="language.is_active ? $t('common.deactivate') : $t('common.activate')"
                >
                  <font-awesome-icon :icon="language.is_active ? 'pause' : 'play'" />
                </button>
                <!-- Supprimer -->
                <button
                  @click="deleteLanguage(language.id)"
                  class="text-red-600 hover:text-red-900 transition-colors"
                  :title="$t('common.delete')"
                >
                  <font-awesome-icon icon="trash" />
                </button>
              </td>
            </tr>
            <tr v-if="languages.length === 0">
              <td colspan="5" class="px-6 py-8 text-center text-gray-500">
                {{ $t('admin.pages.languages.noData') }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <!-- Modal d'ajout/édition -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-lg font-medium text-gray-900">
              {{ editingLanguage ? $t('admin.pages.languages.editTitle') : $t('admin.pages.languages.addTitle') }}
            </h3>
            <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
              <i class="fas fa-times"></i>
            </button>
          </div>
          
          <form @submit.prevent="saveLanguage" class="space-y-6">
            <!-- Langues tabs -->
            <div class="border-b border-gray-200">
              <nav class="-mb-px flex space-x-8">
                <button
                  type="button"
                  @click="activeTab = 'fr'"
                  :class="[
                    'py-2 px-1 border-b-2 font-medium text-sm transition-colors',
                    activeTab === 'fr'
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  ]"
                >
                  <i class="fas fa-flag mr-2"></i>
                  {{ $t('common.french') }}
                </button>
                <button
                  type="button"
                  @click="activeTab = 'en'"
                  :class="[
                    'py-2 px-1 border-b-2 font-medium text-sm transition-colors',
                    activeTab === 'en'
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  ]"
                >
                  <i class="fas fa-flag mr-2"></i>
                  {{ $t('common.english') }}
                </button>
                <button
                  type="button"
                  @click="activeTab = 'general'"
                  :class="[
                    'py-2 px-1 border-b-2 font-medium text-sm transition-colors',
                    activeTab === 'general'
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  ]"
                >
                  <i class="fas fa-cog mr-2"></i>
                  {{ $t('admin.pages.languages.generalInfo') }}
                </button>
              </nav>
            </div>

            <!-- Contenu français -->
            <div v-show="activeTab === 'fr'" class="space-y-4">
              <h4 class="text-md font-medium text-gray-800 flex items-center">
                <i class="fas fa-flag mr-2 text-blue-500"></i>
                {{ $t('admin.pages.languages.frenchContent') }}
              </h4>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  {{ $t('admin.pages.languages.form.nameFr') }} *
                </label>
                <input
                  v-model="form.name_fr"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  :placeholder="$t('admin.pages.languages.form.namePlaceholder')"
                >
                <p v-if="errors.name_fr" class="text-red-500 text-xs mt-1">{{ errors.name_fr[0] }}</p>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  {{ $t('admin.pages.languages.form.descriptionFr') }}
                </label>
                <textarea
                  v-model="form.description_fr"
                  rows="4"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  :placeholder="$t('admin.pages.languages.form.descriptionPlaceholder')"
                ></textarea>
                <p v-if="errors.description_fr" class="text-red-500 text-xs mt-1">{{ errors.description_fr[0] }}</p>
              </div>
            </div>

            <!-- Contenu anglais -->
            <div v-show="activeTab === 'en'" class="space-y-4">
              <h4 class="text-md font-medium text-gray-800 flex items-center">
                <i class="fas fa-flag mr-2 text-red-500"></i>
                {{ $t('admin.pages.languages.englishContent') }}
              </h4>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  {{ $t('admin.pages.languages.form.nameEn') }} *
                </label>
                <input
                  v-model="form.name_en"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  :placeholder="$t('admin.pages.languages.form.namePlaceholder')"
                >
                <p v-if="errors.name_en" class="text-red-500 text-xs mt-1">{{ errors.name_en[0] }}</p>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  {{ $t('admin.pages.languages.form.descriptionEn') }}
                </label>
                <textarea
                  v-model="form.description_en"
                  rows="4"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  :placeholder="$t('admin.pages.languages.form.descriptionPlaceholder')"
                ></textarea>
                <p v-if="errors.description_en" class="text-red-500 text-xs mt-1">{{ errors.description_en[0] }}</p>
              </div>
            </div>

            <!-- Informations générales -->
            <div v-show="activeTab === 'general'" class="space-y-4">
              <h4 class="text-md font-medium text-gray-800 flex items-center">
                <i class="fas fa-info-circle mr-2 text-gray-500"></i>
                {{ $t('admin.pages.languages.generalInfo') }}
              </h4>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    {{ $t('admin.pages.languages.form.flag') }} *
                  </label>
                  <input
                    v-model="form.flag"
                    type="text"
                    required
                    maxlength="10"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    :placeholder="$t('admin.pages.languages.form.flagPlaceholder')"
                  >
                  <p v-if="errors.flag" class="text-red-500 text-xs mt-1">{{ errors.flag[0] }}</p>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    {{ $t('admin.pages.languages.form.level') }} ({{ form.level }}%)
                  </label>
                  <input
                    v-model.number="form.level"
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    class="w-full"
                  >
                  <div class="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0%</span>
                    <span>25%</span>
                    <span>50%</span>
                    <span>75%</span>
                    <span>100%</span>
                  </div>
                  <p v-if="errors.level" class="text-red-500 text-xs mt-1">{{ errors.level[0] }}</p>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  {{ $t('admin.pages.languages.form.certification') }}
                </label>
                <input
                  v-model="form.certification"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  :placeholder="$t('admin.pages.languages.form.certificationPlaceholder')"
                >
                <p v-if="errors.certification" class="text-red-500 text-xs mt-1">{{ errors.certification[0] }}</p>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    {{ $t('admin.pages.languages.form.sortOrder') }}
                  </label>
                  <input
                    v-model.number="form.sort_order"
                    type="number"
                    min="0"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                </div>

                <div class="flex items-end">
                  <label class="flex items-center">
                    <input
                      v-model="form.is_active"
                      type="checkbox"
                      class="rounded border-gray-300 text-green-600 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                    >
                    <span class="ml-2 text-sm text-gray-700">
                      {{ $t('admin.pages.languages.form.isActive') }}
                    </span>
                  </label>
                </div>
              </div>
            </div>
            
            <div class="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                @click="closeModal"
                class="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
              >
                {{ $t('common.cancel') }}
              </button>
              <button
                type="submit"
                :disabled="saving"
                class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center"
              >
                <i v-if="saving" class="fas fa-spinner fa-spin mr-2"></i>
                {{ saving ? $t('common.saving') : (editingLanguage ? $t('common.update') : $t('common.add')) }}
              </button>
            </div>
          </form>
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

interface Language {
  id: number
  name_fr: string
  name_en: string
  description_fr?: string
  description_en?: string
  flag: string
  level: number
  certification?: string
  is_active: boolean
  sort_order: number
}

interface Stats {
  total: number
  active: number
  native: number
  advanced: number
  intermediate: number
  beginner: number
  with_certification: number
}

const currentLocale = computed(() => locale.value)
const languages = ref<Language[]>([])
const stats = ref<Stats | null>(null)
const loading = ref(false)
const saving = ref(false)
const showModal = ref(false)
const activeTab = ref<'fr' | 'en' | 'general'>('fr')
const editingLanguage = ref<Language | null>(null)

const form = ref({
  name_fr: '',
  name_en: '',
  description_fr: '',
  description_en: '',
  flag: '',
  level: 50,
  certification: '',
  is_active: true,
  sort_order: 0
})

const errors = ref<Record<string, string[]>>({})

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

const getLevelColor = (level: number): string => {
  if (level >= 90) return 'bg-purple-500'
  if (level >= 75) return 'bg-green-500'
  if (level >= 60) return 'bg-yellow-500'
  if (level >= 40) return 'bg-orange-500'
  return 'bg-red-500'
}

const getStatusClass = (language: Language): string => {
  if (!language.is_active) return 'bg-gray-100 text-gray-800'
  
  if (language.level >= 95) return 'bg-purple-100 text-purple-800'
  if (language.level >= 75) return 'bg-green-100 text-green-800'
  if (language.level >= 60) return 'bg-yellow-100 text-yellow-800'
  if (language.level >= 40) return 'bg-orange-100 text-orange-800'
  return 'bg-red-100 text-red-800'
}

const getStatusText = (language: Language): string => {
  if (!language.is_active) return t('common.inactive')
  
  if (language.level >= 95) return t('admin.pages.languages.levels.native')
  if (language.level >= 75) return t('admin.pages.languages.levels.advanced')
  if (language.level >= 60) return t('admin.pages.languages.levels.intermediate')
  if (language.level >= 40) return t('admin.pages.languages.levels.elementary')
  return t('admin.pages.languages.levels.beginner')
}

const loadLanguages = async () => {
  loading.value = true
  try {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINT.languages}`, {
      method: 'GET',
      headers: apiHeaders.value
    })

    if (response.ok) {
      const result = await response.json()
      languages.value = result.data || []
    } else {
      const error = await response.json()
      console.log('Response not ok:', error.error)
      throw new Error('Erreur lors du chargement des langues')
    }

  } catch (error) {
    console.error('Erreur:', error)
    showNotification('error', t('admin.pages.languages.errors.loadFailed'))
  } finally {
    loading.value = false
  }
}

const loadStats = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINT.languages}/stats`, {
      method: 'GET',
      headers: apiHeaders.value
    })

    if (response.ok) {
      const result = await response.json()
      stats.value = result.data
    }
  } catch (error) {
    console.error('Erreur lors du chargement des statistiques:', error)
  }
}

const openModal = (language?: Language) => {
  errors.value = {}
  activeTab.value = 'fr'
  
  if (language) {
    editingLanguage.value = language
    form.value = {
      name_fr: language.name_fr,
      name_en: language.name_en,
      description_fr: language.description_fr || '',
      description_en: language.description_en || '',
      flag: language.flag,
      level: language.level,
      certification: language.certification || '',
      is_active: language.is_active,
      sort_order: language.sort_order
    }
  } else {
    editingLanguage.value = null
    form.value = {
      name_fr: '',
      name_en: '',
      description_fr: '',
      description_en: '',
      flag: '',
      level: 50,
      certification: '',
      is_active: true,
      sort_order: 0
    }
  }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  editingLanguage.value = null
  errors.value = {}
}

const saveLanguage = async () => {
  saving.value = true
  errors.value = {}
  
  try {
    const url = editingLanguage.value 
      ? `${API_BASE_URL}${API_ENDPOINT.languages}/${editingLanguage.value.id}`
      : `${API_BASE_URL}${API_ENDPOINT.languages}`
    
    const method = editingLanguage.value ? 'PUT' : 'POST'
    
    const response = await fetch(url, {
      method,
      headers: apiHeaders.value,
      body: JSON.stringify(form.value)
    })

    const result = await response.json()

    if (response.ok) {
      showNotification('success', result.message)
      closeModal()
      await loadLanguages()
      await loadStats()
    } else {
      if (result.errors) {
        errors.value = result.errors
      }
      throw new Error(result.message || 'Erreur lors de la sauvegarde')
    }
  } catch (error: any) {
    console.error('Erreur:', error)
    showNotification('error', error.message || t('admin.pages.languages.errors.saveFailed'))
  } finally {
    saving.value = false
  }
}

const toggleStatus = async (id: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINT.languages}/${id}/${API_ENDPOINT.toggleStatus}`, {
      method: 'PATCH',
      headers: apiHeaders.value
    })

    if (response.ok) {
      const result = await response.json()
      showNotification('success', result.message)
      await loadLanguages()
      await loadStats()
    } else {
      throw new Error('Erreur lors du changement de statut')
    }
  } catch (error) {
    console.error('Erreur:', error)
    showNotification('error', t('admin.pages.languages.errors.statusFailed'))
  }
}

const deleteLanguage = async (id: number) => {
  if (!confirm(t('admin.pages.languages.confirmDelete'))) {
    return
  }

  try {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINT.languages}/${id}`, {
      method: 'DELETE',
      headers: apiHeaders.value
    })

    if (response.ok) {
      showNotification('success', t('admin.pages.languages.deleteSuccess'))
      await loadLanguages()
      await loadStats()
    } else {
      throw new Error('Erreur lors de la suppression')
    }
  } catch (error) {
    console.error('Erreur:', error)
    showNotification('error', t('admin.pages.languages.errors.deleteFailed'))
  }
}

onMounted(async () => {
  await loadLanguages()
  await loadStats()
})
</script>