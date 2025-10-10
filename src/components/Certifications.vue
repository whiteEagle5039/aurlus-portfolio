<template>
  <section 
    id="certifications" 
    ref="sectionRef"
    class="py-16 px-4 bg-gray-50 dark:bg-gray-800"
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
      <div v-else class="space-y-16">
        
        <!-- Professional Certifications Section -->
        <div v-if="professionalCertifications.length > 0">
          <div class="flex items-center mb-6">
            <i class="fas fa-briefcase text-indigo-500 text-2xl mr-3"></i>
            <h3 class="text-2xl font-bold text-gray-800 dark:text-white">
              {{ $t('certifications.professional.title') }}
            </h3>
            <span class="ml-3 px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-sm font-semibold rounded-full">
              {{ professionalCertifications.length }}
            </span>
          </div>
          
          <!-- Top Professional Certifications Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <CertificationCard 
              v-for="cert in topProfessionalCertifications" 
              :key="cert.id"
              :certification="cert"
              :show-status="true"
            />
          </div>

          <!-- Show More Button for Professional -->
          <div v-if="hasMoreProfessionalCertifications" class="text-center mt-6">
            <button 
              @click="openModal('professional')"
              class="inline-flex items-center px-4 py-2 border border-indigo-500 text-indigo-500 dark:text-indigo-400 rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors"
            >
              <span>{{ $t('certifications.button') }} ({{ remainingProfessionalCount }})</span>
              <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Training Certifications Section -->
        <div v-if="trainingCertifications.length > 0">
          <div class="flex items-center mb-6">
            <i class="fas fa-graduation-cap text-purple-500 text-2xl mr-3"></i>
            <h3 class="text-2xl font-bold text-gray-800 dark:text-white">
              {{ $t('certifications.training.title') }}
            </h3>
            <span class="ml-3 px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-sm font-semibold rounded-full">
              {{ trainingCertifications.length }}
            </span>
          </div>
          
          <!-- Top Training Certifications Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <CertificationCard 
              v-for="cert in topTrainingCertifications" 
              :key="cert.id"
              :certification="cert"
              :show-status="true"
            />
          </div>

          <!-- Show More Button for Training -->
          <div v-if="hasMoreTrainingCertifications" class="text-center mt-6">
            <button 
              @click="openModal('training')"
              class="inline-flex items-center px-4 py-2 border border-purple-500 text-purple-500 dark:text-purple-400 rounded-lg hover:bg-purple-50 dark:hover:bg-gray-700 transition-colors"
            >
              <span>{{ $t('certifications.button') }} ({{ remainingTrainingCount }})</span>
              <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
          </div>
        </div>
        
        <!-- Empty State -->
        <div v-if="professionalCertifications.length === 0 && trainingCertifications.length === 0" class="text-center py-12">
          <div class="text-gray-500 dark:text-gray-400">
            {{ $t('certifications.noCertifications') }}
          </div>
        </div>
      </div>
    </div>

    <!-- Modal for Certifications -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex justify-between items-center mb-6">
            <div class="flex items-center">
              <i 
                :class="[
                  'text-2xl mr-3',
                  modalType === 'professional' ? 'fas fa-briefcase text-indigo-500' : 'fas fa-graduation-cap text-purple-500'
                ]"
              ></i>
              <h3 class="text-2xl font-bold text-gray-800 dark:text-white">
                {{ modalType === 'professional' 
                  ? $t('certifications.professional.allTitle') 
                  : $t('certifications.training.allTitle') 
                }}
              </h3>
              <span class="ml-3 px-3 py-1 text-sm font-semibold rounded-full"
                :class="[
                  modalType === 'professional' 
                    ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200'
                    : 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200'
                ]"
              >
                {{ currentModalCertifications.length }}
              </span>
            </div>
            <button 
              @click="closeModal" 
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
                  ? modalType === 'professional'
                    ? 'bg-indigo-500 text-white'
                    : 'bg-purple-500 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              ]"
            >
              {{ filter.label }} ({{ filter.count }})
            </button>
          </div>
          
          <!-- Filtered certifications grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <CertificationCard 
              v-for="cert in filteredModalCertifications" 
              :key="'modal-' + cert.id"
              :certification="cert"
              :show-status="true"
            />
          </div>
          
          <!-- Modal Footer -->
          <div class="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
            <div class="text-sm text-gray-600 dark:text-gray-400">
              {{ $t('certifications.showing') }} {{ filteredModalCertifications.length }} {{ $t('certifications.of') }} {{ currentModalCertifications.length }}
            </div>
            <button 
              @click="closeModal"
              :class="[
                'px-6 py-2 text-white rounded-lg transition-colors',
                modalType === 'professional'
                  ? 'bg-indigo-500 hover:bg-indigo-600'
                  : 'bg-purple-500 hover:bg-purple-600'
              ]"
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
  type: 'professional' | 'training';
  type_label?: string;
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

