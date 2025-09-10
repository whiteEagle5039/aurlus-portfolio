<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
    <div class="max-w-lg w-full">
      <!-- Header -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-orange-500 rounded-full mb-4">
          <i class="fas fa-key text-white text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">{{ $t('admin.changePassword.title') }}</h1>
        <p class="text-gray-600 dark:text-gray-400 mt-2">{{ $t('admin.changePassword.subtitle') }}</p>
      </div>

      <!-- Language Toggle -->
      <div class="flex justify-center mb-6">
        <button 
          @click="toggleLanguage" 
          class="inline-flex items-center px-3 py-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 dark:border-gray-600"
          :aria-label="$t('admin.changePassword.toggleLanguage')"
        >
          <i class="fas fa-language text-gray-600 dark:text-gray-300 mr-2"></i>
          <span class="text-gray-700 dark:text-gray-300 font-medium">{{ currentLocale.toUpperCase() }}</span>
        </button>
      </div>

      <!-- Change Password Form -->
      <div class="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
        <!-- Security Notice -->
        <div v-if="isFirstTimeChange" class="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-6">
          <div class="flex items-start">
            <i class="fas fa-exclamation-triangle text-amber-500 mt-1 mr-3"></i>
            <div>
              <h4 class="text-sm font-medium text-amber-800 dark:text-amber-300 mb-1">
                {{ $t('admin.changePassword.securityNotice.title') }}
              </h4>
              <p class="text-sm text-amber-700 dark:text-amber-400">
                {{ $t('admin.changePassword.securityNotice.message') }}
              </p>
            </div>
          </div>
        </div>

        <form @submit.prevent="handleChangePassword" class="space-y-6">
          <!-- Current Password Field -->
          <div>
            <label for="currentPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {{ $t('admin.changePassword.form.currentPassword.label') }}
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-lock text-gray-400"></i>
              </div>
              <input
                id="currentPassword"
                v-model="passwordForm.currentPassword"
                :type="showCurrentPassword ? 'text' : 'password'"
                required
                :class="[
                  'w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200',
                  passwordError ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600',
                  'bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400'
                ]"
                :placeholder="$t('admin.changePassword.form.currentPassword.placeholder')"
              />
              <button
                type="button"
                @click="showCurrentPassword = !showCurrentPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <i :class="showCurrentPassword ? 'fas fa-eye-slash' : 'fas fa-eye'" class="text-gray-400 hover:text-gray-600"></i>
              </button>
            </div>
          </div>

          <!-- New Password Field -->
          <div>
            <label for="newPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {{ $t('admin.changePassword.form.newPassword.label') }}
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-key text-gray-400"></i>
              </div>
              <input
                id="newPassword"
                v-model="passwordForm.newPassword"
                :type="showNewPassword ? 'text' : 'password'"
                required
                :class="[
                  'w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200',
                  passwordError ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600',
                  'bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400'
                ]"
                :placeholder="$t('admin.changePassword.form.newPassword.placeholder')"
                @input="checkPasswordStrength"
              />
              <button
                type="button"
                @click="showNewPassword = !showNewPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <i :class="showNewPassword ? 'fas fa-eye-slash' : 'fas fa-eye'" class="text-gray-400 hover:text-gray-600"></i>
              </button>
            </div>
            
            <!-- Password Strength Indicator -->
            <div v-if="passwordForm.newPassword" class="mt-2">
              <div class="flex items-center space-x-2">
                <div class="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div
                    :class="[
                      'h-2 rounded-full transition-all duration-300',
                      passwordStrength.color
                    ]"
                    :style="{ width: passwordStrength.percentage + '%' }"
                  ></div>
                </div>
                <span :class="['text-xs font-medium', passwordStrength.textColor]">
                  {{ passwordStrength.label }}
                </span>
              </div>
              
              <!-- Password Requirements -->
              <div class="mt-3 space-y-1">
                <div v-for="requirement in passwordRequirements" :key="requirement.key" class="flex items-center text-xs">
                  <i :class="[
                    requirement.met ? 'fas fa-check text-green-500' : 'fas fa-times text-red-500',
                    'mr-2'
                  ]"></i>
                  <span :class="requirement.met ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'">
                    {{ $t(`admin.changePassword.requirements.${requirement.key}`) }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Confirm Password Field -->
          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {{ $t('admin.changePassword.form.confirmPassword.label') }}
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-shield-alt text-gray-400"></i>
              </div>
              <input
                id="confirmPassword"
                v-model="passwordForm.confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                required
                :class="[
                  'w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200',
                  passwordError || !passwordsMatch ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600',
                  'bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400'
                ]"
                :placeholder="$t('admin.changePassword.form.confirmPassword.placeholder')"
              />
              <button
                type="button"
                @click="showConfirmPassword = !showConfirmPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <i :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'" class="text-gray-400 hover:text-gray-600"></i>
              </button>
            </div>
            
            <!-- Password Match Indicator -->
            <div v-if="passwordForm.confirmPassword && !passwordsMatch" class="mt-2 flex items-center text-red-600 dark:text-red-400 text-xs">
              <i class="fas fa-times mr-2"></i>
              {{ $t('admin.changePassword.errors.passwordMismatch') }}
            </div>
            <div v-else-if="passwordForm.confirmPassword && passwordsMatch" class="mt-2 flex items-center text-green-600 dark:text-green-400 text-xs">
              <i class="fas fa-check mr-2"></i>
              {{ $t('admin.changePassword.success.passwordMatch') }}
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="passwordError" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
            <div class="flex items-center">
              <i class="fas fa-exclamation-triangle text-red-500 mr-2"></i>
              <p class="text-sm text-red-700 dark:text-red-400">{{ passwordError }}</p>
            </div>
          </div>

          <!-- Success Message -->
          <div v-if="successMessage" class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
            <div class="flex items-center">
              <i class="fas fa-check-circle text-green-500 mr-2"></i>
              <p class="text-sm text-green-700 dark:text-green-400">{{ successMessage }}</p>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex space-x-4">
            <button
              type="button"
              @click="goBack"
              :disabled="isLoading"
              class="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center"
            >
              <i class="fas fa-arrow-left mr-2"></i>
              {{ $t('admin.changePassword.form.cancel') }}
            </button>
            
            <button
              type="submit"
              :disabled="isLoading || !canSubmit"
              class="flex-1 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center"
            >
              <i v-if="isLoading" class="fas fa-spinner fa-spin mr-2"></i>
              <i v-else class="fas fa-save mr-2"></i>
              {{ isLoading ? $t('admin.changePassword.form.updating') : $t('admin.changePassword.form.submit') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const route = useRoute()
const { locale, t } = useI18n()

// Reactive state
const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const isLoading = ref(false)
const passwordError = ref('')
const successMessage = ref('')
const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)

const currentLocale = computed(() => locale.value)
const isFirstTimeChange = computed(() => route.query.firstTime === 'true')

// Password validation
const passwordRequirements = computed(() => [
  {
    key: 'minLength',
    met: passwordForm.value.newPassword.length >= 8
  },
  {
    key: 'hasUppercase',
    met: /[A-Z]/.test(passwordForm.value.newPassword)
  },
  {
    key: 'hasLowercase',
    met: /[a-z]/.test(passwordForm.value.newPassword)
  },
  {
    key: 'hasNumber',
    met: /\d/.test(passwordForm.value.newPassword)
  },
  {
    key: 'hasSpecialChar',
    met: /[!@#$%^&*(),.?":{}|<>]/.test(passwordForm.value.newPassword)
  }
])

const passwordStrength = computed(() => {
  const metRequirements = passwordRequirements.value.filter(req => req.met).length
  const percentage = (metRequirements / passwordRequirements.value.length) * 100

  if (percentage < 40) {
    return {
      label: t('admin.changePassword.strength.weak'),
      color: 'bg-red-500',
      textColor: 'text-red-600 dark:text-red-400',
      percentage
    }
  } else if (percentage < 80) {
    return {
      label: t('admin.changePassword.strength.medium'),
      color: 'bg-yellow-500',
      textColor: 'text-yellow-600 dark:text-yellow-400',
      percentage
    }
  } else {
    return {
      label: t('admin.changePassword.strength.strong'),
      color: 'bg-green-500',
      textColor: 'text-green-600 dark:text-green-400',
      percentage
    }
  }
})

const passwordsMatch = computed(() => {
  return passwordForm.value.newPassword === passwordForm.value.confirmPassword
})

const canSubmit = computed(() => {
  return passwordForm.value.currentPassword &&
         passwordForm.value.newPassword &&
         passwordForm.value.confirmPassword &&
         passwordsMatch.value &&
         passwordRequirements.value.every(req => req.met)
})

// Methods
const toggleLanguage = () => {
  const newLocale = locale.value === 'fr' ? 'en' : 'fr'
  locale.value = newLocale
  localStorage.setItem('userLocale', newLocale)
}

const checkPasswordStrength = () => {
  // Cette méthode est appelée lors de la saisie pour mettre à jour l'indicateur de force
  // La logique est déjà dans les computed properties
}

const handleChangePassword = async () => {
  isLoading.value = true
  passwordError.value = ''
  successMessage.value = ''

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Vérification du mot de passe actuel (à remplacer par votre logique)
    if (passwordForm.value.currentPassword !== 'admin123') {
      passwordError.value = t('admin.changePassword.errors.invalidCurrentPassword')
      return
    }

    // Vérification que le nouveau mot de passe est différent
    if (passwordForm.value.newPassword === passwordForm.value.currentPassword) {
      passwordError.value = t('admin.changePassword.errors.samePassword')
      return
    }

    // Succès
    successMessage.value = t('admin.changePassword.success.passwordChanged')
    
    // Redirection après 2 secondes
    setTimeout(() => {
      router.push('/admin/dashboard')
    }, 2000)

  } catch (error) {
    passwordError.value = t('admin.changePassword.errors.serverError')
  } finally {
    isLoading.value = false
  }
}

const goBack = () => {
  if (isFirstTimeChange.value) {
    router.push('/admin/login')
  } else {
    router.go(-1)
  }
}
</script>