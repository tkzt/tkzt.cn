import { emojis } from '~~/shared/constants'

export default defineEventHandler(async () => {
  const dataStorage = useStorage('data')

  const reactions = await Promise.all(
    emojis.map(async (emoji) => ({ reactors: (await dataStorage.getItem(emoji))?.toString().split(',') || [], reaction: emoji }))
  )
  return reactions.filter(r => !!r.reactors.length)
})
