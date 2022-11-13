// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  typescript: {
    shim: false,
  },
  css: [
    'primevue/resources/themes/lara-dark-blue/theme.css',
    'primevue/resources/primevue.css',
    'primeicons/primeicons.css',
    'primeflex/primeflex.css',
    '~/layouts/global.css',
  ],
  build: {
    transpile: ['primevue'],
  },
});
