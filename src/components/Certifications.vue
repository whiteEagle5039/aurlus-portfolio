<template>
  <section 
    id="certifications" 
    ref="sectionRef"
    class="py-16 px-4 bg-gray-50 dark:bg-gray-900"
  >
    <div class="container mx-auto">
      <h2 class="text-3xl md:text-4xl font-bold mb-12 text-center bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-lg inline-block">
        {{ $t('certifications.title1') }} <span class="text-green-500">{{ $t('certifications.title2') }}</span>
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
          @click="fetchCertifications" 
          class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors"
        >
          {{ $t('common.retry') }}
        </button>
      </div>
      
      <!-- Certifications Display -->
      <div v-else>
        
        <!-- Top Certifications Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <CertificationCard 
            v-for="cert in topCertifications" 
            :key="cert.id"
            :certification="cert"
            :show-status="true"
          />
        </div>

        <!-- Show More Button -->
        <div v-if="hasMoreCertifications" class="text-center mt-6">
          <button 
            @click="showModal = true"
            class="inline-flex items-center px-4 py-2 border border-green-500 text-green-500 dark:text-green-400 rounded-lg hover:bg-green-50 dark:hover:bg-gray-700 transition-colors"
          >
            <span>{{ $t('certifications.button') }} ({{ remainingCertificationsCount }})</span>
            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
        </div>
        
        <!-- Empty State -->
        <div v-if="!loading && certifications.length === 0" class="text-center py-12">
          <div class="text-gray-500 dark:text-gray-400">
            {{ $t('certifications.noCertifications') }}
          </div>
        </div>
      </div>
    </div>

    <!-- Modal for All Certifications -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-2xl font-bold text-gray-800 dark:text-white">
              {{ $t('certifications.allCertifications') }}
            </h3>
            <button 
              @click="showModal = false" 
              class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          <!-- Filter tabs -->
          <div class="flex space-x-1 mb-6 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            <button 
              v-for="filter in filterOptions" 
              :key="filter.key"
              @click="activeFilter = filter.key"
              :class="[
                'px-4 py-2 rounded-md text-sm font-medium transition-colors flex-1',
                activeFilter === filter.key 
                  ? 'bg-green-500 text-white' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              ]"
            >
              {{ filter.label }} ({{ filter.count }})
            </button>
          </div>
          
          <!-- Filtered certifications grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <CertificationCard 
              v-for="cert in filteredCertifications" 
              :key="'modal-' + cert.id"
              :certification="cert"
              :show-status="true"
            />
          </div>
          
          <!-- Modal Footer -->
          <div class="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
            <div class="text-sm text-gray-600 dark:text-gray-400">
              {{ $t('certifications.showing') }} {{ filteredCertifications.length }} {{ $t('certifications.of') }} {{ certifications.length }}
            </div>
            <button 
              @click="showModal = false"
              class="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              {{ $t('common.close') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onUnmounted } from 'vue';
import CertificationCard from '@/components/CertificationCard.vue';
import { useI18n } from 'vue-i18n';
import { API_BASE_URL, API_ENDPOINT } from '@/config/global';

interface Certification {
  id: number;
  name: string;
  description?: string;
  issuing_organization: string;
  formatted_obtained_date: string;
  formatted_expiry_date?: string;
  never_expires: boolean;
  certificate_url?: string;
  certificate_id?: string;
  is_valid: boolean;
  status: string;
}

interface CertificationStats {
  total: number;
  active: number;
  valid: number;
  expired: number;
  expiring_soon: number;
}

export default defineComponent({
  name: 'CertificationsSection',
  components: {
    CertificationCard
  },
  emits: ['observe'],
  setup(props, { emit }) {
    const { t, locale } = useI18n();
    const sectionRef = ref<HTMLElement | null>(null);
    const showModal = ref(false);
    const certifications = ref<Certification[]>([]);
    const stats = ref<CertificationStats | null>(null);
    const loading = ref(false);
    const error = ref<string | null>(null);
    const activeFilter = ref('all');

    // Top certifications to show (first 10)
    const topCertifications = computed(() => {
      return certifications.value.slice(0, 10);
    });

    // Check if there are more certifications
    const hasMoreCertifications = computed(() => {
      return certifications.value.length > 10;
    });

    // Count of remaining certifications
    const remainingCertificationsCount = computed(() => {
      return Math.max(0, certifications.value.length - 10);
    });

    // Filter options for modal
    const filterOptions = computed(() => [
      { 
        key: 'all', 
        label: t('certifications.filters.all'), 
        count: certifications.value.length 
      },
      { 
        key: 'valid', 
        label: t('certifications.filters.valid'), 
        count: certifications.value.filter(cert => cert.is_valid).length 
      },
      { 
        key: 'expired', 
        label: t('certifications.filters.expired'), 
        count: certifications.value.filter(cert => !cert.is_valid).length 
      },
      { 
        key: 'permanent', 
        label: t('certifications.filters.permanent'), 
        count: certifications.value.filter(cert => cert.never_expires).length 
      }
    ]);

    // Filtered certifications for modal
    const filteredCertifications = computed(() => {
      switch (activeFilter.value) {
        case 'valid':
          return certifications.value.filter(cert => cert.is_valid);
        case 'expired':
          return certifications.value.filter(cert => !cert.is_valid);
        case 'permanent':
          return certifications.value.filter(cert => cert.never_expires);
        default:
          return certifications.value;
      }
    });

    // Fetch certifications from API
    const fetchCertifications = async () => {
      loading.value = true;
      error.value = null;
      
      try {
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINT.portfolioCertifications}?locale=${locale.value}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success) {
          certifications.value = data.data;
        } else {
          throw new Error(data.message || 'Failed to fetch certifications');
        }
        
      } catch (err) {
        console.error('Error fetching certifications:', err);
        error.value = err instanceof Error ? err.message : t('common.errorLoadingData');
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      // Fetch data on component mount
      fetchCertifications();
      // fetchStats();
      
      // Watch for locale changes
      let previousLocale = locale.value;
      
      const checkLocaleChange = () => {
        if (locale.value !== previousLocale) {
          previousLocale = locale.value;
          fetchCertifications();
        }
      };
      
      const interval = setInterval(checkLocaleChange, 500);
      
      // Intersection Observer
      const observer = new IntersectionObserver(
        ([entry]) => {
          emit('observe', 'certifications', entry.isIntersecting);
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
      showModal,
      certifications,
      stats,
      loading,
      error,
      activeFilter,
      topCertifications,
      hasMoreCertifications,
      remainingCertificationsCount,
      filterOptions,
      filteredCertifications,
      fetchCertifications
    };
  }
});
</script>

<style scoped>
/* Animation pour le spinner */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Styles pour le modal */
.modal-overlay {
  backdrop-filter: blur(4px);
}

/* Transition pour les onglets de filtre */
button {
  transition: all 0.2s ease-in-out;
}

/* Scrollbar personnalisée pour le modal */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #10b981;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #059669;
}
</style>