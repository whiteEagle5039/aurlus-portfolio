<template>
<section 
  id="languages" 
  ref="sectionRef"
  class="py-20 px-4 bg-gray-800"
>
  <div class="container mx-auto">
    <h2 class="text-3xl md:text-4xl font-bold mb-12 text-center bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-lg inline-block" v-html="$t('languages.title')">
    </h2>
    
    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
    
    <!-- Error State -->
    <div v-else-if="error" class="text-center py-12">
      <p class="text-red-500 dark:text-red-400 mb-4">{{ $t('common.error') }}</p>
      <button 
        @click="fetchLanguages" 
        class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
      >
        {{ $t('common.retry') }}
      </button>
    </div>
    
    <!-- Languages Grid -->
    <div v-else-if="languages.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div 
        v-for="language in languages" 
        :key="language.id"
        class="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
      >
        <!-- Header with Flag and Name -->
        <div class="flex items-center mb-4">
          <span class="text-3xl mr-3">{{ language.flag }}</span>
          <div class="flex-1">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">
              {{ language.name }}
            </h3>
            <div v-if="language.certification" class="text-sm text-blue-600 dark:text-blue-400 font-medium">
              {{ language.certification }}
            </div>
          </div>
          <!-- Native Speaker Badge -->
          <div v-if="language.is_native" class="ml-2">
            <span class="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              <font-awesome-icon icon="fa-solid fa-home" class="mr-1" />
              {{ $t('languages.native') }}
            </span>
          </div>
        </div>
        
        <!-- Level Progress Bar -->
        <div class="mb-4">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
              {{ language.level_text }}
            </span>
            <span class="text-sm text-gray-600 dark:text-gray-400">
              {{ language.level }}%
            </span>
          </div>
          
          <!-- Progress Bar -->
          <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div 
              :class="getLevelBarColor(language.level)"
              :style="{ width: language.level + '%' }"
              class="h-3 rounded-full transition-all duration-700 ease-out"
            ></div>
          </div>
        </div>
        
        <!-- Level Badge -->
        <div class="flex items-center justify-between mb-4">
          <span 
            :class="getLevelBadgeClass(language.level)"
            class="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full"
          >
            <font-awesome-icon :icon="getLevelIcon(language.level)" class="mr-2" />
            {{ language.formatted_level }}
          </span>
          
          <!-- Level Indicator -->
          <div class="flex items-center space-x-1">
            <div 
              v-for="i in 5" 
              :key="i"
              :class="[
                'w-3 h-3 rounded-full transition-colors duration-300',
                i <= Math.ceil(language.level / 20) 
                  ? getLevelDotColor(language.level)
                  : 'bg-gray-200 dark:bg-gray-600'
              ]"
            ></div>
          </div>
        </div>
        
        <!-- Description -->
        <div v-if="language.description" class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
          {{ language.description }}
        </div>
        
        <!-- Additional Info -->
        <div v-if="language.certification" class="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
          <div class="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <font-awesome-icon icon="fa-solid fa-certificate" class="mr-2 text-blue-500" />
            {{ $t('languages.certification') }}: {{ language.certification }}
          </div>
        </div>
      </div>
    </div>
    
    <!-- Empty State -->
    <div v-else class="text-center py-12">
      <font-awesome-icon icon="fa-solid fa-language" class="text-6xl text-gray-400 dark:text-gray-600 mb-4" />
      <p class="text-gray-500 dark:text-gray-400 text-lg">{{ $t('languages.noData') }}</p>
    </div>
  </div>
</section>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { API_BASE_URL, API_ENDPOINT } from '@/config/global';

interface Language {
  id: number;
  name: string;
  flag: string;
  level: number;
  formatted_level: string;
  level_text: string;
  level_color: string;
  level_bar_color: string;
  certification: string | null;
  description: string | null;
  is_native: boolean;
}

export default defineComponent({
  name: 'LanguagesSection',
  emits: ['observe'],
  setup(props, { emit }) {
    const { t, locale } = useI18n();
    const sectionRef = ref<HTMLElement | null>(null);
    const languages = ref<Language[]>([]);
    const loading = ref(false);
    const error = ref(false);
    
    const fetchLanguages = async () => {
      loading.value = true;
      error.value = false;
      
      try {
        const response = await fetch(`${API_BASE_URL}portfolio/languages?locale=${locale.value}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success) {
          languages.value = data.data;
        } else {
          throw new Error('Failed to fetch languages');
        }
      } catch (err) {
        console.error('Error fetching languages:', err);
        error.value = true;
      } finally {
        loading.value = false;
      }
    };
    
    const getLevelBarColor = (level: number): string => {
      if (level >= 95) return 'bg-green-500 dark:bg-green-400';
      if (level >= 80) return 'bg-blue-500 dark:bg-blue-400';
      if (level >= 65) return 'bg-yellow-500 dark:bg-yellow-400';
      if (level >= 45) return 'bg-orange-500 dark:bg-orange-400';
      return 'bg-red-500 dark:bg-red-400';
    };
    
    const getLevelBadgeClass = (level: number): string => {
      if (level >= 95) return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      if (level >= 80) return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      if (level >= 65) return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      if (level >= 45) return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    };
    
    const getLevelDotColor = (level: number): string => {
      if (level >= 95) return 'bg-green-500';
      if (level >= 80) return 'bg-blue-500';
      if (level >= 65) return 'bg-yellow-500';
      if (level >= 45) return 'bg-orange-500';
      return 'bg-red-500';
    };
    
    const getLevelIcon = (level: number): string => {
      if (level >= 95) return 'fa-solid fa-star';
      if (level >= 80) return 'fa-solid fa-medal';
      if (level >= 65) return 'fa-solid fa-award';
      if (level >= 45) return 'fa-solid fa-thumbs-up';
      return 'fa-solid fa-seedling';
    };
    
    onMounted(() => {
      fetchLanguages();
      
      // Watch for locale changes (comme dans Certifications.vue)
      let previousLocale = locale.value;
      
      const checkLocaleChange = () => {
        if (locale.value !== previousLocale) {
          previousLocale = locale.value;
          fetchLanguages();
        }
      };
      
      const interval = setInterval(checkLocaleChange, 500);
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          emit('observe', 'languages', entry.isIntersecting);
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
      languages,
      loading,
      error,
      fetchLanguages,
      getLevelBarColor,
      getLevelBadgeClass,
      getLevelDotColor,
      getLevelIcon
    };
  }
});
</script>

<style scoped>
/* Animation pour les barres de progression */
@keyframes fillBar {
  from {
    width: 0%;
  }
  to {
    width: var(--target-width);
  }
}

/* Animation d'apparition des cartes */
.language-card {
  animation: slideInUp 0.6s ease-out forwards;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Effet de hover amélioré */
.language-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

/* Animation des points de niveau */
.level-dot {
  transition: all 0.3s ease;
}

.level-dot.active {
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.1);
  }
}
</style>