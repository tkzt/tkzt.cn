import { defineConfig, presetIcons, transformerDirectives, transformerVariantGroup } from 'unocss'
import { presetUno } from 'unocss'

export default defineConfig({
  transformers: [
    transformerDirectives(),
    transformerVariantGroup()
  ],
  presets: [presetUno(), presetIcons()],
  shortcuts: [
    ['caption', 'dark:c-gray-400 c-gray-500 text-xs'],
    ['text-btn', 'cursor-pointer text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'],
  ]
})