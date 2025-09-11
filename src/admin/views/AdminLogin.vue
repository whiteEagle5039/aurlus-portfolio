<template>
  <div class="min-h-screen bg-gradient-to-br from-green-100 to-white-700 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4 relative">

    <!-- Language Toggle -->
    <div class="absolute top-4 right-4">
    <button 
        @click="toggleLanguage" 
        class="inline-flex items-center px-3 py-2 dark:bg-gray-700  transition-all duration-200"
        :aria-label="$t('admin.login.toggleLanguage')"
    >
        <i class="fas fa-language text-gray-600 dark:text-gray-300 mr-2"></i>
        <span class="text-gray-700 dark:text-gray-300 font-medium">{{ currentLocale.toUpperCase() }}</span>
    </button>
    </div>


    <div class="max-w-md w-full">
      <!-- Header -->
      <div class="text-center mb-8">
        <div class="inline-flex text-white items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-4 fas fa-shield-alt text-white text-2xl">
          A
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">{{ $t('admin.login.title') }}</h1>
        <p class="text-gray-600 dark:text-gray-400 mt-2">{{ $t('admin.login.subtitle') }}</p>
      </div>

      
      <!-- Login Form -->
      <div class="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Username Field -->
          <div>
            <label for="username" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {{ $t('admin.login.form.username.label') }}
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-user text-gray-400"></i>
              </div>
              <input
                id="username"
                v-model="loginForm.username"
                type="text"
                required
                :class="[
                  'w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200',
                  loginError ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600',
                  'bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400'
                ]"
                :placeholder="$t('admin.login.form.username.placeholder')"
              />
            </div>
          </div>

          <!-- Password Field -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {{ $t('admin.login.form.password.label') }}
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i class="fas fa-lock text-gray-400"></i>
              </div>
              <input
                id="password"
                v-model="loginForm.password"
                :type="showPassword ? 'text' : 'password'"
                required
                :class="[
                  'w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200',
                  loginError ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600',
                  'bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400'
                ]"
                :placeholder="$t('admin.login.form.password.placeholder')"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'" class="text-gray-400 hover:text-gray-600"></i>
              </button>
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="loginError" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
            <div class="flex items-center">
              <i class="fas fa-exclamation-triangle text-red-500 mr-2"></i>
              <p class="text-sm text-red-700 dark:text-red-400">{{ loginError }}</p>
            </div>
          </div>

          <!-- Remember Me -->
          <div class="flex items-center justify-between">
            <label class="flex items-center">
              <input
                v-model="loginForm.remember"
                type="checkbox"
                class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">{{ $t('admin.login.form.remember') }}</span>
            </label>
            
            <button
              type="button"
              @click="showForgotPassword = true"
              class="text-sm text-green-600 dark:text-green-400 hover:text-green-500 transition-colors duration-200"
            >
              {{ $t('admin.login.form.forgotPassword') }}
            </button>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center"
          >
            <i v-if="isLoading" class="fas fa-spinner fa-spin mr-2"></i>
            <i v-else class="fas fa-sign-in-alt mr-2"></i>
            {{ isLoading ? $t('admin.login.form.loggingIn') : $t('admin.login.form.submit') }}
          </button>
        </form>

        <!-- First Login Notice -->
        <!-- <div v-if="showFirstLoginNotice" class="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div class="flex items-start">
            <i class="fas fa-info-circle text-blue-500 mt-1 mr-3"></i>
            <div>
              <h4 class="text-sm font-medium text-blue-800 dark:text-blue-300 mb-1">
                {{ $t('admin.login.firstLogin.title') }}
              </h4>
              <p class="text-sm text-blue-700 dark:text-blue-400">
                {{ $t('admin.login.firstLogin.message') }}
              </p>
            </div>
          </div>
        </div> -->
      </div>

      <!-- Footer -->
      <div class="text-center mt-8">
        <button
          @click="goToPortfolio"
          class="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400 transition-colors duration-200"
        >
          <i class="fas fa-arrow-left mr-2"></i>
          {{ $t('admin.login.backToPortfolio') }}
        </button>
      </div>
    </div>

    <!-- Forgot Password Modal -->
    <div v-if="showForgotPassword" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4 z-50">
      <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full">
        <div class="text-center mb-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            {{ $t('admin.login.forgotModal.title') }}
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">
            {{ $t('admin.login.forgotModal.message') }}
          </p>
        </div>
        
        <div class="flex space-x-3">
          <button
            @click="showForgotPassword = false"
            class="flex-1 px-4 py-2 text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            {{ $t('admin.login.forgotModal.cancel') }}
          </button>
          <button
            @click="handleForgotPassword"
            class="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-200"
          >
            {{ $t('admin.login.forgotModal.confirm') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { API_BASE_URL, API_ENDPOINT } from '@/config/global'

const router = useRouter()
const { locale, t } = useI18n()

// Reactive state
const loginForm = ref({
  username: '',
  password: '',
  remember: false
})

const isLoading = ref(false)
const loginError = ref('')
const showPassword = ref(false)
const showForgotPassword = ref(false)
const showFirstLoginNotice = ref(true)

const currentLocale = computed(() => locale.value)

// Methods
const toggleLanguage = () => {
  const newLocale = locale.value === 'fr' ? 'en' : 'fr'
  locale.value = newLocale
  localStorage.setItem('userLocale', newLocale)
}

const handleLogin = async () => {
  isLoading.value = true
  loginError.value = ''

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINT.login}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email: loginForm.value.username,
        password: loginForm.value.password
      })
    });
    const data = await response.json(); 

    if (response.ok) {
      // Successful login
      localStorage.setItem('adminToken', data.token)
      router.push('/admin/dashboard')
    }
    else{
      loginError.value = t('admin.login.errors.invalidCredentials')
      // return
    }
    // Default credentials check (à remplacer par votre logique d'authentification)
    // if (loginForm.value.username === 'admin' && loginForm.value.password === 'admin123') {
    //   // Check if it's first login with default password
    //   if (loginForm.value.password === 'admin123') {
    //     router.push('/admin/change-password')
    //     return
    //   }
      
    //   // Successful login
    //   localStorage.setItem('adminToken', 'mock-token')
    //   router.push('/admin/dashboard')
    // } else {
    //   loginError.value = t('admin.login.errors.invalidCredentials')
    // }
  } catch (error) {
    loginError.value = t('admin.login.errors.serverError')
  } finally {
    isLoading.value = false
  }
}

const handleForgotPassword = () => {
  showForgotPassword.value = false
  // Rediriger vers la page de changement de mot de passe ou envoyer un email
  router.push('/admin/change-password')
}

const goToPortfolio = () => {
  router.push('/')
}
</script>