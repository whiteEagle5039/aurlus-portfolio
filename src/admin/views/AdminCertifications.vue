<template>
  <div class="space-y-6">
    <!-- Header avec bouton d'ajout -->
    <div class="flex justify-between items-center">
      <div>
        <h3 class="text-lg font-medium text-gray-900">Liste des certifications</h3>
        <p class="text-sm text-gray-600">Gérez vos certifications professionnelles</p>
      </div>
      <button
        @click="openModal()"
        class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
      >
        <i class="fas fa-plus"></i>
        <span>Ajouter une certification</span>
      </button>
    </div>
    
    <!-- Liste des certifications -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Certification
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Organisme
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date d'obtention
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
            <tr v-for="certification in certifications" :key="certification.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ certification.name }}</div>
                <div class="text-sm text-gray-500">{{ certification.description }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ certification.issuer }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ formatDate(certification.issue_date) }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span 
                  :class="getStatusClass(certification.status)"
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                >
                  {{ getStatusText(certification.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                <button
                  @click="openModal(certification)"
                  class="text-indigo-600 hover:text-indigo-900"
                >
                  <i class="fas fa-edit"></i>
                </button>
                <button
                  @click="deleteCertification(certification.id)"
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
              {{ editingCertification ? 'Modifier la certification' : 'Ajouter une certification' }}
            </h3>
            <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
              <i class="fas fa-times"></i>
            </button>
          </div>
          
          <form @submit.prevent="saveCertification" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Nom de la certification</label>
              <input
                v-model="form.name"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <input
                v-model="form.description"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Organisme émetteur</label>
              <input
                v-model="form.issuer"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Date d'obtention</label>
                <input
                  v-model="form.issue_date"
                  type="date"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Date d'expiration</label>
                <input
                  v-model="form.expiry_date"
                  type="date"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
              </div>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Statut</label>
              <select
                v-model="form.status"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="active">Active</option>
                <option value="expired">Expirée</option>
                <option value="pending">En cours</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">URL du certificat</label>
              <input
                v-model="form.credential_url"
                type="url"
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
                {{ editingCertification ? 'Modifier' : 'Ajouter' }}
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

interface Certification {
  id: number
  name: string
  description: string
  issuer: string
  issue_date: string
  expiry_date: string | null
  status: 'active' | 'expired' | 'pending'
  credential_url: string | null
}

export default defineComponent({
  name: 'AdminCertifications',
  setup() {
    const certifications = ref<Certification[]>([])
    const showModal = ref(false)
    const editingCertification = ref<Certification | null>(null)
    const form = ref({
      name: '',
      description: '',
      issuer: '',
      issue_date: '',
      expiry_date: '',
      status: 'active' as 'active' | 'expired' | 'pending',
      credential_url: ''
    })
    
    const loadCertifications = async () => {
      // Simuler des données - à remplacer par un appel API
      certifications.value = [
        {
          id: 1,
          name: 'CISSP',
          description: 'Certified Information Systems Security Professional',
          issuer: '(ISC)²',
          issue_date: '2023-01-15',
          expiry_date: '2026-01-15',
          status: 'active',
          credential_url: 'https://example.com/cert1'
        },
        {
          id: 2,
          name: 'CISM',
          description: 'Certified Information Security Manager',
          issuer: 'ISACA',
          issue_date: '2022-06-10',
          expiry_date: '2025-06-10',
          status: 'active',
          credential_url: null
        }
      ]
    }
    
    const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString('fr-FR')
    }
    
    const getStatusClass = (status: string) => {
      switch (status) {
        case 'active':
          return 'bg-green-100 text-green-800'
        case 'expired':
          return 'bg-red-100 text-red-800'
        case 'pending':
          return 'bg-yellow-100 text-yellow-800'
        default:
          return 'bg-gray-100 text-gray-800'
      }
    }
    
    const getStatusText = (status: string) => {
      switch (status) {
        case 'active':
          return 'Active'
        case 'expired':
          return 'Expirée'
        case 'pending':
          return 'En cours'
        default:
          return 'Inconnu'
      }
    }
    
    const openModal = (certification?: Certification) => {
      if (certification) {
        editingCertification.value = certification
        form.value = {
          name: certification.name,
          description: certification.description,
          issuer: certification.issuer,
          issue_date: certification.issue_date,
          expiry_date: certification.expiry_date || '',
          status: certification.status,
          credential_url: certification.credential_url || ''
        }
      } else {
        editingCertification.value = null
        form.value = {
          name: '',
          description: '',
          issuer: '',
          issue_date: '',
          expiry_date: '',
          status: 'active',
          credential_url: ''
        }
      }
      showModal.value = true
    }
    
    const closeModal = () => {
      showModal.value = false
      editingCertification.value = null
    }
    
    const saveCertification = async () => {
      if (editingCertification.value) {
        // Mise à jour
        const index = certifications.value.findIndex(cert => cert.id === editingCertification.value!.id)
        if (index !== -1) {
          certifications.value[index] = {
            ...certifications.value[index],
            ...form.value,
            expiry_date: form.value.expiry_date || null,
            credential_url: form.value.credential_url || null
          }
        }
      } else {
        // Ajout
        const newCertification: Certification = {
          id: Date.now(),
          ...form.value,
          expiry_date: form.value.expiry_date || null,
          credential_url: form.value.credential_url || null
        }
        certifications.value.push(newCertification)
      }
      
      closeModal()
    }
    
    const deleteCertification = async (id: number) => {
      if (confirm('Êtes-vous sûr de vouloir supprimer cette certification ?')) {
        certifications.value = certifications.value.filter(cert => cert.id !== id)
      }
    }
    
    onMounted(() => {
      loadCertifications()
    })
    
    return {
      certifications,
      showModal,
      editingCertification,
      form,
      formatDate,
      getStatusClass,
      getStatusText,
      openModal,
      closeModal,
      saveCertification,
      deleteCertification
    }
  }
})
</script>