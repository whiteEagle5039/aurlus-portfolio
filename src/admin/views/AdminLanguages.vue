<template>
  <div class="space-y-6">
    <!-- Header avec boutons d'ajout -->
    <div class="flex justify-between items-center">
      <div>
        <h3 class="text-lg font-medium text-gray-900">{{ $t('admin.pages.languages.title') }}</h3>
        <p class="text-sm text-gray-600">{{ $t('admin.pages.languages.subtitle') }}</p>
      </div>
      <div class="flex space-x-3">
        <button
          @click="openModal('language')"
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <i class="fas fa-language"></i>
          <span>{{ $t('admin.pages.languages.addButton') }}</span>
        </button>
        <button
          @click="openModal('skill')"
          class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <i class="fas fa-cogs"></i>
          <span>Ajouter une compétence</span>
        </button>
      </div>
    </div>

    <!-- Onglets -->
    <div class="border-b border-gray-200">
      <nav class="-mb-px flex space-x-8">
        <button
          @click="activeMainTab = 'languages'"
          :class="activeMainTab === 'languages' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
          class="whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center"
        >
          <i class="fas fa-language mr-2"></i>
          Langues
        </button>
        <button
          @click="activeMainTab = 'skills'"
          :class="activeMainTab === 'skills' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
          class="whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center"
        >
          <i class="fas fa-cogs mr-2"></i>
          Compétences techniques
        </button>
      </nav>
    </div>
    
    <!-- Indicateur de chargement -->
    <div v-if="loading" class="flex justify-center items-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
      <span class="ml-2 text-gray-600">{{ $t('common.loading') }}</span>
    </div>
    
    <!-- Contenu des onglets -->
    <div v-else class="bg-white rounded-lg shadow overflow-hidden">
      <!-- Langues -->
      <div v-if="activeMainTab === 'languages'">
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
                    :class="getLanguageStatusClass(language)"
                    class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  >
                    {{ getLanguageStatusText(language) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                <!-- Bouton Éditer -->
                <button
                  @click="openModal('language', language)"
                  class="text-indigo-600 hover:text-indigo-900 transition-colors"
                  :title="$t('common.edit')"
                >
                  <font-awesome-icon icon="edit" />
                </button>
                <!-- Bouton Activer / Désactiver -->
                <button
                  @click="toggleLanguageStatus(language.id)"
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

                <!-- Bouton Supprimer -->
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
      
      <!-- Compétences techniques -->
      <div v-if="activeMainTab === 'skills'">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Compétence
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Catégorie
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Niveau
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="skill in skills" :key="skill.id">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div v-if="skill.icon" class="flex-shrink-0 h-8 w-8 mr-3">
                      <i :class="skill.icon" :style="{ color: skill.color || '#6B7280' }" class="text-lg"></i>
                    </div>
                    <div>
                      <div class="text-sm font-medium text-gray-900">
                        {{ currentLocale === 'fr' ? skill.name_fr : skill.name_en }}
                      </div>
                      <div v-if="skill.description_fr || skill.description_en" class="text-sm text-gray-500 truncate max-w-xs">
                        {{ currentLocale === 'fr' ? skill.description_fr : skill.description_en }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span 
                    :class="getCategoryColor(currentLocale === 'fr' ? skill.category_fr : skill.category_en)"
                    class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  >
                    {{ currentLocale === 'fr' ? skill.category_fr : skill.category_en }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-1 bg-gray-200 rounded-full h-2 mr-3">
                      <div 
                        :class="getLevelColor(skill.level)"
                        :style="{ width: skill.level + '%' }"
                        class="h-2 rounded-full"
                      ></div>
                    </div>
                    <span class="text-sm text-gray-600">{{ skill.level }}%</span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex flex-col space-y-1">
                    <span 
                      :class="getSkillStatusClass(skill)"
                      class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                    >
                      {{ getSkillStatusText(skill) }}
                    </span>
                    <div class="flex space-x-1">
                      <span v-if="skill.is_featured" class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        <i class="fas fa-star mr-1"></i>
                        Featured
                      </span>
                      <span v-if="!skill.is_active" class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Inactif
                      </span>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <!-- Bouton Éditer -->
                  <button
                    @click="openModal('skill', skill)"
                    class="text-indigo-600 hover:text-indigo-900 transition-colors"
                    title="Éditer"
                  >
                    <font-awesome-icon icon="edit" />
                  </button>

                  <!-- Bouton Featured -->
                  <button
                    @click="toggleSkillFeatured(skill.id)"
                    :class="[
                      'transition-colors',
                      skill.is_featured 
                        ? 'text-yellow-600 hover:text-yellow-900' 
                        : 'text-gray-400 hover:text-yellow-600'
                    ]"
                    title="Basculer Featured"
                  >
                    <font-awesome-icon icon="star" />
                  </button>

                  <!-- Bouton Activer / Désactiver -->
                  <button
                    @click="toggleSkillStatus(skill.id)"
                    :class="[
                      'transition-colors',
                      skill.is_active 
                        ? 'text-orange-600 hover:text-orange-900' 
                        : 'text-green-600 hover:text-green-900'
                    ]"
                    :title="skill.is_active ? 'Désactiver' : 'Activer'"
                  >
                    <font-awesome-icon :icon="skill.is_active ? 'pause' : 'play'" />
                  </button>

                  <!-- Bouton Supprimer -->
                  <button
                    @click="deleteSkill(skill.id)"
                    class="text-red-600 hover:text-red-900 transition-colors"
                    title="Supprimer"
                  >
                    <font-awesome-icon icon="trash" />
                  </button>
                </td>

              </tr>
              <tr v-if="skills.length === 0">
                <td colspan="5" class="px-6 py-8 text-center text-gray-500">
                  Aucune compétence trouvée
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    
    <!-- Modal d'ajout/édition -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-lg font-medium text-gray-900">
              <i :class="modalType === 'language' ? 'fas fa-language text-blue-500' : 'fas fa-cogs text-green-500'" class="mr-2"></i>
              {{ getModalTitle() }}
            </h3>
            <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
              <i class="fas fa-times"></i>
            </button>
          </div>
          
          <form @submit.prevent="saveItem" class="space-y-6">
            <!-- Tabs pour les langues -->
            <div v-if="modalType === 'language'" class="border-b border-gray-200">
              <nav class="-mb-px flex space-x-8">
                <button
                  type="button"
                  @click="activeModalTab = 'fr'"
                  :class="[
                    'py-2 px-1 border-b-2 font-medium text-sm transition-colors',
                    activeModalTab === 'fr'
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  ]"
                >
                  <i class="fas fa-flag mr-2"></i>
                  {{ $t('common.french') }}
                </button>
                <button
                  type="button"
                  @click="activeModalTab = 'en'"
                  :class="[
                    'py-2 px-1 border-b-2 font-medium text-sm transition-colors',
                    activeModalTab === 'en'
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  ]"
                >
                  <i class="fas fa-flag mr-2"></i>
                  {{ $t('common.english') }}
                </button>
                <button
                  type="button"
                  @click="activeModalTab = 'general'"
                  :class="[
                    'py-2 px-1 border-b-2 font-medium text-sm transition-colors',
                    activeModalTab === 'general'
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  ]"
                >
                  <i class="fas fa-cog mr-2"></i>
                  Général
                </button>
              </nav>
            </div>

            <!-- Tabs pour les compétences -->
            <div v-if="modalType === 'skill'" class="border-b border-gray-200">
              <nav class="-mb-px flex space-x-8">
                <button
                  type="button"
                  @click="activeModalTab = 'fr'"
                  :class="[
                    'py-2 px-1 border-b-2 font-medium text-sm transition-colors',
                    activeModalTab === 'fr'
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  ]"
                >
                  <i class="fas fa-flag mr-2"></i>
                  Français
                </button>
                <button
                  type="button"
                  @click="activeModalTab = 'en'"
                  :class="[
                    'py-2 px-1 border-b-2 font-medium text-sm transition-colors',
                    activeModalTab === 'en'
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  ]"
                >
                  <i class="fas fa-flag mr-2"></i>
                  Anglais
                </button>
                <button
                  type="button"
                  @click="activeModalTab = 'general'"
                  :class="[
                    'py-2 px-1 border-b-2 font-medium text-sm transition-colors',
                    activeModalTab === 'general'
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  ]"
                >
                  <i class="fas fa-cog mr-2"></i>
                  Général
                </button>
              </nav>
            </div>

            <!-- Contenu français -->
            <div v-show="activeModalTab === 'fr'" class="space-y-4">
              <h4 class="text-md font-medium text-gray-800 flex items-center">
                <i class="fas fa-flag mr-2 text-blue-500"></i>
                Contenu français
              </h4>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  {{ modalType === 'language' ? 'Nom de la langue' : 'Nom de la compétence' }} (FR) *
                </label>
                <input
                  v-model="form.name_fr"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  :placeholder="modalType === 'language' ? 'Ex: Français' : 'Ex: Cybersécurité'"
                >
                <p v-if="errors.name_fr" class="text-red-500 text-xs mt-1">{{ errors.name_fr[0] }}</p>
              </div>
              
              <div v-if="modalType === 'skill'">
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Catégorie (FR) *
                </label>
                <input
                  v-model="form.category_fr"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Ex: Sécurité"
                >
                <p v-if="errors.category_fr" class="text-red-500 text-xs mt-1">{{ errors.category_fr[0] }}</p>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Description (FR)
                </label>
                <textarea
                  v-model="form.description_fr"
                  rows="3"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  :placeholder="modalType === 'language' ? 'Description de votre niveau' : 'Description de la compétence'"
                ></textarea>
                <p v-if="errors.description_fr" class="text-red-500 text-xs mt-1">{{ errors.description_fr[0] }}</p>
              </div>
            </div>

            <!-- Contenu anglais -->
            <div v-show="activeModalTab === 'en'" class="space-y-4">
              <h4 class="text-md font-medium text-gray-800 flex items-center">
                <i class="fas fa-flag mr-2 text-red-500"></i>
                Contenu anglais
              </h4>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  {{ modalType === 'language' ? 'Nom de la langue' : 'Nom de la compétence' }} (EN) *
                </label>
                <input
                  v-model="form.name_en"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  :placeholder="modalType === 'language' ? 'Ex: French' : 'Ex: Cybersecurity'"
                >
                <p v-if="errors.name_en" class="text-red-500 text-xs mt-1">{{ errors.name_en[0] }}</p>
              </div>
              
              <div v-if="modalType === 'skill'">
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Catégorie (EN) *
                </label>
                <input
                  v-model="form.category_en"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Ex: Security"
                >
                <p v-if="errors.category_en" class="text-red-500 text-xs mt-1">{{ errors.category_en[0] }}</p>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Description (EN)
                </label>
                <textarea
                  v-model="form.description_en"
                  rows="3"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  :placeholder="modalType === 'language' ? 'Description of your level' : 'Skill description'"
                ></textarea>
                <p v-if="errors.description_en" class="text-red-500 text-xs mt-1">{{ errors.description_en[0] }}</p>
              </div>
            </div>

            <!-- Informations générales -->
            <div v-show="activeModalTab === 'general'" class="space-y-4">
              <h4 class="text-md font-medium text-gray-800 flex items-center">
                <i class="fas fa-info-circle mr-2 text-gray-500"></i>
                Informations générales
              </h4>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Champs spécifiques aux langues -->
                <div v-if="modalType === 'language'">
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Drapeau (emoji) *
                  </label>
                  <input
                    v-model="form.flag"
                    type="text"
                    required
                    maxlength="10"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="🇫🇷"
                  >
                  <p v-if="errors.flag" class="text-red-500 text-xs mt-1">{{ errors.flag[0] }}</p>
                </div>

                <!-- Champs spécifiques aux compétences -->
                <div v-if="modalType === 'skill'">
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Icône (classe FontAwesome)
                  </label>
                  <input
                    v-model="form.icon"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="fas fa-shield-alt"
                  >
                  <p v-if="errors.icon" class="text-red-500 text-xs mt-1">{{ errors.icon[0] }}</p>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Niveau ({{ form.level }}%)
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

              <div v-if="modalType === 'language'" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Certification (optionnel)
                  </label>
                  <input
                    v-model="form.certification"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Ex: TOEIC 850, DELF B2"
                  >
                  <p v-if="errors.certification" class="text-red-500 text-xs mt-1">{{ errors.certification[0] }}</p>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Ordre d'affichage
                  </label>
                  <input
                    v-model.number="form.sort_order"
                    type="number"
                    min="0"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                </div>
              </div>

              <div v-if="modalType === 'skill'" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Couleur
                  </label>
                  <input
                    v-model="form.color"
                    type="color"
                    class="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                  <p v-if="errors.color" class="text-red-500 text-xs mt-1">{{ errors.color[0] }}</p>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    Ordre d'affichage
                  </label>
                  <input
                    v-model.number="form.sort_order"
                    type="number"
                    min="0"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                </div>
              </div>

              <div v-if="modalType === 'skill'">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Tags (optionnel)
                </label>
                <div class="flex flex-wrap gap-2 mb-2">
                  <span 
                    v-for="(tag, index) in form.tags" 
                    :key="index"
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {{ tag }}
                    <button 
                      type="button"
                      @click="removeTag(index)"
                      class="ml-2 inline-flex items-center justify-center w-4 h-4 text-blue-400 hover:bg-blue-200 hover:text-blue-600 rounded-full"
                    >
                      <i class="fas fa-times text-xs"></i>
                    </button>
                  </span>
                </div>
                <div class="flex">
                  <input
                    v-model="newTag"
                    @keyup.enter="addTag"
                    type="text"
                    placeholder="Ajouter un tag"
                    class="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                  <button
                    type="button"
                    @click="addTag"
                    class="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition-colors"
                  >
                    <i class="fas fa-plus"></i>
                  </button>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="flex items-center">
                  <label class="flex items-center">
                    <input
                      v-model="form.is_active"
                      type="checkbox"
                      class="rounded border-gray-300 text-green-600 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
                    >
                    <span class="ml-2 text-sm text-gray-700">
                      Actif
                    </span>
                  </label>
                </div>

                <div v-if="modalType === 'skill'" class="flex items-center">
                  <label class="flex items-center">
                    <input
                      v-model="form.is_featured"
                      type="checkbox"
                      class="rounded border-gray-300 text-yellow-600 shadow-sm focus:border-yellow-300 focus:ring focus:ring-yellow-200 focus:ring-opacity-50"
                    >
                    <span class="ml-2 text-sm text-gray-700">
                      Compétence mise en avant
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
                Annuler
              </button>
              <button
                type="submit"
                :disabled="saving"
                class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center"
              >
                <i v-if="saving" class="fas fa-spinner fa-spin mr-2"></i>
                {{ saving ? 'Enregistrement...' : (editingItem ? 'Modifier' : 'Ajouter') }}
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

