<template>
  <section 
      id="experience" 
      ref="sectionRef"
      class="py-20 px-4"
    >
      <div class="container mx-auto">
        <h2 class="text-3xl md:text-4xl font-bold mb-12 text-center bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-lg inline-block">
          Expérience <span class="text-yellow-500">professionnelle</span>
        </h2>
        
        <div class="relative">
          <!-- Timeline center line -->
          <div class="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-300 dark:bg-gray-700"></div>
          
          <!-- Timeline items -->
          <div class="space-y-16 md:space-y-16">
            <!-- Item 1 -->
            <div class="relative flex flex-col md:flex-row items-center md:justify-between">
              <!-- Left Side (odd) -->
              <div class="w-full md:w-5/12 mb-8 md:mb-0 md:pr-8 md:text-right order-2 md:order-1">
                <h3 class="text-xl font-bold mb-2">Responsable de la Sécurité des Systèmes d'Information (RSSI)</h3>
                <h4 class="text-yellow-500 font-semibold mb-3">ASECNA</h4>
                <p class="text-gray-700 dark:text-gray-300 mb-4">
                  Pilotage stratégique de la cybersécurité et gestion des risques pour le compte de l'Agence dans les 19 pays membres.
                </p>
                <span class="inline-block bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-sm font-semibold py-1 px-3 rounded-full mb-4">
                  Janvier 2024 - Présent
                </span>
                
                <!-- Expandable Content -->
                <details class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-left">
                  <summary class="font-medium cursor-pointer">Voir les responsabilités détaillées</summary>
                  <ul class="mt-3 space-y-2 list-disc pl-5 text-gray-700 dark:text-gray-300">
                    <li>Pilotage et mise à jour de la Politique de Sécurité des Systèmes d'Information (PSSI) de l'ASECNA</li>
                    <li>Coordination de la gestion (identification, évaluation, hiérarchisation, traitement) des risques cyber selon le framework EBIOS Risk Manager, les normes ISO/IEC 27005, le NIST et le manuel des risques de l'Agence</li>
                    <li>Élaboration et coordination du plan de réponse aux incidents à l'échelle de l'ASECNA</li>
                    <li>Supervision d'une équipe de 48 référents sécurité pour la gouvernance de la sécurité des systèmes d'information dans les 19 pays membres de l'ASECNA</li>
                    <li>Mise en conformité avec les exigences ISO/IEC 27001 et la stratégie cybersécurité de l'OACI</li>
                    <li>Conduite de campagnes de sensibilisation et de formation à la sécurité des utilisateurs du Siège, des Représentations, des Écoles et des Délégations de l'ASECNA</li>
                    <li>Veille technologique et intégration de solutions innovantes</li>
                  </ul>
                </details>
              </div>
              
              <!-- Seulement visible à partir de md (768px) -->
              <div class="hidden md:absolute md:left-1/2 md:transform md:-translate-x-1/2 md:w-10 md:h-10 md:rounded-full md:bg-yellow-500 md:flex md:items-center md:justify-center z-10 order-1 md:order-2">
                <font-awesome-icon icon="fa-solid fa-shield-alt" class="text-black" />
              </div>
              
              <!-- Right Side (empty for first item) -->
              <div class="w-full md:w-5/12 md:pl-8 hidden md:block order-3">
              </div>
            </div>
            
            <!-- Item 2 -->
            <div class="relative flex flex-col md:flex-row items-center md:justify-between mt-12">
              <!-- Left Side (empty for second item) -->
              <div class="w-full md:w-5/12 md:pr-8 hidden md:block order-1">
              </div>
              
              <!-- Circle Indicator -->
              <div class="hidden md:absolute md:left-1/2 md:transform md:-translate-x-1/2 md:w-10 md:h-10 md:rounded-full md:bg-yellow-500 md:flex md:items-center md:justify-center z-10 order-1 md:order-2">
                <font-awesome-icon icon="fa-solid fa-network-wired" class="text-black" />
              </div>
              
              <!-- Right Side (even) -->
              <div class="w-full md:w-5/12 mb-8 md:mb-0 md:pl-8 order-2 md:order-3">
                <h3 class="text-xl font-bold mb-2">Cadre Supérieur Réseaux Informatiques</h3>
                <h4 class="text-yellow-500 font-semibold mb-3">Direction des moyens Techniques et Informatiques (DTI), ASECNA</h4>
                <p class="text-gray-700 dark:text-gray-300 mb-4">
                  Conception et administration des infrastructures réseaux et sécurité pour l'ensemble de l'Agence.
                </p>
                <span class="inline-block bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-sm font-semibold py-1 px-3 rounded-full mb-4">
                  Octobre 2022 - Présent
                </span>
                
                <!-- Expandable Content -->
                <details class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <summary class="font-medium cursor-pointer">Voir les responsabilités détaillées</summary>
                  <ul class="mt-3 space-y-2 list-disc pl-5 text-gray-700 dark:text-gray-300">
                    <li>Conception, supervision et mise à jour des architectures, des infrastructures réseaux et sécurité au Siège et dans les 19 pays membres de l'ASECNA</li>
                    <li>Mise en place, administration et maintenance des équipements réseaux et sécurité : Switch (Cisco, Fortinet), Routeur (Cisco, Mikrotik), FortiGate, FortiWeb, FortiManager, FortiAnalyzer, FortiAuthenticator, FortiPam, Forticlient EMS</li>
                    <li>Administration des systèmes centraux (messagerie Exchange, systèmes de sauvegardes, suite Microsoft O365, Microsoft Azure, Microsoft Sentinel, SCCM, Active Directory, Linux, etc.)</li>
                    <li>Administration du système de sécurité Kaspersky</li>
                    <li>Déploiement des mesures de sécurité, accompagnement et assistance aux utilisateurs du Siège et des Centres</li>
                    <li>Gestion (conception, suivi et réalisation) des projets stratégiques de modernisation réseaux et sécurité informatique</li>
                    <li>Proposition de sujets et encadrement des mémoires de fin d'études des Ingénieurs et techniciens supérieurs de l'exploitation de l'aviation civile, spécialité systèmes électroniques et informatiques à l'École Africaine de Météorologie et de l'Aviation Civile (EAMAC) sise à Niamey</li>
                  </ul>
                </details>
              </div>
            </div>
            
            <!-- Item 3 -->
            <div class="relative flex flex-col md:flex-row items-center md:justify-between mt-12">
              <!-- Left Side (odd) -->
              <div class="w-full md:w-5/12 mb-8 md:mb-0 md:pr-8 md:text-right order-2 md:order-1">
                <h3 class="text-xl font-bold mb-2">Cadre Supérieur Réseaux, Systèmes Informatiques et équipements Météorologiques</h3>
                <h4 class="text-yellow-500 font-semibold mb-3">Représentation de l'ASECNA au Bénin</h4>
                <p class="text-gray-700 dark:text-gray-300 mb-4">
                  Administration des systèmes informatiques et météorologiques pour la navigation aérienne au Bénin.
                </p>
                <span class="inline-block bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-sm font-semibold py-1 px-3 rounded-full mb-4">
                  Mars 2018 - Octobre 2022
                </span>
                
                <!-- Expandable Content -->
                <details class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 text-left">
                  <summary class="font-medium cursor-pointer">Voir les responsabilités détaillées</summary>
                  <ul class="mt-3 space-y-2 list-disc pl-5 text-gray-700 dark:text-gray-300">
                    <li>Administration et maintenance des réseaux (Switch Cisco, Routeur Cisco, Routeur Mikrotik, MESSIR COM, MUX, etc.) et systèmes informatiques (Chaîne Radio, Topsky, AMHS-RSFTA, Alcatel, etc.) d'aide à la navigation aérienne</li>
                    <li>Administration et maintenance des équipements météorologiques à composants électroniques (SAOMA, SAOSS, SADIS, SAAPI, EARTHNETWORK, SMT-SIO)</li>
                    <li>Participation à la mise en œuvre des projets informatiques locaux (SAGIM, RADAR METEO, etc.)</li>
                    <li>Support technique et assistance aux utilisateurs de la Représentation</li>
                  </ul>
                </details>
              </div>
              
              <!-- Circle Indicator -->
              <div class="hidden md:absolute md:left-1/2 md:transform md:-translate-x-1/2 md:w-10 md:h-10 md:rounded-full md:bg-yellow-500 md:flex md:items-center md:justify-center z-10 order-1 md:order-2">
                <font-awesome-icon icon="fa-solid fa-server" class="text-black" />
              </div>
              
              <!-- Right Side (empty for third item) -->
              <div class="w-full md:w-5/12 md:pl-8 hidden md:block order-3">
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
  
  export default defineComponent({
    name: 'ExperienceSection',
    emits: ['observe'],
    setup(props, { emit }) {
      const sectionRef = ref<HTMLElement | null>(null);
      
      onMounted(() => {
        const observer = new IntersectionObserver(
          ([entry]) => {
            emit('observe', 'experience', entry.isIntersecting);
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
  