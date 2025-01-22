<template>
  <main class="w-full md:py-10 py-6">
    <ContentDoc v-slot="{ doc }">
      <article class="relative">
        <div class="md:w-62%">
          <div class="text-4xl font-bold">
            {{ doc.title }}
          </div>
          <div class="text-sm flex dark:c-gray-400 c-gray-500 mt-3">
            <div>{{ dayjs(doc.date).format("DD MMM, YY") }}</div>
            <div class="mx-2">·</div>
            <div>{{ timeTaken }} min read</div>
          </div>
          <ContentRenderer :value="doc" />
        </div>
        <ClientOnly>
          <template v-if="doc.body?.toc?.links">
            <div v-if="!mdAndMore" class="fixed top-6 right-6 max-w-50% text-right">
              <Icon name="mdi:table-of-contents" class="text-2xl cursor-pointer"
                @click="showToc = !showToc" />
              <Transition>
                <div v-if="showToc" ref="tocMenuRef"
                  class="p-4 rounded-lg shadow-lg overflow-hidden bg-white dark:bg-gray-800">
                  <BlogToc v-bind="link" v-for="link in doc.body?.toc?.links" />
                </div>
              </Transition>
            </div>
            <div
              class="hidden md:block fixed top-16 right-8% lg:right-15% 2xl:right-20% max-w-37% overflow-hidden"
              v-else>
              <BlogToc v-bind="link" v-for="link in doc.body?.toc?.links" />
            </div>
          </template>
        </ClientOnly>
      </article>
    </ContentDoc>
  </main>
</template>

<script lang="ts" setup>
import { onClickOutside, useWindowSize } from '@vueuse/core'
import dayjs from 'dayjs'
import { onMounted, ref } from 'vue'

const timeTaken = ref(0)
const { width: windowWidth } = useWindowSize()
const tocMenuRef = ref<HTMLElement>()

const mdAndMore = computed(() => windowWidth.value >= 768)
const showToc = ref(false)

function calcTimeTaken() {
  const main = document.querySelector('main > article') as HTMLElement
  if (main) {
    const pictures = main.querySelectorAll('img').length
    timeTaken.value = Math.ceil(main.innerText.length / 275 + (pictures > 9 ? ((12 + 4) / 2 * 9 + (pictures - 9) * 3) : (pictures > 0 ? ((12 + 12 - pictures + 1) / 2 * pictures) : 0)) / 60)
  }
}

onMounted(() => {
  calcTimeTaken()
})

onClickOutside(tocMenuRef, () => {
  showToc.value = false
})

watch(mdAndMore, (val) => {
  if (!val) {
    showToc.value = false
  }
})
</script>

<style></style>