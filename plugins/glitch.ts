export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:mounted', glitchOnce)
  nuxtApp.hook('page:finish', glitchOnce)
})
