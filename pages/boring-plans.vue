<template>
  <template v-for="{ title, list }, index in works" :key="index">
    <boring-plan :list="list" :title="title"
      :class="{ 'mt-4': index > 0, 'mb-4': index === works.length - 1 }" />
  </template>
</template>

<script setup>
import BoringPlan from '~/components/BoringPlan.vue'

const works = [
  {
    title: '🚧',
    list: []
  },
  {
    title: '🥳',
    list: [
      {
        title: 'Adskipper',
        link: 'https://github.com/tkzt/adskipper',
        logo: 'https://raw.githubusercontent.com/tkzt/adskipper/563f2d73da7d452512ea82f13d530af02832189b/res/adskipper.svg',
        description: '澳门新葡京达咩',
      },
      {
        title: 'Multipaste',
        link: 'https://github.com/tkzt/multipaste',
        logo: 'https://raw.githubusercontent.com/tkzt/multipaste/1b629400649a8f1797ba856d9b2fdd79c05e69e7/src-tauri/icons/icon.ico',
        description: '朴素的剪切板管理工具',
      },
      {
        title: '一些晴朗的日子',
        link: 'https://fine-weather-gallery.tkzt.cn/',
        logo: 'https://fine-weather-gallery.tkzt.cn/fine-weather-gallery.ico',
        description: '一个相册应用'
      },
      {
        title: 'Boring Days',
        link: 'https://github.com/tkzt/boring-days',
        logo: 'https://raw.githubusercontent.com/tkzt/boring-days/5c29c1a47122b7648385628c287c23c31f7c5d17/public/logo.svg',
        description: '一个记账类的应用',
      },
      {
        title: 'Emoji Reaction',
        link: 'https://github.com/tkzt/emoji-reaction',
        logo: 'https://raw.githubusercontent.com/tkzt/emoji-reaction/e75bf200e4bfb7f0447a850e1c881b6b6f3a3562/public/logo.svg',
        description: '一个 Emoji 反馈组件',
      },
      {
        title: 'T.MD',
        link: 'https://github.com/tkzt/T.MD',
        logo: 'https://github.com/tkzt/T.MD/blob/main/icons/logo128x128.png?raw=true',
        description: 'Teleport Markdown: A chromium extension to help with online doc writing.'
      },
      {
        title: 'DDT Sharp Shooter',
        link: 'https://github.com/tkzt/ddt-sharp-shooter',
        logo: 'https://raw.githubusercontent.com/tkzt/ddt-sharp-shooter/refs/heads/main/assets/logo.ico',
        description: '熟悉的 BGM 响起，事情却不一样了起来',
      },
      {
        title: 'Vue SJV',
        link: 'https://github.com/tkzt/vue-sjv',
        logo: 'SJV',
        description: '一个简单的 Vue JSON Viewer',
      },
      {
        title: 'Resume Template',
        link: 'https://github.com/tkzt/resume-template',
        logo: 'RT',
        description: '一个基于 AlpineJS & UnoCSS 的简历模板',
      },
    ]
  },
  {
    title: '☠️',
    list: [
      {
        title: 'Hex Map',
        link: 'https://github.com/tkzt/hex-map',
        logo: 'https://raw.githubusercontent.com/tkzt/hex-map/ed50da97ecf3c03cde5e7243120d69b08122b9e1/logo.svg',
        description: '根据海克斯科技强化筛选优选阵容',
      },
      {
        title: 'TMD Editor',
        link: 'https://github.com/tkzt/tmd-editor',
        logo: 'https://raw.githubusercontent.com/tkzt/tmd-editor/263a9a01078712eb0ca4c4a6f2d7a3f71504e0d7/public/tmd.svg',
        description: 'A simple ProseMirror based markdown editor.',
      },
      {
        title: 'Qiuying RPA',
        link: 'https://github.com/qiuying-rpa',
        logo: 'https://raw.githubusercontent.com/qiuying-rpa/designer/f9650405849c730eaf6c25be049895c4f7d1df23/public/qiuying.svg',
        description: '众所周知，秋英是一种有着小而美花的植物',
      },
    ],
    extraClass: 'gray-text'
  }
]
</script>
