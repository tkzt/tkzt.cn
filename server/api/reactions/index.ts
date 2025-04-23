export default defineEventHandler(async (event) => {
  const { to } = getQuery(event)

  const toString = to?.toString()
  if (!toString) {
    throw createError({
      statusCode: 422,
      message: 'Invalid to parameter',
    })
  }

  const db = useDatabase()
  // Create reaction table
  await db.sql`CREATE TABLE IF NOT EXISTS reactions ("id" TEXT PRIMARY KEY, "to" TEXT, "reactor" TEXT, "reaction" TEXT)`

  // Query for users
  const { rows } = await db.sql`SELECT * FROM reactions WHERE "to" = ${toString}`

  return rows
})