interface Skill {
  id: number
  name_fr: string
  name_en: string
  description_fr?: string
  description_en?: string
  category_fr: string
  category_en: string
  level: number
  icon?: string
  color?: string
  tags?: string[]
  is_active: boolean
  is_featured: boolean
  sort_order: number
}

interface Stats {
  languages?: {
    total: number
    active: number
    native: number
    advanced: number
    intermediate: number
    beginner: number
    with_certification: number
  }
  skills?: {
    total: number
    active: number
    featured: number
    expert: number
    advanced: number
    intermediate: number
    elementary: number
    beginner: number
  }
}

const currentLocale = computed(() => locale.value)
const languages = ref<Language[]>([])
const skills = ref<Skill[]>([])
const stats = ref<Stats>({})
const loading = ref(false)
const saving = ref(false)
const showModal = ref(false)
const activeMainTab = ref<'languages' | 'skills'>('languages')
const activeModalTab = ref<'fr' | 'en' | 'general'>('fr')
const modalType = ref<'language' | 'skill'>('language')
const editingItem = ref<Language | Skill | null>(null)
const newTag = ref('')

const form = ref({
  name_fr: '',
  name_en: '',
  description_fr: '',
  description_en: '',
  flag: '',
  category_fr: '',
  category_en: '',
  level: 50,
  certification: '',
  icon: '',
  color: '#6B7280',
  tags: [] as string[],
  is_active: true,
  is_featured: false,
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

const getModalTitle = () => {
  const action = editingItem.value ? 'Modifier' : 'Ajouter'
  const type = modalType.value === 'language' ? 'une langue' : 'une compétence'
  return `${action} ${type}`
}

const getLevelColor = (level: number): string => {
  if (level >= 90) return 'bg-purple-500'
  if (level >= 75) return 'bg-green-500'
  if (level >= 60) return 'bg-yellow-500'
  if (level >= 40) return 'bg-orange-500'
  return 'bg-red-500'
}

const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    'Sécurité': 'bg-red-100 text-red-800',
    'Security': 'bg-red-100 text-red-800',
    'Réseau': 'bg-blue-100 text-blue-800',
    'Network': 'bg-blue-100 text-blue-800',
    'Développement': 'bg-green-100 text-green-800',
    'Development': 'bg-green-100 text-green-800',
    'Système': 'bg-purple-100 text-purple-800',
    'System': 'bg-purple-100 text-purple-800',
    'Cloud': 'bg-indigo-100 text-indigo-800',
    'Management': 'bg-yellow-100 text-yellow-800'
  }
  return colors[category] || 'bg-gray-100 text-gray-800'
}

