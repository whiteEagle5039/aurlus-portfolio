<template>
  <div class="flex h-screen bg-gray-50">
    <!-- Sidebar -->
    <AdminSidebar />
    
    <!-- Main Content Area -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Header -->
      <AdminHeader />
      
      <!-- Page Content -->
      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
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