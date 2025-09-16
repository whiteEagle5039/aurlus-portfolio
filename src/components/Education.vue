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
        @click="fetchEducations" 
        class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors"
      >
        {{ $t('common.retry') }}
      </button>
    </div>
    
    <!-- Education Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div 
        v-for="education in educations" 
        :key="education.id"
        class="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
      >
        <div class="flex items-center mb-4">
          <div class="bg-green-500 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
            <font-awesome-icon 
              :icon="getEducationIcon(education.degree, education.specialty)" 
              class="text-black text-xl" 
            />
          </div>
          <div class="flex-1">
            <h3 class="font-bold text-lg">{{ education.degree }}</h3>
            <span v-if="education.specialty" class="text-green-500">{{ education.specialty }}</span>
            <div v-if="education.is_current" class="inline-flex items-center mt-1">
              <span class="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                {{ $t('common.current') }}
              </span>
            </div>
          </div>
        </div>
        
        <div class="mb-4">
          <p class="text-gray-700 dark:text-gray-300 font-medium">
            {{ education.institution }}
          </p>
          <p class="text-gray-500 dark:text-gray-400 text-sm">
            {{ education.duration }}
          </p>
        </div>
        
        <!-- Description if available -->
        <div v-if="education.description" class="mt-4">
          <p class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            {{ education.description }}
          </p>
        </div>
        
        <!-- Years display -->
        <div class="mt-4 flex items-center justify-between">
          <div class="flex items-center text-xs text-gray-500 dark:text-gray-400">
            <font-awesome-icon icon="fa-solid fa-calendar-alt" class="mr-1" />
            <span>{{ education.start_year }}</span>
            <span v-if="education.end_year" class="mx-1">-</span>
            <span v-if="education.end_year">{{ education.end_year }}</span>
            <span v-else-if="education.is_current" class="ml-1 text-green-600">
              ({{ $t('education.inProgress') }})
            </span>
          </div>
        </div>
      </div>
      
      <!-- Empty State -->
      <div v-if="!loading && educations.length === 0" class="col-span-full text-center py-12">
        <div class="text-gray-500 dark:text-gray-400">
          {{ $t('education.noEducations') }}
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script lang="ts">
import { API_BASE_URL, API_ENDPOINT } from '@/config/global';
import { defineComponent, ref, onMounted, onUnmounted, computed } from 'vue';
import { useI18n } from 'vue-i18n';

interface Education {
  id: number;
  degree: string;
  specialty?: string;
  institution: string;
  description?: string;
  start_year: number;
  end_year?: number;
  duration: string;
  is_current: boolean;
}

export default defineComponent({
  name: 'EducationSection',
  emits: ['observe'],
  setup(props, { emit }) {
    const { t, locale } = useI18n();
    const sectionRef = ref<HTMLElement | null>(null);
    const educations = ref<Education[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);

    // Icon mapping based on degree and specialty
    const getEducationIcon = (degree: string, specialty?: string): string => {
      const degreeLower = degree.toLowerCase();
      const specialtyLower = specialty?.toLowerCase() || '';
      
      // Master's degrees
      if (degreeLower.includes('master') || degreeLower.includes('m.sc') || degreeLower.includes('msc')) {
        return 'fa-solid fa-graduation-cap';
      }
      
      // Engineering degrees
      if (degreeLower.includes('ingénieur') || degreeLower.includes('engineer') || 
          specialtyLower.includes('télécommunication') || specialtyLower.includes('telecommunication')) {
        return 'fa-solid fa-user-graduate';
      }
      
      // Law degrees
      if (degreeLower.includes('droit') || degreeLower.includes('law') || degreeLower.includes('juridique')) {
        return 'fa-solid fa-balance-scale';
      }
      
      // Professional degrees (DESS, Professional License)
      if (degreeLower.includes('dess') || degreeLower.includes('professionnel') || degreeLower.includes('professional')) {
        return 'fa-solid fa-certificate';
      }
      
      // Bachelor's degrees
      if (degreeLower.includes('licence') || degreeLower.includes('bachelor') || degreeLower.includes('baccalauréat')) {
        if (degreeLower.includes('baccalauréat')) {
          return 'fa-solid fa-school';
        }
        return 'fa-solid fa-graduation-cap';
      }
      
      // Default education icon
      return 'fa-solid fa-book';
    };

    // Fetch educations from API
    const fetchEducations = async () => {
      loading.value = true;
      error.value = null;
      
      try {
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINT.portfolioEducations}?locale=${locale.value}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success) {
          educations.value = data.data;
        } else {
          throw new Error(data.message || 'Failed to fetch educations');
        }
        
      } catch (err) {
        console.error('Error fetching educations:', err);
        error.value = err instanceof Error ? err.message : t('common.errorLoadingData');
      } finally {
        loading.value = false;
      }
    };

    // Watch for locale changes to refetch data
    const currentLocale = computed(() => locale.value);
    
    onMounted(() => {
      // Fetch educations on component mount
      fetchEducations();
      
      // Watch for locale changes
      let previousLocale = locale.value;
      
      const checkLocaleChange = () => {
        if (locale.value !== previousLocale) {
          previousLocale = locale.value;
          fetchEducations();
        }
      };
      
      const interval = setInterval(checkLocaleChange, 500);
      
      // Intersection Observer for section visibility
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
        clearInterval(interval);
      });
    });
    
    return {
      sectionRef,
      educations,
      loading,
      error,
      fetchEducations,
      getEducationIcon
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

/* Animation pour les cartes d'éducation */
.hover\:shadow-lg:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

/* Responsive grid improvements */
@media (min-width: 1024px) {
  .grid-cols-1.md\:grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

/* Style pour les badges "En cours" */
.bg-green-100 {
  background-color: #dcfce7;
}

.text-green-800 {
  color: #166534;
}

/* Dark mode adjustments */
.dark .bg-green-100 {
  background-color: #14532d;
}

.dark .text-green-800 {
  color: #bbf7d0;
}

/* Amélioration de la lisibilité des descriptions */
.leading-relaxed {
  line-height: 1.625;
}

/* Animation subtile pour les icônes */
.fa-solid {
  transition: transform 0.2s ease-in-out;
}

.hover\:shadow-lg:hover .fa-solid {
  transform: scale(1.05);
}
</style>