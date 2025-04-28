<template>
    <div id="particles-js" ref="particlesEl"></div>
  </template>
  
  <script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import particlesJS from 'particles.js';
  
  const particlesEl = ref<HTMLElement>();
  
  onMounted(() => {
    if (!particlesEl.value) return;
  
    (window as any).particlesJS('particles-js', {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: "#ffffff"
        },
        shape: {
          type: "circle"
        },
        opacity: {
          value: 0.5,
          random: false
        },
        size: {
          value: 3,
          random: true
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#ffffff",
          opacity: 0.4,
          width: 1
        },
        move: {
          enable: true,
          speed: 2,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200
          }
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "grab"
          },
          onclick: {
            enable: true,
            mode: "push"
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 1
            }
          },
          push: {
            particles_nb: 4
          }
        }
      },
      retina_detect: true
    });
  });
  </script>
  
  <style scoped>
  #particles-js {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #0d47a1;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% 50%;
  }
  </style>