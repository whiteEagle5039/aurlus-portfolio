<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h3 class="text-lg font-medium text-gray-900">{{ $t('admin.pages.profile.title') }}</h3>
        <p class="text-sm text-gray-600">{{ $t('admin.pages.profile.subtitle') }}</p>
      </div>
    </div>
    
    <!-- Indicateur de chargement -->
    <div v-if="loading" class="flex justify-center items-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
      <span class="ml-2 text-gray-600">{{ $t('common.loading') }}</span>
    </div>
    
    <!-- Informations actuelles -->
    <div v-else class="bg-white rounded-lg shadow p-6">
      <div class="mb-6">
        <h4 class="text-md font-medium text-gray-800 mb-4 flex items-center">
          <i class="fas fa-user-circle mr-2 text-gray-500"></i>
          {{ $t('admin.pages.profile.currentInfo') }}
        </h4>
        <div class="bg-gray-50 p-4 rounded-lg">
          <p class="text-sm text-gray-600">
            <span class="font-medium">{{ $t('admin.pages.profile.currentEmail') }}:</span>
            {{ currentUser?.email }}
          </p>
        </div>
      </div>

      <!-- Boutons d'action -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          @click="openModal('credentials')"
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg flex items-center justify-center space-x-2 transition-colors"
        >
          <i class="fas fa-key"></i>
          <span>{{ $t('admin.pages.profile.updateCredentials') }}</span>
        </button>
        
        <button
          @click="openModal('email')"
          class="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg flex items-center justify-center space-x-2 transition-colors"
        >
          <i class="fas fa-envelope"></i>
          <span>{{ $t('admin.pages.profile.updateEmail') }}</span>
        </button>
        
        <button
          @click="openModal('password')"
          class="bg-orange-600 hover:bg-orange-700 text-white px-4 py-3 rounded-lg flex items-center justify-center space-x-2 transition-colors"
        >
          <i class="fas fa-lock"></i>
          <span>{{ $t('admin.pages.profile.updatePassword') }}</span>
        </button>
      </div>
    </div>
    
    <!-- Modal de mise à jour -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-lg font-medium text-gray-900">
              {{ getModalTitle() }}
            </h3>
            <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
              <i class="fas fa-times"></i>
            </button>
          </div>
          
          <form @submit.prevent="updateProfile" class="space-y-4">
            <!-- Mot de passe actuel (obligatoire pour toutes les actions) -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                {{ $t('admin.pages.profile.form.currentPassword') }} *
              </label>
              <div class="relative">
                <input
                  v-model="form.current_password"
                  :type="showCurrentPassword ? 'text' : 'password'"
                  required
                  class="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  :placeholder="$t('admin.pages.profile.form.currentPasswordPlaceholder')"
                >
                <button
                  type="button"
                  @click="showCurrentPassword = !showCurrentPassword"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <i :class="showCurrentPassword ? 'fas fa-eye-slash' : 'fas fa-eye'" class="text-gray-400"></i>
                </button>
              </div>
              <p v-if="errors.current_password" class="text-red-500 text-xs mt-1">{{ errors.current_password[0] }}</p>
            </div>

            <!-- Email (pour credentials et email uniquement) -->
            <div v-if="modalType === 'credentials' || modalType === 'email'">
              <label class="block text-sm font-medium text-gray-700 mb-1">
                {{ $t('admin.pages.profile.form.newEmail') }} *
              </label>
              <input
                v-model="form.email"
                type="email"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                :placeholder="$t('admin.pages.profile.form.emailPlaceholder')"
              >
              <p v-if="errors.email" class="text-red-500 text-xs mt-1">{{ errors.email[0] }}</p>
            </div>

            <!-- Nouveau mot de passe (pour credentials et password uniquement) -->
            <div v-if="modalType === 'credentials' || modalType === 'password'">
              <label class="block text-sm font-medium text-gray-700 mb-1">
                {{ $t('admin.pages.profile.form.newPassword') }} *
              </label>
              <div class="relative">
                <input
                  v-model="form.password"
                  :type="showNewPassword ? 'text' : 'password'"
                  required
                  class="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  :placeholder="$t('admin.pages.profile.form.newPasswordPlaceholder')"
                >
                <button
                  type="button"
                  @click="showNewPassword = !showNewPassword"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <i :class="showNewPassword ? 'fas fa-eye-slash' : 'fas fa-eye'" class="text-gray-400"></i>
                </button>
              </div>
              <p v-if="errors.password" class="text-red-500 text-xs mt-1">{{ errors.password[0] }}</p>
            </div>

            <!-- Confirmation du mot de passe -->
            <div v-if="modalType === 'credentials' || modalType === 'password'">
              <label class="block text-sm font-medium text-gray-700 mb-1">
                {{ $t('admin.pages.profile.form.confirmPassword') }} *
              </label>
              <div class="relative">
                <input
                  v-model="form.password_confirmation"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  required
                  class="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  :placeholder="$t('admin.pages.profile.form.confirmPasswordPlaceholder')"
                >
                <button
                  type="button"
                  @click="showConfirmPassword = !showConfirmPassword"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <i :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'" class="text-gray-400"></i>
                </button>
              </div>
              <p v-if="errors.password_confirmation" class="text-red-500 text-xs mt-1">{{ errors.password_confirmation[0] }}</p>
            </div>

            <!-- Exigences du mot de passe -->
            <div v-if="modalType === 'credentials' || modalType === 'password'" class="bg-blue-50 p-3 rounded-lg">
              <p class="text-xs text-blue-700 font-medium mb-2">{{ $t('admin.pages.profile.passwordRequirements.title') }}</p>
              <ul class="text-xs text-blue-600 space-y-1">
                <li class="flex items-center">
                  <i class="fas fa-check text-green-500 mr-2 w-3"></i>
                  {{ $t('admin.pages.profile.passwordRequirements.minLength') }}
                </li>
                <li class="flex items-center">
                  <i class="fas fa-check text-green-500 mr-2 w-3"></i>
                  {{ $t('admin.pages.profile.passwordRequirements.mixedCase') }}
                </li>
                <li class="flex items-center">
                  <i class="fas fa-check text-green-500 mr-2 w-3"></i>
                  {{ $t('admin.pages.profile.passwordRequirements.numbers') }}
                </li>
                <li class="flex items-center">
                  <i class="fas fa-check text-green-500 mr-2 w-3"></i>
                  {{ $t('admin.pages.profile.passwordRequirements.symbols') }}
                </li>
              </ul>
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
                {{ saving ? $t('common.saving') : $t('common.update') }}
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

