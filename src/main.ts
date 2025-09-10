// src/main.ts

import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createI18n } from 'vue-i18n'
import router from './router'

// Importations des traductions
import en from './locales/en.json'
import fr from './locales/fr.json'

//others
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { 
  faCode, faMoon, faSun, faBars, faTimes, 
  faCheck, faDownload, faGraduationCap, faCertificate, 
  faBriefcase, faStar as fasStar, faLocationDot, 
  faEnvelope, faPhone, faSpinner, faLanguage, faNetworkWired, faShieldAlt, faServer, faSchool, faUserGraduate
} from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { 
  faLinkedinIn, faGithub, faTwitter, faInstagram 
} from '@fortawesome/free-brands-svg-icons';

library.add(
  faCode, faMoon, faSun, faBars, faTimes, 
  faCheck, faDownload, faGraduationCap, faCertificate, 
  faBriefcase, fasStar, farStar, faLocationDot, 
  faEnvelope, faPhone, faSpinner, faLanguage,
  faLinkedinIn, faGithub, faTwitter, faInstagram, faNetworkWired, faShieldAlt, faServer, faSchool,faUserGraduate
);

// Typage des messages
type MessageSchema = typeof en

const i18n = createI18n<[MessageSchema], 'en' | 'fr'>({
  legacy: false, // Mode Composition API
  locale: 'fr', // Langue par défaut
  fallbackLocale: 'en', // Langue de secours
  messages: { en, fr } // Messages
})

const app = createApp(App)
app.use(i18n)
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')