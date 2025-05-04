<template>
<section 
  id="education" 
  ref="sectionRef"
  class="py-20 px-4 bg-gray-100 dark:bg-gray-800"
>
  <div class="container mx-auto">
    <h2 class="text-3xl md:text-4xl font-bold mb-12 text-center bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-lg inline-block">
      {{ $t('education.title') }} <span class="text-green-500">{{ $t('education.academicPath') }}</span>
    </h2>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Master en cours -->
      <div class="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <div class="flex items-center mb-4">
          <div class="bg-green-500 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
            <font-awesome-icon icon="fa-solid fa-graduation-cap" class="text-black text-xl" />
          </div>
          <div>
            <h3 class="font-bold text-lg">{{ $t('education.master.degree') }}</h3>
            <span class="text-green-500">{{ $t('education.master.specialty') }}</span>
          </div>
        </div>
        <div class="mb-4">
          <p class="text-gray-700 dark:text-gray-300">
            {{ $t('education.master.institution') }}
          </p>
          <p class="text-gray-500 dark:text-gray-400 text-sm">
            {{ $t('education.master.duration') }}
          </p>
        </div>
      </div>

      <!-- DESS -->
      <div class="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <div class="flex items-center mb-4">
          <div class="bg-green-500 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
            <font-awesome-icon icon="fa-solid fa-certificate" class="text-black text-xl" />
          </div>
          <div>
            <h3 class="font-bold text-lg">{{ $t('education.dess.degree') }}</h3>
            <span class="text-green-500">{{ $t('education.dess.specialty') }}</span>
          </div>
        </div>
        <div class="mb-4">
          <p class="text-gray-700 dark:text-gray-300">
            {{ $t('education.dess.institution') }}
          </p>
          <p class="text-gray-500 dark:text-gray-400 text-sm">
            {{ $t('education.dess.duration') }}
          </p>
        </div>
      </div>

      <!-- Licence Droit -->
      <div class="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <div class="flex items-center mb-4">
          <div class="bg-green-500 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
            <font-awesome-icon icon="fa-solid fa-graduation-cap" class="text-black text-xl" />
          </div>
          <div>
            <h3 class="font-bold text-lg">{{ $t('education.lawLicence.degree') }}</h3>
            <span class="text-green-500">{{ $t('education.lawLicence.specialty') }}</span>
          </div>
        </div>
        <div class="mb-4">
          <p class="text-gray-700 dark:text-gray-300">
            {{ $t('education.lawLicence.institution') }}
          </p>
          <p class="text-gray-500 dark:text-gray-400 text-sm">
            {{ $t('education.lawLicence.duration') }}
          </p>
        </div>
      </div>

      <!-- Ingénieur EAMAC -->
      <div class="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <div class="flex items-center mb-4">
          <div class="bg-green-500 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
            <font-awesome-icon icon="fa-solid fa-user-graduate" class="text-black text-xl" />
          </div>
          <div>
            <h3 class="font-bold text-lg">{{ $t('education.engineering.degree') }}</h3>
            <span class="text-green-500">{{ $t('education.engineering.specialty') }}</span>
          </div>
        </div>
        <div class="mb-4">
          <p class="text-gray-700 dark:text-gray-300">
            {{ $t('education.engineering.institution') }}
          </p>
          <p class="text-gray-500 dark:text-gray-400 text-sm">
            {{ $t('education.engineering.duration') }}
          </p>
        </div>
      </div>

      <!-- Licence ENS -->
      <div class="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <div class="flex items-center mb-4">
          <div class="bg-green-500 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
            <font-awesome-icon icon="fa-solid fa-graduation-cap" class="text-black text-xl" />
          </div>
          <div>
            <h3 class="font-bold text-lg">{{ $t('education.proLicence.degree') }}</h3>
            <span class="text-green-500">{{ $t('education.proLicence.specialty') }}</span>
          </div>
        </div>
        <div class="mb-4">
          <p class="text-gray-700 dark:text-gray-300">
            {{ $t('education.proLicence.institution') }}
          </p>
          <p class="text-gray-500 dark:text-gray-400 text-sm">
            {{ $t('education.proLicence.duration') }}
          </p>
        </div>
      </div>

      <!-- Baccalauréats -->
      <div class="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <div class="flex items-center mb-4">
          <div class="bg-green-500 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
            <font-awesome-icon icon="fa-solid fa-school" class="text-black text-xl" />
          </div>
          <div>
            <h3 class="font-bold text-lg">{{ $t('education.baccalaureate.degree') }}</h3>
            <span class="text-green-500">{{ $t('education.baccalaureate.specialty') }}</span>
          </div>
        </div>
        <div class="mb-4">
          <p class="text-gray-700 dark:text-gray-300">
            {{ $t('education.baccalaureate.institution') }}
          </p>
          <p class="text-gray-500 dark:text-gray-400 text-sm">
            {{ $t('education.baccalaureate.duration') }}
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
  import { useI18n } from 'vue-i18n';
  
  export default defineComponent({
    name: 'EducationSection',
    emits: ['observe'],
    setup(props, { emit }) {
      const { t } = useI18n();
      const sectionRef = ref<HTMLElement | null>(null);
      
      onMounted(() => {
        const observer = new IntersectionObserver(
          ([entry]) => {
            emit('observe', 'education', entry.isIntersecting);
          },
          { threshold: 0.3 }
        );
        
        if (sectionRef.value) {
          observer.observe(sectionRef.value);
        }
        
        onUnmounted(() => {
          if (sectionRef.value) {
            observer.unobserve(sectionRef.value);
          }
        });
      });
      
      return {
        sectionRef
      };
    }
  });
  </script>