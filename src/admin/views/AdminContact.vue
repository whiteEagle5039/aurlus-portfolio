<template>
  <div class="space-y-6">
    <!-- Header avec statistiques -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="bg-white rounded-lg shadow p-4">
        <div class="flex items-center">
          <div class="p-2 bg-blue-100 rounded-lg">
            <i class="fas fa-envelope text-blue-600"></i>
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium text-gray-600">Total</p>
            <p class="text-xl font-semibold text-gray-900">{{ messages.length }}</p>
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-lg shadow p-4">
        <div class="flex items-center">
          <div class="p-2 bg-green-100 rounded-lg">
            <i class="fas fa-check text-green-600"></i>
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium text-gray-600">Lus</p>
            <p class="text-xl font-semibold text-gray-900">{{ readMessages }}</p>
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-lg shadow p-4">
        <div class="flex items-center">
          <div class="p-2 bg-yellow-100 rounded-lg">
            <i class="fas fa-clock text-yellow-600"></i>
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium text-gray-600">Non lus</p>
            <p class="text-xl font-semibold text-gray-900">{{ unreadMessages }}</p>
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-lg shadow p-4">
        <div class="flex items-center">
          <div class="p-2 bg-purple-100 rounded-lg">
            <i class="fas fa-star text-purple-600"></i>
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium text-gray-600">Importants</p>
            <p class="text-xl font-semibold text-gray-900">{{ importantMessages }}</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Filtres -->
    <div class="bg-white rounded-lg shadow p-4">
      <div class="flex flex-wrap gap-4 items-center">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Statut</label>
          <select
            v-model="filter.status"
            class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Tous</option>
            <option value="unread">Non lus</option>
            <option value="read">Lus</option>
            <option value="important">Importants</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Recherche</label>
          <input
            v-model="filter.search"
            type="text"
            placeholder="Rechercher..."
            class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
        </div>
        
        <div class="flex items-end">
          <button
            @click="markAllAsRead"
            class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            Marquer tout comme lu
          </button>
        </div>
      </div>
    </div>
    
    <!-- Liste des messages -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <input
                  type="checkbox"
                  @change="toggleSelectAll"
                  :checked="selectedMessages.length === filteredMessages.length && filteredMessages.length > 0"
                  class="rounded border-gray-300 text-green-600 focus:ring-green-500"
                >
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Expéditeur
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sujet
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
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
            <tr 
              v-for="message in filteredMessages" 
              :key="message.id"
              :class="{ 'bg-blue-50': !message.is_read }"
              class="hover:bg-gray-50"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <input
                  type="checkbox"
                  :value="message.id"
                  v-model="selectedMessages"
                  class="rounded border-gray-300 text-green-600 focus:ring-green-500"
                >
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <div class="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                      <i class="fas fa-user text-gray-600"></i>
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ message.name }}</div>
                    <div class="text-sm text-gray-500">{{ message.email }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm text-gray-900 font-medium">{{ message.subject }}</div>
                <div class="text-sm text-gray-500 truncate max-w-xs">{{ message.message }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(message.created_at) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center space-x-2">
                  <span 
                    v-if="!message.is_read"
                    class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800"
                  >
                    Non lu
                  </span>
                  <i 
                    v-if="message.is_important"
                    class="fas fa-star text-yellow-500"
                  ></i>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                <button
                  @click="viewMessage(message)"
                  class="text-indigo-600 hover:text-indigo-900"
                >
                  <i class="fas fa-eye"></i>
                </button>
                <button
                  @click="toggleImportant(message.id)"
                  :class="message.is_important ? 'text-yellow-500' : 'text-gray-400'"
                  class="hover:text-yellow-600"
                >
                  <i class="fas fa-star"></i>
                </button>
                <button
                  @click="deleteMessage(message.id)"
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
    
    <!-- Actions groupées -->
    <div v-if="selectedMessages.length > 0" class="bg-white rounded-lg shadow p-4">
      <div class="flex items-center justify-between">
        <span class="text-sm text-gray-600">
          {{ selectedMessages.length }} message(s) sélectionné(s)
        </span>
        <div class="flex space-x-2">
          <button
            @click="markSelectedAsRead"
            class="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
          >
            Marquer comme lu
          </button>
          <button
            @click="deleteSelected"
            class="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
    
    <!-- Modal de visualisation -->
    <div v-if="showModal && selectedMessage" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-lg font-medium text-gray-900">Message de {{ selectedMessage.name }}</h3>
            <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
              <i class="fas fa-times"></i>
            </button>
          </div>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">De :</label>
              <p class="text-sm text-gray-900">{{ selectedMessage.name }} ({{ selectedMessage.email }})</p>
            </div>
            
            <div v-if="selectedMessage.phone">
              <label class="block text-sm font-medium text-gray-700">Téléphone :</label>
              <p class="text-sm text-gray-900">{{ selectedMessage.phone }}</p>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700">Sujet :</label>
              <p class="text-sm text-gray-900">{{ selectedMessage.subject }}</p>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700">Date :</label>
              <p class="text-sm text-gray-900">{{ formatDate(selectedMessage.created_at) }}</p>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700">Message :</label>
              <div class="mt-2 p-4 bg-gray-50 rounded-lg">
                <p class="text-sm text-gray-900 whitespace-pre-wrap">{{ selectedMessage.message }}</p>
              </div>
            </div>
          </div>
          
          <div class="flex justify-end space-x-3 pt-6">
            <button
              @click="toggleImportant(selectedMessage.id)"
              :class="selectedMessage.is_important ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-gray-500 hover:bg-gray-600'"
              class="px-4 py-2 text-white rounded-md transition-colors"
            >
              <i class="fas fa-star mr-2"></i>
              {{ selectedMessage.is_important ? 'Retirer des importants' : 'Marquer comme important' }}
            </button>
            <button
              @click="closeModal"
              class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'

interface Message {
  id: number
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  is_read: boolean
  is_important: boolean
  created_at: string
}

export default defineComponent({
  name: 'AdminContact',
  setup() {
    const messages = ref<Message[]>([])
    const selectedMessages = ref<number[]>([])
    const showModal = ref(false)
    const selectedMessage = ref<Message | null>(null)
    const filter = ref({
      status: '',
      search: ''
    })
    
    const readMessages = computed(() => messages.value.filter(m => m.is_read).length)
    const unreadMessages = computed(() => messages.value.filter(m => !m.is_read).length)
    const importantMessages = computed(() => messages.value.filter(m => m.is_important).length)
    
    const filteredMessages = computed(() => {
      let filtered = messages.value
      
      // Filtrer par statut
      if (filter.value.status === 'read') {
        filtered = filtered.filter(m => m.is_read)
      } else if (filter.value.status === 'unread') {
        filtered = filtered.filter(m => !m.is_read)
      } else if (filter.value.status === 'important') {
        filtered = filtered.filter(m => m.is_important)
      }
      
      // Filtrer par recherche
      if (filter.value.search) {
        const search = filter.value.search.toLowerCase()
        filtered = filtered.filter(m => 
          m.name.toLowerCase().includes(search) ||
          m.email.toLowerCase().includes(search) ||
          m.subject.toLowerCase().includes(search) ||
          m.message.toLowerCase().includes(search)
        )
      }
      
      return filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    })
    
    const loadMessages = async () => {
      // Simuler des données - à remplacer par un appel API
      messages.value = [
        {
          id: 1,
          name: 'Jean Dupont',
          email: 'jean.dupont@email.com',
          phone: '+33 6 12 34 56 78',
          subject: 'Demande de collaboration',
          message: 'Bonjour,\n\nJe suis intéressé par vos services en cybersécurité. Pourriez-vous me contacter pour discuter d\'un projet ?\n\nCordialement,\nJean',
          is_read: false,
          is_important: false,
          created_at: '2024-01-15T10:30:00Z'
        },
        {
          id: 2,
          name: 'Marie Martin',
          email: 'marie.martin@entreprise.com',
          subject: 'Audit de sécurité',
          message: 'Nous aurions besoin d\'un audit de sécurité pour notre infrastructure. Pouvez-vous nous faire un devis ?',
          is_read: true,
          is_important: true,
          created_at: '2024-01-14T14:20:00Z'
        },
        {
          id: 3,
          name: 'Pierre Durand',
          email: 'p.durand@tech.fr',
          subject: 'Formation équipe',
          message: 'Bonjour, nous cherchons quelqu\'un pour former notre équipe IT aux bonnes pratiques de sécurité.',
          is_read: false,
          is_important: false,
          created_at: '2024-01-13T09:15:00Z'
        }
      ]
    }
    
    const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
    
    const viewMessage = (message: Message) => {
      selectedMessage.value = message
      showModal.value = true
      
      // Marquer comme lu
      if (!message.is_read) {
        message.is_read = true
      }
    }
    
    const closeModal = () => {
      showModal.value = false
      selectedMessage.value = null
    }
    
    const toggleImportant = (id: number) => {
      const message = messages.value.find(m => m.id === id)
      if (message) {
        message.is_important = !message.is_important
      }
    }
    
    const deleteMessage = (id: number) => {
      if (confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) {
        messages.value = messages.value.filter(m => m.id !== id)
        selectedMessages.value = selectedMessages.value.filter(msgId => msgId !== id)
      }
    }
    
    const toggleSelectAll = () => {
      if (selectedMessages.value.length === filteredMessages.value.length) {
        selectedMessages.value = []
      } else {
        selectedMessages.value = filteredMessages.value.map(m => m.id)
      }
    }
    
    const markAllAsRead = () => {
      messages.value.forEach(message => {
        message.is_read = true
      })
    }
    
    const markSelectedAsRead = () => {
      selectedMessages.value.forEach(id => {
        const message = messages.value.find(m => m.id === id)
        if (message) {
          message.is_read = true
        }
      })
      selectedMessages.value = []
    }
    
    const deleteSelected = () => {
      if (confirm(`Êtes-vous sûr de vouloir supprimer ${selectedMessages.value.length} message(s) ?`)) {
        messages.value = messages.value.filter(m => !selectedMessages.value.includes(m.id))
        selectedMessages.value = []
      }
    }
    
    onMounted(() => {
      loadMessages()
    })
    
    return {
      messages,
      selectedMessages,
      showModal,
      selectedMessage,
      filter,
      readMessages,
      unreadMessages,
      importantMessages,
      filteredMessages,
      formatDate,
      viewMessage,
      closeModal,
      toggleImportant,
      deleteMessage,
      toggleSelectAll,
      markAllAsRead,
      markSelectedAsRead,
      deleteSelected
    }
  }
})
</script>