const getLanguageStatusClass = (language: Language): string => {
  if (!language.is_active) return 'bg-gray-100 text-gray-800'
  
  if (language.level >= 95) return 'bg-purple-100 text-purple-800'
  if (language.level >= 75) return 'bg-green-100 text-green-800'
  if (language.level >= 60) return 'bg-yellow-100 text-yellow-800'
  if (language.level >= 40) return 'bg-orange-100 text-orange-800'
  return 'bg-red-100 text-red-800'
}

const getLanguageStatusText = (language: Language): string => {
  if (!language.is_active) return 'Inactif'
  
  if (language.level >= 95) return 'Natif'
  if (language.level >= 75) return 'Avancé'
  if (language.level >= 60) return 'Intermédiaire'
  if (language.level >= 40) return 'Élémentaire'
  return 'Débutant'
}

const getSkillStatusClass = (skill: Skill): string => {
  if (!skill.is_active) return 'bg-gray-100 text-gray-800'
  
  if (skill.level >= 90) return 'bg-purple-100 text-purple-800'
  if (skill.level >= 75) return 'bg-green-100 text-green-800'
  if (skill.level >= 60) return 'bg-yellow-100 text-yellow-800'
  if (skill.level >= 40) return 'bg-orange-100 text-orange-800'
  return 'bg-red-100 text-red-800'
}

