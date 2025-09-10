<template>
  <div class="space-y-6">
    <!-- Header avec bouton d'ajout -->
    <div class="flex justify-between items-center">
      <div>
        <h3 class="text-lg font-medium text-gray-900">Langues & Compétences</h3>
        <p class="text-sm text-gray-600">Gérez vos compétences linguistiques et techniques</p>
      </div>
      <button
        @click="openModal()"
        class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
      >
        <i class="fas fa-plus"></i>
        <span>Ajouter une compétence</span>
      </button>
    </div>
    
    <!-- Onglets -->
    <div class="border-b border-gray-200">
      <nav class="-mb-px flex space-x-8">
        <button
          @click="activeTab = 'languages'"
          :class="activeTab === 'languages' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
          class="whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
        >
          Langues
        </button>
        <button
          @click="activeTab = 'skills'"
          :class="activeTab === 'skills' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
          class="whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
        >
          Compétences techniques
        </button>
      </nav>
    </div>
    
    <!-- Contenu des onglets -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <!-- Langues -->
      <div v-if="activeTab === 'languages'">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Langue
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Niveau
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Certification
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="language in languages" :key="language.id">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <span class="text-2xl mr-3">{{ language.flag }}</span>
                    <div class="text-sm font-medium text-gray-900">{{ language.name }}</div>
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
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button
                    @click="openModal(language)"
                    class="text-indigo-600 hover:text-indigo-900"
                  >
                    <i class="fas fa-edit"></i>
                  </button>
                  <button
                    @click="deleteItem(language.id, 'language')"
                    class="text-red-600 hover:text-red-900"
                  >
                    <i class="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <!-- Compétences techniques -->
      <div v-if="activeTab === 'skills'">
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
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="skill in skills" :key="skill.id">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">{{ skill.name }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span 
                    :class="getCategoryColor(skill.category)"
                    class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  >
                    {{ skill.category }}
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
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button
                    @click="openModal(skill)"
                    class="text-indigo-600 hover:text-indigo-900"
                  >
                    <i class="fas fa-edit"></i>
                  </button>
                  <button
                    @click="deleteItem(skill.id, 'skill')"
                    class="text-red-600 hover:text-red-900"
                  >
                    <i class="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    
    <!-- Modal d'ajout/édition -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-lg font-medium text-gray-900">
              {{ editingItem ? 'Modifier' : 'Ajouter' }} 
              {{ modalType === 'language' ? 'une langue' : 'une compétence' }}
            </h3>
            <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
              <i class="fas fa-times"></i>
            </button>
          </div>
          
          <form @submit.prevent="saveItem" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                {{ modalType === 'language' ? 'Nom de la langue' : 'Nom de la compétence' }}
              </label>
              <input
                v-model="form.name"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
            </div>
            
            <div v-if="modalType === 'language'">
              <label class="block text-sm font-medium text-gray-700 mb-1">Drapeau (emoji)</label>
              <input
                v-model="form.flag"
                type="text"
                maxlength="2"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
            </div>
            
            <div v-if="modalType === 'skill'">
              <label class="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
              <select
                v-model="form.category"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="Sécurité">Sécurité</option>
                <option value="Réseau">Réseau</option>
                <option value="Développement">Développement</option>
                <option value="Système">Système</option>
                <option value="Cloud">Cloud</option>
                <option value="Management">Management</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Niveau ({{ form.level }}%)
              </label>
              <input
                v-model="form.level"
                type="range"
                min="0"
                max="100"
                step="5"
                class="w-full"
              >
            </div>
            
            <div v-if="modalType === 'language'">
              <label class="block text-sm font-medium text-gray-700 mb-1">Certification (optionnel)</label>
              <input
                v-model="form.certification"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
            </div>
            
            <div class="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                @click="closeModal"
                class="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
              >
                Annuler
              </button>
              <button
                type="submit"
                class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                {{ editingItem ? 'Modifier' : 'Ajouter' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'

interface Language {
  id: number
  name: string
  flag: string
  level: number
  certification?: string
}

interface Skill {
  id: number
  name: string
  category: string
  level: number
}

export default defineComponent({
  name: 'AdminLanguages',
  setup() {
    const activeTab = ref('languages')
    const languages = ref<Language[]>([])
    const skills = ref<Skill[]>([])
    const showModal = ref(false)
    const editingItem = ref<Language | Skill | null>(null)
    const modalType = ref<'language' | 'skill'>('language')
    const form = ref({
      name: '',
      flag: '',
      level: 50,
      certification: '',
      category: 'Sécurité'
    })
    
    const loadData = async () => {
      // Simuler des données - à remplacer par des appels API
      languages.value = [
        { id: 1, name: 'Français', flag: '🇫🇷', level: 100, certification: 'Langue maternelle' },
        { id: 2, name: 'Anglais', flag: '🇺🇸', level: 85, certification: 'TOEIC 850' },
        { id: 3, name: 'Espagnol', flag: '🇪🇸', level: 60 }
      ]
      
      skills.value = [
        { id: 1, name: 'Cybersécurité', category: 'Sécurité', level: 95 },
        { id: 2, name: 'Fortinet', category: 'Sécurité', level: 90 },
        { id: 3, name: 'Cisco', category: 'Réseau', level: 85 },
        { id: 4, name: 'Python', category: 'Développement', level: 75 },
        { id: 5, name: 'Linux', category: 'Système', level: 80 }
      ]
    }
    
    const getLevelColor = (level: number) => {
      if (level >= 80) return 'bg-green-500'
      if (level >= 60) return 'bg-yellow-500'
      return 'bg-red-500'
    }
    
    const getCategoryColor = (category: string) => {
      const colors: Record<string, string> = {
        'Sécurité': 'bg-red-100 text-red-800',
        'Réseau': 'bg-blue-100 text-blue-800',
        'Développement': 'bg-green-100 text-green-800',
        'Système': 'bg-purple-100 text-purple-800',
        'Cloud': 'bg-indigo-100 text-indigo-800',
        'Management': 'bg-yellow-100 text-yellow-800'
      }
      return colors[category] || 'bg-gray-100 text-gray-800'
    }
    
    const openModal = (item?: Language | Skill) => {
      if (item) {
        editingItem.value = item
        if ('flag' in item) {
          // C'est une langue
          modalType.value = 'language'
          form.value = {
            name: item.name,
            flag: item.flag,
            level: item.level,
            certification: item.certification || '',
            category: 'Sécurité'
          }
        } else {
          // C'est une compétence
          modalType.value = 'skill'
          form.value = {
            name: item.name,
            flag: '',
            level: item.level,
            certification: '',
            category: item.category
          }
        }
      } else {
        editingItem.value = null
        modalType.value = activeTab.value === 'languages' ? 'language' : 'skill'
        form.value = {
          name: '',
          flag: '',
          level: 50,
          certification: '',
          category: 'Sécurité'
        }
      }
      showModal.value = true
    }
    
    const closeModal = () => {
      showModal.value = false
      editingItem.value = null
    }
    
    const saveItem = async () => {
      if (modalType.value === 'language') {
        if (editingItem.value && 'flag' in editingItem.value) {
          // Mise à jour langue
          const index = languages.value.findIndex(lang => lang.id === editingItem.value!.id)
          if (index !== -1) {
            languages.value[index] = {
              ...languages.value[index],
              name: form.value.name,
              flag: form.value.flag,
              level: form.value.level,
              certification: form.value.certification || undefined
            }
          }
        } else {
          // Ajout langue
          const newLanguage: Language = {
            id: Date.now(),
            name: form.value.name,
            flag: form.value.flag,
            level: form.value.level,
            certification: form.value.certification || undefined
          }
          languages.value.push(newLanguage)
        }
      } else {
        if (editingItem.value && !('flag' in editingItem.value)) {
          // Mise à jour compétence
          const index = skills.value.findIndex(skill => skill.id === editingItem.value!.id)
          if (index !== -1) {
            skills.value[index] = {
              ...skills.value[index],
              name: form.value.name,
              category: form.value.category,
              level: form.value.level
            }
          }
        } else {
          // Ajout compétence
          const newSkill: Skill = {
            id: Date.now(),
            name: form.value.name,
            category: form.value.category,
            level: form.value.level
          }
          skills.value.push(newSkill)
        }
      }
      
      closeModal()
    }
    
    const deleteItem = async (id: number, type: 'language' | 'skill') => {
      const itemName = type === 'language' ? 'cette langue' : 'cette compétence'
      if (confirm(`Êtes-vous sûr de vouloir supprimer ${itemName} ?`)) {
        if (type === 'language') {
          languages.value = languages.value.filter(lang => lang.id !== id)
        } else {
          skills.value = skills.value.filter(skill => skill.id !== id)
        }
      }
    }
    
    onMounted(() => {
      loadData()
    })
    
    return {
      activeTab,
      languages,
      skills,
      showModal,
      editingItem,
      modalType,
      form,
      getLevelColor,
      getCategoryColor,
      openModal,
      closeModal,
      saveItem,
      deleteItem
    }
  }
})
</script>