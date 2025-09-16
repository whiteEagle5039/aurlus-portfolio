<template>
  <div class="space-y-6">
    <!-- Header avec bouton d'ajout -->
    <div class="flex justify-between items-center">
      <div>
        <h3 class="text-lg font-medium text-gray-900">{{ $t('admin.pages.about.title') }}</h3>
        <p class="text-sm text-gray-600">{{ $t('admin.pages.about.subtitle') }}</p>
      </div>
      <button
        @click="openModal()"
        class="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
      >
        <i class="fas fa-plus"></i>
        <span>{{ $t('admin.pages.about.addButton') }}</span>
      </button>
    </div>
    
    <!-- Indicateur de chargement -->
    <div v-if="loading" class="flex justify-center items-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
      <span class="ml-2 text-gray-600">{{ $t('common.loading') }}</span>
    </div>
    
    <!-- Liste des sections About -->
    <div v-else class="bg-white rounded-lg shadow overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{ $t('admin.pages.about.table.title') }}
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{ $t('admin.pages.about.table.description') }}
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{ $t('admin.pages.about.table.status') }}
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{ $t('admin.pages.about.table.order') }}
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{ $t('admin.pages.about.table.actions') }}
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="item in aboutItems" :key="item.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">
                  {{ currentLocale === 'fr' ? item.title_fr : item.title_en }}
                </div>
                <div class="text-xs text-gray-500">
                  {{ currentLocale === 'fr' ? item.title_en : item.title_fr }}
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm text-gray-900 max-w-xs truncate">
                  {{ currentLocale === 'fr' ? item.description_fr : item.description_en }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span 
                  :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    item.is_active 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  ]"
                >
                  {{ item.is_active ? $t('common.active') : $t('common.inactive') }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="text-sm text-gray-900">{{ item.sort_order }}</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                <!-- Éditer -->
                <button
                  @click="openModal(item)"
                  class="text-indigo-600 hover:text-indigo-900 transition-colors"
                  :title="$t('common.edit')"
                >
                  <font-awesome-icon icon="edit" />
                </button>
                <!-- Activer / Désactiver -->
                <button
                  @click="toggleStatus(item.id)"
                  :class="[
                    'transition-colors',
                    item.is_active 
                      ? 'text-orange-600 hover:text-orange-900' 
                      : 'text-green-600 hover:text-green-900'
                  ]"
                  :title="item.is_active ? $t('common.deactivate') : $t('common.activate')"
                >
                  <font-awesome-icon :icon="item.is_active ? 'pause' : 'play'" />
                </button>
                <!-- Supprimer -->
                <button
                  @click="deleteItem(item.id)"
                  class="text-red-600 hover:text-red-900 transition-colors"
                  :title="$t('common.delete')"
                >
                  <font-awesome-icon icon="trash" />
                </button>
              </td>
            </tr>
            <tr v-if="aboutItems.length === 0">
              <td colspan="5" class="px-6 py-8 text-center text-gray-500">
                {{ $t('admin.pages.about.noData') }}
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
              {{ editingItem ? $t('admin.pages.about.editTitle') : $t('admin.pages.about.addTitle') }}
            </h3>
            <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
              <i class="fas fa-times"></i>
            </button>
          </div>
          
          <form @submit.prevent="saveItem" class="space-y-6">
            <!-- Langues tabs -->
            <div class="border-b border-gray-200">
              <nav class="-mb-px flex space-x-8">
                <button
                  type="button"
                  @click="activeTab = 'fr'"
                  :class="[
                    'py-2 px-1 border-b-2 font-medium text-sm transition-colors',
                    activeTab === 'fr'
                      ? 'border-teal-500 text-teal-600'
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
                      ? 'border-teal-500 text-teal-600'
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
                {{ $t('admin.pages.about.frenchContent') }}
              </h4>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  {{ $t('admin.pages.about.form.titleFr') }} *
                </label>
                <input
                  v-model="form.title_fr"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  :placeholder="$t('admin.pages.about.form.titlePlaceholder')"
                >
                <p v-if="errors.title_fr" class="text-red-500 text-xs mt-1">{{ errors.title_fr[0] }}</p>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  {{ $t('admin.pages.about.form.descriptionFr') }} *
                </label>
                <textarea
                  v-model="form.description_fr"
                  rows="6"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  :placeholder="$t('admin.pages.about.form.descriptionPlaceholder')"
                ></textarea>
                <p v-if="errors.description_fr" class="text-red-500 text-xs mt-1">{{ errors.description_fr[0] }}</p>
              </div>
            </div>

            <!-- Contenu anglais -->
            <div v-show="activeTab === 'en'" class="space-y-4">
              <h4 class="text-md font-medium text-gray-800 flex items-center">
                <i class="fas fa-flag mr-2 text-red-500"></i>
                {{ $t('admin.pages.about.englishContent') }}
              </h4>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  {{ $t('admin.pages.about.form.titleEn') }} *
                </label>
                <input
                  v-model="form.title_en"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  :placeholder="$t('admin.pages.about.form.titlePlaceholder')"
                >
                <p v-if="errors.title_en" class="text-red-500 text-xs mt-1">{{ errors.title_en[0] }}</p>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  {{ $t('admin.pages.about.form.descriptionEn') }} *
                </label>
                <textarea
                  v-model="form.description_en"
                  rows="6"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  :placeholder="$t('admin.pages.about.form.descriptionPlaceholder')"
                ></textarea>
                <p v-if="errors.description_en" class="text-red-500 text-xs mt-1">{{ errors.description_en[0] }}</p>
              </div>
            </div>

            <!-- Paramètres généraux -->
            <div class="border-t border-gray-200 pt-4">
              <h4 class="text-md font-medium text-gray-800 mb-4 flex items-center">
                <i class="fas fa-cog mr-2 text-gray-500"></i>
                {{ $t('admin.pages.about.generalSettings') }}
              </h4>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    {{ $t('admin.pages.about.form.sortOrder') }}
                  </label>
                  <input
                    v-model.number="form.sort_order"
                    type="number"
                    min="0"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                </div>

                <div class="flex items-end">
                  <label class="flex items-center">
                    <input
                      v-model="form.is_active"
                      type="checkbox"
                      class="rounded border-gray-300 text-teal-600 shadow-sm focus:border-teal-300 focus:ring focus:ring-teal-200 focus:ring-opacity-50"
                    >
                    <span class="ml-2 text-sm text-gray-700">
                      {{ $t('admin.pages.about.form.isActive') }}
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
                class="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors disabled:opacity-50 flex items-center"
              >
                <i v-if="saving" class="fas fa-spinner fa-spin mr-2"></i>
                {{ saving ? $t('common.saving') : (editingItem ? $t('common.update') : $t('common.add')) }}
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

