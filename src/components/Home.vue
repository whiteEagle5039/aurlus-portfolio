<template>
<section
  id="home"
  ref="sectionRef"
  class="relative min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-500 dark:bg-gray-900 bg-gray-100"
>
  <!-- Conteneur particules -->
  <div id="particles-js" class="absolute inset-0 z-0 opacity-30 dark:opacity-40"></div>
  
  <!-- Lignes décoratives -->
  <div class="hidden lg:block absolute left-10 xl:left-20 h-screen w-px bg-gradient-to-b from-transparent via-green-500 to-transparent opacity-30"></div>
  <div class="hidden lg:block absolute right-10 xl:right-20 h-screen w-px bg-gradient-to-b from-transparent via-green-500 to-transparent opacity-30"></div>
  
  <!-- Loading state -->
  <div v-if="isLoading" class="container mx-auto flex items-center justify-center relative z-10 px-4 sm:px-6 py-8 sm:py-12">
    <div class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
      <p class="text-gray-600 dark:text-gray-300">{{ $t('common.loading') }}</p>
    </div>
  </div>

  <!-- Error state -->
  <div v-else-if="error" class="container mx-auto flex items-center justify-center relative z-10 px-4 sm:px-6 py-8 sm:py-12">
    <div class="text-center bg-red-100 dark:bg-red-900 dark:bg-opacity-20 p-8 rounded-2xl border border-red-200 dark:border-red-700">
      <p class="text-red-700 dark:text-red-300 mb-4">{{ error }}</p>
      <button 
        @click="fetchProfile" 
        class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-300"
      >
        {{ $t('common.retry') }}
      </button>
    </div>
  </div>
  
  <!-- Contenu principal -->
  <div v-else class="container mx-auto flex flex-col-reverse lg:flex-row items-center justify-between relative z-10 px-4 sm:px-6 py-8 sm:py-12 gap-8 sm:gap-12">
    <!-- Partie gauche : Texte -->
    <div class="w-full lg:w-1/2 text-center lg:text-left backdrop-blur-sm bg-white bg-opacity-50 dark:bg-black dark:bg-opacity-10 p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-gray-200 dark:border-gray-700 shadow-xl transition-colors duration-500">
      <!-- Badge -->
      <div class="inline-block px-3 sm:px-4 py-1 sm:py-2 bg-green-100 dark:bg-green-500 dark:bg-opacity-20 rounded-full text-green-700 dark:text-green-300 text-xs sm:text-sm font-medium tracking-wider mb-4 sm:mb-6 backdrop-filter backdrop-blur-sm transition-colors duration-500">
        {{ profileData?.tagline || $t('home.badge') }}
      </div>
      
      <!-- Nom -->
      <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter text-gray-800 dark:text-white transition-colors duration-500">
        <span class="inline-block">{{ profileData?.first_name || $t('home.name.first') }}
          <span class="relative">
            <span class="text-green-500 dark:text-green-400">{{ profileData?.last_name || $t('home.name.last') }}</span>
            <span class="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-1 sm:h-2 bg-green-500 dark:bg-green-400 opacity-75 rounded-full transition-colors duration-500"></span>
          </span>
        </span>
      </h1>
      
      <!-- Titre du poste -->
      <p class="text-lg sm:text-xl md:text-2xl text-green-600 dark:text-green-400 font-semibold mt-4 mb-6">
        {{ profileData?.job_title || $t('home.defaultJobTitle') }}
      </p>
      
      <!-- Description/Bio -->
      <p class="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mt-8 sm:mt-6 max-w-lg mx-auto lg:mx-0 leading-relaxed transition-colors duration-500">
        {{ profileData?.bio || $t('home.description') }}
      </p>
      
      <!-- Tags -->
      <div class="flex flex-wrap gap-2 mt-4 sm:mt-6 justify-center lg:justify-start">
        <span class="px-3 py-1 bg-gray-200 dark:bg-gray-800 bg-opacity-60 text-gray-700 dark:text-gray-300 text-xs sm:text-sm rounded-full border border-gray-300 dark:border-gray-700 transition-colors duration-500">
          {{ $t('home.tags.security') }}
        </span>
        <span class="px-3 py-1 bg-gray-200 dark:bg-gray-800 bg-opacity-60 text-gray-700 dark:text-gray-300 text-xs sm:text-sm rounded-full border border-gray-300 dark:border-gray-700 transition-colors duration-500">
          {{ $t('home.tags.ciso') }}
        </span>
        <span class="px-3 py-1 bg-gray-200 dark:bg-gray-800 bg-opacity-60 text-gray-700 dark:text-gray-300 text-xs sm:text-sm rounded-full border border-gray-300 dark:border-gray-700 transition-colors duration-500">
          {{ $t('home.tags.iso') }}
        </span>
        <span class="px-3 py-1 bg-gray-200 dark:bg-gray-800 bg-opacity-60 text-gray-700 dark:text-gray-300 text-xs sm:text-sm rounded-full border border-gray-300 dark:border-gray-700 transition-colors duration-500">
          {{ $t('home.tags.management') }}
        </span>
      </div>
      
      <!-- Contact info (optionnel) -->
      <div v-if="profileData?.email || profileData?.phone" class="mt-6 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start text-sm text-gray-600 dark:text-gray-300">
        <div v-if="profileData?.email" class="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <a :href="`mailto:${profileData.email}`" class="hover:text-green-500 transition-colors duration-300">
            {{ profileData.email }}
          </a>
        </div>
        <div v-if="profileData?.phone" class="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <a :href="`tel:${profileData.phone}`" class="hover:text-green-500 transition-colors duration-300">
            {{ profileData.phone }}
          </a>
        </div>
      </div>

      <!-- Liens sociaux -->
      <div v-if="profileData?.social_links && Object.keys(profileData.social_links).length > 0" class="mt-6 flex gap-4 justify-center lg:justify-start">
        <a 
          v-if="profileData.social_links.linkedin" 
          :href="profileData.social_links.linkedin" 
          target="_blank" 
          rel="noopener noreferrer"
          class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
          title="LinkedIn"
        >
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </a>
        <a 
          v-if="profileData.social_links.github" 
          :href="profileData.social_links.github" 
          target="_blank" 
          rel="noopener noreferrer"
          class="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors duration-300"
          title="GitHub"
        >
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </a>
        <a 
          v-if="profileData.social_links.twitter" 
          :href="profileData.social_links.twitter" 
          target="_blank" 
          rel="noopener noreferrer"
          class="text-gray-600 dark:text-gray-300 hover:text-blue-400 transition-colors duration-300"
          title="Twitter"
        >
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
          </svg>
        </a>
        <a 
          v-if="profileData.social_links.website" 
          :href="profileData.social_links.website" 
          target="_blank" 
          rel="noopener noreferrer"
          class="text-gray-600 dark:text-gray-300 hover:text-green-500 transition-colors duration-300"
          title="Website"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9-9a9 9 0 00-9 9m0 0a9 9 0 019-9"/>
          </svg>
        </a>
      </div>
      
      <!-- Boutons -->
      <div class="mt-6 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
        <a
          href="#contact"
          class="group inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-400 hover:from-green-400 hover:to-green-300 text-gray-900 font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-500/20"
        >
          <span>{{ $t('home.buttons.contact') }}</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
        <a
          href="#experience"
          class="group inline-flex items-center gap-2 bg-transparent backdrop-blur-sm border-2 border-green-500/50 text-green-600 dark:text-green-400 hover:bg-green-500/10 font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl transition-all duration-300"
        >
          <span>{{ $t('home.buttons.expertise') }}</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
    
    <!-- Partie droite : Photo -->
    <div class="w-full lg:w-1/2 flex justify-center lg:justify-end relative mb-6 sm:mb-0 mt-10 sm:mt-0">
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full sm:w-[400px] md:w-[500px] lg:w-[600px] aspect-square bg-green-500 rounded-full filter blur-3xl opacity-20 dark:opacity-20 transition-opacity duration-500"></div>
      
      <div class="relative z-10">
        <div class="absolute inset-0 -m-4 sm:-m-6 md:-m-8 rounded-full border-2 sm:border-4 border-dashed border-green-500/40 animate-spin-slow"></div>
        
        <div class="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[450px] lg:h-[450px] xl:w-[550px] xl:h-[550px] relative">
          <div class="absolute inset-0 rounded-full bg-gradient-to-br from-green-500 to-green-600 opacity-80"></div>
          
          <div class="absolute inset-2 sm:inset-3 md:inset-4 rounded-full overflow-hidden border-4 sm:border-6 md:border-8 border-white dark:border-gray-900/70 shadow-2xl transition-colors duration-500">
            <!-- Image de profil dynamique avec fallback -->
            <img
              v-if="profileData?.profile_photo"
              :src="profileData.profile_photo"
              :alt="`Photo de ${profileData?.full_name || 'profil'}`"
              class="w-full h-full object-cover object-center scale-110"
              @error="handleImageError"
            />
            <!-- Fallback si pas de photo ou erreur de chargement -->
            <img
              v-else
              src="../assets/img/profile.jpg"
              :alt="`Photo de ${profileData?.full_name || 'profil'}`"
              class="w-full h-full object-cover object-center scale-110"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent mix-blend-overlay"></div>
          </div>            
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script>
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { API_BASE_URL, API_ENDPOINT } from '@/config/global';

