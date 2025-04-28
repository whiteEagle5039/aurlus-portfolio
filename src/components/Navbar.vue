<template>
    <nav class="fixed w-full z-50 bg-white dark:bg-gray-800 shadow-md transition-colors duration-300">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <div class="text-2xl font-bold text-yellow-500">
            Portfolio
          </div>
  
          <!-- Desktop Menu -->
          <div class="hidden md:flex space-x-8">
            <a 
              v-for="item in navItems" 
              :key="item.id"
              :href="`#${item.id}`"
              :class="[
                'transition-colors duration-300 hover:text-yellow-500', 
                activeSection === item.id ? 'text-yellow-500 font-bold' : 'text-gray-700 dark:text-gray-300'
              ]"
              @click="setActiveSection(item.id)"
            >
              {{ item.label }}
            </a>
          </div>
  
          <!-- Toggle buttons -->
          <div class="flex items-center space-x-4">
            <!-- Language Toggle -->
            <button class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300">
              <font-awesome-icon icon="fa-solid fa-language" class="text-gray-700 dark:text-gray-300" />
            </button>
            
            <!-- Dark Mode Toggle -->
            <button 
              @click="$emit('toggle-dark-mode')" 
              class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
            >
              <font-awesome-icon 
                :icon="isDarkMode ? 'fa-solid fa-sun' : 'fa-solid fa-moon'" 
                class="text-gray-700 dark:text-gray-300" 
              />
            </button>
            
            <!-- Mobile Menu Button -->
            <div class="md:hidden">
              <button 
                @click="isMobileMenuOpen = !isMobileMenuOpen"
                class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
              >
                <font-awesome-icon 
                  :icon="isMobileMenuOpen ? 'fa-solid fa-times' : 'fa-solid fa-bars'" 
                  class="text-gray-700 dark:text-gray-300" 
                />
              </button>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Mobile Menu -->
      <div 
        v-if="isMobileMenuOpen" 
        class="md:hidden bg-white dark:bg-gray-800 shadow-lg transition-all duration-300"
      >
        <div class="container mx-auto px-4 py-3">
          <div class="flex flex-col space-y-4">
            <a 
              v-for="item in navItems" 
              :key="item.id"
              :href="`#${item.id}`"
              :class="[
                'p-2 rounded transition-colors duration-300 hover:bg-gray-200 dark:hover:bg-gray-700', 
                activeSection === item.id ? 'text-yellow-500 font-bold' : 'text-gray-700 dark:text-gray-300'
              ]"
              @click="mobileMenuClick(item.id)"
            >
              {{ item.label }}
            </a>
          </div>
        </div>
      </div>
    </nav>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  
  export default defineComponent({
    name: 'Navbar',
    props: {
      isDarkMode: {
        type: Boolean,
        required: true
      },
      activeSection: {
        type: String,
        required: true
      }
    },
    emits: ['toggle-dark-mode', 'set-active-section'],
    setup(props, { emit }) {
      const isMobileMenuOpen = ref(false);
  
      const navItems = [
        { id: 'home', label: 'Home' },
        { id: 'about', label: 'About' },
        { id: 'experience', label: 'Experience' },
        { id: 'education', label: 'Education' },
        { id: 'languages', label: 'Languages' },
        { id: 'contact', label: 'Contact' }
      ];
  
      const mobileMenuClick = (id: string) => {
        emit('set-active-section', id);
        isMobileMenuOpen.value = false;
      };
  
      const setActiveSection = (id: string) => {
        emit('set-active-section', id);
      };
  
      return {
        isMobileMenuOpen,
        navItems,
        mobileMenuClick,
        setActiveSection
      };
    }
  });
  </script>