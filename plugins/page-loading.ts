import { usePageLoading } from "~/composables/page-loading"

export default defineNuxtPlugin((nuxtApp) => {
  const { pageLoading } = usePageLoading()
  nuxtApp.hook('page:loading:start', () => {
    pageLoading.value = true
  })
  nuxtApp.hook('page:loading:end', () => {
    pageLoading.value = false
  })
})
