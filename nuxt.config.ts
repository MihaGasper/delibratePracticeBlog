// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: [
    '@nuxtjs/tailwindcss',
  ],
  runtimeConfig: {
    public: {
      apiBase: '/api'
    }
  },
  nitro: {
    routeRules: {
      '/api/**': { cors: true, headers: { 'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS' } }
    }
  },
  serverHandlers: [
    { route: '/api/**', handler: '~/server/api.js' }
  ],
  // Remove the router middleware configuration as it might be causing issues
})