interface CertificationsGrouped {
  professional: Certification[];
  training: Certification[];
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
    const modalType = ref<'professional' | 'training'>('professional');
    const professionalCertifications = ref<Certification[]>([]);
    const trainingCertifications = ref<Certification[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);
    const activeFilter = ref('all');
    const topDisplayCount = 5; // Nombre de certifications à afficher par défaut

    // Top professional certifications
    const topProfessionalCertifications = computed(() => {
      return professionalCertifications.value.slice(0, topDisplayCount);
    });

    // Top training certifications
    const topTrainingCertifications = computed(() => {
      return trainingCertifications.value.slice(0, topDisplayCount);
    });

    // Check if there are more professional certifications
    const hasMoreProfessionalCertifications = computed(() => {
      return professionalCertifications.value.length > topDisplayCount;
    });

    // Check if there are more training certifications
    const hasMoreTrainingCertifications = computed(() => {
      return trainingCertifications.value.length > topDisplayCount;
    });

    // Count of remaining professional certifications
    const remainingProfessionalCount = computed(() => {
      return Math.max(0, professionalCertifications.value.length - topDisplayCount);
    });

    // Count of remaining training certifications
    const remainingTrainingCount = computed(() => {
      return Math.max(0, trainingCertifications.value.length - topDisplayCount);
    });

    // Current modal certifications based on type
    const currentModalCertifications = computed(() => {
      return modalType.value === 'professional' 
        ? professionalCertifications.value 
        : trainingCertifications.value;
    });

    // Filter options for modal
    const filterOptions = computed(() => [
      { 
        key: 'all', 
        label: t('certifications.filters.all'), 
        count: currentModalCertifications.value.length 
      },
      { 
        key: 'valid', 
        label: t('certifications.filters.valid'), 
        count: currentModalCertifications.value.filter(cert => cert.is_valid).length 
      },
      { 
        key: 'expired', 
        label: t('certifications.filters.expired'), 
        count: currentModalCertifications.value.filter(cert => !cert.is_valid).length 
      },
      { 
        key: 'permanent', 
        label: t('certifications.filters.permanent'), 
        count: currentModalCertifications.value.filter(cert => cert.never_expires).length 
      }
    ]);

    // Filtered certifications for modal
    const filteredModalCertifications = computed(() => {
      switch (activeFilter.value) {
        case 'valid':
          return currentModalCertifications.value.filter(cert => cert.is_valid);
        case 'expired':
          return currentModalCertifications.value.filter(cert => !cert.is_valid);
        case 'permanent':
          return currentModalCertifications.value.filter(cert => cert.never_expires);
        default:
          return currentModalCertifications.value;
      }
    });

    // Open modal for specific type
    const openModal = (type: 'professional' | 'training') => {
      modalType.value = type;
      activeFilter.value = 'all';
      showModal.value = true;
    };

    // Close modal
    const closeModal = () => {
      showModal.value = false;
      activeFilter.value = 'all';
    };

    // Fetch certifications from API (grouped by type)
    const fetchCertifications = async () => {
      loading.value = true;
      error.value = null;
      
      try {
        const response = await fetch(
          `${API_BASE_URL}${API_ENDPOINT.portfolioCertifications}/grouped?locale=${locale.value}`
        );
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success) {
          const grouped = data.data as CertificationsGrouped;
          professionalCertifications.value = grouped.professional || [];
          trainingCertifications.value = grouped.training || [];
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
      modalType,
      professionalCertifications,
      trainingCertifications,
      loading,
      error,
      activeFilter,
      topProfessionalCertifications,
      topTrainingCertifications,
      hasMoreProfessionalCertifications,
      hasMoreTrainingCertifications,
      remainingProfessionalCount,
      remainingTrainingCount,
      currentModalCertifications,
      filterOptions,
      filteredModalCertifications,
      fetchCertifications,
      openModal,
      closeModal
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

/* Fade in animation for sections */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.space-y-16 > div {
  animation: fadeIn 0.5s ease-out forwards;
}

.space-y-16 > div:nth-child(2) {
  animation-delay: 0.2s;
}
</style>