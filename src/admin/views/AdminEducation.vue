<template>
  <div class="space-y-6">
    <!-- Header avec bouton d'ajout -->
    <div class="flex justify-between items-center">
      <div>
        <h3 class="text-lg font-medium text-gray-900">{{ $t('admin.pages.education.title') }}</h3>
        <p class="text-sm text-gray-600">{{ $t('admin.pages.education.subtitle') }}</p>
      </div>
      <button
        @click="openModal()"
        class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
      >
        <i class="fas fa-plus"></i>
        <span>{{ $t('admin.pages.education.addButton') }}</span>
      </button>
    </div>
    
    <!-- Indicateur de chargement -->
    <div v-if="loading" class="flex justify-center items-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
      <span class="ml-2 text-gray-600">{{ $t('common.loading') }}</span>
    </div>
    
    <!-- Liste des formations -->
    <div v-else class="bg-white rounded-lg shadow overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{ $t('admin.pages.education.table.degree') }}
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{ $t('admin.pages.education.table.institution') }}
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{ $t('admin.pages.education.table.period') }}
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{ $t('admin.pages.education.table.status') }}
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{ $t('admin.pages.education.table.actions') }}
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="education in educations" :key="education.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">
                  {{ currentLocale === 'fr' ? education.degree_fr : education.degree_en }}
                </div>
                <div v-if="education.specialty_fr || education.specialty_en" class="text-sm text-gray-500">
                  {{ currentLocale === 'fr' ? education.specialty_fr : education.specialty_en }}
                </div>
                <div class="text-xs text-gray-400">
                  {{ currentLocale === 'fr' ? education.degree_en : education.degree_fr }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ education.institution }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">
                  {{ formatPeriod(education) }}
                </div>
                <div v-if="education.is_current" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {{ $t('admin.pages.education.current') }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span 
                  :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    education.is_active 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  ]"
                >
                  {{ education.is_active ? $t('common.active') : $t('common.inactive') }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                <!-- Éditer -->
                <button
                  @click="openModal(education)"
                  class="text-indigo-600 hover:text-indigo-900 transition-colors"
                  :title="$t('common.edit')"
                >
                  <font-awesome-icon icon="edit" />
                </button>
                <!-- Activer / Désactiver -->
                <button
                  @click="toggleStatus(education.id)"
                  :class="[
                    'transition-colors',
                    education.is_active 
                      ? 'text-orange-600 hover:text-orange-900' 
                      : 'text-green-600 hover:text-green-900'
                  ]"
                  :title="education.is_active ? $t('common.deactivate') : $t('common.activate')"
                >
                  <font-awesome-icon :icon="education.is_active ? 'pause' : 'play'" />
                </button>
                <!-- Supprimer -->
                <button
                  @click="deleteEducation(education.id)"
                  class="text-red-600 hover:text-red-900 transition-colors"
                  :title="$t('common.delete')"
                >
                  <font-awesome-icon icon="trash" />
                </button>
              </td>
            </tr>
            <tr v-if="educations.length === 0">
              <td colspan="5" class="px-6 py-8 text-center text-gray-500">
                {{ $t('admin.pages.education.noData') }}
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
              {{ editingEducation ? $t('admin.pages.education.editTitle') : $t('admin.pages.education.addTitle') }}
            </h3>
            <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
              <i class="fas fa-times"></i>
            </button>
          </div>
          
          <form @submit.prevent="saveEducation" class="space-y-6">
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
              </nav>
            </div>

            <!-- Contenu français -->
            <div v-show="activeTab === 'fr'" class="space-y-4">
              <h4 class="text-md font-medium text-gray-800 flex items-center">
                <i class="fas fa-flag mr-2 text-blue-500"></i>
                {{ $t('admin.pages.education.frenchContent') }}
              </h4>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  {{ $t('admin.pages.education.form.degreeFr') }} *
                </label>
                <input
                  v-model="form.degree_fr"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  :placeholder="$t('admin.pages.education.form.degreePlaceholder')"
                >
                <p v-if="errors.degree_fr" class="text-red-500 text-xs mt-1">{{ errors.degree_fr[0] }}</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  {{ $t('admin.pages.education.form.specialtyFr') }}
                </label>
                <input
                  v-model="form.specialty_fr"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  :placeholder="$t('admin.pages.education.form.specialtyPlaceholder')"
                >
                <p v-if="errors.specialty_fr" class="text-red-500 text-xs mt-1">{{ errors.specialty_fr[0] }}</p>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  {{ $t('admin.pages.education.form.descriptionFr') }}
                </label>
                <textarea
                  v-model="form.description_fr"
                  rows="4"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  :placeholder="$t('admin.pages.education.form.descriptionPlaceholder')"
                ></textarea>
                <p v-if="errors.description_fr" class="text-red-500 text-xs mt-1">{{ errors.description_fr[0] }}</p>
              </div>
            </div>

            <!-- Contenu anglais -->
            <div v-show="activeTab === 'en'" class="space-y-4">
              <h4 class="text-md font-medium text-gray-800 flex items-center">
                <i class="fas fa-flag mr-2 text-red-500"></i>
                {{ $t('admin.pages.education.englishContent') }}
              </h4>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  {{ $t('admin.pages.education.form.degreeEn') }} *
                </label>
                <input
                  v-model="form.degree_en"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  :placeholder="$t('admin.pages.education.form.degreePlaceholder')"
                >
                <p v-if="errors.degree_en" class="text-red-500 text-xs mt-1">{{ errors.degree_en[0] }}</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  {{ $t('admin.pages.education.form.specialtyEn') }}
                </label>
                <input
                  v-model="form.specialty_en"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  :placeholder="$t('admin.pages.education.form.specialtyPlaceholder')"
                >
                <p v-if="errors.specialty_en" class="text-red-500 text-xs mt-1">{{ errors.specialty_en[0] }}</p>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  {{ $t('admin.pages.education.form.descriptionEn') }}
                </label>
                <textarea
                  v-model="form.description_en"
                  rows="4"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  :placeholder="$t('admin.pages.education.form.descriptionPlaceholder')"
                ></textarea>
                <p v-if="errors.description_en" class="text-red-500 text-xs mt-1">{{ errors.description_en[0] }}</p>
              </div>
            </div>

            <!-- Informations communes -->
            <div class="border-t border-gray-200 pt-4">
              <h4 class="text-md font-medium text-gray-800 mb-4 flex items-center">
                <i class="fas fa-info-circle mr-2 text-gray-500"></i>
                {{ $t('admin.pages.education.generalInfo') }}
              </h4>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  {{ $t('admin.pages.education.form.institution') }} *
                </label>
                <input
                  v-model="form.institution"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  :placeholder="$t('admin.pages.education.form.institutionPlaceholder')"
                >
                <p v-if="errors.institution" class="text-red-500 text-xs mt-1">{{ errors.institution[0] }}</p>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    {{ $t('admin.pages.education.form.startYear') }} *
                  </label>
                  <input
                    v-model.number="form.start_year"
                    type="number"
                    min="1900"
                    :max="new Date().getFullYear() + 10"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                  <p v-if="errors.start_year" class="text-red-500 text-xs mt-1">{{ errors.start_year[0] }}</p>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    {{ $t('admin.pages.education.form.endYear') }}
                  </label>
                  <input
                    v-model.number="form.end_year"
                    type="number"
                    min="1900"
                    :max="new Date().getFullYear() + 10"
                    :disabled="form.is_current"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
                  >
                  <p v-if="errors.end_year" class="text-red-500 text-xs mt-1">{{ errors.end_year[0] }}</p>
                </div>
              </div>

              <div class="mt-4">
                <label class="flex items-center">
                  <input
                    v-model="form.is_current"
                    type="checkbox"
                    class="rounded border-gray-300 text-green-600 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                  >
                  <span class="ml-2 text-sm text-gray-700">
                    {{ $t('admin.pages.education.form.isCurrent') }}
                  </span>
                </label>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    {{ $t('admin.pages.education.form.sortOrder') }}
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
                      {{ $t('admin.pages.education.form.isActive') }}
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
                {{ saving ? $t('common.saving') : (editingEducation ? $t('common.update') : $t('common.add')) }}
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

