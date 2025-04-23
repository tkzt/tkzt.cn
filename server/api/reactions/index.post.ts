import { nanoid } from 'nanoid'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { to, reactor, reaction } = body

  const toString = to?.toString()
  if (!toString) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Invalid to parameter',
    })
  }

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

  const reactionId = nanoid()

  const db = useDatabase()
  await db.sql`INSERT INTO reactions VALUES (${reactionId}, ${toString}, ${reactorString}, ${reactionString})`

  setResponseStatus(event, 201)
  return {
    id: reactionId,
    to: toString,
    reactor: reactorString,
    reaction: reactionString,
  }
})
