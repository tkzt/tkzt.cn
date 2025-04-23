export default defineEventHandler(async (event) => {
  const reactionId = getRouterParam(event, 'id')

  if (!reactionId) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Invalid reaction ID',
    })
  }
  const db = useDatabase()
  await db.sql`DELETE FROM reactions WHERE id = ${reactionId}`

  setResponseStatus(event, 204)
})
