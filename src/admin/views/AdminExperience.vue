<template>
  <div class="space-y-6">
    <!-- Header avec bouton d'ajout -->
    <div class="flex justify-between items-center">
      <div>
        <h3 class="text-lg font-medium text-gray-900">{{ $t('admin.experiences.title') }}</h3>
        <p class="text-sm text-gray-600">{{ $t('admin.experiences.subtitle') }}</p>
      </div>
      <button
        @click="openModal()"
        class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
      >
        <i class="fas fa-plus"></i>
        <span>{{ $t('admin.experiences.addButton') }}</span>
      </button>
    </div>
    
    <!-- Indicateur de chargement -->
    <div v-if="loading" class="flex justify-center items-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
      <span class="ml-2 text-gray-600">{{ $t('common.loading') }}</span>
    </div>
    
    <!-- Liste des expériences -->
    <div v-else class="bg-white rounded-lg shadow overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{ $t('admin.experiences.table.position') }}
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{ $t('admin.experiences.table.company') }}
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{ $t('admin.experiences.table.period') }}
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{ $t('admin.experiences.table.status') }}
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{ $t('admin.experiences.table.actions') }}
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="experience in experiences" :key="experience.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">
                  {{ currentLocale === 'fr' ? experience.title_fr : experience.title_en }}
                </div>
                <div class="text-xs text-gray-500">
                  {{ currentLocale === 'fr' ? experience.title_en : experience.title_fr }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ experience.company }}</div>
                <div v-if="experience.location" class="text-xs text-gray-500">{{ experience.location }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">
                  {{ currentLocale === 'fr' ? experience.duration_fr : experience.duration_en }}
                </div>
                <div v-if="experience.is_current" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {{ $t('admin.experiences.current') }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span 
                  :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    experience.is_active 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  ]"
                >
                  {{ experience.is_active ? $t('common.active') : $t('common.inactive') }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                <button
                  @click="openModal(experience)"
                  class="text-indigo-600 hover:text-indigo-900 transition-colors"
                  :title="$t('common.edit')"
                >
                  <i class="fas fa-edit"></i>
                </button>
                <button
                  @click="toggleStatus(experience.id)"
                  :class="[
                    'transition-colors',
                    experience.is_active 
                      ? 'text-orange-600 hover:text-orange-900' 
                      : 'text-green-600 hover:text-green-900'
                  ]"
                  :title="experience.is_active ? $t('common.deactivate') : $t('common.activate')"
                >
                  <i :class="experience.is_active ? 'fas fa-pause' : 'fas fa-play'"></i>
                </button>
                <button
                  @click="deleteExperience(experience.id)"
                  class="text-red-600 hover:text-red-900 transition-colors"
                  :title="$t('common.delete')"
                >
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
            <tr v-if="experiences.length === 0">
              <td colspan="5" class="px-6 py-8 text-center text-gray-500">
                {{ $t('admin.experiences.noData') }}
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
              {{ editingExperience ? $t('admin.experiences.editTitle') : $t('admin.experiences.addTitle') }}
            </h3>
            <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
              <i class="fas fa-times"></i>
            </button>
          </div>
          
          <form @submit.prevent="saveExperience" class="space-y-6">
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
                {{ $t('admin.experiences.frenchContent') }}
              </h4>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  {{ $t('admin.experiences.form.titleFr') }} *
                </label>
                <input
                  v-model="form.title_fr"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  :placeholder="$t('admin.experiences.form.titlePlaceholder')"
                >
                <p v-if="errors.title_fr" class="text-red-500 text-xs mt-1">{{ errors.title_fr[0] }}</p>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  {{ $t('admin.experiences.form.descriptionFr') }}
                </label>
                <textarea
                  v-model="form.description_fr"
                  rows="4"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  :placeholder="$t('admin.experiences.form.descriptionPlaceholder')"
                ></textarea>
                <p v-if="errors.description_fr" class="text-red-500 text-xs mt-1">{{ errors.description_fr[0] }}</p>
              </div>
            </div>

            <!-- Contenu anglais -->
            <div v-show="activeTab === 'en'" class="space-y-4">
              <h4 class="text-md font-medium text-gray-800 flex items-center">
                <i class="fas fa-flag mr-2 text-red-500"></i>
                {{ $t('admin.experiences.englishContent') }}
              </h4>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  {{ $t('admin.experiences.form.titleEn') }} *
                </label>
                <input
                  v-model="form.title_en"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  :placeholder="$t('admin.experiences.form.titlePlaceholder')"
                >
                <p v-if="errors.title_en" class="text-red-500 text-xs mt-1">{{ errors.title_en[0] }}</p>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  {{ $t('admin.experiences.form.descriptionEn') }}
                </label>
                <textarea
                  v-model="form.description_en"
                  rows="4"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  :placeholder="$t('admin.experiences.form.descriptionPlaceholder')"
                ></textarea>
                <p v-if="errors.description_en" class="text-red-500 text-xs mt-1">{{ errors.description_en[0] }}</p>
              </div>
            </div>

            <!-- Informations communes -->
            <div class="border-t border-gray-200 pt-4">
              <h4 class="text-md font-medium text-gray-800 mb-4 flex items-center">
                <i class="fas fa-info-circle mr-2 text-gray-500"></i>
                {{ $t('admin.experiences.generalInfo') }}
              </h4>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    {{ $t('admin.experiences.form.company') }} *
                  </label>
                  <input
                    v-model="form.company"
                    type="text"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    :placeholder="$t('admin.experiences.form.companyPlaceholder')"
                  >
                  <p v-if="errors.company" class="text-red-500 text-xs mt-1">{{ errors.company[0] }}</p>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    {{ $t('admin.experiences.form.location') }}
                  </label>
                  <input
                    v-model="form.location"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    :placeholder="$t('admin.experiences.form.locationPlaceholder')"
                  >
                </div>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    {{ $t('admin.experiences.form.startDate') }} *
                  </label>
                  <input
                    v-model="form.start_date"
                    type="date"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                  <p v-if="errors.start_date" class="text-red-500 text-xs mt-1">{{ errors.start_date[0] }}</p>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    {{ $t('admin.experiences.form.endDate') }}
                  </label>
                  <input
                    v-model="form.end_date"
                    type="date"
                    :disabled="form.is_current"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
                  >
                  <p v-if="errors.end_date" class="text-red-500 text-xs mt-1">{{ errors.end_date[0] }}</p>
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
                    {{ $t('admin.experiences.form.isCurrent') }}
                  </span>
                </label>
              </div>

              <!-- Compétences -->
              <div class="mt-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  {{ $t('admin.experiences.form.skills') }}
                </label>
                <div class="space-y-2">
                  <div v-for="(skill, index) in form.skills" :key="index" class="flex items-center space-x-2">
                    <input
                      v-model="form.skills[index]"
                      type="text"
                      class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      :placeholder="$t('admin.experiences.form.skillPlaceholder')"
                    >
                    <button
                      type="button"
                      @click="removeSkill(index)"
                      class="text-red-500 hover:text-red-700"
                    >
                      <i class="fas fa-minus-circle"></i>
                    </button>
                  </div>
                  <button
                    type="button"
                    @click="addSkill"
                    class="text-green-500 hover:text-green-700 text-sm flex items-center"
                  >
                    <i class="fas fa-plus-circle mr-1"></i>
                    {{ $t('admin.experiences.form.addSkill') }}
                  </button>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    {{ $t('admin.experiences.form.sortOrder') }}
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
                      {{ $t('admin.experiences.form.isActive') }}
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
                {{ saving ? $t('common.saving') : (editingExperience ? $t('common.update') : $t('common.add')) }}
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
import { API_BASE_URL, TOKEN_STORAGE_KEY } from '@/config/global'

const { locale, t } = useI18n()

interface Experience {
  id: number
  title_fr: string
  title_en: string
  company: string
  description_fr: string
  description_en: string
  start_date: string
  end_date: string | null
  duration_fr: string
  duration_en: string
  location: string | null
  skills: string[]
  is_current: boolean
  is_active: boolean
  sort_order: number
}

const currentLocale = computed(() => locale.value)
const experiences = ref<Experience[]>([])
const loading = ref(false)
const saving = ref(false)
const showModal = ref(false)
const activeTab = ref<'fr' | 'en'>('fr')
const editingExperience = ref<Experience | null>(null)

const form = ref({
  title_fr: '',
  title_en: '',
  company: '',
  description_fr: '',
  description_en: '',
  start_date: '',
  end_date: '',
  location: '',
  skills: [''] as string[],
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

const loadExperiences = async () => {
  loading.value = true
  try {
    const response = await fetch(`${API_BASE_URL}/admin/experiences`, {
      method: 'GET',
      headers: apiHeaders.value
    })

    if (response.ok) {
      const result = await response.json()
      experiences.value = result.data || []
    } else {
      throw new Error('Erreur lors du chargement des expériences')
    }
  } catch (error) {
    console.error('Erreur:', error)
    showNotification('error', t('admin.experiences.errors.loadFailed'))
  } finally {
    loading.value = false
  }
}

const openModal = (experience?: Experience) => {
  errors.value = {}
  activeTab.value = 'fr'
  
  if (experience) {
    editingExperience.value = experience
    form.value = {
      title_fr: experience.title_fr,
      title_en: experience.title_en,
      company: experience.company,
      description_fr: experience.description_fr || '',
      description_en: experience.description_en || '',
      start_date: experience.start_date,
      end_date: experience.end_date || '',
      location: experience.location || '',
      skills: experience.skills?.length ? [...experience.skills] : [''],
      is_current: experience.is_current,
      is_active: experience.is_active,
      sort_order: experience.sort_order
    }
  } else {
    editingExperience.value = null
    form.value = {
      title_fr: '',
      title_en: '',
      company: '',
      description_fr: '',
      description_en: '',
      start_date: '',
      end_date: '',
      location: '',
      skills: [''],
      is_current: false,
      is_active: true,
      sort_order: 0
    }
  }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  editingExperience.value = null
  errors.value = {}
}

const addSkill = () => {
  form.value.skills.push('')
}

const removeSkill = (index: number) => {
  if (form.value.skills.length > 1) {
    form.value.skills.splice(index, 1)
  }
}

const saveExperience = async () => {
  saving.value = true
  errors.value = {}
  
  try {
    // Nettoyer les compétences vides
    const cleanedForm = {
      ...form.value,
      skills: form.value.skills.filter(skill => skill.trim() !== ''),
      end_date: form.value.is_current ? null : (form.value.end_date || null)
    }

    const url = editingExperience.value 
      ? `${API_BASE_URL}/admin/experiences/${editingExperience.value.id}`
      : `${API_BASE_URL}/admin/experiences`
    
    const method = editingExperience.value ? 'PUT' : 'POST'
    
    const response = await fetch(url, {
      method,
      headers: apiHeaders.value,
      body: JSON.stringify(cleanedForm)
    })

    const result = await response.json()

    if (response.ok) {
      showNotification('success', result.message)
      closeModal()
      await loadExperiences()
    } else {
      if (result.errors) {
        errors.value = result.errors
      }
      throw new Error(result.message || 'Erreur lors de la sauvegarde')
    }
  } catch (error: any) {
    console.error('Erreur:', error)
    showNotification('error', error.message || t('admin.experiences.errors.saveFailed'))
  } finally {
    saving.value = false
  }
}

const toggleStatus = async (id: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/experiences/${id}/toggle-status`, {
      method: 'PATCH',
      headers: apiHeaders.value
    })

    if (response.ok) {
      const result = await response.json()
      showNotification('success', result.message)
      await loadExperiences()
    } else {
      throw new Error('Erreur lors du changement de statut')
    }
  } catch (error) {
    console.error('Erreur:', error)
    showNotification('error', t('admin.experiences.errors.statusFailed'))
  }
}

const deleteExperience = async (id: number) => {
  if (!confirm(t('admin.experiences.confirmDelete'))) {
    return
  }

  try {
    const response = await fetch(`${API_BASE_URL}/admin/experiences/${id}`, {
      method: 'DELETE',
      headers: apiHeaders.value
    })

    if (response.ok) {
      showNotification('success', t('admin.experiences.deleteSuccess'))
      await loadExperiences()
    } else {
      throw new Error('Erreur lors de la suppression')
    }
  } catch (error) {
    console.error('Erreur:', error)
    showNotification('error', t('admin.experiences.errors.deleteFailed'))
  }
}

onMounted(() => {
  loadExperiences()
})
</script>