<template>
  <div class="space-y-6">
    <!-- Header avec bouton d'ajout -->
    <div class="flex justify-between items-center">
      <div>
        <h3 class="text-lg font-medium text-gray-900">Liste des expériences</h3>
        <p class="text-sm text-gray-600">Gérez vos expériences professionnelles</p>
      </div>
      <button
        @click="openModal()"
        class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
      >
        <i class="fas fa-plus"></i>
        <span>Ajouter une expérience</span>
      </button>
    </div>
    
    <!-- Liste des expériences -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Poste
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Entreprise
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Période
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="experience in experiences" :key="experience.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ experience.title }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ experience.company }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ experience.duration }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                <button
                  @click="openModal(experience)"
                  class="text-indigo-600 hover:text-indigo-900"
                >
                  <i class="fas fa-edit"></i>
                </button>
                <button
                  @click="deleteExperience(experience.id)"
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
    
    <!-- Modal d'ajout/édition -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-lg font-medium text-gray-900">
              {{ editingExperience ? 'Modifier l\'expérience' : 'Ajouter une expérience' }}
            </h3>
            <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
              <i class="fas fa-times"></i>
            </button>
          </div>
          
          <form @submit.prevent="saveExperience" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Titre du poste</label>
              <input
                v-model="form.title"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Entreprise</label>
              <input
                v-model="form.company"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Date de début</label>
                <input
                  v-model="form.start_date"
                  type="date"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Date de fin</label>
                <input
                  v-model="form.end_date"
                  type="date"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                v-model="form.description"
                rows="4"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              ></textarea>
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
                {{ editingExperience ? 'Modifier' : 'Ajouter' }}
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

interface Experience {
  id: number
  title: string
  company: string
  start_date: string
  end_date: string | null
  duration: string
  description: string
}

export default defineComponent({
  name: 'AdminExperiences',
  setup() {
    const experiences = ref<Experience[]>([])
    const showModal = ref(false)
    const editingExperience = ref<Experience | null>(null)
    const form = ref({
      title: '',
      company: '',
      start_date: '',
      end_date: '',
      description: ''
    })
    
    const loadExperiences = async () => {
      // Simuler des données - à remplacer par un appel API
      experiences.value = [
        {
          id: 1,
          title: 'Responsable Cybersécurité',
          company: 'ASECNA',
          start_date: '2020-01-01',
          end_date: null,
          duration: '2020 - Présent',
          description: 'Gestion de la sécurité informatique'
        },
        {
          id: 2,
          title: 'Ingénieur Réseau',
          company: 'TechCorp',
          start_date: '2018-06-01',
          end_date: '2019-12-31',
          duration: '2018 - 2019',
          description: 'Administration des infrastructures réseau'
        }
      ]
    }
    
    const openModal = (experience?: Experience) => {
      if (experience) {
        editingExperience.value = experience
        form.value = {
          title: experience.title,
          company: experience.company,
          start_date: experience.start_date,
          end_date: experience.end_date || '',
          description: experience.description
        }
      } else {
        editingExperience.value = null
        form.value = {
          title: '',
          company: '',
          start_date: '',
          end_date: '',
          description: ''
        }
      }
      showModal.value = true
    }
    
    const closeModal = () => {
      showModal.value = false
      editingExperience.value = null
    }
    
    const saveExperience = async () => {
      // Ici, vous feriez un appel API pour sauvegarder
      console.log('Sauvegarde:', form.value)
      
      if (editingExperience.value) {
        // Mise à jour
        const index = experiences.value.findIndex(exp => exp.id === editingExperience.value!.id)
        if (index !== -1) {
          experiences.value[index] = {
            ...experiences.value[index],
            ...form.value,
            duration: `${form.value.start_date} - ${form.value.end_date || 'Présent'}`
          }
        }
      } else {
        // Ajout
        const newExperience: Experience = {
          id: Date.now(),
          ...form.value,
          duration: `${form.value.start_date} - ${form.value.end_date || 'Présent'}`
        }
        experiences.value.push(newExperience)
      }
      
      closeModal()
    }
    
    const deleteExperience = async (id: number) => {
      if (confirm('Êtes-vous sûr de vouloir supprimer cette expérience ?')) {
        experiences.value = experiences.value.filter(exp => exp.id !== id)
      }
    }
    
    onMounted(() => {
      loadExperiences()
    })
    
    return {
      experiences,
      showModal,
      editingExperience,
      form,
      openModal,
      closeModal,
      saveExperience,
      deleteExperience
    }
  }
})
</script>