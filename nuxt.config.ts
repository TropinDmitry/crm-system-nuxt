// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt', 
    '@nuxt/ui',
    '@nuxt/image', 
    'shadcn-nuxt',
    ['@nuxtjs/google-fonts', {
      families: {
        Lato: {
          wght: [300, 400, 700],
          ital: [300]
        }
      }
    }],
    '@nuxt/icon',
    [
      '@vee-validate/nuxt',
      {
        // disable or enable auto imports
        autoImports: true,
      }
    ],
  ],
  
  css: ['~/assets/css/tailwind.css'],
  vite: {
    plugins: []
  },
  shadcn: {

    prefix: '',

    componentDir: './components/ui'
  },
  pinia: {
    storesDirs: ['./stores/**'],
  },
})