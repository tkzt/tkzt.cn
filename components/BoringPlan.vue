<template>
  <div>
    <div v-if="title" class="mb-4 font-bold">{{ title }}</div>
    <div class="flex flex-wrap" :class="{ dead: title === '死亡' }">
      <div class="work" v-for=" { title, link, description, logo }, index  in list" :key="index"
        @click="toWork(link)">
        <img :src="logo" v-if="logo.startsWith('http')">
        <div v-else class="logo">
          <span class="scale-80">{{ logo }}</span>
        </div>
        <div class="pl-2 box-border grow-1 overflow-hidden text-xs md:text-sm">
          <div :title="title" class="text-truncate">{{ title }}</div>
          <div :title="description" class="text-truncate">{{ description }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(['list', 'title'])

function toWork(link) {
  const a = document.createElement('a')
  a.href = link
  a.target = '_blank'
  a.click()
}
</script>

<style scoped>
.work {
  --at-apply: flex items-center cursor-pointer shrink-0 w-[calc(100%-24px)] ma-12px relative w-100% md:w-30%;
  --at-apply: after:(pointer-events-none w-[calc(100%+12px)] h-[calc(100%+12px)]);
  --at-apply: "after:(absolute rd-8px top--6px left--6px content-[''])";
  --at-apply: "after:(hover:bg-[rgba(0,0,0,.03)] active:bg-[rgba(0,0,0,.06)])";
  --at-apply: "after:(dark:hover:bg-[rgba(255,255,255,.06)] dark:active:bg-[rgba(255,255,255,.03)])";
}

.work img {
  --at-apply: w-8 h-8;
}

.dead {
  --at-apply: opacity-60;
}

.dead img {
  --at-apply: filter-grayscale-100 opacity-50;
}

.work .logo {
  --at-apply: "w-8 h-8 text-xs shrink-0 bg-[rgba(162,96,209,0.12)] rd-50%";
  --at-apply: "flex items-center justify-center c-slate-900 font-bold";
  --at-apply: "dark:bg-[rgba(162,96,209,0.12)] dark:c-slate-200"
}
</style>
