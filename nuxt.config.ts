// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@unocss/nuxt', "@nuxt/content"],
  css: ['/main.css'],

  nitro: {
    storage: {
      data: {
        driver: 'vercelKV'
      }
    }
  },


  content: {
    highlight: {
      theme: {
        default: 'github-light',
        dark: 'github-dark',
      },
      langs: ['javascript', 'typescript', 'python', 'html', 'css', 'rust', 'vue', 'bash']
    }
  },

  vite: {
    vue: {
      script: {
        globalTypeFiles: [fileURLToPath(new URL("./app.d.ts", import.meta.url))],
      }
    },
  },

  extends: '@nuxt-themes/typography',

  runtimeConfig: {
    public: {
      apiBase: ''
    }
  },

  compatibilityDate: '2025-02-04',
})