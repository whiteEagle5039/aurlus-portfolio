<template>
  <div class="space-y-6">
    <!-- Header avec bouton d'ajout -->
    <div class="flex justify-between items-center">
      <div>
        <h3 class="text-lg font-medium text-gray-900">{{ $t('admin.pages.projects.title') }}</h3>
        <p class="text-sm text-gray-600">{{ $t('admin.pages.projects.subtitle') }}</p>
      </div>
      <button
        @click="openModal()"
        class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
      >
        <i class="fas fa-plus"></i>
        <span>{{ $t('admin.pages.projects.addButton') }}</span>
      </button>
    </div>
    
    <!-- Indicateur de chargement -->
    <div v-if="loading" class="flex justify-center items-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
      <span class="ml-2 text-gray-600">{{ $t('common.loading') }}</span>
    </div>
    
    <!-- Grille des projets -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="project in projects" 
        :key="project.id"
        class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
      >
        <div v-if="project.image" class="h-48 bg-gray-200">
          <img 
            :src="project.image" 
            :alt="currentLocale === 'fr' ? project.title_fr : project.title_en"
            class="w-full h-full object-cover"
          >
        </div>
        <div v-else class="h-48 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
          <i class="fas fa-folder-open text-white text-4xl"></i>
        </div>
        
        <div class="p-6">
          <div class="flex justify-between items-start mb-2">
            <div>
              <h3 class="text-lg font-semibold text-gray-900">
                {{ currentLocale === 'fr' ? project.title_fr : project.title_en }}
              </h3>
              <div class="text-xs text-gray-500">
                {{ currentLocale === 'fr' ? project.title_en : project.title_fr }}
              </div>
            </div>
            <div class="flex flex-col items-end space-y-1">
              <span 
                :class="getStatusClass(project.status)"
                class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
              >
                {{ getStatusText(project.status) }}
              </span>
              <span 
                :class="[
                  'inline-flex items-center px-2 py-1 text-xs font-medium rounded-full',
                  project.is_active 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                ]"
              >
                {{ project.is_active ? $t('common.active') : $t('common.inactive') }}
              </span>
              <span 
                v-if="project.is_featured"
                class="inline-flex items-center px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full"
              >
                {{ $t('admin.pages.projects.featured') }}
              </span>
            </div>
          </div>
          
          <p class="text-gray-600 text-sm mb-4 line-clamp-3">
            {{ currentLocale === 'fr' ? project.description_fr : project.description_en }}
          </p>
          
          <div class="flex flex-wrap gap-1 mb-4">
            <span 
              v-for="tech in project.technologies.slice(0, 3)" 
              :key="tech"
              class="inline-flex px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
            >
              {{ tech }}
            </span>
            <span 
              v-if="project.technologies.length > 3"
              class="inline-flex px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
            >
              +{{ project.technologies.length - 3 }}
            </span>
          </div>
          
          <div class="flex justify-between items-center">
            <div class="flex space-x-2">
              <a 
                v-if="project.demo_url"
                :href="project.demo_url" 
                target="_blank"
                class="text-green-600 hover:text-green-800 text-sm"
              >
                <i class="fas fa-external-link-alt mr-1"></i>
                {{ $t('admin.pages.projects.demo') }}
              </a>
              <a 
                v-if="project.github_url"
                :href="project.github_url" 
                target="_blank"
                class="text-gray-600 hover:text-gray-800 text-sm"
              >
                <i class="fab fa-github mr-1"></i>
                {{ $t('admin.pages.projects.code') }}
              </a>
            </div>
            
            <div class="flex space-x-2">
              <!-- Éditer -->
              <button
                @click="openModal(project)"
                class="text-indigo-600 hover:text-indigo-900 transition-colors"
                :title="$t('common.edit')"
              >
                <font-awesome-icon icon="edit" />
              </button>
              <!-- Activer / Désactiver -->
              <button
                @click="toggleStatus(project.id)"
                :class="[
                  'transition-colors',
                  project.is_active 
                    ? 'text-orange-600 hover:text-orange-900' 
                    : 'text-green-600 hover:text-green-900'
                ]"
                :title="project.is_active ? $t('common.deactivate') : $t('common.activate')"
              >
                <font-awesome-icon :icon="project.is_active ? 'pause' : 'play'" />
              </button>
              <!-- Featured -->
              <button
                @click="toggleFeatured(project.id)"
                :class="[
                  'transition-colors',
                  project.is_featured 
                    ? 'text-yellow-600 hover:text-yellow-900' 
                    : 'text-gray-400 hover:text-yellow-600'
                ]"
                :title="project.is_featured ? $t('admin.pages.projects.removeFeatured') : $t('admin.pages.projects.addFeatured')"
              >
                <font-awesome-icon icon="star" />
              </button>
              <!-- Supprimer -->
              <button
                @click="deleteProject(project.id)"
                class="text-red-600 hover:text-red-900 transition-colors"
                :title="$t('common.delete')"
              >
                <font-awesome-icon icon="trash" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div v-if="projects.length === 0" class="col-span-full flex flex-col items-center justify-center py-12">
        <i class="fas fa-folder-open text-gray-300 text-6xl mb-4"></i>
        <p class="text-gray-500 text-lg">{{ $t('admin.pages.projects.noData') }}</p>
      </div>
    </div>
    
    <!-- Modal d'ajout/édition -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-lg font-medium text-gray-900">
              {{ editingProject ? $t('admin.pages.projects.editTitle') : $t('admin.pages.projects.addTitle') }}
            </h3>
            <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
              <i class="fas fa-times"></i>
            </button>
          </div>
          
          <form @submit.prevent="saveProject" class="space-y-6">
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
                {{ $t('admin.pages.projects.frenchContent') }}
              </h4>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  {{ $t('admin.pages.projects.form.titleFr') }} *
                </label>
                <input
                  v-model="form.title_fr"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  :placeholder="$t('admin.pages.projects.form.titlePlaceholder')"
                >
                <p v-if="errors.title_fr" class="text-red-500 text-xs mt-1">{{ errors.title_fr[0] }}</p>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  {{ $t('admin.pages.projects.form.descriptionFr') }} *
                </label>
                <textarea
                  v-model="form.description_fr"
                  rows="4"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  :placeholder="$t('admin.pages.projects.form.descriptionPlaceholder')"
                ></textarea>
                <p v-if="errors.description_fr" class="text-red-500 text-xs mt-1">{{ errors.description_fr[0] }}</p>
              </div>
            </div>

            <!-- Contenu anglais -->
            <div v-show="activeTab === 'en'" class="space-y-4">
              <h4 class="text-md font-medium text-gray-800 flex items-center">
                <i class="fas fa-flag mr-2 text-red-500"></i>
                {{ $t('admin.pages.projects.englishContent') }}
              </h4>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  {{ $t('admin.pages.projects.form.titleEn') }} *
                </label>
                <input
                  v-model="form.title_en"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  :placeholder="$t('admin.pages.projects.form.titlePlaceholder')"
                >
                <p v-if="errors.title_en" class="text-red-500 text-xs mt-1">{{ errors.title_en[0] }}</p>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  {{ $t('admin.pages.projects.form.descriptionEn') }} *
                </label>
                <textarea
                  v-model="form.description_en"
                  rows="4"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  :placeholder="$t('admin.pages.projects.form.descriptionPlaceholder')"
                ></textarea>
                <p v-if="errors.description_en" class="text-red-500 text-xs mt-1">{{ errors.description_en[0] }}</p>
              </div>
            </div>

            <!-- Informations communes -->
            <div class="border-t border-gray-200 pt-4">
              <h4 class="text-md font-medium text-gray-800 mb-4 flex items-center">
                <i class="fas fa-info-circle mr-2 text-gray-500"></i>
                {{ $t('admin.pages.projects.generalInfo') }}
              </h4>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    {{ $t('admin.pages.projects.form.status') }} *
                  </label>
                  <select
                    v-model="form.status"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="completed">{{ $t('admin.pages.projects.status.completed') }}</option>
                    <option value="in_progress">{{ $t('admin.pages.projects.status.in_progress') }}</option>
                    <option value="planned">{{ $t('admin.pages.projects.status.planned') }}</option>
                    <option value="archived">{{ $t('admin.pages.projects.status.archived') }}</option>
                  </select>
                  <p v-if="errors.status" class="text-red-500 text-xs mt-1">{{ errors.status[0] }}</p>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    {{ $t('admin.pages.projects.form.image') }}
                  </label>
                  <input
                    v-model="form.image"
                    type="url"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    :placeholder="$t('admin.pages.projects.form.imagePlaceholder')"
                  >
                  <p v-if="errors.image" class="text-red-500 text-xs mt-1">{{ errors.image[0] }}</p>
                </div>
              </div>
              
              <!-- Technologies -->
              <div class="mt-4">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  {{ $t('admin.pages.projects.form.technologies') }} *
                </label>
                <div class="space-y-2">
                  <div v-for="(tech, index) in form.technologies" :key="index" class="flex items-center space-x-2">
                    <input
                      v-model="form.technologies[index]"
                      type="text"
                      class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      :placeholder="$t('admin.pages.projects.form.technologyPlaceholder')"
                    >
                    <button
                      type="button"
                      @click="removeTechnology(index)"
                      class="text-red-500 hover:text-red-700"
                    >
                      <i class="fas fa-minus-circle"></i>
                    </button>
                  </div>
                  <button
                    type="button"
                    @click="addTechnology"
                    class="text-green-500 hover:text-green-700 text-sm flex items-center"
                  >
                    <i class="fas fa-plus-circle mr-1"></i>
                    {{ $t('admin.pages.projects.form.addTechnology') }}
                  </button>
                </div>
                <p v-if="errors.technologies" class="text-red-500 text-xs mt-1">{{ errors.technologies[0] }}</p>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    {{ $t('admin.pages.projects.form.demoUrl') }}
                  </label>
                  <input
                    v-model="form.demo_url"
                    type="url"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    :placeholder="$t('admin.pages.projects.form.demoUrlPlaceholder')"
                  >
                  <p v-if="errors.demo_url" class="text-red-500 text-xs mt-1">{{ errors.demo_url[0] }}</p>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    {{ $t('admin.pages.projects.form.githubUrl') }}
                  </label>
                  <input
                    v-model="form.github_url"
                    type="url"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    :placeholder="$t('admin.pages.projects.form.githubUrlPlaceholder')"
                  >
                  <p v-if="errors.github_url" class="text-red-500 text-xs mt-1">{{ errors.github_url[0] }}</p>
                </div>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    {{ $t('admin.pages.projects.form.startDate') }}
                  </label>
                  <input
                    v-model="form.start_date"
                    type="date"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                  <p v-if="errors.start_date" class="text-red-500 text-xs mt-1">{{ errors.start_date[0] }}</p>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    {{ $t('admin.pages.projects.form.endDate') }}
                  </label>
                  <input
                    v-model="form.end_date"
                    type="date"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                  <p v-if="errors.end_date" class="text-red-500 text-xs mt-1">{{ errors.end_date[0] }}</p>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    {{ $t('admin.pages.projects.form.order') }}
                  </label>
                  <input
                    v-model.number="form.order"
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
                      {{ $t('admin.pages.projects.form.isActive') }}
                    </span>
                  </label>
                </div>

                <div class="flex items-end">
                  <label class="flex items-center">
                    <input
                      v-model="form.is_featured"
                      type="checkbox"
                      class="rounded border-gray-300 text-green-600 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                    >
                    <span class="ml-2 text-sm text-gray-700">
                      {{ $t('admin.pages.projects.form.isFeatured') }}
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
                {{ saving ? $t('common.saving') : (editingProject ? $t('common.update') : $t('common.add')) }}
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

