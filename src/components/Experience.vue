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
    
    <div class="space-y-8">
      <!-- Experience Card 1 -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-102 hover:shadow-xl">
        <div class="flex flex-col md:flex-row">
          <!-- Icon Column -->
          <div class="bg-green-500 text-white p-6 flex items-center justify-center md:w-24">
            <font-awesome-icon icon="fa-solid fa-shield-alt" class="text-3xl" />
          </div>
          
          <!-- Content Column -->
          <div class="flex-1 p-6">
            <div class="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
              <div>
                <h3 class="text-xl font-bold">{{ $t('experience.job1.title') }}</h3>
                <h4 class="text-green-500 font-semibold">{{ $t('experience.job1.company') }}</h4>
              </div>
              <span class="inline-block bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm font-semibold py-1 px-3 rounded-full mt-2 md:mt-0">
                {{ $t('experience.job1.duration') }}
              </span>
            </div>
            
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              {{ $t('experience.job1.description') }}
            </p>
            
            <!-- Expandable Content -->
            <details class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
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
        </div>
      </div>
      
      <!-- Experience Card 2 -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-102 hover:shadow-xl">
        <div class="flex flex-col md:flex-row">
          <!-- Icon Column -->
          <div class="bg-green-500 text-white p-6 flex items-center justify-center md:w-24">
            <font-awesome-icon icon="fa-solid fa-network-wired" class="text-3xl" />
          </div>
          
          <!-- Content Column -->
          <div class="flex-1 p-6">
            <div class="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
              <div>
                <h3 class="text-xl font-bold">{{ $t('experience.job2.title') }}</h3>
                <h4 class="text-green-500 font-semibold">{{ $t('experience.job2.company') }}</h4>
              </div>
              <span class="inline-block bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm font-semibold py-1 px-3 rounded-full mt-2 md:mt-0">
                {{ $t('experience.job2.duration') }}
              </span>
            </div>
            
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              {{ $t('experience.job2.description') }}
            </p>
            
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
      </div>
      
      <!-- Experience Card 3 -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-102 hover:shadow-xl">
        <div class="flex flex-col md:flex-row">
          <!-- Icon Column -->
          <div class="bg-green-500 text-white p-6 flex items-center justify-center md:w-24">
            <font-awesome-icon icon="fa-solid fa-server" class="text-3xl" />
          </div>
          
          <!-- Content Column -->
          <div class="flex-1 p-6">
            <div class="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
              <div>
                <h3 class="text-xl font-bold">{{ $t('experience.job3.title') }}</h3>
                <h4 class="text-green-500 font-semibold">{{ $t('experience.job3.company') }}</h4>
              </div>
              <span class="inline-block bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm font-semibold py-1 px-3 rounded-full mt-2 md:mt-0">
                {{ $t('experience.job3.duration') }}
              </span>
            </div>
            
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              {{ $t('experience.job3.description') }}
            </p>
            
            <!-- Expandable Content -->
            <details class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <summary class="font-medium cursor-pointer">{{ $t('experience.viewDetails') }}</summary>
              <ul class="mt-3 space-y-2 list-disc pl-5 text-gray-700 dark:text-gray-300">
                <li>{{ $t('experience.job3.responsibilities.0') }}</li>
                <li>{{ $t('experience.job3.responsibilities.1') }}</li>
                <li>{{ $t('experience.job3.responsibilities.2') }}</li>
                <li>{{ $t('experience.job3.responsibilities.3') }}</li>
              </ul>
            </details>
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
  