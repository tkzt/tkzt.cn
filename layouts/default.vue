<template>
  <div class="flex min-h-dvh w-full font-mono">
    <div class="ma-auto px-8% lg:px-15% 2xl:px-20% flex flex-col py-6 w-100%">
      <slot />
      <div class="flex items-center c-gray-500 mt-6" :class="{ 'md:ml-19%': blogPage }">
        <div class="caption">
          &copy; {{ new Date().getFullYear() }}
          <span class="ml-1">Allen Tao</span>
        </div>
        <div class="rotate-90 mx-3">-</div>
        <template v-if="home">
          <router-link title="Teleport" class="text-btn caption" to="/cool-guys">传送</router-link>
          <div class="rotate-90 mx-3">-</div>
          <div class="flex items-center">
            <router-link title="Contact" class="text-btn caption" to="/contact">联系</router-link>
          </div>
        </template>
        <a title="Back" class="text-btn caption" @click="$router.back()"
          v-else-if="displayBack">返回</a>
        <RouterLink title="Recall" class="text-btn caption" to="/" v-else>回城</RouterLink>
        <div class="rotate-90 mx-3">-</div>
        <div class="flex items-center text-btn caption select-none" @click="toggleDark.call">
          {{ isDark ? '浅' : '深' }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useDark, useToggle } from '@vueuse/core'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
const home = computed(() => route.path === '/')
const isDark = useDark()
const toggleDark = useToggle(isDark)

const blogPage = computed(() => route.matched.at(0)?.path.startsWith('/:post'))
const displayBack = computed(() => blogPage.value && !['/moments'].includes(route.path))
</script>

<style scoped></style>
