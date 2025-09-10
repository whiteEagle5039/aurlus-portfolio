<template>
  <div class="space-y-6">
    <!-- Header avec bouton d'ajout -->
    <div class="flex justify-between items-center">
      <div>
        <h3 class="text-lg font-medium text-gray-900">Liste des formations</h3>
        <p class="text-sm text-gray-600">Gérez vos formations et diplômes</p>
      </div>
      <button
        @click="openModal()"
        class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
      >
        <i class="fas fa-plus"></i>
        <span>Ajouter une formation</span>
      </button>
    </div>
    
    <!-- Liste des formations -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Diplôme
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Institution
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
            <tr v-for="education in educations" :key="education.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ education.degree }}</div>
                <div class="text-sm text-gray-500">{{ education.specialty }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ education.institution }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ education.duration }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                <button
                  @click="openModal(education)"
                  class="text-indigo-600 hover:text-indigo-900"
                >
                  <i class="fas fa-edit"></i>
                </button>
                <button
                  @click="deleteEducation(education.id)"
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
              {{ editingEducation ? 'Modifier la formation' : 'Ajouter une formation' }}
            </h3>
            <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
              <i class="fas fa-times"></i>
            </button>
          </div>
          
          <form @submit.prevent="saveEducation" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Diplôme</label>
              <input
                v-model="form.degree"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Spécialité</label>
              <input
                v-model="form.specialty"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Institution</label>
              <input
                v-model="form.institution"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Année de début</label>
                <input
                  v-model="form.start_year"
                  type="number"
                  min="1900"
                  max="2030"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Année de fin</label>
                <input
                  v-model="form.end_year"
                  type="number"
                  min="1900"
                  max="2030"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                v-model="form.description"
                rows="3"
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
                {{ editingEducation ? 'Modifier' : 'Ajouter' }}
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

interface Education {
  id: number
  degree: string
  specialty: string
  institution: string
  start_year: number
  end_year: number | null
  duration: string
  description: string
}

export default defineComponent({
  name: 'AdminEducation',
  setup() {
    const educations = ref<Education[]>([])
    const showModal = ref(false)
    const editingEducation = ref<Education | null>(null)
    const form = ref({
      degree: '',
      specialty: '',
      institution: '',
      start_year: new Date().getFullYear(),
      end_year: null as number | null,
      description: ''
    })
    
    const loadEducations = async () => {
      // Simuler des données - à remplacer par un appel API
      educations.value = [
        {
          id: 1,
          degree: 'Master en Cybersécurité',
          specialty: 'Sécurité des Systèmes d\'Information',
          institution: 'Université de Technologie',
          start_year: 2023,
          end_year: null,
          duration: '2023 - En cours',
          description: 'Formation avancée en cybersécurité'
        },
        {
          id: 2,
          degree: 'DESS',
          specialty: 'Gestion des Télécommunications',
          institution: 'EAMAC',
          start_year: 2015,
          end_year: 2016,
          duration: '2015 - 2016',
          description: 'Spécialisation en télécommunications'
        }
      ]
    }
    
    const openModal = (education?: Education) => {
      if (education) {
        editingEducation.value = education
        form.value = {
          degree: education.degree,
          specialty: education.specialty,
          institution: education.institution,
          start_year: education.start_year,
          end_year: education.end_year,
          description: education.description
        }
      } else {
        editingEducation.value = null
        form.value = {
          degree: '',
          specialty: '',
          institution: '',
          start_year: new Date().getFullYear(),
          end_year: null,
          description: ''
        }
      }
      showModal.value = true
    }
    
    const closeModal = () => {
      showModal.value = false
      editingEducation.value = null
    }
    
    const saveEducation = async () => {
      const duration = form.value.end_year 
        ? `${form.value.start_year} - ${form.value.end_year}`
        : `${form.value.start_year} - En cours`
      
      if (editingEducation.value) {
        // Mise à jour
        const index = educations.value.findIndex(edu => edu.id === editingEducation.value!.id)
        if (index !== -1) {
          educations.value[index] = {
            ...educations.value[index],
            ...form.value,
            duration
          }
        }
      } else {
        // Ajout
        const newEducation: Education = {
          id: Date.now(),
          ...form.value,
          duration
        }
        educations.value.push(newEducation)
      }
      
      closeModal()
    }
    
    const deleteEducation = async (id: number) => {
      if (confirm('Êtes-vous sûr de vouloir supprimer cette formation ?')) {
        educations.value = educations.value.filter(edu => edu.id !== id)
      }
    }
    
    onMounted(() => {
      loadEducations()
    })
    
    return {
      educations,
      showModal,
      editingEducation,
      form,
      openModal,
      closeModal,
      saveEducation,
      deleteEducation
    }
  }
})
</script>