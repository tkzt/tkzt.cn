import { useSessionStorage } from "@vueuse/core"

export const usePageLoading = () => {
  const pageLoading = useSessionStorage('page-loading', false)
  return { pageLoading }
}
