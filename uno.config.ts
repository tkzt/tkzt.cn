import { defineConfig } from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import { presetUno } from 'unocss'
import presetIcons from '@unocss/preset-icons'

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