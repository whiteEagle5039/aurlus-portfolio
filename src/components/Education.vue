<template>
   <section 
  id="education" 
  ref="sectionRef"
  class="py-20 px-4 bg-gray-100 dark:bg-gray-800"
>
  <div class="container mx-auto">
    <h2 class="text-3xl md:text-4xl font-bold mb-12 text-center bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-lg inline-block">
      Mon <span class="text-yellow-500">parcours académique</span>
    </h2>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Master en cours -->
      <div class="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <div class="flex items-center mb-4">
          <div class="bg-yellow-500 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
            <font-awesome-icon icon="fa-solid fa-graduation-cap" class="text-black text-xl" />
          </div>
          <div>
            <h3 class="font-bold text-lg">Master de Recherche</h3>
            <span class="text-yellow-500">Sécurité des Systèmes Embarqués (Cybersécurité matériel)</span>
          </div>
        </div>
        <div class="mb-4">
          <p class="text-gray-700 dark:text-gray-300">
            Faculté des Sciences et Techniques (FST) - UCAD, Dakar/Sénégal
          </p>
          <p class="text-gray-500 dark:text-gray-400 text-sm">
            2023-2025 (en cours)
          </p>
        </div>
      </div>

      <!-- DESS -->
      <div class="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <div class="flex items-center mb-4">
          <div class="bg-yellow-500 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
            <font-awesome-icon icon="fa-solid fa-certificate" class="text-black text-xl" />
          </div>
          <div>
            <h3 class="font-bold text-lg">Diplôme d'Études Supérieures Spécialisées (DESS)</h3>
            <span class="text-yellow-500">Gestion des projets et développement local</span>
          </div>
        </div>
        <div class="mb-4">
          <p class="text-gray-700 dark:text-gray-300">
            Ecole Doctorale des Sciences Economiques et de Gestion (ED-SEG) - UAC, Bénin
          </p>
          <p class="text-gray-500 dark:text-gray-400 text-sm">
            2019-2020
          </p>
        </div>
      </div>

      <!-- Licence Droit -->
      <div class="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <div class="flex items-center mb-4">
          <div class="bg-yellow-500 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
            <font-awesome-icon icon="fa-solid fa-graduation-cap" class="text-black text-xl" />
          </div>
          <div>
            <h3 class="font-bold text-lg">Licence</h3>
            <span class="text-yellow-500">Droit privé</span>
          </div>
        </div>
        <div class="mb-4">
          <p class="text-gray-700 dark:text-gray-300">
            Faculté de Droit et de Science Politique (FADESP) - UAC, Bénin
          </p>
          <p class="text-gray-500 dark:text-gray-400 text-sm">
            2017-2021
          </p>
        </div>
      </div>

      <!-- Ingénieur EAMAC -->
      <div class="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <div class="flex items-center mb-4">
          <div class="bg-yellow-500 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
            <font-awesome-icon icon="fa-solid fa-user-graduate" class="text-black text-xl" />
          </div>
          <div>
            <h3 class="font-bold text-lg">Diplôme d'Ingénieur</h3>
            <span class="text-yellow-500">Électronique-Informatique</span>
          </div>
        </div>
        <div class="mb-4">
          <p class="text-gray-700 dark:text-gray-300">
            Ecole Africaine de Météorologie et de l'Aviation Civile (EAMAC), Niamey/Niger
          </p>
          <p class="text-gray-500 dark:text-gray-400 text-sm">
            2013-2016
          </p>
        </div>
      </div>

      <!-- Licence ENS -->
      <div class="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <div class="flex items-center mb-4">
          <div class="bg-yellow-500 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
            <font-awesome-icon icon="fa-solid fa-graduation-cap" class="text-black text-xl" />
          </div>
          <div>
            <h3 class="font-bold text-lg">Licence Professionnelle</h3>
            <span class="text-yellow-500">Mathématique-Informatique</span>
          </div>
        </div>
        <div class="mb-4">
          <p class="text-gray-700 dark:text-gray-300">
            Ecole Normale Supérieure (ENS) de Natitingou, Bénin
          </p>
          <p class="text-gray-500 dark:text-gray-400 text-sm">
            2009-2012
          </p>
        </div>
      </div>

      <!-- Baccalauréats -->
      <div class="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <div class="flex items-center mb-4">
          <div class="bg-yellow-500 w-12 h-12 rounded-lg flex items-center justify-center mr-4">
            <font-awesome-icon icon="fa-solid fa-school" class="text-black text-xl" />
          </div>
          <div>
            <h3 class="font-bold text-lg">Baccalauréats</h3>
            <span class="text-yellow-500">Série C (2009) & Série D (2007)</span>
          </div>
        </div>
        <div class="mb-4">
          <p class="text-gray-700 dark:text-gray-300">
            CS CRAMER & Collège Jean-Piaget I, Abomey-Calavi/Bénin
          </p>
          <p class="text-gray-500 dark:text-gray-400 text-sm">
            2006-2009
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
  
  export default defineComponent({
    name: 'EducationSection',
    emits: ['observe'],
    setup(props, { emit }) {
      const sectionRef = ref<HTMLElement | null>(null);
      
      onMounted(() => {
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
        });
      });
      
      return {
        sectionRef
      };
    }
  });
  </script>