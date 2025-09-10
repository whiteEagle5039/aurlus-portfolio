<template>
  <div class="space-y-6">
    <!-- Header avec bouton d'ajout -->
    <div class="flex justify-between items-center">
      <div>
        <h3 class="text-lg font-medium text-gray-900">Liste des projets</h3>
        <p class="text-sm text-gray-600">Gérez vos projets et réalisations</p>
      </div>
      <button
        @click="openModal()"
        class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
      >
        <i class="fas fa-plus"></i>
        <span>Ajouter un projet</span>
      </button>
    </div>
    
    <!-- Grille des projets -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="project in projects" 
        :key="project.id"
        class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
      >
        <div v-if="project.image" class="h-48 bg-gray-200">
          <img 
            :src="project.image" 
            :alt="project.title"
            class="w-full h-full object-cover"
          >
        </div>
        <div v-else class="h-48 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
          <i class="fas fa-folder-open text-white text-4xl"></i>
        </div>
        
        <div class="p-6">
          <div class="flex justify-between items-start mb-2">
            <h3 class="text-lg font-semibold text-gray-900">{{ project.title }}</h3>
            <span 
              :class="getStatusClass(project.status)"
              class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
            >
              {{ getStatusText(project.status) }}
            </span>
          </div>
          
          <p class="text-gray-600 text-sm mb-4 line-clamp-3">{{ project.description }}</p>
          
          <div class="flex flex-wrap gap-1 mb-4">
            <span 
              v-for="tech in project.technologies.slice(0, 3)" 
              :key="tech"
              class="inline-flex px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
            >
              {{ tech }}
            </span>
            <span 
              v-if="project.technologies.length > 3"
              class="inline-flex px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
            >
              +{{ project.technologies.length - 3 }}
            </span>
          </div>
          
          <div class="flex justify-between items-center">
            <div class="flex space-x-2">
              <a 
                v-if="project.demo_url"
                :href="project.demo_url" 
                target="_blank"
                class="text-green-600 hover:text-green-800 text-sm"
              >
                <i class="fas fa-external-link-alt mr-1"></i>
                Demo
              </a>
              <a 
                v-if="project.github_url"
                :href="project.github_url" 
                target="_blank"
                class="text-gray-600 hover:text-gray-800 text-sm"
              >
                <i class="fab fa-github mr-1"></i>
                Code
              </a>
            </div>
            
            <div class="flex space-x-2">
              <button
                @click="openModal(project)"
                class="text-indigo-600 hover:text-indigo-900"
              >
                <i class="fas fa-edit"></i>
              </button>
              <button
                @click="deleteProject(project.id)"
                class="text-red-600 hover:text-red-900"
              >
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Modal d'ajout/édition -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-lg font-medium text-gray-900">
              {{ editingProject ? 'Modifier le projet' : 'Ajouter un projet' }}
            </h3>
            <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
              <i class="fas fa-times"></i>
            </button>
          </div>
          
          <form @submit.prevent="saveProject" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Titre du projet</label>
                <input
                  v-model="form.title"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Statut</label>
                <select
                  v-model="form.status"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="completed">Terminé</option>
                  <option value="in_progress">En cours</option>
                  <option value="planned">Planifié</option>
                  <option value="archived">Archivé</option>
                </select>
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                v-model="form.description"
                rows="4"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              ></textarea>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Technologies utilisées (séparées par des virgules)
              </label>
              <input
                v-model="technologiesString"
                type="text"
                placeholder="React, Node.js, MongoDB, etc."
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">URL de démonstration</label>
                <input
                  v-model="form.demo_url"
                  type="url"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">URL GitHub</label>
                <input
                  v-model="form.github_url"
                  type="url"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">URL de l'image</label>
              <input
                v-model="form.image"
                type="url"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Date de début</label>
                <input
                  v-model="form.start_date"
                  type="date"
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
                {{ editingProject ? 'Modifier' : 'Ajouter' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'

interface Project {
  id: number
  title: string
  description: string
  technologies: string[]
  status: 'completed' | 'in_progress' | 'planned' | 'archived'
  demo_url?: string
  github_url?: string
  image?: string
  start_date?: string
  end_date?: string
}

export default defineComponent({
  name: 'AdminProjects',
  setup() {
    const projects = ref<Project[]>([])
    const showModal = ref(false)
    const editingProject = ref<Project | null>(null)
    const form = ref({
      title: '',
      description: '',
      technologies: [] as string[],
      status: 'completed' as Project['status'],
      demo_url: '',
      github_url: '',
      image: '',
      start_date: '',
      end_date: ''
    })
    
    const technologiesString = computed({
      get: () => form.value.technologies.join(', '),
      set: (value: string) => {
        form.value.technologies = value.split(',').map(tech => tech.trim()).filter(tech => tech)
      }
    })
    
    const loadProjects = async () => {
      // Simuler des données - à remplacer par un appel API
      projects.value = [
        {
          id: 1,
          title: 'Système de gestion de sécurité',
          description: 'Développement d\'un système complet de gestion de la sécurité informatique avec tableau de bord en temps réel.',
          technologies: ['Vue.js', 'Laravel', 'MySQL', 'Docker'],
          status: 'completed',
          demo_url: 'https://example.com/demo1',
          github_url: 'https://github.com/user/project1',
          image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=400',
          start_date: '2023-01-01',
          end_date: '2023-06-30'
        },
        {
          id: 2,
          title: 'Audit de sécurité automatisé',
          description: 'Outil d\'audit automatisé pour évaluer la sécurité des infrastructures réseau.',
          technologies: ['Python', 'Nmap', 'SQLite', 'Flask'],
          status: 'in_progress',
          github_url: 'https://github.com/user/project2',
          start_date: '2023-07-01'
        }
      ]
    }
    
    const getStatusClass = (status: string) => {
      switch (status) {
        case 'completed':
          return 'bg-green-100 text-green-800'
        case 'in_progress':
          return 'bg-blue-100 text-blue-800'
        case 'planned':
          return 'bg-yellow-100 text-yellow-800'
        case 'archived':
          return 'bg-gray-100 text-gray-800'
        default:
          return 'bg-gray-100 text-gray-800'
      }
    }
    
    const getStatusText = (status: string) => {
      switch (status) {
        case 'completed':
          return 'Terminé'
        case 'in_progress':
          return 'En cours'
        case 'planned':
          return 'Planifié'
        case 'archived':
          return 'Archivé'
        default:
          return 'Inconnu'
      }
    }
    
    const openModal = (project?: Project) => {
      if (project) {
        editingProject.value = project
        form.value = {
          title: project.title,
          description: project.description,
          technologies: [...project.technologies],
          status: project.status,
          demo_url: project.demo_url || '',
          github_url: project.github_url || '',
          image: project.image || '',
          start_date: project.start_date || '',
          end_date: project.end_date || ''
        }
      } else {
        editingProject.value = null
        form.value = {
          title: '',
          description: '',
          technologies: [],
          status: 'completed',
          demo_url: '',
          github_url: '',
          image: '',
          start_date: '',
          end_date: ''
        }
      }
      showModal.value = true
    }
    
    const closeModal = () => {
      showModal.value = false
      editingProject.value = null
    }
    
    const saveProject = async () => {
      if (editingProject.value) {
        // Mise à jour
        const index = projects.value.findIndex(proj => proj.id === editingProject.value!.id)
        if (index !== -1) {
          projects.value[index] = {
            ...projects.value[index],
            ...form.value,
            demo_url: form.value.demo_url || undefined,
            github_url: form.value.github_url || undefined,
            image: form.value.image || undefined,
            start_date: form.value.start_date || undefined,
            end_date: form.value.end_date || undefined
          }
        }
      } else {
        // Ajout
        const newProject: Project = {
          id: Date.now(),
          ...form.value,
          demo_url: form.value.demo_url || undefined,
          github_url: form.value.github_url || undefined,
          image: form.value.image || undefined,
          start_date: form.value.start_date || undefined,
          end_date: form.value.end_date || undefined
        }
        projects.value.push(newProject)
      }
      
      closeModal()
    }
    
    const deleteProject = async (id: number) => {
      if (confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
        projects.value = projects.value.filter(proj => proj.id !== id)
      }
    }
    
    onMounted(() => {
      loadProjects()
    })
    
    return {
      projects,
      showModal,
      editingProject,
      form,
      technologiesString,
      getStatusClass,
      getStatusText,
      openModal,
      closeModal,
      saveProject,
      deleteProject
    }
  }
})
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  /* -webkit-line-clamp: 3; */
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>