const getSkillStatusText = (skill: Skill): string => {
  if (!skill.is_active) return 'Inactif'
  
  if (skill.level >= 90) return 'Expert'
  if (skill.level >= 75) return 'Avancé'
  if (skill.level >= 60) return 'Intermédiaire'
  if (skill.level >= 40) return 'Élémentaire'
  return 'Débutant'
}

const addTag = () => {
  if (newTag.value.trim() && !form.value.tags.includes(newTag.value.trim())) {
    form.value.tags.push(newTag.value.trim())
    newTag.value = ''
  }
}

const removeTag = (index: number) => {
  form.value.tags.splice(index, 1)
}

const loadLanguages = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINT.languages}`, {
      method: 'GET',
      headers: apiHeaders.value
    })

    if (response.ok) {
      const result = await response.json()
      languages.value = result.data || []
    } else {
      throw new Error('Erreur lors du chargement des langues')
    }
  } catch (error) {
    console.error('Erreur:', error)
    showNotification('error', 'Erreur lors du chargement des langues')
  }
}

const loadSkills = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINT.skills}`, {
      method: 'GET',
      headers: apiHeaders.value
    })

    if (response.ok) {
      const result = await response.json()
      skills.value = result.data || []
    } else {
      throw new Error('Erreur lors du chargement des compétences')
    }
  } catch (error) {
    console.error('Erreur:', error)
    showNotification('error', 'Erreur lors du chargement des compétences')
  }
}

