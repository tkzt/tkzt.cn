export default defineEventHandler(async (event) => {
  const dataStorage = useStorage('data')
  const { emojis } = getQuery(event)
  const reactions = [] as { reaction: string, reactors: string[] }[]

  if (emojis) {
    for (const reaction of (emojis as string[])) {
      const _reactions = ((await dataStorage.getItem(reaction)) || []) as string[]
      if (_reactions.length) {
        reactions.push(
          {
            reaction,
            reactors: _reactions
          }
        )
      }
    }
  }
  return { reactions, emojis }
})
