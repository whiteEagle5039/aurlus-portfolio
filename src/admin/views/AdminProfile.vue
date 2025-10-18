<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h3 class="text-lg font-medium text-gray-900">{{ $t('admin.pages.profile.title') }}</h3>
        <p class="text-sm text-gray-600">{{ $t('admin.pages.profile.subtitle') }}</p>
      </div>
      <div class="flex items-center space-x-2">
        <span :class="[
          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
          profileExists 
            ? 'bg-green-100 text-green-800' 
            : 'bg-yellow-100 text-yellow-800'
        ]">
          <i :class="profileExists ? 'fas fa-check-circle' : 'fas fa-exclamation-triangle'" class="mr-1"></i>
          {{ profileExists ? $t('admin.pages.profile.complete') : $t('admin.pages.profile.incomplete') }}
        </span>
      </div>
    </div>
    
    <!-- Indicateur de chargement -->
    <div v-if="loading" class="flex justify-center items-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
      <span class="ml-2 text-gray-600">{{ $t('common.loading') }}</span>
    </div>
    
    <!-- Formulaire de profil -->
    <div v-else class="bg-white rounded-lg shadow">
      <form @submit.prevent="saveProfile" class="p-6 space-y-8">
        
        <!-- Section Album Photos -->
        <div class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6">
          <h4 class="text-lg font-medium text-gray-800 mb-6 flex items-center">
            <i class="fas fa-images mr-2 text-teal-500"></i>
            {{ $t('admin.pages.profile.photoAlbum') }}
          </h4>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <!-- Carte Photo de Couverture -->
            <div 
              @click="openPhotoModal('cover')"
              class="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group"
            >
              <div class="relative h-48 bg-gradient-to-br from-blue-400 to-purple-500 overflow-hidden">
                <img 
                  v-if="coverPreview || form.cover_photo" 
                  :src="coverPreview || form.cover_photo" 
                  alt="Cover photo"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                >
                <div v-else class="absolute inset-0 flex flex-col items-center justify-center text-white">
                  <i class="fas fa-image text-5xl mb-2 opacity-50"></i>
                  <p class="text-sm font-medium opacity-75">{{ $t('admin.pages.profile.noCoverPhoto') }}</p>
                </div>
                
                <!-- Badge indicateur -->
                <div class="absolute top-3 left-3">
                  <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm text-gray-800 shadow-sm">
                    <i class="fas fa-panorama mr-1.5"></i>
                    {{ $t('admin.pages.profile.coverPhoto') }}
                  </span>
                </div>
                
                <!-- Overlay hover -->
                <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div class="text-white text-center">
                    <i class="fas fa-edit text-2xl mb-2"></i>
                    <p class="text-sm font-medium">{{ $t('admin.pages.profile.clickToEdit') }}</p>
                  </div>
                </div>
              </div>
              
              <div class="p-4">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm font-medium text-gray-700">{{ $t('admin.pages.profile.coverPhotoTitle') }}</p>
                    <p class="text-xs text-gray-500 mt-0.5">{{ $t('admin.pages.profile.recommendedSize') }}: 1920x400px</p>
                  </div>
                  <div class="flex items-center space-x-2">
                    <span v-if="form.cover_photo" class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600">
                      <i class="fas fa-check text-sm"></i>
                    </span>
                    <span v-else class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-400">
                      <i class="fas fa-plus text-sm"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Carte Photo de Profil -->
            <div 
              @click="openPhotoModal('profile')"
              class="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group"
            >
              <div class="relative h-48 bg-gradient-to-br from-teal-400 to-cyan-500 overflow-hidden flex items-center justify-center">
                <div class="w-32 h-32 rounded-full overflow-hidden bg-white shadow-lg ring-4 ring-white/50">
                  <img 
                    v-if="photoPreview || form.profile_photo" 
                    :src="photoPreview || form.profile_photo" 
                    alt="Profile photo"
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  >
                  <div v-else class="w-full h-full flex items-center justify-center bg-gray-100">
                    <i class="fas fa-user text-gray-400 text-4xl"></i>
                  </div>
                </div>
                
                <!-- Badge indicateur -->
                <div class="absolute top-3 left-3">
                  <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm text-gray-800 shadow-sm">
                    <i class="fas fa-user-circle mr-1.5"></i>
                    {{ $t('admin.pages.profile.profilePhoto') }}
                  </span>
                </div>
                
                <!-- Overlay hover -->
                <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div class="text-white text-center">
                    <i class="fas fa-edit text-2xl mb-2"></i>
                    <p class="text-sm font-medium">{{ $t('admin.pages.profile.clickToEdit') }}</p>
                  </div>
                </div>
              </div>
              
              <div class="p-4">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm font-medium text-gray-700">{{ $t('admin.pages.profile.profilePhotoTitle') }}</p>
                    <p class="text-xs text-gray-500 mt-0.5">{{ $t('admin.pages.profile.recommendedSize') }}: 400x400px</p>
                  </div>
                  <div class="flex items-center space-x-2">
                    <span v-if="form.profile_photo" class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600">
                      <i class="fas fa-check text-sm"></i>
                    </span>
                    <span v-else class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-400">
                      <i class="fas fa-plus text-sm"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>

        <!-- Onglets de langues -->
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

        <!-- Informations personnelles (communes) -->
        <div class="bg-gray-50 rounded-lg p-6">
          <h4 class="text-lg font-medium text-gray-800 mb-6 flex items-center">
            <i class="fas fa-user mr-2 text-teal-500"></i>
            {{ $t('admin.pages.profile.personalInfo') }}
          </h4>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                {{ $t('admin.pages.profile.form.firstName') }} *
              </label>
              <input
                v-model="form.first_name"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                :placeholder="$t('admin.pages.profile.form.firstNamePlaceholder')"
              >
              <p v-if="errors.first_name" class="text-red-500 text-xs mt-1">{{ errors.first_name[0] }}</p>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                {{ $t('admin.pages.profile.form.lastName') }} *
              </label>
              <input
                v-model="form.last_name"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                :placeholder="$t('admin.pages.profile.form.lastNamePlaceholder')"
              >
              <p v-if="errors.last_name" class="text-red-500 text-xs mt-1">{{ errors.last_name[0] }}</p>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                {{ $t('admin.pages.profile.form.email') }} *
              </label>
              <input
                v-model="form.email"
                type="email"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                :placeholder="$t('admin.pages.profile.form.emailPlaceholder')"
              >
              <p v-if="errors.email" class="text-red-500 text-xs mt-1">{{ errors.email[0] }}</p>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                {{ $t('admin.pages.profile.form.phone') }}
              </label>
              <input
                v-model="form.phone"
                type="tel"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                :placeholder="$t('admin.pages.profile.form.phonePlaceholder')"
              >
              <p v-if="errors.phone" class="text-red-500 text-xs mt-1">{{ errors.phone[0] }}</p>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                {{ $t('admin.pages.profile.form.address') }}
              </label>
              <input
                v-model="form.address"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                :placeholder="$t('admin.pages.profile.form.addressPlaceholder')"
              >
              <p v-if="errors.address" class="text-red-500 text-xs mt-1">{{ errors.address[0] }}</p>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                {{ $t('admin.pages.profile.form.birthdate') }}
              </label>
              <input
                v-model="form.birthdate"
                type="date"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
              <p v-if="errors.birthdate" class="text-red-500 text-xs mt-1">{{ errors.birthdate[0] }}</p>
            </div>
          </div>
        </div>

        <!-- Contenu en français -->
        <div v-show="activeTab === 'fr'" class="space-y-6">
          <h4 class="text-lg font-medium text-gray-800 flex items-center">
            <i class="fas fa-flag mr-2 text-blue-500"></i>
            {{ $t('admin.pages.profile.frenchContent') }}
          </h4>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                {{ $t('admin.pages.profile.form.jobTitleFr') }} *
              </label>
              <input
                v-model="form.job_title_fr"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                :placeholder="$t('admin.pages.profile.form.jobTitlePlaceholder')"
              >
              <p v-if="errors.job_title_fr" class="text-red-500 text-xs mt-1">{{ errors.job_title_fr[0] }}</p>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                {{ $t('admin.pages.profile.form.taglineFr') }}
              </label>
              <input
                v-model="form.tagline_fr"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                :placeholder="$t('admin.pages.profile.form.taglinePlaceholder')"
              >
              <p v-if="errors.tagline_fr" class="text-red-500 text-xs mt-1">{{ errors.tagline_fr[0] }}</p>
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              {{ $t('admin.pages.profile.form.bioFr') }} *
            </label>
            <textarea
              v-model="form.bio_fr"
              rows="6"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              :placeholder="$t('admin.pages.profile.form.bioPlaceholder')"
            ></textarea>
            <p v-if="errors.bio_fr" class="text-red-500 text-xs mt-1">{{ errors.bio_fr[0] }}</p>
          </div>
        </div>

        <!-- Contenu en anglais -->
        <div v-show="activeTab === 'en'" class="space-y-6">
          <h4 class="text-lg font-medium text-gray-800 flex items-center">
            <i class="fas fa-flag mr-2 text-red-500"></i>
            {{ $t('admin.pages.profile.englishContent') }}
          </h4>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                {{ $t('admin.pages.profile.form.jobTitleEn') }} *
              </label>
              <input
                v-model="form.job_title_en"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                :placeholder="$t('admin.pages.profile.form.jobTitlePlaceholder')"
              >
              <p v-if="errors.job_title_en" class="text-red-500 text-xs mt-1">{{ errors.job_title_en[0] }}</p>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                {{ $t('admin.pages.profile.form.taglineEn') }}
              </label>
              <input
                v-model="form.tagline_en"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                :placeholder="$t('admin.pages.profile.form.taglinePlaceholder')"
              >
              <p v-if="errors.tagline_en" class="text-red-500 text-xs mt-1">{{ errors.tagline_en[0] }}</p>
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              {{ $t('admin.pages.profile.form.bioEn') }} *
            </label>
            <textarea
              v-model="form.bio_en"
              rows="6"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              :placeholder="$t('admin.pages.profile.form.bioPlaceholder')"
            ></textarea>
            <p v-if="errors.bio_en" class="text-red-500 text-xs mt-1">{{ errors.bio_en[0] }}</p>
          </div>
        </div>

        <!-- Réseaux sociaux -->
        <div class="bg-gray-50 rounded-lg p-6">
          <h4 class="text-lg font-medium text-gray-800 mb-6 flex items-center">
            <i class="fas fa-share-alt mr-2 text-teal-500"></i>
            {{ $t('admin.pages.profile.socialLinks') }}
          </h4>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                <i class="fab fa-linkedin text-blue-600 mr-1"></i>
                LinkedIn
              </label>
              <input
                v-model="form.linkedin_url"
                type="url"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="https://linkedin.com/in/votre-profil"
              >
              <p v-if="errors.linkedin_url" class="text-red-500 text-xs mt-1">{{ errors.linkedin_url[0] }}</p>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                <i class="fab fa-github text-gray-800 mr-1"></i>
                GitHub
              </label>
              <input
                v-model="form.github_url"
                type="url"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="https://github.com/votre-profil"
              >
              <p v-if="errors.github_url" class="text-red-500 text-xs mt-1">{{ errors.github_url[0] }}</p>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                <i class="fab fa-twitter text-blue-400 mr-1"></i>
                Twitter/X
              </label>
              <input
                v-model="form.twitter_url"
                type="url"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="https://twitter.com/votre-profil"
              >
              <p v-if="errors.twitter_url" class="text-red-500 text-xs mt-1">{{ errors.twitter_url[0] }}</p>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                <i class="fas fa-globe text-gray-600 mr-1"></i>
                {{ $t('admin.pages.profile.form.website') }}
              </label>
              <input
                v-model="form.website_url"
                type="url"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="https://votre-site-web.com"
              >
              <p v-if="errors.website_url" class="text-red-500 text-xs mt-1">{{ errors.website_url[0] }}</p>
            </div>
          </div>
        </div>

        <!-- Paramètres de visibilité -->
        <div class="bg-gray-50 rounded-lg p-6">
          <h4 class="text-lg font-medium text-gray-800 mb-6 flex items-center">
            <i class="fas fa-eye mr-2 text-teal-500"></i>
            {{ $t('admin.pages.profile.visibility') }}
          </h4>
          
          <div class="space-y-4">
            <label class="flex items-center">
              <input
                v-model="form.is_active"
                type="checkbox"
                class="rounded border-gray-300 text-teal-600 shadow-sm focus:border-teal-300 focus:ring focus:ring-teal-200 focus:ring-opacity-50"
              >
              <span class="ml-2 text-sm text-gray-700">
                {{ $t('admin.pages.profile.form.isActive') }}
              </span>
            </label>
            
            <label class="flex items-center">
              <input
                v-model="form.show_email"
                type="checkbox"
                class="rounded border-gray-300 text-teal-600 shadow-sm focus:border-teal-300 focus:ring focus:ring-teal-200 focus:ring-opacity-50"
              >
              <span class="ml-2 text-sm text-gray-700">
                {{ $t('admin.pages.profile.form.showEmail') }}
              </span>
            </label>
            
            <label class="flex items-center">
              <input
                v-model="form.show_phone"
                type="checkbox"
                class="rounded border-gray-300 text-teal-600 shadow-sm focus:border-teal-300 focus:ring focus:ring-teal-200 focus:ring-opacity-50"
              >
              <span class="ml-2 text-sm text-gray-700">
                {{ $t('admin.pages.profile.form.showPhone') }}
              </span>
            </label>
            
            <label class="flex items-center">
              <input
                v-model="form.show_address"
                type="checkbox"
                class="rounded border-gray-300 text-teal-600 shadow-sm focus:border-teal-300 focus:ring focus:ring-teal-200 focus:ring-opacity-50"
              >
              <span class="ml-2 text-sm text-gray-700">
                {{ $t('admin.pages.profile.form.showAddress') }}
              </span>
            </label>
            
            <label class="flex items-center">
              <input
                v-model="form.show_age"
                type="checkbox"
                class="rounded border-gray-300 text-teal-600 shadow-sm focus:border-teal-300 focus:ring focus:ring-teal-200 focus:ring-opacity-50"
              >
              <span class="ml-2 text-sm text-gray-700">
                {{ $t('admin.pages.profile.form.showAge') }}
              </span>
            </label>
          </div>
        </div>
        
        <!-- Boutons d'action -->
        <div class="flex justify-end space-x-3 pt-6 border-t border-gray-200">
          <button
            type="button"
            @click="resetForm"
            class="px-6 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
          >
            {{ $t('common.reset') }}
          </button>
          <button
            type="submit"
            :disabled="saving"
            class="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors disabled:opacity-50 flex items-center"
          >
            <i v-if="saving" class="fas fa-spinner fa-spin mr-2"></i>
            {{ saving ? $t('common.saving') : $t('common.save') }}
          </button>
        </div>
      </form>
    </div>

    <!-- Modal de gestion des photos -->
    <Teleport to="body">
      <Transition name="modal">
        <div 
          v-if="showPhotoModal" 
          class="fixed inset-0 z-50 overflow-y-auto"
          @click.self="closePhotoModal"
        >
          <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <!-- Overlay -->
            <div class="fixed inset-0 transition-opacity bg-gray-900 bg-opacity-75" @click="closePhotoModal"></div>
            
            <!-- Modal -->
            <div class="inline-block w-full max-w-2xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-2xl rounded-2xl">
              <!-- Header -->
              <div class="bg-gradient-to-r from-teal-500 to-cyan-600 px-6 py-4">
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <i :class="currentPhotoType === 'cover' ? 'fas fa-panorama' : 'fas fa-user-circle'" class="text-white text-lg"></i>
                    </div>
                    <div>
                      <h3 class="text-lg font-semibold text-white">
                        {{ currentPhotoType === 'cover' ? $t('admin.pages.profile.manageCoverPhoto') : $t('admin.pages.profile.manageProfilePhoto') }}
                      </h3>
                      <p class="text-xs text-white/80">
                        {{ currentPhotoType === 'cover' 
                          ? $t('admin.pages.profile.coverPhotoDescription') 
                          : $t('admin.pages.profile.profilePhotoDescription') 
                        }}
                      </p>
                    </div>
                  </div>
                  <button
                    @click="closePhotoModal"
                    class="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                  >
                    <i class="fas fa-times text-xl"></i>
                  </button>
                </div>
              </div>
              
              <!-- Body -->
              <div class="p-6 space-y-6">
                <!-- Prévisualisation actuelle -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-3">
                    {{ $t('admin.pages.profile.currentPhoto') }}
                  </label>
                  <div :class="[
                    'rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center',
                    currentPhotoType === 'cover' ? 'h-48' : 'h-64'
                  ]">
                    <template v-if="currentPhotoType === 'cover'">
                      <img 
                        v-if="coverPreview || form.cover_photo" 
                        :src="coverPreview || form.cover_photo" 
                        alt="Cover preview"
                        class="w-full h-full object-cover"
                      >
                      <div v-else class="text-center text-gray-400">
                        <i class="fas fa-image text-6xl mb-3"></i>
                        <p class="text-sm">{{ $t('admin.pages.profile.noPhotoYet') }}</p>
                      </div>
                    </template>
                    <template v-else>
                      <div class="w-48 h-48 rounded-full overflow-hidden bg-white shadow-lg">
                        <img 
                          v-if="photoPreview || form.profile_photo" 
                          :src="photoPreview || form.profile_photo" 
                          alt="Profile preview"
                          class="w-full h-full object-cover"
                        >
                        <div v-else class="w-full h-full flex items-center justify-center bg-gray-100">
                          <i class="fas fa-user text-gray-400 text-6xl"></i>
                        </div>
                      </div>
                    </template>
                  </div>
                </div>
                
                <!-- Zone d'upload -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-3">
                    {{ $t('admin.pages.profile.uploadNewPhoto') }}
                  </label>
                  
                  <!-- Input caché HORS de la div cliquable -->
                  <input
                    v-if="currentPhotoType === 'cover'"
                    ref="coverInputModal"
                    type="file"
                    accept="image/jpeg,image/png,image/jpg,image/gif,image/webp"
                    @change="handleCoverChange($event)"
                    class="hidden"
                  >
                  <input
                    v-else
                    ref="photoInputModal"
                    type="file"
                    accept="image/jpeg,image/png,image/jpg,image/gif,image/webp"
                    @change="handlePhotoChange($event)"
                    class="hidden"
                  >
                  
                  <div 
                    class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-teal-500 transition-colors cursor-pointer bg-gray-50"
                    @click="triggerModalFileInput"
                  >
                    <i class="fas fa-cloud-upload-alt text-5xl text-gray-400 mb-4"></i>
                    
                    <p class="text-base text-gray-600 mb-2 font-medium">
                      {{ $t('admin.pages.profile.dragDropOrClick') }}
                    </p>
                    
                    <p class="text-sm text-gray-500 mb-4">
                      {{ $t('admin.pages.profile.photoFormats') }} • Max 2MB
                    </p>
                    
                    <button
                      type="button"
                      @click.stop="triggerModalFileInput"
                      class="px-6 py-2.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium inline-flex items-center"
                    >
                      <i class="fas fa-folder-open mr-2"></i>
                      {{ $t('admin.pages.profile.selectFile') }}
                    </button>
                    
                    <!-- Nom du fichier sélectionné -->
                    <p v-if="currentPhotoType === 'cover' && selectedCoverFileName" class="text-sm text-teal-600 mt-4 font-medium">
                      <i class="fas fa-file-image mr-1"></i>
                      {{ selectedCoverFileName }}
                    </p>
                    <p v-if="currentPhotoType === 'profile' && selectedFileName" class="text-sm text-teal-600 mt-4 font-medium">
                      <i class="fas fa-file-image mr-1"></i>
                      {{ selectedFileName }}
                    </p>
                  </div>
                  
                  <!-- Message d'erreur -->
                  <p v-if="currentPhotoType === 'cover' && errors.cover_photo" class="text-red-500 text-sm mt-2">
                    <i class="fas fa-exclamation-circle mr-1"></i>
                    {{ errors.cover_photo[0] }}
                  </p>
                  <p v-if="currentPhotoType === 'profile' && errors.profile_photo" class="text-red-500 text-sm mt-2">
                    <i class="fas fa-exclamation-circle mr-1"></i>
                    {{ errors.profile_photo[0] }}
                  </p>
                </div>
                
                <!-- Informations -->
                <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div class="flex items-start">
                    <i class="fas fa-info-circle text-blue-500 mt-0.5 mr-3"></i>
                    <div class="text-sm text-blue-800">
                      <p class="font-medium mb-1">{{ $t('admin.pages.profile.recommendations') }}</p>
                      <ul class="list-disc list-inside space-y-1 text-blue-700">
                        <li v-if="currentPhotoType === 'cover'">
                          {{ $t('admin.pages.profile.coverPhotoTips1') }}
                        </li>
                        <li v-else>
                          {{ $t('admin.pages.profile.profilePhotoTips1') }}
                        </li>
                        <li>{{ $t('admin.pages.profile.photoTips2') }}</li>
                        <li>{{ $t('admin.pages.profile.photoTips3') }}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Footer -->
              <div class="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-200">
                <div>
                  <!-- Bouton supprimer (si photo existe) -->
                  <button
                    v-if="(currentPhotoType === 'cover' && form.cover_photo) || (currentPhotoType === 'profile' && form.profile_photo)"
                    type="button"
                    @click="deleteCurrentPhoto"
                    :disabled="deletingPhoto || deletingCover"
                    class="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium inline-flex items-center disabled:opacity-50"
                  >
                    <i v-if="deletingPhoto || deletingCover" class="fas fa-spinner fa-spin mr-2"></i>
                    <i v-else class="fas fa-trash mr-2"></i>
                    {{ $t('admin.pages.profile.deletePhoto') }}
                  </button>
                </div>
                <div class="flex space-x-3">
                  <button
                    type="button"
                    @click="cancelPhotoSelection"
                    class="px-5 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                  >
                    {{ $t('common.cancel') }}
                  </button>
                  <button
                    type="button"
                    @click="closePhotoModal"
                    class="px-5 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium inline-flex items-center"
                  >
                    <i class="fas fa-check mr-2"></i>
                    {{ $t('common.done') }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

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

const { t } = useI18n()

interface ProfileData {
  id?: number
  first_name: string
  last_name: string
  email: string
  phone?: string
  address?: string
  birthdate?: string
  job_title_fr: string
  job_title_en: string
  tagline_fr?: string
  tagline_en?: string
  bio_fr: string
  bio_en: string
  profile_photo?: string
  cover_photo?: string
  linkedin_url?: string
  github_url?: string
  twitter_url?: string
  website_url?: string
  is_active: boolean
  show_email: boolean
  show_phone: boolean
  show_address: boolean
  show_age: boolean
}

const loading = ref(false)
const saving = ref(false)
const deletingPhoto = ref(false)
const deletingCover = ref(false)
const activeTab = ref<'fr' | 'en'>('fr')
const profileExists = ref(false)

// Modal
const showPhotoModal = ref(false)
const currentPhotoType = ref<'profile' | 'cover'>('profile')

// Refs pour la photo de profil
const photoInput = ref<HTMLInputElement | null>(null)
const photoPreview = ref<string | null>(null)
const selectedFile = ref<File | null>(null)
const selectedFileName = ref<string>('')

// Refs pour la photo de couverture
const coverInput = ref<HTMLInputElement | null>(null)
const coverPreview = ref<string | null>(null)
const selectedCoverFile = ref<File | null>(null)
const selectedCoverFileName = ref<string>('')

// Refs pour les inputs du modal
const photoInputModal = ref<HTMLInputElement | null>(null)
const coverInputModal = ref<HTMLInputElement | null>(null)

const form = ref<ProfileData>({
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  address: '',
  birthdate: '',
  job_title_fr: '',
  job_title_en: '',
  tagline_fr: '',
  tagline_en: '',
  bio_fr: '',
  bio_en: '',
  profile_photo: '',
  cover_photo: '',
  linkedin_url: '',
  github_url: '',
  twitter_url: '',
  website_url: '',
  is_active: true,
  show_email: true,
  show_phone: false,
  show_address: false,
  show_age: false
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
  'Accept': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem(TOKEN_STORAGE_KEY)}`
}))

const formatDateForInput = (dateString: any) => {
  if (!dateString) return ''
  return dateString.split('T')[0]
}

const formatDateForApi = (dateString: any) => {
  if (!dateString) return null
  return dateString
}

// Fonctions Modal
const openPhotoModal = (type: 'profile' | 'cover') => {
  currentPhotoType.value = type
  showPhotoModal.value = true
}

const closePhotoModal = () => {
  showPhotoModal.value = false
}

const triggerModalFileInput = () => {
  if (currentPhotoType.value === 'cover') {
    coverInputModal.value?.click()
  } else {
    photoInputModal.value?.click()
  }
}

// Fonctions pour la photo de profil
const handlePhotoChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  
  if (file) {
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp']
    if (!validTypes.includes(file.type)) {
      showNotification('error', t('admin.pages.profile.errors.invalidFileType'))
      return
    }
    
    if (file.size > 2048 * 1024) {
      showNotification('error', t('admin.pages.profile.errors.fileTooLarge'))
      return
    }
    
    selectedFile.value = file
    selectedFileName.value = file.name
    
    const reader = new FileReader()
    reader.onload = (e) => {
      photoPreview.value = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

const deletePhoto = async () => {
  if (!form.value.id || !confirm(t('admin.pages.profile.confirmDeletePhoto'))) {
    return
  }
  
  deletingPhoto.value = true
  
  try {
    const response = await fetch(
      `${API_BASE_URL}${API_ENDPOINT.profile}/${form.value.id}/profile-photo`,
      {
        method: 'DELETE',
        headers: apiHeaders.value
      }
    )
    
    const result = await response.json()
    
    if (response.ok) {
      form.value.profile_photo = ''
      photoPreview.value = null
      showNotification('success', result.message || t('admin.pages.profile.photoDeleted'))
      closePhotoModal()
    } else {
      throw new Error(result.message || 'Erreur lors de la suppression')
    }
  } catch (error) {
    console.error('Erreur:', error)
    showNotification('error', t('admin.pages.profile.errors.deletePhotoFailed'))
  } finally {
    deletingPhoto.value = false
  }
}

// Fonctions pour la photo de couverture
const handleCoverChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  
  if (file) {
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp']
    if (!validTypes.includes(file.type)) {
      showNotification('error', t('admin.pages.profile.errors.invalidFileType'))
      return
    }
    
    if (file.size > 2048 * 1024) {
      showNotification('error', t('admin.pages.profile.errors.fileTooLarge'))
      return
    }
    
    selectedCoverFile.value = file
    selectedCoverFileName.value = file.name
    
    const reader = new FileReader()
    reader.onload = (e) => {
      coverPreview.value = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

const deleteCoverPhoto = async () => {
  if (!form.value.id || !confirm(t('admin.pages.profile.confirmDeleteCoverPhoto'))) {
    return
  }
  
  deletingCover.value = true
  
  try {
    const response = await fetch(
      `${API_BASE_URL}${API_ENDPOINT.profile}/${form.value.id}/cover-photo`,
      {
        method: 'DELETE',
        headers: apiHeaders.value
      }
    )
    
    const result = await response.json()
    
    if (response.ok) {
      form.value.cover_photo = ''
      coverPreview.value = null
      showNotification('success', result.message || t('admin.pages.profile.coverPhotoDeleted'))
      closePhotoModal()
    } else {
      throw new Error(result.message || 'Erreur lors de la suppression')
    }
  } catch (error) {
    console.error('Erreur:', error)
    showNotification('error', t('admin.pages.profile.errors.deleteCoverPhotoFailed'))
  } finally {
    deletingCover.value = false
  }
}

const deleteCurrentPhoto = () => {
  if (currentPhotoType.value === 'cover') {
    deleteCoverPhoto()
  } else {
    deletePhoto()
  }
}

const cancelPhotoSelection = () => {
  if (currentPhotoType.value === 'cover') {
    selectedCoverFile.value = null
    selectedCoverFileName.value = ''
    coverPreview.value = null
    if (coverInput.value) {
      coverInput.value.value = ''
    }
  } else {
    selectedFile.value = null
    selectedFileName.value = ''
    photoPreview.value = null
    if (photoInput.value) {
      photoInput.value.value = ''
    }
  }
  closePhotoModal()
}

const loadProfile = async () => {
  loading.value = true
  try {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINT.profile}`, {
      method: 'GET',
      headers: apiHeaders.value
    })
    const result = await response.json()

    if (response.ok && result.data) {
      profileExists.value = true
      const profileData = { ...result.data }
      if (profileData.birthdate) {
        profileData.birthdate = formatDateForInput(profileData.birthdate)
      }
      form.value = { ...form.value, ...profileData }
      
      // Réinitialiser les previews
      photoPreview.value = null
      selectedFile.value = null
      selectedFileName.value = ''
      coverPreview.value = null
      selectedCoverFile.value = null
      selectedCoverFileName.value = ''
    } else if (response.status === 404) {
      profileExists.value = false
    } else if (response.status === 401) {
      localStorage.removeItem(TOKEN_STORAGE_KEY)
      window.location.href = '/admin/login'
    } else {
      throw new Error('Erreur lors du chargement du profil')
    }
  } catch (error) {
    console.error('Erreur:', error)
    showNotification('error', t('admin.pages.profile.errors.loadFailed'))
  } finally {
    loading.value = false
  }
}