const loadStats = async () => {
  try {
    const [languagesStatsRes, skillsStatsRes] = await Promise.all([
      fetch(`${API_BASE_URL}${API_ENDPOINT.languages}/stats`, {
        method: 'GET',
        headers: apiHeaders.value
      }),
      fetch(`${API_BASE_URL}${API_ENDPOINT.skills}/stats`, {
        method: 'GET',
        headers: apiHeaders.value
      })
    ])

    const languagesStats = languagesStatsRes.ok ? await languagesStatsRes.json() : null
    const skillsStats = skillsStatsRes.ok ? await skillsStatsRes.json() : null

    stats.value = {
      languages: languagesStats?.data,
      skills: skillsStats?.data
    }
  } catch (error) {
    console.error('Erreur lors du chargement des statistiques:', error)
  }
}

const openModal = (type: 'language' | 'skill', item?: Language | Skill) => {
  errors.value = {}
  activeModalTab.value = 'fr'
  modalType.value = type
  
  if (item) {
    editingItem.value = item
    if (type === 'language') {
      const lang = item as Language
      form.value = {
        name_fr: lang.name_fr,
        name_en: lang.name_en,
        description_fr: lang.description_fr || '',
        description_en: lang.description_en || '',
        flag: lang.flag,
        category_fr: '',
        category_en: '',
        level: lang.level,
        certification: lang.certification || '',
        icon: '',
        color: '#6B7280',
        tags: [],
        is_active: lang.is_active,
        is_featured: false,
        sort_order: lang.sort_order
      }
    } else {
      const skill = item as Skill
      form.value = {
        name_fr: skill.name_fr,
        name_en: skill.name_en,
        description_fr: skill.description_fr || '',
        description_en: skill.description_en || '',
        flag: '',
        category_fr: skill.category_fr,
        category_en: skill.category_en,
        level: skill.level,
        certification: '',
        icon: skill.icon || '',
        color: skill.color || '#6B7280',
        tags: skill.tags || [],
        is_active: skill.is_active,
        is_featured: skill.is_featured,
        sort_order: skill.sort_order
      }
    }
  } else {
    editingItem.value = null
    form.value = {
      name_fr: '',
      name_en: '',
      description_fr: '',
      description_en: '',
      flag: type === 'language' ? '' : '',
      category_fr: type === 'skill' ? '' : '',
      category_en: type === 'skill' ? '' : '',
      level: 50,
      certification: type === 'language' ? '' : '',
      icon: type === 'skill' ? '' : '',
      color: '#6B7280',
      tags: [],
      is_active: true,
      is_featured: false,
      sort_order: 0
    }
  }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  editingItem.value = null
  errors.value = {}
  newTag.value = ''
}

