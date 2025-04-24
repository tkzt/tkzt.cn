import { emojis } from '~~/shared/constants'

export default defineEventHandler(async (event) => {
  let { prefix } = getQuery(event)
  prefix = prefix?.toString() || ''
  const dataStorage = useStorage('data')

  const reactions = await Promise.all(
    emojis.map(async (emoji) => ({ reactors: (await dataStorage.getItem(`${prefix ? prefix + '-' : ''}${emoji}`))?.toString().split(',') || [], reaction: emoji }))
  )
  return reactions.filter(r => !!r.reactors.length)
})
