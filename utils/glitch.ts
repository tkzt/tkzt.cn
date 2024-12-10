import { useIntervalFn } from '@vueuse/core'
import { PowerGlitch } from 'powerglitch'

export const glitchOnce = () => {
  nextTick(
    () => {
      const { pause } = useIntervalFn(() => {
        if (document.querySelector('.glitch')) {
          const { startGlitch } = PowerGlitch.glitch('.glitch', { playMode: 'manual' })
          startGlitch()
          pause()
        }
      }, 100)
    }
  )
}
