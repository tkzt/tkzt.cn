<template>
  <ul class="py-6">
    <li v-for="moment, idx in moments" :key="idx" @click="$router.push(moment._path!)"
      class="text-btn">
      {{ moment.title }}
      <span class="ml-2 caption text-sm">{{ dayjs(moment.date).format('YY-MM-DD') }}</span>
    </li>
  </ul>
  <small class="caption">
    * Inspired by <a target="_blank" href="https://greyli.com/now/"
      class="c-blue-500 hover:c-blue-600 dark:hover:c-blue-400 inline-flex items-center">this
      page <i class="i-mdi-arrow-top-right inline-block scale-80"></i></a>.
  </small>
</template>

<script lang="ts" setup>
import { asyncComputed } from '@vueuse/core'
import dayjs from 'dayjs'

const moments = asyncComputed(async () => (await queryContent('moments').find()).filter(m => m._path !== '/moments').sort((a, b) => (dayjs(b.date).diff(dayjs(a.date))) || 1).map(({ title, date, _path }) => ({ title, date, _path })))
</script>

<style scoped>
ul {
  --at-apply: list-circle;
}

li {
  --at-apply: ml-4 my-2;
}
</style>