const saveProfile = async () => {
  saving.value = true
  errors.value = {}
  
  try {
    const url = profileExists.value && form.value.id
      ? `${API_BASE_URL}${API_ENDPOINT.profile}/${form.value.id}`
      : `${API_BASE_URL}${API_ENDPOINT.profile}`
    
    const method = profileExists.value && form.value.id ? 'PUT' : 'POST'
    
    const formData = new FormData()
    
    // Ajouter tous les champs du formulaire
    Object.keys(form.value).forEach(key => {
      const value = form.value[key as keyof ProfileData]
      if (value !== null && value !== undefined && key !== 'profile_photo' && key !== 'cover_photo' && key !== 'id') {
        if (key === 'birthdate' && value) {
          formData.append(key, formatDateForApi(value) || '')
        } else if (typeof value === 'boolean') {
          formData.append(key, value ? '1' : '0')
        } else {
          formData.append(key, String(value))
        }
      }
    })
    
    // Ajouter la photo de profil si elle a été sélectionnée
    if (selectedFile.value) {
      formData.append('profile_photo', selectedFile.value)
    }
    
    // Ajouter la photo de couverture si elle a été sélectionnée
    if (selectedCoverFile.value) {
      formData.append('cover_photo', selectedCoverFile.value)
    }
    
    // Pour Laravel, on utilise POST avec _method pour simuler PUT
    if (method === 'PUT') {
      formData.append('_method', 'PUT')
    }
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem(TOKEN_STORAGE_KEY)}`
      },
      body: formData
    })

    const result = await response.json()

    if (response.ok) {
      profileExists.value = true
      if (result.data) {
        const profileData = { ...result.data }
        if (profileData.birthdate) {
          profileData.birthdate = formatDateForInput(profileData.birthdate)
        }
        form.value = { ...form.value, ...profileData }
      }
      
      // Réinitialiser les sélections
      selectedFile.value = null
      selectedFileName.value = ''
      photoPreview.value = null
      selectedCoverFile.value = null
      selectedCoverFileName.value = ''
      coverPreview.value = null
      
      if (photoInput.value) {
        photoInput.value.value = ''
      }
      if (coverInput.value) {
        coverInput.value.value = ''
      }
      
      showNotification('success', result.message || t('admin.pages.profile.saveSuccess'))
    } else {
      if (result.errors) {
        errors.value = result.errors
      }
      throw new Error(result.message || 'Erreur lors de la sauvegarde')
    }
  } catch (error) {
    console.error('Erreur:', error)
    showNotification('error', t('admin.pages.profile.errors.saveFailed'))
  } finally {
    saving.value = false
  }
}

const resetForm = async () => {
  if (profileExists.value) {
    await loadProfile()
  } else {
    form.value = {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      address: '',
      birthdate: '',
      job_title_fr: '',
      job_title_en: '',
      tagline_fr: '',
      tagline_en: '',
      bio_fr: '',
      bio_en: '',
      profile_photo: '',
      cover_photo: '',
      linkedin_url: '',
      github_url: '',
      twitter_url: '',
      website_url: '',
      is_active: true,
      show_email: true,
      show_phone: false,
      show_address: false,
      show_age: false
    }
    photoPreview.value = null
    selectedFile.value = null
    selectedFileName.value = ''
    coverPreview.value = null
    selectedCoverFile.value = null
    selectedCoverFileName.value = ''
  }
  errors.value = {}
}

onMounted(() => {
  loadProfile()
})
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .inline-block,
.modal-leave-active .inline-block {
  transition: transform 0.3s ease;
}

.modal-enter-from .inline-block,
.modal-leave-to .inline-block {
  transform: scale(0.95);
}
</style>