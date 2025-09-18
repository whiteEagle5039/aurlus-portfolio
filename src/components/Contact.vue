<template>
  <section 
    id="contact" 
    ref="sectionRef"
    class="py-20 px-4 bg-gray-100 dark:bg-gray-800"
  >
    <div class="container mx-auto">
      <h2 class="text-3xl md:text-4xl font-bold mb-12 text-center bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-lg inline-block">
        <span class="text-green-500">Contactez</span>-moi
      </h2> 
      
      <div class="flex flex-col md:flex-row gap-10">
        <!-- Informations de contact -->
        <div class="w-full md:w-5/12">
          <h3 class="text-2xl font-bold mb-6">Coordonnées</h3>
          <p class="text-gray-700 dark:text-gray-300 mb-8">
            Je suis disponible pour discuter de vos projets. N'hésitez pas à me contacter pour toute opportunité professionnelle.
          </p>
          
          <!-- Loading state pour les informations de contact -->
          <div v-if="profileLoading" class="space-y-6">
            <div v-for="i in 3" :key="i" class="flex items-start animate-pulse">
              <div class="bg-gray-300 dark:bg-gray-600 w-12 h-12 rounded-lg mr-4 shrink-0"></div>
              <div class="flex-1">
                <div class="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2 w-1/3"></div>
                <div class="h-3 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
              </div>
            </div>
          </div>

          <!-- Informations de contact dynamiques -->
          <div v-else class="space-y-6">
            <!-- Adresse (si disponible) -->
            <div v-if="profileData?.address" class="flex items-start">
              <div class="bg-green-500 w-12 h-12 rounded-lg flex items-center justify-center mr-4 shrink-0">
                <font-awesome-icon icon="fa-solid fa-location-dot" class="text-white text-xl" />
              </div>
              <div>
                <h4 class="font-bold mb-1">Adresse</h4>
                <p class="text-gray-700 dark:text-gray-300">
                  {{ profileData.address }}
                </p>
              </div>
            </div>
            
            <!-- Email (si visible) -->
            <div v-if="profileData?.email" class="flex items-start">
              <div class="bg-green-500 w-12 h-12 rounded-lg flex items-center justify-center mr-4 shrink-0">
                <font-awesome-icon icon="fa-solid fa-envelope" class="text-white text-xl" />
              </div>
              <div>
                <h4 class="font-bold mb-1">Email</h4>
                <p class="text-gray-700 dark:text-gray-300">
                  <a :href="`mailto:${profileData.email}`" class="hover:text-green-500 transition-colors duration-300">
                    {{ profileData.email }}
                  </a>
                </p>
              </div>
            </div>
            
            <!-- Téléphone (si visible) -->
            <div v-if="profileData?.phone" class="flex items-start">
              <div class="bg-green-500 w-12 h-12 rounded-lg flex items-center justify-center mr-4 shrink-0">
                <font-awesome-icon icon="fa-solid fa-phone" class="text-white text-xl" />
              </div>
              <div>
                <h4 class="font-bold mb-1">Téléphone</h4>
                <p class="text-gray-700 dark:text-gray-300">
                  <a :href="`tel:${profileData.phone}`" class="hover:text-green-500 transition-colors duration-300">
                    {{ profileData.phone }}
                  </a>
                </p>
              </div>
            </div>

            <!-- Fallback si aucune information n'est disponible -->
            <div v-if="!profileData?.address && !profileData?.email && !profileData?.phone" class="text-center py-8 text-gray-500 dark:text-gray-400">
              <p>Les informations de contact ne sont pas encore configurées.</p>
            </div>
          </div>
          
          <!-- Réseaux sociaux -->
          <div class="mt-8">
            <h4 class="font-bold mb-4">Réseaux sociaux</h4>
            
            <!-- Loading state pour les réseaux sociaux -->
            <div v-if="profileLoading" class="flex space-x-4">
              <div v-for="i in 3" :key="i" class="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"></div>
            </div>
            
            <!-- Réseaux sociaux dynamiques -->
            <div v-else-if="profileData?.social_links && Object.keys(profileData.social_links).length > 0" class="flex space-x-4">
              <a 
                v-if="profileData.social_links.linkedin" 
                :href="profileData.social_links.linkedin" 
                target="_blank" 
                rel="noopener noreferrer"
                class="bg-gray-200 dark:bg-gray-700 hover:bg-green-500 dark:hover:bg-green-500 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 group"
                title="LinkedIn"
              >
                <font-awesome-icon icon="fa-brands fa-linkedin-in" class="text-gray-700 dark:text-gray-300 group-hover:text-white" />
              </a>
              <a 
                v-if="profileData.social_links.github" 
                :href="profileData.social_links.github" 
                target="_blank" 
                rel="noopener noreferrer"
                class="bg-gray-200 dark:bg-gray-700 hover:bg-green-500 dark:hover:bg-green-500 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 group"
                title="GitHub"
              >
                <font-awesome-icon icon="fa-brands fa-github" class="text-gray-700 dark:text-gray-300 group-hover:text-white" />
              </a>
              <a 
                v-if="profileData.social_links.twitter" 
                :href="profileData.social_links.twitter" 
                target="_blank" 
                rel="noopener noreferrer"
                class="bg-gray-200 dark:bg-gray-700 hover:bg-green-500 dark:hover:bg-green-500 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 group"
                title="Twitter"
              >
                <font-awesome-icon icon="fa-brands fa-twitter" class="text-gray-700 dark:text-gray-300 group-hover:text-white" />
              </a>
              <a 
                v-if="profileData.social_links.website" 
                :href="profileData.social_links.website" 
                target="_blank" 
                rel="noopener noreferrer"
                class="bg-gray-200 dark:bg-gray-700 hover:bg-green-500 dark:hover:bg-green-500 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 group"
                title="Site Web"
              >
                <font-awesome-icon icon="fa-solid fa-globe" class="text-gray-700 dark:text-gray-300 group-hover:text-white" />
              </a>
            </div>
            
            <!-- Fallback si pas de réseaux sociaux -->
            <div v-else class="text-gray-500 dark:text-gray-400 text-sm">
              <p>Aucun réseau social configuré pour le moment.</p>
            </div>
          </div>
        </div>
        
        <!-- Formulaire de contact -->
        <div class="w-full md:w-7/12">
          <div class="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md">
            <h3 class="text-2xl font-bold mb-6">Envoyez-moi un message</h3>
            
            <!-- Messages d'alerte -->
            <div v-if="alert.show" class="mb-6 p-4 rounded-lg" :class="alertClasses">
              <div class="flex items-center">
                <font-awesome-icon 
                  :icon="alert.type === 'success' ? 'fa-solid fa-check-circle' : 'fa-solid fa-exclamation-triangle'" 
                  class="mr-2"
                />
                <span>{{ alert.message }}</span>
              </div>
            </div>
            
            <form @submit.prevent="submitForm">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <!-- Nom -->
                <div>
                  <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nom complet <span class="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    id="name" 
                    v-model="form.name"
                    class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors"
                    :class="getFieldClass('name')"
                    placeholder="Votre nom"
                    required
                  />
                  <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name[0] }}</p>
                </div>
                
                <!-- Email -->
                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Adresse email <span class="text-red-500">*</span>
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    v-model="form.email"
                    class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors"
                    :class="getFieldClass('email')"
                    placeholder="votre.email@exemple.com"
                    required
                  />
                  <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email[0] }}</p>
                </div>
              </div>
              
              <!-- Sujet -->
              <div class="mb-6">
                <label for="subject" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Objet <span class="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  id="subject" 
                  v-model="form.subject"
                  class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors"
                  :class="getFieldClass('subject')"
                  placeholder="Objet de votre message"
                  required
                />
                <p v-if="errors.subject" class="text-red-500 text-sm mt-1">{{ errors.subject[0] }}</p>
              </div>
              
              <!-- Message -->
              <div class="mb-6">
                <label for="message" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message <span class="text-red-500">*</span>
                </label>
                <textarea 
                  id="message" 
                  v-model="form.message"
                  rows="5"
                  class="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors resize-vertical"
                  :class="getFieldClass('message')"
                  placeholder="Votre message..."
                  maxlength="5000"
                  required
                ></textarea>
                <div class="flex justify-between items-center mt-1">
                  <p v-if="errors.message" class="text-red-500 text-sm">{{ errors.message[0] }}</p>
                  <p class="text-gray-500 text-sm">{{ form.message.length }}/5000 caractères</p>
                </div>
              </div>
              
              <!-- Bouton d'envoi -->
              <button 
                type="submit" 
                class="w-full md:w-auto bg-green-500 hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-black font-bold py-3 px-8 rounded-lg transition-all duration-300 flex items-center justify-center transform hover:scale-105 disabled:transform-none"
                :disabled="isSubmitting"
              >
                <span v-if="isSubmitting" class="mr-2">
                  <font-awesome-icon icon="fa-solid fa-spinner" class="animate-spin" />
                </span>
                <font-awesome-icon v-else icon="fa-solid fa-paper-plane" class="mr-2" />
                <span>{{ isSubmitting ? 'Envoi en cours...' : 'Envoyer le message' }}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { API_BASE_URL, API_ENDPOINT } from '@/config/global';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ValidationErrors {
  [key: string]: string[];
}

