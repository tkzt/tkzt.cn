<template>
  <div class="text-sm text-truncate"
    :class="depth === 2 ? 'font-bold' : 'text-gray-600 dark:text-gray-200'"
    @click="$router.push(`${$route.path}#${id}`)">
    <div class="flex items-center justify-end">
      <div v-text="text" class="cursor-pointer hover:underline underline-dashed" />
      <div class="text-xs px-.37" v-text="new Array(depth - 2).fill('··').join('')"></div>
    </div>
  </div>
  <template v-if="children">
    <BlogToc v-for="child in children" v-bind="child" />
  </template>
</template>

<script lang="ts" setup>
import type { TocLink } from '@nuxt/content'
defineProps<TocLink>()
</script>