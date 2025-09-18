<template>
  <section 
    id="about" 
    ref="sectionRef"
    class="py-20 px-4 bg-gray-100 dark:bg-gray-800"
  >
    <div class="container mx-auto">
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
          @click="fetchAllData" 
          class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors"
        >
          {{ $t('common.retry') }}
        </button>
      </div>
      
      <!-- Content -->
      <div v-else>
        <h2 class="text-3xl md:text-4xl font-bold mb-12 text-center bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-lg inline-block">
          {{ $t('about.title') }} <span class="text-green-500">{{ $t('about.highlight') }}</span>
        </h2>
        
        <div class="flex flex-col md:flex-row items-center gap-10">
          <!-- Left: Image -->
          <div class="w-full md:w-5/12">
            <div class="relative">
              <div class="bg-green-500 absolute -top-4 -left-4 w-full h-full rounded-lg"></div>
              <img
                src="../assets/img/about.jpg"
                :alt="$t('about.imageAlt')"
                class="w-full h-auto rounded-lg relative z-10"
              />
            </div>
          </div>
                
          <!-- Right: About content -->
          <div class="w-full md:w-7/12">
            <!-- Dynamic Title from Profile -->
            <h3 class="text-2xl font-bold mb-4">
              {{ profileData?.job_title }}
            </h3>
            
            <!-- Fallback to Profile Bio if no About data -->
            <div v-if="profileData?.bio" class="mb-8 leading-relaxed text-gray-700 dark:text-gray-300">
              <p>{{ profileData.bio }}</p>
            </div>
            
            <!-- Dynamic Skills -->
            <div v-if="featuredSkills.length > 0" class="mb-8">
              <h4 class="text-lg font-semibold mb-4">{{ $t('about.skills.title') }}</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div 
                  v-for="skill in featuredSkills.slice(0, 6)" 
                  :key="skill.id"
                  class="flex items-center skill-item"
                >
                  <font-awesome-icon icon="fa-solid fa-check" class="text-green-500 mr-2" />
                  <span>{{ skill.name }}</span>
                  <span v-if="skill.level" class="ml-2 text-sm text-gray-500">({{ skill.level }}%)</span>
                </div>
              </div>
            </div>
            
            <!-- Dynamic Certifications -->
            <div v-if="featuredCertifications.length > 0" class="mb-8">
              <h4 class="text-lg font-semibold mb-3">{{ $t('about.certificationsTitle') }}</h4>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="cert in featuredCertifications" 
                  :key="cert.id"
                  :class="[
                    'px-3 py-1 rounded-full text-sm transition-colors cursor-pointer certification-badge',
                    cert.is_valid 
                      ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 hover:bg-green-200 dark:hover:bg-green-800' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-600'
                  ]"
                  :title="cert.is_valid ? $t('certifications.valid') : $t('certifications.expired')"
                >
                  {{ cert.name }}
                  <font-awesome-icon 
                    v-if="!cert.is_valid" 
                    icon="fa-solid fa-exclamation-triangle" 
                    class="ml-1 text-orange-500" 
                    :title="$t('certifications.expired')"
                  />
                </span>
              </div>
              
              <!-- Show more certifications link -->
              <div v-if="totalCertifications > featuredCertifications.length" class="mt-3">
                <button
                  @click="scrollToCertifications"
                  class="text-green-500 hover:text-green-600 text-sm font-medium transition-colors"
                >
                  {{ $t('about.viewAllCertifications', { count: totalCertifications - featuredCertifications.length }) }}
                </button>
              </div>
            </div>
            
            <!-- Download CV button -->
            <a 
              download="cv.pdf" 
              class="cursor-pointer inline-flex items-center px-4 py-2 border border-green-500 text-green-500 dark:text-green-400 rounded-lg hover:bg-green-50 dark:hover:bg-gray-700 transition-colors"
              @click.prevent="downloadCV"
              type="button"
            >
              <font-awesome-icon icon="fa-solid fa-download" class="mr-2" />
              {{ $t('about.downloadCV') }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { API_BASE_URL, API_ENDPOINT } from '@/config/global';

interface ProfileData {
  id: number;
  first_name: string;
  last_name: string;
  full_name: string;
  job_title: string;
  bio: string;
  email?: string;
  phone?: string;
  social_links?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    website?: string;
  };
}

