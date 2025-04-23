export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { reactor, reaction } = body

  const reactorString = reactor?.toString()
  if (!reactorString) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Invalid reactor parameter',
    })
  }
  const reactionString = reaction?.toString()
  if (!reactionString) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Invalid reaction parameter',
    })
  }

  const dataStorage = useStorage('data')
  let reactors = (await dataStorage.getItem(reaction))?.toString().split(',') || []
  reactors = reactors.filter((r: string) => r !== reactorString)
  await dataStorage.setItem(reactionString, reactors.join(',') || null)

  setResponseStatus(event, 204)
})