interface User {
  id: number
  email: string
  name?: string
}

const currentLocale = computed(() => locale.value)
const currentUser = ref<User | null>(null)
const loading = ref(false)
const saving = ref(false)
const showModal = ref(false)
const modalType = ref<'credentials' | 'email' | 'password'>('credentials')

// Visibilité des mots de passe
const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)

const form = ref({
  current_password: '',
  email: '',
  password: '',
  password_confirmation: ''
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

const loadCurrentUser = async () => {
  loading.value = true
  try {
    const response = await fetch(`${API_BASE_URL}/user`, {
      method: 'GET',
      headers: apiHeaders.value
    })

    if (response.ok) {
      currentUser.value = await response.json()
    } else if (response.status === 401) {
      localStorage.removeItem(TOKEN_STORAGE_KEY)
      window.location.href = '/admin/login'
    } else {
      throw new Error('Erreur lors du chargement des informations utilisateur')
    }
  } catch (error) {
    console.error('Erreur:', error)
    showNotification('error', t('admin.pages.profile.errors.loadFailed'))
  } finally {
    loading.value = false
  }
}

const getModalTitle = () => {
  switch (modalType.value) {
    case 'credentials':
      return t('admin.pages.profile.modal.credentialsTitle')
    case 'email':
      return t('admin.pages.profile.modal.emailTitle')
    case 'password':
      return t('admin.pages.profile.modal.passwordTitle')
    default:
      return ''
  }
}

const openModal = (type: 'credentials' | 'email' | 'password') => {
  modalType.value = type
  errors.value = {}
  
  // Réinitialiser le formulaire
  form.value = {
    current_password: '',
    email: type === 'credentials' || type === 'email' ? (currentUser.value?.email || '') : '',
    password: '',
    password_confirmation: ''
  }

  // Réinitialiser la visibilité des mots de passe
  showCurrentPassword.value = false
  showNewPassword.value = false
  showConfirmPassword.value = false
  
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  errors.value = {}
}

const updateProfile = async () => {
  saving.value = true
  errors.value = {}
  
  try {
    let endpoint = ''
    let requestBody: any = {
      current_password: form.value.current_password
    }

    switch (modalType.value) {
      case 'credentials':
        endpoint = 'auth/update-credentials'
        requestBody.email = form.value.email
        requestBody.password = form.value.password
        requestBody.password_confirmation = form.value.password_confirmation
        break
      case 'email':
        endpoint = 'auth/update-email'
        requestBody.email = form.value.email
        break
      case 'password':
        endpoint = 'auth/update-password'
        requestBody.password = form.value.password
        requestBody.password_confirmation = form.value.password_confirmation
        break
    }
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: apiHeaders.value,
      body: JSON.stringify(requestBody)
    })

    const result = await response.json()

    if (response.ok) {
      showNotification('success', result.message)
      closeModal()
      
      // Mettre à jour le token si nécessaire (pour credentials)
      if (result.token && modalType.value === 'credentials') {
        localStorage.setItem(TOKEN_STORAGE_KEY, result.token)
      }
      
      // Recharger les informations utilisateur
      await loadCurrentUser()
    } else {
      if (result.errors) {
        errors.value = result.errors
      }
      throw new Error(result.message || 'Erreur lors de la mise à jour')
    }
  } catch (error: any) {
    console.error('Erreur:', error)
    showNotification('error', error.message || t('admin.pages.profile.errors.updateFailed'))
  } finally {
    saving.value = false
  }
}

onMounted(() => {
  loadCurrentUser()
})
</script>