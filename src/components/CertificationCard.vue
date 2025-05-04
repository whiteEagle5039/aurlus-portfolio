<template>
    <div class="bg-white dark:bg-gray-900 p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-300">
      <div class="flex items-center justify-center mb-2">
        <span class="text-green-500 text-3xl">
          <font-awesome-icon :icon="`fa-solid ${icon}`" />
        </span>
      </div>
      <h3 class="text-lg font-bold mb-1 text-center">{{ title }}</h3>
      <p class="text-gray-600 dark:text-gray-300 text-sm text-center">
        {{ description }}
      </p>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'CertificationCard',
    props: {
      title: {
        type: String,
        required: true
      },
      description: {
        type: String,
        default: ''
      },
      icon: {
        type: String,
        default: 'fa-certificate'
      }
    }
  });
  </script>