const saveItem = async () => {
  saving.value = true
  errors.value = {}
  
  try {
    let url = ''
    let payload = {}
    
    if (modalType.value === 'language') {
      url = editingItem.value 
        ? `${API_BASE_URL}${API_ENDPOINT.languages}/${editingItem.value.id}`
        : `${API_BASE_URL}${API_ENDPOINT.languages}`
        
      payload = {
        name_fr: form.value.name_fr,
        name_en: form.value.name_en,
        description_fr: form.value.description_fr,
        description_en: form.value.description_en,
        flag: form.value.flag,
        level: form.value.level,
        certification: form.value.certification,
        is_active: form.value.is_active,
        sort_order: form.value.sort_order
      }
    } else {
      url = editingItem.value 
        ? `${API_BASE_URL}${API_ENDPOINT.skills}/${editingItem.value.id}`
        : `${API_BASE_URL}${API_ENDPOINT.skills}`
        
      payload = {
        name_fr: form.value.name_fr,
        name_en: form.value.name_en,
        description_fr: form.value.description_fr,
        description_en: form.value.description_en,
        category_fr: form.value.category_fr,
        category_en: form.value.category_en,
        level: form.value.level,
        icon: form.value.icon,
        color: form.value.color,
        tags: form.value.tags,
        is_active: form.value.is_active,
        is_featured: form.value.is_featured,
        sort_order: form.value.sort_order
      }
    }
    
    const method = editingItem.value ? 'PUT' : 'POST'
    
    const response = await fetch(url, {
      method,
      headers: apiHeaders.value,
      body: JSON.stringify(payload)
    })

    const result = await response.json()

    if (response.ok) {
      showNotification('success', result.message)
      closeModal()
      await loadLanguages()
      await loadSkills()
      await loadStats()
    } else {
      if (result.errors) {
        errors.value = result.errors
      }
      throw new Error(result.message || 'Erreur lors de la sauvegarde')
    }
  } catch (error: any) {
    console.error('Erreur:', error)
    showNotification('error', error.message || 'Erreur lors de la sauvegarde')
  } finally {
    saving.value = false
  }
}

