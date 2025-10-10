<template>
  <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-300 relative">
    <!-- Status indicator -->
    <div v-if="showStatus" class="absolute top-2 right-2">
      <span v-if="certification.is_valid" class="inline-block w-3 h-3 bg-green-500 rounded-full" title="Valid"></span>
      <span v-else class="inline-block w-3 h-3 bg-red-500 rounded-full" title="Expired"></span>
    </div>
    
    <div class="flex items-center justify-center mb-2">
      <span class="text-green-500 text-3xl">
        <font-awesome-icon :icon="dynamicIcon" />
      </span>
    </div>
    
    <h3 class="text-lg font-bold mb-1 text-center">{{ certification.name }}</h3>
    
    <p class="text-gray-600 dark:text-gray-300 text-sm text-center mb-2">
      {{ certification.description || certification.issuing_organization }}
    </p>
    
    <!-- Certification details -->
    <div class="text-xs text-gray-500 dark:text-gray-400 text-center space-y-1">
      <p v-if="certification.issuing_organization && certification.description">
        {{ certification.issuing_organization }}
      </p>
      
      <p v-if="certification.formatted_obtained_date">
        <font-awesome-icon icon="fa-solid fa-calendar-check" class="mr-1" />
        {{ certification.formatted_obtained_date }}
      </p>
      
      <p v-if="!certification.never_expires && certification.formatted_expiry_date">
        <font-awesome-icon 
          icon="fa-solid fa-calendar-times" 
          class="mr-1" 
          :class="{ 'text-red-500': !certification.is_valid }"
        />
        {{ certification.formatted_expiry_date }}
      </p>
      
      <p v-if="certification.never_expires" class="text-green-600 dark:text-green-400">
        <font-awesome-icon icon="fa-solid fa-infinity" class="mr-1" />
        {{ $t('certifications.neverExpires') }}
      </p>
    </div>
    
    <!-- Certificate URL -->
    <div v-if="certification.certificate_url" class="mt-3 text-center">
      <a 
        :href="certification.certificate_url" 
        target="_blank" 
        rel="noopener noreferrer"
        class="inline-flex items-center text-green-500 hover:text-green-600 text-xs"
      >
        <font-awesome-icon icon="fa-solid fa-external-link-alt" class="mr-1" />
        {{ $t('certifications.viewCertificate') }}
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import type { PropType } from 'vue';
import { useI18n } from 'vue-i18n';

interface Certification {
  id: number;
  name: string;
  description?: string;
  issuing_organization: string;
  formatted_obtained_date: string;
  formatted_expiry_date?: string;
  never_expires: boolean;
  certificate_url?: string;
  certificate_id?: string;
  is_valid: boolean;
  status: string;
}

export default defineComponent({
  name: 'CertificationCard',
  props: {
    certification: {
      type: Object as PropType<Certification>,
      required: true
    },
    showStatus: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const { t } = useI18n();
    
    // Dynamic icon based on certification name or organization
    const dynamicIcon = computed(() => {
      const name = props.certification.name.toLowerCase();
      const org = props.certification.issuing_organization.toLowerCase();
      
      // Security certifications
      if (name.includes('cissp') || name.includes('cism') || name.includes('ciso')) {
        return 'fa-solid fa-shield-halved';
      }
      if (name.includes('soc') || name.includes('analyst')) {
        return 'fa-solid fa-desktop';
      }
      if (name.includes('security') || name.includes('cybersecurity')) {
        return 'fa-solid fa-shield-alt';
      }
      
      // Network certifications
      if (name.includes('ccnp') || name.includes('cisco') || name.includes('network')) {
        return 'fa-solid fa-network-wired';
      }
      
      // Fortinet certifications
      if (org.includes('fortinet') || name.includes('forti') || name.includes('nse')) {
        return 'fa-solid fa-shield-virus';
      }
      
      // Microsoft certifications
      if (org.includes('microsoft') || name.includes('microsoft')) {
        return 'fa-brands fa-microsoft';
      }
      
      // ISO certifications
      if (name.includes('iso') || name.includes('9001') || name.includes('27001')) {
        return 'fa-solid fa-file-contract';
      }
      
      // ITIL
      if (name.includes('itil')) {
        return 'fa-solid fa-cogs';
      }
      
      // Management certifications
      if (name.includes('management') || name.includes('manager') || name.includes('qhse')) {
        return 'fa-solid fa-users-cog';
      }
      
      // Zero Trust
      if (name.includes('zero trust') || name.includes('zta')) {
        return 'fa-solid fa-lock';
      }
      
      // Default certificate icon
      return 'fa-solid fa-certificate';
    });
    
    return {
      dynamicIcon
    };
  }
});
</script>