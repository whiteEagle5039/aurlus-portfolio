<template>
    <section 
      id="languages" 
      ref="sectionRef"
      class="py-20 px-4"
    >
      <div class="container mx-auto">
        <h2 class="text-3xl md:text-4xl font-bold mb-12 text-center bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-lg inline-block">
          Compétence <span class="text-green-500">linguistique</span>
        </h2>      
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           <!-- Language Card 1 -->
           <div class="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 class="text-xl font-bold mb-3">Français</h3>
            <div class="flex mb-2">
                <span class="text-green-500 mr-2">
                    <font-awesome-icon icon="fa-solid fa-star" />
                </span>
                <span class="text-green-500 mr-2">
                    <font-awesome-icon icon="fa-solid fa-star" />
                </span>
                <span class="text-green-500 mr-2">
                    <font-awesome-icon icon="fa-solid fa-star" />
                </span>
                <span class="text-green-500 mr-2">
                    <font-awesome-icon icon="fa-solid fa-star" />
                </span>
                <span class="text-green-500 mr-2">
                    <font-awesome-icon icon="fa-solid fa-star" />
                </span>
            </div>
            <p class="text-gray-700 dark:text-gray-300">
            Profesionnel
            </p>
         </div>
          <!-- Language Card 2 -->
          <div class="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 class="text-xl font-bold mb-3">Anglais</h3>
            <div class="flex mb-2">
              <span class="text-green-500 mr-2">
                <font-awesome-icon icon="fa-solid fa-star" />
              </span>
              <span class="text-green-500 mr-2">
                <font-awesome-icon icon="fa-solid fa-star" />
              </span>
              <span class="text-green-500 mr-2">
                <font-awesome-icon icon="fa-solid fa-star" />
              </span>
              <span class="text-green-500 mr-2">
                <font-awesome-icon icon="fa-solid fa-star" />
              </span>
              <span class="text-gray-400 mr-2">
                <font-awesome-icon icon="fa-regular fa-star" />
              </span>
            </div>
            <p class="text-gray-700 dark:text-gray-300">
              Avancé
            </p>
          </div>
</div>
</div>
</section>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'LanguagesSection',
  emits: ['observe'],
  setup(props, { emit }) {
    const { t } = useI18n();
    const sectionRef = ref<HTMLElement | null>(null);
    
    onMounted(() => {
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
      });
    });
    
    return {
      sectionRef
    };
  }
});
</script>