interface Project {
  id: number
  title_fr: string
  title_en: string
  description_fr: string
  description_en: string
  technologies: string[]
  status: 'completed' | 'in_progress' | 'planned' | 'archived'
  demo_url?: string
  github_url?: string
  image?: string
  start_date?: string
  end_date?: string
  is_active: boolean
  is_featured: boolean
  order: number
}

const currentLocale = computed(() => locale.value)
const projects = ref<Project[]>([])
const loading = ref(false)
const saving = ref(false)
const showModal = ref(false)
const activeTab = ref<'fr' | 'en'>('fr')
const editingProject = ref<Project | null>(null)

const form = ref({
  title_fr: '',
  title_en: '',
  description_fr: '',
  description_en: '',
  technologies: [''] as string[],
  status: 'completed' as Project['status'],
  demo_url: '',
  github_url: '',
  image: '',
  start_date: '',
  end_date: '',
  is_active: true,
  is_featured: false,
  order: 0
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

const getStatusClass = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800'
    case 'in_progress':
      return 'bg-blue-100 text-blue-800'
    case 'planned':
      return 'bg-yellow-100 text-yellow-800'
    case 'archived':
      return 'bg-gray-100 text-gray-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getStatusText = (status: string) => {
  return t(`admin.pages.projects.status.${status}`)
}

const loadProjects = async () => {
  loading.value = true
  try {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINT.projects}`, {
      method: 'GET',
      headers: apiHeaders.value
    })

    if (response.ok) {
      const result = await response.json()
      projects.value = result.data || []
    } else if (response.status === 401) {
      localStorage.removeItem(TOKEN_STORAGE_KEY)
      window.location.href = '/admin/login'
    } else {
      throw new Error('Erreur lors du chargement des projets')
    }
  } catch (error) {
    console.error('Erreur:', error)
    showNotification('error', t('admin.pages.projects.errors.loadFailed'))
  } finally {
    loading.value = false
  }
}

const openModal = (project?: Project) => {
  errors.value = {}
  activeTab.value = 'fr'
  
  if (project) {
    editingProject.value = project
    form.value = {
      title_fr: project.title_fr,
      title_en: project.title_en,
      description_fr: project.description_fr || '',
      description_en: project.description_en || '',
      technologies: project.technologies?.length ? [...project.technologies] : [''],
      status: project.status,
      demo_url: project.demo_url || '',
      github_url: project.github_url || '',
      image: project.image || '',
      start_date: project.start_date || '',
      end_date: project.end_date || '',
      is_active: project.is_active,
      is_featured: project.is_featured,
      order: project.order
    }
  } else {
    editingProject.value = null
    form.value = {
      title_fr: '',
      title_en: '',
      description_fr: '',
      description_en: '',
      technologies: [''],
      status: 'completed',
      demo_url: '',
      github_url: '',
      image: '',
      start_date: '',
      end_date: '',
      is_active: true,
      is_featured: false,
      order: 0
    }
  }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  editingProject.value = null
  errors.value = {}
}

const addTechnology = () => {
  form.value.technologies.push('')
}

const removeTechnology = (index: number) => {
  if (form.value.technologies.length > 1) {
    form.value.technologies.splice(index, 1)
  }
}

const saveProject = async () => {
  saving.value = true
  errors.value = {}
  
  try {
    // Nettoyer les technologies vides
    const cleanedForm = {
      ...form.value,
      technologies: form.value.technologies.filter(tech => tech.trim() !== '')
    }

    const url = editingProject.value 
      ? `${API_BASE_URL}${API_ENDPOINT.projects}/${editingProject.value.id}`
      : `${API_BASE_URL}${API_ENDPOINT.projects}`
    
    const method = editingProject.value ? 'PUT' : 'POST'
    
    const response = await fetch(url, {
      method,
      headers: apiHeaders.value,
      body: JSON.stringify(cleanedForm)
    })

    const result = await response.json()

    if (response.ok) {
      showNotification('success', result.message)
      closeModal()
      await loadProjects()
    } else {
      if (result.errors) {
        errors.value = result.errors
      }
      throw new Error(result.message || 'Erreur lors de la sauvegarde')
    }
  } catch (error: any) {
    console.error('Erreur:', error)
    showNotification('error', error.message || t('admin.pages.projects.errors.saveFailed'))
  } finally {
    saving.value = false
  }
}

const toggleStatus = async (id: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINT.projects}/${id}/${API_ENDPOINT.toggleStatus}`, {
      method: 'PATCH',
      headers: apiHeaders.value
    })

    if (response.ok) {
      const result = await response.json()
      showNotification('success', result.message)
      await loadProjects()
    } else {
      throw new Error('Erreur lors du changement de statut')
    }
  } catch (error) {
    console.error('Erreur:', error)
    showNotification('error', t('admin.pages.projects.errors.statusFailed'))
  }
}

const toggleFeatured = async (id: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINT.projects}/${id}/toggle-featured`, {
      method: 'PATCH',
      headers: apiHeaders.value
    })

    if (response.ok) {
      const result = await response.json()
      showNotification('success', result.message)
      await loadProjects()
    } else {
      throw new Error('Erreur lors du changement du statut featured')
    }
  } catch (error) {
    console.error('Erreur:', error)
    showNotification('error', t('admin.pages.projects.errors.featuredFailed'))
  }
}

const deleteProject = async (id: number) => {
  if (!confirm(t('admin.pages.projects.confirmDelete'))) {
    return
  }

  try {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINT.projects}/${id}`, {
      method: 'DELETE',
      headers: apiHeaders.value
    })

    if (response.ok) {
      showNotification('success', t('admin.pages.projects.deleteSuccess'))
      await loadProjects()
    } else {
      throw new Error('Erreur lors de la suppression')
    }
  } catch (error) {
    console.error('Erreur:', error)
    showNotification('error', t('admin.pages.projects.errors.deleteFailed'))
  }
}

onMounted(() => {
  loadProjects()
})
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>