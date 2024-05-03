<template>
  <div class="md:text-2xl text-xl">
    <div>是的，这是一个友情链接页面。</div>
    <div>
      主要用来致敬一些
      <ruby>好看的<rt>Beautiful</rt></ruby>
      或者
      <ruby>好看的<rt>Wonderful</rt></ruby>
      网站。
    </div>
  </div>
  <ul class="mt-6">
    <li v-for="{ title, href }, index in coolGuys" :key="index">
      <a :href="href" target="_blank" class="text-btn c-inherit">{{ title }}</a>
    </li>
  </ul>
</template>

<script setup>
import { ref } from 'vue'

const coolGuys = ref([
  { title: '祖师爷', href: 'https://evanyou.me/' },
  { title: 'Anthony Fu', href: 'https://antfu.me/' },
  { title: '李辉', href: 'https://greyli.com/' },
  { title: 'SoonIter', href: 'https://sooniter.site/' },
  { title: '谢益辉', href: 'https://yihui.org/' },
  { title: 'Juan', href: 'https://writee.org/huang-juan/' },
])
</script>