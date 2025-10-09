<template>
  <div class="space-y-6">
    <!-- Header avec bouton d'ajout -->
    <div class="flex justify-between items-center">
      <div>
        <h3 class="text-lg font-medium text-gray-900">{{ $t('admin.pages.certifications.title') }}</h3>
        <p class="text-sm text-gray-600">{{ $t('admin.pages.certifications.subtitle') }}</p>
      </div>
      <button
        @click="openModal()"
        class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
      >
        <i class="fas fa-plus"></i>
        <span>{{ $t('admin.pages.certifications.addButton') }}</span>
      </button>
    </div>

    <!-- Filtres -->
    <div class="bg-white p-4 rounded-lg shadow">
      <div class="flex flex-wrap gap-4 items-center">
        <div class="flex-1 min-w-[200px]">
          <label class="block text-sm font-medium text-gray-700 mb-1">
            {{ $t('admin.pages.certifications.filters.type') }}
          </label>
          <select
            v-model="filters.type"
            @change="loadCertifications"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">{{ $t('admin.pages.certifications.filters.allTypes') }}</option>
            <option value="professional">{{ $t('admin.pages.certifications.types.professional') }}</option>
            <option value="training">{{ $t('admin.pages.certifications.types.training') }}</option>
          </select>
        </div>

        <div class="flex items-center space-x-4 pt-6">
          <label class="flex items-center">
            <input
              v-model="filters.activeOnly"
              @change="loadCertifications"
              type="checkbox"
              class="rounded border-gray-300 text-green-600 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
            >
            <span class="ml-2 text-sm text-gray-700">
              {{ $t('admin.pages.certifications.filters.activeOnly') }}
            </span>
          </label>

          <label class="flex items-center">
            <input
              v-model="filters.validOnly"
              @change="loadCertifications"
              type="checkbox"
              class="rounded border-gray-300 text-green-600 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
            >
            <span class="ml-2 text-sm text-gray-700">
              {{ $t('admin.pages.certifications.filters.validOnly') }}
            </span>
          </label>
        </div>
      </div>
    </div>

    <!-- Statistiques par type -->
    <div v-if="stats && stats.by_type" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="bg-white p-4 rounded-lg shadow">
        <h4 class="text-sm font-semibold text-gray-700 mb-3 flex items-center">
          <i class="fas fa-briefcase text-indigo-500 mr-2"></i>
          {{ $t('admin.pages.certifications.types.professional') }}
        </h4>
        <div class="grid grid-cols-3 gap-4">
          <div>
            <p class="text-xs text-gray-500">{{ $t('admin.pages.certifications.stats.total') }}</p>
            <p class="text-xl font-bold text-gray-900">{{ stats.by_type.professional.total }}</p>
          </div>
          <div>
            <p class="text-xs text-gray-500">{{ $t('admin.pages.certifications.stats.active') }}</p>
            <p class="text-xl font-bold text-green-600">{{ stats.by_type.professional.active }}</p>
          </div>
          <div>
            <p class="text-xs text-gray-500">{{ $t('admin.pages.certifications.stats.valid') }}</p>
            <p class="text-xl font-bold text-emerald-600">{{ stats.by_type.professional.valid }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg shadow">
        <h4 class="text-sm font-semibold text-gray-700 mb-3 flex items-center">
          <i class="fas fa-graduation-cap text-purple-500 mr-2"></i>
          {{ $t('admin.pages.certifications.types.training') }}
        </h4>
        <div class="grid grid-cols-3 gap-4">
          <div>
            <p class="text-xs text-gray-500">{{ $t('admin.pages.certifications.stats.total') }}</p>
            <p class="text-xl font-bold text-gray-900">{{ stats.by_type.training.total }}</p>
          </div>
          <div>
            <p class="text-xs text-gray-500">{{ $t('admin.pages.certifications.stats.active') }}</p>
            <p class="text-xl font-bold text-green-600">{{ stats.by_type.training.active }}</p>
          </div>
          <div>
            <p class="text-xs text-gray-500">{{ $t('admin.pages.certifications.stats.valid') }}</p>
            <p class="text-xl font-bold text-emerald-600">{{ stats.by_type.training.valid }}</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Indicateur de chargement -->
    <div v-if="loading" class="flex justify-center items-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
      <span class="ml-2 text-gray-600">{{ $t('common.loading') }}</span>
    </div>
    
    <!-- Liste des certifications -->
    <div v-else class="bg-white rounded-lg shadow overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{ $t('admin.pages.certifications.table.type') }}
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{ $t('admin.pages.certifications.table.name') }}
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{ $t('admin.pages.certifications.table.organization') }}
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{ $t('admin.pages.certifications.table.obtained') }}
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{ $t('admin.pages.certifications.table.expiry') }}
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{ $t('admin.pages.certifications.table.status') }}
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {{ $t('admin.pages.certifications.table.actions') }}
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="certification in certifications" :key="certification.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <span 
                  :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    certification.type === 'professional' 
                      ? 'bg-indigo-100 text-indigo-800' 
                      : 'bg-purple-100 text-purple-800'
                  ]"
                >
                  <i 
                    :class="[
                      'mr-1',
                      certification.type === 'professional' ? 'fas fa-briefcase' : 'fas fa-graduation-cap'
                    ]"
                  ></i>
                  {{ getTypeLabel(certification.type) }}
                </span>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm font-medium text-gray-900">
                  {{ currentLocale === 'fr' ? certification.name_fr : certification.name_en }}
                </div>
                <div v-if="certification.description_fr || certification.description_en" class="text-sm text-gray-500 truncate max-w-xs">
                  {{ currentLocale === 'fr' ? certification.description_fr : certification.description_en }}
                </div>
                <div class="text-xs text-gray-400">
                  {{ currentLocale === 'fr' ? certification.name_en : certification.name_fr }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ certification.issuing_organization }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ formatDate(certification.obtained_date) }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div v-if="certification.never_expires" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  {{ $t('admin.pages.certifications.status.permanent') }}
                </div>
                <div v-else class="text-sm text-gray-900">{{ formatDate(certification.expiry_date) }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span 
                  :class="getStatusClass(certification)"
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                >
                  {{ getStatusText(certification) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                <button
                  @click="openModal(certification)"
                  class="text-indigo-600 hover:text-indigo-900 transition-colors"
                  :title="$t('common.edit')"
                >
                  <font-awesome-icon icon="edit" />
                </button>
                <button
                  @click="toggleStatus(certification.id)"
                  :class="[
                    'transition-colors',
                    certification.is_active 
                      ? 'text-orange-600 hover:text-orange-900' 
                      : 'text-green-600 hover:text-green-900'
                  ]"
                  :title="certification.is_active ? $t('common.deactivate') : $t('common.activate')"
                >
                  <font-awesome-icon :icon="certification.is_active ? 'pause' : 'play'" />
                </button>
                <button
                  @click="deleteCertification(certification.id)"
                  class="text-red-600 hover:text-red-900 transition-colors"
                  :title="$t('common.delete')"
                >
                  <font-awesome-icon icon="trash" />
                </button>
              </td>
            </tr>
            <tr v-if="certifications.length === 0">
              <td colspan="7" class="px-6 py-8 text-center text-gray-500">
                {{ $t('admin.pages.certifications.noData') }}
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
              {{ editingCertification ? $t('admin.pages.certifications.editTitle') : $t('admin.pages.certifications.addTitle') }}
            </h3>
            <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
              <i class="fas fa-times"></i>
            </button>
          </div>
          
          <form @submit.prevent="saveCertification" class="space-y-6">
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
                  {{ $t('admin.pages.certifications.generalInfo') }}
                </button>
              </nav>
            </div>

            <!-- Contenu français -->
            <div v-show="activeTab === 'fr'" class="space-y-4">
              <h4 class="text-md font-medium text-gray-800 flex items-center">
                <i class="fas fa-flag mr-2 text-blue-500"></i>
                {{ $t('admin.pages.certifications.frenchContent') }}
              </h4>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  {{ $t('admin.pages.certifications.form.nameFr') }} *
                </label>
                <input
                  v-model="form.name_fr"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  :placeholder="$t('admin.pages.certifications.form.namePlaceholder')"
                >
                <p v-if="errors.name_fr" class="text-red-500 text-xs mt-1">{{ errors.name_fr[0] }}</p>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  {{ $t('admin.pages.certifications.form.descriptionFr') }}
                </label>
                <textarea
                  v-model="form.description_fr"
                  rows="4"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  :placeholder="$t('admin.pages.certifications.form.descriptionPlaceholder')"
                ></textarea>
                <p v-if="errors.description_fr" class="text-red-500 text-xs mt-1">{{ errors.description_fr[0] }}</p>
              </div>
            </div>

            <!-- Contenu anglais -->
            <div v-show="activeTab === 'en'" class="space-y-4">
              <h4 class="text-md font-medium text-gray-800 flex items-center">
                <i class="fas fa-flag mr-2 text-red-500"></i>
                {{ $t('admin.pages.certifications.englishContent') }}
              </h4>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  {{ $t('admin.pages.certifications.form.nameEn') }} *
                </label>
                <input
                  v-model="form.name_en"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  :placeholder="$t('admin.pages.certifications.form.namePlaceholder')"
                >
                <p v-if="errors.name_en" class="text-red-500 text-xs mt-1">{{ errors.name_en[0] }}</p>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  {{ $t('admin.pages.certifications.form.descriptionEn') }}
                </label>
                <textarea
                  v-model="form.description_en"
                  rows="4"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  :placeholder="$t('admin.pages.certifications.form.descriptionPlaceholder')"
                ></textarea>
                <p v-if="errors.description_en" class="text-red-500 text-xs mt-1">{{ errors.description_en[0] }}</p>
              </div>
            </div>

            <!-- Informations générales -->
            <div v-show="activeTab === 'general'" class="space-y-4">
              <h4 class="text-md font-medium text-gray-800 flex items-center">
                <i class="fas fa-info-circle mr-2 text-gray-500"></i>
                {{ $t('admin.pages.certifications.generalInfo') }}
              </h4>

              <!-- Type de certification -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  {{ $t('admin.pages.certifications.form.type') }} *
                </label>
                <select
                  v-model="form.type"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="" disabled>{{ $t('admin.pages.certifications.form.selectType') }}</option>
                  <option value="professional">{{ $t('admin.pages.certifications.types.professional') }}</option>
                  <option value="training">{{ $t('admin.pages.certifications.types.training') }}</option>
                </select>
                <p v-if="errors.type" class="text-red-500 text-xs mt-1">{{ errors.type[0] }}</p>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  {{ $t('admin.pages.certifications.form.issuingOrganization') }} *
                </label>
                <input
                  v-model="form.issuing_organization"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  :placeholder="$t('admin.pages.certifications.form.organizationPlaceholder')"
                >
                <p v-if="errors.issuing_organization" class="text-red-500 text-xs mt-1">{{ errors.issuing_organization[0] }}</p>
              </div>

              <!-- Informations de validité -->
              <div class="border-t border-gray-200 pt-4">
                <h5 class="text-sm font-medium text-gray-800 mb-4 flex items-center">
                  <i class="fas fa-calendar-check mr-2 text-green-500"></i>
                  {{ $t('admin.pages.certifications.validityInfo') }}
                </h5>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                      {{ $t('admin.pages.certifications.form.obtainedDate') }} *
                    </label>
                    <input
                      v-model="form.obtained_date"
                      type="date"
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                    <p v-if="errors.obtained_date" class="text-red-500 text-xs mt-1">{{ errors.obtained_date[0] }}</p>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                      {{ $t('admin.pages.certifications.form.expiryDate') }}
                    </label>
                    <input
                      v-model="form.expiry_date"
                      type="date"
                      :disabled="form.never_expires"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
                    >
                    <p v-if="errors.expiry_date" class="text-red-500 text-xs mt-1">{{ errors.expiry_date[0] }}</p>
                  </div>
                </div>

                <div class="mt-4">
                  <label class="flex items-center">
                    <input
                      v-model="form.never_expires"
                      type="checkbox"
                      class="rounded border-gray-300 text-green-600 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                    >
                    <span class="ml-2 text-sm text-gray-700">
                      {{ $t('admin.pages.certifications.form.neverExpires') }}
                    </span>
                  </label>
                </div>
              </div>

              <!-- Informations supplémentaires -->
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    {{ $t('admin.pages.certifications.form.certificateUrl') }}
                  </label>
                  <input
                    v-model="form.certificate_url"
                    type="url"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    :placeholder="$t('admin.pages.certifications.form.urlPlaceholder')"
                  >
                  <p v-if="errors.certificate_url" class="text-red-500 text-xs mt-1">{{ errors.certificate_url[0] }}</p>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    {{ $t('admin.pages.certifications.form.certificateId') }}
                  </label>
                  <input
                    v-model="form.certificate_id"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    :placeholder="$t('admin.pages.certifications.form.idPlaceholder')"
                  >
                  <p v-if="errors.certificate_id" class="text-red-500 text-xs mt-1">{{ errors.certificate_id[0] }}</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                      {{ $t('admin.pages.certifications.form.sortOrder') }}
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
                        {{ $t('admin.pages.certifications.form.isActive') }}
                      </span>
                    </label>
                  </div>
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
                {{ saving ? $t('common.saving') : (editingCertification ? $t('common.update') : $t('common.add')) }}
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

interface Certification {
  id: number
  type: 'professional' | 'training'
  name_fr: string
  name_en: string
  description_fr?: string
  description_en?: string
  issuing_organization: string
  obtained_date: string
  expiry_date: string | null
  never_expires: boolean
  certificate_url?: string
  certificate_id?: string
  is_active: boolean
  sort_order: number
  is_valid?: boolean
  status?: string
}

interface Stats {
  total: number
  active: number
  valid: number
  expired: number
  expiring_soon: number
  by_type?: {
    professional: {
      total: number
      active: number
      valid: number
    }
    training: {
      total: number
      active: number
      valid: number
    }
  }
}

const currentLocale = computed(() => locale.value)
const certifications = ref<Certification[]>([])
const stats = ref<Stats | null>(null)
const loading = ref(false)
const saving = ref(false)
const showModal = ref(false)
const activeTab = ref<'fr' | 'en' | 'general'>('fr')
const editingCertification = ref<Certification | null>(null)

const filters = ref({
  type: '',
  activeOnly: false,
  validOnly: false
})

const form = ref({
  type: '' as 'professional' | 'training' | '',
  name_fr: '',
  name_en: '',
  description_fr: '',
  description_en: '',
  issuing_organization: '',
  obtained_date: '',
  expiry_date: '',
  never_expires: false,
  certificate_url: '',
  certificate_id: '',
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

const formatDate = (dateString: string | null): string => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString(currentLocale.value === 'fr' ? 'fr-FR' : 'en-US')
}

const getTypeLabel = (type: string): string => {
  return type === 'professional' 
    ? t('admin.pages.certifications.types.professional')
    : t('admin.pages.certifications.types.training')
}

const getStatusClass = (certification: Certification): string => {
  if (!certification.is_active) return 'bg-gray-100 text-gray-800'
  
  if (certification.never_expires) return 'bg-purple-100 text-purple-800'
  
  if (certification.status === 'expired') return 'bg-red-100 text-red-800'
  if (certification.status === 'expiring_soon') return 'bg-yellow-100 text-yellow-800'
  if (certification.status === 'valid') return 'bg-green-100 text-green-800'
  
  return 'bg-gray-100 text-gray-800'
}

const getStatusText = (certification: Certification): string => {
  if (!certification.is_active) return t('common.inactive')
  
  if (certification.never_expires) return t('admin.pages.certifications.status.permanent')
  
  switch (certification.status) {
    case 'valid':
      return t('admin.pages.certifications.status.valid')
    case 'expired':
      return t('admin.pages.certifications.status.expired')
    case 'expiring_soon':
      return t('admin.pages.certifications.status.expiring_soon')
    default:
      return t('common.unknown')
  }
}

const loadCertifications = async () => {
  loading.value = true
  try {
    const params = new URLSearchParams()
    
    if (filters.value.type) {
      params.append('type', filters.value.type)
    }
    if (filters.value.activeOnly) {
      params.append('active_only', '1')
    }
    if (filters.value.validOnly) {
      params.append('valid_only', '1')
    }

    const url = `${API_BASE_URL}${API_ENDPOINT.certifications}${params.toString() ? '?' + params.toString() : ''}`
    
    const response = await fetch(url, {
      method: 'GET',
      headers: apiHeaders.value
    })

    if (response.ok) {
      const result = await response.json()
      certifications.value = result.data || []
    } else {
      const error = await response.json()
      console.log('Response not ok:', error.error)
      throw new Error('Erreur lors du chargement des certifications')
    }

  } catch (error) {
    console.error('Erreur:', error)
    showNotification('error', t('admin.pages.certifications.errors.loadFailed'))
  } finally {
    loading.value = false
  }
}

const loadStats = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINT.certifications}/stats`, {
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

const openModal = (certification?: Certification) => {
  errors.value = {}
  activeTab.value = 'fr'
  
  if (certification) {
    editingCertification.value = certification
    form.value = {
      type: certification.type,
      name_fr: certification.name_fr,
      name_en: certification.name_en,
      description_fr: certification.description_fr || '',
      description_en: certification.description_en || '',
      issuing_organization: certification.issuing_organization,
      obtained_date: certification.obtained_date,
      expiry_date: certification.expiry_date || '',
      never_expires: certification.never_expires,
      certificate_url: certification.certificate_url || '',
      certificate_id: certification.certificate_id || '',
      is_active: certification.is_active,
      sort_order: certification.sort_order
    }
  } else {
    editingCertification.value = null
    form.value = {
      type: '',
      name_fr: '',
      name_en: '',
      description_fr: '',
      description_en: '',
      issuing_organization: '',
      obtained_date: '',
      expiry_date: '',
      never_expires: false,
      certificate_url: '',
      certificate_id: '',
      is_active: true,
      sort_order: 0
    }
  }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  editingCertification.value = null
  errors.value = {}
}

const saveCertification = async () => {
  saving.value = true
  errors.value = {}
  
  try {
    const cleanedForm = {
      ...form.value,
      expiry_date: form.value.never_expires ? null : form.value.expiry_date
    }

    const url = editingCertification.value 
      ? `${API_BASE_URL}${API_ENDPOINT.certifications}/${editingCertification.value.id}`
      : `${API_BASE_URL}${API_ENDPOINT.certifications}`
    
    const method = editingCertification.value ? 'PUT' : 'POST'
    
    const response = await fetch(url, {
      method,
      headers: apiHeaders.value,
      body: JSON.stringify(cleanedForm)
    })

    const result = await response.json()

    if (response.ok) {
      showNotification('success', result.message)
      closeModal()
      await loadCertifications()
      await loadStats()
    } else {
      if (result.errors) {
        errors.value = result.errors
      }
      throw new Error(result.message || 'Erreur lors de la sauvegarde')
    }
  } catch (error: any) {
    console.error('Erreur:', error)
    showNotification('error', error.message || t('admin.pages.certifications.errors.saveFailed'))
  } finally {
    saving.value = false
  }
}

const toggleStatus = async (id: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINT.certifications}/${id}/${API_ENDPOINT.toggleStatus}`, {
      method: 'PATCH',
      headers: apiHeaders.value
    })

    if (response.ok) {
      const result = await response.json()
      showNotification('success', result.message)
      await loadCertifications()
      await loadStats()
    } else {
      throw new Error('Erreur lors du changement de statut')
    }
  } catch (error) {
    console.error('Erreur:', error)
    showNotification('error', t('admin.pages.certifications.errors.statusFailed'))
  }
}

const deleteCertification = async (id: number) => {
  if (!confirm(t('admin.pages.certifications.confirmDelete'))) {
    return
  }

  try {
    const response = await fetch(`${API_BASE_URL}/admin/certifications/${id}`, {
      method: 'DELETE',
      headers: apiHeaders.value
    })

    if (response.ok) {
      showNotification('success', t('admin.pages.certifications.deleteSuccess'))
      await loadCertifications()
      await loadStats()
    } else {
      throw new Error('Erreur lors de la suppression')
    }
  } catch (error) {
    console.error('Erreur:', error)
    showNotification('error', t('admin.pages.certifications.errors.deleteFailed'))
  }
}

onMounted(async () => {
  await loadCertifications()
  await loadStats()
})
</script>