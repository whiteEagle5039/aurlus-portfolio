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
  
  <!-- Contenu principal -->
  <div class="container mx-auto flex flex-col-reverse lg:flex-row items-center justify-between relative z-10 px-4 sm:px-6 py-8 sm:py-12 gap-8 sm:gap-12">
    <!-- Partie gauche : Texte -->
    <div class="w-full lg:w-1/2 text-center lg:text-left backdrop-blur-sm bg-white bg-opacity-50 dark:bg-black dark:bg-opacity-10 p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-gray-200 dark:border-gray-700 shadow-xl transition-colors duration-500">
      <!-- Badge -->
      <div class="inline-block px-3 sm:px-4 py-1 sm:py-2 bg-green-100 dark:bg-green-500 dark:bg-opacity-20 rounded-full text-green-700 dark:text-green-300 text-xs sm:text-sm font-medium tracking-wider mb-4 sm:mb-6 backdrop-filter backdrop-blur-sm transition-colors duration-500">
        {{ $t('home.badge') }}
      </div>
      
      <!-- Nom -->
      <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter text-gray-800 dark:text-white transition-colors duration-500">
        <span class="inline-block">{{ $t('home.name.first') }}
          <span class="relative">
            <span class="text-green-500 dark:text-green-400">{{ $t('home.name.last') }}</span>
            <span class="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-1 sm:h-2 bg-green-500 dark:bg-green-400 opacity-75 rounded-full transition-colors duration-500"></span>
          </span>
        </span>
      </h1>
      
      <!-- Description -->
      <p class="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mt-8 sm:mt-6 max-w-lg mx-auto lg:mx-0 leading-relaxed transition-colors duration-500" v-html="$t('home.description')"></p>
      
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
            <img
              src="../assets/img/profile.jpg"
              alt="Photo de profil"
              class="w-full h-full object-cover object-center scale-110"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent mix-blend-overlay"></div>
          </div>            
        </div>
      </div>
    </div>
  </div>

  <!-- Statistiques -->
  <div class="hidden lg:flex absolute bottom-8 xl:bottom-12 left-8 xl:left-12 gap-6 xl:gap-8">
    <div class="text-center">
      <div class="text-green-600 dark:text-green-400 text-2xl xl:text-3xl font-bold transition-colors duration-500">200+</div>
      <div class="text-gray-500 dark:text-gray-400 text-xs xl:text-sm transition-colors duration-500">{{ $t('home.stats.projects') }}</div>
    </div>
    <div class="text-center">
      <div class="text-green-600 dark:text-green-400 text-2xl xl:text-3xl font-bold transition-colors duration-500">50+</div>
      <div class="text-gray-500 dark:text-gray-400 text-xs xl:text-sm transition-colors duration-500">{{ $t('home.stats.clients') }}</div>
    </div>
    <div class="text-center">
      <div class="text-green-600 dark:text-green-400 text-2xl xl:text-3xl font-bold transition-colors duration-500">15+</div>
      <div class="text-gray-500 dark:text-gray-400 text-xs xl:text-sm transition-colors duration-500">{{ $t('home.stats.awards') }}</div>
    </div>
  </div>  
</section>
</template>

<script>
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'HomeSection',
  emits: ['observe'],
  setup(props, { emit }) {
    const { t } = useI18n();
    const sectionRef = ref(null);
    
    // Fonction pour charger le script particles.js
    const loadParticlesScript = () => {
      return new Promise((resolve) => {
        // Si déjà chargé
        if (window.particlesJS) {
          resolve(true);
          return;
        }

        const script = document.createElement('script');
        script.src = '/js/particles.min.js'; // Chemin vers votre fichier local
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
      "value": "#20C997" // Couleur jaune plus visible
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
      "distance": 180,      // Distance augmentée
      "color": "#20C997",   // Couleur coordonnée
      "opacity": 1,       // Opacité renforcée
      "width": 0.6          // Épaisseur légèrement augmentée
    },
    "move": {
      "enable": true,
      "speed": 4,           // Vitesse réduite
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "bounce", // Rebond au lieu de sortie
      "bounce": true,       // Activation du rebond
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
        "mode": "grab"      // Mode grab au lieu de repulse
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 150,    // Distance réduite
        "line_linked": {
          "opacity": 0.8    // Opacité renforcée lors du survol
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
        "distance": 100     // Distance réduite
      },
      "push": {
        "particles_nb": 3   // Nombre de particules poussées réduit
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
      container.innerHTML = ''; // Nettoie les particules existantes
      initParticles(); // Réinitialise avec les nouvelles couleurs
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

      // Nettoyage
      onUnmounted(() => {
        if (sectionRef.value) observer.unobserve(sectionRef.value);
        const particles = document.getElementById('particles-js');
        if (particles) particles.innerHTML = '';
      });
    });

    return { sectionRef };
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
</style>