interface AboutItem {
  id: number
  title_fr: string
  title_en: string
  description_fr: string
  description_en: string
  is_active: boolean
  sort_order: number
}

const currentLocale = computed(() => locale.value)
const aboutItems = ref<AboutItem[]>([])
const loading = ref(false)
const saving = ref(false)
const showModal = ref(false)
const activeTab = ref<'fr' | 'en'>('fr')
const editingItem = ref<AboutItem | null>(null)

const form = ref({
  title_fr: '',
  title_en: '',
  description_fr: '',
  description_en: '',
  sort_order: 0,
  is_active: true
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

const loadAboutItems = async () => {
  loading.value = true
  try {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINT.about}`, {
      method: 'GET',
      headers: apiHeaders.value
    })
    const result = await response.json()

    if (response.ok) {
      aboutItems.value = result.data || []
    } else if (response.status === 401) {
      localStorage.removeItem(TOKEN_STORAGE_KEY)
      window.location.href = '/admin/login'
    } else {
      console.log('Validation errors:', result.error)
      throw new Error('Erreur lors du chargement des sections About')
    }
  } catch (error) {
    console.error('Erreur:', error)
    showNotification('error', t('admin.pages.about.errors.loadFailed'))
  } finally {
    loading.value = false
  }
}

const openModal = (item?: AboutItem) => {
  errors.value = {}
  activeTab.value = 'fr'
  
  if (item) {
    editingItem.value = item
    form.value = {
      title_fr: item.title_fr,
      title_en: item.title_en,
      description_fr: item.description_fr,
      description_en: item.description_en,
      sort_order: item.sort_order,
      is_active: item.is_active
    }
  } else {
    editingItem.value = null
    form.value = {
      title_fr: '',
      title_en: '',
      description_fr: '',
      description_en: '',
      sort_order: 0,
      is_active: true
    }
  }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  editingItem.value = null
  errors.value = {}
}

const saveItem = async () => {
  saving.value = true
  errors.value = {}
  
  try {
    const url = editingItem.value 
      ? `${API_BASE_URL}${API_ENDPOINT.about}/${editingItem.value.id}`
      : `${API_BASE_URL}${API_ENDPOINT.about}`
    
    const method = editingItem.value ? 'PUT' : 'POST'
    
    const response = await fetch(url, {
      method,
      headers: apiHeaders.value,
      body: JSON.stringify(form.value)
    })

    const result = await response.json()

    if (response.ok) {
      showNotification('success', result.message)
      closeModal()
      await loadAboutItems()
    } else {

      if (result.errors) {
        errors.value = result.errors
      }
      throw new Error(result.message || 'Erreur lors de la sauvegarde')
    }
  } catch (error: any) {
    console.error('Erreur:', error)
    showNotification('error', error.message || t('admin.pages.about.errors.saveFailed'))
  } finally {
    saving.value = false
  }
}

const toggleStatus = async (id: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINT.about}/${id}/${API_ENDPOINT.toggleStatus}`, {
      method: 'PATCH',
      headers: apiHeaders.value
    })

    if (response.ok) {
      const result = await response.json()
      showNotification('success', result.message)
      await loadAboutItems()
    } else {
      throw new Error('Erreur lors du changement de statut')
    }
  } catch (error) {
    console.error('Erreur:', error)
    showNotification('error', t('admin.pages.about.errors.statusFailed'))
  }
}

const deleteItem = async (id: number) => {
  if (!confirm(t('admin.pages.about.confirmDelete'))) {
    return
  }

  try {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINT.about}/${id}`, {
      method: 'DELETE',
      headers: apiHeaders.value
    })

    if (response.ok) {
      showNotification('success', t('admin.pages.about.deleteSuccess'))
      await loadAboutItems()
    } else {
      throw new Error('Erreur lors de la suppression')
    }
  } catch (error) {
    console.error('Erreur:', error)
    showNotification('error', t('admin.pages.about.errors.deleteFailed'))
  }
}

onMounted(() => {
  loadAboutItems()
})
</script>