interface Skill {
  id: number;
  name: string;
  category: string;
  level: number;
  is_featured: boolean;
  description?: string;
  icon?: string;
}

interface Certification {
  id: number;
  name: string;
  issuing_organization: string;
  is_valid: boolean;
  never_expires: boolean;
  status: string;
}

export default defineComponent({
  name: 'AboutSection',
  emits: ['observe'],
  setup(props, { emit }) {
    const { t, locale } = useI18n();
    const sectionRef = ref<HTMLElement | null>(null);
    const loading = ref(false);
    const error = ref<string | null>(null);
    
    // Data refs
    const profileData = ref<ProfileData | null>(null);
    const skills = ref<Skill[]>([]);
    const certifications = ref<Certification[]>([]);
   
    const featuredSkills = computed(() => {
      return skills.value
        .filter(skill => skill.is_featured)
        .slice(0, 6);
    });
    
    const featuredCertifications = computed(() => {
      return certifications.value
        .filter(cert => cert.is_valid)
        .slice(0, 8);
    });
    
    const totalCertifications = computed(() => certifications.value.length);
    
    // Methods
    const formatDescription = (description: string): string => {
      // Replace line breaks with <br> tags and format paragraphs
      return description
        .split('\n\n')
        .map(paragraph => `<p class="mb-4">${paragraph.replace(/\n/g, '<br>')}</p>`)
        .join('');
    };
    
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINT.portfolioProfile}?locale=${locale.value}`);
        
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            profileData.value = data.data;
          }
        }
      } catch (err) {
        console.error('Error fetching profile data:', err);
        // Don't throw error, fallback to static content
      }
    };
    
    const fetchSkills = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINT.portfolioSkills}?locale=${locale.value}&featured_only=true`);
        
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            skills.value = data.data;
          }
        }
      } catch (err) {
        console.error('Error fetching skills:', err);
        // Don't throw error, fallback to static content
      }
    };
    
    const fetchCertifications = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINT.portfolioCertifications}?locale=${locale.value}`);
        
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            certifications.value = data.data;
          }
        }
      } catch (err) {
        console.error('Error fetching certifications:', err);
        // Don't throw error, fallback to static content
      }
    };
    
    const fetchAllData = async () => {
      loading.value = true;
      error.value = null;
      
      try {
        await Promise.all([
          fetchProfile(),
          fetchSkills(),
          fetchCertifications()
        ]);
      } catch (err) {
        console.error('Error fetching data:', err);
        error.value = err instanceof Error ? err.message : t('common.errorLoadingData');
      } finally {
        loading.value = false;
      }
    };
    
    const scrollToCertifications = () => {
      const certificationsSection = document.getElementById('certifications');
      if (certificationsSection) {
        certificationsSection.scrollIntoView({ behavior: 'smooth' });
      }
    };
    
    const downloadCV = () => {
      const cvPath = '/Aurlus_SOGBOSSI.pdf';
      
      const newWindow = window.open(cvPath, '_blank');
      
      if (newWindow) {
        setTimeout(() => {
          newWindow.close();
        }, 1000);
      } else {
        console.error('Impossible d\'ouvrir une nouvelle fenêtre pour le téléchargement.');
      }
    };
    
    onMounted(() => {
      fetchAllData();
      
      // Watch for locale changes
      let previousLocale = locale.value;
      
      const checkLocaleChange = () => {
        if (locale.value !== previousLocale) {
          previousLocale = locale.value;
          fetchAllData();
        }
      };
      
      const interval = setInterval(checkLocaleChange, 500);
      
      // Intersection Observer
      const observer = new IntersectionObserver(
        ([entry]) => {
          emit('observe', 'about', entry.isIntersecting);
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
      loading,
      error,
      profileData,
      featuredSkills,
      featuredCertifications,
      totalCertifications,
      formatDescription,
      fetchAllData,
      scrollToCertifications,
      downloadCV
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

/* Styles pour les certifications avec animation */
.certification-badge {
  transition: all 0.2s ease-in-out;
}

.certification-badge:hover {
  transform: translateY(-1px);
}

/* Styles pour les compétences */
.skill-item {
  transition: all 0.2s ease-in-out;
}

.skill-item:hover {
  transform: translateX(4px);
}

/* Formatage du texte de description */
:deep(p) {
  margin-bottom: 1rem;
}

:deep(p:last-child) {
  margin-bottom: 0;
}
</style>