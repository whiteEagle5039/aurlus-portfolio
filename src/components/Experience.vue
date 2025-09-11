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
    
    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
    </div>
    
    <!-- Error State -->
    <div v-else-if="error" class="text-center py-12">
      <div class="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-200 px-4 py-3 rounded mb-4">
        {{ error }}
      </div>
      <button 
        @click="fetchExperiences" 
        class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors"
      >
        {{ $t('common.retry') }}
      </button>
    </div>
    
    <!-- Experiences List -->
    <div v-else class="space-y-8">
      <div 
        v-for="experience in experiences" 
        :key="experience.id"
        class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-102 hover:shadow-xl"
      >
        <div class="flex flex-col md:flex-row">
          <!-- Icon Column -->
          <div class="bg-green-500 text-white p-6 flex items-center justify-center md:w-24">
            <font-awesome-icon 
              :icon="getExperienceIcon(experience.title)" 
              class="text-3xl" 
            />
          </div>
          
          <!-- Content Column -->
          <div class="flex-1 p-6">
            <div class="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
              <div>
                <h3 class="text-xl font-bold">{{ experience.title }}</h3>
                <h4 class="text-green-500 font-semibold">{{ experience.company }}</h4>
                <p v-if="experience.location" class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  <font-awesome-icon icon="fa-solid fa-map-marker-alt" class="mr-1" />
                  {{ experience.location }}
                </p>
              </div>
              <span class="inline-block bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm font-semibold py-1 px-3 rounded-full mt-2 md:mt-0">
                {{ experience.duration }}
                <span v-if="experience.is_current" class="ml-1 text-green-600 dark:text-green-300">
                  • {{ $t('common.current') }}
                </span>
              </span>
            </div>
            
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              {{ experience.description }}
            </p>
            
            <!-- Skills Tags -->
            <div v-if="experience.skills && experience.skills.length > 0" class="mb-4">
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="skill in experience.skills" 
                  :key="skill"
                  class="inline-block bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs px-2 py-1 rounded-full"
                >
                  {{ skill }}
                </span>
              </div>
            </div>
            
            <!-- Expandable Content (if you have detailed responsibilities) -->
            <details v-if="experience.responsibilities && experience.responsibilities.length > 0" class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <summary class="font-medium cursor-pointer">{{ $t('experience.viewDetails') }}</summary>
              <ul class="mt-3 space-y-2 list-disc pl-5 text-gray-700 dark:text-gray-300">
                <li v-for="responsibility in experience.responsibilities" :key="responsibility">
                  {{ responsibility }}
                </li>
              </ul>
            </details>
          </div>
        </div>
      </div>
      
      <!-- Empty State -->
      <div v-if="!loading && experiences.length === 0" class="text-center py-12">
        <div class="text-gray-500 dark:text-gray-400">
          {{ $t('experience.noExperiences') }}
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script lang="ts">
import { API_ENDPOINT } from '@/config/global';
import { defineComponent, ref, onMounted, onUnmounted, computed } from 'vue';
import { useI18n } from 'vue-i18n';

interface Experience {
  id: number;
  title: string;
  company: string;
  description: string;
  start_date: string;
  end_date: string | null;
  duration: string;
  location: string | null;
  skills: string[];
  is_current: boolean;
  responsibilities?: string[];
}

export default defineComponent({
  name: 'ExperienceSection',
  emits: ['observe'],
  setup(props, { emit }) {
    const { t, locale } = useI18n();
    const sectionRef = ref<HTMLElement | null>(null);
    const experiences = ref<Experience[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);

    // API Configuration
    const API_BASE_URL = "http://127.0.0.1:8000/api/";
    
    // Icon mapping based on job titles/companies
    const getExperienceIcon = (title: string): string => {
      const titleLower = title.toLowerCase();
      
      if (titleLower.includes('security') || titleLower.includes('sécurité')) {
        return 'fa-solid fa-shield-alt';
      } else if (titleLower.includes('network') || titleLower.includes('réseau')) {
        return 'fa-solid fa-network-wired';
      } else if (titleLower.includes('system') || titleLower.includes('server') || titleLower.includes('serveur')) {
        return 'fa-solid fa-server';
      } else if (titleLower.includes('developer') || titleLower.includes('développeur')) {
        return 'fa-solid fa-code';
      } else if (titleLower.includes('manager') || titleLower.includes('chef')) {
        return 'fa-solid fa-users';
      } else {
        return 'fa-solid fa-briefcase';
      }
    };

    // Fetch experiences from API
    const fetchExperiences = async () => {
      loading.value = true;
      error.value = null;
      
      try {
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINT.portfolioExperiences}?locale=${locale.value}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success) {
          experiences.value = data.data;
        } else {
          throw new Error(data.message || 'Failed to fetch experiences');
        }
        
      } catch (err) {
        console.error('Error fetching experiences:', err);
        error.value = err instanceof Error ? err.message : t('common.errorLoadingData');
      } finally {
        loading.value = false;
      }
    };

    // Watch for locale changes to refetch data
    const currentLocale = computed(() => locale.value);
    
    onMounted(() => {
      // Fetch experiences on component mount
      fetchExperiences();
      
      // Watch for locale changes
      const unwatchLocale = computed(() => locale.value);
      let previousLocale = locale.value;
      
      const checkLocaleChange = () => {
        if (locale.value !== previousLocale) {
          previousLocale = locale.value;
          fetchExperiences();
        }
      };
      
      const interval = setInterval(checkLocaleChange, 500);
      
      // Intersection Observer for section visibility
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
        clearInterval(interval);
      });
    });
    
    return {
      sectionRef,
      experiences,
      loading,
      error,
      fetchExperiences,
      getExperienceIcon
    };
  }
});
</script>

<style scoped>
/* Styles pour les animations de chargement */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Amélioration des détails expandables */
details > summary {
  list-style: none;
  position: relative;
  padding-right: 20px;
}

details > summary::-webkit-details-marker {
  display: none;
}

details > summary::after {
  content: '+';
  position: absolute;
  right: 0;
  top: 0;
  font-weight: bold;
  transition: transform 0.2s ease;
}

details[open] > summary::after {
  transform: rotate(45deg);
}

/* Amélioration du hover effect */
.hover\:scale-102:hover {
  transform: scale(1.02);
}
</style>