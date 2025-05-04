<template>
<section 
  id="experience" 
  ref="sectionRef"
  class="py-20 px-4"
>
  <div class="container mx-auto">
    <h2 class="text-3xl md:text-4xl font-bold mb-12 text-center bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-lg inline-block">
      {{ $t('experience.title') }} <span class="text-green-500">{{ $t('experience.professional') }}</span>
    </h2>
    
    <div class="relative">
      <!-- Timeline center line -->
      <div class="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-300 dark:bg-gray-700"></div>
      
      <!-- Timeline items -->
      <div class="space-y-16 md:space-y-16">
        <!-- Item 1 -->
        <div class="relative flex flex-col md:flex-row items-center md:justify-between">
          <!-- Left Side (odd) -->
          <div class="w-full md:w-5/12 mb-8 md:mb-0 md:pr-8 md:text-right order-2 md:order-1">
            <h3 class="text-xl font-bold mb-2">{{ $t('experience.job1.title') }}</h3>
            <h4 class="text-green-500 font-semibold mb-3">{{ $t('experience.job1.company') }}</h4>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              {{ $t('experience.job1.description') }}
            </p>
            <span class="inline-block bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm font-semibold py-1 px-3 rounded-full mb-4">
              {{ $t('experience.job1.duration') }}
            </span>
            
            <!-- Expandable Content -->
            <details class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-left">
              <summary class="font-medium cursor-pointer">{{ $t('experience.viewDetails') }}</summary>
              <ul class="mt-3 space-y-2 list-disc pl-5 text-gray-700 dark:text-gray-300">
                <li>{{ $t('experience.job1.responsibilities.0') }}</li>
                <li>{{ $t('experience.job1.responsibilities.1') }}</li>
                <li>{{ $t('experience.job1.responsibilities.2') }}</li>
                <li>{{ $t('experience.job1.responsibilities.3') }}</li>
                <li>{{ $t('experience.job1.responsibilities.4') }}</li>
                <li>{{ $t('experience.job1.responsibilities.5') }}</li>
                <li>{{ $t('experience.job1.responsibilities.6') }}</li>
              </ul>
            </details>
          </div>
          
          <!-- Visible only from md (768px) -->
          <div class="hidden md:absolute md:left-1/2 md:transform md:-translate-x-1/2 md:w-10 md:h-10 md:rounded-full md:bg-green-500 md:flex md:items-center md:justify-center z-10 order-1 md:order-2">
            <font-awesome-icon icon="fa-solid fa-shield-alt" class="text-black" />
          </div>
          
          <!-- Right Side (empty for first item) -->
          <div class="w-full md:w-5/12 md:pl-8 hidden md:block order-3">
          </div>
        </div>
        
        <!-- Item 2 -->
        <div class="relative flex flex-col md:flex-row items-center md:justify-between mt-12">
          <!-- Left Side (empty for second item) -->
          <div class="w-full md:w-5/12 md:pr-8 hidden md:block order-1">
          </div>
          
          <!-- Circle Indicator -->
          <div class="hidden md:absolute md:left-1/2 md:transform md:-translate-x-1/2 md:w-10 md:h-10 md:rounded-full md:bg-green-500 md:flex md:items-center md:justify-center z-10 order-1 md:order-2">
            <font-awesome-icon icon="fa-solid fa-network-wired" class="text-black" />
          </div>
          
          <!-- Right Side (even) -->
          <div class="w-full md:w-5/12 mb-8 md:mb-0 md:pl-8 order-2 md:order-3">
            <h3 class="text-xl font-bold mb-2">{{ $t('experience.job2.title') }}</h3>
            <h4 class="text-green-500 font-semibold mb-3">{{ $t('experience.job2.company') }}</h4>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              {{ $t('experience.job2.description') }}
            </p>
            <span class="inline-block bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm font-semibold py-1 px-3 rounded-full mb-4">
              {{ $t('experience.job2.duration') }}
            </span>
            
            <!-- Expandable Content -->
            <details class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <summary class="font-medium cursor-pointer">{{ $t('experience.viewDetails') }}</summary>
              <ul class="mt-3 space-y-2 list-disc pl-5 text-gray-700 dark:text-gray-300">
                <li>{{ $t('experience.job2.responsibilities.0') }}</li>
                <li>{{ $t('experience.job2.responsibilities.1') }}</li>
                <li>{{ $t('experience.job2.responsibilities.2') }}</li>
                <li>{{ $t('experience.job2.responsibilities.3') }}</li>
                <li>{{ $t('experience.job2.responsibilities.4') }}</li>
                <li>{{ $t('experience.job2.responsibilities.5') }}</li>
                <li>{{ $t('experience.job2.responsibilities.6') }}</li>
              </ul>
            </details>
          </div>
        </div>
        
        <!-- Item 3 -->
        <div class="relative flex flex-col md:flex-row items-center md:justify-between mt-12">
          <!-- Left Side (odd) -->
          <div class="w-full md:w-5/12 mb-8 md:mb-0 md:pr-8 md:text-right order-2 md:order-1">
            <h3 class="text-xl font-bold mb-2">{{ $t('experience.job3.title') }}</h3>
            <h4 class="text-green-500 font-semibold mb-3">{{ $t('experience.job3.company') }}</h4>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              {{ $t('experience.job3.description') }}
            </p>
            <span class="inline-block bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm font-semibold py-1 px-3 rounded-full mb-4">
              {{ $t('experience.job3.duration') }}
            </span>
            
            <!-- Expandable Content -->
            <details class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-left">
              <summary class="font-medium cursor-pointer">{{ $t('experience.viewDetails') }}</summary>
              <ul class="mt-3 space-y-2 list-disc pl-5 text-gray-700 dark:text-gray-300">
                <li>{{ $t('experience.job3.responsibilities.0') }}</li>
                <li>{{ $t('experience.job3.responsibilities.1') }}</li>
                <li>{{ $t('experience.job3.responsibilities.2') }}</li>
                <li>{{ $t('experience.job3.responsibilities.3') }}</li>
              </ul>
            </details>
          </div>
          
          <!-- Circle Indicator -->
          <div class="hidden md:absolute md:left-1/2 md:transform md:-translate-x-1/2 md:w-10 md:h-10 md:rounded-full md:bg-green-500 md:flex md:items-center md:justify-center z-10 order-1 md:order-2">
            <font-awesome-icon icon="fa-solid fa-server" class="text-black" />
          </div>
          
          <!-- Right Side (empty for third item) -->
          <div class="w-full md:w-5/12 md:pl-8 hidden md:block order-3">
          </div>
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
    name: 'ExperienceSection',
    emits: ['observe'],
    setup(props, { emit }) {
      const { t } = useI18n();
      const sectionRef = ref<HTMLElement | null>(null);
      
      onMounted(() => {
        const observer = new IntersectionObserver(
          ([entry]) => {
            emit('observe', 'experience', entry.isIntersecting);
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
  