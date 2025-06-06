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
  const reactors = (await dataStorage.getItem(reaction))?.toString().split(',') || []
  if (!reactors.includes(reactorString))
    reactors.push(reactorString)
  await dataStorage.setItem(reactionString, reactors.join(','))

  setResponseStatus(event, 201)
  return { reaction, reactors }
})
