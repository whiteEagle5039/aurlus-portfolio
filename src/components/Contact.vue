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
        
        <div class="space-y-6">
          <!-- Adresse -->
          <div class="flex items-start">
            <div class="bg-green-500 w-12 h-12 rounded-lg flex items-center justify-center mr-4 shrink-0">
              <font-awesome-icon icon="fa-solid fa-location-dot" class="text-white text-xl" />
            </div>
            <div>
              <h4 class="font-bold mb-1">Adresse</h4>
              <p class="text-gray-700 dark:text-gray-300">
                Yoff-Dakar,Sénégal
              </p>
            </div>
          </div>
          
          <!-- Email -->
          <div class="flex items-start">
            <div class="bg-green-500 w-12 h-12 rounded-lg flex items-center justify-center mr-4 shrink-0">
              <font-awesome-icon icon="fa-solid fa-envelope" class="text-white text-xl" />
            </div>
            <div>
              <h4 class="font-bold mb-1">Email</h4>
              <p class="text-gray-700 dark:text-gray-300">
                sogbossiaur@asecna.org
              </p>
            </div>
          </div>
          
          <!-- Téléphone -->
          <div class="flex items-start">
            <div class="bg-green-500 w-12 h-12 rounded-lg flex items-center justify-center mr-4 shrink-0">
              <font-awesome-icon icon="fa-solid fa-phone" class="text-white text-xl" />
            </div>
            <div>
              <h4 class="font-bold mb-1">Téléphone</h4>
              <p class="text-gray-700 dark:text-gray-300">
                +221 78 185 66 71
              </p>
            </div>
          </div>
        </div>
        
        <!-- Réseaux sociaux -->
        <div class="mt-8">
          <h4 class="font-bold mb-4">Réseaux sociaux</h4>
          <div class="flex space-x-4">
            <a href="#" class="bg-gray-200 dark:bg-gray-700 hover:bg-green-500 dark:hover:bg-green-500 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300">
              <font-awesome-icon icon="fa-brands fa-linkedin-in" class="text-gray-700 dark:text-gray-300 hover:text-white" />
            </a>
            <a href="#" class="bg-gray-200 dark:bg-gray-700 hover:bg-green-500 dark:hover:bg-green-500 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300">
              <font-awesome-icon icon="fa-brands fa-github" class="text-gray-700 dark:text-gray-300 hover:text-white" />
            </a>
            <a href="#" class="bg-gray-200 dark:bg-gray-700 hover:bg-green-500 dark:hover:bg-green-500 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300">
              <font-awesome-icon icon="fa-brands fa-twitter" class="text-gray-700 dark:text-gray-300 hover:text-white" />
            </a>
          </div>
        </div>
      </div>
      
      <!-- Formulaire de contact -->
      <div class="w-full md:w-7/12">
        <div class="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md">
          <h3 class="text-2xl font-bold mb-6">Envoyez-moi un message</h3>
          
          <form @submit.prevent="submitForm">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <!-- Nom -->
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nom complet
                </label>
                <input 
                  type="text" 
                  id="name" 
                  v-model="form.name"
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  placeholder="Votre nom"
                  required
                />
              </div>
              
              <!-- Email -->
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Adresse email
                </label>
                <input 
                  type="email" 
                  id="email" 
                  v-model="form.email"
                  class="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  placeholder="Votre email"
                  required
                />
              </div>
            </div>
            
            <!-- Sujet -->
            <div class="mb-6">
              <label for="subject" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Objet
              </label>
              <input 
                type="text" 
                id="subject" 
                v-model="form.subject"
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                placeholder="Objet de votre message"
                required
              />
            </div>
            
            <!-- Message -->
            <div class="mb-6">
              <label for="message" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Message
              </label>
              <textarea 
                id="message" 
                v-model="form.message"
                rows="5"
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                placeholder="Votre message..."
                required
              ></textarea>
            </div>
            
            <!-- Bouton d'envoi -->
            <button 
              type="submit" 
              class="w-full md:w-auto bg-green-500 hover:bg-green-600 text-black font-bold py-3 px-8 rounded-lg transition-colors duration-300 flex items-center justify-center"
              :disabled="isSubmitting"
            >
              <span v-if="isSubmitting" class="mr-2">
                <font-awesome-icon icon="fa-solid fa-spinner" class="animate-spin" />
              </span>
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
  import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
  import { useI18n } from 'vue-i18n';
  
  export default defineComponent({
    name: 'ContactSection',
    emits: ['observe'],
    setup(props, { emit }) {
      const { t } = useI18n();
      const sectionRef = ref<HTMLElement | null>(null);
      const isSubmitting = ref(false);
      
      const form = ref({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      const submitForm = () => {
        isSubmitting.value = true;
        
        // Simulate form submission
        setTimeout(() => {
          alert('Message sent successfully!');
          form.value = {
            name: '',
            email: '',
            subject: '',
            message: ''
          };
          isSubmitting.value = false;
        }, 1500);
      };
      
      onMounted(() => {
        const observer = new IntersectionObserver(
          ([entry]) => {
            emit('observe', 'contact', entry.isIntersecting);
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
        form,
        isSubmitting,
        submitForm
      };
    }
  });
  </script>