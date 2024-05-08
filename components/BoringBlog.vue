<template>
  <div class="articles text-sm md:text-4 lh-6.18 relative" ref="containerRef">
    <div class="
      absolute text-transparent text-stroke-1 text-stroke-gray-200 dark:text-stroke-gray-700 
      text-12 translate-y--2 translate-x--4 md:translate-x--8 font-extrabold
    ">
      {{ year }}
    </div>
    <ul class="relative">
      <li v-for="{ title, date, link, local }, idx in list" :key="idx" target="_blank"
        class="list-none">
        <a class="c-inherit decoration-none cursor-pointer" @click="toBlog(link, !!local)">
          <div class="overflow-hidden flex">
            <div
              class="text-truncate text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
              {{ title }}
            </div>
            <div v-if="!local" class="flex items-center justify-center">
              <i class="inline-block i-mdi-arrow-top-right scale-75 opacity-50"></i>
            </div>
            <div class="ml-2 opacity-50 text-sm flex items-center shrink-0">
              <template v-if="date.match(/\d{4}-\d{2}-\d{2}/)">
                {{ dayjs(date).format("MMM DD") }}
              </template>
            </div>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'

const containerRef = ref<HTMLDivElement>()
const router = useRouter()

defineProps<BlogGroup>()

function toBlog(to: string, local: boolean) {
  if (local) {
    router.push(to)
  } else {
    const a = document.createElement('a')
    a.target = '_blank'
    a.href = to
    a.click()
  }
}
</script>

<style></style>