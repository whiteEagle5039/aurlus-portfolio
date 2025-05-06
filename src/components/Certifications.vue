<template>
    <section 
      id="certifications" 
      ref="sectionRef"
      class="py-16 px-4 bg-gray-50 dark:bg-gray-800"
    >
      <div class="container mx-auto">
        <h2 class="text-3xl md:text-4xl font-bold mb-12 text-center bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-lg inline-block">
              {{ $t('certifications.title1') }} <span class="text-green-500">{{ $t('certifications.title2') }}</span>
        </h2>  
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <!-- Top 10 Certifications -->
          <CertificationCard 
            v-for="(cert, index) in topCertifications" 
            :key="index"
            :title="cert.title"
            :description="cert.description"
            :icon="cert.icon"
          />
        </div>
  
        <!-- Bouton Voir plus -->
        <div class="text-center mt-6">
          <button 
            @click="showModal = true"
            class="inline-flex items-center px-4 py-2 border border-green-500 text-green-500 dark:text-green-400 rounded-lg hover:bg-green-50 dark:hover:bg-gray-700 transition-colors"
          >
            <span>{{ $t('certifications.button') }}</span>
            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
        </div>
      </div>
  
      <!-- Modal -->
      <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div class="p-6">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-2xl font-bold text-gray-800 dark:text-white">Toutes mes certifications</h3>
              <button @click="showModal = false" class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div 
                v-for="(cert, index) in allCertifications" 
                :key="'all-'+index"
                class="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg"
              >
                <h4 class="font-bold text-lg text-green-500">{{ cert.title }}</h4>
                <p class="text-gray-700 dark:text-gray-300">{{ cert.description }}</p>
              </div>
            </div>
            
            <div class="mt-6 text-center">
              <button 
                @click="showModal = false"
                class="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import CertificationCard from '@/components/CertificationCard.vue';
  import { useI18n } from 'vue-i18n';
  
  export default defineComponent({
    name: 'CertificationsSection',
    components: {
      CertificationCard
    },
    emits: ['observe'],
    setup(props, { emit }) {
      const { t } = useI18n();
      const sectionRef = ref<HTMLElement | null>(null);
      const showModal = ref(false);
  
      const topCertifications = [
        {
          title: 'CISSP',
          description: 'Certified Information Systems Security Professional',
          icon: 'fa-shield-halved'
        },
        {
          title: 'CISM',
          description: 'Certified Information Security Manager',
          icon: 'fa-user-secret'
        },
        {
          title: 'CISO',
          description: 'Chief Information Security Officer',
          icon: 'fa-chess-king'
        },
        {
          title: 'CCNP-S',
          description: 'Cisco Certified Network Professional Security',
          icon: 'fa-network-wired'
        },
        {
          title: 'FCP Network Security',
          description: 'Fortinet Certified Professional',
          icon: 'fa-shield-alt'
        },
        {
          title: 'SOC Analyst',
          description: 'Certified Security Operations Center',
          icon: 'fa-desktop'
        },
        {
          title: 'ZTA Architect',
          description: 'Zero Trust Access Architect',
          icon: 'fa-lock'
        },
        {
          title: 'Responsable QHSE',
          description: 'ISO 9001/14001/45001',
          icon: 'fa-certificate'
        },
        {
          title: 'NSE 4',
          description: 'Network Security Professional',
          icon: 'fa-shield-virus'
        },
        {
          title: 'ISO 27001',
          description: 'Gestion des risques cybersécurité',
          icon: 'fa-file-contract'
        }
      ];
  
      const allCertifications = [
        ...topCertifications,
        {
          title: 'FCA Cybersecurity',
          description: 'Fortinet Certified Associate'
        },
        {
          title: 'LAN EDGE Architect',
          description: ''
        },
        {
          title: 'FortiSwitch Administrator',
          description: ''
        },
        {
          title: 'FortiWeb Administrator',
          description: ''
        },
        {
          title: 'FortiManager Administrator',
          description: ''
        },
        {
          title: 'FortiAnalyzer Administrator',
          description: ''
        },
        {
          title: 'FortiAnalyzer Analyst',
          description: ''
        },
        {
          title: 'FortiAuthenticator Administrator',
          description: ''
        },
        {
          title: 'FortiPAM Administrator',
          description: ''
        },
        {
          title: 'FCF Cybersecurity',
          description: 'Fortinet Certified Fundamentals'
        },
        {
          title: 'Microsoft Cybersécurité',
          description: 'Sécurité et défense de Windows'
        },
        {
          title: 'ITIL 4 Foundation',
          description: 'Gestion des services TI'
        },
        {
          title: 'Kaspersky EDR/MDR',
          description: 'Optimum Security'
        },
        {
          title: 'Communication AMHS/SMT',
          description: 'Certificat de qualification'
        },
        {
          title: 'ISO 31000',
          description: 'Management des risques'
        },
        {
          title: 'Management équipe projet',
          description: ''
        }
      ];
  
      return {
        sectionRef,
        showModal,
        topCertifications,
        allCertifications
      };
    }
  });
  </script>