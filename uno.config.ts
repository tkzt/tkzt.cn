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
})