interface AlertState {
  show: boolean;
  type: 'success' | 'error';
  message: string;
}

interface ProfileData {
  id?: number;
  first_name?: string;
  last_name?: string;
  full_name?: string;
  email?: string;
  phone?: string;
  address?: string;
  social_links?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    website?: string;
  };
}

export default defineComponent({
  name: 'ContactSection',
  emits: ['observe'],
  setup(props, { emit }) {
    const { t, locale } = useI18n();
    const sectionRef = ref<HTMLElement | null>(null);
    const isSubmitting = ref(false);
    
    // État pour les données du profil
    const profileData = ref<ProfileData | null>(null);
    const profileLoading = ref(true);
    const profileError = ref<string | null>(null);
    
    const form = ref<ContactForm>({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    
    const errors = ref<ValidationErrors>({});
    
    const alert = ref<AlertState>({
      show: false,
      type: 'success',
      message: ''
    });
    
    // Fonction pour récupérer les données du profil
    const fetchProfile = async () => {
      profileLoading.value = true;
      profileError.value = null;
      
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
        } else {
          throw new Error(result.message || 'Erreur lors de la récupération du profil');
        }
      } catch (err: any) {
        console.error('Erreur lors de la récupération du profil:', err);
        profileError.value = err.message || 'Impossible de charger les informations du profil';
      } finally {
        profileLoading.value = false;
      }
    };
    
    // Classes CSS pour les alertes
    const alertClasses = computed(() => {
      if (alert.value.type === 'success') {
        return 'bg-green-100 border border-green-400 text-green-700 dark:bg-green-900 dark:border-green-700 dark:text-green-300';
      } else {
        return 'bg-red-100 border border-red-400 text-red-700 dark:bg-red-900 dark:border-red-700 dark:text-red-300';
      }
    });
    
    // Fonction pour obtenir les classes CSS des champs
    const getFieldClass = (fieldName: string) => {
      if (errors.value[fieldName]) {
        return 'border-red-500 dark:border-red-500';
      }
      return 'border-gray-300 dark:border-gray-700';
    };
    
    // Fonction pour afficher une alerte
    const showAlert = (type: 'success' | 'error', message: string) => {
      alert.value = {
        show: true,
        type,
        message
      };
      
      // Masquer l'alerte après 5 secondes
      setTimeout(() => {
        alert.value.show = false;
      }, 5000);
    };
    
    // Fonction pour réinitialiser le formulaire
    const resetForm = () => {
      form.value = {
        name: '',
        email: '',
        subject: '',
        message: ''
      };
      errors.value = {};
    };
    
    // Fonction pour valider le formulaire côté client
    const validateForm = (): boolean => {
      const newErrors: ValidationErrors = {};
      
      if (!form.value.name.trim()) {
        newErrors.name = ['Le nom est requis'];
      } else if (form.value.name.trim().length > 255) {
        newErrors.name = ['Le nom ne peut pas dépasser 255 caractères'];
      }
      
      if (!form.value.email.trim()) {
        newErrors.email = ['L\'email est requis'];
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
        newErrors.email = ['Format d\'email invalide'];
      } else if (form.value.email.length > 255) {
        newErrors.email = ['L\'email ne peut pas dépasser 255 caractères'];
      }
      
      if (!form.value.subject.trim()) {
        newErrors.subject = ['L\'objet est requis'];
      } else if (form.value.subject.trim().length > 255) {
        newErrors.subject = ['L\'objet ne peut pas dépasser 255 caractères'];
      }
      
      if (!form.value.message.trim()) {
        newErrors.message = ['Le message est requis'];
      } else if (form.value.message.trim().length > 5000) {
        newErrors.message = ['Le message ne peut pas dépasser 5000 caractères'];
      }
      
      errors.value = newErrors;
      return Object.keys(newErrors).length === 0;
    };
    
    // Fonction principale pour soumettre le formulaire
    const submitForm = async () => {
      // Validation côté client
      if (!validateForm()) {
        showAlert('error', 'Veuillez corriger les erreurs dans le formulaire');
        return;
      }
      
      isSubmitting.value = true;
      errors.value = {};
      
      try {
        // Envoi de la requête à l'API en utilisant fetch
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINT.contactSend}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: form.value.name.trim(),
            email: form.value.email.trim(),
            subject: form.value.subject.trim(),
            message: form.value.message.trim()
          })
        });
        
        const data = await response.json();
        
        if (response.ok && data.success) {
          showAlert('success', data.message || 'Message envoyé avec succès !');
          resetForm();
          
          // Scroll vers le haut du formulaire pour voir le message de succès
          if (sectionRef.value) {
            sectionRef.value.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        } else if (response.status === 422) {
          // Erreurs de validation du serveur
          const validationErrors = data.errors || {};
          errors.value = validationErrors;
          showAlert('error', data.message || 'Données invalides');
        } else {
          showAlert('error', data.message || 'Une erreur est survenue lors de l\'envoi');
        }
        
      } catch (error: any) {
        console.error('Erreur lors de l\'envoi du formulaire:', error);
        
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
          // Erreur réseau
          showAlert('error', 'Impossible de contacter le serveur. Vérifiez votre connexion internet.');
        } else {
          // Autre erreur
          showAlert('error', 'Une erreur inattendue est survenue. Veuillez réessayer.');
        }
      } finally {
        isSubmitting.value = false;
      }
    };
    
    // Observer pour l'intersection
    onMounted(async () => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          emit('observe', 'contact', entry.isIntersecting);
        },
        { threshold: 0.3 }
      );
      
      if (sectionRef.value) {
        observer.observe(sectionRef.value);
      }
      
      // Récupération des données du profil
      await fetchProfile();
      
      onUnmounted(() => {
        if (sectionRef.value) {
          observer.unobserve(sectionRef.value);
        }
      });
    });
    
    return {
      sectionRef,
      form,
      errors,
      alert,
      alertClasses,
      isSubmitting,
      profileData,
      profileLoading,
      profileError,
      submitForm,
      getFieldClass,
      fetchProfile
    };
  }
});
</script>

<style scoped>
/* Animations personnalisées */
.fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Amélioration de l'apparence des champs de saisie */
input:focus,
textarea:focus {
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
}

/* Style pour les champs en erreur */
.border-red-500:focus {
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

/* Animation du bouton */
button:not(:disabled):hover {
  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
}

/* Animation de pulsation pour le loading */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>