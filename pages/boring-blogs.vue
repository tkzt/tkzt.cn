<template>
  <div v-if="loading" class="text-sm">Loading..</div>
  <div v-else class="flex">
    <div class="md:w-1/2 w-full">
      <BoringBlog v-for="group, index in groups" v-bind="group" :class="{ 'mt-4': index > 0 }" />
    </div>
    <div class="grow md:relative hidden md:block">
      <div class="sticky top-0 h-100dvh flex items-center justify-end">
        <img :src="currBg" class="object-contain w-2/3 rounded" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import BoringBlog from '~/components/BoringBlog.vue'
import { useWindowScroll } from '@vueuse/core'
import dayjs from 'dayjs'

const bgArr = [
  "https://fine-weather-gallery.tkzt.cn/thumbnail/1651708223546_.pic.jpg",
  "https://fine-weather-gallery.tkzt.cn/thumbnail/321686466094_.pic_hd.jpg",
  "https://fine-weather-gallery.tkzt.cn/thumbnail/16.jpg",
  "https://fine-weather-gallery.tkzt.cn/thumbnail/9.jpg",
  "https://fine-weather-gallery.tkzt.cn/thumbnail/10.jpg",
  "https://fine-weather-gallery.tkzt.cn/thumbnail/14.jpg",
  "https://fine-weather-gallery.tkzt.cn/thumbnail/20.jpg",
  'https://fine-weather-gallery.tkzt.cn/thumbnail/19.jpg',
]

const groups = ref<BlogGroup[]>([])
const loading = ref(false)

const { y } = useWindowScroll()

const currBg = computed(() => bgArr[Math.min(bgArr.length - 1, Math.floor(y.value / (document?.documentElement.scrollHeight || 1) * bgArr.length))])

onMounted(async () => {
  loading.value = true
  const blogsLocal = (await queryContent('blogs').find()).sort((a, b) => (dayjs(b.date).diff(dayjs(a.date))) || 1).reduce((pre, curr) => {
    const currYear = dayjs(curr.date || '').year()

    if (curr._path && curr.title) {
      const blog = {
        title: curr.title,
        link: curr._path,
        date: curr.date || '',
        local: true
      }
      if (currYear in pre) {
        pre[currYear].push(blog)
      } else {
        pre[currYear] = [blog]
      }
    }
    return pre
  }, {} as Record<number, BlogResponse[]>)

  const blogsFlattened = (await (await fetch('https://n-notes.tkzt.cn/blogs.json')).json()) as BlogResponse[]
  const blogGroups = blogsFlattened.reduce((pre, curr) => {
    const year = new Date(curr.date)?.getFullYear() + ''
    const yearExists = pre.find((p) => p.year === year)
    curr.date ??= ""
    if (yearExists) {
      yearExists.list.push(curr)
    } else {
      pre.push({
        year,
        list: [curr],
      })
    }
    return pre
  }, [] as BlogGroup[]).map(group => {
    if (blogsLocal[+group.year]) {
      const localBlogs = blogsLocal[+group.year]
      delete blogsLocal[+group.year]

      group.list.splice(group.list.findIndex(l => dayjs(l.date) < dayjs(localBlogs[0].date)), 0, ...localBlogs)
    }
    return group
  })
  Object.keys(blogsLocal).sort().forEach(b => {
    const leftTargetIndex = blogGroups.findIndex(a => +a.year < +b)
    blogGroups.splice(leftTargetIndex === -1 ? blogGroups.length : leftTargetIndex, 0, {
      year: b,
      list: blogsLocal[+b]
    })
  })
  groups.value = blogGroups
  loading.value = false
})

onBeforeRouteLeave(() => {
  loading.value = true
})
</script>

<style scoped>
.articles h3:nth-of-type(n+2) {
  margin-top: 36px;
}
</style>
