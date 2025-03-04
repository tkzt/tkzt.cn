<template>
  <div class="flex items-center flex-wrap flex-col flex-col-reverse md:flex-row">
    <div class="w-100% shrink-0 md:w-50% mt-6 md:mt-0">
      <div class="ma-auto tracking-.37">
        <div class="md:text-5xl text-2xl">你好。</div>
        <div class="my-6 md:text-2xl text-xl">
          这是陶康的主页。此人：
        </div>
        <div class="text-sm md:text-4 lh-6.18 tracking-.37 text-justify">
          于 2019 年毕业于<a href="https://www.bing.com/search?q=%E8%A0%A1%E4%B8%93" target="_blank"
            class="link">蠡湖专科<i class="outlink">
            </i></a>，继而成为一名新生代农民工；最近在<client-only><a @click="$router.push(recentMoment?._path)"
              class="link">{{
                recentMoment?.title
              }}</a></client-only>；生性胆小，爱好和平，不善表达，嗜睡，同时喜爱武侠与科幻；先后在南京、上海、无锡、上海痛恨、改造、亲手堆砌过若干座<a
            class="link"
            @click="$router.push('/blogs/some_work_work')">屎山</a>，艰难积攒财富的同时，轻易地得到了肥胖、肩颈疾病、高血压；是一个<a
            href="https://fine-weather-gallery.tkzt.cn" target="_blank" class="link">好天气摄影<i
              class="outlink"></i></a>爱好者；胡乱学过一些花拳绣腿，造了一些<a @click="$router.push('/boring-plans')"
            class="link">玩具</a>；惠普精灵中心“<黑神话·悟空>速通赛”<a
              @click="$router.push('/blogs/241229_black_myth_speed_race')"
              class="link">冠军🏆</a>；由淮扬菜组成，更喜欢苏帮菜，最爱鸡蛋灌饼、煎饼馃子类食物；偶尔心血来潮，写一些<a
              @click="$router.push('/boring-blogs')"
              class="link">不堪卒读的文章</a>；喜欢看岩井俊二、姜文的电影，听宋冬野、逼哥、李宗盛、周杰伦、马飞、王菲和新裤子的歌。
        </div>
        <div class="mt-6">
          <client-only>
            <!-- Since using `isDark`, so client only. -->
            <emoji-reaction :reactor="reactor" :react="react" :unreact="unreact"
              :getReactions="getReactions" :dark="isDark" :emojis="emojis" />
          </client-only>
        </div>
      </div>
    </div>
    <div class="grow-1 items-center flex md:(justify-end md:mt-0) mt-6 justify-center">
      <div class="relative">
        <img src="https://fine-weather-gallery.tkzt.cn/thumbnail/1.jpg"
          class="md:w-300px w-100% min-w-300px min-h-200px dark:bg-[rgba(0,0,0,.37)] bg-[rgba(0,0,0,.05)] rounded" />
        <div class="text-right caption mt-1 text-xs md:(text-sm mt-3)">
          2020
          <span class="mx-1">·</span>
          无锡
          <span class="mx-1">·</span>
          「窗台上的雏菊」
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { EmojiReaction } from 'emoji-reaction/lib/index.esm'
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import { asyncComputed, useDark } from '@vueuse/core'
import dayjs from 'dayjs'

const emojiReactionKey = 'tkzt.cn'
const isDark = useDark()
const { public: { apiBase } } = useRuntimeConfig()
const reactor = ref('')
const emojis = ['👍', '👎', '😄', '🎉', '😕', '❤️', '🚀', '👀']
const emojiReactions = ref([])

const recentMoment = asyncComputed(async () => {
  const moments = (await queryContent('logs').find()).filter(m => m._path !== '/logs').sort((a, b) => (dayjs(b.date).diff(dayjs(a.date))) || 1)
  return moments[0] || {
    title: '...',
    _path: '/'
  }
})

function react(reaction) {
  useFetch(`${apiBase}/reactions`, { method: 'post', body: { reaction, reactor, objective: emojiReactionKey } })
}

function unreact(reaction) {
  const theReaction = emojiReactions.value.find(r => r.reaction === reaction && r.reactor === reactor.value)
  if (!theReaction) return
  useFetch(`${apiBase}/reactions/${theReaction.id}`, { method: 'delete' })
}

async function getReactions() {
  const { data } = await (
    await fetch(`${apiBase}/reactions?objective=${emojiReactionKey}`, { method: 'get' })
  ).json()
  let reactions = data || []
  emojiReactions.value = reactions

  reactions = Object.entries(reactions.reduce((acc, cur) => {
    if (!acc[cur.reaction]) acc[cur.reaction] = []
    acc[cur.reaction].push(cur.reactor)
    return acc
  }, {})).map(([reaction, reactors]) => ({
    reaction, reactors
  }))
  return reactions
}

onMounted(async () => {
  const fp = await FingerprintJS.load();
  const result = await fp.get()
  reactor.value = result.visitorId
})
</script>

<style scoped>
.link {
  --at-apply: decoration-none c-inherit relative inline-block cursor-pointer;
  --at-apply: before:content-[''] before:h-5px before:bg-[var(--tkzt-primary)] before:w-100% before:inline-block;
  --at-apply: before:absolute before:bottom-0 before:left-0 before:z--1 before:rd-1 before:hover:bg-[var(--tkzt-primary-dark)];
}

.outlink {
  --at-apply: inline-block scale-75 origin-b i-mdi-arrow-top-right;
}
</style>
