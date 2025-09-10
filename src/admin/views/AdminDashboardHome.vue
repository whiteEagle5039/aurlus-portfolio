<template>
  <div class="space-y-6">
    <!-- Statistiques -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-2 bg-blue-100 rounded-lg">
            <i class="fas fa-briefcase text-blue-600"></i>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Expériences</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats.experiences }}</p>
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-2 bg-green-100 rounded-lg">
            <i class="fas fa-graduation-cap text-green-600"></i>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Formations</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats.education }}</p>
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-2 bg-yellow-100 rounded-lg">
            <i class="fas fa-certificate text-yellow-600"></i>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Certifications</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats.certifications }}</p>
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center">
          <div class="p-2 bg-purple-100 rounded-lg">
            <i class="fas fa-envelope text-purple-600"></i>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Messages</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats.messages }}</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Actions rapides -->
    <div class="bg-white rounded-lg shadow">
      <div class="p-6 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900">Actions rapides</h3>
      </div>
      <div class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <router-link
            to="/admin/experiences"
            class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <i class="fas fa-plus text-green-600 mr-3"></i>
            <span class="font-medium">Ajouter une expérience</span>
          </router-link>
          
          <router-link
            to="/admin/education"
            class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <i class="fas fa-plus text-blue-600 mr-3"></i>
            <span class="font-medium">Ajouter une formation</span>
          </router-link>
          
          <router-link
            to="/admin/certifications"
            class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <i class="fas fa-plus text-yellow-600 mr-3"></i>
            <span class="font-medium">Ajouter une certification</span>
          </router-link>
          
          <router-link
            to="/admin/projects"
            class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <i class="fas fa-plus text-purple-600 mr-3"></i>
            <span class="font-medium">Ajouter un projet</span>
          </router-link>
          
          <router-link
            to="/admin/languages"
            class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <i class="fas fa-plus text-indigo-600 mr-3"></i>
            <span class="font-medium">Ajouter une compétence</span>
          </router-link>
          
          <router-link
            to="/admin/contact"
            class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <i class="fas fa-eye text-gray-600 mr-3"></i>
            <span class="font-medium">Voir les messages</span>
          </router-link>
        </div>
      </div>
    </div>
    
    <!-- Activité récente -->
    <div class="bg-white rounded-lg shadow">
      <div class="p-6 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900">Activité récente</h3>
      </div>
      <div class="p-6">
        <div class="space-y-4">
          <div class="flex items-center">
            <div class="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
            <span class="text-sm text-gray-600">Nouveau message reçu il y a 2 heures</span>
          </div>
          <div class="flex items-center">
            <div class="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
            <span class="text-sm text-gray-600">Expérience mise à jour il y a 1 jour</span>
          </div>
          <div class="flex items-center">
            <div class="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
            <span class="text-sm text-gray-600">Nouvelle certification ajoutée il y a 3 jours</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'

export default defineComponent({
  name: 'AdminDashboardHome',
  setup() {
    const stats = ref({
      experiences: 0,
      education: 0,
      certifications: 0,
      messages: 0
    })
    
    onMounted(() => {
      // Simuler le chargement des statistiques
      // À remplacer par des appels API réels
      stats.value = {
        experiences: 3,
        education: 6,
        certifications: 25,
        messages: 12
      }
    })
    
    return {
      stats
    }
  }
})
</script>