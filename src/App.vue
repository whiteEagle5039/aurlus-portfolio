<template>
  <div :class="{ 'dark': isDarkMode }">
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Navbar 
        :isDarkMode="isDarkMode" 
        @toggle-dark-mode="toggleDarkMode" 
        :activeSection="activeSection"
        @set-active-section="setActiveSection"
      />
      <Home id="home" @observe="handleIntersection" />
      <About id="about" @observe="handleIntersection" />
      <Experience id="experience" @observe="handleIntersection" />
      <Education id="education" @observe="handleIntersection" />
      <Certifications id="certifications" @observe="handleIntersection" />
      <Languages id="languages" @observe="handleIntersection" />
      <Contact id="contact" @observe="handleIntersection" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import Navbar from './components/Navbar.vue';
import Home from './components/Home.vue';
import About from './components/About.vue';
import Experience from './components/Experience.vue';
import Education from './components/Education.vue';
import Certifications from './components/Certifications.vue';
import Languages from './components/Languages.vue';
import Contact from './components/Contact.vue';

export default defineComponent({
  name: 'App',
  components: {
    Navbar,
    Home,
    About,
    Experience,
    Education,
    Certifications,
    Languages,
    Contact
  },
  setup() {
    const isDarkMode = ref(false);
    const activeSection = ref('home');

    const toggleDarkMode = () => {
      isDarkMode.value = !isDarkMode.value;
      localStorage.setItem('darkMode', isDarkMode.value.toString());
    };

    const setActiveSection = (section: string) => {
      activeSection.value = section;
    };

    const handleIntersection = (id: string, isIntersecting: boolean) => {
      if (isIntersecting) {
        activeSection.value = id;
      }
    };

    onMounted(() => {
      // Check for saved dark mode preference
      const savedDarkMode = localStorage.getItem('darkMode');
      if (savedDarkMode === 'true') {
        isDarkMode.value = true;
      } else if (savedDarkMode === null) {
        // Check system preference if no saved preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        isDarkMode.value = prefersDark;
      }
    });

    return {
      isDarkMode,
      toggleDarkMode,
      activeSection,
      setActiveSection,
      handleIntersection
    };
  }
});
</script>