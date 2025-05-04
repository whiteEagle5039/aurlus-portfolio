<template>
  <section 
    id="about" 
    ref="sectionRef"
    class="py-20 px-4 bg-gray-100 dark:bg-gray-800"
  >
    <div class="container mx-auto">
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
          <h3 class="text-2xl font-bold mb-4">
            {{ $t('about.jobTitle') }}
          </h3>
          <p class="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            {{ $t('about.paragraph1') }}
          </p>
          <p class="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
            {{ $t('about.paragraph2') }}
          </p>
                  
         <!-- Skills -->
         <div class="grid grid-cols-2 gap-4 mb-8">
              <div class="flex items-center">
                <font-awesome-icon icon="fa-solid fa-check" class="text-yellow-500 mr-2" />
                <span>Cybersécurité</span>
              </div>
              <div class="flex items-center">
                <font-awesome-icon icon="fa-solid fa-check" class="text-yellow-500 mr-2" />
                <span>Réseaux Informatiques</span>
              </div>
              <div class="flex items-center">
                <font-awesome-icon icon="fa-solid fa-check" class="text-yellow-500 mr-2" />
                <span>Norme ISO 27001</span>
              </div>
              <div class="flex items-center">
                <font-awesome-icon icon="fa-solid fa-check" class="text-yellow-500 mr-2" />
                <span>Gestion de Projets</span>
              </div>
              <div class="flex items-center">
                <font-awesome-icon icon="fa-solid fa-check" class="text-yellow-500 mr-2" />
                <span>Leadership d'Équipe</span>
              </div>
              <div class="flex items-center">
                <font-awesome-icon icon="fa-solid fa-check" class="text-yellow-500 mr-2" />
                <span>Environnements Critiques</span>
              </div>
            </div>

            <!-- Certifications -->
            <div class="mb-8">
              <h4 class="text-lg font-semibold mb-3">Certifications</h4>
              <div class="flex flex-wrap gap-2">
                <span class="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-sm">CISSP</span>
                <span class="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-sm">CISM</span>
                <span class="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-sm">Fortinet</span>
                <span class="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-sm">CCNP Security</span>
                <span class="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-sm">CISO</span>
                <span class="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-sm">CSA</span>
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
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'AboutSection',
  emits: ['observe'],
  setup(props, { emit }) {
    const { t } = useI18n();
    const sectionRef = ref<HTMLElement | null>(null);
    
    const downloadCV = () => {
      // Chemin relatif depuis le dossier public
      const cvPath = '/Aurlus_cv.pdf'; // Adaptez le nom du fichier
      
      // Ouvrir une nouvelle fenêtre pour le téléchargement
      const newWindow = window.open(cvPath, '_blank');
      
      // Vérifier si la fenêtre s'est ouverte avec succès
      if (newWindow) {
        // Fermer la fenêtre après un court délai pour permettre le téléchargement
        setTimeout(() => {
          newWindow.close();
        }, 1000); // 1 seconde
      } else {
        console.error('Impossible d\'ouvrir une nouvelle fenêtre pour le téléchargement.');
      }
    };
    
    onMounted(() => {
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
      });
    });
    
    return {
      sectionRef,
      downloadCV
    };
  }
});
</script>


