<template>
  <div class="flex min-h-screen bg-gray-50">
    <AdminSidebar />
    
    <div class="flex-1 flex flex-col">
      <AdminHeader />
      
      <main class="flex-1 p-6">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AdminSidebar from '../admin/components/AdminSideBar.vue'
import AdminHeader from '../admin/components/AdminHeader.vue'

// Vous pouvez ajouter ici d'autres logiques globales pour l'admin
// comme la gestion des permissions, notifications, etc.

onMounted(() => {
  // Logique d'initialisation si nécessaire
  console.log('Admin layout mounted')
})
</script>