export default defineComponent({
  name: 'HomeSection',
  emits: ['observe'],
  setup(props, { emit }) {
    const { t, locale } = useI18n();
    const sectionRef = ref(null);
    const profileData = ref(null);
    const isLoading = ref(true);
    const error = ref(null);
    
    // Fonction pour gérer les erreurs de chargement d'image
    const handleImageError = (event) => {
      console.error('Erreur de chargement de l\'image de profil');
      // L'image de fallback sera automatiquement affichée via v-else
      if (profileData.value) {
        profileData.value.profile_photo = null;
      }
    };
    
    // Fonction pour récupérer les données du profil
    const fetchProfile = async () => {
      isLoading.value = true;
      error.value = null;
      
      try {
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINT.portfolioProfile}?locale=${locale.value}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        
        if (result.success && result.data) {
          profileData.value = result.data;
          console.log('Profil chargé:', profileData.value);
          console.log('URL photo de profil:', profileData.value.profile_photo);
        } else {
          throw new Error(result.message || 'Erreur lors de la récupération du profil');
        }
      } catch (err) {
        console.error('Erreur lors de la récupération du profil:', err);
        error.value = err.message || 'Impossible de charger les informations du profil';
      } finally {
        isLoading.value = false;
      }
    };
    
    // Fonction pour charger le script particles.js
    const loadParticlesScript = () => {
      return new Promise((resolve) => {
        // Si déjà chargé
        if (window.particlesJS) {
          resolve(true);
          return;
        }

        const script = document.createElement('script');
        script.src = '/js/particles.min.js';
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.head.appendChild(script);
      });
    };

    // Initialisation des particules avec gestion du thème
    const initParticles = () => {
      // Détection du thème actuel
      const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      window.particlesJS('particles-js', {
        "particles": {
          "number": {
            "value": 120,
            "density": {
              "enable": true,
              "value_area": 800
            }
          },
          "color": {
            "value": "#20C997"
          },
          "shape": {
            "type": "circle",
            "stroke": {
              "width": 0,
              "color": "#000000"
            },
            "polygon": {
              "nb_sides": 5
            }
          },
          "opacity": {
            "value": 0.8,
            "random": true,
            "anim": {
              "enable": false,
              "speed": 1,
              "opacity_min": 0.1,
              "sync": false
            }
          },
          "size": {
            "value": 4,
            "random": true,
            "anim": {
              "enable": false,
              "speed": 40,
              "size_min": 0.1,
              "sync": false
            }
          },
          "line_linked": {
            "enable": true,
            "distance": 180,
            "color": "#20C997",
            "opacity": 1,
            "width": 0.6
          },
          "move": {
            "enable": true,
            "speed": 4,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "bounce",
            "bounce": true,
            "attract": {
              "enable": false,
              "rotateX": 600,
              "rotateY": 1200
            }
          }
        },
        "interactivity": {
          "detect_on": "canvas",
          "events": {
            "onhover": {
              "enable": true,
              "mode": "grab"
            },
            "onclick": {
              "enable": true,
              "mode": "push"
            },
            "resize": true
          },
          "modes": {
            "grab": {
              "distance": 150,
              "line_linked": {
                "opacity": 0.8
              }
            },
            "bubble": {
              "distance": 400,
              "size": 40,
              "duration": 2,
              "opacity": 8,
              "speed": 3
            },
            "repulse": {
              "distance": 100
            },
            "push": {
              "particles_nb": 3
            },
            "remove": {
              "particles_nb": 2
            }
          }
        },
        "retina_detect": true
      });

      // Écouteur pour les changements de thème
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', (e) => {
        const container = document.getElementById('particles-js');
        if (container) {
          container.innerHTML = '';
          initParticles();
        }
      });
    };

    onMounted(async () => {
      // Intersection Observer pour les animations
      const observer = new IntersectionObserver(
        ([entry]) => emit('observe', 'home', entry.isIntersecting),
        { threshold: 0.3 }
      );
      if (sectionRef.value) observer.observe(sectionRef.value);

      // Chargement et initialisation des particules
      const loaded = await loadParticlesScript();
      if (loaded) initParticles();

      // Récupération des données du profil
      await fetchProfile();

      // Watch pour les changements de locale (comme dans Languages.vue)
      let previousLocale = locale.value;
      
      const checkLocaleChange = () => {
        if (locale.value !== previousLocale) {
          previousLocale = locale.value;
          fetchProfile();
        }
      };
      
      const interval = setInterval(checkLocaleChange, 500);

      // Nettoyage
      onUnmounted(() => {
        if (sectionRef.value) observer.unobserve(sectionRef.value);
        const particles = document.getElementById('particles-js');
        if (particles) particles.innerHTML = '';
        clearInterval(interval);
      });
    });

    return { 
      sectionRef,
      profileData,
      isLoading,
      error,
      fetchProfile,
      handleImageError
    };
  }
});
</script>

<style scoped>
/* Style pour le conteneur des particules */
#particles-js {
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url("");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
}

/* Assure que le contenu est au-dessus des particules */
.relative.z-10 {
  position: relative;
  z-index: 10;
}

/* Animation pour le spinner de chargement */
@keyframes spin {
  to { transform: rotate(360deg); }
}

.animate-spin-slow {
  animation: spin 20s linear infinite;
}
</style>