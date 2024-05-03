<template>
  <div class="flex min-h-dvh w-full">
    <div class="ma-auto px-8% lg:px-15% 2xl:px-20% flex flex-col py-6 w-100%"
      :class="{ 'w-80%': $route.matched.at(0)?.path.startsWith('/:post') }">
      <slot />
      <div class="flex items-center c-gray-500 mt-6">
        <div class="caption hover:dark:c-gray-400 hover:c-gray-500 ">
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
        <router-link title="Recall" class="text-btn caption" to="/" v-else>回城</router-link>
        <div class="rotate-90 mx-3">-</div>
        <div class="flex items-center text-btn caption select-none" @click="toggleDark.call">
          {{ isDark ? '浅' : '深' }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useDark, useToggle } from '@vueuse/core'
import { useRoute } from 'vue-router';

const route = useRoute()
const home = computed(() => route.path === '/')
const isDark = useDark()
const toggleDark = useToggle(isDark)

onMounted(() => {
  (function (d) {
    var config = {
      kitId: 'lqj5huc',
      scriptTimeout: 3000,
      async: true
    },
      h = d.documentElement, t = setTimeout(function () { h.className = h.className.replace(/\bwf-loading\b/g, "") + " wf-inactive" }, config.scriptTimeout), tk = d.createElement("script"), f = false, s = d.getElementsByTagName("script")[0], a; h.className += " wf-loading"; tk.src = 'https://use.typekit.net/' + config.kitId + '.js'; tk.async = true; tk.onload = tk.onreadystatechange = function () { a = this.readyState; if (f || a && a != "complete" && a != "loaded") return; f = true; clearTimeout(t); try { Typekit.load(config) } catch (e) { } }; s.parentNode.insertBefore(tk, s)
  })(document)
})
</script>

<style scoped></style>