interface Education {
  id: number
  degree_fr: string
  degree_en: string
  specialty_fr?: string
  specialty_en?: string
  institution: string
  description_fr?: string
  description_en?: string
  start_year: number
  end_year: number | null
  is_current: boolean
  is_active: boolean
  sort_order: number
}

const currentLocale = computed(() => locale.value)
const educations = ref<Education[]>([])
const loading = ref(false)
const saving = ref(false)
const showModal = ref(false)
const activeTab = ref<'fr' | 'en'>('fr')
const editingEducation = ref<Education | null>(null)

const form = ref({
  degree_fr: '',
  degree_en: '',
  specialty_fr: '',
  specialty_en: '',
  institution: '',
  description_fr: '',
  description_en: '',
  start_year: new Date().getFullYear(),
  end_year: null as number | null,
  is_current: false,
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

const formatPeriod = (education: Education): string => {
  const endDisplay = education.is_current 
    ? (currentLocale.value === 'fr' ? 'En cours' : 'Ongoing')
    : education.end_year?.toString() || ''
  
  return `${education.start_year} - ${endDisplay}`
}

const loadEducations = async () => {
  loading.value = true
  try {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINT.educations}`, {
      method: 'GET',
      headers: apiHeaders.value
    })

    if (response.ok) {
      const result = await response.json()
      educations.value = result.data || []
    } else {
      const error = await response.json()
      console.log('Response not ok:', error.error)
      throw new Error('Erreur lors du chargement des formations')
    }

  } catch (error) {
    console.error('Erreur:', error)
    showNotification('error', t('admin.pages.education.errors.loadFailed'))
  } finally {
    loading.value = false
  }
}

const openModal = (education?: Education) => {
  errors.value = {}
  activeTab.value = 'fr'
  
  if (education) {
    editingEducation.value = education
    form.value = {
      degree_fr: education.degree_fr,
      degree_en: education.degree_en,
      specialty_fr: education.specialty_fr || '',
      specialty_en: education.specialty_en || '',
      institution: education.institution,
      description_fr: education.description_fr || '',
      description_en: education.description_en || '',
      start_year: education.start_year,
      end_year: education.end_year,
      is_current: education.is_current,
      is_active: education.is_active,
      sort_order: education.sort_order
    }
  } else {
    editingEducation.value = null
    form.value = {
      degree_fr: '',
      degree_en: '',
      specialty_fr: '',
      specialty_en: '',
      institution: '',
      description_fr: '',
      description_en: '',
      start_year: new Date().getFullYear(),
      end_year: null,
      is_current: false,
      is_active: true,
      sort_order: 0
    }
  }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  editingEducation.value = null
  errors.value = {}
}

const saveEducation = async () => {
  saving.value = true
  errors.value = {}
  
  try {
    const cleanedForm = {
      ...form.value,
      end_year: form.value.is_current ? null : form.value.end_year
    }

    const url = editingEducation.value 
      ? `${API_BASE_URL}${API_ENDPOINT.educations}/${editingEducation.value.id}`
      : `${API_BASE_URL}${API_ENDPOINT.educations}`
    
    const method = editingEducation.value ? 'PUT' : 'POST'
    
    const response = await fetch(url, {
      method,
      headers: apiHeaders.value,
      body: JSON.stringify(cleanedForm)
    })

    const result = await response.json()

    if (response.ok) {
      showNotification('success', result.message)
      closeModal()
      await loadEducations()
    } else {
      if (result.errors) {
        errors.value = result.errors
      }
      throw new Error(result.message || 'Erreur lors de la sauvegarde')
    }
  } catch (error: any) {
    console.error('Erreur:', error)
    showNotification('error', error.message || t('admin.pages.education.errors.saveFailed'))
  } finally {
    saving.value = false
  }
}

const toggleStatus = async (id: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINT.educations}/${id}/${API_ENDPOINT.toggleStatus}`, {
      method: 'PATCH',
      headers: apiHeaders.value
    })

    if (response.ok) {
      const result = await response.json()
      showNotification('success', result.message)
      await loadEducations()
    } else {
      throw new Error('Erreur lors du changement de statut')
    }
  } catch (error) {
    console.error('Erreur:', error)
    showNotification('error', t('admin.pages.education.errors.statusFailed'))
  }
}

const deleteEducation = async (id: number) => {
  if (!confirm(t('admin.pages.education.confirmDelete'))) {
    return
  }

  try {
    const response = await fetch(`${API_BASE_URL}/admin/educations/${id}`, {
      method: 'DELETE',
      headers: apiHeaders.value
    })

    if (response.ok) {
      showNotification('success', t('admin.pages.education.deleteSuccess'))
      await loadEducations()
    } else {
      throw new Error('Erreur lors de la suppression')
    }
  } catch (error) {
    console.error('Erreur:', error)
    showNotification('error', t('admin.pages.education.errors.deleteFailed'))
  }
}

onMounted(() => {
  loadEducations()
})
</script>