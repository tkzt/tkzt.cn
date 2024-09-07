<template>
  <main class="w-full">
    <ContentDoc v-slot="{ doc }">
      <article class="md:w-80% m-auto">
        <div class="text-4xl font-bold">{{ doc.title }}</div>
        <div class="text-sm flex dark:c-gray-400 c-gray-500 mt-3">
          <div>{{ dayjs(doc.date).format("DD MMM, YY") }}</div>
          <div class="mx-2">·</div>
          <div>{{ timeTaken }} min read</div>
        </div>
        <ContentRenderer :value="doc" />
      </article>
    </ContentDoc>
  </main>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import { onMounted, ref } from 'vue'

const timeTaken = ref(0)

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
</script>

<style></style>