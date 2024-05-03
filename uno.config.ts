import { defineConfig } from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'
import { presetUno } from 'unocss'
import presetIcons from '@unocss/preset-icons'

export default defineConfig({
  transformers: [
    transformerDirectives(),
  ],
  presets: [presetUno(), presetIcons()],
})