const toggleLanguageStatus = async (id: number) => {
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
    showNotification('error', 'Erreur lors du changement de statut')
  }
}

const toggleSkillStatus = async (id: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINT.skills}/${id}/toggle-status`, {
      method: 'PATCH',
      headers: apiHeaders.value
    })

    if (response.ok) {
      const result = await response.json()
      showNotification('success', result.message)
      await loadSkills()
      await loadStats()
    } else {
      throw new Error('Erreur lors du changement de statut')
    }
  } catch (error) {
    console.error('Erreur:', error)
    showNotification('error', 'Erreur lors du changement de statut')
  }
}

const toggleSkillFeatured = async (id: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINT.skills}/${id}/toggle-featured`, {
      method: 'PATCH',
      headers: apiHeaders.value
    })

    if (response.ok) {
      const result = await response.json()
      showNotification('success', result.message)
      await loadSkills()
      await loadStats()
    } else {
      throw new Error('Erreur lors du changement du statut featured')
    }
  } catch (error) {
    console.error('Erreur:', error)
    showNotification('error', 'Erreur lors du changement du statut featured')
  }
}

const deleteLanguage = async (id: number) => {
  if (!confirm('Êtes-vous sûr de vouloir supprimer cette langue ?')) {
    return
  }

  try {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINT.languages}/${id}`, {
      method: 'DELETE',
      headers: apiHeaders.value
    })

    if (response.ok) {
      showNotification('success', 'Langue supprimée avec succès')
      await loadLanguages()
      await loadStats()
    } else {
      throw new Error('Erreur lors de la suppression')
    }
  } catch (error) {
    console.error('Erreur:', error)
    showNotification('error', 'Erreur lors de la suppression')
  }
}

const deleteSkill = async (id: number) => {
  if (!confirm('Êtes-vous sûr de vouloir supprimer cette compétence ?')) {
    return
  }

  try {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINT.skills}/${id}`, {
      method: 'DELETE',
      headers: apiHeaders.value
    })

    if (response.ok) {
      showNotification('success', 'Compétence supprimée avec succès')
      await loadSkills()
      await loadStats()
    } else {
      throw new Error('Erreur lors de la suppression')
    }
  } catch (error) {
    console.error('Erreur:', error)
    showNotification('error', 'Erreur lors de la suppression')
  }
}

onMounted(async () => {
  loading.value = true
  try {
    await Promise.all([loadLanguages(), loadSkills(), loadStats()])
  } finally {
    loading.value = false
  }
})
</script>